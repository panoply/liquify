import scan from './scanner'
import _ from 'lodash'
import { Characters, TokenTag } from './lexical'
import * as parse from './utils'
import { Document, Server } from '../export'
import diagnostic from './../service/diagnostics'

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
 * @returns
 */
export default (document) => {

  document.ast = []
  document.diagnostics = []

  return scan(document)
  // if (!document.ast.length) return scan(document)

  const [
    {
      rangeLength
      , text
      , range: {
        start
        , end
      }
    }
  ] = document.contentChanges

  // const validate = diagnostic(document)

  const increment = parse.setTokenOffset(rangeLength, text.length)
  const astIndex = document.ast.findIndex(({ offset }) => (
    parse.inRange(start, offset[0], offset[1]) ||
    parse.inRange(start, offset[2], offset[3])
  ))

  // We are inside a token
  if (astIndex >= 0) {

    const token = parse.isOffsetInToken(document.ast[astIndex], start)
    const { offset } = document.ast[astIndex]

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
        , content: document.getText(
          Document.range(
            offset[$1]
            , offset[$2] + text.length
          )
        )
      })[0]

      if (node) {

        if (node?.tag === TokenTag.start) {
          node.tag = TokenTag.pair
          node.token.push(token.token[0])
          node.offset.push(...token.offset.map(increment))
        }

        document.ast.splice(astIndex, 1, node)
        // validate(node, parse.getTokenSpec(node.token[0], node.name))

      }
    }

  }

  // console.log(document.ast[astIndex])

  return document

  function removal () {

    return ast.forEach(({ offset, token }, i) => ((
      start <= offset[0] && end >= offset[1]
    ) ? (
        ast.splice(i, 1)
      ) : (
        offset.length <= 2
      ) && (
        (
          start <= offset[0] && end > offset[0] && end < offset[1]
        ) || (
          start >= offset[0] && start < offset[1] && end >= offset[1]
        )
      ) ? (
          ast.splice(i, 1)
        ) : (
          start <= offset[2] && end >= offset[3]
        ) || (
          start > offset[2] && start < offset[3] && end >= offset[3]
        ) || (
          start <= offset[2] && end > offset[2] && end < offset[3]
        )
    ) && ast.splice(
      i
      , 1
      , {
        ...ast[i],
        tag: TokenTag.start,
        token: [ token[0] ],
        offset: offset.slice(0, 2)
      }
    ))

  }

  return
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
        validate(node, parse.getTokenSpec(node.token[0], node.name))

      }
    }

  } // else if (text.length > 2 && /[{%}]/g.test(text)) {

  // console.log('RE PARSE')
  // return scan(document)

  // }

  if (rangeLength > 0 && astIndex < 0) {

    const change = ast.findIndex(({ offset }) => (
      offset.length > 2 ? offset[3] > start : offset[1] > start
    ))
    /*  const nodes = scan(document, {
      ast: []
      , index: change
      , isIncrement: true
      , content: document.getText(Document.range(
        start
        , document.getText().length - ast[change].offset[ast[change].offset.length - 1]
      ))
    }) */

    console.log(document.getText(Document.range(
      ast[change].offset[0]
      , ast[change].offset[ast[change].offset.length - 1] + rangeLength
    )))
    //  ast.splice(change, ast.length - change, ...nodes)

    //  return document
    // console.log(nodes)

  } else {
    ast.forEach(({ offset }, i) => {
      if (i === astIndex) return
      if (offset[0] > start) {
        ast[i].offset = offset.map(increment)
      } else if (offset.length > 2 && offset[2] > start) {
        ast[i].offset = [
          offset[0],
          offset[1],
          offset[2] + text.length,
          offset[3] + text.length
        ]
      }
    })
  }

  //  console.log(ast)
  return document

}
