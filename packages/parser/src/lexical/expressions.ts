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

export const Expressions = {
  /**
   *
   */
  Newlines                  : /^[\n\r\f\v]/,
  /**
   *
   */
  Whitespace                : /^[ \t]/,
  /**
   *
   */
  Boolean                   : /true|false|nil/,
  /**
   *
   */
  Integer                   : /^-?\d+/,
  /**
   *
   */
  Float                     : /^-?\d[\d.]+/,
  /**
   *
   */
  Digit                     : /^\d+/,
  /**
   *
   */
  Keyword                   : /^[$\w]+/,
  /**
   *
   */
  StringQuotations          : /^['"]/,
  /**
   *
   */
  Delimiters                : /[{<>]/,
  /**
   *
   */
  DelimitersOpen            : /^{[{%]/,
  /**
   *
   */
  DelimitersOpenTag         : /^{%-?/,
  /**
   *
   */
  DelimitersOpenOutput      : /^{{2}-?/,
  /**
   *
   */
  DelimitersCloseTag        : /^%}/,
  /**
   *
   */
  DelimitersCloseOutput     : /^}{2}/,
  /**
   *
   */
  DelimitersClose           : /^[%}]}/,
  /**
   *
   */
  TagName                   : /^[^\d][$\w]*/,
  /**
   *
   */
  TagClosePathClear         : /^\s*?-?[%}]/,
  /**
   *
   */
  TagFirstCharacter         : /^[$\w]/i,
  /**
   *
   */
  TagEndKeyword             : /^end/i,
  /**
   *
   */
  CommentTagEnd             : /{%-?\s*?endcomment/i,
  /**
   *
   */
  RawTagEnd                 : /{%-?\s*?endraw/i,
  /**
   *
   */
  OperatorControl           : /==|!=|>=|<=|<|>|and|or/i,
  /**
   *
   */
  OperatorIteration         : /^in/,
  /**
   *
   */
  PropertyNotation          : /^\s*?[[.]/,
  /**
   *
   */
  PropertyValue             : /^[$\w-]+/,
  /**
   *
   */
  PropertyBrackets          : /^[[\]]/,
  /**
   *
   */
  FilterPipeOrClose         : /\||-?[%}]/,
  /**
   *
   */
  HTMLTagName               : /^[:\w][:\w-]*/,
  /**
   *
   */
  HTMLTagEndName            : /^[^\s"'>]*/,
  /**
   *
   */
  HTMLSelfClose             : /^\/>/,
  /**
   *
   */
  HTMLAttributeName         : /^[^\s"'{%}></=\x00-\x0F\x7F\x80-\x9F]+/,
  /**
   *
   */
  HTMLAttributeValue        : /^[^\s"'\x60=<>]+/,
  /**
   *
   */
  HTMLDoctypeKeyword        : /^!doctype/i,
  /**
   *
   */
  HTMLScriptTagName         : /^script/i,
  /**
   *
   */
  HTMLScriptTagEnd          : /^<\/?script/i,
  /**
   *
   */
  HTMLStyleTagName          : /^style/i,
  /**
   *
   */
  HTMLStyleTagEnd           : /^<\/?style/i,
  /**
   *
   */
  HTMLAttributeJS           : /module|(?:text|application)\/(?:java|ecma)script|text\/babel/i,
  /**
   *
   */
  HTMLAttributeJSON         : /application\/(?:ld\+)?json/i,
  /**
   *
   */
  HTMLCommentDelimiterOpen  : /^<!-{2}/,
  /**
   *
   */
  HTMLCommentDelimiterClose : /^-{2}>/,
  /**
   *
   */
  YAMLFrontmatterDelimiter  : /^-{3}/

};
