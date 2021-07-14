import * as Specification from '../data/export';
import { IEngine, Variation, Values, IArgument, ITemplates } from '../types/common';
import { ITag } from '../types/tags';
import { IFilter } from '../types/filters';
import { IObject } from '../types/objects';
import { Type } from '../types/types';
import { isNumber, inPattern, inValues } from './utils';

/**
 * Within Enums
 */
export const enum QueryErrors {
  ParameterNotUnique = 1,
  ParameterUnknown
}

/**
 * Within Enums
 */
export const enum Within {
  Tag = 1,
  Filter,
  Arguments,
  Parameter,
  ParameterValue,
}

/* -------------------------------------------- */
/* EXPORT                                       */
/* -------------------------------------------- */

/**
 * The current variation engine name
 */
export let engine: IEngine = IEngine.standard;

/**
 * Tag Specification
 */
export let tag: ITag;

/**
 * Filter Specification
 */
export let filter: IFilter;

/**
 * Object Specification
 */
export let object: IObject;

/**
 * Reference to the current arugment or parameter.
 */
export let argument: IArgument.Argument | IArgument.Parameter;

/* -------------------------------------------- */
/* LOCAL                                        */
/* -------------------------------------------- */

/**
 * Cursor represents either a filter or tag specification
 */
let cursor: ITag | IFilter;

/**
 * The current template (document) name
 */
let template: ITemplates;

/**
 * The current variation specification
 */
let variation: Variation = Specification.standard;

/**
 * The current argument index being walked
 */
let index: number = NaN;

/**
 * The current action and whereabouts of the query
 */
let within: Within;

/**
 * Query Errors
 */
let error: QueryErrors;

/**
 * The previous arguments value
 */
let prev: string;

/**
 * The current active parameters supplied
 */
const unique: Set<string> = new Set();

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Reset
 *
 * Resets all states. This si executed everytime we
 * encounter a new tag.
 */
export function Reset (): void {

  tag = undefined;
  object = undefined;
  filter = undefined;
  argument = undefined;
  error = undefined;

  prev = undefined;
  index = 0;

  unique.clear();
}

/* -------------------------------------------- */
/* GETTERS                                      */
/* -------------------------------------------- */

/**
 * Get Variation
 *
 * Returns the Liquid variation we are currently
 * querying. This is simply an export function which
 * returns localised state.
 */
export function GetVariation (): Variation {

  return variation;
};

/**
 * Get Argument
 *
 * Walks over _optional_ arugments contained on a tag
 * or filter until a `type` match is detected. If an
 * argument is `required` walk is cancelled.
 */
export function GetArgument (type: Type): boolean {

  const start: number = index;
  const limit = cursor.arguments.length - 1;

  while ((argument.type !== type && argument?.required !== true)) {
    argument = cursor.arguments[index];
    if (index !== limit) index++; else break;
  }

  if (argument.type === type) return true;

  index = start;
  argument = cursor.arguments[start];
  return false;

};

/* -------------------------------------------- */
/* SETTERS                                      */
/* -------------------------------------------- */

/**
 * Is Parameter
 *
 * Queries the current argument for a `parameter` type. When
 * an argument does not have a `parameter` type, it attempts
 * to find a parameter argument via the `GetArgument` function.
 *
 * The function will return a boolean value to inform upon a
 * successful or unsuccessful match.
 *
 * ---
 *
 * **GET ARGUMENT**
 *
 * If an argument does equal type `parameter` it will attempt
 * to match the parameter passed value to a property listed
 * on the arguments `value` and if successful, the state reference
 * `argument` variable is updated and points to the parameter.
 *
 * ---
 *
 * **VALUE AS TYPE**
 *
 * If a parameters `value` points a _enum_  (number) the state
 * reference `argument` will remain pointing to the argument at index
 * and a boolean `true` will be returned.
 */
export function isParameter (value: string) {

  if (argument === undefined) return false;
  if (argument.type !== Type.parameter && !GetArgument(Type.parameter)) {
    return false;
  }

  if (isNumber(argument.value)) return true;

  const param = argument.value?.[value];

  if (!param) {
    error = QueryErrors.ParameterUnknown;
    return false;
  }

  const uniq = param?.unique;
  if ((uniq === undefined || uniq === true) && unique.has(value)) {
    error = QueryErrors.ParameterNotUnique;
  }

  unique.add(value);

  argument = param;
  within = Within.ParameterValue;

  return true;
}

/**
 * Is Value
 *
 * Validates an a argument value. This function will run
 * several typeof checks to fingure out how a value should
 * be validated, starting with patterns and working its way
 * down to a specs `value` entries.
 */
export function isValue (value: string): boolean {

  // console.log('inValue', index, value, argument);

  if ((isType(Type.any) || !argument?.value)) return true;

  const prop = prev || value;
  const param: IArgument.Argument = argument as IArgument.Argument;

  if (!(param.pattern instanceof RegExp ? (
    inPattern(param.pattern as RegExp, value)
  ) : typeof param.pattern === 'object' ? (
    inPattern(param.pattern?.[prop], value)
  ) : Array.isArray(param.pattern) ? (
    value >= param.pattern[0] && value <= param.pattern[1]
  ) : (
    param.value === value ||
    !!param.value?.[prop] ||
    inValues(param.value as Values[], value)
  )) && (
    param.strict === undefined || param.strict === true
  )) return false;

  if (within === Within.Arguments) prev = value;

  return true;

};

