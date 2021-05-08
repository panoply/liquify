/* eslint key-spacing: ["error", {
    "singleLine": {
        "beforeColon": true,
        "afterColon": true
    },
    "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
    }
}]
*/
export default {

  Keyword     : [ /[a-zA-Z0-9$_-]+/ ],
  Operator    : [ /(?:==|!=|>=|<=|<|>|\b(?:or|and|contains)\b)/ ],
  Array       : [ /\[[0-9]+\]/ ],
  Property    : [ /\.[a-zA-Z]/ ],
  Range       : [ /\([0-9]{1,9}.{2}[0-9]{1,9}\)/ ],
  Number      : [ /[0-9]/ ],
  Quotes      : [ /["']/ ],
  SingleQuote : [ /'/ ],
  DoubleQuote : [ /"/ ],
  Boolean     : [ /\btrue|false\b/ ],
  Colon       : [ /:/ ],
  Comma       : [ /,/ ],
  Equal       : [ /=/ ],
  Pipe        : [ /\|/ ],
  Dot         : [ /\./ ],
  Parenthesis : [ /\(/, /\)/ ]

}
