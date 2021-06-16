/* -------------------------------------------- */
/* DELIMITER EXPRESSION                         */
/* -------------------------------------------- */

/**
 * `[{<]`
 *
 * ---
 *
 * Considered the starting points for tags
 */
export const Delimiters = /[{<]/;

/**
 * `^\{[{%]`
 *
 * ---
 *
 * Open Delimiters for Liquid basic tags
 *
 */
export const DelimitersOpen = /^\{[{%]/;

/**
 * `^{%`
 *
 * ---
 *
 * Open Delimiters for Liquid basic tags
 *
 */
export const DelimitersTagOpen = /^{%/;

/**
 * `^{{`
 *
 * ---
 *
 * Open Delimiters for Liquid object tags.
 *
 */
export const DelimitersOutputOpen = /^{{/;

/**
 * `^%}`
 *
 * ---
 *
 * Open Delimiters for Liquid basic tags
 *
 */
export const DelimitersTagClose = /^%}/;

/**
 * `^}}`
 *
 * ---
 *
 * Open Delimiters for Liquid object tags.
 *
 */
export const DelimitersObjectClose = /^}}/;

/**
 * `^[%}]\}`
 *
 * ---
 *
 * Close delimiters for Liquid basic and object tags
 */
export const DelimitersClose = /^[%}]\}/;

/* -------------------------------------------- */
/* BASIC TAG EXPRESSIONS                        */
/* -------------------------------------------- */

/**
 * `^[a-zA-Z]`
 *
 * ---
 *
 * Basic tag first character validators. Only alphabetical
 * expressions can be used. This is Standard and Shopify
 * variation specific.
 */
export const TagFirstChar = /^[a-zA-Z]/;

/**
 * `^[a-zA-Z]+`
 *
 * ---
 *
 * Basic tag first character validators. Only alphabetical
 * expressions can be used. This is Standard and Shopify
 * variation specific.
 */
export const TagName = /^[a-zA-Z]+/;

/**
 * `^[a-zA-Z0-9$_]`
 *
 * ---
 *
 * Basic tag first character validators wild matcher. Alphanumeric
 * captures, used in Jekyll and 11ty variations.
 */
export const TagFirstCharWild = /^[a-zA-Z0-9$_]/;

/**
 * `^[a-zA-Z0-9_]+`
 *
 * ---
 *

 */
export const TagKeyword = /^[a-zA-Z0-9_]+/;

/**
 * `^[a-zA-Z0-9$_]+`
 *
 * ---
 *
 * Basic tag first character validators. Only alphabetical
 * expressions can be used. This is Standard and Shopify
 * variation specific.
 */
export const TagNameWild = /^[a-zA-Z0-9$_]+/;

/**
 * `^\bend`
 *
 * ---
 *
 * Captures the "end" word boundary in an end tag.
 */
export const TagEndKeyword = /^\bend/;

/**
 * `^-?[\s\t\r\n\f]*?\bend[a-zA-Z]`
 *
 * ---
 *
 * Peeks the expression to detect whether we are dealing with
 * an end tag or not. Must be called at character sequencing level.
 */
export const TagIsEnd = /^-?[\s\t\r\n\f]*?\bend/;

/**
 * `^[\s\t\r\n\f]*?[-%}]`
 *
 * ---
 *
 * Captures a clear closing delimiter path, ensuring no
 * invalid characters located between
 */
export const TagCloseClear = /^[\s\t\r\n\f]*?[-%}]/;

/* -------------------------------------------- */
/* INNER CONTENT SKIPS                          */
/* -------------------------------------------- */

/**
 * `/{%-?\s*\bendcomment/;`
 *
 * ---
 *
 * Looks for the comment end tag.
 */
