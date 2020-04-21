// @ts-nocheck

import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'

/**
 * Documents
 *
 * Provides a documents manager for Liquid Language documents somewhat extending
 * upon the vscodes text document manager module.
 *
 *
 * @export
 * @class LiquidDocuments
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} textDocument
 * @typedef {import('vscode-languageserver').DidChangeTextDocumentParams} changeParams
 * @typedef {import('vscode-languageserver').TextDocumentContentChangeEvent} contentChanges
 * @typedef {import('vscode-languageserver').Position} position
 */
export class LiquidDocuments {

  /**
   * Text Documents
   *
   * @memberof LiquidDocuments
   */
  documents = {}

  /**
   * Create - Creates a manager of the text document
   *
   * @param {*} set
   * @memberof LiquidDocuments
   */
  create ({
    uri
    , languageId
    , version
    , text
  }) {

    if (!this.documents?.[uri]) {

      this.documents[uri] = {
        document: TextDocument.create(uri, languageId, version, text),
        settings: {},
        ast: [],
        diagnostics: []
      }
    }

    return callback => callback(this.documents[uri].document)

  }

  /**
   * Get - Returns the document record
   *
   * @param {string} uri
   * @returns {textDocument}
   * @memberof LiquidDocuments
   */
  get (uri) {

    return this.documents?.[uri]

  }

  /**
   * Set - Sets record on document
   *
   * @param {array} uri
   * @param {string} uri
   * @returns {textDocument}
   * @memberof LiquidDocuments
   */
  set (prop, record) {

    return this.documents?.[uri]?.[prop]

  }

  model (uri) {

  }

  /**
   * Update - Update document context and convert range positions to offsets
   *
   * @param {*} { uri, version }
   * @param {contentChanges[]} contentChanges
   * @returns {{ document: textDocument, changes: contentChanges }}
   * @memberof LiquidDocuments
   */
  update (document, contentChanges) {

    const { version } = document

    TextDocument.update(document, contentChanges, version)

    return contentChanges.map(change => ({
      ...change,
      range: {
        start: document.offsetAt(change.range.start),
        end: document.offsetAt(change.range.end)
      }
    }))

  }

  /**
   *
   *
   * @param {*} uri
   * @memberof LiquidDocuments
   */
  remove (uri) {

    delete this.documents[uri]

  }

  reset () {

    for (const uri in this.documents) delete this.documents[uri]

  }

  ast (uri) {

    return ({
      document: () => this.documents[uri].ast,
      get: at => {

        const index = this.documents[uri].ast.findIndex(({ offset }) => _.isArray(offset)
          ? _.inRange(at, offset[0], offset[1])
          : _.inRange(at, offset.start[0], offset.end[1]))

        return [ this.documents[uri].ast[index], index ]

      },
      increment: (
        from
      ) => {

        this.documents[uri].diagnostics.forEach(([ offset ], key) => {
          if (key > from) {
            this.documents[uri].diagnostics[key][0] = offset + 1
          }
        })

        return this.documents[uri]

      },
      update: (
        items
        , from
      ) => {

        if (from) {
          this.documents[uri].ast.splice(from).push(...items.ast)

          items.diagnostics.forEach(([ offset ], key) => {

            this.documents[uri].diagnostics[key][0] = offset

          })

          this.documents[uri].diagnostics.splice(from).push(...items.diagnostics)
        }

        Object.assign(this.documents[uri], {
          ast: from ? this.documents[uri].ast : items.ast,
          diagnostics: from ? this.documents[uri].diagnostics : items.diagnostics
        })

        return this.documents[uri]
      }

    })

  }

  diagnostics (uri) {

    const { diagnostics } = this.documents[uri]

    return ({

      increment: from => ast.forEach(({ offset }, key) => {
        if (key > from) {
          if (typeof offset === 'object') {
            if (offset?.start) offset.start = [ offset.start[0] + 1, offset.start[1] + 1 ]
            if (offset?.end) offset.end = [ offset.end[0] + 1, offset.end[1] + 1 ]
          } else {
            offset = [ offset[0] + 1, offset[1] + 1 ]
          }
        }
      })
    })

  }

}
