import has from 'lodash/has';
import isArray from 'lodash/isArray';
import { NodeType } from 'lexical/types';
import specs, {
  IEngine,
  ObjectTypes,
  IFilter,
  FilterArguments,
  FilterArgumentTypes,
  FilterAcceptsTypes,
  IObject,
  ITag,
  Variation
} from '@liquify/liquid-language-specs';

/**
 * Specs
 *
 * Controller for specifications, provides methods for
 * interacting with Variation Specifications.
 */
export const Specs = (() => {
  /**
   * Cursor (currently active tag in parse)
   */
  let cursor: IFilter | ITag | IObject;

  /**
   * Variation
   */
  let variation: Variation;

  /**
   * Filter Name
   */
  let filter: string;

  /**
   * Object Name
   */
  let object: IObject;

  /**
   * Specification Type
   */
  let type: NodeType;

  /* -------------------------------------------- */
  /* METHODS                                      */
  /* -------------------------------------------- */

  return {
    /**
     * Set Specification
     *
     * Sets the variation specification. Called upon
     * initialization before parsing begins, the engine
     * must be passed and the license.
     */
    ref: (engine: IEngine, license: string) => {
      variation = specs({ variation: engine, license });
    },

    /**
     * Get Variation (Active)
     *
     * Returns the full in stream specification variation
     * reference according to defined engine
     */
    get variation (): Variation { return variation; },

    /**
     * Get Token Tag Type
     *
     * Returns in stream specification type enum value.
     * This is assigned within the scanner.
     */
    get type (): NodeType { return type; },

    /**
     * Preset Method
     *
     * Presets token tag type and prepares the cursor
     * for fast reference of specification.
     */
    set type (code: NodeType) { type = code; },

    /**
     * Get Spec (in-stream)
     *
     * Returns the current in stream specification record.
     * This can be either and object, tag or filter. The
     */
    get get (): IFilter | ITag | IObject { return cursor; },

    /**
     * Spec Exists (in-stream)
     *
     * Checks to see if a specification reference exists
     * for the token that has entered the stream. If the cursor
     * is `undefined` we do not know about the token.
     */
    get exists (): boolean { return cursor !== undefined; },

    /**
     * Engine
     *
     * Checks current specification engine, used to
     * inform upon what actions should be taken as different
     * specs adhere to different methods.
     */
    engine: (id: IEngine): boolean => new RegExp(`\\b(?:${id})\\b`).test(variation.engine),

    /**
     * Typeof
     *
     * Checks to see if the current token tag type is
     * equal to the enum value passed in.
     */
    typeof: (tokenType: NodeType): boolean => tokenType === type,

    /**
     * Cursor
     *
     * Cursor represents an in-stream specification.
     * The cursor is changed each time a new tag with
     * a reference specification is encountered it will
     * be made available on private `cursor` prop.
     *
     */
    cursor (name?: string): boolean {

      if (!variation || !name) return false;

      if (variation?.tags?.[name]) {
        cursor = variation.tags[name] as ITag;
        type = NodeType[cursor.type || 'unknown'];

        // Activate tag navigator, only when we have
        // arguments, if the tag arguments returns `undefined`
        // we do not need to walk the spec.
        if (cursor?.arguments) this.filter.cursor(name);
        return true;
      }

      if (variation?.filters?.[name]) {
        cursor = variation.filters[name] as IFilter;

        // Activate filter navigator, only when we have
        // arguments, else we are dealing with a singluar
        // type filter, eg: {{ tag | upcase }} and we do
        // not need to walk the spec.
        if (cursor?.arguments) this.filter.cursor(name);
        return true;
      }

      // Liquid Standard has no known objects in its specification
      // we will prevent any walks occuring.
      if (variation.engine !== 'standard' && variation?.objects?.[name]) {
        cursor = variation.objects[name] as IObject;
        type = NodeType.object;
        this.object.cursor();
        return true;
      }

      cursor = undefined;
      type = undefined;

      return false;
    },

    /**
     * Reset Specifications
     *
     * Resets the specification stream. This is generally
     * called upon each tokenization.
     *
     * @param {boolean} [hard=false]
     * Removes the specification variation references
     */
    reset (hard: boolean = false): void {
      cursor = undefined;
      type = undefined;

      this.filter.reset();

      if (hard) {
        const props = Object.getOwnPropertyNames(variation);
        const size = props.length;
        for (let i = 0; i < size; i++) delete variation[props[i]];
      }
    },

    /* -------------------------------------------- */
    /* TAG                                          */
    /*                                              */
    /* Actions executed on a tag specification.     */
    /* These methods help us navigate an tag spec   */
    /* reference.                                   */
    /*                                              */
    /* -------------------------------------------- */

    tag: (

      (state: number) => ({
        /**
         * Returns a boolean indicating if the tag has
         * arguments defined on its spec. Arguments exist as
         * an array type and thus if `false` or `undefined` is
         * returned no arguments exists for the tag.
         */
        get arguments (): boolean { return isArray((cursor as ITag).arguments); },

        /**
         * Returns a boolean indicating if the tag is within scope.
         * The scope `name` must be passed as parameter which can
         * be obtained at the `parse` level by querying the `parent`
         * node of the tag.
         */
        scope: (name: string): boolean => new RegExp(`\\b(?:${cursor.scope})\\b`).test(name),

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
         */
        cursor: (name?: string): IFilter => {

          if (isNaN(state)) state = 0;
          if (name) {
            filter = name;
            return cursor as IFilter;
          }

          cursor = variation.filters[filter] as IFilter;
          return cursor;
        }
      })
    )(NaN),

    /* -------------------------------------------- */
    /* OBJECT                                       */
    /*                                              */
    /* Actions executed on an object specification  */
    /* These methods help us navigate a object      */
    /* spec reference.                              */
    /*                                              */
    /* -------------------------------------------- */

    object: (

      (offset: number) => ({

        /**
         * Object position offset starter
         *
         * Used as the property reference identifier on
         * the AST node
         */
        get offset (): number { return offset + 1; },

        /**
         * Object Type
         *
         * The return value of the object currently in stream
         */
        get type (): ObjectTypes { return object?.type; },

        /**
         * Object Type
         *
         * The return value of the object currently in stream
         */
        typeof: (id: ObjectTypes): boolean => object?.type === id,

        /**
         * Exists
         *
         * Checks to see if property exists on this object
         */
        exists: (name: string): boolean => typeof object?.properties?.[name] === 'object',

        /**
         * Position Setter
         *
         * Sets the offset index starting position of the root
         * object name.
         *
         */
        at: (index: number): void => { if (isNaN(offset)) offset = index; },

        /**
         * Object Cursor
         *
         * Resets the object cursor to last known property
         * reference.
         *
         */
        cursor: (name?: string): IObject => {
          if (!object && !name) object = cursor as IObject;
          else object = object.properties[name] as IObject;
          return object;
        },

        /**
         * Resets the object spec state. This is called for
         * every object identifier we encounter.
         */
        reset: (): void => {
          offset = NaN;
          object = null;
        }
      })

    )(NaN),

    /* -------------------------------------------- */
    /* FILTER                                       */
    /*                                              */
    /* Actions executed on a filter specification.  */
    /* These methods help us navigate a filter spec */
    /* and its arguments.                           */
    /*                                              */
    /* -------------------------------------------- */

    filter: (
      (state: number) => ({
        /**
         * Returns the filter arguments specification. It
         * returns the current argument in the list.
         */
        get spec (): FilterArguments { return (cursor as IFilter).arguments[state]; },

        /**
         * Returns a boolean indicating whether the or not the filter
         * has arguments.
         */
        get arguments (): boolean { return has(cursor as IFilter, 'arguments'); },

        /**
         * Returns a boolean indicating whether we are currently
         * scanning a filter attribute/argument.
         */
        get within (): boolean { return state >= 0; },

        /**
         * Returns a boolean indicating whether or not the argument
         * at the current position is required.
         */
        get required (): boolean {

          return has(cursor as IFilter, 'arguments')
            ? (cursor as IFilter).arguments[state]?.required
            : false;

        },

        /**
         * Returns a boolean indicating filter cursor arguments
         * exists on the spec. Used to validate after variable.
         *
         * @readonly
         * @returns {boolean}
         */
        get exists (): boolean { return has(cursor as IFilter, '$i'); },

        /**
         * Returns a boolean indicating if this is the last argument
         * available to the filter, according to its specification.
         */
        get last (): boolean {

          if (has(cursor as IFilter, '$i.argsize')) {

            return has(cursor as IFilter, '$i.argsize')
              ? (cursor as IFilter).$i.argsize === state
              : false;
          };

        },

        /**
         * Moves to the next argument on a filter. Returns a
         * boolean to indicate when we have reached the last
         * argument in the filter spec.
         */
        next (): void { state++; },

        /**
         * Checks if the argument accepts the type of value
         * passed, ensuring the argument is valid.
         */
        type: (id: FilterArgumentTypes): boolean => (
          (cursor as IFilter).arguments[state].type === id
        ),

        /**
         * Checks if the argument accepts the type of value
         * passed, ensuring the argument is valid.
         */
        accept: (id: FilterAcceptsTypes): boolean =>
          new RegExp(
          `\\b(?:${(cursor as IFilter).arguments[state].accepts})\\b`
          ).test(id),

        /**
         * Validates argument values against provided options
         * on the filter specification. Returns `true` if
         * no validate option or options exist else it will
         * return the boolean result from some.
         */
        validate: (token: string) => ((cursor as IFilter).arguments[state].validate && has(
          (cursor as IFilter).arguments[state],
          'options'
        ) ? (cursor as IFilter).arguments[state].options.some(
            (
              { name }
            ) => isArray(name) ? name.some(
              $name => $name === token
            ) : token === name
          ) : true
        ),

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
         */
        cursor: (name?: string): IFilter => {
          if (isNaN(state)) state = 0;

          if (name) {
            filter = name;
            return cursor as IFilter;
          }

          cursor = variation.filters[filter] as IFilter;
          return cursor;
        },

        /**
       * Resets the filter state object. This is called for
       * every new filter identifier we encounter.
       */
        reset: (): void => {
          state = NaN;
          filter = null;
        }
      })

    )(NaN),

    /* -------------------------------------------- */
    /* TAG ASSOCIATES                               */
    /*                                              */
    /* Actions executed on a filter specification.  */
    /* These methods help us navigate a filter spec */
    /* and its arguments.                           */
    /*                                              */
    /* -------------------------------------------- */

    associates: (
      (
        state: {
          tags: Parser.AssociateTags[];
          match: string[];
        }
      ) => ({

        /**
         * Match Tags
         */
        match: (tagName: string, attributes: string[]): string | false => {

          const i1 = state.tags.findIndex(
            ({ name, attr }) =>
              tagName === name &&
            attr &&
            attributes.some((a) => new RegExp(attr).test(a))
          );

          if (i1 >= 0) return state.tags[i1].language;

          const i2 = state.tags.findIndex(
            ({ name, attr }) => tagName === name && !attr
          );

          if (i2 >= 0) return state.tags[i2].language;

          return false;
        },

        /**
         * Object Cursor
         *
         * Resets the object cursor to last known property
         * reference.
         */
        setup: (tags: Parser.AssociateTags[]) => {
          if (Array.isArray(state.match)) {
            while (state.match.length > 0) state.match.pop();
          }

          if (Array.isArray(state.tags)) {
            while (state.tags.length > 0) state.tags.pop();
          }

          state.tags = tags;

          let index = 0;
          while (tags.length > index) {
            if (state.match === null) state.match = [];
            if (!state.match.includes(tags[index].name)) { state.match.push(tags[index].name); }
            index++;
          }

          if (Array.isArray(state.match)) {
          // state.match = new RegExp(`\\b(?:${state.match.join("|")})\\b`);
          }
        }
      })

    )(
      {
        tags: null,
        match: null
      }
    )
  };

})();
