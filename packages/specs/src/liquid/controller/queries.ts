import * as Specification from '../data/export';
import { IEngine, Variation, Values, IArgument, ITemplates } from '../types/common';
import { ITag } from '../types/tags';
import { IFilter } from '../types/filters';
import { IObject } from '../types/objects';
import { Type } from '../types/types';
import {
  isString,
  isObject,
  isUndefined,
  isArray,
  isNumber,
  isRegExp,
  inPattern,
  inValues
} from './utils';

/**
 * Resets
 */
export const enum Within {
  Tag = 1,
  Filter,
  Arguments,
  Parameter,
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
 * Tag Specification
 */
export let filter: IFilter;

/**
 * Object Specification
 */
export let object: IObject;

/**
 * The current argument
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
 * The current active parameters supplied
 */
let unique: Array<string> = [];

/**
 * The previous arguments value
 */
let prev: string;

/* -------------------------------------------- */
/* SETTER FUNCTIONS                             */
/* -------------------------------------------- */

// const { tag, filter, object, reset } = state;

export function Reset (): void {

  !cursor || (cursor = undefined);
  !tag || (tag = undefined);
  !object || (object = undefined);
  !filter || (filter = undefined);
  !argument || (argument = undefined);
  !prev || (prev = undefined);
  !isNaN(index) || (index = NaN);

  unique.length === 0 || (unique = []);

}

/**
 * Set variation engine
 */
export function GetVariation (): Variation {

  return variation;

};

/**
 * Set Template
 */
export function SetTemplate (name: ITemplates): void {

  if (template !== name) template = name;

};

/**
 * Set variation engine
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
 * Finds a tag specification and updates the cursor and state
 * when a match is successful. Returns a boolean which signals
 * a matched or unmatched tag.
 */
export function SetTag (name: string): boolean {

  Reset();

  if (!variation.tags?.[name]) return false;

  cursor = tag = variation.tags[name];
  argument = cursor.arguments?.[0] as IArgument.Argument;
  within = Within.Arguments;
  index = argument ? 0 : NaN;

  return true;

}

/**
 * Set Filter
 *
 * Finds a filter specification and updates the cursor and state
 * when a match is successful. Returns a boolean which signals
 * a matched or unmatched filter.
 */
export function SetFilter (name: string): boolean {

  if (!variation.filters?.[name]) return false;

  cursor = filter = variation.filters[name];
  argument = cursor?.arguments?.[0] as IArgument.Argument;
  within = Within.Arguments;
  index = argument ? 0 : NaN;
  unique.length === 0 || (unique = []);

  return true;

};

/**
 * Set Object
 *
 * Finds a object specification and updates the cursor and state
 * when a match is successful. Returns a boolean which signals
 * a matched or unmatched object.
 */
export function SetObject (name: string): boolean {

  // if (object.spec) reset(Resets.Object);
  if (!variation.objects?.[name]) return false;

  object = variation.objects[name];

  return true;

};

/**
 * Next Argument
 *
 * Moves to the _next_ argument (if available) on the current spec
 * in stream and update the states.
 */
export function PrevArgument (): boolean {

  if (isNaN(index) || index === 0) return false;

  index--;
  within = Within.Arguments;
  argument = cursor.arguments[index];

  if (unique.length > 0 && argument.type === Type.parameter) unique.pop();

  return true;

};

/**
 * Next Argument
 *
 * Moves to the _next_ argument (if available) on the current spec
 * in stream and update the states.
 */
export function NextArgument (): boolean {

  if (index === cursor.arguments.length - 1) return false;

  index++;
  within = Within.Arguments;
  argument = cursor.arguments[index];

  return true;

};

/**
 * Is Property
 *
 * Used for matching object properties. For every new object
 * property matched, state is updated to the property.
 */
export function isProperty (value: string): boolean {

  const prop = object?.properties?.[value];

  if (!prop) return false;

  object = prop;

  return true;

}

/**
 * Is Parameter
 *
 * Used for matching tag or filter parameter argument keys.
 * The cursor is updated and aligned to the parameter spec.
 */
export function isParameter (value: string) {

  // If current argument is not a parameter and not required
  // we will attempt to check the next argument in the array.
  if (!isType(Type.parameter) && !isRequired()) {
    if (isUnique(value) && (!NextArgument() || !isType(Type.parameter))) {
      PrevArgument();
      return false;
    }
  }

  if (isNumber(argument.value)) return true;

  const param = argument.value?.[value];

  if (!param) {

    // If we are not within a parameter
    if (within !== Within.Parameter) return false;

    // Get the last known parameter
    const name = unique[unique.length - 1];

    // If it does not match the parameter value passed in
    if (name !== value) return false;

    // Identical parameter has been passed in
    console.warn(`The "${unique[unique.length - 1]}" value has not been passed`);

    return true;

  }

  unique.push(value);

  argument = param;
  within = Within.Parameter;

  return true;

}

/**
 * Is Unique
 *
 * Checks whether a parameter value is unqiue. Each time a parameter
 * value is interceptd via `ifParameter()` it is saved to the
 * _active_ state Set of either a Filter or Tag.
 *
 * Parameters are assumed to be unique by default, so if the `unqiue`
 * property is `undefined` or `true` and the `active` state Set returns
 * `false` the parameter it will return `true` else if those conditions
 * are not met, it returns `false`
 */
export function isUnique (value: string) {

  const prop = (argument as IArgument.Parameter)?.unique;

  if (isUndefined(prop) || prop === true) return unique.indexOf(value) < 0;

  return false;
}

/**
 * Is Template
 *
 * Validate the current template name. This is a sugar shortcut
 * function called when parsing.
 */
export function isTemplate (name: ITemplates): boolean {

  return template === name;

}

/**
 * Is Object Type
 *
 * Validate a object `type` value. This is a sugar shortcut function
 * called when scanning a token by the parser.
 */
export function isObjectType (type: Type): boolean {

  return object.type === type;

}

/**
 * Is Tag Type
 *
 * Validate a tag `type` value. This is a sugar shortcut function
 * called when scanning a token by the parser.
 */
export function isTagType (type: Type): boolean {

  return tag.type === type;

}

/**
 * Is Type
 *
 * Validate a argument or parameter `type`
 * value. This is a sugar shortcut function called when scanning
 * a token by the parser.
 */
export function isType (type: Type): boolean {

  return argument.type === type;

}

/**
 * Is Required
 *
 * Checks the requirement for arguments, argument parameters or
 * parameter values. When a parameter has a `keyword` type, then
 * this return `true`.
 */
export function isRequired () {

  return (
    Within.Parameter && isType(Type.keyword)
  ) || (
    argument?.required === true
  );
}

/**
 * Is Value
 *
 * Validates an a value against the current cursor. This function executes
 * several conditional checks to validate the value.
 */
export function isValue (value: string): boolean {

  if (isType(Type.any)) return true;

  const prop = prev || value;
  const param: IArgument.Argument = argument as IArgument.Argument;

  let valid: boolean;

  if (param?.pattern) {
    if (isRegExp(param.pattern)) {
      valid = inPattern(param.pattern as RegExp, value);
    } else if (isObject(param.pattern)) {
      valid = inPattern(param.pattern?.[prop], value);
    } else if (isArray(param.pattern)) {
      valid = value >= param.pattern[0] && value <= param.pattern[1];
    }
  }

  if (isString(param.value)) valid = param.value === value;
  if (isObject(param.value)) valid = !!param.value?.[prop];
  if (isArray(param.value)) valid = inValues(param.value as Values[], value);

  if (valid) {
    if (within === Within.Parameter) argument = cursor.arguments[index];
    if (within === Within.Arguments) {
      if (index === 0) NextArgument();
      prev = value;
    }
    return true;
  }

  return false;

};
