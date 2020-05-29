import scan from './scanner'
import _ from 'lodash'
import { Characters, TokenTag } from './lexical'
import * as parse from './utils'
import { Range } from 'vscode-languageserver'

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
 * @param {import('vscode-languageserver').TextDocumentContentChangeEvent} offset
 * @param {import('vscode-languageserver-textdocument').TextDocument} document
 * @returns
 */
export default async (
  document
  , ast
  , {
    text
    , rangeLength
    , range: {
      start,
      end
    }
  }
) => {

  ast = scan(document, undefined, ast, undefined)

  console.log(ast)
  if (!ast.length) {
    ast = scan(document, undefined, ast, undefined)
    return ast
  }

  const increment = parse.setTokenOffset(rangeLength, text.length)
  const getText = parse.getRange(document)
  const getToken = parse.isOffsetInToken(start)
  const astIndex = ast.findIndex(({ offset }) => (
    parse.inRange(start, offset[0], offset[1]) ||
    parse.inRange(start, offset[2], offset[3])
  ))

  console.log(astIndex)

  if (astIndex > 0) {

    const token = getToken(ast[astIndex])

    if (token) {

      let record
        , $1 = 0
        , $2 = 1

      // Changed node is a start tag, eg: `{% tag %}`
      // Adjust the offsets to use end position offsets
      if (token.tag === TokenTag.start) {
        $1 = 2
        $2 = 3
        record = [ token ]
      }

      // Extract the changed text
      const content = getText(
        ast[astIndex].offset[$1]
        , ast[astIndex].offset[$2] + text.length
      )

      // Re-parse the changed token
      const [ node ] = scan(document, content, record, ast[astIndex].offset[$1])

      // When the re-parsed node is a start tag
      // Updated token should not match the changed token
      if (node?.tag === TokenTag.start && node.token[0] !== token.token[0]) {
        node.tag = TokenTag.pair
        node.token.push(token.token[0])
        node.offset.push(...token.offset.map(increment))
      }

      // If successful, replace node record
      if (node) ast.splice(astIndex, 1, node)

    }

    // Decrement all nodes
    for (let i = 0; i < ast.length; i++) {
      if (ast[i].offset[0] >= start) {
        ast[i].offset = ast[i].offset.map(increment)
      } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
        ast[i].offset = [
          ...ast[i].offset.slice(0, 2)
          , ...ast[i].offset.slice(2).map(increment)
        ]
      }
    }

    return ast

  } else if (rangeLength > 0 && astIndex < 0) {

    // Get the index of the nearest changed token
    const index = ast.findIndex(({ offset: [ offset ] }) => offset > start)

    // Retrive all backward nodes, which are pre change offset index
    const backward = ast[index].offset[ast[index].offset.length - 1]

    // Retrive all forward nodes, which are post change offset index
    const forward = ast.filter(({ offset }) => (backward > offset[offset.length - 1]))

    // Retrive the nodes that require increment
    // Will grab all nodes after the last change node offset
    // We will increment this by 1 to skip the current node
    const append = ast.slice(index + forward.length + 1)

    // Remove all nodes
    ast.splice(index).push(...append)

    // Push all nodes
    ast.push(...append)

    // Decrement all nodes
    for (let i = 0; i < ast.length; i++) {
      if (ast[i].offset[0] >= start) {
        ast[i].offset = ast[i].offset.map(increment)
      } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
        ast[i].offset = [
          ...ast[i].offset.slice(0, 2)
          , ...ast[i].offset.slice(2).map(increment)
        ]
      }
    }

    console.log(ast)
    // return
    return ast

  } else if (text.length > 2 && /[{%}]/g.test(text)) {

    console.log('RE PARSE')
    ast = scan(document, undefined, ast, undefined)
    return ast

  } else {

    // Decrement all nodes
    for (let i = 0; i < ast.length; i++) {
      if (ast[i].offset[0] >= start) {
        ast[i].offset = ast[i].offset.map(increment)
      } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
        ast[i].offset = [
          ...ast[i].offset.slice(0, 2)
          , ...ast[i].offset.slice(2).map(increment)
        ]
      }
    }

    // console.log(ast)

    return ast

  }

  /* for (let i = 0; i < ast.length; i++) {

    let record
      , $1 = 0
      , $2 = 1

    // Checks to see if change position is within a node
    // Changes are checked post open delimeter and pre close delimeters
    const token = getToken(ast[i])

    // Selection removal was detected
    // Changes were not within a token, we will break out of this iteration
    if (rangeLength > 0 && !token) {
      doDecrement()
      break
    } else if (token) {

      // Changed node is a start tag, eg: `{% tag %}`
      // Adjust the offsets to use end position offsets
      if (token.tag === TokenTag.start) {
        $1 = 2
        $2 = 3
        record = [ token ]
      }

      // Extract the changed text
      const content = getText(ast[i].offset[$1], ast[i].offset[$2] + text.length)

      // Re-parse the changed token
      const [ node ] = scan(document, content, record, ast[i].offset[$1])

      // When the re-parsed node is a start tag
      // Updated token should not match the changed token
      if (node?.tag === TokenTag.start && node.token[0] !== token.token[0]) {
        node.tag = TokenTag.pair
        node.token.push(token.token[0])
        node.offset.push(...token.offset.map(increment))
      }

      // console.log(node)
      // If successful, replace node record
      if (node) ast.splice(i, 1, node)

    } else if (ast[i].offset[0] >= start) {
      ast[i].offset = ast[i].offset.map(increment)
    } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
      ast[i].offset = [
        ...ast[i].offset.slice(0, 2),
        ...ast[i].offset.slice(2).map(increment)
      ]
    }

  } */

  // console.log(ast)
  return ast

  // const offsets = mapOffsets(ast, start)

  // Decrements (backspace) for all deletions/removals
  if (rangeLength > 0) {

    // Extract changed substring from the text document and reparse
    const content = document.getText(
      Range.create(
        document.positionAt(start),
        document.positionAt(start + rangeLength)
      )
    )

    // console.log(content, /[{<>}%]/g.test(content))

    ast = /[{<>}%]/g.test(content) ? scan(document) : doIncrement(i => (i - rangeLength))

  } else {

    // Extract changed substring from the text document and reparse
    const char = text.charCodeAt(0)
    const content = document.getText(
      Range.create(
        document.positionAt(start),
        document.positionAt(end)
      )
    )

    // When input has length of 1 and said input is whitespace or newline
    if (text.length === 1 && (char === Characters.WSP || char === Characters.NWL)) {
      ast = doIncrement(i => (i + 1))
    } else {
      // When input is whitespace, tab or newline and spans a length more than 1
      ast = /[{<>}%]/.test(content)
        ? scan(document)
        : /[\s\t\n]/.test(text)
          ? doIncrement(i => (i + text.length))
          : scan(document)
    }
  }

  // console.log(ast)
  return ast

}
