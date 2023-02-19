import * as specification from '../data';
import { Tag, Filter, Argument, Value, Completions, ScopeMapValue, IObject } from '../';
import { CompletionItemKind, CompletionItem } from 'vscode-languageserver-types';
import { Engine, Within, Errors, Type, Scopes } from '../../utils/enums';
import { documentation, filterCompletions } from '../../utils/signature';
import { isNumber } from '../../utils/typeof';
import { keys, entries, isArray, last } from '../../utils/native';
import { inPattern, inValues, inRange } from '../../utils/finders';
import { liquid } from './states';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

/**
 * Cursor represents either a filter or tag specification
 */
let cursor: Tag | Filter;

/**
 * The current argument index being walked
 */
let index: number = NaN;

/**
 * Query Errors
 */
let error: Errors;

/**
 * The previous arguments value
 */
let prev: string;

/**
 * Variable Scopes
 */
let scope: string | number;

/* -------------------------------------------- */
/* LOCAL CONSTANTS                              */
/* -------------------------------------------- */

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
 * Resets all states. This is executed everytime we
 * encounter a new tag.
 */
export function reset (hard = false): void {

  liquid.tag = undefined;
  liquid.object = undefined;
  liquid.filter = undefined;
  liquid.argument = undefined;
  liquid.value = undefined;
  liquid.scope = undefined;
  liquid.variable = undefined;

  scope = undefined;
  cursor = undefined;
  error = undefined;
  prev = undefined;
  index = 0;

  unique.clear();

  if (hard) liquid.data.variables.clear();

}

/* -------------------------------------------- */
/* GETTERS                                      */
/* -------------------------------------------- */

/**
 * Get Tag Name List
 *
 * Returns all Liquid tag names of the current defined
 * variation when no engine is provided.
 */
export function getTags (engine?: Engine) {

  if (engine === undefined) return keys(liquid.data.variation.tags);

  if (engine === Engine.standard) {
    return keys(specification.standard.tags);
  } else if (engine === Engine.shopify) {
    return keys(specification.shopify.tags);
  } else if (engine === Engine.jekyll) {
    return keys(specification.jekyll.tags);
  }

}

/**
 * Get Filters Name List
 *
 * Returns all Liquid filter names of the current defined
 * variation when no engine is provided.
 */
export function getFilters (engine?: Engine) {

  if (engine === undefined) return keys(liquid.data.variation.filters);

  if (engine === Engine.standard) {
    return keys(specification.standard.filters);
  } else if (engine === Engine.shopify) {
    return keys(specification.shopify.filters);
  } else if (engine === Engine.jekyll) {
    return keys(specification.jekyll.filters);
  }

}

/**
 * Get Objects Name List
 *
 * Returns all Liquid object names of the current defined
 * variation when no engine is provided.
 *
 * ---
 *
 * **Note**: The standard variation will return an empty array.
 */
export function getObjects (engine?: Engine.shopify | Engine.jekyll | Engine.eleventy) {

  if (liquid.engine === Engine.standard) return [];

  if (engine === undefined) return keys(liquid.data.variation.objects);

  if (engine === Engine.shopify) {
    return keys(specification.shopify.objects);
  } else if (engine === Engine.jekyll) {
    return keys(specification.jekyll.objects);
  }

}

/**
 * Get Argument
 *
 * Walks over _optional_ arguments contained on a tag
 * or filter until a `type` match is detected. If an
 * argument is `required` walk is cancelled.
 */
