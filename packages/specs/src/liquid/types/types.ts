
/* -------------------------------------------- */
/* MAIN EXPORT USING ALL TYPES                  */
/* -------------------------------------------- */

// THIS ENUM WILL BE EXPORTED AND CONSUMED BY PUBLIC
// MODULES. IT HAS ALL CONST ENUMS COMBINED, WHEREAS
// THE SINGLE ENUM EXPORTS ARE USED ONLY WITHIN THIS
// MODULE TO CONSTRUCT THE SPECIFICATION FILES USED.

export declare type BasicTypes = (
  | 'any'
  | 'object'
  | 'integer'
  | 'number'
  | 'boolean'
  | 'string'
  | 'array'
  | 'data'
)

export declare type ArgumentTypes = (
 | 'parameter'
 | 'keyword'
 | 'attribute'
)

export declare type TagTypes = (
 | 'control'
 | 'comment'
 | 'embedded'
 | 'generator'
 | 'import'
 | 'iteration'
 | 'link'
 | 'output'
 | 'variable'
 | 'raw'
 | 'unknown'
)
