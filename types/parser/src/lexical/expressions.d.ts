/**
 * `[^'"[\s\]{}|!:,.<=>-]*?$`
 *
 * ---
 *
 * Captures before boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
export declare const WordBoundaryBefore: RegExp;
/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures after boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
export declare const WordBoundaryAfter: RegExp;
/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures Newline characters only
 *
 */
export declare const Newlines: RegExp;
/**
 * `^[ \t]`
 *
 * ---
 *
 * Whitespace characters
 *
 */
export declare const Whitespace: RegExp;
/**
 * `^(?:true|false|nil)`
 *
 * ---
 *
 * Captures word bounded "true", "false" boolean
 *
 */
export declare const Boolean: RegExp;
/**
 * `^-?[\d.]+`
 *
 * ---
 *
 * Greedy combined capture of integer and float
 *
 */
export declare const Number: RegExp;
/**
 * `^-?\d+`
 *
 * ---
 *
 * Greedy integer number capture
 *
 */
export declare const Integer: RegExp;
/**
 * `^-?\d[\d.]+`
 *
 * ---
 *
 * Greedy float number capture
 *
 */
export declare const Float: RegExp;
/**
 * `^\d+`
 *
 * ---
 *
 * Digit only capture (greedy)
 *
 */
export declare const Digit: RegExp;
/**
 * `^['"]`
*
 * ---
 *
 * Single captures of string quotation characters
 *
 */
export declare const StringQuotations: RegExp;
/**
 * `[{<>]`
 *
 * ---
 *
 * Considered the starting points for tags
 */
export declare const Delimiters: RegExp;
/**
 * `^{[{%]`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export declare const DelimitersOpen: RegExp;
/**
 * `^{%-?`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export declare const DelimitersOpenTag: RegExp;
/**
 * `^{{-?`
 *
 * ---
 *
 * Open delimiters for Liquid object tags.
 *
 */
export declare const DelimitersOpenOutput: RegExp;
/**
 * `^-?%}`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
export declare const DelimitersCloseTag: RegExp;
/**
 * `^-?}}`
 *
 * ---
 *
 * Close delimiters for Liquid output tags.
 *
 */
export declare const DelimitersCloseOutput: RegExp;
/**
 * `^[%}]}`
 *
 * ---
 *
 * Close delimiters for Liquid basic and object tags
 *
 */
export declare const DelimitersClose: RegExp;
/**
 * `^[a-zA-Z_]+`
 *
 * ---
 *
 * Alpha keyword/name capture
 *
 */
export declare const KeywordAlpha: RegExp;
/**
 * `^[$\w][$\w-]+`
 *
 * ---
 *
 * Alphanumeric keyword capture
 *
 */
export declare const KeywordAlphaNumeric: RegExp;
/**
 * `^\s*?-?[%}]`
 *
 * ---
 *
 * Captures a clear closing delimiter path
 *
 */
export declare const TagCloseClear: RegExp;
/**
 * `^-?\s*?end`
 *
 * ---
 *
 * Captures a Liquid end tag
 *
 */
export declare const TagEnder: RegExp;
/**
 * `{%-?\s*?endcomment`
 *
 * ---
 *
 * Captures a Liquid comment end tag
 *
 */
export declare const CommentTagEnd: RegExp;
/**
 * `{%-?\s*?endraw`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export declare const RawTagEnd: RegExp;
/**
 * `{%-?\s*?endschema`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export declare const SchemaTagEnd: RegExp;
/**
 * `{%-?\s*?endstyle`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export declare const StyleTagEnd: RegExp;
/**
 * `{%-?\s*?endstylesheet`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export declare const StylesheetTagEnd: RegExp;
/**
 * `{%-?\s*?endjavascript`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
export declare const JavascriptTagEnd: RegExp;
/**
 * `^end`
 *
 * ---
 *
 * Captures an `end` keyword
 *
 */
export declare const KeywordEnd: RegExp;
/**
 * `^empty`
 *
 * ---
 *
 * Captures an `empty` keyword
 *
 */