export function isArgument (type: any): boolean {

  if (cursor?.arguments === undefined) return false;

  const start: number = index;
  const limit = cursor.arguments.length - 1;

  while ((liquid.argument.type !== type && liquid.argument?.required !== true)) {
    liquid.argument = cursor.arguments[index];
    if (index !== limit) index++; else break;
  }

  if (liquid.argument.type === type) return true;

  index = start;
  liquid.argument = cursor.arguments[start];
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
export function isParameter (token: string) {

  if (liquid.argument === undefined) {
    if ((cursor as Tag)?.parameters?.[token]) {
      liquid.argument = (cursor as Tag).parameters[token];
      liquid.within = Within.Parameter;
    } else {
      return false;
    }
  } else if ((cursor as Tag)?.parameters?.[token]) {
    liquid.argument = (cursor as Tag).parameters[token];
    liquid.within = Within.Parameter;
  }

  if (liquid.argument.type === Type.keyword) {

    if (unique.has(token)) {
      error = Errors.ParameterNotUnique;
      return false;
    }

    unique.add(token);
    liquid.within = undefined;

    return true;

  } else if (liquid.within === Within.Parameter) {

    liquid.within = Within.ParameterValue;
    return true;
  }

  if ((liquid.argument.type as any) !== Type.parameter && !isArgument(Type.parameter)) {
    return false;
  }

  if (isNumber(liquid.argument.value)) return true;

  const param = liquid.argument.value?.[token];

  if (!param) {
    error = Errors.ParameterUnknown;
    return false;
  }

  const uniq = param?.unique;

  if ((uniq === undefined || uniq === true) && unique.has(token)) {
    error = Errors.ParameterNotUnique;
  } else {
    unique.add(token);
  }

  liquid.argument = param;
  liquid.within = Within.ParameterValue;

  return true;
}

/**
 * Is Value
 *
 * Validates an a argument value. This function will run
 * several typeof checks to figure out how a value should
 * be validated, starting with patterns and working its way
 * down to a specificaions `value` entries.
 *
 * ---
 *
 * **Note**: When an array parameter pattern is provided, like
 * that found on shopify `color_saturate` filter then the `value`
 * state reference will be reflect a string value of:
 *
 * `0 and 100`
 *
 * This `$.liquid.value` is used in validations etc.
 */
export function isValue (token: string): boolean {

  if ((
    isType(Type.any) || (
      !liquid.argument?.value &&
      !(liquid.argument as Argument)?.pattern
    )
  )) return true;

  const prop = prev || token;
  const param: Argument = liquid.argument as Argument;

  let valid: boolean;

  if (param?.pattern) {
    if (param.pattern instanceof RegExp) {
      valid = inPattern(param.pattern as RegExp, token);
    } else if (typeof param.pattern === 'object') {
      const pattern = param.pattern?.[prop];
      if (isArray(pattern)) {
        valid = inRange(pattern[0], pattern[1], Number(token));
        liquid.value = `${pattern[0]} and ${pattern[1]}`;
      } else {
        valid = inPattern(pattern, token);
      }
    } else if (isArray(param.pattern)) {
      valid = inRange(param.pattern[0], param.pattern[1], Number(token));
      liquid.value = `${param.pattern[0]} and ${param.pattern[1]}`;
    }
  } else {
    valid = param.value === token || !!param.value?.[prop] || inValues(param.value as Value[], token);
  }

  if (!valid && (param.strict === undefined || param.strict)) return false;
  if (liquid.within === Within.Arguments) prev = token;

  return true;

};

/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export function setCompletions (): Completions {

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = entries(liquid.data.variation.tags).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false,
        singleton = false,
        snippet = '$1',
        parents = []
      }
    ]) => ({
      label,
      deprecated,
      kind: CompletionItemKind.Keyword,
      documentation: documentation(description as string, reference),
      data: {
        snippet,
        singleton,
        parents
      }
    })
  );

  /* -------------------------------------------- */
  /* FILTER COMPLETIONS                           */
  /* -------------------------------------------- */

  const filters = entries(liquid.data.variation.filters).map(filterCompletions);

  if (liquid.engine === Engine.standard) {
    return {
      tags,
      filters,
      objects: []
    };

  };

  /* -------------------------------------------- */
  /* OBJECT COMPLETIONS                           */
  /* -------------------------------------------- */

  const objects = entries(liquid.data.variation.objects).map(
    ([
      label,
      {
        description,
        deprecated = false
      }
    ]): CompletionItem => ({
      label,
      deprecated,
      documentation: {
        kind: 'markdown',
        value: description
      },
      data: {}
    })
  );

  return {
    tags,
    filters,
    objects
  };

}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Set Engine
 *
 * Sets the Liquid `variation` and `engine` variable.
 * This will change what specification we reference.
 */
