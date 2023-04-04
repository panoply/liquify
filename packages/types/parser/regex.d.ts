/**
 * `[^'"[\s\]{}|!:,.<=>-]*?$`
 *
 * ---
 *
 * Captures before boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
declare const WordBoundaryBefore: RegExp;
/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures after boundary of words. Used by
 * Liquid Language Server in hover capabilities.
 *
 */
declare const WordBoundaryAfter: RegExp;
/**
 * `^[\n\r\f\v]`
 *
 * ---
 *
 * Captures Newline characters only
 *
 */
declare const Newlines: RegExp;
/**
 * `^[ \t]`
 *
 * ---
 *
 * Whitespace characters
 *
 */
declare const Whitespace: RegExp;
/**
 * `^(?:true|false|nil)`
 *
 * ---
 *
 * Captures word bounded "true", "false" boolean
 *
 */
declare const Boolean: RegExp;
/**
 * `^-?[\d.]+`
 *
 * ---
 *
 * Greedy combined capture of integer and float
 *
 */
declare const Number: RegExp;
/**
 * `^-?\d+`
 *
 * ---
 *
 * Greedy integer number capture
 *
 */
declare const Integer: RegExp;
/**
 * `^-?\d[\d.]+`
 *
 * ---
 *
 * Greedy float number capture
 *
 */
declare const Float: RegExp;
/**
 * `^\d+`
 *
 * ---
 *
 * Digit only capture (greedy)
 *
 */
declare const Digit: RegExp;
/**
 * `^[0-9]+$`
 *
 * ---
 *
 * Numeric digit capture exclusive
 *
 */
declare const DigitOnly: RegExp;
/**
 * `^['"]`
*
* ---
*
* Single captures of string quotation characters
*
*/
declare const StringQuotations: RegExp;
/**
 * `[{<>]`
 *
 * ---
 *
 * Considered the starting points for tags
 */
declare const Delimiters: RegExp;
/**
 * `^{[{%]`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
declare const DelimitersOpen: RegExp;
/**
 * `^{%-?`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
declare const DelimitersOpenTag: RegExp;
/**
 * `^{{-?`
 *
 * ---
 *
 * Open delimiters for Liquid object tags.
 *
 */
declare const DelimitersOpenOutput: RegExp;
/**
 * `^-?%}`
 *
 * ---
 *
 * Open delimiters for Liquid basic tags
 *
 */
declare const DelimitersCloseTag: RegExp;
/**
 * `^-?}}`
 *
 * ---
 *
 * Close delimiters for Liquid output tags.
 *
 */
declare const DelimitersCloseOutput: RegExp;
/**
 * `^[%}]}`
 *
 * ---
 *
 * Close delimiters for Liquid basic and object tags
 *
 */
declare const DelimitersClose: RegExp;
/**
 * `^[a-zA-Z_]+`
 *
 * ---
 *
 * Alpha keyword/name capture
 *
 */
declare const KeywordAlpha: RegExp;
/**
 * `^[$\w][$\w-]+`
 *
 * ---
 *
 * Alphanumeric keyword capture
 *
 */
declare const KeywordAlphaNumeric: RegExp;
/**
 * `^\s*?-?[%}]`
 *
 * ---
 *
 * Captures a clear closing delimiter path
 *
 */
declare const TagCloseClear: RegExp;
/**
 * `^-?\s*?end`
 *
 * ---
 *
 * Captures a Liquid end tag
 *
 */
declare const TagEnder: RegExp;
/**
 * `{%-?\s*?endcomment`
 *
 * ---
 *
 * Captures a Liquid comment end tag
 *
 */
declare const CommentTagEnd: RegExp;
/**
 * `{%-?\s*?endraw`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
declare const RawTagEnd: RegExp;
/**
 * `{%-?\s*?endschema`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
declare const SchemaTagEnd: RegExp;
/**
 * `{%-?\s*?endstyle`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
declare const StyleTagEnd: RegExp;
/**
 * `{%-?\s*?endstylesheet`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
declare const StylesheetTagEnd: RegExp;
/**
 * `{%-?\s*?endjavascript`
 *
 * ---
 *
 * Captures a Liquid raw end tag
 *
 */
declare const JavascriptTagEnd: RegExp;
/**
 * `^end`
 *
 * ---
 *
 * Captures an `end` keyword
 *
 */
declare const KeywordEnd: RegExp;
/**
 * `^empty`
 *
 * ---
 *
 * Captures an `empty` keyword
 *
 */
declare const KeywordEmpty: RegExp;
/**
 * `^blank`
 *
 * ---
 *
 * Captures an `blank` keyword
 *
 */
declare const KeywordBlank: RegExp;
/**
 * `^else`
 *
 * ---
 *
 * Captures an `else` keyword
 *
 */
declare const KeywordElse: RegExp;
/**
 * `^in`
 *
 * ---
 *
 * Captures an `in` keyword
 *
 */
