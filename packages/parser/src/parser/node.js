import { TokenKind } from '../enums/kinds'
import { TokenContext } from '../enums/context'
import { object } from './utils'
import scanner from './scanner'
import yamljs from 'yamljs'
/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 */
export default class Node {

  static register = {}

  /**
   * Tag Name
   *
   * @type {string}
   */
  name = undefined

  /**
   * Start Offset - Left most starting index
   *
   * @type {number}
   */
  start = Node.register.start

  /**
   * End Offset - right most starting index
   *
   * @type {object}
   */
  end = undefined

  /**
   * Start Offset - Left most starting index
   *
   * @type {object}
   */
  range = { start: scanner.getRange(), end: object() }

  /**
   * Tag Type
   *
   * @type {string}
   */
  type = 'unknown'

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
  offsets = [ this.start ]

  /**
   * Errors
   *
   * @type{number[]}
   */
  errors = []

  /**
   * Offset - Index position offsets
   *
   * @type {number[]}
   */
  #children = []

  /**
   * Context Stream
   *
   * @type {object[]}
   * @private
   */
  #context = Node.register?.whitespace ? [ TokenContext.Dash ] : []

  /**
   * Objects
   *
   * @type{number[]}
   */
  objects = object()

  /**
   * Range - Line/character position
   *
   * @type {object}
   */
  get children () {

    return this.#children

  }

  /**
   * Get Contents - Returns a tags innner content
   *
   * @returns {string}
   */
  get content () {

    if (this.kind === TokenKind.Yaml) {
      return yamljs.parse(scanner.getText(this.offsets[1], this.offsets[2]))
    }

    return scanner.getText(this.start, this.end)

  }

  /**
   * Get Context
   *
   */
  get context () {

    return this.#context
  }

  /**
   * Set Context
   */
  set context (type) {

    // this.offsets.push(scanner.start)
    this.#context.push(typeof type === 'object' ? type : { type, value: scanner.getToken() })

  }

}
