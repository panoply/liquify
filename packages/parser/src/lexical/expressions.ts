/**
 * `[^'"[\s\]{}|!:,.<=>-]*?$`
 *
 * ---
 *
 * Captures before boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
export const WordBoundaryBefore = /[^'"[\s\]{}|!:,.<=>]*?$/;

/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures after boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
export const WordBoundaryAfter = /['"[\s\]{}|!:,.<=>]/;

/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures Newline characters only
 *
 */
export const Newlines = /^[\n\r\f\v]/;

/**
 * `^[ \t]`
 *
 * ---
 *
 * Whitespace characters
 *
 */
export const Whitespace = /^[ \t]/;

/**
 * `^(?:true|false|nil)`
 *
 * ---
 *
 * Captures word bounded "true", "false" boolean
 *
 */
export const Boolean = /^(?:true|false)\b/;

/**
 * `^-?[\d.]+`
 *
 * ---
 *
 * Greedy combined capture of integer and float
 *
 */
export const Number = /^-?\d[\d.]*/;

/**
 * `^-?\d+`
 *
 * ---
 *
 * Greedy integer number capture
 *
 */
export const Integer = /^-?\d+/;

/**
 * `^-?\d[\d.]+`
 *
 * ---
 *
 * Greedy float number capture
 *
 */
export const Float = /^-?\d[\d.]*\d/;

/**
 * `^\d+`
 *
 * ---
 *
 * Digit only capture (greedy)
 *
 */
export const Digit = /^\d+/;

/**
 * `^['"]`
*
 * ---
 *
 * Single captures of string quotation characters
 *
 */
export const StringQuotations = /^['"]/;

/**
 * `[{<>]`
 *
 * ---
 *
 * Considered the starting points for tags
 */
export const Delimiters = /[{<>]/;

/**
 * `^{[{%]`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export const DelimitersOpen = /^{[{%]/;

/**
 * `^{%-?`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export const DelimitersOpenTag = /^{%-?/;

/**
 * `^{{-?`
 *
 * ---
 *
 * Open delimiters for Liquid object tags.
 *
 */
export const DelimitersOpenOutput = /^{{-?/;

/**
 * `^-?%}`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export const DelimitersCloseTag = /^-?%}/;

/**
 * `^-?}}`
 *
 * ---
 *
 * Close delimiters for Liquid output tags.
 *
 */
export const DelimitersCloseOutput = /^-?}}/;

/**
 * `^[%}]}`
 *
 * ---
 *
 * Close delimiters for Liquid basic and object tags
 *
 */
export const DelimitersClose = /^[%}]}/;

/**
 * `^[a-zA-Z_]+`
 *
 * ---
 *
 * Alpha keyword/name capture
 *
 */
export const KeywordAlpha = /^[a-zA-Z_]+/;

/**
 * `^[$\w][$\w-]+`
 *
 * ---
 *
 * Alphanumeric keyword capture
 *
 */
export const KeywordAlphaNumeric = /^[$\w][$\w-]*/;

/**
 * `^\s*?-?[%}]`
 *
 * ---
 *
 * Captures a clear closing delimiter path
 *
 */
export const TagCloseClear = /^\s*?-?[%}]/;

/**
 * `^-?\s*?end`
 *
 * ---
 *
 * Captures a Liquid end tag
 *
 */
export const TagEnder = /^-?\s*?end/i;

/**
 * `{%-?\s*?endcomment`
 *
 * ---
 *
 * Captures a Liquid comment end tag
 *
 */
