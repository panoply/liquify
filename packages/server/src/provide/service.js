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
  async doValidation ({ textDocument, diagnostics }) {

    if (!diagnostics) {
      return {
        uri: textDocument.uri,
        diagnostics: []
      }
    }

    const embedded = Documents.embeds(textDocument.uri)
    const promise = Diagnostic.resolve(textDocument)
    const validations = (await Promise.all(diagnostics.map(promise)))

    if (embedded) {
      for (const i of embedded) {
        const region = await this.modes[i.embeddedDocument.languageId].doValidation(i)
        if (region) validations.push(...region)
      }
    }

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
  doFormat ({ textDocument }, formattingRules) {

    // const filename = path.basename(uri)
    // if (settings.ignore.files.includes(filename)) return

    const { uri, version, languageId } = textDocument
    const embedded = Documents.embeds(uri)

    if (embedded.length < 0) return null

    const content = textDocument.getText()
    const literal = TextDocument.create(`${uri}.tmp`, languageId, version, content)
    const regions = embedded.map((embed) => Format.embeds(literal, embed))

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
  doHover ({ textDocument }, position) {

    // const [ node ] = Documents.ASTNode(textDocument.uri, textDocument.offsetAt(position))
    /*
    if (node && this.modes?.[node.embeddedDocument.languageId]) {
      if (this.modes[node.embeddedDocument.languageId]) {
        return this.modes[node.embeddedDocument.languageId].doHover(node.embeddedDocument, position)
      } else {
        return null
      }
    } */

    const name = Hover.getWordAtPosition(textDocument, position)

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

    const { textDocument } = document
    const offset = textDocument.offsetAt(position)
    const [ node ] = Documents.ASTNode(textDocument.uri, offset)

    let doComplete

    if (_.has(node, 'embeddedDocument')) {
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

    if (_.has(completionItem.data, 'languageId')) {
      return this.modes[completionItem.data.languageId].doResolve(completionItem)
    }

    return completionItem

  }

}

// export const Server = new LiquidService()
