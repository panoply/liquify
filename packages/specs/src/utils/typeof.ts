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
 * Validate if value is undefine
 */
export const isUndefined = (value: any): boolean => value === undefined;

/**
 * Validate if value is undefine
 */
export const isNull = (value: any): boolean => value === null;
