import { NodeType } from 'lexical/types'
import { NodeKind } from 'lexical/kind'
import Config from 'parser/options'
import Stream from 'parser/stream'
import inRange from 'lodash/inRange'
import { TextDocument } from 'vscode-languageserver-textdocument'
/**
 * @type {Parser.AST}
 */
export default class IAST {

  textDocument

  /** @type {Parser.ASTNode}  */
  node = null

  /** @type {Parser.ASTNode[]}  */
  nodes = []

  /** @type {number[]}  */
  embeds = []

  variables = {}

  /** @type {number[]}  */
  comments = []

  /** @type {Parser.IParseError[]}  */
  errors = []

  cursor = 0

  constructor (textDocument) {
    this.textDocument = textDocument
    Stream.create()
  }

  literal (extension = 'tmp') {

    return TextDocument.create(
      this.textDocument.uri + '.' + extension,
      this.textDocument.languageId,
      this.textDocument.version,
      this.textDocument.getText()
    )

  }

  positionAt (offset) {

    return this.textDocument.positionAt(offset)

  }

  offsetAt (location) {

    return this.textDocument.offsetAt(location)
  }

  toRange (start = 0, end = this.textDocument.getText().length) {

    return {
      start: this.textDocument.positionAt(start),
      end: this.textDocument.positionAt(end)
    }
  }

  /**
   * @returns {[number, number]}
   */
  toRangeOffset (location) {

    return [
      this.textDocument.offsetAt(location.start),
      this.textDocument.offsetAt(location.end)
    ]

  }

  /**
   * @returns {Parser.Range}
   */
  toLineRange (location) {

    const range = {
      start: {
        character: 0,
        line: 0
      },
      end: {
        character: 0,
        line: 0
      }
    }

    if (typeof location === 'number') {
      const { line } = this.textDocument.positionAt(location)
      range.start.line = line
      range.end.line = line + 1
      return range
    }

    range.start.line = location.line
    range.end.line = location.line + 1

    return range
  }

  /* -------------------------------------------- */
  /* NODE QUERIES                                 */
  /* -------------------------------------------- */

  clear () {

    this.embeds = []
    this.errors = []
    this.nodes = []
    this.comments = []

  }

  /**
   * AST Updates
   *
   * Executes partial modifications to the AST.
   *
   */
  update (edits) {

    Stream.create()

    this.cursor = this.offsetAt(edits[edits.length - 1].range.start)

    if (edits.length > 1 || this.nodes.length === 0) return this.clear()

    let i = 0

    while (this.nodes.length > i) if (this.nodes[i].end > this.cursor) break; else i++

    if (i === 0) return this.clear()

    const node = (
      this.nodes[i].root === 0 &&
      this.nodes[i].parent === this.nodes[i].index &&
      this.nodes[i].index > 0
    ) ? this.nodes[i] : this.nodes[this.nodes[i].root]

    console.log(node)

    if (!node) return this.clear()

    Stream.Jump(node.start)

    if (this.errors.length > 0) this.errors.splice(node.error)
    if (this.embeds.length > 0) this.embeds.splice(this.embeds.findIndex(n => n >= i))
    if (this.comments.length > 0) this.comments.splice(this.comments.findIndex(n => n >= i))

    this.nodes.splice(i)

  }

  getText (location = undefined) {

    if (typeof location === 'undefined') return this.textDocument.getText()
    if (typeof location === 'number') return Stream.GetCharAt(location)
    if (typeof location === 'object') {
      return location?.start
        ? this.textDocument.getText(location)
        : Stream.GetCharAt(this.offsetAt(location))
    }

    return this.textDocument.getText(this.toRange(location[0], location[1]))

  }

  get prevNode () { return this.nodes[this.node.index - 1] }
  get nextNode () { return this.nodes[this.node.index + 1] }
  get lastNode () { return this.nodes[this.nodes.length - 1] }
  get parentNode () { return this.nodes[this.node.parent] }

