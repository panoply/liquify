import inRange from 'lodash/inRange'
import Config from 'parser/options'
import Context from 'parser/context'
import Stream from 'parser/stream'
import { TokenTags } from 'enums/tags'
import { TokenKind } from 'enums/kinds'
import { TextDocument } from 'vscode-languageserver-textdocument'

/**
 * iAST
 *
 */
export class IAST {

  constructor ({
    uri,
    languageId,
    version,
    text
  }) {

    /**
     * Text Document
     *
     * @type {TextDocument}
     */
    this.textDocument = TextDocument.create(uri, languageId, version, text)

    /**
     * Nodes
     *
     * @type {Array}
     */
    this.nodes = []

    /**
     * Embedded Documents
     *
     * @type {Array}
     */
    this.embeds = []

    /**
     * Parsing Errors/ Diagnostics
     *
     * @type {Array}
     */
    this.errors = []

    /**
     * Cursor Offsets (Change Position)
     *
     * @type {[number, number]}
     */
    this.cursor = [ null, null ]

    /**
     * Current Node
     *
     * @type {Parser.ASTNode}
     */
    this.node = null

  }

  /* -------------------------------------------- */
  /* CONDITIONAL GETTERS                          */
  /* -------------------------------------------- */

  /**
   * Returns boolean to determine whether we are within an embedded node
   *
   * @memberof IAST
   */
  get isEmbed () {

    return (
      this.node.type === TokenTags.embedded
    ) && (
      this.node.kind === TokenKind.Liquid
    ) && (
      Config.engine === 'shopify'
    )

  }

  /**
   * Converts offsets to Range
   *
   * @param {number} start
   * @param {number} end
   * @return {Parser.Range}
   * @memberof IAST
   */
  rangeFromOffsets (start, end) {

    return {
      start: this.textDocument.positionAt(start),
      end: this.textDocument.positionAt(end)
    }

  }

  /* -------------------------------------------- */
  /* NODE QUERIES                                 */
  /* -------------------------------------------- */

  /**
   * AST Updates
   *
   * Executes partial modifications to the AST.
   *
   * @param {any[]} edits
   */
  update (edits) {

    if (edits.length > 1) {

      this.embeds.splice(0)
      this.errors.splice(0)
      this.nodes.splice(0)
      this.cursor.splice(0)

      return null

    }

    const start = this.textDocument.offsetAt(edits[0].range.start)
    const index = this.nodes.findIndex(node => start < node.end)
    const node = this.nodes[index]

    inRange(start, node.start, node.end)
      ? Stream.Jump(node.offsets[0])
      : Stream.Jump(start)

    if (this.embeds.length > 0) {
      this.embeds.splice(this.embeds.findIndex(n => n > index))
    }

    this.errors.splice(node.errors)
    this.nodes.splice(index)
    this.cursor.splice(
      0,
      2,
      start,
      this.textDocument.offsetAt(edits[edits.length - 1].range.end)
    )

  }

  /**
   * Returns a node on the AST at position or offset provided.
   *
   * ---
   *
   * **MODIFIER**
   *
   * > `this.node` is updated
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {Parser.ASTNode|false}
   */
  getNodeAt (position) {

    const offset = typeof position === 'number'
      ? position
      : this.textDocument.offsetAt(position)

    const index = this.nodes.findIndex(
      ({ offsets }) => inRange(
        offset
        , offsets[0]
        , offsets[1]
      )
    )

    if (index < 0) return false

    this.node = this.nodes[index]

    return this.node

  }

  /**
   * Returns a node context information.
   *
   */
  getNodeContext (node = this.node) {

    const index = this.withinEndToken(node.start) ? 1 : 0

    return {

      get context () { return Context.get(node.context)[index] }

    }
  }

