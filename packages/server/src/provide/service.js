// @ts-check

import _ from 'lodash'
import { TextEdit, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { Documents, Server } from '../export'
import { CSSService } from '../service/modes/css'
import { SCSSService } from '../service/modes/scss'
import { JSONService } from '../service/modes/json'
import * as Diagnostic from '../service/diagnostics'
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
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').DocumentModel} DocumentModel
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').FormattingRules} FormattingRules
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ValidationPromises} ValidationPromises
 */
export class LiquidService {

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
    json: null
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
   * @param {*} document
   * @param {*} diagnostics
   * @memberof LiquidService
   */
  async doValidation (document, { diagnostics }) {

    // disabled temporarily
    if (!diagnostics) {
      return {
        uri: document.uri,
        diagnostics: []
      }
    }

    // const embedded = Documents.getEmbeddedDocuments(document.uri, false)
    const embedded = []
    const promise = Diagnostic.resolve(document)
    const validations = (await Promise.all(diagnostics.map(promise)))

    if (embedded && embedded.length > 0) {
      for (const embed of embedded) {
        const region = await this.modes[embed.languageId].doValidation(embed)
        if (region) validations.push(...region)
      }
    }

    if (validations.length > 0) {
      return {
        uri: document.uri,
        diagnostics: validations.filter(Boolean)
      }
    }
  }

  /**
   * Formats
   *
   * @param {TextDocument} document
   * @param {FormattingRules} formattingRules
   * @returns
   * @memberof LiquidService
   */
  doFormat (document, formattingRules) {

    const { languageId, version, uri } = document

    // const filename = path.basename(uri)
    // if (settings.ignore.files.includes(filename)) return

    const embedded = Documents.getEmbeddedDocuments(uri)

    if (!embedded) return null

    const content = document.getText()
    const literal = TextDocument.create(`${uri}.tmp`, languageId, version, content)
    const regions = _.flatMap(embedded, embed => Format.embeds(literal, embed))
    const formats = Format.markup(TextDocument.applyEdits(literal, regions))
    const replace = { start: Position.create(0, 0), end: document.positionAt(content.length) }

    // Replace formatting edits - MUST BE RETURNED AS ARRAY
    return [ TextEdit.replace(replace, formats) ]

  }

  /**
   * `doHover`
   *
   * @param {TextDocument} document
   * @param {Position} position
   * @returns
   * @memberof LiquidService
   */
  doHover (document, position) {

    const offset = document.offsetAt(position)
    const [ embed = false ] = Documents.embeds(document.uri, offset)

    if (embed && this.modes?.[embed.languageId]) {
      if (this.modes[embed.languageId]) {
        return this.modes[embed.languageId].doHover(embed, position)
      } else {
        return null
      }
    }

    const name = Hover.getWordAtPosition(document, position)

    if (!Server.specification[name]) return null

    const { type, description, engine, reference } = Server.specification[name]

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
   * @param {TextDocument} document
   * @param {Position} position
   * @param {CompletionContext} context
   * @memberof LiquidService
   */
  async doComplete (document, position, { triggerKind }) {

    const { uri } = document
    const offset = document.offsetAt(position)
    const [ embed = false ] = Documents.embeds(uri, offset)

    let doComplete

    if (embed && _.has(this.modes, embed.languageId)) {
      const { languageId } = embed
      if (this.modes[languageId]) {
        doComplete = await this.modes[languageId].doComplete(embed, position)
        doComplete.data = { languageId }
        return doComplete
      }
    }

    const [ node ] = Documents.get(offset)

    if (!node) return null

    doComplete = Completion.getObjectCompletion(node, offset)

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

    if (_.has(completionItem.data, 'languageId')) {
      return this.modes[completionItem.data.languageId].doResolve(completionItem)
    }

    return completionItem

  }

}

// export const Server = new LiquidService()
