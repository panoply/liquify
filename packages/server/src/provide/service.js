// @ts-check

import _ from 'lodash'
import { TextEdit, Position } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import Documents from '../provide/document'
import { Server } from '../export'
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
  async doValidation ({ textDocument, embedded }, { diagnostics }) {

    // disabled temporarily
    /* if (!diagnostics) {
      return {
        uri: document.uri,
        diagnostics: []
      }
    } */

    const promise = Diagnostic.resolve(textDocument)
    const validations = (await Promise.all(diagnostics.map(promise)))

    console.log(validations)

    embedded.forEach(async ({ textDocument }) => {
      const region = await this.modes[textDocument.languageId].doValidation(textDocument)
      if (region) validations.push(...region)
    })

    if (validations.length > 0) {
      return {
        uri: textDocument.uri,
        diagnostics: validations.filter(Boolean)
      }
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
  doFormat ({ textDocument, embedded, ast }, formattingRules) {

    // const filename = path.basename(uri)
    // if (settings.ignore.files.includes(filename)) return

    const { uri, version, languageId } = textDocument
    const embeds = embedded.values()

    if (!embeds) return null

    const content = textDocument.getText()
    const literal = TextDocument.create(`${uri}.tmp`, languageId, version, content)
    const regions = _.flatMap(
      Array.from(embedded),
      ([ , embed ]) => Format.embeds(literal, embed)
    )

    // Replace formatting edits - MUST BE RETURNED AS ARRAY
    return [
      TextEdit.replace(
        {
          start: Position.create(0, 0),
          end: textDocument.positionAt(content.length)
        }
        , Format.markup(TextDocument.applyEdits(literal, regions))
      )
    ]

  }

  /**
   * `doHover`
   *
   * @returns
   * @memberof LiquidService
   */
  doHover ({ textDocument, embedded }, position) {

    const embed = embedded.get('json')

    if (embed && this.modes?.[embed.languageId]) {
      if (this.modes[embed.languageId]) {
        return this.modes[embed.languageId].doHover(embed, position)
      } else {
        return null
      }
    }

    const name = Hover.getWordAtPosition(textDocument, position)

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
   * @paramz {CompletionContext} contextsss
   * @memberof LiquidService
   */
  async doComplete (document, position, { triggerKind }) {

    const { textDocument, embedded } = document
    const offset = textDocument.offsetAt(position)
    const embeds = embedded.values()

    let doComplete

    if (embeds && _.has(this.modes, embeds.languageId)) {
      const { languageId } = embeds
      if (this.modes[languageId]) {
        doComplete = await this.modes[languageId].doComplete(embeds, position)
        doComplete.data = { languageId }
        return doComplete
      }
    }

    const [ node ] = Documents.ASTNode(textDocument.uri, offset)

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

    if (_.has(completionItem.data, 'languageId')) {
      return this.modes[completionItem.data.languageId].doResolve(completionItem)
    }

    return completionItem

  }

}

// export const Server = new LiquidService()