  getNodeAt (position, updateNode = true) {

    const offset = typeof position === 'number'
      ? position
      : this.offsetAt(position)

    let from = 0

    if (this.node) {
      if (offset > this.node.end) from = this.node.index
      else if ((
        this.node.type === NodeType.embedded && inRange(
          offset
          , this.node.offsets[1]
          , this.node.offsets[2]
        )
      ) || inRange(
        offset
        , this.node.offsets[0]
        , this.node.offsets[1]
      ) || inRange(
        offset
        , this.node.offsets[2]
        , this.node.offsets[3]

      )) return this.node

    }

    const node = this.nodes.slice(from).find(
      ({ offsets, type }) => inRange(
        offset
        , offsets[0]
        , offsets[1]
      ) || (
        type === NodeType.embedded && inRange(
          offset
          , offsets[1]
          , offsets[2]
        )
      ) || inRange(
        offset
        , offsets[2]
        , offsets[3]
      )
    )

    if (!node) return false

    if (updateNode) {
      this.node = node
      return this.node
    }

    return node

  }

  getTokenAt (position, updateNode = true) {

    const offset = typeof position === 'number'
      ? position
      : this.offsetAt(position)

    if (inRange(offset, this.node.offsets[0], this.node.offsets[1])) return this.nodes

    const index = this.nodes.findIndex(
      ({ offsets }) => inRange(
        offset
        , offsets[0]
        , offsets[1]
      )
    )

    if (index < 0) return false

    if (updateNode) {
      this.node = this.nodes[index]
      return this.node
    }

    return this.nodes[index]

  }

  /**
   * Returns a node context information.
   *
   */
  getNodeContext (node = this.node) {

    return {}
  }

  getEmbedAt (position, updateNode = true) {

    if (this.embeds.length === 0) return false

    const offset = typeof position === 'number'
      ? position
      : this.offsetAt(position)

    const index = this.embeds.findIndex(i => inRange(
      offset
      , this.nodes[i].offsets[1]
      , this.nodes[i].offsets[2]
    ))

    if (index < 0) return false

    if (updateNode) {
      this.node = this.nodes[index]
      return this.node
    }

    return this.nodes[index]

  }

  getScope (node = this.node) {

    if (node?.parent === node.index && node?.root === node.parent) return false

    return this.nodes[node.parent]

  }

  getParentNode (node = this.node) {

    return (
      node.parent === node.index &&
      node.root === node.parent
    ) ? false : this.nodes[node.parent]

  }

  getNodes (points) {

    return points.map(n => this.nodes[n])

  }

  getComments () {

    if (this.comments.length === 0) return false

    return this.comments.map(n => this.nodes[n])

  }

  getEmbeds (languages = undefined) {

    if (this.embeds.length === 0) return false

    const embeds = this.embeds.map(n => this.nodes[n])

    return languages
      ? embeds.filter(n => languages.includes(n.language))
      : embeds

  }

  getAssociates () { return [] }

  getVariables () { return null }

  /* -------------------------------------------- */
  /* WITHIN CHECKS                                */
  /* -------------------------------------------- */

  within (position, start, end) {

    return inRange(
      typeof position === 'number'
        ? position
        : this.textDocument.offsetAt(position)
      , start
      , end
    )

  }

  withinScope (node, scope) {

    const parentNode = this.getParentNode(node)

    if (parentNode) return scope.test(parentNode.name)

  }

  withinEndToken (position, node = this.node) {

    if (!node || node.singular) return false

    return this.within(position, node.offsets[2], node.offsets[3])

  }

  withinNode (position, node = this.node) {

    if (!node) return false

    return this.within(position, node.start, node.end)

  }

  withinBody (position, node = this.node) {

    if (!node || node.singular) return false

    return this.within(position, node.offsets[1], node.offsets[2])

  }

  withinToken (position, node = this.node) {

    if (!node) return false

    return this.within(position, node.offsets[0], node.offsets[1])

  }

  withinEmbed (position, node = this.node) {

    if (!node || node.singular) return false

    return (
      node.type === NodeType.embedded
    ) && (
      node.kind === NodeKind.Liquid
    ) && (
      Config.engine === 'shopify'
    ) && (
      this.within(position, node.start, node.end)
    )

  }

}
