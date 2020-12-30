import * as TokenTag from '../lexical/tags'
import { Engines } from './options'

export default new class Specs {

  /**
   * References
   *
   * @type {Parser.Variation}
   */
  #ref = undefined

  /**
   * Specification Type
   *
   * @type {number}
   */
  #type = undefined

  /**
   * Cursor (currently active tag in parse)
   *
   * @type {object}
   */
  #cursor = undefined

  /**
   * Get Type
   *
   * @readonly
   * @memberof Specs
   * @returns {number}
   */
  get type () {

    return this.#type

  }

  /**
   * Get Type
   *
   * @readonly
   * @memberof Specs
   * @returns {boolean}
   */
  get singular () {

    return this.#cursor?.singular

  }

  /**
   * Set Type
   *
   * @readonly
   * @memberof Specs
   */
  set type (type) {

    this.#type = type

  }

  /**
   * Get Name
   *
   * @readonly
   * @memberof Specs
   */
  get name () {

    return this.#cursor.name

  }

  /**
   * Reference
   *
   * @param {Parser.Variation} [reference=undefined]
   * @memberof Specs
   */
  ref (reference = undefined) {

    if (reference) {
      this.#ref = { ...reference }
    }

    return this.#ref

  }

  /**
   * Cursor
   *
   * Cursor represents an in-stream specification.
   * The cursor is changed each time a new tag with
   * a reference specification is encountered it will
   * be made available on private `this.#cursor` prop.
   *
   * @param {string} [name=undefined]
   * Tag name value to match with a specification
   *
   * @return {Parser.NodeSpecification}
   * @memberof Specs
   */
  cursor (name = undefined) {

    if (!name) return this.#cursor

    this.#cursor = (
      this.#ref?.tags?.[name]
    ) || ((
      this.#ref?.engine !== Engines.Standard
    ) && (
      this.#ref?.objects?.[name]
    )) || (
      this.#ref?.filters?.[name]
    ) || undefined

    // Reset type to align its value with current spec
    if (this.#cursor?.type) {
      this.#type = TokenTag[this.#cursor.type]
    }

    return this.#cursor

  }

  /**
   * Reset Specifications
   *
   * Resets the specification stream. This is generally
   * called upon each tokenization.
   *
   * @param {boolean} [hard=false]
   * Removes the specification variation references
   *
   */
  reset (hard = false) {

    this.#cursor = undefined
    this.#type = undefined

    if (hard) {
      const props = Object.getOwnPropertyNames(this.#ref)
      const size = props.length
      for (let i = 0; i < size; i++) delete this.#ref[props[i]]
    }

  }

}()
