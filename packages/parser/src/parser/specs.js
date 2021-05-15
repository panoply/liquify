import { TokenTags } from '../enums/tags'
import { Engines } from './options'

export default (function Specs () {

  /**
   * References
   *
   * @type {Specs.Variation}
   */
  let Ref

  /**
   * Token Name
   *
   * @type {string}
   */
  let Name

  /**
   * Specification Type
   *
   * @type {Parser.TokenTags}
   */
  let Type

  /**
   * Cursor (currently active tag in parse)
   *
   * @template T
   * @typedef {Parser.Cursor} Spec
   */
  let Cursor

  /**
   * Filters
   */
  let track = 0

  /**
   * Filters
   *
   * @type {boolean}
   */
  let inFilter = false

  let filterName

  /**
   * Parameter
   */
  const Parameter = 0

  return {

    /**
     * Get Token Tag Type
     *
     * @readonly
     * @returns {string}
     */
    get name () { return Name },

    /**
     * Gets filter argument
     *
     * @returns {Specs.FilterArguments}
     */
    get filter () { return this.get.arguments[track] },

    /**
     * Argument Navigator - Moves to next item on array
     */
    get argument () {

      return {
        get true  () { return inFilter },
        next: () => {

          return (track++) !== (this.get.arguments.length - 1)

        },
        prev: () => track--,
        accepts: accept => {
          return this.filter.accepts.indexOf(accept) >= 0
        },
        reconnect: () => {

          /**
         * Cursor - Filter Specification
         *
         * @template T
         * @type {Spec<Specs.IFilter>}
         */
          Cursor = Ref.filters[filterName]

        },
        reset: () => {
          track = 0
        }
      }

    },

    /**
     * Get Token Tag Type
     *
     * @readonly
     * @returns {number}
     */
    get type () { return Type },

    /**
     * Get Current Specification in stream
     *
     * @readonly
     * @return {Specs.IFilter & Specs.IObject & Specs.ITag}
     */
    get get () { return Cursor },

    /**
     * Check to see if the tag has a specification
     *
     * @readonly
     * @returns {boolean}
     */
    get exists () { return Cursor !== undefined },

    /**
     * Set Specification Reference
     *
     * Sets the variation specification. Called upon
     * initialization before parsing begins.
     *
     * @param {Parser.Variation} [reference=undefined]
     * @returns {void}
     */
    ref: (reference = undefined) => { Ref = reference },

    /**
     * Preset Method
     *
     * Presets token tag type and prepares the cursor
     * for fast reference of specification.
     *
     * @param {Parser.TokenTags} type
     * @returns {void}
     */
    preset: type => { Type = type },

    /**
     * Cursor
     *
     * Cursor represents an in-stream specification.
     * The cursor is changed each time a new tag with
     * a reference specification is encountered it will
     * be made available on private `cursor` prop.
     *
     * @param {string} [name=undefined]
     * @returns {Spec<T>|false}
     */
    cursor: (name = undefined) => {

      if (!Ref || !name) return false

      Name = name

      if (Ref.engine !== Engines.Standard && Ref?.objects?.[name]) {

        /**
         * Cursor - Object Specification
         *
         * @template T
         * @type {Spec<Specs.IObject>}
         */
        Cursor = Ref.objects[name]
        Type = TokenTags.object

        return Cursor

      }

      if (Ref?.tags?.[name]) {

        /**
         * Cursor - Tag Specification
         *
         * @template T
         * @type {Spec<Specs.ITag>}
         */
        Cursor = Ref.tags[name]
        Type = TokenTags[Cursor?.type]

        return Cursor

      }

      if (Ref?.filters?.[name]) {

        /**
         * Cursor - Filter Specification
         *
         * @template T
         * @type {Spec<Specs.IFilter>}
         */
        Cursor = Ref.filters[name]

        if (Cursor?.arguments) {
          track = 0
          inFilter = true
          filterName = name
        }
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
      track = 0
      inFilter = false

      if (hard) {
        const props = Object.getOwnPropertyNames(Ref)
        const size = props.length
        for (let i = 0; i < size; i++) delete Ref[props[i]]
      }

    }
  }

}())
