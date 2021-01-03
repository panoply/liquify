import { TokenKind } from '../enums/kinds'
import scanner from './scanner'
import specs from './specs'
import Errors from './errors'

import yamljs from 'yamljs'

/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 * @type {Parser.ASTNode}
 */
export default class Node {

  /**
   * Presets
   *
   * Disposable static object used to preset
   * values before a specification is matched.
   *
   * @static
   * @memberof Node
   * @type {object}
   */
  static preset = {}

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
   * @type {object[]}
   */
  static errors = []

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

  /**
   * Tag Name
   *
   * @type {string}
   */
  name = null

  /**
   * Start Offset - Left most starting index
   *
   * @type {Parser.Range}
   */
  range = { start: scanner.position }

  /**
   * Start Offset - Left most starting index
   *
   * @type {number}
   */
  start = scanner.start

  /**
   * End Offset - right most starting index
   *
   * @type {number}
   */
  end = undefined

  /**
   * Tag Type
   *
   * @type {number}
   */
  type = specs.type

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
   * String Literal tokens
   *
   * @type{number[]}
   */
  offsets = [ scanner.start ]

  /**
   * Errors
   *
   * @type{number[]}
   */
  _errors = []

  /**
   * Children - Index position offsets
   *
   * @type {number[]}
   */
  _children = []

  /**
   * Context Stream
   *
   * @type {object[]}
   * @private
   */
  _context = []

  /**
   * Objects
   *
   * @type{object[]}
   */
  _objects = []

  /**
   * Range - Line/character position
   *
   * @type {object}
   */
  get children () {

    return this._children

  }

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
   * Get Objects
   *
   */
  get objects () {

    return this._objects
  }

  /**
   * Set Objects
   */
  set objects (object) {

    // eslint-disable-next-line
    this._objects = [...this._objects, object]

  }

  /**
   * Get Errors
   *
   */
  get errors () {

    return Node.errors
  }

  /**
   * Set Errors
   *
   * @param {number} error
   * @memberof Node
   */
  error (error = undefined) {

    console.log('IN A ERROR', error)

    if (!error) return Node.errors

    const diagnostic = {
      ...Errors(error)
      , range: scanner.range
      , node: Node.size
    }

    Node.errors.push(diagnostic)
    this._errors.push(Node.errors.length - 1)

    return diagnostic

  }

  hierarch (index) {

    if (!specs.singular) {
      Node.hierarch.push(index)
    }
  }

  /**
   * Context
   *
   * @param {string} [type=undefined]
   * @return {object[]}
   * @memberof Node
   */
  context (type = undefined) {

    if (type) {

      this._context = [
        ...this._context
        , {
          type,
          value: scanner.token,
          range: scanner.range
        }
      ]
    }

    return this._context

  }

  /**
   * Reset Node Presets
   *
   * Resets the static presets
   *
   */
  reset (length) {

    Node.size = length

    const prop = Object.getOwnPropertyNames(Node.preset)
    const size = prop.length

    if (size > 0) {
      let i = 0
      for (; i < size; i++) delete Node.preset[prop[i]]
    }

  }

}
