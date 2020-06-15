// @ts-nocheck
import _ from 'lodash'
import { basename } from 'path'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenTag, TokenType, Expressions } from './lexical'
import diagnostics from '../service/diagnostics'
import { Server } from '../export'
import YAML from 'yamljs'
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
export default (
  document
  , {
    ast = document.ast,
    content = document.textDocument.getText(),
    isIncrement = false,
    index = undefined
  } = {}
) => {

  let run = 0

  const { textDocument, documentLinks, embeddedDocuments } = document
  const validate = diagnostics(document)

  return (parsed => {

    const frontmatter = Server.parser.frontmatter.exec(content)
    if (frontmatter) document.frontmatter = YAML.parse(frontmatter[0])

    const matches = content.matchAll(Server.parser.parsing)
    if (!matches) return parsed
    for (const match of matches) parseText(match)

    return parsed

  })(isIncrement ? ast : document)

  /**
   * Parse Text
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function parseText (match) {

    const [ token, name ] = match.filter(Boolean)
    const node = parse.ASTNode(name, token, match)
    const spec = parse.getTokenSpec(token, name)

    return !spec || spec.singular ? spec?.within
      ? childToken(node, spec)
      : singularToken(node, spec)
      : parse.isTokenTagEnd(token, name)
        ? closeToken(node, spec)
        : startToken(node, spec)

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

    return objects.reduce((object, match) => {

      const props = match[0].split('.').filter(Boolean)
      const position = offset + match.index + match[0].length
      const key = props.length > 1 ? position + 1 : position

      object[key] = props

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
      if (tokenSpec?.parameters) {
        tokenNode.parameters = parseParameters(tokenNode, tokenSpec)
      }
    } else if (type === TokenType.embedded || type === TokenType.associate) {
      tokenNode.languageId = tokenSpec.language
      if (!embeddedDocuments.includes(ast.length)) {
        embeddedDocuments.push(ast.length)
        tokenNode.embeddedId = embeddedDocuments.length - 1
      }
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
   * Get Token Parameters
   *
   * This function will assign the offset indexes of Liquid objects used
   * within tags which are used by validations and completion capabilities.
   *
   * @param {number} offset The current offset (used to fill position offset)
   * @param {string} token The token (tag) to parse
   * @returns {Object|Boolean}
   */
  function parseParameters ({
    token: [ token ]
    , offset: [ start, end ]
  }, {
    type
    , parameters
  }) {

    const params = token.matchAll(Expressions.parameters)

    console.log(token)

    return {}
    return params.reduce((object, match) => {

      const props = match[0].split('.').filter(Boolean)
      const position = offset + match.index + match[0].length
      const key = props.length > 1 ? position + 1 : position

      object[key] = props

      return object

    }, {})

  }

  /**
   * Linked Documents - The resolved LSP Document links
   * tokens, these are served up to to the Document manager
   *
   * @param {object} { name, token: [ token ], offset: [ start ] }
   * @returns
   */
  function linkedDocument ({ name, token: [ token ], offset: [ start ] }) {

    const link = new RegExp(`(?<=\\b${name}\\b)\\s*["']?([\\w.]+)["']?`).exec(token)
    const offset = start + token.indexOf(link[1])

    return {
      target: Server.paths[name].find(i => basename(i, '.liquid') === link[1]),
      tooltip: 'Hello World',
      range: {
        start: textDocument.positionAt(offset),
        end: textDocument.positionAt(offset + link[1].length)
      }
    }
  }

  /**
   * Singular Token
   *
   * @param {object} tokenNode
   * @param {object} tokenSpec
   */
  function singularToken (tokenNode, tokenSpec) {

    tokenNode.tag = TokenTag.singular
    tokenNode.type = TokenType[tokenSpec.type]
    tokenNode.objects = parseObjects(tokenNode.offset[0], tokenNode.token[0])

    if (tokenNode.type === TokenType.include) {
      tokenNode.linked = linkedDocument(tokenNode)
      if (!documentLinks.includes(ast.length)) {
        documentLinks.push(ast.length)
        tokenNode.linkedId = documentLinks.length - 1
      }
    }

    if (tokenSpec?.parameters) {
      tokenNode.parameters = parseParameters(tokenNode, tokenSpec)
    }

    ast.push(tokenNode)

    return validate(tokenNode, tokenSpec)

  }

}
