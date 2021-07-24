// import { TextDocument } from 'vscode-languageserver-textdocument';
import { JSONLanguageService } from 'provide/modes/json';
import { CSSLanguageService } from 'provide/modes/css';
import { Services, Formatting } from 'types/server';
import store from '@liquify/schema-stores';
import * as Format from './service/format';
import * as Hover from './service/hovers';
import * as Complete from './service/completions';
import * as Editing from './service/editing';
import {
  Characters as Char,
  Position,
  IAST,
  INode,
  Type,
  NodeKind,
  Tokens,
  provide as p,
  query as q,
  state as $,
  liquid,
  html5

} from '@liquify/liquid-parser';

import {
  // Connection,
  TextEdit,
  CompletionTriggerKind,
  PublishDiagnosticsParams,
  // FormattingOptions,
  SignatureHelpContext,
  SignatureHelp,
  CompletionItem,
  CompletionContext,
  // CompletionItemKind,
  //  InsertTextFormat,
  LinkedEditingRanges
} from 'vscode-languageserver';

/**
 * Liquid Language Service
 *
 * Provides capability features for the Liquid Language Server and
 * is used as combination with the `Server` module. The Language Service
 * was inspired in-part by the vscode language service modules.
 */
export class LiquidService {

  private cache: TextEdit[]

  private mode: {
    css: CSSLanguageService,
    json: JSONLanguageService,
  } = {
    json: undefined,
    css: undefined
  }

  /**
   * Configure
   *
   * Executed on Server initialization and will configure the
   * language service options to be used by its instance.

   */
  async configure (support: Services) {

    // JSON Language Service
    if (support.json) {
      const schema = await store('shopify/sections');
      this.mode.json = new JSONLanguageService(schema);
    }

    // CSS Language Service
    if (support.css) {
      this.mode.css = new CSSLanguageService();
    }

    // SCSS Language Service
    // if (support.scss) this.mode.scss = new SCSSService();

  }

  /**
   * `doValidation`
   */
  async doValidation (document: IAST): Promise<PublishDiagnosticsParams | null> {

    for (const region of document.regions) {
      if (!this.mode?.[region.languageId]) continue;
      const mode = this.mode?.[region.languageId];
      const errs = await mode.doValidation(document, region);
      document.errors.push(...errs);
    }

    if (!document.diagnostics.length) return null;

    return {
      uri: document.uri,
      version: document.version,
      diagnostics: document.diagnostics
    };

  }

  /**
   * Formats
   */
  async doFormat (document: IAST, rules: Formatting) {

    // Do not format empty documents

    // const filename = basename(document.textDocument.uri)
    // if (settings.ignore.files.includes(filename)) return

    /* FORMATS ------------------------------------ */

    return document.regions.length > 0
      ? Format.regions(document, rules)
      : Format.markup(document, rules);

  }

  async doLinkedEditing (document: IAST, position: Position): Promise<LinkedEditingRanges> {

    if (position.character > 0) {

      const node: INode = document.getNodeAt(position);

      if (!node) return null;

      if (!node.singular && node.kind === NodeKind.HTML) {
        return Editing.getEditRanges(document, node);
      }
    }

    return null;

  }

  /**
   * `doHover`
   */
  async doHover (document: IAST, position: Position) {

    const node: INode = document.getNodeAt(position);

    if (!node) return null;

    if (node.type === Type.embedded) {
      if (this.mode?.[node.languageId]) {
        return this.mode[node.languageId].doHover(node, position);
      }
    }

    return Hover.doObjectHover(document, position);

  }

  /**
   * `doSignature`
   */
  doSignature (
    document: IAST,
    position: Position,
    ctx: SignatureHelpContext
  ):SignatureHelp {

    return null;
    /*
    if (!document.withinToken(position)) return null;

    const context = document.getNodeContext(position);

    if (!context) return null;

    console.log(context);

    return {
      activeSignature: 0,
      activeParameter: null,
      signatures: [
        {
          label: '{% if condition == comparison %}',
          documentation: 'The for loop',
          activeParameter: context.length - 1,
          parameters: [
            {
              label: 'if',
              documentation: 'The tag name'
            },
            {
              label: 'condition',
              documentation: 'The iteree variable'
            },
            {
              label: '==',
              documentation: 'The operator'
            },
            {
              label: 'comparison',
              documentation: 'the array'
            }
          ]
        }

      ]
    }; */
  }

