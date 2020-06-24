// @ts-check

import _ from 'lodash'
import { getLanguageService, ClientCapabilities } from 'vscode-json-languageservice'
import schema from './../../../shopify-sections.json'

/**
 * JSON Language Service
 *
 * @export
 * @typedef {import('vscode-json-languageservice').LanguageSettings} settings
 * @typedef {import('vscode-json-languageservice').LanguageServiceParams} params
 * @typedef {import('vscode-json-languageservice').Diagnostic} diagnostics
 * @typedef {import('../../../../release/vscode-liquify/server/node_modules/defs').ASTEmbeddedRegion} ASTEmbeddedRegion
 * @class JSONService
 */
export class JSONService {

  /**
   * Creates an instance of JSONService.
   *
   * @memberof JSONService
   */
  constructor () {

    /**
     * Get Language Service
     *
     * @memberof JSONService
     * @private
     */
    this.service = getLanguageService({
      clientCapabilities: ClientCapabilities.LATEST
    })

    this.service.configure({
      validate: true,
      schemas: [
        {
          uri: 'http://json-schema.org/draft-07/schema',
          fileMatch: [ '*.json' ],
          schema
        }
      ]
    })

  }

  /**
   * Configure
   *
   * @returns
   * @memberof JSONService
   */
  configure () {

  }

  /**
   * Validate JSON
   *
   * @param {ASTEmbeddedRegion} ASTEmbeddedRegion
   * @returns {Promise<diagnostics[]|boolean>}
   * @memberof JSONService
   */
  async doValidation ({
    embeddedDocument
    , lineOffset
  }) {

    const JSONDocument = this.service.parseJSONDocument(embeddedDocument)
    const diagnostics = (await this.service.doValidation(embeddedDocument, JSONDocument))

    if (_.isEmpty(diagnostics)) return false

    diagnostics.forEach(({ range }) => (
      _.merge(range, {
        start: { line: range.start.line + lineOffset },
        end: { line: range.end.line + lineOffset }
      })
    ))

    return diagnostics

  }

  /**
   * `doHover` - Provides hover capabilities within embedded JSON regions
   *
   * @param {import('../../../../release/vscode-liquify/server/node_modules/defs').ASTEmbeddedRegion} embed
   * @param {import('vscode-languageserver').Position} position
   * @memberof JSONService
   */
  async doHover ({
    embeddedDocument
    , lineOffset
  }, {
    line
    , character
  }) {

    // Correct line offsets
    const position = { character, line: _.subtract(line, lineOffset) }
    const JSONDocument = this.service.parseJSONDocument(embeddedDocument)
    const doHover = (await this.service.doHover(embeddedDocument, position, JSONDocument))

    return _.merge(doHover, {
      range: {
        start: { line },
        end: { line }
      }
    })

  }

  /**
   * JSON completion feature
   *
   * @param {import('../../../../release/vscode-liquify/server/node_modules/defs').ASTEmbeddedRegion} embed
   * @param {import('vscode-languageserver').Position} position
   * @return {Promise}
   */
  async doComplete ({
    embeddedDocument
    , lineOffset
  }, {
    line
    , character
  }) {

    // Correct line offsets
    const position = { character, line: _.subtract(line, lineOffset) }
    const JSONDocument = this.service.parseJSONDocument(embeddedDocument)
    const doComplete = await this.service.doComplete(
      embeddedDocument,
      position,
      JSONDocument
    ).then(completion => {

      console.log(completion)
      // Modify the completion item position
      completion.items.forEach(({ textEdit: { range } }) => (
        _.merge(range, {
          start: { line },
          end: { line }
        })
      ))

      return completion

    })

    return doComplete

  }

  /**
   * Generate a JSON text document
   *
   * @param {object} document The text document to create
   * @param {string} content The text document content
  */
  doResolve (completionItem) {

    return this.service.doResolve(completionItem)

  }

}

// const test = new JSONService()
// test.
