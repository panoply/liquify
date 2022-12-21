import { Value } from '../types';
import { isString } from './typeof';

/**
 * Validates pattern match
 */
export const inRange = (start: number, end: number, value: number): boolean => (

  (value >= start && value <= end)

);

/**
 * Validates pattern match
 */
export const inPattern = (pattern: RegExp | string, value: string): boolean => (

  typeof pattern === 'string'
    ? new RegExp(pattern).test(value)
    : pattern === undefined
      ? false : (pattern as RegExp).test(value)

);

/**
 * Looks for match within values
 */
export const inValues = (array: Value[] | string[], value: string) => {

  if (isString(array[0])) return (array as string[]).indexOf(value) >= 0;

  let param: number = array.length;

  while (param--) if ((array[param] as Value).value === value) return true;

  return false;

};
