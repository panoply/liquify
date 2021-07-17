import { Values } from '../types/common';

/* -------------------------------------------- */
/* TYPEOF CHECKS                                */
/* -------------------------------------------- */

/**
 * Validate if value is a number
 */
export const isNumber = (value: any): boolean => typeof value === 'number';

/**
 * Validate if value is a string
 */
export const isString = (value: any): boolean => typeof value === 'string';

/**
 * Validate if value is a object
 */
export const isObject = (value: any): boolean => value !== null && typeof value === 'object';

/**
 * Validate if value is a Regular Expression
 */
export const isRegExp = (value: any): boolean => value instanceof RegExp;

/**
 * Validate if value is a Boolean
 */
export const isBoolean = (value: any): boolean => value === true || value === false;

/**
 * Validate if value is a Boolean
 */
export const isArray = (value: any): boolean => Array.isArray(value);

/**
 * Validate if value is undefine
 */
export const isUndefined = (value: any): boolean => value === undefined;

/**
 * Validate if value is undefine
 */
export const isNull = (value: any): boolean => value === null;

/* -------------------------------------------- */
/* MISCELLANEOUS                                */
/* -------------------------------------------- */

/**
 * Validates pattern match
 */
export const inRange = (
  start: number,
  end: number,
  value: number
): boolean => (

  (value >= start && value <= end)

);

/**
 * Validates pattern match
 */
export const inPattern = (
  pattern: RegExp | string,
  value: string
): boolean => (

  typeof pattern === 'string'
    ? new RegExp(pattern).test(value)
    : pattern === undefined
      ? false
      : (pattern as RegExp).test(value)

);

/**
 * Looks for match within values
 */
export const inValues = (
  array: Values[] | string[],
  value: string
) => {

  if (isString(array[0])) {
    return (array as string[]).indexOf(value) >= 0;
  }

  let param: number = array.length;
  while (param--) if ((array[param] as Values).value === value) return true;

  return false;

};

/* -------------------------------------------- */
/* GENERATORS                                   */
/* -------------------------------------------- */

/**
 * Looks for match within values
 */
export const documentation = (description: string, reference: { name: string, url: string }): {
  kind: 'plaintext' | 'markdown',
  value: string
} => {

  if (!description && !reference?.name) return { kind: 'plaintext', value: '' };

  if (!reference?.name) return { kind: 'plaintext', value: '' };

  const value = description +
    '\n\n' +
    '---' +
    '[' + reference.name + ']' +
    '(' + reference.url + ')';

  return { kind: 'markdown', value };

};
