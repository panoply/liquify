
/* -------------------------------------------- */
/* CACHED NATIVE                                */
/* -------------------------------------------- */

/**
 * Cached Native Object.keys
 */
export const keys = Object.keys;

/**
 * Cached Native Object.create
 */
export const create = Object.create;

/**
 * Cached Native Object.is
 */
export const is = Object.is;

/**
 * Cached Native Object.assign
 */
export const assign = Object.assign;

/**
 * Cached Native Object.entries
 */
export const entries = Object.entries;

/**
 * Cached Native Object.values
 */
export const values = Object.values;

/**
 * Cached Native Array.isArray
 */
export const isArray = Array.isArray;

/* -------------------------------------------- */
/* HELPERS                                      */
/* -------------------------------------------- */

/**
 * Create a null prototyp object
 */
export const obj = () => create(null);

/**
 * Returns last item in array
 */
export const last = <T>(array: any[]): T => array[array.length - 1];
