/**
 * `^[\n\r\f\v]`
 */
export const Newlines = /^[\n\r\f\v]/;

/**
 * `^[ \t]`
 */
export const Whitespace = /^[ \t]/;

/**
 * `^(?:true|false|nil)`
 */
export const Boolean = /^(?:true|false|nil)\s?/;

/**
 * `^-?[\d.]+`
 */
export const Number = /^-?\d[\d.]*/;

/**
 * `^-?\d+`
 */
export const Integer = /^-?\d+/;

/**
 * `^-?\d[\d.]+`
 */
export const Float = /^-?\d[\d.]*/;

/**
 * `^\d+`
 */
export const Digit = /^\d+/;

/**
 * `^['"]`
 */
export const StringQuotations = /^['"]/;

/**
 * `[{<>]`
 */
export const Delimiters = /[{<>]/;

/**
 * `^{[{%]`
 */
export const DelimitersOpen = /^{[{%]/;

/**
 * `^{%-?`
 */
export const DelimitersOpenTag = /^{%-?/;

/**
 * `^{{2}-?`
 */
export const DelimitersOpenOutput = /^{{-?/;

/**
 * `^%}`
 */
export const DelimitersCloseTag = /^%}/;

/**
 * `^}{2}`
 */
export const DelimitersCloseOutput = /^}}/;

/**
 * `^[%}]}`
 */
export const DelimitersClose = /^[%}]}/;

/**
 * `^[a-zA-Z_]+`
 */
export const TagAlphaName = /^[a-zA-Z_]+/;

/**
 * `^[$\w][$\w-]+`
 */
export const TagOutputName = /^[$\w][$\w-]*/;

/**
 * `^\s*?-?[%}]`
 */
export const TagCloseClear = /^\s*?-?[%}]/;

/**
 * `^-?\s*?end`
 */
export const TagEnder = /^-?\s*?end/i;
/**
 * `{%-?\s*?endcomment`
 */
export const CommentTagEnd = /{%-?\s*?endcomment/i;
/**
 * `{%-?\s*?endraw`
 */
export const RawTagEnd = /{%-?\s*?endraw/i;
/**
 * `^end`
 */
export const KeywordEnd = /^end/i;
/**
 * `^empty`
 */
export const KeywordEmpty = /^empty/;

/**
 * `^in`
 */
export const OperatorIteration = /^in/;

/**
 * `==|!=|>=|<=|<|>|and|or`
 */
export const OperatorControl = /^(?:==|!=|>=|<=|<|>|and|or)/;

/**
 * `^\s*?[[.]`
 */
export const PropertyNotation = /^\s*?[[.]/;

/**
 * `^[$\w-]+`
 */
export const PropertyValue = /^[$\w-]+/;

/**
 * `^[[\]]`
 */
export const PropertyBrackets = /^[[\]]/;

/**
 * `^[:\w][:\w-]*`
 */
export const HTMLTagName = /^[:\w][:\w-]*/;

/**
 * `^[^\s"'>]*`
 */
export const HTMLTagEndName = /^[^\s"'>]*/;

/**
 * `^\/>`
 */
export const HTMLSelfClose = /^\/>/;

/**
 * `^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+`
 */
export const HTMLAttributeName = /^[^\s{%}"'></=\x00-\x0F\x7F\x80-\x9F]+/;

/**
 * `^[^\s"'\x60=<>]+`
 */
export const HTMLAttributeValue = /^[^\s{%}"'\x60=<>]+/;

/**
 * `^!doctype`
 */
export const HTMLDoctypeKeyword = /^!doctype/i;

/**
 * `^script`
 */
export const HTMLScriptTagName = /^script/i;

/**
 * `^<\/?script`
 */
export const HTMLScriptTagEnd = /^<\/?script/i;

/**
 * `^style`
 */
export const HTMLStyleTagName = /^style/i;

/**
 * `^<\/?style`
 */
export const HTMLStyleTagEnd = /^<\/?style/i;

/**
 * `module|(?:text|application)\/(?:java|ecma)script|text\/babel`
 */
export const HTMLAttributeJS = /module|(?:text|application)\/(?:java|ecma)script|text\/babel/i;

/**
 * `application\/(?:ld\+)?json`
 */
export const HTMLAttributeJSON = /application\/(?:ld\+)?json/i;

/**
 * `^<!-{2}`
 */
export const HTMLCommentDelimiterOpen = /^<!-{2}/;

/**
 * `^-{2}>`
 */
export const HTMLCommentDelimiterClose = /^-{2}>/;

/**
 * `^-{3}`
 */
export const YAMLFrontmatterDelimiter = /^-{3}/;

/**
 *
 */
export const HTMLVoidTags = /(?:area|br|base|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)/i;
