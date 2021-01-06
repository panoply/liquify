
/**
 * `[{<]`
 */
export const DelimiterCharacters = /[{<]/

/**
* `^\{[{%]`
*/
export const DelimiterCapture = /^\{[{%]/

/**
* `^[^\s"'>]+`
*/
export const HTMLTagEnd = /^[^\s"'>]+/

/**
* `^-?[%}]\}`
*/
export const LiquidTagClose = /^-?[%}]\}/

/**
* `^[^0-9][$_a-zA-Z0-9-]+\b`
*/
export const LiquidObjectName = /^[^0-9][$_a-zA-Z0-9-]+\b/

/**
* `^[$a-zA-Z0-9_-]+\b`
*/
export const LiquidObjectProperty = /^[$a-zA-Z0-9_-]+\b/

/**
* `^[_a-zA-Z]+\b`
*/
export const LiquidTagName = /^[_a-zA-Z]+\b/

/**
* `^\bend`
*/
export const LiquidEndTagSkip = /^\bend/

/**
* `^['"]`
*/
export const StringQuotations = /^['"]/

/**
* `^[=!<>]{1,}|^[^\s]+\b`
*/
export const LiquidControlOperators = /^[=!<>]{1,}|^[^\s]+\b/

/**
* `[\s\t\r\n]+`
*/
export const WhitespaceCharacters = /[\s\t\r\n]+/
