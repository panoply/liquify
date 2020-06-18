import _ from 'lodash'

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
 *
 */

/**
 * Merge Sort
 *
 * @param {array} data
 * @param {function} compare
 */
const mergeSort = (data, compare) => {

  if (data.length <= 1) return data

  const p = (data.length / 2) | 0
  const left = data.slice(0, p)
  const right = data.slice(p)

  mergeSort(left, compare)
  mergeSort(right, compare)

  let leftIdx = 0
    , rightIdx = 0
    , i = 0

  while (leftIdx < left.length && rightIdx < right.length) {
    compare(left[leftIdx], right[rightIdx]) <= 0
      ? data[i++] = left[leftIdx++]
      : data[i++] = right[rightIdx++]
  }

  while (leftIdx < left.length) data[i++] = left[leftIdx++]
  while (rightIdx < right.length) data[i++] = right[rightIdx++]
  return data

}

/**
 * Compute Line Offsets
 *
 * @param {string} text
 * @param {boolean} isAtLineStart
 * @param {number} textOffset
 */
const computeLineOffsets = (text, isAtLineStart, textOffset = 0) => {

  const result = isAtLineStart ? [ textOffset ] : []

  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i)
    if (ch === 13 || ch === 10) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++
      result.push(textOffset + i + 1)
    }
  }

  return result
}

/**
 * Get well formed range
 *
 * @param {object} param
 */
const getWellformedRange = ({ start, end }) => (start.line > end.line || (
  start.line === end.line && start.character > end.character
) ? {
    start: end,
    end: start
  } : {
    start,
    end
  }
)

/**
 * Get well formed edit
 *
 * @param {object} textEdit
 */
const getWellformedEdit = textEdit => {

  const range = getWellformedRange(textEdit.range)

  return range !== textEdit.range ? {
    newText: textEdit.newText,
    range
  } : textEdit

}

/**
 * Documents
 *
 * Provides a documents documents for Liquid Language documents somewhat extending
 * upon the vscodes text document module.
 *
 * @typedef {import('types/ast').AST} AST
 * @typedef {import('vscode-languageserver').DidOpenTextDocumentParams} onDocumentOpen
 * @typedef {import('vscode-languageserver').Diagnostic} Diagnostic
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} TextDocument
 * @typedef {import('vscode-languageserver').DidChangeTextDocumentParams} onDocumentChange
 */
