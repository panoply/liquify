// @ts-nocheck
import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenTag, TokenType } from './lexical'
import { doValidate } from '../service/diagnostics'
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

  const {
    ast
    , textDocument
    , diagnostics
  } = document

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
   * Start Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function parseText (match) {

    const [ token, name ] = match.filter(Boolean)
    const spec = parse.getTokenSpec(token, name)

    if (!spec) return

    const node = ASTNode(name, token, match)

    return spec.type === 'object' || spec?.singular
      ? spec?.within ? childToken(node, spec) : ast.push(singularToken(node, spec))
      : parse.isTokenTagEnd(token, name)
        ? closeToken(node)
        : ast.push(startToken(node, spec))

  }

  /**
   * Start Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function startToken (tokenNode, tokenSpec) {

    const type = TokenType[tokenSpec.type]

    return (type === TokenType.control || type === TokenType.iteration) ? ({
      ...tokenNode,
      type,
      tag: TokenTag.start,
      children: [],
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    }) : (type === TokenType.embedded || type === TokenType.associate) && ({
      ...tokenNode,
      type,
      tag: TokenTag.start,
      languageId: tokenSpec.language
    })

  }

  /**
   * Start Token
   *
   * @param {object} tokenNode
   */
  function closeToken (tokenNode) {

    const parentNode = _.findLast(ast, { name: tokenNode.name, tag: TokenTag.start })

    Object.assign(
      !parentNode ? tokenNode : parentNode
      , !parentNode ? { tag: TokenTag.close } : {
        tag: TokenTag.pair,
        token: [ parentNode.token[0], tokenNode.token[0] ],
        offset: [ ...parentNode.offset, ...tokenNode.offset ]
      }
    )

    if (parentNode?.languageId) embeddedDocument(parentNode, tokenNode)

    diagnostics.push(doValidate(tokenNode))

  }

  /**
   * Child Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function childToken (tokenNode, tokenSpec) {

    const parentNode = _.findLast(ast, { tag: TokenTag.start })

    if (!parentNode?.children) return

    parentNode.children.push({
      ...tokenNode,
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    })

    return parentNode

  }

  /**
   * Singular Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function singularToken (tokenNode, tokenSpec) {

    return ({
      ...tokenNode,
      tag: TokenTag.singular,
      type: TokenType[tokenSpec.type],
      objects: parseObjects(tokenNode.offset[0], tokenNode.token[0])
    })

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

    const uri = textDocument.uri.replace('.liquid', `@${run}.${parentNode.languageId}`)

    Object.assign(parentNode, {
      lineOffset: range.start.line,
      embeddedDocument: TextDocument.create(
        uri
        , parentNode.languageId
        , textDocument.version
        , textDocument.getText(range)
      )
    })
  }

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

    if (!objects.length) return false

    return objects.reduce((object, match) => {

      const props = match[0].split('.').filter(Boolean)
      const position = offset + match.index + match[0].length

      object[props.length > 1 ? position + 1 : position] = props

      return object

    }, {})

  }

  /* -------------------------------------------- */
  /*                    EXECUTE                   */
  /* -------------------------------------------- */

  const matches = textDocument.getText().matchAll(Server.parser.parsing)

  if (!matches) return ast
  for (const match of matches) parseText(match)

  return document

}
