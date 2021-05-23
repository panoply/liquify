import { TokenTags } from 'enums/tags'
import { Engines } from 'parser/options'
import specs from '@liquify/liquid-language-specs'

/**
 * Specs
 *
 * Controller for specifications, provides methods for
 * interacting with Variation Specifications.
 */
export default (function Specs () {

  /* -------------------------------------------- */
  /* STATES                                       */
  /* -------------------------------------------- */

  /**
   * Cursor (currently active tag in parse)
   *
   * @template T
   * @typedef {Parser.Cursor} Spec
   */
  let cursor

  /**
   * Variation
   *
   * @type {Specs.Variation}
   */
  let variation

  /**
   * Filter Name
   *
   * @type {string}
   */
  let filter

  /**
   * Specification Type
   *
   * @type {Parser.TokenTags}
   */
  let type

  /* -------------------------------------------- */
  /* METHODS                                      */
  /* -------------------------------------------- */

  return {

    /**
     * Set Specification Reference
     *
     * Sets the variation specification. Called upon
     * initialization before parsing begins.
     *
     * @param {Specs.Engine} engine
     * @param {string} license
     */
    ref: (engine, license) => {

      variation = specs({ variation: engine, license })

    },

    /**
     * Get Active Variation
     *
     * @readonly
     * @returns {Specs.Variation}
     */
    get variation () { return variation },

    /**
     * Get Token Tag Type
     *
     * @readonly
     * @returns {number}
     */
    get type () { return type },

    /**
     * Get Current Specification in stream
     *
     * @readonly
     * @return {Specs.IFilter & Specs.IObject & Specs.ITag}
     */
    get get () { return cursor },

    /**
     * Check to see if the tag has a specification
     *
     * @readonly
     * @returns {boolean}
     */
    get exists () { return cursor !== undefined },

    /**
     * Preset Method
     *
     * Presets token tag type and prepares the cursor
     * for fast reference of specification.
     *
     * @param {Parser.TokenTags} type
     * @returns {void}
     */
    set type (code) { type = code },

    /**
     * Engine
     *
     * Checks current specification engine
     *
     * @param {string}
     * Either a pipe separated list or string
     *
     * @returns {boolean}
     */
    engine: id => new RegExp(`\\b(?:${id})\\b`).test(variation.engine),

    /**
     * Typeof
     *
     * Checks to see if the current token tag type is
     * equal to the enum value passed in.
     *
     * @param {TokenTags} [tag]
     * Removes the specification variation references
     *
     */
    typeof: tag => tag === type,

    /**
     * Object Navigator
     *
     * When parsing object this function provides
     * methods to interact with the specification.
     */
    object: (

      /**
       * Object State Name reference
       *
       * @param {string} state
       */
      state => ({

        /**
         * Exists
         *
         * Checks to see if token is a known object
         * within the specification.
         *
         * @param {string} name
         * Either a pipe separated list or string
         *
         * @returns {boolean}
         */
        exists: name => typeof variation?.objects?.[name] === 'object'

      })

    )(''),

    /**
     * Cursor
     *
     * Cursor represents an in-stream specification.
     * The cursor is changed each time a new tag with
     * a reference specification is encountered it will
     * be made available on private `cursor` prop.
     *
     * @param {string} [tag=undefined]
     * @returns {boolean}
     */
    cursor (name = undefined) {

      if (!variation || !name) return false

      if (variation?.tags?.[name]) {

        /**
         * Cursor - Tag Specification
         *
         * @template T
         * @type {Spec<Specs.ITag>}
         */
        cursor = variation.tags[name]
        type = TokenTags[cursor.type || 'unknown']

        return true

      }

      if (variation?.filters?.[name]) {

        /**
         * cursor - Filter Specification
         *
         * @template T
         * @type {Spec<Specs.IFilter>}
         */
        cursor = variation.filters[name]

        if (cursor?.arguments) this.filter.cursor(name)

        return true

      }

      if (variation.engine !== Engines.Standard && variation?.objects?.[name]) {

        /**
         * Cursor - Object Specification
         *
         * @template T
         * @type {Spec<Specs.IObject>}
         */
        cursor = variation.objects[name]
        type = TokenTags.object

        return true

      }

      cursor = undefined
      type = undefined

      return false

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

      cursor = undefined
      type = undefined

      this.filter.reset()

      if (hard) {
        const props = Object.getOwnPropertyNames(variation)
        const size = props.length
        for (let i = 0; i < size; i++) delete variation[props[i]]
      }

    },

    /**
     * Argument Navigator
     *
     * When parsing filter arguments this getter closure
     * provides use methods to work the filter specification
     * while scanning tokens and characters.
     */
    filter: (

      /**
       * Filter State Argument
       *
       * @param {number} state
       */
      state => ({

        /**
         * Returns the filter arguments specification. It
         * returns the current argument in the list.
         *
         * @readonly
         * @returns {Specs.FilterArguments}
         */
        get spec () { return cursor.arguments[state] },

        /**
         * Returns a boolean indicating whether the or not the filter
         * has arguments.
         *
         * @readonly
         * @returns {boolean}
         */
        get arguments () { return cursor?.arguments },

        /**
         * Returns a boolean indicating whether we are currently
         * scanning a filter attribute/argument.
         *
         * @readonly
         * @returns {boolean}
         */
        get within () { return state >= 0 },

        /**
         * Returns a boolean indicating whether or not the argument
         * at the current position is required.
         *
         * @readonly
         * @returns {boolean}
         */
        get required () { return cursor.arguments[state]?.required },

        /**
         * Returns a boolean indicating filter cursor arguments
         * exists on the spec. Used to validate after variable.
         *
         * @readonly
         * @returns {boolean}
         */
        get exists () { return cursor?.$i },

        /**
         * Returns a boolean indicating if this is the last argument
         * available to the filter, according to its specification.
         *
         * @readonly
         * @returns {boolean}
         */
        get last () { return cursor.$i.argsize === state },

        /**
         * Moves to the next argument on a filter. Returns a
         * boolean to indicate when we have reached the last
         * argument in the filter spec.
         *
         * @return {void}
         */
        next () { state++ },

        /**
         * Checks if the argument accepts the type of value
         * passed, ensuring the argument is valid.
         *
         * @param {Specs.FilterArgumentTypes} id
         * @returns {boolean}
         */
        type: id => cursor.arguments[state].type === id,

        /**
         * Checks if the argument accepts the type of value
         * passed, ensuring the argument is valid.
         *
         * @param {Specs.FilterAcceptsTypes} id
         * @returns {boolean}
         */
        accept: (id) => {

          return new RegExp(`\\b(?:${cursor.arguments[state].accepts})\\b`).test(id)

        },

        /**
         * Validates argument values against provided options
         * on the filter specification. Returns `true` if
         * no validate option or options exist else it will
         * return the boolean result from some.
         *
         * @param {boolean} accept
         * @returns {boolean}
         */
        validate: (token) => {

          return (
            cursor.arguments[state].validate &&
            cursor.arguments[state]?.options
          ) ? cursor.arguments[state].options.some(
              (
                { name }
              ) => (
                Array.isArray(name)
                  ? name.some($name => $name === token)
                  : token === name
              )
            ) : true
        },

        /**
         * Filter Cursor
         *
         * Resets the specification cursor to last known
         * filter reference. This function is used to reconnect
         * to a specification, generally occurring when we are
         * we move to different token scans (like object).
         *
         * **IMPORTANT**
         *
         * A couple of important notes on this:
         *
         * 1. When the state value is `NaN` (asserted in IIFE or
         * after a `filter.reset()` call) its value will change
         * to `0` to allow selection by index of arguments found
         * within the filters specification.
         *
         * 2. When a `name` parameter is passed, the `filter` let
         * variable will be re-assigned to the value passed as `name`,
         * this parameter is optional and is only used when we first
         * encounter a filter identifier via `spec.cursor()` method.
         * If a name variable is passed, cursor is not re-assigned.
         *
         * @param {string} [name=undefined]
         * @returns {Specs.IFilter}
         */
        cursor: (name = undefined) => {

          if (isNaN(state)) state = 0

          if (name) {
            filter = name
            cursor.argumentSize = cursor.arguments.length - 1
            return cursor
          }

          cursor = variation.filters[filter]
          return cursor

        },

        /**
         * Resets the filter state object. This is called for
         * every new filter identifier we encounter.
         *
         * @returns {void}
         */
        reset: () => {
          state = NaN
          filter = null
        }

      })

    )(NaN)

  }
}())
