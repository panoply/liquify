// @ts-check
// import _ from 'lodash'
import { Server } from '../export'
import { Characters, TokenTag } from './lexical'
import { Range } from 'vscode-languageserver'

/**
 * Parsing utilities
 *
 * A series of functions used by the parser and tokenizer. Each function holds
 * no `this` scope as functions listed here are merely utility type functions.
 * If you're contributing try to keep these functions as small as possible
 * and avoid brackets, use parenthesis returns, eg: `const fn = () => ()`.
 *
 * Type Definitions
 *
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} TextDocument
 * @typedef {import('vscode-languageserver').TextDocumentContentChangeEvent} changeEvent
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').AST} AST
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').IncrementalExecute} IncrementalExecute
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').IncrementalUpdate} IncrementalUpdate
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').DocumentModel} DocumentModel
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ParsedDiagnostics} ParsedDiagnostics
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').Specification} Specification
 */

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * In Range
 *
 * Checks if n is between start and up to, but not including, end.
 *
 * @param {number} offset
 * @param {number} rangeStart
 * @param {number} rangeEnd
 */
export const inRange = (
  offset
  , rangeStart
  , rangeEnd = 0
) => typeof rangeStart === 'number' && ((
  rangeStart < offset && offset < rangeEnd
) || (
  rangeEnd < offset && offset < rangeStart
))

/**
 * Offset Change Position In Token
 *
 * Check to see if the current location is located inside a token when executing
 * an incremental parse. We will check the change was in a `start` or `singular` tag
 * offset position and if no matches were detected we will check if the change was
 * in an `end` tag offset.
 *
 * @export
 * @param {number} index
 * @returns {(ASTNode: AST) => object}
 */
export const isOffsetInToken = index => ASTNode => (
  // remove the modified token and offset from the AST
  inRange(index, ASTNode.offset[0], ASTNode.offset[1]) ? {
    ...ASTNode,
    tag: ASTNode.tag === TokenTag.pair ? TokenTag.close : ASTNode.tag,
    token: ASTNode.token.length === 1 ? ASTNode.token : ASTNode.token.slice(1),
    offset: ASTNode.offset.length === 2 ? ASTNode.offset : ASTNode.offset.slice(2)
  } : inRange(index, ASTNode.offset[2], ASTNode.offset[3]) ? {
    ...ASTNode,
    tag: TokenTag.start, // assert the current tag id
    token: ASTNode.token.slice(0, 1), // remove the `{% end %}` token
    offset: ASTNode.offset.slice(0, 2) // remove the end token offsets
  } : false
)

/**
 * End Token
 *
 * Check to see if matched token is an end/close tag, for example
 * in Liquid and end tag would be `{% endtag %}` and in HTML `</end>`
 *
 * @export
 * @param {string} token
 * @param {string} tag
 * @returns {Boolean}
 */
export const isTokenTagEnd = (token, tag) => {
  const index = token.indexOf(tag)
  const name = token.substring(index - 3, index)
  return name === 'end' || token.charCodeAt(1) === Characters.FWS
}

/**
 * Increment / Decrement Nodes
 *
 * @export
 * @param {AST[]} ASTNodes
 * @param {number} index
 * @param {(increment: number) => number} increment
 * @returns {AST[]}
 */
export const incrementNodes = (ASTNodes, index, increment) => {

  for (let i = 0; i < ASTNodes.length; i++) {
    if (ASTNodes[i].offset[0] >= index) {
      ASTNodes[i].offset = ASTNodes[i].offset.map(increment)
    } else if (ASTNodes[i].offset.length > 2 && ASTNodes[i].offset[2] >= index) {
      ASTNodes[i].offset = [
        ...ASTNodes[i].offset.slice(0, 2)
        , ...ASTNodes[i].offset.slice(2).map(increment)
      ]
    }
  }

}

/**
 * Selection Delete
 *
 * Detects a selection range. When a user selects a block of code that
 * spans multiple lines or offsets this condition will return true. The
 * condition checks if the change offsets exceed AST node offsets.
 *
 * @param {number} start
 * @param {number} end
 * @param {array} offsets
 * @returns {boolean}
 */
export const isSelection = (start, end, offsets) => ((
  inRange(start, offsets[0], offsets[1])
) || (
  inRange(end, offsets[0], offsets[3])
))

/**
 * Get Specification Record
 *
 * Get the tag specification record of matched token from the specification
 * references. When no spec is found the function will check associated tag
 * records which a references applied for formatting capabilities.
 *
 * @export
 * @param {string} token The captured token (tag)
 * @param {string} name The name of the token (tag)
 * @returns {Specification}
 */
export const getTokenSpec = (token, name) => {

  if (Server.specification.objects?.[name]) return Server.specification.objects[name]
  if (Server.specification.tags?.[name]) return Server.specification.tags[name]

  const kind = token.charCodeAt(0) === Characters.LAN ? 'html' : 'liquid'
  const find = Server.formatRules.associateTags.filter(i => i.name === name && i.kind === kind)

  return find.length > 0
    ? find.filter(({ attr }) => !attr || new RegExp(attr).test(token))[0]
    : find[0]
}

/**
 * Get Range
 *
 * Returns a substring of the text document
 *
 * @param {TextDocument} document
 * @returns {(start: number, end: number) => string}
 */
export const getRange = document => (
  start
  , end = document.getText().length
) => document.getText(
  Range.create(
    document.positionAt(start)
    , document.positionAt(end)
  )
)

/**
 * Set Token Offset
 *
 * Increments / Decrements the token offsets. Used to update ASTNodes when
 * executing an increment parse.
 *
 * @export
 * @param {number} rangeLength The deleted/removed string length
 * @param {number} textLength The changes text length
 * @returns {(offset: number) => number}
 */
export const setTokenOffset = (
  rangeLength
  , textLength
) => offset => (
  rangeLength > 0
    ? offset - rangeLength < 0 ? 0 : offset - rangeLength
    : offset + textLength
)

/**
 * For Parse
 *
 * Parsing function which executes a callback function upon each
 * regular expression match. The callback function will return
 * the match and offset index.
 *
 * @export
 * @param {RegExp} regexp The regular expression
 * @param {string} content The string to parse
 * @returns {(callback:(matches: string[], offset: number) => void) => void}
 */
export const forParse = (regexp, content, offset = 0) => callback => {

  let match

  while ((match = regexp.exec(content)) !== null) {
    if (match.index === regexp.lastIndex) regexp.lastIndex++
    callback(match.filter(Boolean), match.index + offset)
    content = content.slice(regexp.lastIndex)
    offset = offset === 0 ? regexp.lastIndex : regexp.lastIndex + offset
    regexp.lastIndex = 0

  }

  return true

}

/**
 * Get Token Objects
 *
 * This function will assign the offset indexes of Liquid objects used
 * within tags which are used by validations and completion capabilities.
 *
 * @export
 * @param {number} offset The current offset (used to fill position offset)
 * @param {string} token The token (tag) to parse
 * @param {object} [map] An empty object to assign (Default Paramater)
 * @returns {Object|Boolean}
 */
export const setTokenObjects = (offset, token, map = {}) => {

  const { objects } = Server.parsing

  /**
   * @type {RegExpExecArray}
   */
  let regex,

    /**
   * @type {string}
   */
    input = token

  do {

    regex = objects.exec(input)

    if (!regex) break

    const [ k, props ] = regex.filter(Boolean).slice(1)
    const index = offset + regex.index + k.length + 1
    input = input.slice(regex.lastIndex)
    props ? (map[index + props.length] = [ k, ...props.split('.') ]) : (map[index] = [ k ])

  } while (regex)

  return map

}
