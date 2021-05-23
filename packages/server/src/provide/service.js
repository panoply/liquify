// @ts-check

import _ from 'lodash'
import { TextEdit, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { CSSService } from '../service/modes/css'
import { SCSSService } from '../service/modes/scss'
import { JSONService } from '../service/modes/json'
import { Document } from '../provide/document'
import * as Format from '../service/formats'
import * as Completion from '../service/completions'
import * as Hover from '../service/hovers'

/**
 * Liquid Language Service
 *
 * Provides capability features for the Liquid Language Server and
 * is used as combination with the `Server` module. The Language Service
 * was inspired in-part by the vscode language service modules.
 *
 * @export
 * @class LiquidService
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} textDocument
 * @typedef {import('vscode-languageserver').TextEdit} textEdit
 * @typedef {import('vscode-languageserver').Position} position
 * @typedef {import('vscode-languageserver').CompletionItem} CompletionItem
 * @typedef {import('vscode-languageserver').CompletionContext} CompletionContext
 * @typedef {import('vscode-languageserver').TextDocumentContentChangeEvent} ChangeEvent
 * @typedef {import('defs').DocumentModel} DocumentModel
 * @typedef {import('defs').FormattingRules} FormattingRules
 * @typedef {import('defs').ValidationPromises} ValidationPromises
 */
class LiquidService {

  /**
   * Service Modes
   *
   * Enabled/Disabled Language service providers. Services here will be used on
   * embedded language regions located within text documents or `.*.liquid` files.
   *
   * @memberof LiquidService
   */
  modes = ({
    css: null,
    scss: null,
    json: null,
    html: true
  })

  /**
   * Configure
   *
   * Executed on Server intialization and will configure the
   * language service options to be used by its instance.
   *
   * @param {import('../../../release/vscode-liquify/server/node_modules/defs').Services} support
   * @memberof LiquidService
   */
  configure (support) {

    // CSS Language Service
    if (support.css) this.modes.css = new CSSService()

    // SCSS Language Service
    if (support.scss) this.modes.scss = new SCSSService()

    // JSON Language Service
    if (support.json) this.modes.json = new JSONService()

  }

  /**
   * `doValidation`
   *
   * @param {Document.Scope} textDocument
   * @memberof LiquidService
   */
  async doValidation ({
    ast
    , diagnostics = []
    , textDocument: { uri }
  }) {

    // const promise = Diagnostic.resolve(textDocument)
    // const validations = (await Promise.all(diagnostics.map(promise)))
    const nodes = ast.filter(({ embeddedDocument: { languageId } }) => this.modes?.[languageId])

    for (const node of nodes) {
      const region = await this.modes[node.embeddedDocument.languageId].doValidation(node)
      if (region) diagnostics.push(...region)
    }

    return {
      uri
      , diagnostics
    }

  }

  /**
   * Formats
   *
   * @paramz {TextDocument} document
   * @paramz {FormattingRules} formattingRules
   * @returns
   * @memberof LiquidService
   */
  doFormat (document) {

    // const filename = path.basename(uri)
    // if (settings.ignore.files.includes(filename)) return

    const { uri, version, languageId } = document.textDocument
    const embedded = Document.getEmbeds()

    // if (embedded.length < 0) return null

    const content = document.textDocument.getText()
    const literal = TextDocument.create(`${uri}.tmp`, languageId, version, content)
    // const regions = embedded.map((embed) => Format.embeds(literal, embed))

    // Replace formatting edits - MUST BE RETURNED AS ARRAY
    return [
      TextEdit.replace(
        {
          start: Position.create(0, 0),
          end: document.textDocument.positionAt(content.length)
        },
        Format.markup(literal.getText())
        // TextDocument.applyEdits(literal, [ Format.markup(content) ])
      //  Format.markup(content)
        //, Format.markup(TextDocument.applyEdits(literal, regions))
      )
    ]

  }

  /**
   * `doHover`
   *
   * @returns
   * @memberof LiquidService
   */
  async doHover (document, position) {

    const [ node ] = Document.getNode(position)
    if (node && this.modes?.[node.languageId]) {
      return this.modes[node.languageId].doHover(node, position)
    }

    const name = Hover.getWordAtPosition(document, position)

    let spec

    if (Server.specification.tags?.[name]) {
      spec = Server.specification.tags[name]
    } else if (Server.specification.objects?.[name]) {
      spec = Server.specification.objects[name]
    } else {
      return null
    }

    const { type, description, engine, reference } = spec

    return {
      kind: 'markdown',
      contents: [
        '```liquid',
        type === 'object' ? `{{ ${name} }}` : `{% ${name} %}`,
        '```',
        description,
        '\n---',
      `\n[${engine} Liquid](${reference})`
      ].join('\n')
    }

  }

  /**
   * `doComplete`
   *
   * @paramz {CompletionContext} contextsss
   * @memberof LiquidService
   */
  async doComplete (document, position, { triggerKind }) {

    const offset = Document.offsetAt(position)
    const [ node ] = Document.getNode(offset)

    let doComplete

    if (node?.embeddedDocument) {
      const { languageId } = node.embeddedDocument
      if (this.modes[languageId]) {
        doComplete = await this.modes[languageId].doComplete(node, position)
        doComplete.data = { languageId }
        return doComplete
      }
    }

    if (!node) return null

    doComplete = await Completion.getObjectCompletion(node, offset)

    return !doComplete || doComplete.map(Completion.setCompletionItems)

  }

  /**
   * `doCompleteResolve`
   *
   * @param {CompletionItem} completionItem
   * @returns
   * @memberof LiquidService
   */
  doCompleteResolve (completionItem) {

    if (completionItem.data?.languageId) {
      return this.modes[completionItem.data.languageId].doResolve(completionItem)
    }

    return completionItem

  }

}

export const Service = new LiquidService()