export const CommentTagEnd = /{%-?\s*\bendcomment/;

/**
 * `/{%-?\s*\bendraw/;`
 *
 * ---
 *
 * Looks for the raw end tag.
 */
export const RawTagEnd = /{%-?\s*\bendraw/;

/* -------------------------------------------- */
/* OBJECT TAG EXPRESSIONS                       */
/* -------------------------------------------- */

/**
 * `^["'a-zA-Z0-9\-$_]`
 *
 * ---
 *
 * Object tag first character validators. Object tags
 * can only start with these characters.
 */
export const ObjectFirstCharacter = /^["'a-zA-Z0-9\-$_]/;

/**
 * `^[a-zA-Z0-9\-$_]+`
 *
 * ---
 *
 * Alphabetical Object tag name
 */
export const ObjectNameAlpha = /^[a-zA-Z0-9$_]+/;

/**
 * `^[\s\t\r\n\f]*?[[.]`
 *
 * ---
 *
 * Detects whether the next character is a dot or opening bracket.
 * If detected indicates a property value.
 */
export const ObjectHasProperty = /^[\s\t\r\n\f]*?[[.]/;

/**
 * `^[a-zA-Z0-9$\-_]+`
 *
 * ---
 *
 * Property Value expression
 */
export const PropertyValue = /^[a-zA-Z0-9$\-_]+/;

/**
 * `[[\]]`
 *
 * ---
 *
 * Captures bracket characters. Seeks only "[" or "]" no asserted
 * starting point or greedy consumers, its just the characters.
 */
export const PropertyBrackets = /[[\]]/;

/* -------------------------------------------- */
/* STRING EXPRESSIONS                           */
/* -------------------------------------------- */

/**
 * `^['"]`
 *
 * ---
 *
 * Single captures of string quotation characters
 */
export const StringQuotations = /^['"]/;

/**
 * `^["']\s*?["']`
 *
 * ---
 *
 * Empty String or a string containing just whitespace
 */
export const StringEmpty = /^["']\s*?["']/;

/* -------------------------------------------- */
/* SPACING EXPRESSIONS                          */
/* -------------------------------------------- */

/**
 * `^[\s\t\r\n\f]+`
 *
 * ---
 *
 * Greedy Capture of both whitespace and newline characters.
 */
export const Spacing = /^[\s\t\r\n\f]+/;

/**
 * `^[\n\r\f]`
 *
 * ---
 *
 * Captures Newline characters only
 */
export const Newlines = /^[\n\r\f]/;

/**
 * `^[\s\t]`
 *
 * ---
 *
 * Captures Whitespace characters
 */
export const Whitespace = /^[\s\t]/;

/* -------------------------------------------- */
/* NUMBER EXPRESSIONS                           */
/* -------------------------------------------- */

/**
 * `^-?[\d.]+`
 *
 * ---
 *
 * Greedy combined capture of integer and float
 */
export const Number = /^-?[\d.]+/;

/**
 * `^\d+/`
 *
 * ---
 *
 * Greedy digital only capture
 */
export const NumberDigit = /^\d+/;

/**
 * `^-?\d+/`
 *
 * ---
 *
 * Greedy integer number capture
 */
export const NumberInteger = /^-?\d+/;

/**
 * `^-?\d+/`
 *
 * ---
 *
 * Greedy float number capture
 */
export const NumberFloat = /^-?\d[\d.]+/;

/* -------------------------------------------- */
/* FILTER EXPRESSIONS                           */
/* -------------------------------------------- */

/**
 * `^[^_][a-zA-Z_]+`
 *
 * ---
 *
 * Filter identifier name capture. Cannot start with
 * underscore but can contain one.
 */
export const FilterIdentifier = /^[^_][a-zA-Z_]+/;

/**
 * `^(?:\||-?[%}])`
 *
 * ---
 *
 * Captures a pipe filter character or closing delimiters
 */
export const FilterPipeOrClose = /^(?:\||-?[%}])/;

/* -------------------------------------------- */
/* BOOLEAN EXPRESSION                           */
/* -------------------------------------------- */

/**
 * `^\b(?:true|false|nil)\b`
 *
 * ---
 *
 * Captures word bounded "true", "false" or "nil" boolean
 */
export const Booleans = /^\b(?:true|false|nil)\b/;

/**
 * `^\btrue\b`
 *
 * ---
 *
 * Captures word bounded "true"  boolean
 */
export const BooleanTrue = /^\btrue\b/;

/**
 * `^\bin\b`
 *
 * ---
 *
 * Captures the `in` operator
 */
export const IterationOperator = /^\bin\b/;

/**
 * `^\b(?:false|nil)\b`
 *
 * ---
 *
 * Captures word bounded "false" or "nil" boolean
 */
export const BooleanFalse = /^\b(?:false|nil)\b/;

/* -------------------------------------------- */
/* CONTROL TAG EXPRESSIONS                      */
/* -------------------------------------------- */

/**
 * `^["'a-zA-Z0-9\-$_]+`
 *
 * ---
 *
 * Valid control condition or comparison values
 */
export const ControlCondition = /^[a-zA-Z0-9\-$_]+/;

/**
 * `^(?:==|!=|[>=]{2}|[<>])`
 *
 * ---
 *
 * Captures Standard Liquid control operators.
 */
export const ControlOperators = /^(?:==|!=|>=|<=|<|>|\b(?:and|or)\b)/;

/**
 * `^(?:==|!=|[>=]{2}|[<>]|\b(?:contains)\b)`
 *
 * ---
 *
 * Captures Shopify Liquid variation control operators.
 */
export const ControlOperatorsShopify = /^\b(?:contains)\b/;

/**
 * `\b(?:and|or)\b`
 *
 * ---
 *
 * Captures Join operator keyword values used to combine
 * conditional control
 */
export const ControlJoins = /\b(?:and|or)\b/;

/* -------------------------------------------- */
/* HTML TAG EXPRESSIONS                         */
/* -------------------------------------------- */

/**
 * `^[a-zA-Z]+`
 *
 * ---
 *
 * HTML Tag name identifier
 */
export const HTMLTagName = /^[a-zA-Z]+/;

/**
 * `^[a-zA-Z0-9-]+`
 *
 * ---
 *
 * HTML Tag name identifier
 */
export const HTMLTagAttribute = /^[a-zA-Z0-9-]+/;

/**
 * `^[^\s"'>]+`
 *
 * ---
 *
 * HTML End Tag name identifier
 */
export const HTMLTagEnd = /^[^\s"'>]+/;

/**
 * `^\bscript`
 *
 * ---
 *
 * HTML Script Tag
 */
export const HTMLScriptEmbed = /^\bscript/;

/**
 * `^\bstyle`
 *
 * ---
 *
 * HTML Style Tag
 */
export const HTMLStyleEmbed = /^\bstyle/;

/**
 * `^\b(?:style|script)`
 *
 * ---
 *
 * HTML Style Tag
 */
export const HTMLEmbedded = /^\b(?:style|script)/;

/**
 * `/(module|(text|application)\/(java|ecma)script|text\/babel)/`
 *
 * ---
 *
 * HTML Script Attributes
 */
export const HTMLAttrJS = /(module|(text|application)\/(java|ecma)script|text\/babel)/;

/**
 * `/(module|(text|application)\/(java|ecma)script|text\/babel)/`
 *
 * ---
 *
 * HTML JSON Attributes
 */
export const HTMLAttrJSON = /application\/(?:ld\+)?json/;
