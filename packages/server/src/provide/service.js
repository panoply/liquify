import { TextEdit, CompletionTriggerKind, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { CSSService } from 'service/modes/css'
import { SCSSService } from 'service/modes/scss'
import { JSONService } from 'service/modes/json'
import { Spec, Parser } from 'provide/parser'
import Format from 'service/format'
import * as Completion from 'service/completions'
import * as Hover from 'service/hovers'
import upperFirst from 'lodash/upperFirst'
import { Characters } from '@liquify/liquid-parser'

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

      const embeds = document.getEmbeds([ 'json' ])

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

      // const filename = basename(document.textDocument.uri)
      // if (settings.ignore.files.includes(filename)) return

      /* FORMATS ------------------------------------ */

      const content = document.getText()

      const literal = TextDocument.create(
        document.textDocument.uri + '.tmp',
        document.textDocument.languageId,
        document.textDocument.version,
        content
      )
      const regions = document.getEmbeds().flatMap(
        Format.embeds(
          document,
          literal
        )
      )

      /* REPLACE ------------------------------------ */

      return [
        TextEdit.replace(
          document.toRange(0, content.length),
          Format.markup(
            TextDocument.applyEdits(
              literal,
              regions
            )
          )
        )
      ]

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

      const node = document.getNodeAt(position, false)

      if (!node) return null
      if (mode?.[node.language]) return mode[node.language].doHover(node, position)

      const name = Hover.getWordAtPosition(document, position)

      /**
       * @type {Parser.Cursor}
       */
      let spec
      let preview

      if (Spec.variant.tags?.[name]) {
        spec = Spec.variant.tags[name]
        preview = `{% ${name} %}`
      } else if (Spec.variant.objects?.[name]) {
        spec = Spec.variant.objects[name]
        preview = `{{ ${name} }}`
      } else if (Spec.variant.filters?.[name]) {
        spec = Spec.variant.filters[name]
        preview = `| ${name}`
      } else {
        return null
      }

      return {
        kind: 'markdown',
        contents: [
          '```liquid',
          preview,
          '```',
          spec.description,
          '\n---',
          `\n[${upperFirst(Spec.variant.engine)} Liquid](${spec.link})`
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

      const offset = document.textDocument.offsetAt(position)
      const trigger = triggerCharacter.charCodeAt(0)

      if (!document.withinToken(offset)) {

        if (Parser.isCodeChar(Characters.PER, offset)) {
          return Completion.getTags(
            document,
            position,
            offset,
            trigger
          )
        }

        if (trigger === Characters.WSP) {
          if (Parser.isPrevCodeChar(Characters.PER, offset)) {
            return Completion.getTags(
              document,
              position,
              offset,
              trigger
            )
          }
        }

      }

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
