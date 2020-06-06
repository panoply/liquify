import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'

/**
 * Documents
 *
 * Provides a documents documents for Liquid Language documents somewhat extending
 * upon the vscodes text document documents module.
 */
export default (function () {

  const documents = new Map()

  return ({

    documents,

    ASTNode: (uri, location) => {

      const { ast } = documents.get(uri)
      const index = ast.findIndex(({ offset }) => (
        _.inRange(location, offset[0], offset[1]) ||
        _.inRange(location, offset[2], offset[3]) ||
        _.inRange(location, offset[1], offset[2])
      ))

      return [ ast[index], index ]

    },

    /**
     * Create - Creates a documents of the text document
     */
    create: ({
      uri
      , languageId
      , version
      , text
    }) => callback => callback(documents.has(uri) ? documents.get(uri) : documents.set(uri, {

      /**
       * AST
       *
       * @memberof Extend
       */
      ast: [],

      /**
       * Document Settings
       *
       * @memberof Extend
       */
      settings: {},

      /**
       * Diagnostics
       *
       * @memberof Extend
       */
      diagnostics: [],

      /**
       * Embedded Documents
       *
       * @memberof Extend
       */
      embedded: new Map(),

      /**
       * Text Document
       *
       * @memberof Extend
       */
      textDocument: TextDocument.create(uri, languageId, version, text)

    }).get(uri)),

    /**
     * Update - Update document context and convert range positions to offsets
     *
     */
    update: (
      document
      , contentChanges
    ) => {

      TextDocument.update(document, contentChanges, document.version)

      return contentChanges.map(change => ({
        ...change,
        range: {
          start: document.offsetAt(change.range.start),
          end: document.offsetAt(change.range.end)
        }
      }))

    }
  })

})()
