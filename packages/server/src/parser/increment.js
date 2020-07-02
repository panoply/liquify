import scan from './scanner'
import _ from 'lodash'
import { TokenTag, TokenType } from './lexical'
import { inRange, setTokenOffset, isOffsetInToken, getTokenSpec } from './utils'

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

  console.log(contentChanges)

  for (const { rangeLength, text, range } of contentChanges) {

    const start = document.textDocument.offsetAt(range.start)
    const end = rangeLength > 0
      ? start + rangeLength
      : document.textDocument.offsetAt(range.end)

    const positions = setTokenOffset(rangeLength, text.length)
    const increment = document.ast.map((node, i) => {

      const {
        offset
        , name
        , token
        , type
        , lineOffset
        , objects
        , diagnostics
        , children
      } = node

      // Skip tokens before change position
      console.log(name)

      // Skip all tokens at a pre-change location
      if (start > offset[0] && end > offset[offset.length - 1]) {

        console.log(`Skip index ${i} of`, offset, name)

        // support for partial deletions of tag from right side
        // eg: {{ tag
        if (rangeLength > 0 && start < offset[offset.length - 1]) {

          // Incase we remove a partial part of an end token
          if (offset.length > 2) {

            console.log(`Remove index ${i} PARTIAL removal`, offset, name)

            node.token = [ token[0] ]
            node.tag = TokenTag.start
            node.offset = [ offset[0], offset[1] ]

            return node

          }

          console.log(`Remove index ${i} from within a token`, offset, name)

          return false

        }

        return node

      }

      if (rangeLength > 0) {

        // Full token removal
        // Changes must exceed start and end token positions
        if (start <= offset[0] && end >= offset[offset.length - 1]) {

          console.log(`Remove index ${i} of`, offset, name)

          return false

        }

        if ((
          start <= offset[0] && end > offset[0] && end <= offset[1]
        ) || (
          start > offset[0] && start <= offset[1] && end >= offset[1]
        )) {

          if (offset.length > 2 && start > offset[1]) {

            node.token = [ token[1] ]
            node.tag = TokenTag.close
            node.offset = [ offset[2] - rangeLength, offset[3] - rangeLength ]

            console.log(`Deletion within Single START tag at index ${i} of`, offset, name)

            return node

          }

          console.log(`Deletion contained in SINGULAR tag at index ${i} of`, offset, name)

          // delete singular object tags
          return false

        // Deletion on end tag of left side: ` endtag %}`
        // OR
        // Deletion on end tag of right side: `{% endtag `
        }

        if (offset.length > 2) {

          if (start <= offset[0] && end >= offset[1] && end < offset[2]) {

            node.token = [ token[1] ]
            node.tag = TokenTag.close
            node.offset = [ offset[2], offset[3] ]

            console.log(`Deletion contained in START tag at index ${i} of`, offset, name)

            return node

          } else if ((
            start > offset[1] && start <= offset[2] && end >= offset[3]
          ) || (
            start <= offset[2] && end > offset[2] && end <= offset[3]
          ) || (
            start > offset[2] && start <= offset[3] && end >= offset[3]
          )) {

            if (offset.length > 2 && start > offset[1]) {

              node.token = [ token[0] ]
              node.tag = TokenTag.start
              node.offset = [ offset[1], offset[2] ]

              console.log(`Deletion contained in END tag at index ${i} of`, offset, name)

              return node

            }

            console.log(`Deletion contained in START AND END tag at index ${i} of`, offset, name)

            return false

          }
        }
      }

      if (node?.offset) {

        node.offset = node.offset.map(positions)

        if (objects) {
          for (const prop in objects) {
            delete Object.assign(node.objects, { [positions(prop)]: objects[prop] })[prop]
          }
        }

        if (type === TokenType.control || type === TokenType.iteration) {
          if (children && children.length > 0 && children.some(child => child?.objects)) {
            children.forEach((c, k) => {
            // if (c?.objects) node.children[k].objects = tagObjects(c.objects)
            })
          }
        }

        if (lineOffset) {
          node.lineOffset = document.textDocument.positionAt(node.offset[0]).line
        }

      }

      console.log(`Incremented index ${i} of`, offset, name)
      return node

    })

    document.ast = increment.filter(Boolean)

    // console.log(document.ast)

  }

  /* console.log(document.textDocument.getText({
    start: document.textDocument.positionAt(document.ast[document.ast.length - 2].offset[2]),
    end: document.textDocument.positionAt(document.ast[document.ast.length - 2].offset[3])
  }))

  console.log(document.textDocument.getText({
    start: document.textDocument.positionAt(document.ast[document.ast.length - 1].offset[0]),
    end: document.textDocument.positionAt(document.ast[document.ast.length - 1].offset[1])
  })) */

  console.log(document.ast)
  return document

}
