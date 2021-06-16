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
 * Cursor (currently active tag in parse)
 */
export let cursor: IFilter | ITag | IObject;

/**
 * Specification Type
 */
export let type: NodeType;

/**
 * Variation
 */
export let variation: Variation;

/* -------------------------------------------- */
/* TAG CONTROLLER                               */
/* -------------------------------------------- */

export const tag = (

  (_state: number) => ({
    /**
     * Returns a boolean indicating if the tag has
     * arguments defined on its spec. Arguments exist as
     * an array type and thus if `false` or `undefined` is
     * returned no arguments exists for the tag.
     */
    get arguments (): boolean {

      return isArray((cursor as ITag).arguments);
    },

    /**
     * Returns a boolean indicating if the tag is within scope.
     * The scope `name` must be passed as parameter which can
     * be obtained at the `parse` level by querying the `parent`
     * node of the tag.
     */
    Scope: (name: string): boolean => {

      return new RegExp(`\\b(?:${cursor.scope})\\b`).test(name);
    }

  })

)(NaN);

/* -------------------------------------------- */
/* OBJECT CONTROLLER                            */
/* -------------------------------------------- */

export const object = (

  (state: number, token: IObject) => ({

    /**
     * Object position offset starter
     *
     * Used as the property reference identifier on
     * the AST node
     */
    get offset (): number { return state + 1; },

    /**
     * Object Type
     *
     * The return value of the object currently in stream
     */
    get type (): ObjectTypes { return token?.type; },

    /**
     * Object Type
     *
     * The return value of the object currently in stream
     */
    TypeOf (id: ObjectTypes): boolean {

      return token?.type === id;
    },

    /**
     * Exists
     *
     * Checks to see if property exists on this object
     */
    Exists (name: string): boolean {

      return typeof token?.properties?.[name] === 'object';
    },

    /**
     * Position Setter
     *
     * Sets the offset index starting position of the root
     * object name.
     *
     */
    Start (index: number): void {

      if (isNaN(state)) state = index;
    },

    /**
     * Object Cursor
     *
     * Resets the object cursor to last known property
     * reference.
     *
     */
    Cursor (name?: string): IObject {

      if (!token && !name) token = cursor as IObject;
      else token = token.properties[name] as IObject;
      return token;
    },

    /**
     * Resets the object spec state. This is called for
     * every object identifier we encounter.
     */
    Reset (): void {
      state = NaN;
      token = null;
    }

  })

)(NaN, null);

/* -------------------------------------------- */
/* FILTER CONTROLLER                            */
/* -------------------------------------------- */

export const filter = (

  (state: number, token: string) => ({
    /**
     * Returns the filter arguments specification. It
     * returns the current argument in the list.
     */
    get spec (): FilterArguments {

      return (cursor as IFilter).arguments[state];
    },

    /**
     * Returns a boolean indicating whether the or not the filter
     * has arguments.
     */
    get arguments (): boolean {

      return has(cursor as IFilter, 'arguments');
    },

    /**
     * Returns a boolean indicating whether we are currently
     * scanning a filter attribute/argument.
     */
    get within (): boolean {

      return state >= 0;
    },

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
    get exists (): boolean {

      return has(cursor as IFilter, '$i');
    },

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
    Next (): void { state++; },

    /**
     * Checks if the argument accepts the type of value
     * passed, ensuring the argument is valid.
     */
    Type (id: FilterArgumentTypes): boolean {

      return (cursor as IFilter).arguments[state].type === id;
    },

    /**
     * Checks if the argument accepts the type of value
     * passed, ensuring the argument is valid.
     */
    Accept: (id: FilterAcceptsTypes): boolean => {

      return new RegExp(
        `\\b(?:${(cursor as IFilter).arguments[state].accepts})\\b`
      ).test(id);

    },

    /**
     * Validates argument values against provided options
     * on the filter specification. Returns `true` if
     * no validate option or options exist else it will
     * return the boolean result from some.
     */
    Validate (token: string) {

      return ((cursor as IFilter).arguments[state].validate && has(
        (cursor as IFilter).arguments[state],
        'options'
      ) ? (cursor as IFilter).arguments[state].options.some(
          (
            { name }
          ) => isArray(name) ? name.some(
            $name => $name === token
          ) : token === name
        ) : true
      );

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
     */
    Cursor (name?: string): IFilter {

      if (isNaN(state)) state = 0;
      if (name) {
        token = name;
        return cursor as IFilter;
      }

      cursor = variation.filters[token] as IFilter;
      return cursor;
    },

    /**
     * Resets the filter state object. This is called for
     * every new filter identifier we encounter.
     */
    Reset (): void {
      state = NaN;
      token = null;
    }

  })

)(NaN, null);

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Set Specification
 *
 * Sets the variation specification. Called upon
 * initialization before parsing begins, the engine
 * must be passed and the license.
 */
export const Engine = (engine: IEngine, license: string): void => {

  variation = specs(
    {
      variation: engine,
      license
    }
  );

};

/**
 * Preset Method
 *
 * Presets token tag type and prepares the cursor
 * for fast reference of specification.
 */
export const TypePreset = (code: NodeType): void => { type = code; };

/**
 * Engine
 *
 * Checks current specification engine, used to
 * inform upon what actions should be taken as different
 * specs adhere to different methods.
 */
export const TypeOfEngine = (id: IEngine): boolean => {

  return new RegExp(`\\b(?:${id})\\b`).test(variation.engine);
};

/**
 * Typeof
 *
 * Checks to see if the current token tag type is
 * equal to the enum value passed in.
 */
export const TypeOfNode = (tokenType: NodeType): boolean => {

  return tokenType === type;
};

/**
 * Cursor
 *
 * Cursor represents an in-stream specification.
 * The cursor is changed each time a new tag with
 * a reference specification is encountered it will
 * be made available on private `cursor` prop.
 */
export const Cursor = (name?: string): boolean => {

  if (!variation || !name) return false;

  if (variation?.tags?.[name]) {
    cursor = variation.tags[name] as ITag;
    type = NodeType[cursor.type || 'unknown'];

    // Activate tag navigator, only when we have
    // arguments, if the tag arguments returns `undefined`
    // we do not need to walk the spec.
    if (cursor?.arguments) filter.Cursor(name);
    return true;
  }

  if (variation?.filters?.[name]) {
    cursor = variation.filters[name] as IFilter;

    // Activate filter navigator, only when we have
    // arguments, else we are dealing with a singluar
    // type filter, eg: {{ tag | upcase }} and we do
    // not need to walk the spec.
    if (cursor?.arguments) filter.Cursor(name);
    return true;
  }

  // Liquid Standard has no known objects in its specification
  // we will prevent any walks occuring.
  if (variation.engine !== 'standard' && variation?.objects?.[name]) {

    cursor = variation.objects[name] as IObject;
    type = NodeType.object;
    filter.Cursor();

    return true;
  }

  cursor = undefined;
  type = undefined;

  return false;
};

/**
 * Reset Specifications
 *
 * Resets the specification stream. This is generally
 * called upon each tokenization.
 *
 * @param {boolean} [hard=false]
 * Removes the specification variation references
 */
export const Reset = (hard: boolean = false): void => {
  cursor = undefined;
  type = undefined;

  filter.Reset();

  if (hard) {
    const props = Object.getOwnPropertyNames(variation);
    const size = props.length;
    for (let i = 0; i < size; i++) delete variation[props[i]];
  }
};
