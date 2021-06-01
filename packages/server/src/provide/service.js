import { TextEdit, CompletionTriggerKind, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { CSSService } from 'service/modes/css'
import { SCSSService } from 'service/modes/scss'
import { JSONService } from 'service/modes/json'
import { Spec } from 'provide/parser'
import * as Format from 'service/format'
import * as Completion from 'service/completions'
import * as Hover from 'service/hovers'
import upperFirst from 'lodash/upperFirst'
import { CodeChars } from '@liquify/liquid-parser'

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

      // CSS Language Service
      if (support.css) mode.css = new CSSService()

      // SCSS Language Service
      if (support.scss) mode.scss = new SCSSService()

      // JSON Language Service
      if (support.json) mode.json = new JSONService()

    },

    /**
     * `doValidation`
     *
     * @param {Parser.IAST} document
     * @memberof LiquidService
     */
    async doValidation (document) {

      // const promise = Diagnostic.resolve(textDocument)
      // const validations = (await Promise.all(diagnostics.map(promise)))

      const embeds = document.getEmbeds([ 'json' ])

      if (embeds) {

        for (const node of embeds) {
          const region = await mode[node.language].doValidation(node)
          if (region) document.errors.push(...region)
        }
      }

      return {
        uri: document.textDocument.uri,
        diagnostics: document.errors
      }

    },

    /**
     * Format onType
     *
     * @param {Parser.Scope} document
     * @param {string} character
     * @param {LSP.Position} position
     * @param {LSP.FormattingOptions} options
     * @returns
     * @memberof LiquidService
     */
    doFormatOnType (document, character, position, options) {

      switch (character.charCodeAt(0)) {
        case CodeChars.PIP:
        case CodeChars.COM:
        case CodeChars.COL: return [
          TextEdit.insert(position, String.fromCharCode(CodeChars.WSP))
        ]
        case CodeChars.PER: return [
          TextEdit.replace({
            start: position,
            end: position
          }, '%}')
        ]

      }

    },

    /**
     * Formats
     *
     * @param {Parser.IAST} document
     * @returns
     * @memberof LiquidService
     */
    doFormat (document) {

      // const filename = basename(document.textDocument.uri)
      // if (settings.ignore.files.includes(filename)) return

      const { uri, version, languageId } = document.textDocument

      /* FORMATS ------------------------------------ */

      const content = document.textDocument.getText()
      const literal = TextDocument.create(`${uri}.tmp`, languageId, version, content)
      const regions = (document.getEmbeds() || []).flatMap(Format.embeds(document, literal))

      /* REPLACE ------------------------------------ */

      return [
        TextEdit.replace(
          {
            start: Position.create(0, 0),
            end: document.textDocument.positionAt(content.length)
          },
          Format.markup(TextDocument.applyEdits(literal, regions))
        )
      ]

    },

    /**
     * `doHover`
     *
     * @param {Parser.IAST} document
     * @param {LSP.Position} position
     * @memberof LiquidService
     */
    async doHover (document, position) {

      if (document.getNodeAt(position)) {
        if (mode?.[document.node.language]) {
          return mode[document.node.language].doHover(document.node, position)
        }
      }

      const name = Hover.getWordAtPosition(document.textDocument, position)

      /**
       * @type {Parser.Cursor}
       */
      let spec
      let preview

      if (Spec.tags?.[name]) {
        spec = Spec.tags[name]
        preview = `{% ${name} %}`
      } else if (Spec.objects?.[name]) {
        spec = Spec.objects[name]
        preview = `{{ ${name} }}`
      } else if (Spec.filters?.[name]) {
        spec = Spec.filters[name]
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
          `\n[${upperFirst(Spec.engine)} Liquid](${spec.link})`
        ].join('\n')
      }

    },

    /**
     * `doComplete`
     *
     * @param {Parser.IAST} document
     * @param {LSP.Position} position
     * @param {LSP.CompletionContext} context
     */
    async doComplete (document, position, { triggerCharacter, triggerKind }) {

      // Prevent Completions when double
      if (triggerKind !== CompletionTriggerKind.TriggerCharacter) return null

      const offset = document.textDocument.offsetAt(position)
      const trigger = triggerCharacter.charCodeAt(0)

      // We are within a token
      if (document.withinToken(offset)) return Completion.inToken(offset, trigger)

      // Embedded Documents
      if (document.withinEmbed(offset)) return Completion.inEmbedded(mode, position)

      // Lets check if we are within a Node existing on the AST
      const ASTNode = document.getEmbedAt(offset) || document.getNodeAt(offset)

      // We have context of this node on the AST
      if (ASTNode) {
        return document.isEmbed
          ? Completion.inEmbedded(mode, position)
          : Completion.inToken(offset, trigger)
      }

      // At this point, the completion is either a whitespace or delimiter
      return Completion.findCompleteItems(offset, trigger)

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
