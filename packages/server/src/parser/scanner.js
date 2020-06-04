// @ts-nocheck
import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { setTokenObjects } from './utils'
import { Characters, TokenTag, TokenKind, TokenType } from './lexical'
import * as parse from './utils'

const regexp = /{%.\b(?:end)?(\w+)\b.?[^%]*?%}|{{2}.\b(\w+)\b.[^{}]*?}{2}|<\/?\b(script|style)\b(?:[^>]*|[^"']["'])*>/gs

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
export default ({ ast, embedded, textDocument }, index = undefined) => {

  const content = textDocument.getText()
  const matches = content.matchAll(regexp)
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

  if (!matches) return ast

  let run = 0

  Array.from(matches, parseText)

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

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
      ? spec?.within
        ? childToken(node, spec)
        : ast.push(singularToken(node, spec))
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
      children: []
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
      objects: setTokenObjects(tokenNode.offset[0], tokenNode.token)
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
      type: TokenType[tokenSpec.type]
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

    const uri = textDocument.uri.replace('.liquid', `_${run}_${parentNode.languageId}.tmp`)
    const embed = TextDocument.create(
      uri
      , parentNode.languageId
      , textDocument.version
      , textDocument.getText(range)
    )

    embedded.set(uri, embed)

    Object.assign(parentNode, {
      lineOffset: range.start.line,
      embeddedDocument: embedded.size
    })
  }

}
