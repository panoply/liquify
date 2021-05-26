import { TextEdit, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { CSSService } from 'service/modes/css'
import { SCSSService } from 'service/modes/scss'
import { JSONService } from 'service/modes/json'
// import { basename } from 'path'
import * as Format from 'service/format'
import * as Completion from 'service/completions'
import * as Hover from 'service/hovers'
import { Document } from 'provide/document'
import { Parser } from 'provide/parser'
import upperFirst from 'lodash/upperFirst'

/**
 * Liquid Language Service
 *
 * Provides capability features for the Liquid Language Server and
 * is used as combination with the `Server` module. The Language Service
 * was inspired in-part by the vscode language service modules.
 */
export default (mode => ({

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
   * @param {Parser.Scope} textDocument
   * @memberof LiquidService
   */
  async doValidation (document) {

    // const promise = Diagnostic.resolve(textDocument)
    // const validations = (await Promise.all(diagnostics.map(promise)))

    for (const node of Parser.getEmbeds(document)) {
      const region = await mode[node.language].doValidation(node)
      if (region) Parser.errors.push(...region)
    }

    return {
      uri: document.textDocument.uri
      , diagnostics: Parser.errors
    }

  },

  /**
   * Formats
   *
   * @param {Parser.Scope} document
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
    const regions = Parser.getEmbeds(document).flatMap(Format.embeds(literal))

    /* REPLACE ------------------------------------ */

    const newText = Format.markup(TextDocument.applyEdits(literal, regions))
    const range = {
      start: Position.create(0, 0),
      end: document.textDocument.positionAt(content.length)
    }

    return [ TextEdit.replace(range, newText) ]

  },

  /**
   * `doHover`
   *
   * @param {Parser.Scope} document
   * @param {LSP.Position} position
   * @memberof LiquidService
   */
  async doHover (document, position) {

    const [ node ] = Document.getNode(position)

    if (node) {
      if (mode?.[node.language]) {
        return mode[node.language].doHover(node, position)
      }
    }
    const name = Hover.getWordAtPosition(document.textDocument, position)

    /**
     * @type {Parser.Cursor}
     */
    let spec
    let preview

    if (Parser.spec.tags?.[name]) {
      spec = Parser.spec.tags[name]
      preview = `{% ${name} %}`
    } else if (Parser.spec.objects?.[name]) {
      spec = Parser.spec.objects[name]
      preview = `{{ ${name} }}`
    } else if (Parser.spec.filters?.[name]) {
      spec = Parser.spec.filters[name]
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
      `\n[${upperFirst(Parser.spec.engine)} Liquid](${spec.link})`
      ].join('\n')
    }

  },

  /**
   * `doComplete`
   *
   * @param {Parser.Scope} document
   * @param {LSP.Position} position
   * @param {LSP.CompletionContext} [context]
   */
  async doComplete (document, position, { triggerKind }) {

    const offset = document.textDocument.offsetAt(position)
    const [ node ] = Document.getNode(offset)

    if (node) {
      if (mode?.[node.language]) {
        const embeddedDocument = await mode[node.language].doComplete(node, position)
        embeddedDocument.data = { language: node.language }
        return embeddedDocument
      }
    }

    const tagComplete = Completion.getTriggerCompletion(document.textDocument, position)
    console.log(triggerKind)

    return tagComplete.map(Completion.setCompletionItems)

    // const doComplete = await Completion.getObjectCompletion(node, offset)

    // return !doComplete || doComplete.map(Completion.setCompletionItems)

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

}))(
  {
    css: null,
    scss: null,
    json: null,
    html: true
  }
)
