import { TextEdit, CompletionTriggerKind } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { CSSService } from 'service/modes/css'
import { SCSSService } from 'service/modes/scss'
import { JSONService } from 'service/modes/json'
import { Spec, Parser } from 'provide/parser'
import { Format } from 'service/format'
import * as Completion from 'service/completions'
import * as Hover from 'service/hovers'
import upperFirst from 'lodash/upperFirst'
import { Characters, NodeType } from '@liquify/liquid-parser'

/**
 * Liquid Language Service
 *
 * Provides capability features for the Liquid Language Server and
 * is used as combination with the `Server` module. The Language Service
 * was inspired in-part by the vscode language service modules.
 */
export default (mode => {

  return ({

    /**
     * Configure
     *
     * Executed on Server initialization and will configure the
     * language service options to be used by its instance.
     *
     * @memberof LiquidService
     */
    configure (support) {

      // JSON Language Service
      if (support.json) mode.json = new JSONService()

      // CSS Language Service
      if (support.css) mode.css = new CSSService()

      // SCSS Language Service
      if (support.scss) mode.scss = new SCSSService()

    },

    /**
     * `doValidation`
     *
     * @param {Parser.AST} document
     * @param {LSP.Connection} connection
     * @returns {Promise<LSP.PublishDiagnosticsParams>}
     * @memberof LiquidService
     */
    async doValidation (document) {

      const embeds = document.getEmbeds()

      if (embeds) {
        for (const node of embeds) {
          if (!mode?.[node.language]) continue
          const diagnostics = await mode[node.language].doValidation(node)
          if (diagnostics) document.errors.push(...diagnostics)
        }
      }

      return {
        uri: document.textDocument.uri,
        version: document.textDocument.version,
        diagnostics: document.errors
      }

    },

    /**
     * Formats
     *
     * @param {Parser.AST} document
     * @returns
     * @memberof LiquidService
     */
    doFormat (document) {

      // Do not format empty documents

      // const filename = basename(document.textDocument.uri)
      // if (settings.ignore.files.includes(filename)) return

      /* FORMATS ------------------------------------ */

      const literal = document.literal()
      const format = Format(document, literal)
      const embeds = document.getEmbeds()

      if (embeds) {

        const regions = format.embeds(embeds)

        if (regions.length > 0) {
          return [
            TextEdit.replace(
              document.toRange(),
              format.markup(TextDocument.applyEdits(literal, regions))
            )
          ]
        }
      }

      return [ TextEdit.replace(document.toRange(), format.markup()) ]

    },

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
    doFormatOnType (document, character, position, options) {

      switch (character.charCodeAt(0)) {
        case Characters.PIP:
        case Characters.COM:
        case Characters.COL: return [
          TextEdit.insert(position, String.fromCharCode(Characters.WSP))
        ]
        case Characters.PER: return [
          TextEdit.replace({
            start: position,
            end: position
          }, '%}')
        ]

      }

    },

    /**
     * `doHover`
     *
     * @param {Parser.AST} document
     * @param {LSP.Position} position
     * @memberof LiquidService
     */
    async doHover (document, position) {

      const offset = document.offsetAt(position)
      const node = document.getNodeAt(offset, false)

      if (!node) return null

      if (document.withinEmbed(offset, node) && document.withinBody(offset, node)) {
        if (mode?.[node.language]) return mode[node.language].doHover(node, position)
      }

      const name = Hover.getWordAtPosition(document, position, node)

      const spec = (
        Spec.variant.tags?.[name]
      ) || (
        Spec.variant.filters?.[name]
      ) || (
        Spec.variant.objects?.[name]
      )

      if (!spec) return null

      return {
        kind: 'markdown',
        contents: [
          spec.description,
          `\n[${upperFirst(Spec.variant.engine)} Reference](${spec.link})`
        ].join('\n')
      }

    },

    /**
     * `doComplete`
     *
     * @param {Parser.AST} document
     * @param {LSP.Position} position
     * @param {LSP.CompletionContext} context
     */
    async doComplete (document, position, { triggerCharacter, triggerKind }) {

      // Prevent Completions when double
      if (triggerKind !== CompletionTriggerKind.TriggerCharacter) return null

      const trigger = triggerCharacter.charCodeAt(0)
      const offset = document.offsetAt(position)
      const node = document.getNodeAt(offset, false)

      // We are not within a Liquid token, lets load available completions
      if (!node) {

        // User has input % character, load tag completions
        if (trigger === Characters.PER) {
          return Completion.getTags(
            position,
            offset,
            trigger
          )
        }

        // User has input whitespace, lets check previous character
        if (trigger === Characters.WSP) {

          // We will persist tag completions is previous character is %
          if (Parser.isPrevCodeChar(Characters.PER, offset)) {
            return Completion.getTags(
              position,
              offset,
              trigger
            )
          }
        }
      }

      return null

      // We are within a token
      if (document.withinToken(offset)) {
        return Completion.inToken(document, offset, trigger)
      }

      // Embedded Documents
      if (document.withinEmbed(offset)) {
        return Completion.inEmbedded(document, mode, position)
      }

      // Lets check if we are within a Node existing on the AST
      const ASTNode = document.getEmbedAt(offset) || document.getNodeAt(offset)

      // We have context of this node on the AST
      if (ASTNode) {
        return document.isEmbed
          ? Completion.inEmbedded(document, mode, position)
          : Completion.inToken(document, offset, trigger)
      }

      // At this point, the completion is either a whitespace or delimiter
      return Completion.findCompleteItems(document, offset, trigger)

    },

    /**
     * `doCompleteResolve`
     *
     * @param {LSP.CompletionItem} completionItem
     * @returns
     * @memberof LiquidService
     */
    doCompleteResolve (completionItem) {

      if (completionItem.data?.language) {
        return mode[completionItem.data.language].doResolve(completionItem)
      }

      return completionItem

    }

  })

})(
  {
    css: null,
    scss: null,
    json: null,
    html: true
  }
)
