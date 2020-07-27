import { TokenKind } from '../enums/kinds'
import { TokenContext } from '../enums/context'
import scanner from './scanner'
import yamljs from 'yamljs'
/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 */
export default class Node {

  /**
   * Tag Name
   *
   * @type {string}
   */
  name = ''

  /**
   * Tag Type
   *
   * @type {string}
   */
  type = undefined

  /**
   * Tag Kind
   *
   * @type{number}
   */
  kind = TokenKind.Liquid

  /**
   * Tag Kind
   *
   * @type{number}
   */
  line = scanner.getLine()

  /**
   * String Literal tokens
   *
   * @type{string[]}
   */
  token = []

  /**
   * Offset - Index position offsets
   *
   * @type {number[]}
   */
  offsets = []

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
  #context = []

  /**
   * Range - Line/character position
   *
   * @type {object}
   */
  get children () {

    return this.#children

  }

  /**
   * Range - Line/character position
   *
   * @type {object}
   */
  get range () {

    return scanner.getRange()

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

    if (scanner.getToken().length > 0) {
      this.offsets.push(scanner.start)
      this.#context.push({
        type,
        value: scanner.getToken()
      })
    }

  }

  /**
   * Start Offset - Left most starting index
   *
   * @type {object}
   */
  get start () {

    return this.offsets[0]

  }

  /**
   * End Offset - right most starting index
   *
   * @type {object}
   */
  get end () {

    return this.offsets[this.offsets.length - 1]

  }

}
