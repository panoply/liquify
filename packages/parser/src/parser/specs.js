import { TokenTags } from '../enums/parse'
import { Engines } from './options'
import * as c from '../lexical/characters'

export default (function Specs () {

  /**
   * References
   *
   * @type {Specs.}
   */
  let Ref

  /**
   * Specification Type
   *
   * @type {number}
   */
  let Type

  /**
   * Cursor (currently active tag in parse)
   *
   * @type {Parser.NodeSpecification}
   */
  let Cursor

  return {

    /**
     * Get Type
     *
     * @readonly
     * @memberof Specs
     * @returns {number}
     */
    get type () {

      return Type

    },

    /**
     * Get Type
     *
     * @readonly
     * @memberof Specs
     * @returns {boolean}
     */
    get singular () {

      // @ts-ignore
      return Cursor?.singular

    },

    /**
     * Set Type
     *
     * @readonly
     * @memberof Specs
     */
    set type (type) {

      Type = type

    },

    /**
     * Get Name
     *
     * @readonly
     * @memberof Specs
     * @returns {string|boolean}
     */
    get data () {

      // @ts-ignore
      return Cursor

    },

    /**
     * Get Name
     *
     * @readonly
     * @memberof Specs
     * @returns {string|boolean}
     */
    get name () {

      // @ts-ignore
      return Cursor?.name

    },

    /**
     * Set Type
     *
     * @readonly
     * @memberof Specs
     */
    get hasSpec () {

      // @ts-ignore
      return Cursor !== undefined

    },

    parameter () {

    },

    /**
     * Reference
     *
     * @param {Parser.Variation} [reference=undefined]
     * @memberof Specs
     */
    ref (reference = undefined) {

      if (reference) {
        Ref = { ...reference }
      }

      return Ref

    },

    /**
     * Cursor
     *
     * Cursor represents an in-stream specification.
     * The cursor is changed each time a new tag with
     * a reference specification is encountered it will
     * be made available on private `cursor` prop.
     *
     * @param {string} [name=undefined]
     * Tag name value to match with a specification
     *
     * @return {Parser.NodeSpecification}
     * @memberof Specs
     */
    cursor (name = undefined) {

      if (!name) return Cursor

      if (Ref?.tags?.[name]) {
        Cursor = Ref?.tags?.[name]
        Type = TokenTags[Cursor?.type]
        return Cursor
      }

      if (Ref?.engine !== Engines.Standard) {
        if (Ref?.objects?.[name]) {
          Cursor = Ref?.objects?.[name]
          Type = TokenTags[Cursor?.type]
          return Cursor
        }
      }

      if (Ref?.filters?.[name]) {
        Cursor = Ref?.filters?.[name]
        return Cursor
      }

      Cursor = undefined
      Type = undefined

      return Cursor

    },

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

      Cursor = undefined
      Type = undefined

      if (hard) {
        const props = Object.getOwnPropertyNames(Ref)
        const size = props.length
        for (let i = 0; i < size; i++) delete Ref[props[i]]
      }

    }
  }

}())
