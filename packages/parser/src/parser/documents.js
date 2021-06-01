import { TextDocument } from 'vscode-languageserver-textdocument'
import { IAST } from 'parser/ast'
import stream from 'parser/stream'
import { EventEmitter } from 'events'
import { parse } from 'parser/parse'

/**
 * Documents Manager
 *
 * Manages the document state and configuration of each open file
 * in the workspace. The module extends upon the vscode textdocument
 * manager and uses `Map()` storage to maintain each document.
 */
export default (function Manager () {

  const event = new EventEmitter()

  /**
   * Documents
   *
   * @type {Map<string, Parser.IAST> }
   */
  const documents = new Map()

  /**
   * Document
   *
   * @type {Parser.IAST}
   */
  let document

  return {

    get documents () { return documents },

    get event () { return event },

    get: (uri) => {
      if (document.textDocument.uri === uri) return document
      else document = documents.get(uri)
      return document
    },

    /**
     * Creates a document model manager for the text document, this
     * function is executed per document open.
     *
     * @param {Parser.TextDocumentItem} textDocumentItem
     */
    create: (textDocumentItem) => {

      const { uri, text } = textDocumentItem

      document = documents.has(uri)
        ? documents.get(uri)
        : documents.set(uri, new IAST(textDocumentItem)).get(uri)

      stream.create(text)

      event.emit('update', document)

      return parse(document)

    },

    /**
     * Update the text document model, this is executed each time the document
     * content changes and is called via the `onDidChangeTextDocument` event. Majority
     * of this logic was lifted from the 'vscode-textdocument' module.
     *
     * @param {Parser.TextDocument.TextDocument} textDocument
     * @param {Parser.TextDocument.TextDocumentContentChangeEvent[]} contentChanges
     * @returns {Parser.IAST}
     */
    update: ({ uri, version }, contentChanges) => {

      if (document?.textDocument.uri !== uri) {
        if (documents.has(uri)) document = documents.get(uri)
        else return null
      }

      stream.create(
        TextDocument
          .update(document.textDocument, contentChanges, version)
          .getText()
      )

      // @ts-ignore
      document.update(contentChanges)

      event.emit('update', document)

      return parse(document, true)

    }

  }

})()