/**
 * Set Template
 *
 * Sets the local `template` state reference vairable.
 * This is called for every new document we encounter.
 */
export function SetTemplate (name: ITemplates): void {

  if (template !== name) template = name;

};

/**
 * Set Engine
 *
 * Sets the Liquid `variation` and `engine` variable.
 * This will change what specification we reference.
 */
export function SetEngine (name: IEngine): void {

  if (variation.engine !== name) {
    variation = Specification[name] as Variation;
    engine = name;
  }

};

/**
 * Set Tag
 *
 * Finds a tag matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched tag.
 */
export function SetTag (name: string): boolean {

  Reset();

  if (!variation.tags?.[name]) return false;

  cursor = tag = variation.tags[name];
  argument = cursor?.arguments?.[0] as IArgument.Argument;
  within = Within.Arguments;

  return true;
}

/**
 * Set Filter
 *
 * Finds a filter matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched filter.
 */
export function SetFilter (name: string): boolean {

  if (!variation.filters?.[name]) return false;

  cursor = filter = variation.filters[name];
  argument = cursor?.arguments?.[0] as IArgument.Argument;
  within = Within.Arguments;
  index = 0;

  unique.clear();

  return true;
};

/**
 * Set Object
 *
 * Finds a matching object specification. Objects can be
 * contained in tags and filter, so the `cursor` is not
 * modified, instead the `object` state variable is updated.
 */
export function SetObject (name: string): boolean {

  if (!variation.objects?.[name]) return false;

  object = variation.objects[name];

  return true;
};

/* -------------------------------------------- */
/* NAVIGATORS                                   */
/* -------------------------------------------- */

/**
 * Previous Argument
 *
 * Moves the arugment back a position. If we are currently
 * walking the index `2` (argument 3) calling this will
 * move the arugment reference states to index `1`.
 */
export function PrevArgument (): boolean {

  if (isNaN(index) || index === 0) return false;

  index--;
  within = Within.Arguments;
  argument = cursor.arguments[index];

  if (argument.type === Type.parameter && unique.has(prev)) {
    unique.delete(prev);
  }

  return true;
};

/**
 * Next Argument
 *
 * Moves to the _next_ argument (if available) and updates the
 * reference state variables. Returns a `boolean` which
 * indicates if we have reached the last argument or not.
 */
export function NextArgument (): boolean {

  if (index === cursor.arguments.length - 1) return false;

  index++;
  within = Within.Arguments;
  argument = cursor.arguments[index];

  return true;
};

/**
 * Next Parameter
 *
 * Despite its name, this function will reset the `argument`
 * state reference to its index starting point. When we
 * encounter a `parameter` type, the `argument` variable is
 * moved to its property value. This function reverts that.
 */
export function NextParameter (): boolean {

  if (isWithin(Within.ParameterValue)) {
    argument = cursor.arguments[index];
    within = Within.Parameter;
    return true;
  }

  return false;
};

/* -------------------------------------------- */
/* VALIDATORS                                   */
/* -------------------------------------------- */

/**
 * Is Property
 *
 * Queries the current object for a property value
 * matching the parameter `value`provided. The object state
 * reference will update and point to the property
 * value when a match occurs.
 */
export function isProperty (value: string): boolean {

  const prop = object?.properties?.[value];

  if (!prop) return false;

  object = prop;

  return true;
}

/**
 * Is Error
 *
 * Conditional checks the local error state reference
 * with the provided Query error enum.
 */
export function isError (value: QueryErrors) {

  return error === value;

}

/**
 * Is Template
 *
 * Validate the current template name against the local state
 * `template` reference variable This is a sugar shortcut
 * function called when parsing.
 */
export function isTemplate (name: ITemplates): boolean {

  return template === name;
}

/**
 * Is Object Type
 *
 * Validate the current object reference `type` value.
 * The object being validate will be type matched against
 * the most recent object applied at `SetObject()` or via
 * `isProperty()` function.
 */
export function isObjectType (type: Type): boolean {

  return object?.type === type;
}

/**
 * Is Tag Type
 *
 * Validate a current tag `type` value. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export function isTagType (type: Type): boolean {

  return tag?.type === type;
}

/**
 * Is Type
 *
 * Validate the current argument `type` value. It will match
 * an argument/parameter value type. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export function isType (type: Type): boolean {

  return argument?.type === type;
}

/**
 * Is Within
 *
 * Used to validate the whereabouts of the current tag or filter
 * argument query engine position.
 */
export function isWithin (value: Within): boolean {

  return within === value;

}

/**
 * Is Required
 *
 * Checks the requirement for arguments, argument parameters or
 * parameter values. When a parameter has a `keyword` type, then
 * this returns `true`.
 */
export function isRequired () {

  return (
    Within.Parameter && isType(Type.keyword)
  ) || (
    argument?.required === true
  );
}

/**
 * Is Optional
 *
 * Checks the requirement for every argument. If an arguments
 *  `required` value returns `true` then a boolean `false` will
 * be returned indicating that arguments are not optional and at
 * least 1 value is required. The function accepts a starting index,
 * default to the current argument index location.
 *
 * Some tag/filter arguments might all be optional, whereas some
 * might contain an optional starting arguments, but require arguments
 * proceeding that.
 */
export function isOptional (from: number = index) {

  let size: number = cursor.arguments.length - from - 1;

  if (size === 0 || from === size) return true;
  while (from < size && !cursor.arguments[from]?.required) from++;

  return from === size;

}