export function setEngine (name: Engine): void {

  if (liquid.engine !== name) {

    liquid.engine = name;
    liquid.data.variation = specification[liquid.engine];
    liquid.data.completions = setCompletions();

    // Object.values(signatures.filters).forEach(i => console.log(...i));

  }

};

/**
 * Set Tag
 *
 * Finds a tag matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched tag.
 */
export function setTag (name: string): boolean {

  if (!liquid.data.variation.tags?.[name]) return false;

  cursor = liquid.tag = liquid.data.variation.tags[name];
  liquid.argument = cursor?.arguments?.[0] as Argument;
  liquid.within = Within.Arguments;

  return true;
}

/**
 * Set Filter
 *
 * Finds a filter matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched filter.
 */
export function setFilter (name: string): boolean {

  if (!liquid.data.variation.filters?.[name]) return false;

  index = 0;
  cursor = liquid.filter = liquid.data.variation.filters[name];

  liquid.argument = cursor?.arguments?.[0] as Argument;
  liquid.within = Within.Arguments;

  unique.clear();

  return true;
};

/**
 * Set Variable
 *
 * Add a variable assignment reference to the `data.variables`
 * store. Returns the index at which the reference exists in
 * the array list of variables. The variable store is an object
 * who's keys represent the variable keywords and the values are
 * an array. Each entry in the array will hold the the assigned value.
 */
export function setVariable (name: string): void {

  scope = name;

  if (liquid.data.variables.has(name)) {
    liquid.data.variables.get(name).push({});
  } else {
    liquid.data.variables.set(name, [ {} ]);
  }

}

/**
 * Set Object
 *
 * Finds a matching object specification. Objects can be
 * contained in tags and filter, so the `cursor` is not
 * modified, instead the `object` state variable is updated.
 */
export function setObject (name: string): boolean {

  let record: IObject = liquid.data.variation?.objects?.[name];

  if (scope) {
    liquid.variable = last<ScopeMapValue>(liquid.data.variables.get(scope as string));
    liquid.variable.scope = Scopes.Object;
    liquid.variable.value = record;
  }

  if (!record) {

    if (!scope && liquid.data.variables.has(name)) {
      const record = liquid.data.variables.get(name);
      const variable = last<ScopeMapValue>(record);
      if (variable.scope === Scopes.Object) {
        liquid.scope = record.length - 1;
        liquid.object = variable.value as IObject;
        liquid.variable = variable;
        return true;
      }
    }

    return false;
  }

  liquid.object = record;

  return true;

};

/**
 * Is Property
 *
 * Queries the current object for a property value
 * matching the parameter `value` provided. The object state
 * reference will update and point to the property
 * value when a match occurs.
 */
export function isProperty (token: string): boolean {

  const prop = liquid.object?.properties?.[token];

  if (!prop) return false;
  if (scope) liquid.variable.value = prop;

  if (prop?.scope) {

    return setObject(prop.scope);

  } else {
    liquid.object = prop;
    return true;
  }

}

/**
 * Is Allowed
 *
 * Checks the current cursor allows a value or some sort,
 * like filters or trim dashes. By default, when a value is
 * undefined on the specs, it is typically assumed to be `true`
 * unless we a dealing with a `required` value, which this
 * function does not validate for.
 */
export function isAllowed (prop: 'trims' | 'filters'): boolean {

  return liquid.tag
    ? liquid.tag?.[prop] ?? true
    : liquid.object
      ? liquid.object?.[prop] ?? true
      : false;

}

/**
 * Is Parent
 *
 * Check to see if the tag or object has the correct parent
 * tag, ie: a child of a certain tag or scope.
 */
