import { NodeType } from 'lexical/types'
import { NodeKind } from 'lexical/kind'
import Config from 'parser/options'
import Stream from 'parser/stream'
import inRange from 'lodash/inRange'
import { global } from 'parser/global'

/**
 * @type {Parser.AST}
 */
export class IAST {

  /**
   * @private
   * @type {Parser.TextDocument}
   */
  #textDocument

  /** @type {[number, number]}  */
  cursor = [ 0, 0 ]

  /** @type {Parser.ASTNode}  */
  node = null

  /** @type {Parser.ASTNode[]}  */
  nodes = []

  /** @type {number[]}  */
  embeds = []

  /** @type {Parser.IParseError[]}  */
  errors = []

  constructor (textDocument) {
    this.textDocument = textDocument
    Stream.create()
  }

  get textDocument () { return this.#textDocument }

  set textDocument (textDocument) { this.#textDocument = textDocument }

  positionAt (offset) {

    return this.textDocument.positionAt(offset)

  }

  offsetAt (location) {

    return this.textDocument.offsetAt(location)
  }

  toRange (start, end) {

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

    this.embeds.splice(0)
    this.errors.splice(0)
    this.nodes.splice(0)
    this.cursor.splice(0)

    Stream.create()

  }

  /**
   * AST Updates
   *
   * Executes partial modifications to the AST.
   *
   */
  update (edits) {
    return this.clear()
    if (edits.length > 1) return this.clear()

    const start = this.textDocument.offsetAt(edits[0].range.start)
    const index = this.nodes.findIndex(node => start < node.end)
    const node = this.nodes[index]

    if (typeof node === 'undefined') return this.clear()

    inRange(start, node.start, node.end)
      ? Stream.Jump(node.start)
      : Stream.Jump(start)

    if (this.embeds.length > 0) {
      this.embeds.splice(this.embeds.findIndex(n => n > index))
    }

    this.errors.splice(0)
    this.nodes.splice(index)
    this.cursor.splice(
      0,
      2,
      start,
      this.textDocument.offsetAt(edits[0].range.end)
    )

  }

  getText (location = undefined) {

    if (typeof location === 'undefined') return this.textDocument.getText()
    if (typeof location === 'number') return Stream.GetCharAt(location)
    if (typeof location === 'object') {
      return location?.start
        ? this.textDocument.getText(location)
        : Stream.GetCharAt(this.offsetAt(location))
    }

    return this.textDocument.getText(this.toRange(location))

  }

  get prevNode () { return this.nodes[this.node.index - 1] }
  get nextNode () { return this.nodes[this.node.index + 1] }
  get lastNode () { return this.nodes[this.nodes.length - 1] }

  getNodeAt (position, updateNode = true) {

    const offset = typeof position === 'number'
      ? position
      : this.textDocument.offsetAt(position)

    if (this.node) {
      if ((
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

    const index = this.nodes.findIndex(
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

    if (index < 0) return false

    if (updateNode) {
      this.node = this.nodes[index]
      return this.node
    }

    return this.nodes[index]

  }

  getTokenAt (position, updateNode = true) {

    const offset = typeof position === 'number'
      ? position
      : this.textDocument.offsetAt(position)

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
      : this.textDocument.offsetAt(position)

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

  getNodes (points) {

    return points.map(n => this.nodes[n])

  }

  getEmbeds (languages = undefined) {

    if (this.embeds.length === 0) return []

    const embeds = this.embeds.map(n => this.nodes[n])

    return languages
      ? embeds.filter(n => languages.includes(n.language))
      : embeds

  }

  getAssociates () { return [] }

  getVariables () { return null }

  getScope () { return null }

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

  withinScope () { return true }

  withinEndToken (position) {

    if (!this.node || this.node.singular) return false

    return this.within(position, this.node.offsets[2], this.node.offsets[3])

  }

  withinNode (position) {

    if (!this.node) return false

    return this.within(position, this.node.start, this.node.end)

  }

  withinBody (position) {

    if (!this.node || this.node.singular) return false

    return this.within(position, this.node.offsets[1], this.node.offsets[2])

  }

  withinToken (position) {

    if (!this.node) return false

    return this.within(position, this.node.offsets[0], this.node.offsets[1])

  }

  withinEmbed (position) {

    if (!this.node || this.node.singular) return false

    return (
      this.node.type === NodeType.embedded
    ) && (
      this.node.kind === NodeKind.Liquid
    ) && (
      Config.engine === 'shopify'
    ) && (
      this.withinNode(position)
    )

  }

}
