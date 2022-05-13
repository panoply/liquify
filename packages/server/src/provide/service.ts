// import { TextDocument } from 'vscode-languageserver-textdocument';
import { is } from 'utils/common';
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
  SignatureHelpParams,
  SignatureHelpTriggerKind,
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

  private edits: TextEdit[];
  private token: number = NaN;
  private signature: number = 0;

  private mode: {
    css: CSSLanguageService,
    json: JSONLanguageService,
  } = {
      json: undefined,
      css: undefined
    };

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
      console.log(schema);
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

    const formatted = await Format.markup(document, rules);

    return document.regions.length > 0
      ? Format.regions(document, rules)
      : formatted;

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
  async doSignature (node: INode, context: SignatureHelpContext): Promise<SignatureHelp> {

    if (is(node.type, Type.embedded)) return null;

    const { lastWord } = node;

    if (is(context.triggerCharacter, Char.COL)) {

      if (is(context.triggerKind, SignatureHelpTriggerKind.Invoked)) {
        context.activeSignatureHelp.activeSignature = 0;
        context.activeSignatureHelp.activeParameter = 1;
        context.activeSignatureHelp.signatures = liquid.signatures.filters[lastWord];
      }

      if (context.isRetrigger) {
        context.activeSignatureHelp.activeParameter++;
      }
    }

    console.log(context);

    return {
      activeParameter: 0,
      activeSignature: 0,
      signatures: liquid.signatures.filters[lastWord]
    };

  }

  /**
   * `doComplete`
   */
  async doComplete (document: IAST, position: Position, {
    triggerCharacter,
    triggerKind
  }: CompletionContext) {

    const trigger = is(CompletionTriggerKind.TriggerCharacter, triggerKind)
      ? triggerCharacter.charCodeAt(0)
      : false;

    const offset = document.offsetAt(position);
    const node: INode = document.getNodeAt(position);

    // Ensure we have language service
    if (this.mode?.[node.languageId]) {
      this.token = Tokens.Embedded;
      return this.mode[node.languageId].doComplete(node, position);
    }

    // Outside of nodes, provide tag completions
    if (trigger) {

      // HTML tag completions following left angle bracket, eg: <^
      if (is(trigger, Char.LAN)) {
        this.token = Tokens.HTMLStartTagOpen;
        return html5.completions.tags;
      }

      // Liquid tag completions following a percentage character, eg %^
      if (is(trigger, Char.PER)) {
        if (!document.isPrevCodeChar(Char.LCB, offset)) {
          this.token = Tokens.LiquidTag;
          this.edits = Complete.TagEdits(position, trigger);
          return liquid.completions.tags;
        }
      }

      // Liquid output taf completions following a percentage character, eg {^
      if (is(trigger, Char.LCB)) {
        if (document.isPrevCodeChar(Char.LCB, offset)) {
          this.token = Tokens.OutputTagOpen;
          this.edits = Complete.OutputEdits(position, trigger);
          return liquid.completions.objects;
        }
      }

      if (!node) return null;

    }

    console.log(node);

    // if (!document.withinToken(offset)) return null;

    // We are within a HTML node
    // Ensure we are within a start token, eg: <tag ^>
    if (is(node.kind, NodeKind.HTML)) {

      // Provide value completions if quotation, eg: <tag attr="^
      if (is(trigger, Char.DQO) || is(trigger, Char.SQO)) {
        this.token = Tokens.HTMLAttributeValue;
        return p.HTMLValueComplete($.html5.value);
      }

      // Provide attribute completions, eg: <tag attr^
      // Only when no trigger character was passed
      if (!trigger) {
        this.token = Tokens.HTMLAttributeName;
        return p.HTMLAttrsComplete(node.tag);
      }

      // Provide Liquid completions within attributes, eg: <tag %^
      if (is(trigger, Char.PER)) {
        if (!document.isPrevCodeChar(Char.LCB, offset)) {
          this.token = Tokens.LiquidTag;
          this.edits = Complete.TagEdits(position, trigger);
          return liquid.completions.tags;
        }
      }

    }

    // We are within a Liquid node
    if (is(node.kind, NodeKind.Liquid)) {

      // Dot character trigger, provided object properties
      if (is(trigger, Char.DOT)) {

        // The property provider requires we pass the nodes objects
        // scope value and offset so is can determine what to provide
        this.token = Tokens.ObjectProperty;
        return p.LiquidPropertyComplete(node, offset);
      }

      // If trigger is a quotation, lets figure out what to provide
      if (is(trigger, Char.DQO) || is(trigger, Char.SQO)) {

        // First lets check it its an object brackets notation, eg: object["^
        if (document.isPrevCodeChar(Char.LOB, offset)) {

          // If detected, lets provide properties
          this.token = Tokens.ObjectProperty;
          return p.LiquidPropertyComplete(node, offset);
        }
      }

      // Provide value completions if single quotation, eg: <tag attr='^
      if (is(trigger, Char.SQO)) {

        this.token = Tokens.HTMLAttributeValue;

        return p.HTMLValueComplete($.html5.value);
      }

      // Pipe character trigger, provide filters, eg: {{ tag |^ }}
      // We will persist the completion if space was provided, eg: {{ tag | ^ }}
      if (is(trigger, Char.PIP) || document.isPrevCodeChar(Char.PIP, offset)) {

        // Lets ensure the node accepts filters before providing
        // Almost all output tags accept filters, lets proceed
        if (is(node.type, Type.output)) {

          // Some output tags not not accept filters, lets query
          // the specification and ensure we can provide them, when
          // no specification exists for this output, we can provide
          if (!q.setObject(node.tag)) {
            this.token = Tokens.Filter;
            return liquid.completions.filters;
          }

          // Proceed accordingly, else cancel the completion
          if (q.isAllowed('filters')) {
            this.token = Tokens.Filter;
            return liquid.completions.filters;
          }

          return null;
        }

        // Some tags accept filters, like the assign tag, lets validate
        // Lets first ensure we know about the tag
        if (q.setTag(node.tag)) {

          // Proceed accordingly, else cancel the completion
          if (q.isAllowed('filters')) {
            this.token = Tokens.Filter;
            return liquid.completions.filters;
          }

          return null;
        }
      }

      return liquid.completions.objects;

    }

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

    switch (this.token) {
      case Tokens.HTMLStartTagOpen:
        return p.HTMLTagResolve(completionItem);
      case Tokens.HTMLAttributeName:
        return p.HTMLAttrsResolve(completionItem);
      case Tokens.HTMLAttributeValue:
        return p.HTMLValueResolve(completionItem);
      case Tokens.Filter:
        return p.LiquidFilterResolve(completionItem);
      case Tokens.LiquidTag:
        return p.LiquidTagResolve(completionItem, this.edits);
      case Tokens.OutputTagOpen:
        return p.LiquidOutputResolve(completionItem, this.edits);
      case Tokens.Embedded:
        return this.mode[completionItem.data.languageId].doResolve(completionItem);
      case Tokens.ObjectProperty:
        return completionItem;

    }

    return completionItem;

  }

}
