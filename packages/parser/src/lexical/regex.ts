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
 * `^{[{%]`
 *
 * ---
 *
 * Open Delimiters for Liquid basic tags
 *
 */
export const DelimitersOpen = /^{[{%]/;

/**
 * `^{%`
 *
 * ---
 *
 * Open Delimiters for Liquid basic tags
 *
 */
export const DelimitersTagOpen = /^{%-?/;

/**
 * `^{{`
 *
 * ---
 *
 * Open Delimiters for Liquid object tags.
 *
 */
export const DelimitersOutputOpen = /^{{2}-?/;

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
export const TagEndKeyword = /^\bend/i;

/**
 * `^-?\s*\bend`
 *
 * ---
 *
 * Peeks the expression to detect whether we are dealing with
 * an end tag or not. Must be called at character sequencing level.
 */
export const TagIsEnd = /^-?\s*\bend/i;

/**
 * `^\s*-?[%}]}`
 *
 * ---
 *
 * Captures a clear closing delimiter path, ensuring no
 * invalid characters located between
 */
export const TagCloseClear = /^\s*[-%}]/;

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
export const CommentTagEnd = /{%-?\s*\bendcomment/i;

/**
 * `/{%-?\s*\bendraw/;`
 *
 * ---
 *
 * Looks for the raw end tag.
 */
export const RawTagEnd = /{%-?\s*\bendraw/i;

/* -------------------------------------------- */
/* OBJECT TAG EXPRESSIONS                       */
/* -------------------------------------------- */

/**
 * `^["'a-zA-Z0-9$_-]`
 *
 * ---
 *
 * Object tag first character validators. Object tags
 * can only start with these characters.
 */
export const OutputFirstCharacter = /^["'a-zA-Z0-9$_-]/;

/**
 * `^[a-zA-Z0-9\-$_]+`
 *
 * ---
 *
 * Alphabetical Object tag name
 */
export const OutputNameAlpha = /^[a-zA-Z0-9$_]+/;

/**
 * `^[\s\t\r\n\f]*?[[.]`
 *
 * ---
 *
 * Detects whether the next character is a dot or opening bracket.
 * If detected indicates a property value.
 */
export const PropertyNotation = /^\s{0,}[[.]/;

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
export const StringEmpty = /^["']\s*["']/;

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
export const Spacing = /^\s*/;

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
 * `^(\||-?[%}])`
 *
 * ---
 *
 * Captures a pipe filter character or closing delimiters
 */
export const FilterPipeOrClose = /^(\||-?[%}])/;

/* -------------------------------------------- */
/* BOOLEAN EXPRESSION                           */
/* -------------------------------------------- */

/**
 * `^\b(true|false|nil)\b`
 *
 * ---
 *
 * Captures word bounded "true", "false" or "nil" boolean
 */
export const Booleans = /^\b(true|false|nil)\b/i;

/**
 * `^\btrue\b`
 *
 * ---
 *
 * Captures word bounded "true"  boolean
 */
export const BooleanTrue = /^\btrue\b/i;

/**
 * `^\bin\b`
 *
 * ---
 *
 * Captures the `in` operator
 */
export const IterationOperator = /^in/i;

/**
 * `^\b(?:false|nil)\b`
 *
 * ---
 *
 * Captures word bounded "false" or "nil" boolean
 */
export const BooleanFalse = /^\b(false|nil)\b/i;

/* -------------------------------------------- */
/* CONTROL TAG EXPRESSIONS                      */
/* -------------------------------------------- */

/**
 * `^[a-zA-Z0-9\-$_]+`
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
export const ControlOperators = /^(?:==|!=|>=|<=|<|>|\b(and|or)\b)/i;

/**
 * `^(?:==|!=|[>=]{2}|[<>]|\b(?:contains)\b)`
 *
 * ---
 *
 * Captures Shopify Liquid variation control operators.
 */
export const ControlOperatorsShopify = /^(contains)/i;

/**
 * `\b(?:and|or)\b`
 *
 * ---
 *
 * Captures Join operator keyword values used to combine
 * conditional control
 */
export const ControlJoins = /(and|or)/i;

/* -------------------------------------------- */
/* HTML TAG EXPRESSIONS                         */
/* -------------------------------------------- */

/**
 * `^[_:\w][_:\w-.\d]*`
 *
 * ---
 *
 * HTML Tag name identifier
 *
 * - Regex Expression lifted from vscode-html-languageservice
 */
export const HTMLTagName = /^[_:\w][_:\w-.\d]*/;

/**
 * `^\s*<\/?[\w_:]`
 *
 * ---
 *
 * HTML End Tag name identifier
 */
export const HTMLNextTagClose = /^\s*<\/?[\w_:]/;

/**
 * `^[^\s"'>]+`
 *
 * ---
 *
 * HTML End Tag name identifier
 */
export const HTMLTagEndName = /^[^\s"'>]+/;

/**
 * `^\/>`
 *
 * ---
 *
 * HTML Self close character sequence
 */
export const HTMLSelfClose = /^\/>/;

/**
 * `^!doctype`
 *
 * ---
 *
 * HTML !DOCTYPE tag name
 */
export const HTMLDoctype = /^!doctype/i;

/**
 * `^\bscript`
 *
 * ---
 *
 * HTML script tag Name
 */
export const HTMLScriptName = /^\bscript/i;

/**
 * `^\bstyle`
 *
 * ---
 *
 * HTML style tag name
 */
export const HTMLStyleName = /^\bstyle/i;

/**
 * `^[^\s"'{%></=\x00-\x0F\x7F\x80-\x9F]+`
 *
 * ---
 *
 * HTML Tag Attribute
 *
 * - Regex Expression lifted from vscode-html-languageservice
 */
export const HTMLAttribute = /^[^\s"'{%></=\x00-\x0F\x7F\x80-\x9F]+/;

/**
 * `^[^\s"'\x60=<>]+`
 *
 * ---
 *
 * HTML Non-string quoted attribute value
 *
 * - Regex Expression lifted from vscode-html-languageservice
 */
export const HTMLAttributeValue = /^[^\s"'\x60=<>]+/;

/**
 * `(module|(text|application)\/(java|ecma)script|text\/babel)`
 *
 * ---
 *
 * HTML script tag attributes
 *
 * - Regex Expression lifted from vscode-html-languageservice
 */
export const HTMLAttributeJS = /(module|(text|application)\/(java|ecma)script|text\/babel)/i;

/**
 * `application\/(?:ld\+)?json`
 *
 * ---
 *
 * HTML json script tag attributes
 */
export const HTMLAttributeJSON = /application\/(ld\+)?json/i;

/**
 * `(area|br|base|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)`
 *
 * ---
 *
 * HTML Void tags
 *
 * @todo
 * Ensure all void tags are covered
 */
export const HTMLVoidTags = (

  /(area|br|base|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)/i

);
