import { TextDocument } from 'vscode-languageserver-textdocument'
import { IAST } from 'parser/ast'
import { parse } from 'parser/parse'
import stream from 'parser/stream'

/**
 * Documents Manager
 *
 * Manages the document state and configuration of each open file
 * in the workspace. The module extends upon the vscode textdocument
 * manager and uses `Map()` storage to maintain each document.
 */
export default (function () {

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

    /**
     * Returns the documents Map
     *
     */
    get documents () { return documents },

    /**
     * Returns a document by its URI from the Map.
     * `document` letting is reassigned
     *
     * @param {Parser.TextDocumentItem} textDocumentItem
     */
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

      return parse(document)

    },

    /**
     * Update the text document model, this is executed each time the document
     * content changes and is called via the `onDidChangeTextDocument` event.
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

      // We will pass the document text to the stream
      // for re-scanning and re-parse
      stream.create(
        TextDocument
          .update(document.textDocument, contentChanges, version)
          .getText()
      )

      console.log(contentChanges)

      // Pass the document and prepared existing node for parsing
      // @ts-ignore
      document.update(contentChanges)

      return parse(document, true)

    }

  }

})()
