import scan from './scanner'
import _ from 'lodash'
import { Characters, TokenTag } from './lexical'
import * as parse from './utils'
import { Range } from 'vscode-languageserver'
import { Document } from '../export'

const closest = (index, { offset }) => offset.reduce((prev, current) => (
  Math.abs(current - index) <= Math.abs(prev - index)
    ? current
    : prev
))

/**
 * Increment AST Nodes
 *
 * Increments offset values of tokens contained within the AST. This logic provides
 * incremental parsing on a per-change basis.
 *
 * @export
 * @param {Document.Scope} document
 * @param {Document.ContentChangeEvent} ContentChangeParams
 * @returns
 */
export default (
  document
  , {
    text
    , rangeLength
    , range: {
      start,
      end
    }
  }
) => {

  const { ast } = document

  if (!ast.length) return scan(document)

  const cast = [ ]

  for (let i = 0; i < ast.length; i++) {

    const { offset } = ast[i]

    if (start <= offset[0] && end >= offset[1]) cast.push(i, 1)
    else if (start <= offset[0] && end > offset[0] && end < offset[1]) cast.push(i, 1)
    else if (start >= offset[0] && start < offset[1] && end >= offset[1]) cast.push(i, 1)
    else if (offset.length > 2) {
      if (start <= offset[2] && end >= offset[3]) cast.push(i, 1)
      else if (start < offset[2] && end > offset[2] && end < offset[3]) cast.push(i, 1)
      else if (start > offset[2] && start < offset[3] && end >= offset[3]) cast.push(i, 1)
    }
  }
  console.log(cast)
  const increment = parse.setTokenOffset(rangeLength, text.length)
  const astIndex = ast.findIndex(({ offset }) => (
    parse.inRange(start, offset[0], offset[1]) ||
    parse.inRange(start, offset[2], offset[3])
  ))

  // We are inside a token
  if (astIndex >= 0) {

    const token = parse.isOffsetInToken(ast[astIndex], start)
    const { offset } = ast[astIndex]

    if (token) {

      let $1 = 0
        , $2 = 1

      // Changed node is a start tag, eg: `{% tag %}`
      // Adjust the offsets to use end position offsets
      if (token.tag === TokenTag.start) {
        $1 = 2
        $2 = 3
      }

      // Extract the changed text
      const node = scan(document, {
        ast: []
        , index: offset[$1]
        , isIncrement: true
        , content: document.getText(Document.range(offset[$1], offset[$2] + text.length))
      })[0]

      if (node) {

        if (node?.tag === TokenTag.start) {
          node.tag = TokenTag.pair
          node.token.push(token.token[0])
          node.offset.push(...token.offset.map(increment))
        }

        ast.splice(astIndex, 1, node)
      }
    }

  } else if (rangeLength > 0 && astIndex < 0) {

    const change = ast.findIndex(({ offset: [ offset ] }) => offset > start)

    if (change >= 0) {

      const length = ast.length

      for (let i = 0; i < length; i++) {
        if (i >= change) {
          ast[i].offset.splice(
            0
            , ast[i].offset.length
            , ...ast[i].offset.map(offset => offset - rangeLength)
          )
        } else if (ast[i].offset.length > 2 && ast[i].offset[2] > start) {
          ast[i].offset.splice(
            2
            , 2
            , ast[i].offset[2] - rangeLength
            , ast[i].offset[3] - rangeLength
          )
        }
      }

      return document

    }

  } else if (text.length > 2 && /[{%}]/g.test(text)) {

    console.log('RE PARSE')
    return scan(document)

  }

  for (let i = 0; i < ast.length; i++) {
    if (i === astIndex) continue
    if (ast[i].offset[0] >= start) {
      ast[i].offset = ast[i].offset.map(increment)
    } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
      ast[i].offset.splice(
        2
        , 2
        , ast[i].offset[2] + text.length
        , ast[i].offset[3] + text.length
      )
    }
  }

  return document

}
