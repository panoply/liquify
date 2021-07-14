import { TextDocument } from 'vscode-languageserver-textdocument';
import { JSONService } from 'service/modes/json';
import { Parser } from 'provide/parser';
import { Format } from 'service/format';
// import * as Completion from 'service/completions';
import * as Hover from 'service/hovers';
import upperFirst from 'lodash/upperFirst';
import { Characters, Position, IAST, INode, NodeKind } from '@liquify/liquid-parser';
import { Services } from 'types/server';
import store from '@liquify/schema-stores';
import {
  TextEdit,
  CompletionTriggerKind,
  PublishDiagnosticsParams,
  FormattingOptions,
  SignatureHelpContext,
  SignatureHelp,
  CompletionItem,
  CompletionContext
} from 'vscode-languageserver';

/**
 * Liquid Language Service
 *
 * Provides capability features for the Liquid Language Server and
 * is used as combination with the `Server` module. The Language Service
 * was inspired in-part by the vscode language service modules.
 */
export class LiquidService {

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

    /* const embeds = document.getEmbeds();

    if (embeds) {
      for (const node of embeds) {
        if (!this.mode?.[node.language]) continue;
        const diagnostics = await this.mode[node.language].doValidation(node);
        if (diagnostics) document.errors.push(...diagnostics);
      }
    } */

    return {
      uri: document.uri,
      version: document.version,
      diagnostics: document.diagnostics
    };

  }

  /**
   * Formats
   */
  doFormat (document: IAST) {

    // Do not format empty documents

    if (!document.format) {
      return console.log('cannot format document until errors fixed');
    }

    // const filename = basename(document.textDocument.uri)
    // if (settings.ignore.files.includes(filename)) return

    /* FORMATS ------------------------------------ */

    const literal = document.literal();
    const format = Format(document, literal);
    const embeds = false; // document.getEmbeds();

    if (embeds) {

      const regions = format.embeds(embeds);

      if (regions.length > 0) {
        return [
          TextEdit.replace(
            document.root.range(),
            format.markup(TextDocument.applyEdits(literal, regions))
          )
        ];
      }
    }

    return [ TextEdit.replace(document.root.range, format.markup()) ];

  }

  /**
   * Format onType
   *
   * @param {Parser.AST} document
   * @param {string} character
   * @param {LSP.Position} position
   * @param {LSP.FormattingOptions} options
   * @returns
   * @memberof LiquidService
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

    const offset = document.offsetAt(position);
    const node: INode = document.getNodeAt(offset, false);

    if (node.kind === NodeKind.HTML) {
      return this.mode.html.doHover(node.getDocument('.html'), position);
    };

    if (!node) {
      return this.mode.html.doHover(document.literal(), position);
    }

    if (document.withinEmbed(offset, node) && document.withinBody(offset, node)) {
      if (this.mode?.[node.language]) return this.mode[node.language].doHover(node, position);
    }

    const name = Hover.getWordAtPosition(document, position, node);

    const spec = (
      Parser.spec.variant.tags?.[name]
    ) || (
      Parser.spec.variant.filters?.[name]
    ) || (
      Parser.spec.variant.objects?.[name]
    );

    if (!spec) return null;

    const reference = `[${upperFirst(Parser.spec.variant.engine)} Reference](${spec.link})`;

    return {
      kind: 'markdown',
      contents: `${spec.description}\n\n${reference}`
    };

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

    // Prevent Completions when double
    if (triggerKind !== CompletionTriggerKind.TriggerCharacter) return null;

    const trigger = triggerCharacter.charCodeAt(0);
    const offset = document.offsetAt(position);

    if (trigger === Characters.LAN) {
      return this.mode.html.doComplete(document.literal('.html'), position);
    }

    console.log(trigger, trigger === Characters.DOT);

    // We are not within a Liquid token, lets load available completions
    if (!document.withinToken(offset)) {

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

    if (completionItem.data?.language) {
      return this.mode[completionItem.data.language].doResolve(completionItem);
    }

    return completionItem;

  }

}
