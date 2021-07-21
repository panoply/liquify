import { TextDocument } from 'vscode-languageserver-textdocument';
import { JSONService } from 'service/modes/json';
import { Services, Formatting } from 'types/server';
import store from '@liquify/schema-stores';
import * as Format from 'service/format';
import * as Hover from 'service/hovers';
import * as Complete from 'service/completions';
import * as Editing from 'service/editing';
import {
  Characters,
  Position,
  IAST,
  INode,
  Type,
  NodeKind,
  Tokens,
  provide as p,
  query as q,
  state as $

} from '@liquify/liquid-parser';

import {
  Connection,
  TextEdit,
  CompletionTriggerKind,
  PublishDiagnosticsParams,
  FormattingOptions,
  SignatureHelpContext,
  SignatureHelp,
  CompletionItem,
  CompletionContext,
  CompletionItemKind,
  InsertTextFormat,
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
    css: boolean
    scss: boolean
    json: JSONService
  } = {
    json: undefined,
    css: false,
    scss: false
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
      this.mode.json = new JSONService(schema);
    }

    // CSS Language Service
    //  if (support.css) this.mode.css = new CSSService();

    // SCSS Language Service
    // if (support.scss) this.mode.scss = new SCSSService();

  }

  /**
   * `doValidation`
   */
  async doValidation (document: IAST): Promise<PublishDiagnosticsParams> {

    for (const region of document.regions) {
      if (!this.mode?.[region.languageId]) continue;
      const mode = this.mode?.[region.languageId];
      const errs = await mode.doValidation(document, region);
      document.errors.push(...errs);
    }

    return {
      uri: document.uri,
      version: document.version,
      diagnostics: document.diagnostics
    };

  }

  /**
   * Formats
   */
  doFormat (document: IAST, rules: Formatting) {

    // Do not format empty documents

    // const filename = basename(document.textDocument.uri)
    // if (settings.ignore.files.includes(filename)) return

    /* FORMATS ------------------------------------ */

    return document.regions.length > 0
      ? Format.regions(document, rules)
      : Format.markup(document, rules);

  }

  /**
   * Format onType
   */
  doFormatOnType (
    document: IAST,
    character: string,
    position: Position,
    options: FormattingOptions
  ) {

    const node: INode = document.node;

    console.log(character);

    const start = node.endToken.indexOf(node.tag);
    const end = node.endToken.lastIndexOf(node.tag);
    const range = {
      start: document.positionAt(node.offsets[2] + start),
      end: document.positionAt(node.offsets[2] + end)
    };

    const text = document.getText(range);

    return TextEdit.replace(range, text);

  }

  async doLinkedEditing (
    document: IAST,
    position: Position
  ): Promise<LinkedEditingRanges> {

    if (position.character > 0) {
      const node: INode = document.getNodeAt(position);
      if (node.kind === NodeKind.HTML) {
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
  async doComplete (
    document: IAST,
    position: Position,
    {
      triggerCharacter,
      triggerKind
    }: CompletionContext
  ) {

    if (document.node.type === Type.embedded) {
      for (const region of document.regions) {
        if (!this.mode?.[region.languageId]) continue;
        const mode = this.mode?.[region.languageId];
        return mode.doComplete(region, position);
      }
    }

    console.log('triggers');

    // Prevent Completions when double
    // if (triggerKind !== CompletionTriggerKind.TriggerCharacter) return null;

    const trigger = Object.is(
      CompletionTriggerKind.TriggerCharacter,
      triggerKind
    ) ? triggerCharacter.charCodeAt(0) : false;

    const offset = document.offsetAt(position);

    if (!document.withinToken(offset) || !document.withinEndToken(offset)) {
      switch (trigger) {
        case Characters.LAN:

          return p.HTMLTagComplete();

        case Characters.PER:

          this.cache = Complete.getTagsEdits(document, position, offset, trigger);

          return p.LiquidTagComplete();
      }
    }

    if (Object.is(document.node.kind, NodeKind.HTML)) {
      if (document.withinToken(offset)) {
        switch (trigger) {
          case Characters.DQO:
          case Characters.SQO: return p.HTMLValueComplete($.html5.value);
          default:
            return p.HTMLAttrsComplete(document.node.tag);
        }
      } else if (document.isCodeChar(Characters.RAN, offset)) {

        return p.HTMLAttrsComplete(document.node.tag);

      }
    }

    // We are not within a Liquid token, lets load available completions
    if (Object.is(document.node.kind, NodeKind.Liquid)) {
      if (!document.withinToken(offset)) {
        switch (trigger) {
          case Characters.PER:
          case Characters.LCB:
            return p.LiquidTagComplete();
          default:
            return p.HTMLAttrsComplete(document.node.tag);
        }

      }
    }
    console.log(trigger, trigger === Characters.DOT);

    // if (trigger === Characters.DOT) {
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