declare const OperatorIteration: RegExp;
/**
 * `==|!=|>=|<=|<|>|and|or`
 *
 * ---
 *
 * Captures control condition operators
 *
 */
declare const OperatorControl: RegExp;
/**
 * `^\s*?[[.]`
 *
 * ---
 *
 * Captures an object property notational character
 *
 */
declare const PropertyNotation: RegExp;
/**
 *
 * `^[$\w-]+`
 *
 * ---
 *
 * Captures the property value
 */
declare const PropertyValue: RegExp;
/**
 * `^[[\]]`
 *
 * ---
 *
 * Captures bracket notations
 *
 */
declare const PropertyBrackets: RegExp;
/**
 * `^['"\d-]|^(?:true|false)\b`
 *
 * ---
 *
 * Used to break out of an argument parameter walk
 *
 */
declare const ParameterBreak: RegExp;
/**
 * `^[:\w][:\w-]*`
 *
 * ---
 *
 * Captures a HTML tag name
 *
 */
declare const HTMLTagName: RegExp;
/**
 * `^[^\s"'>]*`
 *
 * ---
 *
 * Captures HTML end tag name
 *
 */
declare const HTMLTagEndName: RegExp;
/**
 * `^\/>`
 *
 * ---
 *
 * Captures HTML self closing delimiters
 *
 */
declare const HTMLSelfClose: RegExp;
/**
 * `^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+`
 *
 * ---
 *
 * Captures HTML attribute name, excludes Liquid delimiters
 *
 */
declare const HTMLAttributeName: RegExp;
/**
 * `^[^\s"'\x60=<>]+`
 *
 * ---
 *
 * Captures HTML attribute value, excludes Liquid delimiters
 *
 */
declare const HTMLAttributeValue: RegExp;
/**
 * `^!doctype`
 *
 * ---
 *
 * Captures HTML doctype keyword
 *
 */
declare const HTMLDoctypeKeyword: RegExp;
/**
 * `^script`
 *
 * ---
 *
 * Captures HTML script keyword
 *
 */
declare const HTMLScriptTagName: RegExp;
/**
 * `^<\/?script`
 *
 * ---
 *
 * Captures HTML closing script tag
 *
 */
declare const HTMLScriptTagEnd: RegExp;
/**
 * `^style`
 *
 * ---
 *
 * Captures HTML style keyword
 *
 */
declare const HTMLStyleTagName: RegExp;
/**
 * `^<\/?style`
 *
 * ---
 *
 * Captures HTML closing style tag
 *
 */
declare const HTMLStyleTagEnd: RegExp;
/**
 * `module|(?:text|application)\/(?:java|ecma)script|text\/babel`
 *
 * ---
 *
 * Captures HTML JavaScript Attribute value
 *
 */
declare const HTMLAttributeJS: RegExp;
/**
 * `application\/(?:ld\+)?json`
 *
 * ---
 *
 * Captures HTML JSON attribute value
 *
 */
declare const HTMLAttributeJSON: RegExp;
/**
 * `^<!-{2}`
 *
 * ---
 *
 * Captures HTML opening comment tag delimiter
 *
 */
declare const HTMLCommentDelimiterOpen: RegExp;
/**
 * `^-{2}>`
 *
 * ---
 *
 * Captures HTML closing comment tag delimiter
 *
 */
declare const HTMLCommentDelimiterClose: RegExp;
/**
 * `^-{3}`
 *
 * ---
 *
 * Captures YAML Frontmatter delimiters
 *
 */
declare const YAMLFrontmatterDelimiter: RegExp;
/**
 *
 */
declare const HTMLVoids: RegExp;

export { Boolean, CommentTagEnd, Delimiters, DelimitersClose, DelimitersCloseOutput, DelimitersCloseTag, DelimitersOpen, DelimitersOpenOutput, DelimitersOpenTag, Digit, DigitOnly, Float, HTMLAttributeJS, HTMLAttributeJSON, HTMLAttributeName, HTMLAttributeValue, HTMLCommentDelimiterClose, HTMLCommentDelimiterOpen, HTMLDoctypeKeyword, HTMLScriptTagEnd, HTMLScriptTagName, HTMLSelfClose, HTMLStyleTagEnd, HTMLStyleTagName, HTMLTagEndName, HTMLTagName, HTMLVoids, Integer, JavascriptTagEnd, KeywordAlpha, KeywordAlphaNumeric, KeywordBlank, KeywordElse, KeywordEmpty, KeywordEnd, Newlines, Number, OperatorControl, OperatorIteration, ParameterBreak, PropertyBrackets, PropertyNotation, PropertyValue, RawTagEnd, SchemaTagEnd, StringQuotations, StyleTagEnd, StylesheetTagEnd, TagCloseClear, TagEnder, Whitespace, WordBoundaryAfter, WordBoundaryBefore, YAMLFrontmatterDelimiter };
