import _ from 'lodash'
import { basename } from 'path'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenTag, TokenType } from './lexical'
import { Server, Document } from '../export'
// import YAML from 'yamljs'
import validate from '../service/diagnostics'
import * as parse from './utils'

/**
 * Parser
 *
 * Parsing is execute on each document change. When changes length is of value 1
 * and the change is detected within a token in range parsing will begin from the
 * offset starting position of that token, this allows for a more incremental parse
 * opposed the full textDocument.
 *
 * @param {Document.Scope} textDocument
 * @param {Parser.ScannerOptions} options
 * @returns (Parser.AST[]  | Document.scope)
 */
export default (document, index = undefined) => {

  let run = 0

  const matches = document.content.matchAll(Server.parser.parsing)

  if (!matches) return document.ast
  for (const match of matches) parseText(match)
  return document

  /**
   * Parse Text
   *
   * @param {RegExpMatchArray} match
   * @returns {void}
   */
  function parseText (match) {

    const [ token, name ] = match.filter(Boolean)
    const node = parse.ASTNode(name, token, match, index)
    const spec = parse.getTokenSpec(token, name)

    /* console.log(textDocument.getText(Document.range(
      node.offset[0], node.offset[node.offset.length - 1]
    ))) */

    !spec || spec.singular ? (
      spec?.within
        ? childToken(node, spec)
        : singularToken(node, spec)
    ) : (
      parse.isTokenTagEnd(token, name)
        ? closeToken(node, spec)
        : startToken(node, spec)
    )

  }

  /**
   * Start Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function startToken (tokenNode, tokenSpec) {

    const type = TokenType[tokenSpec.type]

    tokenNode.type = type
    tokenNode.tag = TokenTag.start

    if (type === TokenType.control || type === TokenType.iteration) {

      tokenNode.children = []
      tokenNode.objects = parseObjects(tokenNode.offset[0], tokenNode.token[0])

      if (tokenSpec?.parameters) {
        tokenNode.parameters = parseParameters(tokenNode, tokenSpec)
      }
    } else if (type === TokenType.embedded || type === TokenType.associate) {

      tokenNode.languageId = tokenSpec.language

    }

    document.ast.push(tokenNode)

  }

  /**
   * Embedded Token
   *
   * @param {Parser.AST} parentNode
   * @param {Parser.AST} tokenNode
   */
  function embeddedDocument (parentNode, tokenNode) {

    run = run + 1

    const range = Document.range(parentNode.offset[1], tokenNode.offset[0])
    const uri = document.uri.replace('.liquid', `@${run}.${parentNode.languageId}`)

    parentNode.lineOffset = range.start.line
    parentNode.embeddedDocument = TextDocument.create(
      uri
      , parentNode.languageId
      , document.version
      , Document.getText(range)
    )

  }

  /**
   * Close Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function closeToken (tokenNode, tokenSpec) {

    const parentNode = _.findLast(document.ast, {
      name: tokenNode.name,
      tag: TokenTag.start
    })

    if (!parentNode) return validate({ ...tokenNode, tag: TokenTag.close })

    parentNode.tag = TokenTag.pair
    parentNode.token = [ parentNode.token[0], tokenNode.token[0] ]
    parentNode.offset = [ ...parentNode.offset, ...tokenNode.offset ]

    if (parentNode?.languageId) embeddedDocument(parentNode, tokenNode)

    // const before = document.diagnostics.length
    validate(document, parentNode, tokenSpec)
    // const after = document.diagnostics.length

    // console.log(before, after)

  }

  /**
   * Child Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function childToken (tokenNode, tokenSpec) {

    const id = _.findLastKey(document.ast, { tag: TokenTag.start })

    if (!document.ast[id]?.children) return document.ast[id]

    document.ast[id].children.push({
      ...tokenNode,
      tag: TokenTag.child,
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    })

    return validate(
      document
      , document.ast[id].children[document.ast[id].children.length - 1]
      , tokenSpec
    )

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
  function parseObjects (offset, token) {

    return Array
      .from(token.matchAll(Server.parser.objects))
      .reduce((object, match) => {

        const props = match[0].split('.').filter(Boolean)
        const position = offset + match.index + match[0].length
        const key = props.length > 1 ? position + 1 : position

        object[key] = props

        return object

      }
      , {})

  }

  function parseFilters (tokenNode, tokenSpec) {

    const {
      token: [ token ],
      offset: [ offset ]
    } = tokenNode

    diagnostic.filter(tokenNode, document, tokenSpec)

  }

  /**
   * Get Token Parameters
   *
   * @param {Parser.AST} offset The current offset (used to fill position offset)
   * @param {string} token The token (tag) to parse
   * @returns {Object|Boolean}
   */
  function parseParameters ({
    token: [ token ]
    , offset: [ offset ]
  }, {
    type
    , params
  }) {

    return Array
      .from(token.matchAll(/[_a-zA-Z0-9-]+(?=\s*[:=]\s*[_a-zA-Z0-9-"'])/g))
      .map(([ match ]) => match)

  }

  /**
   * Linked Documents - The resolved LSP Document links
   * tokens, these are served up to to the Document manager
   *
   * @param {Parser.AST} ASTNodeParam
   * @returns {LSP.DocumentLink}
   */
  function documentLinks ({ name, token: [ token ], offset: [ start ] }) {

    const link = new RegExp(`(?<=\\b${name}\\b)\\s*["']?([\\w.]+)["']?`).exec(token)

    if (!link) return {}
    const offset = start + token.indexOf(link[1])

    return {
      target: Server.paths[name].find(i => basename(i, '.liquid') === link[1]),
      range: Document.range(offset, offset + link[1].length)
    }
  }

  /**
   * Singular Token
   *
   * @param {Parser.AST} tokenNode
   * @param {Specification.Tag} tokenSpec
   */
  function singularToken (tokenNode, tokenSpec) {

    if (!tokenSpec?.type) return document.ast

    tokenNode.tag = TokenTag.singular
    tokenNode.type = TokenType[tokenSpec.type]
    tokenNode.objects = parseObjects(tokenNode.offset[0], tokenNode.token[0])
    //  tokenNode.filters = parseFilters(tokenNode, tokenSpec)

    if (tokenSpec?.parameters) {
      tokenNode.parameters = parseParameters(tokenNode, tokenSpec)
    }

    if (tokenNode.type === TokenType.include) {
      tokenNode.linkedDocument = documentLinks(tokenNode)
      if (!document.linkedDocuments.includes(document.ast.length)) {
        document.linkedDocuments.push(document.ast.length)
        tokenNode.linkedId = document.linkedDocuments.length - 1
      }
    }

    document.ast.push(tokenNode)

    return validate(tokenNode, tokenSpec)

  }

}
