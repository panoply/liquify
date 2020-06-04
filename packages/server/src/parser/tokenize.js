import _ from 'lodash'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { setTokenObjects } from './utils'
import { TokenTag, TokenType } from './lexical'

/**
 * Tokenize
 *
 * Parsing is execute on each document change. When changes length is of value 1
 * and the change is detected within a token in range parsing will begin from the
 * offset starting position of that token, this allows for a more incremental parse
 * opposed the full document.
 *
 * @param {import('vscode-languageserver-textdocument').TextDocument}  textDocument
 * @param {import('defs').AST[]} ast
 * @param {object} options
 * @returns
 */
export default (textDocument, ast) => ({

  /**
   * Singular Token
   *
   * @export
   * @param {*} tokenNode
   * @param {*} tokenSpec
   * @returns
   */
  singularToken: (tokenNode, tokenSpec) => ast[ast.push(
    {
      ...tokenNode,
      tag: TokenTag.singular,
      type: TokenType[tokenSpec.type]
    }
  )],

  /**
   * Start Token
   *
   * @export
   * @param {*} tokenNode
   * @param {*} tokenSpec
   * @returns
   */
  startToken: (tokenNode, tokenSpec, type = TokenType[tokenSpec.type]) => ast[ast.push(
    (type === TokenType.control || type === TokenType.iteration) ? ({
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
  )],

  /**
   * Close Token
   *
   * @export
   * @param {*} ast
   * @param {*} tokenNode
   * @param {*} parentNode
   * @returns
   */
  closeToken: (
    tokenNode
    , parentNode = _.findLast(ast, { name: tokenNode.name, tag: TokenTag.start })
  ) => Object.assign(
    !parentNode ? tokenNode : parentNode
    , !parentNode ? { tag: TokenTag.close } : {
      tag: TokenTag.pair,
      token: [ parentNode.token[0], tokenNode.token[0] ],
      offset: [ ...parentNode.offset, ...tokenNode.offset ]
    }
  ),

  /**
   * Child Tokens
   *
   * @param {*} ast
   * @param {*} tokenSpec
   * @param {*} tokenNode
   * @param {*} parentNode
   * @returns
   */
  childToken: (
    tokenNode
    , tokenSpec
    , parentNode = _.findLast(ast, { tag: TokenTag.start })
  ) => {

    // if (!parentNode) return false

    parentNode.children.push({
      ...tokenNode,
      objects: setTokenObjects(tokenNode.offset[0], tokenNode.token)
    })

    console.log(parentNode)

    return parentNode
  },

  /**
   * Embedded Token
   *
   * @param {*} textDocument
   * @param {*} tokenNode
   * @param {*} range
   * @returns
   */
  embeddedDocument: (
    tokenNode
    , range = {
      start: textDocument.positionAt(tokenNode.offset[1]),
      end: textDocument.positionAt(tokenNode.offset[0])
    }
  ) => Object.assign(tokenNode, {
    lineOffset: range.start.line,
    embeddedDocument: TextDocument.create(
      textDocument.uri.replace('.liquid', `@${tokenNode.languageId}`)
      , tokenNode.languageId
      , textDocument.version
      , textDocument.getText(range)
    )
  })

})
