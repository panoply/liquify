import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenType } from '../parser/lexical'

/**
 * Documents
 *
 * Provides a documents documents for Liquid Language documents somewhat extending
 * upon the vscodes text document module.
 *
 * @typedef {import('types/ast').AST} AST
 * @typedef {import('vscode-languageserver').Diagnostic} Diagnostic
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} TextDocumenr
 */
export default (function () {

  const documents = new Map()

  /**
   * Create - Creates a documents of the text document
   *
   */
  function create ({
    uri
    , languageId
    , version
    , text
  }) {

    return fn => fn(documents.has(uri) ? documents.get(uri) : documents.set(uri, {

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
      documentLinks: [],

      /**
       * Embedded Documents
       *
       * @type {number[]}
       */
      embeddedDocuments: [],

      /**
       * Text Document
       *
       * @type {TextDocument}
       */
      textDocument: TextDocument.create(uri, languageId, version, text)

    }).get(uri))

  }

  /**
   * Includes
   *
   * @param {string} uri
   * @returns
   */
  function includes (uri) {

    const { ast, textDocument } = documents.get(uri)
    const nodes = ast.filter(({ type }) => type === TokenType.include)

    return nodes.map(({ offset: [ start, end ], paths }) => (
      {
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

    return documentLinks
      .map(link => ast[link].link)

  }

  function embeds (uri) {

    return documents
      .get(uri)
      .ast
      .filter(({ embeddedDocument }) => embeddedDocument)

  }

  function ASTNode (uri, offset) {

    const { ast } = documents.get(uri)
    const index = ast.findIndex(({
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
   * Update - Update document context and convert range positions to offsets
   */
  function update (document, contentChanges) {

    TextDocument.update(document, contentChanges, document.version)

    return contentChanges.map(
      change => ({
        ...change,
        range: {
          start: document.offsetAt(change.range.start),
          end: document.offsetAt(change.range.end)
        }
      })
    )
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