export function isParent (name: string) {

  return liquid.tag.parents.includes(name);

}

/**
 * Is Variable
 *
 * Checks to see if the provide parameter is a scoped variable,
 * meaning that it holds a property assignment (ie: object).
 * When determined, the the state `liquid.object` is aligned
 * and boolean type `true` is returned. If the variable scope does not
 * hold a property assignment then `false` is returned.
 *
 * When `false` is returned, the `liquid.variable` state will
 * represent the variable assignment type.
 */
export function isVariable (name: string) {

  if (liquid.data.variables.has(name)) {

    const record = liquid.data.variables.get(name);
    const variable = last<ScopeMapValue>(record);

    if (variable.scope === Scopes.Object) {
      liquid.scope = record.length - 1;
      liquid.object = variable.value as IObject;
      liquid.variable = variable;
      return true;
    }
  }

  return false;
}

/**
 * Is Error
 *
 * Conditional checks the local error state reference
 * with the provided Query error enum.
 */
export function isError (err: Errors) {

  return error === err;

}

/**
 * Is Object Variables
 *
 * Check a variables reference object properties
 * are valid by walknig over the object itself.
 */
export function isObjectVars (vars: string[]) {

  if (vars.length === 1) {
    setObject(vars[0]);
    return true;
  }

  setObject(vars[0]);

  let p: number = 1;
  const length = vars.length - 1;

  while (p !== length) {
    if (!isProperty(vars[p])) return false;
    p = p + 1;

    console.log(liquid.object);
  }

  return true;

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

  return (liquid.object?.type as any) === type;
}

/**
 * Is Tag Type
 *
 * Validate a current tag `type` value. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export function isTagType (type: Type): boolean {

  return (liquid.tag?.type as any) === type;
}

/**
 * Is Type
 *
 * Validate the current argument `type` value. It will match
 * an argument/parameter value type. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export function isType (type: Type): boolean {

  const arg = liquid.argument?.type as any;

  return arg === Type.any ? true : arg === type;

}

/**
 * Is Within
 *
 * Used to validate the whereabouts of the current tag or filter
 * argument query engine position.
 */
export function isWithin (token: Within): boolean {

  return liquid.within === token;

}

/**
 * Is Required
 *
 * Checks the requirement for arguments, argument parameters or
 * parameter values. When a parameter has a `keyword` type, then
 * this returns `true`.
 */
export function isRequired (): boolean {

  return (
    Within.Parameter && isType(Type.keyword)
  ) || (
    liquid.argument?.required === true
  );
}

/**
 * Is Optional
 *
 * Checks the requirement for every liquid.argument. If an arguments
 *  `required` value returns `true` then a boolean `false` will
 * be returned indicating that arguments are not optional and at
 * least 1 value is required. The function accepts a starting index,
 * default to the current argument index location.
 *
 * Some tag/filter arguments might all be optional, whereas some
 * might contain an optional starting arguments, but require arguments
 * proceeding that.
 */
export function isOptional (from: number = index): boolean {

  let size: number = cursor.arguments.length - from - 1;

  if (size === 0 || from === size) return true;
  while (from < size && !cursor.arguments[from]?.required) from++;

  return from === size;

}

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
export function prevArgument (): boolean {

  if (isNaN(index) || index === 0) return false;

  index--;
  liquid.within = Within.Arguments;
  liquid.argument = cursor.arguments[index];

  if ((liquid.argument.type as any) === Type.parameter && unique.has(prev)) {
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
export function nextArgument (): boolean {

  if (!cursor.arguments) return false;
  if (index === cursor?.arguments?.length - 1) return false;

  index++;
  liquid.within = Within.Arguments;
  liquid.argument = cursor.arguments[index];

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
export function nextParameter (): boolean {

  if (isWithin(Within.ParameterValue)) {
    liquid.argument = cursor.arguments[index];
    liquid.within = Within.Parameter;
    return true;
  }

  return false;
};
