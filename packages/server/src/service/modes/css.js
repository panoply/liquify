// @ts-check

import _ from 'lodash'
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  LanguageService,
  ClientCapabilities
} from 'vscode-css-languageservice'

/**
 * JSON Language Service
 *
 * @export
 * @typedef {import('vscode-json-languageservice').LanguageSettings} settings
 * @typedef {import('vscode-json-languageservice').LanguageServiceParams} params
 * @class CSSService
 */
export class CSSService {

  constructor () {

    /**
   * Get Language Service
   *
   * @memberof CSSService
   * @private
   */
    this.service = getCSSLanguageService({
      clientCapabilities: ClientCapabilities.LATEST,
      customDataProviders: [
        {
          providePseudoClasses: () => [
            {
              name: 'sissel'
            }
          ],
          provideProperties: () => [
            {
              name: 'sissel'
            }
          ],
          provideAtDirectives: () => [
            {
              name: 'sissel'
            }
          ],
          providePseudoElements: () => [
            {
              name: 'sissel'
            }
          ]
        }
      ]

    })

  }

  /**
   * Service Settings
   *
   * @type {settings}
   * @memberof CSSService
   * @private
   */

  /**
   * Configure
   *
   * @returns
   * @memberof CSSService
   */
  configure () {

  }

  parse (node) {

    const { embeddedDocument, languageId } = node
    const prop = _.upperCase(languageId) + 'Document'

    node[prop] = this.service.parseStylesheet(embeddedDocument)

  }

  /**
   * Validate JSON
   *
   * @param {import('vscode-languageserver').TextDocument} textDocument
   * @param {array} ast
   * @returns {array}
   * @memberof CSSService
   */
  async doValidation ({
    embeddedDocument
    , lineOffset
  }) {

    const CSSDocument = this.service.parseStylesheet(embeddedDocument)
    const diagnostics = await this.service.doValidation(embeddedDocument, CSSDocument, {
      validate: false
    })

    return diagnostics.map(diagnostic => (
      {
        ...diagnostic,
        range: {
          start: {
            ...diagnostic.range.start,
            line: diagnostic.range.start.line + lineOffset
          },
          end: {
            ...diagnostic.range.end,
            line: diagnostic.range.end.line + lineOffset
          }
        }
      }
    ))

  }

  /**
   * Generate a JSON text document
   *
   * @param {import('vscode-languageserver').TextDocument} textDocument
   * @param {string} content The text document content
   */
  async doHover ({
    embeddedDocument
    , lineOffset
  }, {
    line
    , character
  }) {

    console.log('DO HOVER', embeddedDocument, line)

    // Correct line offsets
    const position = { character, line: _.subtract(line, lineOffset) }
    const CSSDocument = this.service.parseStylesheet(embeddedDocument)
    const doHover = await this.service.doHover(embeddedDocument, position, CSSDocument)

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
   * @param {Parser.AST} ASTNode
   * @param {LSP.Position} Position
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
    const StyleDocument = this.service.parseStylesheet(embeddedDocument)
    const doComplete = this.service.doComplete(
      embeddedDocument,
      position,
      StyleDocument
    )

    doComplete.items.forEach(({ textEdit: { range } }) => (
      _.merge(range, {
        start: { line },
        end: { line }
      })
    ))

    return doComplete

  }

  /**
   * Generate a JSON text document
   *
   * @param {object} document The text document to create
   * @param {string} content The text document content
  */
  doResolve (completionItem) {

    //  return this.service..doResolve(completionItem)

  }

}

// const test = new CSSService()
// test.
