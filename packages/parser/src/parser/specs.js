import { TokenTags } from '../enums/parse'
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
   * @type {Parser.NodeSpecification}
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

    // @ts-ignore
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
   * @returns {string|boolean}
   */
  get name () {

    // @ts-ignore
    return this.#cursor.name

  }

  /**
   * Set Type
   *
   * @readonly
   * @memberof Specs
   */
  get params () {

    // @ts-ignore
    return this.#cursor?.parameters

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

    if (this.#ref?.tags?.[name]) {
      this.#cursor = this.#ref?.tags?.[name]
      this.#type = TokenTags[this.#cursor.type]
      return this.#cursor
    }

    if (this.#ref?.engine !== Engines.Standard) {
      if (this.#ref?.objects?.[name]) {
        this.#cursor = this.#ref?.objects?.[name]
        this.#type = TokenTags[this.#cursor.type]
        return this.#cursor
      }
    }

    if (this.#ref?.filters?.[name]) {
      this.#cursor = this.#ref?.filters?.[name]
      return this.#cursor
    }

    this.#cursor = undefined
    this.#type = undefined

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
