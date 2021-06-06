
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import { getLanguageService, ClientCapabilities, DiagnosticSeverity } from 'vscode-json-languageservice'
import store from '@liquify/schema-stores'

/**
 * JSON Language Service
 */
export class JSONService {

  service = getLanguageService(
    {
      clientCapabilities: ClientCapabilities.LATEST
    }
  )

  /**
   * Creates an instance of JSONService.
   *
   * @memberof JSONService
   */
  constructor () {

    this.service.configure(
      {
        validate: true,
        schemas: [
          {
            uri: 'http://json-schema.org/draft-07/schema',
            fileMatch: [ '*.json' ],
            schema: store('shopify-sections')
          }
        ]
      }
    )

  }

  /**
   * Validate JSON
   *
   * @param {Parser.ASTNode}node
   * @returns {Promise<diagnostics|null>}
   * @memberof JSONService
   */
  async doValidation (node) {

    const document = node.document()

    if (!document) return null

    const JSONDocument = this.service.parseJSONDocument(document)
    const diagnostics = await this.service.doValidation(document, JSONDocument)

    if (isEmpty(diagnostics)) return null

    return diagnostics.map(diagnostic => (
      merge(diagnostic, {
        range: {
          start: { line: diagnostic.range.start.line + node.range.start.line },
          end: { line: diagnostic.range.end.line + node.range.start.line }
        },
        data: {
          index: node.index,
          capabilities: {
            doFormat: diagnostic.severity !== DiagnosticSeverity.Error
          }
        }
      })
    ))

  }

  /**
   * JSON hover capabilities
   *
   * @memberof JSONService
   * @param {Parser.ASTNode} node
   * @param {LSP.Position} position
   */
  async doHover (node, { line, character }) {

    const document = node.document()

    if (!document) return null

    const JSONDocument = this.service.parseJSONDocument(document)
    const doHover = await this.service.doHover(
      document
      , { character, line: line - node.range.start.line }
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
   * @param {Parser.ASTNode} node
   * @param {LSP.Position} position
   * @return {Promise<LSP.CompletionList|null>}
   */
  async doComplete (node, { character, line }) {

    const document = node.document()

    if (!document) return null

    const JSONDocument = this.service.parseJSONDocument(document)
    const doComplete = await this.service.doComplete(
      document
      , { character, line: line - node.range.start.line }
      , JSONDocument
    )

    for (const { textEdit } of doComplete.items) {
      merge(textEdit, {
        range: {
          start: { line },
          end: { line }
        }
      })
    }

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
