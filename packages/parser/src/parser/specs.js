import { NodeType } from 'lexical/types'
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
   * Object Name
   *
   * @type {object}
   */
  let object

  /**
   * Specification Type
   *
   * @type {Parser.NodeType}
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
    ref: (engine, license) => { variation = specs({ variation: engine, license }) },

    /**
     * Set Associated Tags
     *
     * Sets custom specs for associated tags
     *
     */
    associates: (

      /**
       * Object State Name reference
       *
       * @param {number} offset
       */
      state => ({

        /**
         * Tag identifier Matches
         *
         * @returns {RegExp}
         */
        get regex () { return state.match },

        /**
         * Object Type
         *
         * The return value of the object currently in stream
         *
         */
        get tags () { return state.tags },

        /**
         * Match Tags
         */
        match: (tagName, attributes) => {

          const i1 = state.tags.findIndex(({
            name,
            attr
          }) => (tagName === name && attr && attributes.some(a => new RegExp(attr).test(a))))

          if (i1 >= 0) return state.tags[i1].language

          const i2 = state.tags.findIndex(({ name, attr }) => (tagName === name && !attr))

          if (i2 >= 0) return state.tags[i2].language

          return false

        },

        /**
         * Object Cursor
         *
         * Resets the object cursor to last known property
         * reference.
         */
        setup: (tags) => {

          if (Array.isArray(state.match)) {
            while (state.match.length > 0) state.match.pop()
          }

          if (Array.isArray(state.tags)) {
            while (state.tags.length > 0) state.tags.pop()
          }

          state.tags = tags

          let index = 0
          while (tags.length > index) {
            if (state.match === null) state.match = []
            if (!state.match.includes(tags[index].name)) state.match.push(tags[index].name)
            index++
          }

          if (Array.isArray(state.match)) {
            state.match = new RegExp(`\\b(?:${state.match.join('|')})\\b`)
          }

        }

      })

    )({
      tags: null,
      match: null
    }),

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
     * @param {Parser.NodeType} type
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
     * @param {NodeType} [tag]
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
       * @param {number} offset
       */
      offset => ({

        /**
         * Object position offset starter
         *
         * Used as the property reference identifier on
         * the AST node
         *
         * @returns {number}
         */
        get offset () { return offset + 1 },

        /**
         * Object Type
         *
         * The return value of the object currently in stream
         *
         * @returns {Specs.ObjectTypes}
         */
        get type () { return object?.type },

        /**
         * Object Type
         *
         * The return value of the object currently in stream
         *
         * @param {Specs.ObjectTypes} id
         * @returns {boolean}
         */
        typeof: id => object?.type === id,

        /**
         * Exists
         *
         * Checks to see if property exists on this object
         *
         * @param {string} name
         * The property name to check
         *
         * @returns {boolean}
         */
        exists: name => typeof object?.properties?.[name] === 'object',

        /**
         * Position Setter
         *
         * Sets the offset index starting position of the root
         * object name.
         *
         * @param {number} index
         * @returns {void}
         */
        at: index => { if (isNaN(offset)) offset = index },

        /**
         * Object Cursor
         *
         * Resets the object cursor to last known property
         * reference.
         *
         * @returns {Specs.IObject}
         */
        cursor: (name = undefined) => {

          if (!object && !name) object = cursor
          else object = object.properties[name]

          return object

        },

        /**
         * Resets the object spec state. This is called for
         * every object identifier we encounter.
         *
         * @returns {void}
         */
        reset: () => {
          offset = NaN
          object = null
        }

      })

    )(NaN),

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
        type = NodeType[cursor.type || 'unknown']

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
        type = NodeType.object

        this.object.cursor()

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
     * Tag Controller
     *
     */
    tag: (

      /**
       * Filter State Argument
       *
       * @param {number} state
       */
      state => ({

        /**
         * Returns a boolean indicating if the tag is within scope
         *
         * @readonly
         * @returns {boolean}
         */
        scope: name => new RegExp(`\\b(?:${cursor.scope})\\b`).test(name)

      })

    )(NaN),

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
        accept: (id) => new RegExp(`\\b(?:${cursor.arguments[state].accepts})\\b`).test(id),

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