export const CommentTagEnd = /{%-?\s*?endcomment\b/;

/**
 * `{%-?\s*?endraw`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export const RawTagEnd = /{%-?\s*?endraw\b/;

/**
 * `{%-?\s*?endschema`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export const SchemaTagEnd = /{%-?\s*?endschema\b/;

/**
 * `{%-?\s*?endstyle`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export const StyleTagEnd = /{%-?\s*?endstyle\b/;

/**
 * `{%-?\s*?endstylesheet`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export const StylesheetTagEnd = /{%-?\s*?endstylesheet\b/;

/**
 * `{%-?\s*?endjavascript`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export const JavascriptTagEnd = /{%-?\s*?endjavascript\b/;

/**
 * `^end`
 *
 * ---
 *
 * Captures an `end` keyword
 *
 */
export const KeywordEnd = /^end/;

/**
 * `^empty`
 *
 * ---
 *
 * Captures an `empty` keyword
 *
 */
export const KeywordEmpty = /^empty/;

/**
 * `^blank`
 *
 * ---
 *
 * Captures an `blank` keyword
 *
 */
export const KeywordBlank = /^blank\b/;

/**
 * `^else`
 *
 * ---
 *
 * Captures an `else` keyword
 *
 */
export const KeywordElse = /^else\b/;

/**
 * `^in`
 *
 * ---
 *
 * Captures an `in` keyword
 *
 */
export const OperatorIteration = /^in/;

/**
 * `==|!=|>=|<=|<|>|and|or`
 *
 * ---
 *
 * Captures control condition operators
 *
 */
export const OperatorControl = /^(?:[!=]=|[<>]=?|(?:and|or|contains)\b)/;

/**
 * `^\s*?[[.]`
 *
 * ---
 *
 * Captures an object property notational character
 *
 */
export const PropertyNotation = /^\s*?[[.]/;

/**
 *
 * `^[$\w-]+`
 *
 * ---
 *
 * Captures the property value
 */
export const PropertyValue = /^[$\w-]+/;

/**
 * `^[[\]]`
 *
 * ---
 *
 * Captures bracket notations
 *
 */
export const PropertyBrackets = /^[[\]]/;

/**
 * `^['"\d-]|^(?:true|false)\b`
 *
 * ---
 *
 * Used to break out of an argument parameter walk
 *
 */
export const ParameterBreak = /^(?:['"\d-]|(?:true|false)\b)/;

/**
 * `^[:\w][:\w-]*`
 *
 * ---
 *
 * Captures a HTML tag name
 *
 */
export const HTMLTagName = /^[:\w][:\w-]*/;

/**
 * `^[^\s"'>]*`
 *
 * ---
 *
 * Captures HTML end tag name
 *
 */
export const HTMLTagEndName = /^[^\s"'>]*/;

/**
 * `^\/>`
 *
 * ---
 *
 * Captures HTML self closing delimiters
 *
 */
export const HTMLSelfClose = /^\/>/;

/**
 * `^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+`
 *
 * ---
 *
 * Captures HTML attribute name, excludes Liquid delimiters
 *
 */
export const HTMLAttributeName = /^[^\s{%}"'></=\x00-\x0F\x7F\x80-\x9F]+/;

/**
 * `^[^\s"'\x60=<>]+`
 *
 * ---
 *
 * Captures HTML attribute value, excludes Liquid delimiters
 *
 */
export const HTMLAttributeValue = /^[^\s{%}"'\x60=<>]+/;

/**
 * `^!doctype`
 *
 * ---
 *
 * Captures HTML doctype keyword
 *
 */
export const HTMLDoctypeKeyword = /^!doctype/i;

/**
 * `^script`
 *
 * ---
 *
 * Captures HTML script keyword
 *
 */
export const HTMLScriptTagName = /^script/i;

/**
 * `^<\/?script`
 *
 * ---
 *
 * Captures HTML closing script tag
 *
 */
export const HTMLScriptTagEnd = /^<\/?script/i;

/**
 * `^style`
 *
 * ---
 *
 * Captures HTML style keyword
 *
 */
export const HTMLStyleTagName = /^style/i;

/**
 * `^<\/?style`
 *
 * ---
 *
 * Captures HTML closing style tag
 *
 */
export const HTMLStyleTagEnd = /^<\/?style/i;

/**
 * `module|(?:text|application)\/(?:java|ecma)script|text\/babel`
 *
 * ---
 *
 * Captures HTML JavaScript Attribute value
 *
 */
export const HTMLAttributeJS = /module|(?:text|application)\/(?:java|ecma)script|text\/babel/i;

/**
 * `application\/(?:ld\+)?json`
 *
 * ---
 *
 * Captures HTML JSON attribute value
 *
 */
export const HTMLAttributeJSON = /application\/(?:ld\+)?json/i;

/**
 * `^<!-{2}`
 *
 * ---
 *
 * Captures HTML opening comment tag delimiter
 *
 */
export const HTMLCommentDelimiterOpen = /^<!-{2}/;

/**
 * `^-{2}>`
 *
 * ---
 *
 * Captures HTML closing comment tag delimiter
 *
 */
export const HTMLCommentDelimiterClose = /^-{2}>/;

/**
 * `^-{3}`
 *
 * ---
 *
 * Captures YAML Frontmatter delimiters
 *
 */
export const YAMLFrontmatterDelimiter = /^-{3}/;

/**
 *
 */
export const HTMLVoidTags = /(?:area|br|base|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)/i;
