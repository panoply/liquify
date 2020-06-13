// @ts-nocheck
import _, { set } from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenTag, TokenType } from './lexical'
import validator from '../service/linter'
import { Server } from '../export'
import * as parse from './utils'

/**
 * Parser
 *
 * Parsing is execute on each document change. When changes length is of value 1
 * and the change is detected within a token in range parsing will begin from the
 * offset starting position of that token, this allows for a more incremental parse
 * opposed the full document.
 *
 * @param {import('vscode-languageserver').TextDocumentContentChangeEvent} changes[]
 * @param {object} options
 * @returns
 */
export default (document, index = undefined) => {

  const validate = validator(document)
  const { ast, textDocument } = document

  let run = 0

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  /**
   * AST Node
   *
   * Helper function which will generate the global node
   * defaults required by each token on the tree
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  const ASTNode = (
    name
    , token
    , match
  ) => ({
    name
    , token: [ token ]
    , offset: typeof index === 'undefined' ? [
      match.index
      , match.index + token.length
    ] : [
      match.index + index
      , match.index + token.length + index
    ]
  })

  /**
   * Get Token Objects
   *
   * This function will assign the offset indexes of Liquid objects used
   * within tags which are used by validations and completion capabilities.
   *
   * @param {number} offset The current offset (used to fill position offset)
   * @param {string} token The token (tag) to parse
   * @returns {Object|Boolean}
   */
  function parseObjects (offset, token) {

    const objects = Array.from(token.matchAll(Server.parser.objects))

    return objects.reduce((object, match) => {

      const props = match[0].split('.').filter(Boolean)
      const position = offset + match.index + match[0].length

      object[props.length > 1 ? position + 1 : position] = props

      return object

    }, {})

  }

  /**
   * Embedded Token
   *
   * @param {object} tokenNode
   */
  function embeddedDocument (parentNode, tokenNode) {

    run = run + 1

    const range = {
      start: textDocument.positionAt(parentNode.offset[1]),
      end: textDocument.positionAt(tokenNode.offset[0])
    }

    parentNode.lineOffset = range.start.line
    parentNode.embeddedDocument = TextDocument.create(
      textDocument.uri.replace('.liquid', `@${run}.${parentNode.languageId}`)
      , parentNode.languageId
      , textDocument.version
      , textDocument.getText(range)
    )

  }

  /**
   * Start Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function startToken (tokenNode, tokenSpec) {

    const type = TokenType[tokenSpec.type]

    tokenNode.type = type
    tokenNode.tag = TokenTag.start

    if (type === TokenType.control || type === TokenType.iteration) {
      tokenNode.children = []
      tokenNode.objects = parseObjects(tokenNode.offset[0], tokenNode.token[0])
    } else if (type === TokenType.embedded || type === TokenType.associate) {
      tokenNode.languageId = tokenSpec.language
    }

    ast.push(tokenNode)

  }

  /**
   * Close Token
   *
   * @param {object} tokenNode
   */
  function closeToken (tokenNode, tokenSpec) {

    const parentNode = _.findLast(ast, { name: tokenNode.name, tag: TokenTag.start })

    if (!parentNode) return validate({ ...tokenNode, tag: TokenTag.close })

    parentNode.tag = TokenTag.pair
    parentNode.token = [ parentNode.token[0], tokenNode.token[0] ]
    parentNode.offset = [ ...parentNode.offset, ...tokenNode.offset ]

    if (parentNode?.languageId) embeddedDocument(parentNode, tokenNode)

    return validate(parentNode, tokenSpec)

  }

  /**
   * Child Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function childToken (tokenNode, tokenSpec) {

    const id = _.findLastKey(ast, { tag: TokenTag.start })

    if (!ast[id]?.children) return ast[id]

    ast[id].children.push({
      ...tokenNode,
      tag: TokenTag.child,
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    })

    return validate(ast[id].children[ast[id].children.length - 1], tokenSpec)

  }

  /**
   * Singular Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function singularToken (tokenNode, tokenSpec) {

    const ASTNode = {
      ...tokenNode,
      tag: TokenTag.singular,
      type: TokenType[tokenSpec.type],
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    }

    ast.push(ASTNode)

    return validate(ASTNode, tokenSpec)

  }

  /**
   * Parse Text
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function parseText (match) {

    const [ token, name ] = match.filter(Boolean)
    const node = ASTNode(name, token, match)
    const spec = parse.getTokenSpec(token, name)

    return !spec || spec.singular ? spec?.within ? childToken(node, spec)
      : singularToken(node, spec)
      : parse.isTokenTagEnd(token, name) ? closeToken(node, spec) : startToken(node, spec)

  }

  /* -------------------------------------------- */
  /*                    EXECUTE                   */
  /* -------------------------------------------- */

  const matches = textDocument.getText().matchAll(Server.parser.parsing)

  if (!matches) return ast

  for (const match of matches) parseText(match)

  if (ast.some(i => i.tag === TokenTag.start)) {
    ast.filter(i => i.tag === TokenTag.start).forEach(validate)
  }

  return document

}
