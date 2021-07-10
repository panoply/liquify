import { cursor } from './cursor';
import { IArgument, ParameterArgument, Values, IParameters } from './types/common';
import { Types } from './types/types';

function inPattern (pattern: RegExp | string, value: string): boolean {

  return typeof pattern === 'string'
    ? new RegExp(pattern).test(value)
    : pattern.test(value);

};

function inValues (array: Values[] | string[], value: string) {

  let param: number = array.length;

  while (param--) {
    // @ts-ignore
    if (array[param] === value || array[param].value === value) return true;
  }

  return false;
}

export namespace argument {

  /**
   * Argument Index
   */
    /**
   * Argument Specification
   */
  export let param: ParameterArgument | undefined;
  export let index: number = 0;

  let prop: string;
  let prev: string | null;
  let unique: Set<string> = new Set();

  export function reset () {

    index = 0;
    prev = null;
    prop = null;

    cursor.argument = null;
    unique.clear();

  }

  export function next (): boolean {

    if (!cursor.argument) return false;

    const args = cursor.filter || cursor.filter;

    if (args?.arguments) {

      index++;
      cursor.argument = args.arguments[index] as IArgument;

      if (!param && cursor.argument?.parameter) {
        param = cursor.argument.parameter;
      } else if (cursor.argument?.type === Types.Argument.parameter) {
        param = cursor.argument;
      }

      if (argument.index === args.arguments.length) {
        index = 0;
        return false;
      }
    }

    return true;
  };

  export function isParamUnique (value: string) {

    if (param?.unique === undefined || param?.unique) {
      return !unique.has(value);
    }
  }

  export function isParamProp (value: string) {

    const arg = param?.value?.[value] as IArgument;

    if (!arg) return false;

    prop = value;
    unique.add(prop);

    return true;

  }

  export function isParamValueType (type: Types.Basic): boolean {

    return param.value[prop].type === type;

  }

  export function isParamValue (value: string) {

    let arg: IParameters = param?.value;

    if (!arg || !arg[prop]?.value) return true;

    arg = arg?.[prop];

    if (!arg) return false;

    if (arg?.pattern) return inPattern(arg.pattern, value);
    else if (typeof arg.value === 'string') return arg.value === value;
    else if (Array.isArray(arg.value)) return inValues(arg.value, value);

    return false;

  }

  export function isValue (value: string): boolean {

    if (!cursor.argument) return false;

    prev = prev || value;

    if (cursor.argument?.type === Types.Basic.unknown) {

      return true;

    } else if (cursor.argument?.type === Types.Argument.parameter) {

      return !!cursor.argument?.value?.[value];

    } else if (cursor.argument?.pattern) {

      const pattern = cursor.argument.pattern;

      if (pattern instanceof RegExp) return inPattern(pattern, value);

      if (prev && typeof pattern === 'object' && pattern?.[prev]) {
        return inPattern(pattern[prev], value);
      }

    } else if (cursor.argument?.value === value) {

      return cursor.argument.value === value;

    } else if (typeof cursor.argument?.value === 'object') {

      return !!cursor.argument.value?.[prev];

    } else if (Array.isArray(cursor.argument.value)) {

      return inValues(cursor.argument.value, value);

    }

    return true;

  };

}
