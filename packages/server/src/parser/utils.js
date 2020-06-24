// @ts-check
// import _ from 'lodash'
import { Server, Document } from '../export'
import { Characters, TokenTag } from './lexical'

/**
 * In Range
 *
 * Checks if n is between start and up to, but not including, end.
 *
 * @param {number} offset
 * @param {number} start
 * @param {number} end
 */
export const inRange = (
  offset
  , start
  , end = 0
) => typeof start === 'number' && ((
  start < offset && offset < end
) || (
  end < offset && offset < start
))

/**
 * AST Node
 *
 * Helper function which will generate the global node
 * defaults required by each token on the tree
 *
 * @param {string} name
 * @param {string} token
 * @param {RegExpMatchArray} match
 * @param {number} index
 * @returns {Parser.AST}
 */
export const ASTNode = (
  name
  , token
  , match
  , index
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
 * Offset Change Position In Token
 *
 * Check to see if the current location is located inside a token when executing
 * an incremental parse. We will check the change was in a `start` or `singular` tag
 * offset position and if no matches were detected we will check if the change was
 * in an `end` tag offset.
 *
 * @export
 * @param {Parser.AST} ASTNode
 * @param {number} index
 */
export const isOffsetInToken = (ASTNode, index) => (
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
 * @param {Parser.AST[]} ASTNodes
 * @param {number} index
 * @param {(increment: number) => number} increment
 * @returns {void}
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
 */
export const getTokenSpec = (token, name) => {

  if (Server.specification.objects?.[name]) return Server.specification.objects[name]
  if (Server.specification.tags?.[name]) return Server.specification.tags[name]

  const kind = token.charCodeAt(0) === Characters.LAN ? 'html' : 'liquid'
  const find = Server.formatRules.associateTags.filter(i => i.name === name && i.kind === kind)

  return find ? find.length > 0
    ? find.filter(({ attr }) => !attr || new RegExp(attr).test(token))[0]
    : find[0] : null
}

/**
 * Get Range
 *
 * Returns a substring of the text document
 *
 * @param {Document.Scope} document
 * @returns {(start: number, end: number) => string}
 */
export const getRange = document => (
  start
  , end = document.content.length
) => Document.getText({ start, end })

/**
 * Set Token Offset
 *
 * Increments / Decrements the token offsets. Used to update ASTNodes when
 * executing an increment parse.
 *
 * @export
 * @param {number} rangeLength The deleted/removed string length
 * @param {number} textLength The changes text length
 * @returns {(offset: (string|number), compare?: (string|number)) => number}
 */
export const setTokenOffset = (rangeLength, textLength) => (offset, compare) => {

  if (typeof offset === 'string') offset = parseInt(offset)
  if (typeof compare === 'string') compare = parseInt(compare)

  const rng = compare || rangeLength
  const txt = compare || textLength

  return rangeLength > 0 ? offset - rng < 0 ? 0 : offset - rng : offset + txt

}
