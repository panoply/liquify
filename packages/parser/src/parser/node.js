import { TokenKind } from 'enums/kinds'
import { TokenContext } from 'enums/context'
import scanner from 'parser/scanner'
import specs from 'parser/specs'
import Errors from 'parser/errors'
import yamljs from 'yamljs'

/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 * @type {Parser.ASTNode}
 */
export class NodeAST {

  /* -------------------------------------------- */
  /* STATIC                                       */
  /* -------------------------------------------- */

  /**
   * AST Node Hierarch
   *
   * Tracks each node and their placements
   *
   * @static
   * @memberof Node
   * @type {number[]}
   */
  static hierarch = []

  /**
   * Errors
   *
   * Tracks each node and their placements
   *
   * @static
   * @memberof Node
   * @type {Map<number, object>}
   */
  static errors = new Map()

  /**
   * Tag Contexts
   *
   * The context structure for each tag. Starting offsets
   * are used as the `key` properties.
   *
   * @static
   * @memberof Node
   * @type {Map<number, object>}
   */
  static context = new Map()

  /**
   * Size
   *
   * AST Node size
   *
   * @static
   * @memberof Node
   * @type {number}
   */
  static size = 0

  /* -------------------------------------------- */
  /* CONSTRUCTORS                                 */
  /* -------------------------------------------- */

  /**
   * Tag Name
   *
   * @type {string}
   */
  name = null

  /**
   * Tag Type
   *
   * The tag type reference
   *
   * @type {Parser.TagTypes}
   */
  type = undefined

  /**
   * Range
   *
   * Start and End range line/column positions
   *
   * @type {Parser.Range}
   */
  range = { start: scanner.range.start }

  /**
   * Offsets List
   *
   * Returns position offsets of tokens
   *
   * @type {number[]}
   */
  offsets = [ scanner.start ]

  /**
   * Tag Kind
   *
   * @type{number}
   */
  kind = TokenKind.Liquid

  /**
   * String Literal tokens
   *
   * @type{string[]}
   */
  token = []

  /**
   * Get Children
   *
   * Returns the tokens children decedent nodes
   *
   * @type {object[]}
   */
  children = []

  /**
   * Objects
   *
   * Returns the objects located on the token
   *
   * @type {Map}
   */
  objects = new Map()

  /**
   * Filters
   *
   * Returns the Filters (if any) located on the token
   *
   * @type{object}
   */
  filters = new Map()

  /**
   * The Starting offset
   *
   * @readonly
   * @memberof Node
   */
  get start () { return this.offsets[0] }

  /**
   * The Ending offset
   *
   * @readonly
   * @memberof Node
   */
  get end () { return this.offsets[this.offsets.length - 1] }

  /**
   * The Token errors
   *
   * @readonly
   * @type {object[]}
   * @memberof Node
   */
  get errors () { return NodeAST.errors.get(this.start) }

  /**
   * The Token errors
   *
   * @readonly
   * @memberof Node
   */
  get contexts () { return NodeAST.context.get(this.start) }

  /**
   * Get Contents
   *
   * @readonly
   * @memberof Node
   * @returns {string}
   */
  get content () {

    if (this.kind === TokenKind.Yaml) {
      return yamljs.parse(scanner.GetText(this.offsets[1], this.offsets[2]))
    }

    return scanner.GetText(this.start, this.end)

  }

  /**
   * The Token errors
   *
   * @param {number} index
   */
  offset (index) {

    this.offsets.push(index)

  }

  /**
   * The Token errors
   *
   * @param {Parser.TokenContext} type
   */
  context (type) {

    const context = {
      type,
      range: scanner.range,
      value: TokenContext.Newline === type || TokenContext.Whitespace === type
        ? scanner.space
        : scanner.token
    }

    NodeAST.context.has(this.start)
      ? this.contexts.push(context)
      : NodeAST.context.set(this.start, [ context ])

  }

  /**
   * Set Errors
   *
   * @param {number} error
   * @memberof Node
   */
  error (error) {

    if (error) {

      const diagnostic = {
        ...Errors(error),
        range: scanner.range,
        token: scanner.token,
        node: NodeAST.context.size - 1
      }

      NodeAST.errors.has(this.start)
        ? this.errors.push(diagnostic)
        : NodeAST.errors.set(this.start, [ diagnostic ])
    }

  }

  hierarch (index) {

    if (!specs.singular) NodeAST.hierarch.push(index)

  }

}
