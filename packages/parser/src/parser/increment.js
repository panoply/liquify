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

  // console.log(document)
  if (!document.ast.length) return scan(document)

  let start
    , end
    , changed
    , removed

  /**
   * Execute Incremental Parse
   *
   * Walk through each content change and apply incremental edits to the
   * relative nodes. The passed in document is returned once the walk concludes
   *
   * @param {LSP} changes
   */
  contentChanges.reverse().forEach(({ rangeLength, text, range }) => {

    changed = text
    removed = rangeLength
    start = document.textDocument.offsetAt(range.start)
    end = removed > 0 ? start + removed : start + changed.length

    const shallow = document.ast.slice()
    document.ast.length = 0
    document.ast = shallow.filter(changedOffset)

    // console.log(document.ast)

  })

  return document

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Incremental disapatches nodes to their appropriate function.
   * Will filter and apply changes to each node on the AST and return
   * a newly created tree of updated nodes
   *
   * @param {object} node
   */
  function changedOffset (node) {

    // console.log(node)
    const { offset } = node
    const increment = setTokenOffset(removed, changed.length)

    // Increment singular tokens
    if (offset.length === 2) {
      if (start >= offset[0]) {

        // Skip Incrementing token
        if (end >= offset[1]) return node

        // Re-parse `{{ singular }}`or `{% singular %}` token
        else if (end <= offset[1]) {

          return {
            ...node
            , ...scan(
              { ...document, ast: [] }
              , offset[0]
              , Document.getText(offset[0], offset[1] + changed.length)
            )
          }

        }
        // Increment `{{ singular }}`or `{% singular %}` token
      } else if (start <= offset[0] && end <= offset[1]) {

        node.offset.splice(0, 2, ...offset.map(increment))
        return node

      }

      // Re-parse the  `{% start %}` token
    } else if (start >= offset[0] && end <= offset[1]) {

      const parse = scan(
        { ...document, ast: [] }
        , offset[0]
        , Document.getText(offset[0], offset[1] + changed.length)
      )

      node.token.splice(0, 1, ...parse.token)
      node.offset.splice(0, 2, ...parse.offset)

      return node

      // Re-parse the `{% endtag %}` token
    } else if (start >= offset[2] && end <= offset[3]) {

      return scan({
        ...document,
        ast: [
          {
            ...node
            , token: [ node.token[0] ]
            , tag: TokenTag.start
            , offset: [ offset[0], offset[1] ]
          }
        ]
      }
      , offset[2]
      , Document.getText(
        offset[2]
        , offset[3] + changed.length
      ))

      // Increment the `{% endtag %}` token
    } else if (start >= offset[1] && end <= offset[2]) {

      node.offset.splice(2, 2, ...offset.slice(2).map(increment))
      return node

      // Increment the `{% tag %}` and  `{% endtag %}` tokens
    } else if (start <= offset[0] && end <= offset[3]) {

      node.offset.splice(0, 4, ...offset.map(increment))
      return node
    }

  }

  /**
   * Skip Node which have not been modified or changed.
   *
   * @param {object} node
   * @param {number} index
   * @param {number} start
   * @returns
   */
  function SkipNode (node, index, start) {

    console.log(node)
    if (removed > 0 && start < node.offset[node.offset.length - 1]) {

      console.log(`Remove index ${index} from within a token`, node.offset, node.name)
      if (node.offset.length <= 2) return false

      if (node.offset.length > 2) {

        console.log(`Remove index ${index} PARTIAL removal`, node.offset, node.name)
        node.token = [ node.token[0] ]
        node.tag = TokenTag.start
        node.offset = [ node.offset[0], node.offset[1] ]

        return node

      }
    }

  }

  /**
   * Token context incrementals
   *
   * @param {object} node
   * @param {function} positions
   * @returns
   */
  function UpdateNode (node) {

    const positions = setTokenOffset(removed, changed)

    node.offset = node.offset.map(positions)

    if (node?.objects) {
      for (const prop in node.objects) {
        delete Object.assign(node.objects, { [positions(prop)]: node.objects[prop] })[prop]
      }
    }

    if (node.type === TokenType.control || node.type === TokenType.iteration) {
      if (node?.children && node.children && node.children.some(child => child?.objects)) {
        node.children.forEach((c, k) => {
          // if (c?.objects) node.children[k].objects = tagObjects(c.objects)
        })
      }
    }

    if (node.lineOffset) {
      node.lineOffset = document.textDocument.positionAt(node.offset[0]).line
    }

    return node

  }

  /**
   * Removes a node from the AST depending on the position
   * of which a change was detected
   *
   * @param {object} node
   * @param {number} start
   * @param {number} end
   * @returns
   */
  function RemoveNode (node, start, end) {

    const { token, name, offset } = node

    if (start <= offset[0] && end >= offset[offset.length - 1]) {
      console.log('Remove index  of', offset, name)
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
        node.offset = [ offset[2] - removed, offset[3] - removed ]

        console.log('Deletion within Single START tag', offset, name)

        return node

      }

      console.log('Deletion contained in SINGULAR tag', offset, name)

      // delete singular object tags
      return false

      // Deletion on end tag of left side: ` endtag %}`
      // OR
      // Deletion on end tag of right side: `{% endtag `
    }

    if (offset.length > 2) {

      if (start <= node.offset[0] && end >= offset[1] && end < offset[2]) {

        node.token = [ token[1] ]
        node.tag = TokenTag.close
        node.offset = [ offset[2], offset[3] ]

        console.log('Deletion contained in START tag', offset, name)

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

          console.log('Deletion contained in END tag', offset, name)

          return node

        }

        console.log('Deletion contained in START AND END tag', offset, name)

        return false

      }
    }

  }
}