export default (function () {

  /**
   * Model Scope
   *
   * @type {object}
   */
  let document

  /**
   * Model Storage
   *
   * @type {Map}
   */
  const documents = new Map()

  /**
   * GetText function - stores the document content text
   * as a function value, assigned to each document model.
   *
   *
   * @param {object} [content=undefined]
   * @returns {(range: object) => string}
   */
  const getText = content => range => range
    ? content.substring(offsetAt(range.start), offsetAt(range.end))
    : content

  /**
   * Creates a document model manager for the text document, this
   * function is executed per document open.
   *
   * @typedef {onDocumentOpen}
   */
  function create ({ uri, languageId, version, text }, cb = true) {

    document = documents.has(uri) ? documents.get(uri) : documents.set(uri, {

      /**
       * uri indentifier
       *
       * @type {string}
       */
      uri,

      /**
       * Language ID
       *
       * @type {string}
       */
      languageId,

      /**
       * Version
       *
       * @type {number}
       */
      version,

      /**
       * AST
       *
       * @type {AST[]}
       */
      ast: [],

      /**
       * Document Settings
       *
       * @type {object}
       */
      settings: {},

      /**
       * Diagnostics
       *
       * @type {Diagnostic[]}
       */
      diagnostics: [],

      /**
       * Frontmatter
       *
       * @type {object}
       */
      frontmatter: {},

      /**
       * Links
       *
       * @type {number[]}
       */
      linkedDocuments: [],

      /**
       * Embedded Documents
       *
       * @type {number[]}
       */
      embeddedDocuments: [],

      /**
       * Line Offsets
       *
       * @type {number[]}
       */
      lineOffsets: undefined,

      /**
       * Document Text
       *
       * @type {function}
       */
      getText: getText(text)

    }).get(uri)

    // Detect a change in Language ID and update the document model
    if (document.languageId !== languageId) return create(document, cb)

    // Document creation is executed via the `onDidOpenTextDocument`
    // the model will be passed to the Parser
    return cb ? callback => callback(document) : document

  }

  /**
   * Update the text document model, this is execute each time the document
   * content changes and is called via the `onDidChangeTextDocument` event. Majority
   * of this logic was lifted from the 'vscode-textdocument' module.
   *
   * @param {object} textDocument
   * @param {object} changes
   */
  function update (textDocument, changes) {

    document = documents.has(textDocument.uri)
      ? documents.get(textDocument.uri)
      : create(textDocument, false)

    if (document.languageId !== textDocument.languageId) document = create(textDocument, false)

    const content = document.getText()

    for (const change of changes) {

      const range = getWellformedRange(change.range)
      const start = offsetAt(range.start)
      const end = offsetAt(range.end)

      // Re-assign the getText() function
      document.getText = getText(
        content.substring(0, start) +
        change.text +
        content.substring(end, content.length)
      )

      const startLine = Math.max(range.start.line, 0)
      const endLine = Math.max(range.end.line, 0)
      const newLines = computeLineOffsets(change.text, false, start)

      let { lineOffsets } = document

      if (endLine - startLine === newLines.length) {
        for (let i = 0, len = newLines.length; i < len; i++) {
          lineOffsets[i + startLine + 1] = newLines[i]
        }
      } else {
        if (newLines.length < 10000) {
          lineOffsets.splice(startLine + 1, endLine - startLine, ...newLines)
        } else {
          document.lineOffsets = lineOffsets = lineOffsets
            .slice(0, startLine + 1)
            .concat(newLines, lineOffsets.slice(endLine + 1))
        }
      }

      const diff = change.text.length - (end - start)

      if (diff !== 0) {
        for (let i = startLine + 1 + newLines.length
          , len = lineOffsets.length; i < len; i++) lineOffsets[i] = lineOffsets[i] + diff
      }

      // Convert range position to offsets, the parser works using index
      // offset locations we will send range required records to `range`
      change.range.start = start
      change.range.end = end

    }

    return {
      changes,
      document: {
        ...document,
        version: textDocument.version
      }
    }

  }

  /**
   * Get a node in the AST tree that matches a supplied
   * offset index position.
   *
   * @param {number} [offset=undefined]
   * @param {string} [uri=undefined]
   * @returns
   */
  function getNode (offset = undefined, uri = undefined) {

    if (typeof offset === 'undefined' && typeof uri === 'undefined') return document.ast

    const { ast } = (typeof uri === 'string' && documents.has(uri))
      ? documents.get(uri)
      : document

    const index = document.ast.findIndex(({
      offset: [
        TL = -1
        , TR = -1
        , BL = -1
        , BR = -1
      ]
    }) => (
      _.inRange(offset, TL, TR) ||
      _.inRange(offset, BL, BR) ||
      _.inRange(offset, TR, BL)
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

    return document.embeddedDocuments.map(link => document.ast[link].embeddedDocument)

  }

  /**
   * Get all Linked documents. The `linkedDocuments`
   * property records the node index location of each block.
   *
   * @returns
   */
  function getLinks () {

    return document.linkedDocuments.map(link => document.ast[link].link)

  }

  /**
   * Includes
   *
   * @param {string} uri
   * @returns
   */
  function getIncludes (uri) {

    const document = documents.get(uri)
    const nodes = document.ast.filter(({ type }) => type === TokenType.include)

    return nodes.map(({ offset: [ start, end ], paths }) => (
      {
        command: {
          title: 'view file',
          command: 'liquid.codelens',
          arguments: [ paths.include[0], false ]
        },
        range: {
          start: document.positionAt(start),
          end: document.positionAt(end)
        }
      }
    ))

  }

  /**
   * Set document range from offset index positioning.
   * This function does a lot of heavy lifting.
   *
   * @returns
   */
  function range (start, end) {

    return {
      start: positionAt(start),
      end: positionAt(end)
    }

  }

  /**
   * Get line offsets
   *
   * @returns
   */
  function getLineOffsets () {

    if (document.lineOffsets === undefined) {
      document.lineOffsets = computeLineOffsets(document.getText(), true)
    }

    return document.lineOffsets

  }

  /**
   * Returns the document offset location from a range Position
   *
   * @param {object} position
   * @returns
   */
  function offsetAt (position) {

    const lineOffsets = getLineOffsets()
    const content = document.getText()

    if (position.line >= lineOffsets.length) return content.length
    if (position.line < 0) return 0

    const lineOffset = lineOffsets[position.line]
    const nextLineOffset = (position.line + 1 < lineOffsets.length)
      ? lineOffsets[position.line + 1]
      : content.length

    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset)

  }

  /**
   * Returns the document position from an offset location
   *
   * @param {number} offset
   * @returns
   */
  function positionAt (offset) {

    offset = Math.max(Math.min(offset, document.getText().length), 0)

    const lineOffsets = getLineOffsets()

    let low = 0
      , high = lineOffsets.length

    if (high === 0) {
      return {
        line: 0,
        character: offset
      }
    }

    while (low < high) {
      const mid = Math.floor((low + high) / 2)
      lineOffsets[mid] > offset ? (high = mid) : (low = mid + 1)
    }

    const line = low - 1

    return {
      line,
      character: offset - lineOffsets[line]
    }
  }

  /**
   * Apply edits to a document literal
   *
   * @param {TextDocument} document
   * @param {array} edits
   * @returns
   */
  function applyEdits (document, edits) {

    const spans = []
    const text = document.getText()
    const sortedEdits = mergeSort(edits.map(getWellformedEdit), (
      begin
      , end
      , diff = begin.range.start.line - begin.range.start.line
    ) => diff === 0 ? end.range.start.character - end.range.start.character : diff)

    let modified = 0

    for (const { range, newText } of sortedEdits) {

      const start = offsetAt(range.start)

      if (start < modified) throw new Error('Overlapping edit')
      if (start > modified) spans.push(text.substring(modified, start))
      if (newText.length) spans.push(newText)

      modified = offsetAt(range.end)

    }

    spans.push(text.substr(modified))

    return spans.join('')

  }

  return {
    create
    , update
    , applyEdits
    , getNode
    , getEmbeds
    , getLinks
    , getLineOffsets
    , range
    , positionAt
    , offsetAt
  }

})()
