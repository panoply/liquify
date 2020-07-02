import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'

/**
 * Documents Manager
 *
 * Manages the document state and configuration of each open file
 * in the workspace. The module extends upon the vscode textdocument
 * manager and uses `Map()` storage to maintain each document.
 */
function LiquidDocuments (documents = new Map()) {

  /**
   * Model Scope - Value held in this variable will change
   * and match the current active document
   *
   * @type {Document.Scope}
   */
  let document

  /**
   * Creates a document model manager for the text document, this
   * function is executed per document open.
   *
   * @param {LSP.TextDocumentItem} textDocumentItem
   * @param {boolean} cb
   * @returns {function | Document.Scope}
   */
  function create ({ uri, languageId, version, text }) {

    document = documents.has(uri) ? documents.get(uri) : documents.set(uri, {
      diagnostics: [],
      documentLinks: [],
      ast: [],
      textDocument: TextDocument.create(
        uri
        , languageId
        , version
        , text
      )
    }).get(uri)

    return parser => parser(document)

  }

  /**
   * Update the text document model, this is execute each time the document
   * content content and is called via the `onDidChangeTextDocument` event. Majority
   * of this logic was lifted from the 'vscode-textdocument' module.
   *
   * @param {LSP.VersionedTextDocumentIdentifier} textDocument
   * @param {Document.ContentChanges[]} contentChanges
   * @returns {Document.Scope}
   */
  function update ({ uri, version }, contentChanges) {

    if (!document || document.textDocument.uri !== uri) {
      if (!documents.has(uri)) return null
      document = documents.get(uri)
    }

    TextDocument.update(
      document.textDocument
      , contentChanges
      , version
    )

    return document

  }

  /**
   * Get a node in the AST tree that matches a supplied
   * offset index position.
   *
   * @param {number|object} [offset=undefined]
   * @param {string} [uri=undefined]
   * @returns
   */
  function getNode (offset = undefined, uri = undefined) {

    if (typeof offset === 'undefined' && typeof uri === 'undefined') {
      return document.ast
    }

    const { ast } = (typeof uri === 'string' && documents.has(uri))
      ? documents.get(uri)
      : document

    if (typeof offset === 'object') {
      offset = document.textDocument.offsetAt(offset)
    }

    const index = document.ast.findIndex(({
      offset: [
        TL = -1
        , TR = -1
        , BL = -1
        , BR = -1
      ]
    }) => (
      _.inRange(offset, TL, TR) || _.inRange(offset, BL, BR) || _.inRange(offset, TR, BL)
    ))

    return [ ast[index], index ]

  }

  /**
   * Get all Embedded language nodes on the AST. The `embeddedDocuments`
   * property records the node index location of each embedded block.
   *
   * @returns
   */
  // @ts-ignore
  function getEmbeds (uri) {

    return document.ast.filter(({ languageId }) => languageId)

  }

  /**
   * Get all Linked documents. The `linkedDocuments`
   * property records the node index location of each block.
   *
   * @returns
   */
  // @ts-ignore
  function getLinks (uri) {

    return document.ast.filter(({ linkedDocument }) => linkedDocument)

  }

  /**
   * Set document range from offset index positioning.
   * This function does a lot of heavy lifting.
   *
   * @returns {LSP.Range}
   */
  function getRange (start, end) {

    return {
      start: document.textDocument.positionAt(start),
      end: document.textDocument.positionAt(end)
    }

  }

  function getDiagnostics (uri) {

    const { ast } = documents.get(uri)

    return _.flatMap(
      ast
      , ({ diagnostics = [] }) => [ ...diagnostics ]
    ).map(
      x => ({
        ...x,
        range: this.getRange(x[0], x[1])
      })
    ).filter(Boolean)

  }

  return {
    create
    , update
    , getNode
    , getEmbeds
    , getLinks
    , getRange
    , getDiagnostics
    , documents
  }

}

export const Document = LiquidDocuments()