export declare const KeywordEmpty: RegExp;
/**
 * `^else`
 *
 * ---
 *
 * Captures an `else` keyword
 *
 */
export declare const KeywordElse: RegExp;
/**
 * `^in`
 *
 * ---
 *
 * Captures an `in` keyword
 *
 */
export declare const OperatorIteration: RegExp;
/**
 * `==|!=|>=|<=|<|>|and|or`
 *
 * ---
 *
 * Captures control condition operators
 *
 */
export declare const OperatorControl: RegExp;
/**
 * `^\s*?[[.]`
 *
 * ---
 *
 * Captures an object property notational character
 *
 */
export declare const PropertyNotation: RegExp;
/**
 * `^[$\w-]+`
 */
export declare const PropertyValue: RegExp;
/**
 * `^[[\]]`
 *
 * ---
 *
 * Captures bracket notations
 *
 */
export declare const PropertyBrackets: RegExp;
/**
 * `^['"\d-]|^(?:true|false)\b`
 *
 * ---
 *
 * Used to break out of an argument parameter walk
 *
 */
export declare const ParameterBreak: RegExp;
/**
 * `^[:\w][:\w-]*`
 *
 * ---
 *
 * Captures a HTML tag name
 *
 */
export declare const HTMLTagName: RegExp;
/**
 * `^[^\s"'>]*`
 *
 * ---
 *
 * Captures HTML end tag name
 *
 */
export declare const HTMLTagEndName: RegExp;
/**
 * `^\/>`
 *
 * ---
 *
 * Captures HTML self closing delimiters
 *
 */
export declare const HTMLSelfClose: RegExp;
/**
 * `^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+`
 *
 * ---
 *
 * Captures HTML attribute name, excludes Liquid delimiters
 *
 */
export declare const HTMLAttributeName: RegExp;
/**
 * `^[^\s"'\x60=<>]+`
 *
 * ---
 *
 * Captures HTML attribute value, excludes Liquid delimiters
 *
 */
export declare const HTMLAttributeValue: RegExp;
/**
 * `^!doctype`
 *
 * ---
 *
 * Captures HTML doctype keyword
 *
 */
export declare const HTMLDoctypeKeyword: RegExp;
/**
 * `^script`
 *
 * ---
 *
 * Captures HTML script keyword
 *
 */
export declare const HTMLScriptTagName: RegExp;
/**
 * `^<\/?script`
 *
 * ---
 *
 * Captures HTML closing script tag
 *
 */
export declare const HTMLScriptTagEnd: RegExp;
/**
 * `^style`
 *
 * ---
 *
 * Captures HTML style keyword
 *
 */
export declare const HTMLStyleTagName: RegExp;
/**
 * `^<\/?style`
 *
 * ---
 *
 * Captures HTML closing style tag
 *
 */
export declare const HTMLStyleTagEnd: RegExp;
/**
 * `module|(?:text|application)\/(?:java|ecma)script|text\/babel`
 *
 * ---
 *
 * Captures HTML JavaScript Attribute value
 *
 */
export declare const HTMLAttributeJS: RegExp;
/**
 * `application\/(?:ld\+)?json`
 *
 * ---
 *
 * Captures HTML JSON attribute value
 *
 */
export declare const HTMLAttributeJSON: RegExp;
/**
 * `^<!-{2}`
 *
 * ---
 *
 * Captures HTML opening comment tag delimiter
 *
 */
export declare const HTMLCommentDelimiterOpen: RegExp;
/**
 * `^-{2}>`
 *
 * ---
 *
 * Captures HTML closing comment tag delimiter
 *
 */
export declare const HTMLCommentDelimiterClose: RegExp;
/**
 * `^-{3}`
 *
 * ---
 *
 * Captures YAML Frontmatter delimiters
 *
 */
export declare const YAMLFrontmatterDelimiter: RegExp;
/**
 *
 */
export declare const HTMLVoidTags: RegExp;
