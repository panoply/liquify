import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenType } from '../parser/lexical'

/**
 * Documents
 *
 * Provides a documents documents for Liquid Language documents somewhat extending
 * upon the vscodes text document documents module.
 *
 */
export default (function () {

  const documents = new Map()

  function includes (uri) {

    const { ast, textDocument } = documents.get(uri)
    const nodes = ast.filter(({ type }) => type === TokenType.include)

    return nodes.map(({ offset: [ start, end ], paths }) => (
      {
        /**
         * @type {import('vscode-languageserver').Command}
        */
        command: {
          title: 'view file',
          command: 'liquid.codelens',
          arguments: [ paths.include[0], false ]
        },
        range: {
          start: textDocument.positionAt(start),
          end: textDocument.positionAt(end)
        }
      }
    ))

  }

  function links (uri) {

    const { ast, documentLinks } = documents.get(uri)
    const linked = documentLinks.map(link => ast[link].linked)

    console.log(linked, documentLinks)
    return linked
  }

  function embeds (uri) {

    const { ast } = documents.get(uri)
    const embedded = ast.filter(({ embeddedDocument }) => embeddedDocument)

    return embedded

  }

  function ASTNode (uri, location) {

    const { ast } = documents.get(uri)
    const index = ast.findIndex(({
      offset: [
        TL = -1
        , TR = -1
        , BL = -1
        , BR = -1
      ]
    }) => (
      _.inRange(location, TL, TR) ||
        _.inRange(location, BL, BR) ||
        _.inRange(location, TR, BL)
    ))

    return [ ast[index], index ]

  }

  /**
   * Create - Creates a documents of the text document
   *
   */
  function create ({ uri, languageId, version, text }) {

    return callback => callback(

      documents.has(uri) ? documents.get(uri) : documents.set(uri, {

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
         * AST
         *
         * @memberof Extend
         */
        frontmatter: {},

        /**
         * Links
         *
         * @memberof Extend
         */
        documentLinks: [],

        /**
         * Embedded Documents
         *
         * @memberof Extend
         */
        embeddedDocuments: [],

        /**
         * Text Document
         *
         * @memberof Extend
         */
        textDocument: TextDocument.create(uri, languageId, version, text)

      }).get(uri)
    )

  }

  /**
   * Update - Update document context and convert range positions to offsets
   */
  function update (document, contentChanges) {

    TextDocument.update(document, contentChanges, document.version)

    return contentChanges.map(change => ({
      ...change,
      range: {
        start: document.offsetAt(change.range.start),
        end: document.offsetAt(change.range.end)
      }
    }))

  }

  return ({
    ASTNode
    , documents
    , create
    , embeds
    , update
    , includes
    , links
  })

})()
