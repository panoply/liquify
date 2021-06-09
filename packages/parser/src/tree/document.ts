import { TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { IAST } from 'tree/ast';
import { parse } from 'parser/parse';
import { handleError } from 'tree/utils';

/* GLOBALS ------------------------------------ */

export const Document = (function () {
  /**
   * Documents Model
   *
   * Each documents AST instance is stored in this
   * map. The URI of the document is the key reference.
   * We maintain a cached record for every document.
   */
  const model: Map<string, IAST> = new Map();

  /**
   * Text Document Reference
   *
   * We assign the Text Document to this letting and in addition
   * it is added to the AST.
   *
   */
  let textDocument: TextDocument;

  /**
   * AST Reference
   *
   * We assign the current document AST to this letting.
   * its value holds the instance that was initialized and stored
   * in the model map. For every new document, its value is changed.
   *
   */
  let AST: IAST;

  return {
    get textDocument (): TextDocument {
      return textDocument;
    },

    get AST (): IAST {
      return AST;
    },

    documents: (): Map<string, IAST> => {
      return model;
    },

    global: () => ({
      /**
       * Creates a document model manager for the text document, this
       * function is executed per document open.
       */
      scan: ({ uri, languageId, version, text }: TextDocumentItem) => {
        textDocument = TextDocument.create(uri, languageId, version, text);
        AST = model.set(uri, new IAST(textDocument)).get(uri);
        return parse(AST);
      },
      /**
       * Returns the document AST record for a given URI
       */
      document: (uri: string) => {
        if (textDocument?.uri !== uri) {
          if (model.has(uri)) AST = model.get(uri);
          else {
            throw handleError(`"${uri}"
              Unable to locate document at the provided URI\n
            `);
          }
        }

        return AST;
      },
      /**
       * Update the text document model, this is executed each time the document
       * content changes and is called via the `onDidChangeTextDocument` event.
       */
      update: ({ uri, version }: VersionedTextDocumentIdentifier, changes: any) => {
        if (textDocument.uri !== uri) {
          if (model.has(uri)) {
            AST = model.get(uri);
            textDocument = AST.textDocument;
          } else {
            throw handleError(`"${uri}"
              The document/file provided has not yet been created or
              is unknown, thus it cannot be updated.\n
            `);
          }
        }

        AST.textDocument = TextDocument.update(textDocument, changes, version);

        // console.log(iASTDocument.textDocument.uri, iASTDocument.textDocument.version)

        AST.update(changes);

        return parse(AST, true);
      }
    })
  };
})();
