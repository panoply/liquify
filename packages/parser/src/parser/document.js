import { TextDocument } from 'vscode-languageserver-textdocument'
import { IAST } from 'parser/ast'
import { parse } from 'parser/parse'
import { handleError } from './utils'

/* GLOBALS ------------------------------------ */

export default (function () {

  /**
   * @type {Parser.Documents}
   */
  const documents = new Map()

  /**
   * @type {Parser.TextDocument}
   */
  let textDocument

  /**
   * @type {Parser.AST}
   */
  let iASTDocument

  return {
    get textDocument () { return textDocument },

    documents: () => { return documents },

    global: () => ({

      /**
       * Creates a document model manager for the text document, this
       * function is executed per document open.
       */
      scan: ({ uri, languageId, version, text }) => {

        textDocument = TextDocument.create(uri, languageId, version, text)
        iASTDocument = documents.set(uri, new IAST(textDocument)).get(uri)

        return parse(iASTDocument)

      },
      /**
       * Returns the document AST record for a given URI
       */
      document: (uri) => {

        if (textDocument?.uri !== uri) {
          if (documents.has(uri)) iASTDocument = documents.get(uri)
          else {
            throw handleError(`"${uri}"
              Unable to locate document at the provided URI\n
            `)
          }
        }

        return iASTDocument

      },
      /**
       * Update the text document model, this is executed each time the document
       * content changes and is called via the `onDidChangeTextDocument` event.
       */
      update: ({ uri, version }, changes) => {

        if (textDocument.uri !== uri) {
          if (documents.has(uri)) iASTDocument = documents.get(uri)
          else {
            throw handleError(`"${uri}"
              The document/file provided has not yet been created or
              is unknown, thus it cannot be updated.\n
            `)
          }
        }

        textDocument = TextDocument.update(
          iASTDocument.textDocument,
          changes,
          version
        )

        iASTDocument.update(changes)

        return parse(iASTDocument, true)

      }

    })

  }

})()
