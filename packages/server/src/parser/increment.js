import scan from './scanner'
import _ from 'lodash'
import { TokenTag, TokenType } from './lexical'
import { inRange, setTokenOffset, isOffsetInToken, getTokenSpec } from './utils'
import Document from '../provide/document'
import diagnostic from './../service/diagnostics/'

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
export default (document, contentChanges) => {

  // document.ast = []
  // document.diagnostics = []

  if (!document.ast.length) return scan(document)

  // document.ast = []
  // document.diagnostics = []

  // return scan(document)

  contentChanges.forEach(({
    rangeLength
    , text
    , range: {
      start
      , end
    }
  }) => {

    const increment = setTokenOffset(rangeLength, text.length)

    document.ast.forEach((node, i) => {

      const {
        offset
        , token
        , type
        , lineOffset
        , objects
        , diagnostics
        , children
      } = node

      if (offset[0] < start) return

      document.ast[i].offset = offset.map(_i => increment(_i))

      if (objects) {
        for (const prop in objects) {
          delete Object.assign(document.ast[i].objects, {
            [increment(prop)]: objects[prop]
          })[prop]
        }
      }

      if (type === TokenType.control || type === TokenType.iteration) {
        if (children && children.length > 0 && children.some(child => child?.objects)) {
          children.forEach((c, k) => {
            if (c?.objects) document.ast[i].children[k].objects = tagObjects(c.objects)
          })
        }
      }

      if (lineOffset) {
        document.ast[i].lineOffset = Document.positionAt(document.ast[i].offset[0]).line
      }

    })

    return

    const index = document.ast.findIndex(({ offset, type }) => (
      inRange(start, offset[0], offset[offset.length - 1]) // ||
      // inRange(start, offset[2], offset[3]) || (
      //   type === TokenType.embedded && inRange(
      //     start
      //     , offset[1]
      //     , offset[2]
      //   )
      // )
    ))

    console.log(document.ast)

    if (rangeLength === 0 && index >= 0) {

      const { offset } = document.ast[index]
      // const token = isOffsetInToken(document.ast[index], start)

      const parsed = scan({
        ...document
        , ast: []
        , diagnostics: []
        , content: Document.getText({
          start: offset[0],
          end: offset[offset.length] + text.length
        })
      }, offset[0])

      if (parsed.ast.length > 0) {

        // const [ node ] = parsed.ast

        /* if (node?.tag === TokenTag.start) {
          node.tag = TokenTag.pair
          node.token.push(token.token[0])
          node.offset.push(...token.offset.map(increment))
        } */

        document.ast.splice(
          index
          , document.ast.length - index - 1
          , ...parsed.ast
        )

        //  const d = diagnostic(document, node, getTokenSpec(node.token[0], node.name))

        return document
      }

    }

    if (rangeLength === 0 && index >= 0) {

      const { type, offset } = document.ast[index]

      if (type === TokenType.embedded && inRange(start, offset[2], offset[3])) {

        Document.embeddedUpdate(document.ast[index], increment)

        diagnostic(
          document,
          document.ast[index], getTokenSpec(
            document.ast[index].token[0]
            , document.ast[index].name
          )
        )

        console.log(document.ast[index])

      } else {

        const token = isOffsetInToken(document.ast[index], start)

        if (token) {

          let $1 = 0
            , $2 = 1

          if (token.tag === TokenTag.start) $1 = 2; $2 = 3

          const parsed = scan({
            ...document
            , ast: []
            , diagnostics: []
            , content: Document.getText({
              start: offset[$1],
              end: offset[$2] + text.length
            })
          }, offset[$1])

          if (parsed.ast.length > 0) {

            const [ node ] = parsed.ast

            if (node?.tag === TokenTag.start) {
              node.tag = TokenTag.pair
              node.token.push(token.token[0])
              node.offset.push(...token.offset.map(increment))
            }

            document.ast.splice(index, 1, node)
            // diagnostic(document, node, getTokenSpec(node.token[0], node.name))

          }

          if (type === TokenType.control || type === TokenType.iteration) {

          }
        }
      }
    } else if (text.length > 0 && !/\s+/.test(text)) {

      document.ast = []
      document.diagnostics = []

      return scan(document)

    }

    document.ast.forEach((node, i) => {

      const {
        offset
        , token
        , type
        , lineOffset
        , objects
        , children
      } = node

      if (rangeLength > 0) {
        return ((
          start <= offset[0] && end >= offset[1]
        ) ? (
            document.ast.splice(i, 1)
          ) : (
            offset.length <= 2
          ) && (
            (
              start <= offset[0] && end > offset[0] && end < offset[1]
            ) || (
              start >= offset[0] && start < offset[1] && end >= offset[1]
            )
          ) ? (
              document.ast.splice(i, 1)
            ) : (
              start <= offset[2] && end >= offset[3]
            ) || (
              start > offset[2] && start < offset[3] && end >= offset[3]
            ) || (
              start <= offset[2] && end > offset[2] && end < offset[3]
            )) && document.ast.splice(
          i
          , 1
          , {
            ...document.ast[i],
            tag: TokenTag.start,
            token: [ token[0] ],
            offset: offset.slice(0, 2)
          }
        )
      }

      if (i === index) return

      if (offset[0] > start) {
        document.ast[i].offset = offset.map(inc => increment(inc))

        if (objects) {

          for (const prop in objects) {
            delete Object.assign(document.ast[i].objects, {
              [increment(prop)]: objects[prop]
            })[prop]
          }

          // console.log(objects, document.ast[i], rangeLength, text, text.length)

        }

        if (type === TokenType.control || type === TokenType.iteration) {
          if (children && children.length > 0 && children.some(child => child?.objects)) {
            children.forEach((c, k) => {
              if (c?.objects) document.ast[i].children[k].objects = tagObjects(c.objects)
            })
          }
        }

      } else if (offset.length > 2 && offset[2] > start) {
        document.ast[i].offset.splice(2, 2, ...offset.slice(2).map(inc => increment(inc)))
      }

      if (lineOffset) {
        document.ast[i].lineOffset = Document.positionAt(document.ast[i].offset[0]).line
      }

    })

  })

  // console.log(document.ast)

  return document

  function tagObjects (objects) {

    const keys = Object.keys(objects)

    return keys.length > 0 ? keys.reduce((object, prop) => {

      object[increment(prop)] = objects[prop]

      return object

    }, {}) : objects

  }

  function removal (offset, token, i) {

    return ((
      start <= offset[0] && end >= offset[1]
    ) ? (
        document.ast.splice(i, 1)
      ) : (
        offset.length <= 2
      ) && (
        (
          start <= offset[0] && end > offset[0] && end < offset[1]
        ) || (
          start >= offset[0] && start < offset[1] && end >= offset[1]
        )
      ) ? (
          document.ast.splice(i, 1)
        ) : (
          start <= offset[2] && end >= offset[3]
        ) || (
          start > offset[2] && start < offset[3] && end >= offset[3]
        ) || (
          start <= offset[2] && end > offset[2] && end < offset[3]
        )
    ) && document.ast.splice(
      i
      , 1
      , {
        ...document.ast[i],
        tag: TokenTag.start,
        token: [ token[0] ],
        offset: offset.slice(0, 2)
      }
    )

  }

  //  console.log(ast)
  return document

}
