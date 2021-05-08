
/**
 * `[{<]`
 */
export const DelimiterCharacters = /[{<]/

/**
* `^\{[{%]`
*/
export const OpenDelimiters = /^\{[{%]/

/**
* `^[%}]\}`
*/
export const CloseDelimiters = /^[%}]\}/

/**
* `^[^\s"'>]+`
*/
export const HTMLTagEnd = /^[^\s"'>]+/

/**
* `^-?[%}]\}`
*/
export const LiquidTagClose = /^-?[%}]\}/

/**
* `^-?[}]{2}`
*/
export const LiquidObjectTagClose = /^-?\}\}/

/**
* `^[$_a-zA-Z0-9-"']*\b`
*/
export const LiquidObjectName = /^[$_a-zA-Z0-9-"']*\b/

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

/**
* `[\n\r\f\c]`
*/
export const Newlines = /[\n\r\f]/

/**
* `[\s\t]`
*/
export const Whitespace = /[\s\t]/

/**
* `^[0-9]*$`
*/
export const Digits = /^[0-9]*$/
