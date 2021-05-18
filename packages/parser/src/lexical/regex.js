
/**
 * Delimiter Characters
 *
 * `[{<]`
 */
export const DelimiterCharacters = /[{<]/

/**
 * Liquid Open Delimiters
 *
* `^\{[{%]`
*/
export const OpenDelimiters = /^\{[{%]/

/**
 * Liquid First Character
 *
 * `^[a-zA-Z0-9$"'_]`
 */
export const LiquidFirstCharacter = /^[$a-zA-Z0-9"'_-]/

/**
 * Liquid Close Delimiters
 *
* `^[%}]\}`
*/
export const CloseDelimiters = /^[%}]\}/

/**
 * HTML Tag End
 *
* `^[^\s"'>]+`
*/
export const HTMLTagEnd = /^[^\s"'>]+/

/**
 * Liquid Tag Close
 *
 * `^-?[%}]\}`
 */
export const LiquidTagClose = /^[%}]\}/

/**
 * Liquid Object Tag Close
 *
 * `^-?\}{2}`
 */
export const LiquidObjectTagClose = /^-?\}{2}/

/**
 * Liquid Object Name
 *
 * `^[$_a-zA-Z0-9-]*`
 */
export const LiquidObjectName = /^[$_a-zA-Z0-9-]*/

/**
* `^[$a-zA-Z0-9_-]+\b`
*/
export const LiquidObjectProperty = /^[$a-zA-Z0-9_-]+\b/

/**
* `^[_a-zA-Z]+\b`
*/
export const LiquidTagName = /^[_a-zA-Z]+\b/

/**
 * Liquid End Tag
 *
 * `^\bend`
 */
export const LiquidEndTagSkip = /^\bend/

/**
 * String Quotations
 *
 * `^['"]`
 */
export const StringQuotations = /^['"]/

/**
 * Liquid Control Operators
 *
 * `^[=!<>]{1,}|^[^\s]+\b`
 */
export const LiquidControlOperators = /^[=!<>]{1,}|^[^\s]+\b/

/**
 * Whitespace and Newlines
 *
 * `[\s\t\r\n]+`
 */
export const WhitespaceCharacters = /[\s\t\r\n]+/

/**
 * Newlines Only
 *
 * `[\n\r\f\c]`
 */
export const Newlines = /[\n\r\f]/

/**
 * Whitespace Only
 *
 * `[\s\t]`
 */
export const Whitespace = /[\s\t]/

/**
 * Empty String
 *
 * `^["'][\s\t\r\n]+["']`
 */
export const EmptyString = /^["'][\s\t\r\n]+["']/

/**
 * Digits / Numbers
 *
 * `^[0-9]*$`
 */
export const Digits = /^[0-9]*$/
