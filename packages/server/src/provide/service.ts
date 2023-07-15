// import { TextDocument } from 'vscode-languageserver-textdocument';
import { JSONLanguageService } from 'provide/modes/json';
import { CSSLanguageService } from 'provide/modes/css';
import { Services, Formatting } from 'types/server';
import schema from '@liquify/schema/shopify/sections.json';
import * as Format from './service/format';
import * as Hover from './service/hovers';
import * as c from './service/completions';
import * as Editing from './service/editing';
import { $, p, q, liquid, Type } from '@liquify/specs';
import { IAST, INode, Position } from '@liquify/parser';
import { TokenType, TagType, CharCode, NodeKind } from '@liquify/parser/lexical';
import * as regex from '@liquify/parser/regex';
import {
  // Connection,
  TextEdit,
  CompletionTriggerKind,
  PublishDiagnosticsParams,
  // FormattingOptions,
  // SignatureHelpParams,
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
  // private signature: number = 0;

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
  configure (support: Services) {

    // JSON Language Service
    if (support.json) {

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
      await this.mode[region.languageId].doValidation(document, region);
    }

    // console.log(document);

    return document.diagnostics();

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

    return formatted;

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

    return;
    if (is(node.type, Type.embedded)) return null;

    const { lastWord } = node;

    if (is(context.triggerCharacter, CharCode.COL)) {

      if (is(context.triggerKind, SignatureHelpTriggerKind.Invoked)) {
        context.activeSignatureHelp.activeSignature = 0;
        context.activeSignatureHelp.activeParameter = 1;
        context.activeSignatureHelp.signatures = liquid.signatures.filters[lastWord];
      }

      if (context.isRetrigger) {
        context.activeSignatureHelp.activeParameter++;
      }
    }

    return {
      activeParameter: 0,
      activeSignature: 0,
      signatures: liquid.signatures.filters[lastWord]
    };

  }

  /**
   * `doComplete`
   */
  async doComplete (document: IAST, position: Position, { triggerCharacter, triggerKind }: CompletionContext) {

    const trigger = CompletionTriggerKind.TriggerCharacter === triggerKind
      ? triggerCharacter.charCodeAt(0)
      : false;

    const offset = document.offsetAt(position);
    const node: INode = document.getNodeAt(position);

    // Ensure we have language service
    if (this.mode[node.languageId]) {
      this.token = TokenType.Embedded;
      return this.mode[node.languageId].doComplete(node, position);
    }

    if (trigger === CharCode.WSP && document.withinToken(offset)) {

      // Tag name and Output name Completions
      //
      if (regex.Whitespace.test(node.tokenContent)) {
        if (node.tagType === TagType.Output && c.LastCharCode(node, offset) === CharCode.LCB) {

          this.token = TokenType.OutputTagName;
          return $.liquid.data.completions.objects;

        } else if (c.LastCharCode(node, offset) === CharCode.PER) {

          this.token = TokenType.LiquidTagName;
          return $.liquid.data.completions.tags;

        }
      }

      if (node.kind === NodeKind.Liquid && node.tagType !== TagType.Template) {

        if (c.LastCharCode(node, offset) === CharCode.PIP) {

          if (!q.setObject(node.tag)) {

            this.token = TokenType.Filter;
            return $.liquid.data.completions.filters;

          }

          if (q.isAllowed('filters')) {

            this.token = TokenType.Filter;
            return $.liquid.data.completions.filters;

          }

        }

        console.log(c.ParseFilter(node, offset));

        return null;
      }

    }

    // if (!document.withinToken(offset)) return null;

    // We are within a Liquid node
    if (node.kind === NodeKind.Liquid) {

      // Dot character trigger, provided object properties
      if (trigger === CharCode.DOT) {

        // The property provider requires we pass the nodes objects
        // scope value and offset so is can determine what to provide
        this.token = TokenType.ObjectProperty;
        return p.LiquidPropertyComplete(node, offset);
      }

      // If trigger is a quotation, lets figure out what to provide
      if (trigger === CharCode.DQO || trigger === CharCode.SQO) {

        // First lets check it its an object brackets notation, eg: object["^
        if (document.source.charCodeAt(offset - 2) === CharCode.LOB) {

          console.log(node.objects, offset);
          // If detected, lets provide properties
          this.token = TokenType.ObjectProperty;
          return p.LiquidPropertyComplete(node, offset - 1);

        }
      }

      // Pipe character trigger, provide filters, eg: {{ tag |^ }}
      // We will persist the completion if space was provided, eg: {{ tag | ^ }}
      if (trigger === CharCode.PIP || document.isPrevCodeChar(CharCode.PIP, offset)) {

        // Lets ensure the node accepts filters before providing
        // Almost all output tags accept filters, lets proceed
        if (node.type === Type.output) {

          // Some output tags not not accept filters, lets query
          // the specification and ensure we can provide them, when
          // no specification exists for this output, we can provide
          if (!q.setObject(node.tag)) {
            this.token = TokenType.Filter;
            return $.liquid.data.completions.filters;
          }

          // Proceed accordingly, else cancel the completion
          if (q.isAllowed('filters')) {
            this.token = TokenType.Filter;
            return $.liquid.data.completions.filters;
          }

          return null;
        }

        // Some tags accept filters, like the assign tag, lets validate
        // Lets first ensure we know about the tag
        if (q.setTag(node.tag)) {

          // Proceed accordingly, else cancel the completion
          if (q.isAllowed('filters')) {
            this.token = TokenType.Filter;
            return $.liquid.data.completions.filters;
          }

          return null;
        }
      }

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
      case TokenType.Filter:
        return p.LiquidFilterResolve(completionItem);
      case TokenType.LiquidTagName:
        return p.LiquidTagResolve(completionItem, this.edits);
      case TokenType.OutputTagName:
        return p.LiquidOutputResolve(completionItem, this.edits);
      case TokenType.Embedded:
        return this.mode[completionItem.data.languageId].doResolve(completionItem);
      case TokenType.ObjectProperty:
        return completionItem;

    }

    return completionItem;

  }

}