  /**
   * `doComplete`
   */
  async doComplete (document: IAST, position: Position, {
    triggerCharacter,
    triggerKind
  }: CompletionContext) {

    const trigger = Object.is(
      CompletionTriggerKind.TriggerCharacter,
      triggerKind
    ) ? triggerCharacter.charCodeAt(0) : false;

    const offset = document.offsetAt(position);
    const node: INode = document.node;

    // Outside of nodes, provide tag completions
    if (!node && trigger) {

      // HTML tag completions following left angle bracket, eg: <^
      if (Object.is(trigger, Char.LAN)) {
        return html5.completions.tags;
      }

      // Liquid tag completions following a percentage character, eg %^
      if (Object.is(trigger, Char.PER)) {
        this.cache = Complete.getTagsEdits(document, position, offset, trigger);
        return liquid.completions.tags;
      }

      return null;

    }

    // Embedded Regions
    if (Object.is(node.type, Type.embedded)) {

      // Ensure we have language service
      if (this.mode?.[node.languageId]) {

        // Pass completions to language service
        return this.mode[node.languageId].doComplete(node, position);

      }
    }

    // We are within a HTML node
    // Ensure we are within a start token, eg: <tag ^>
    if (Object.is(node.kind, NodeKind.HTML) && document.withinToken(offset)) {

      // Provide value completions if quotation, eg: <tag attr="^
      if (Object.is(trigger, Char.DQO) || Object.is(trigger, Char.SQO)) {
        return p.HTMLValueComplete($.html5.value);
      }

      // Provide attribute completions, eg: <tag attr^
      // Only when no trigger character was passed
      if (!trigger) return p.HTMLAttrsComplete(node.tag);

      // Provide Liquid completions within attributes, eg: <tag %^
      if (Object.is(trigger, Char.PER)) {
        this.cache = Complete.getTagsEdits(document, position, offset, trigger);
        return liquid.completions.tags;
      }

    }

    // We are within a Liquid node
    if (Object.is(node.kind, NodeKind.Liquid) && document.withinToken(offset)) {

      // Dot character trigger, provided object properties
      if (Object.is(trigger, Char.DOT)) {

        // The property provider requires we pass the nodes objects
        // scope value and offset so is can determine what to provide
        return p.LiquidPropertyComplete(node.objects, node.scope, offset);
      }

      // If trigger is a quotation, lets figure out what to provide
      if (Object.is(trigger, Char.DQO) || Object.is(trigger, Char.SQO)) {

        // First lets check it its an object brackets notation, eg: object["^
        if (document.isPrevCodeChar(Char.LOB, offset)) {
          // If detected, lets provide properties
          return p.LiquidPropertyComplete(node.objects, node.scope, offset);
        }
      }

      // Provide value completions if single quotation, eg: <tag attr='^
      if (Object.is(trigger, Char.SQO)) {
        return p.HTMLValueComplete($.html5.value);
      }

      // Pipe character trigger, provide filters, eg: {{ tag |^ }}
      // We will persist the completion if space was provided, eg: {{ tag | ^ }}
      if (Object.is(trigger, Char.PIP) || document.isPrevCodeChar(Char.PIP, offset)) {

        // Lets ensure the node accepts filters before providing
        // Almost all output tags accept filters, lets proceed
        if (Object.is(node.type, Type.output)) {

          // Some output tags not not accept filters, lets query
          // the specification and ensure we can provide them, when
          // no specification exists for this output, we can provide
          if (!q.setObject(node.tag)) return liquid.completions.filters;

          // We have a spec reference, lets check if filters are ok
          return q.isAllowed('filters') ? liquid.completions.filters : null;
        }

        // Some tags accept filters, like the assign tag, lets validate
        // Lets first ensure we know about the tag
        if (q.setTag(node.tag)) {
          // Proceed accordingly, else cancel the completion
          return q.isAllowed('filters') ? liquid.completions.filters : null;
        }
      }

      return liquid.completions.objects;

    }

    //    console.log(trigger, trigger === Characters as Char.DOT);

    // if (trigger === Characters as Char.DOT) {
    // return Completion.getObjectCompletion(document, offset);
    // }

    return null;

  }

  /**
   * `doCompleteResolve`
   *
   * @param {LSP.CompletionItem} completionItem
   * @returns
   * @memberof LiquidService
   */
  doCompleteResolve (completionItem: CompletionItem): CompletionItem {

    switch (completionItem.data.token) {
      case Tokens.HTMLTag:
        return p.HTMLTagResolve(completionItem);
      case Tokens.HTMLAttribute:
        return p.HTMLAttrsResolve(completionItem);
      case Tokens.HTMLValue:
        return p.HTMLValueResolve(completionItem);
      case Tokens.LiquidTag:
        return p.LiquidTagResolve(completionItem, this.cache);
      case Tokens.LiquidEmbedded:
        return this.mode[completionItem.data.languageId].doResolve(completionItem);

    }

    return completionItem;

  }

}
