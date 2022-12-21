
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
 * Cached Native Array.isArray
 */
export const isArray = Array.isArray;

/* -------------------------------------------- */
/* HELPERS                                      */
/* -------------------------------------------- */

/**
 * Returns last item in array
 */
export const last = <T>(array: any[]): T => array[array.length - 1];
