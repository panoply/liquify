import { TextDocument } from 'vscode-languageserver-textdocument';
import { JSONService } from 'service/modes/json';
import { Services, Formatting } from 'types/server';
import store from '@liquify/schema-stores';
import * as Format from 'service/format';
import * as Hover from 'service/hovers';
import * as Complete from 'service/completions';
import {
  Characters,
  Position,
  IAST,
  INode,
  Type,
  NodeKind,
  Tokens,
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
  InsertTextFormat
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

    switch (character.charCodeAt(0)) {
      case Characters.PIP:
      case Characters.COM:
      case Characters.COL: return [
        TextEdit.insert(position, String.fromCharCode(Characters.WSP))
      ];
      case Characters.PER: return [
        TextEdit.replace({
          start: position,
          end: position
        }, '%}')
      ];

    }

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

          return q.HTMLTagComplete();

        case Characters.PER:

          this.cache = Complete.getTagsEdits(document, position, offset, trigger);

          return q.LiquidTagComplete();
      }
    }

    if (Object.is(document.node.kind, NodeKind.HTML)) {

      if (document.withinToken(offset)) {
        switch (trigger) {
          case Characters.DQO:
          case Characters.SQO: return q.HTMLValueComplete($.html.value);
          default:
            return q.HTMLAttrsComplete(document.node.tag);
        }
      } else if (document.isCodeChar(Characters.RAN, offset)) {

        return q.HTMLAttrsComplete(document.node.tag);

      }

    }

    // We are not within a Liquid token, lets load available completions
    if (Object.is(document.node.kind, NodeKind.Liquid)) {
      if (!document.withinToken(offset)) {
        switch (trigger) {
          case Characters.PER:
          case Characters.LCB:
            return q.LiquidTagComplete($.html.value);
          default:
            return q.HTMLAttrsComplete(document.node.tag);
        }
        // User has input % character, load tag completions
        if (trigger === Characters.PER) {
          return Completion.getTags(
            document,
            position,
            offset,
            trigger
          );
        }

        // User has input { character, load output/object completions
        if (trigger === Characters.LCB) {
          return Completion.getOutputs(
            document,
            position,
            offset,
            trigger
          );
        }

        // User has input whitespace, lets check previous character
        if (trigger === Characters.WSP) {

          // We will persist tag completions is previous character is %
          /* if (Parser.isPrevCodeChar(Characters.PER, offset)) {
            return Completion.getTags(
              document,
              position,
              offset,
              trigger
            );
          }

          // We will persist tag completions is previous character is %
          if (Parser.isPrevCodeChar(Characters.LCB, offset)) {
            return Completion.getOutputs(
              document,
              position,
              offset,
              trigger
            );
          } */
        }
      }
    }
    console.log(trigger, trigger === Characters.DOT);

    if (trigger === Characters.DOT) {
      return Completion.getObjectCompletion(document, offset);
    }

    return null;

    /* const node = document.getNodeAt(offset, false);
    // We are within a token
    if (document.withinToken(offset)) {
      return Completion.inToken(document, offset, trigger);
    }

    // Embedded Documents
    if (document.withinEmbed(offset)) {
      return Completion.inEmbedded(document, mode, position);
    }

    // Lets check if we are within a Node existing on the AST
    const ASTNode = document.getEmbedAt(offset) || document.getNodeAt(offset);

    // We have context of this node on the AST
    if (ASTNode) {
      return document.isEmbed
        ? Completion.inEmbedded(document, mode, position)
        : Completion.inToken(document, offset, trigger);
    }

    // At this point, the completion is either a whitespace or delimiter
    return Completion.findCompleteItems(document, offset, trigger);
    */
  }

  /**
   * `doCompleteResolve`
   *
   * @param {LSP.CompletionItem} completionItem
   * @returns
   * @memberof LiquidService
   */
  doCompleteResolve (completionItem: CompletionItem) {

    switch (completionItem.data.token) {
      case Tokens.HTMLTag:
        return q.HTMLTagResolve(completionItem);
      case Tokens.HTMLAttribute:
        return q.HTMLAttrsResolve(completionItem);
      case Tokens.HTMLValue:
        return q.HTMLValueResolve(completionItem);
      case Tokens.LiquidTag:
        return q.LiquidTagResolve(completionItem, this.cache);
    }

    return completionItem;

    if (completionItem.data.token) { return completionItem; }

    if (completionItem.data?.language) {
      return this.mode[completionItem.data.language].doResolve(completionItem);
    }

    return completionItem;

  }

}
