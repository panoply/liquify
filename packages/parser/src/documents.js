import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'


const model = (languageId, model = { ast: [] }) => {

  if (languageId !== 'liquid-standard') {
    model.embeddedDocuments = []
    model.linkedDocuments = []
  }

  if (languageId !== 'liquid-jekyll' || languageId !== 'liquid-11ty') {
    model.frontmatter = {}
  }

  return state => ({ ...state, ...model })

}

/**
 * Documents Manager
 *
 * This file manages document state and configuration for each open file
 * in the workspace. The module extends upon the vscode textdocument
 * manager and uses `Map()` storage to maintain each document.
 *
 * For more information see:
 *
 * TextDocument
 * @see https://github.com/microsoft/vscode-languageserver-node
 */
export default (function() {

  /**
   * Model Scope - Value held in this variable will change
   * and match the current active document
   *
   * @type {TextDocument}
   */
  let textDocument
    , stateManager

  /**
   * Model Storage
   *
   * @type {Map}
   */
  const documents = new Map()

  /**
   * Creates a document model manager for the text document, this
   * function is executed per document open.
   *
   * @param {LSP.TextDocumentItem} textDocumentItem
   * @param {boolean} cb
   * @returns {function | Document.Scope}
   */
  function create ({ uri, languageId, version, text }, cb = true) {

    textDocument = TextDocument.create(uri, languageId, version, text)
    stateManager = documents.has(uri) ? documents.get(uri) : documents.set(
      uri,
      model(languageId)(textDocument)
    ).get(uri)

    // Document creation is executed via the `onDidOpenTextDocument`
    // the model will be passed to the Parser
    return cb ? callback => callback(stateManager) : stateManager

  }


  /**
   * Creates a document model manager for the text document, this
   * function is executed per document open.
   *
   * @param {LSP.TextDocumentItem} document
   * @param {boolean} cb
   * @returns {function | Document.Scope}
   */
  function update (document, changes) {

    textDocument = TextDocument.update(document, changes, document.version)

    // Document creation is executed via the `onDidOpenTextDocument`
    // the model will be passed to the Parser
    return changes.map(change => ({
      ...change,
      range: {
        start: textDocument.offsetAt(change.range.start),
        end: textDocument.offsetAt(change.range.start)
      }
    }))

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
      return textDocument.ast
    }

    const { ast } = (typeof uri === 'string' && documents.has(uri))
      ? documents.get(uri)
      : textDocument

    if (typeof offset === 'object') {
      offset = textDocument.offsetAt(offset)
    }

    const index = textDocument.ast.findIndex(({
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
  function getEmbeds () {

    return textDocument.ast.filter(({ languageId }) => languageId)

  }

  /**
   * Get all Linked documents. The `linkedDocuments`
   * property records the node index location of each block.
   *
   * @returns
   */
  function getLinks () {

    return textDocument.linkedDocuments.map(link => textDocument.ast[link].linkedDocument)

  }

  /**
   * Set document range from offset index positioning.
   * This function does a lot of heavy lifting.
   *
   * @returns {LSP.Range}
   */
  function getRange (start, end) {

    return {
      start: textDocument.positionAt(start),
      end: textDocument.positionAt(end)
    }

  }

  /**
   * Get the document matching the uri, a simple helper
   * function for fetching the document model from Map.
   *
   * @param {string} uri
   * @returns {Document.Scope}
   */
  function get (uri) {

    const { ast } = documents.get(uri)

    if (textDocument.uri === uri) return textDocument

    if (documents.has(uri)) {
      textDocument = documents.get(uri)
      return textDocument
    }

    return null

  }


  function getDiagnostics (uri) {

    const { ast } = documents.get(uri)

    return _.flatMap(
      ast
      , ({ diagnostics = [] }) => [ ...diagnostics ]
    ).map(
      x => ({
        ...x,
        range: range(x[0], x[1])
      })
    ).filter(Boolean)

  }

  return {
    create
    , documents
    , update
    , getNode
    , getEmbeds
    , getLinks
    , getDiagnostics
    , getRange
  }

})()
