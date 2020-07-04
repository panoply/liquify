import _ from 'lodash'
import { basename } from 'path'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenTag, TokenType } from './lexical'
import { Document } from '../provide/document'
import { Server } from '../provide/server'
import validate from '../service/diagnostics'
import * as parse from './utils'

/**
 * Parser
 *
 * @param {Document.Scope} document
 * @param {number} [index]
 * @returns (Parser.AST[]  | Document.scope)
 */
export default function (document, index = undefined, text = document.textDocument.getText()) {

  /* -------------------------------------------- */
  /* EXECUTE                                      */
  /* -------------------------------------------- */

  const matches = text.matchAll(Server.lexical.tokens)

  if (!matches) return document.ast
  for (const match of matches) ParseText(match)

  return typeof index === 'undefined' ? document : document.ast[0]

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Parse Text
   *
   * @param {RegExpMatchArray} match
   * @returns {void}
   */
  function ParseText (match) {

    const [ token, name ] = match.filter(Boolean)
    const node = parse.ASTNode(name, token, match, index)
    const spec = parse.getTokenSpec(token, name)

    return !spec || spec.singular ? (
      spec?.within
        ? ChildToken(node, spec)
        : SingularToken(node, spec)
    ) : (
      parse.isTokenTagEnd(token, name)
        ? EndToken(node, spec)
        : StartToken(node, spec)
    )

  }

  /**
   * Start Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function StartToken (tokenNode, tokenSpec) {

    const type = TokenType[tokenSpec.type]

    tokenNode.type = type
    tokenNode.tag = TokenTag.start
    tokenNode.diagnostics = []

    if (type === TokenType.control || type === TokenType.iteration) {

      tokenNode.children = []
      tokenNode.objects = TagObjects(tokenNode.offset[0], tokenNode.token[0])

      if (tokenSpec?.parameters) {
      //  tokenNode.parameters = TagParameters(tokenNode, tokenSpec)
      }
    } else if (type === TokenType.embedded || type === TokenType.associate) {

      tokenNode.languageId = tokenSpec.language

    }

    document.ast.push(tokenNode)

    return tokenNode

  }

  /**
   * Close Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function EndToken (tokenNode, tokenSpec) {

    const parentNode = _.findLast(document.ast, { tag: TokenTag.start, name: tokenNode.name })

    // console.log('PARENT NODE ', parentNode, '-----------------------')

    if (!parentNode) {
      return validate({ ...tokenNode, tag: TokenTag.close })
    }

    parentNode.tag = TokenTag.pair
    parentNode.token = [ parentNode.token[0], tokenNode.token[0] ]
    parentNode.offset = [ ...parentNode.offset, ...tokenNode.offset ]

    if (parentNode?.languageId) EmbeddedDocument(parentNode, tokenNode)

    // const before = document.diagnostics.length
    // validate(parentNode, tokenSpec)
    // const after = document.diagnostics.length
    // console.log(parentNode)

    // console.log(before, after)

    return parentNode
  }

  /**
   * Singular Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function SingularToken (tokenNode, tokenSpec) {

    if (!tokenSpec?.type) return document.ast

    tokenNode.tag = TokenTag.singular
    tokenNode.type = TokenType[tokenSpec.type]
    tokenNode.objects = TagObjects(tokenNode.offset[0], tokenNode.token[0])
    //  tokenNode.filters = TagFilters(tokenNode, tokenSpec)

    if (tokenSpec?.parameters) {
      // tokenNode.parameters = TagParameters(tokenNode, tokenSpec)
    }

    if (tokenNode.type === TokenType.include) {
      // tokenNode.linkedDocument = LinkedDocuments(tokenNode)
      // if (!document?.linkedDocuments?.includes(document.ast.length)) {
      // document.linkedDocuments.push(document.ast.length)
      // tokenNode.linkedId = document.linkedDocuments.length - 1
      // }
    }

    // validate(tokenNode, tokenSpec)

    document.ast.push(tokenNode)

    return tokenNode

  }

  /**
   * Child Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function ChildToken (tokenNode, tokenSpec) {

    const id = _.findLastKey(document.ast, { tag: TokenTag.start })

    if (!document.ast[id]?.children) return document.ast[id]

    document.ast[id].children.push({
      ...tokenNode,
      tag: TokenTag.child,
      objects: TagObjects(tokenNode.offset[0], tokenNode.token[0])
    })

    // validate(
    //  document
    //  , document.ast[id].children[document.ast[id].children.length - 1]
    //  , tokenSpec
    // )

    return document.ast[id]
  }

  /**
   * Get Token Objects
   *
   * This function will assign the offset indexes of Liquid objects used
   * within tags which are used by validations and completion capabilities.
   *
   * @param {number} offset
   * @param {string} token
   * @returns {(Parser.Objects)}
   */
  function TagObjects (offset, token) {

    return {}
    return Array
      .from(token.matchAll(Server.lexical.tag_objects))
      .reduce((object, match) => {

        const props = match[0].split('.').filter(Boolean)
        const position = offset + match.index + match[0].length
        const key = props.length > 1 ? position + 1 : position

        object[key] = props

        return object

      }
      , {})

  }

  function TagFilters (tokenNode, tokenSpec) {

    const {
      token: [ token ],
      offset: [ offset ]
    } = tokenNode

    // diagnostic.filter(tokenNode, document, tokenSpec)

  }

  /**
   * Get Token Parameters
   *
   * @param {Parser.AST} offset The current offset (used to fill position offset)
   * @param {string} token The token (tag) to parse
   * @returns {Object|Boolean}
   */
  function TagParameters ({
    token: [ token ]
    , offset: [ offset ]
  }, {
    type
    , params
  }) {

    return []
    return Array
      .from(token.matchAll(/[_a-zA-Z0-9-]+(?=\s*[:=]\s*[_a-zA-Z0-9-"'])/g))
      .map(([ match ]) => match)

  }

  /**
   * Embedded Token
   *
   * @param {Parser.AST} parentNode
   * @param {Parser.AST} tokenNode
   */
  function EmbeddedDocument (parentNode, tokenNode) {

    const run = 1
    const range = Document.getRange(parentNode.offset[1], tokenNode.offset[0])
    const uri = document.textDocument.uri.replace('.liquid', `@${run}.${parentNode.languageId}`)

    parentNode.lineOffset = range.start.line
    parentNode.embeddedDocument = TextDocument.create(
      uri
      , parentNode.languageId
      , document.textDocument.version
      , document.textDocument.getText(range)
    )

  }

  /**
   * Linked Documents - The resolved LSP Document links
   * tokens, these are served up to to the Document manager
   *
   * @param {Parser.AST} ASTNodeParam
   * @returns {LSP.DocumentLink}
   */
  function LinkedDocuments ({ name, token: [ token ], offset: [ start ] }) {

    return []
    const link = new RegExp(`(?<=\\b${name}\\b)\\s*["']?([\\w.]+)["']?`).exec(token)
    if (!link) return null

    const offset = start + token.indexOf(link[1])

    return {
      target: Server.paths[name].find(i => basename(i, '.liquid') === link[1]),
      range: Document.getRange(offset, offset + link[1].length)
    }
  }

}
