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

  $keyword      : [ /[a-zA-Z0-9$_-]+/ ],
  $operator     : [ /(?:==|!=|>=|<=|<|>|\b(?:or|and|contains)\b)/ ],
  $array        : [ /\[[0-9]+\]/ ],
  $property     : [ /\.[a-zA-Z]/ ],
  $range        : [ /\([0-9]{1,9}.{2}[0-9]{1,9}\)/ ],
  $number       : [ /[0-9]/ ],
  $quotes       : [ /["']/ ],
  $single_quote : [ /'/ ],
  $double_quote : [ /"/ ],
  $boolean      : [ /\btrue|false\b/ ],
  $colon        : [ /:/ ],
  $comma        : [ /,/ ],
  $equal        : [ /=/ ],
  $pipe         : [ /\|/ ],
  $dot          : [ /\./ ],
  $parenthesis  : [ /\(/, /\)/ ]

}
