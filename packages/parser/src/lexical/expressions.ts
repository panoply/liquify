/*

eslint "key-spacing": [2, {
  "multiLine": {
    "beforeColon": true,
    "afterColon":true,
    "mode": "minimum"
  },
  "align": {
    "beforeColon": true,
    "afterColon": true,
    "on": "colon"
  }
}]

*/

export const Regexp = {
  /**
   * `^[\n\r\f\v]`
   */
  Newlines                  : /^[\n\r\f\v]/,
  /**
   * `^[ \t]`
   */
  Whitespace                : /^[ \t]/,
  /**
   * `^(?:true|false|nil)`
   */
  Boolean                   : /^(?:true|false|nil)\s?/,
  /**
   * `^-?[\d.]+`
   */
  Number                    : /^-?\d[\d.]*/,
  /**
   * `^-?\d+`
   */
  Integer                   : /^-?\d+/,
  /**
   * `^-?\d[\d.]+`
   */
  Float                     : /^-?\d[\d.]*/,
  /**
   * `^\d+`
   */
  Digit                     : /^\d+/,
  /**
   * `^['"]`
   */
  StringQuotations          : /^['"]/,
  /**
   * `[{<>]`
   */
  Delimiters                : /[{<>]/,
  /**
   * `^{[{%]`
   */
  DelimitersOpen            : /^{[{%]/,
  /**
   * `^{%-?`
   */
  DelimitersOpenTag         : /^{%-?/,
  /**
   * `^{{2}-?`
   */
  DelimitersOpenOutput      : /^{{-?/,
  /**
   * `^%}`
   */
  DelimitersCloseTag        : /^%}/,
  /**
   * `^}{2}`
   */
  DelimitersCloseOutput     : /^}}/,
  /**
   * `^[%}]}`
   */
  DelimitersClose           : /^[%}]}/,
  /**
   * `^[a-zA-Z_]+`
   */
  TagAlphaName              : /^[a-zA-Z_]+/,
  /**
   * `^[$\w][$\w-]+`
   */
  TagOutputName             : /^[$\w][$\w-]*/,
  /**
   * `^\s*?-?[%}]`
   */
  TagCloseClear             : /^\s*?-?[%}]/,
  /**
   * `^-?\s*?end`
   */
  TagEnder                  : /^-?\s*?end/i,
  /**
   * `{%-?\s*?endcomment`
   */
  CommentTagEnd             : /{%-?\s*?endcomment/i,
  /**
   * `{%-?\s*?endraw`
   */
  RawTagEnd                 : /{%-?\s*?endraw/i,
  /**
   * `^end`
   */
  KeywordEnd                : /^end/i,
  /**
   * `^empty`
   */
  KeywordEmpty              : /^empty/,
  /**
   * `^in`
   */
  OperatorIteration         : /^in/,
  /**
   * `==|!=|>=|<=|<|>|and|or`
   */
  OperatorControl           : /^(?:==|!=|>=|<=|<|>|and|or)/,
  /**
   * `^\s*?[[.]`
   */
  PropertyNotation          : /^\s*?[[.]/,
  /**
   * `^[$\w-]+`
   */
  PropertyValue             : /^[$\w-]+/,
  /**
   * `^[[\]]`
   */
  PropertyBrackets          : /^[[\]]/,
  /**
   * `^[:\w][:\w-]*`
   */
  HTMLTagName               : /^[:\w][:\w-]*/,
  /**
   * `^[^\s"'>]*`
   */
  HTMLTagEndName            : /^[^\s"'>]*/,
  /**
   * `^\/>`
   */
  HTMLSelfClose             : /^\/>/,
  /**
   * `^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+`
   */
  HTMLAttributeName         : /^[^\s{%}"'></=\x00-\x0F\x7F\x80-\x9F]+/,
  /**
   * `^[^\s"'\x60=<>]+`
   */
  HTMLAttributeValue        : /^[^\s{%}"'\x60=<>]+/,
  /**
   * `^!doctype`
   */
  HTMLDoctypeKeyword        : /^!doctype/i,
  /**
   * `^script`
   */
  HTMLScriptTagName         : /^script/i,
  /**
   * `^<\/?script`
   */
  HTMLScriptTagEnd          : /^<\/?script/i,
  /**
   * `^style`
   */
  HTMLStyleTagName          : /^style/i,
  /**
   * `^<\/?style`
   */
  HTMLStyleTagEnd           : /^<\/?style/i,
  /**
   * `module|(?:text|application)\/(?:java|ecma)script|text\/babel`
   */
  HTMLAttributeJS           : /module|(?:text|application)\/(?:java|ecma)script|text\/babel/i,
  /**
   * `application\/(?:ld\+)?json`
   */
  HTMLAttributeJSON         : /application\/(?:ld\+)?json/i,
  /**
   * `^<!-{2}`
   */
  HTMLCommentDelimiterOpen  : /^<!-{2}/,
  /**
   * `^-{2}>`
   */
  HTMLCommentDelimiterClose : /^-{2}>/,
  /**
   * `^-{3}`
   */
  YAMLFrontmatterDelimiter  : /^-{3}/,
  /**
   *
   */
  HTMLVoidTags              : /(?:area|br|base|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)/i

};