  /**
   * Returns an embedded language region node on the AST at
   * position or offset provided. We have a reference of all
   * embedded nodes, so this is a faster way to query those nodes.
   *
   * ---
   *
   * **MODIFIER**
   *
   * > `this.node` is updated
   *
   * ---
   *
   * @param {Parser.TextDocument.Position} position
   * @memberof IAST
   */
  getEmbedAt (position) {

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

    this.node = this.nodes[this.embeds[index]]
    return true

  }

  /**
   * Returns nodes from an array of index positions.
   * We use this to returns children nodes.
   *
   * @param {number[]} points]
   * @memberof IAST
   */
  getNodes (points) {

    return points.map(n => this.nodes[n])

  }

  /**
   * Returns all embedded regions on the AST or otherwise
   * false. Optionally filter out regions by language
   *
   * @param {string[]} [languages]
   * @returns {Parser.ASTNode[]|false}
   * @memberof IAST
   */
  getEmbeds (languages = undefined) {

    if (this.embeds.length === 0) return false

    const embeds = this.embeds.map(n => this.nodes[n])

    return languages
      ? embeds.filter(n => languages.includes(n.language))
      : embeds

  }

  /**
   * Returns all associate tags.
   *
   * @returns {Parser.ASTNode[]|false}
   * @memberof IAST
   */
  getAssociates () { return [] }

  /**
   * Returns all variables located on the document
   *
   * @returns {Parser.ASTNode[]|false}
   * @memberof IAST
   */
  getVariables () { return null }

  /**
   * Returns the scope in which the current token exits
   *
   * @returns {Parser.ASTNode[]|false}
   * @memberof IAST
   */
  getScope () { return null }

  /* -------------------------------------------- */
  /* WITHIN CHECKS                                */
  /* -------------------------------------------- */

  /**
   * Test to see if we are within ranges
   *
   * @param {Parser.TextDocument.Position|number} position
   * @param {number} start
   * @param {number} end
   * @returns {boolean}
   * @memberof IAST
   */
  within (position, start, end) {

    return inRange(
      typeof position === 'number'
        ? position
        : this.textDocument.offsetAt(position)
      , start
      , end
    )

  }

  /**
   * Test to see if we are within scope.
   *
   * @returns {boolean}
   * @memberof IAST
   */
  withinScope () { return true }

  /**
   * Test to see if current node is within an end tag token.
   *
   * ---
   *
   * **IMPORTANT**
   *
   * >  `this.node` is checked
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {boolean}
   * @memberof IAST
   */
  withinEndToken (position) {

    if (this.node.singular) return false

    return this.within(position, this.node.offsets[2], this.node.offsets[3])

  }

  /**
   * Test to see if we are within a node.
   * This will check start up until end locations
   *
   * ---
   *
   * **IMPORTANT**
   *
   * >  `this.node` is checked
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {boolean}
   * @memberof IAST
   */
  withinNode (position) {

    return this.within(position, this.node.start, this.node.end)

  }

  /**
   * We are testing the inner contents starting from end of start tag
   * to beginning of end tag.
   *
   * ---
   *
   * **IMPORTANT**
   *
   * >  `this.node` is checked
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {boolean}
   * @memberof IAST
   */
  withinBody (position) {

    if (this.node.singular) return false

    return this.within(position, this.node.offsets[1], this.node.offsets[2])

  }

  /**
   * We are testing that we we are within a token.
   * We only want start or singular tags
   *
   * ---
   *
   * **IMPORTANT**
   *
   * >  `this.node` is checked
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {boolean}
   * @memberof IAST
   */
  withinToken (position) {

    return this.within(position, this.node.offsets[0], this.node.offsets[1])

  }

  /**
   * We are testing that we we are within an embedded token
   * We will executes an addition check before passing to
   * withinNode
   *
   * ---
   *
   * **IMPORTANT**
   *
   * >  `this.node` is checked
   *
   * ---
   *
   * @param {Parser.TextDocument.Position|number} position
   * @returns {boolean}
   * @memberof IAST
   */
  withinEmbed (position) {

    if (!this.isEmbed) return false

    return this.withinNode(position)

  }

}
