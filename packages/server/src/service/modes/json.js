// @ts-check

import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import { getLanguageService, ClientCapabilities } from 'vscode-json-languageservice'
import store from '@liquify/schema-stores'

/**
 * JSON Language Service
 *
 * @export
 * @typedef {import('vscode-json-languageservice')} JSON
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
          schema: store('shopify-sections')
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
   * @param {Parser.ASTNode} ASTNode
   * @returns {Promise<diagnostics|false>}
   * @memberof JSONService
   */
  async doValidation (ASTNode) {

    const JSONDocument = this.service.parseJSONDocument(ASTNode.document)
    const diagnostics = await this.service.doValidation(ASTNode.document, JSONDocument)

    return isEmpty(diagnostics) ? false : diagnostics.map(
      diagnostic => merge(diagnostic, {
        range: {
          start: {
            line: diagnostic.range.start.line + ASTNode.range.start.line
          },
          end: {
            line: diagnostic.range.end.line + ASTNode.range.start.line
          }
        }
      })
    )

  }

  /**
   * JSON hover capabilities
   *
   * @memberof JSONService
   * @param {Parser.ASTNode} ASTNode
   * @param {LSP.Position} position
   */
  async doHover (ASTNode, { line, character }) {

    const JSONDocument = this.service.parseJSONDocument(ASTNode.document)
    const doHover = await this.service.doHover(
      ASTNode.document
      , { character, line: line - ASTNode.range.start.line }
      , JSONDocument
    )

    return merge(doHover, {
      range: {
        start: { line },
        end: { line }
      }
    })

  }

  /**
   * JSON completion feature
   *
   * @param {Parser.ASTNode} ASTNode
   * @param {LSP.Position} position
   * @return {Promise<LSP.CompletionList>}
   */
  async doComplete (ASTNode, { character, line }) {

    const JSONDocument = this.service.parseJSONDocument(ASTNode.document)
    const doComplete = await this.service.doComplete(
      ASTNode.document
      , { character, line: line - ASTNode.range.start.line }
      , JSONDocument
    ).then(
      completion => {

        for (const { textEdit } of completion.items) {
          merge(textEdit, {
            range: {
              start: { line },
              end: { line }
            }
          })
        }

        return completion

      }
    )

    return doComplete

  }

  /**
   * Generate a JSON text document
   *
   * @param {LSP.CompletionItem} completionItem
   */
  doResolve (completionItem) {

    return this.service.doResolve(completionItem)

  }

}
