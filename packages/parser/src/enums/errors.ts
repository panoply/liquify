export const enum ErrorLevel {
  /**
   * Reports an error.
   */
  Error = 1,
  /**
   * Reports a warning.
   */
  Warning = 2,
  /**
   * Reports an information.
   */
  Information = 3,
  /**
   * Reports a hint.
   */
  Hint = 4,
}

export const enum ParseError {
  /**
   * Tag name is missing
   *
   * @example
   * {% %}
   */
  MissingTagName = 1,
  /**
   * Object name is missing
   *
   * @example
   * {{ }}
   */
  MissingObjectName,
  /**
   * Object BracketNotation closer
   *
   * @example
   * {{ object["foo" }}
   */
  MissingBracketNotation,
  /**
   * Start Tag is missing
   *
   * @example
   * {% endtag %}
   */
  MissingStartTag,
  /**
   * End Tag is missing
   *
   * @example
   * {% if tag %}
   * {% else %}
   */
  MissingEndTag,
  /**
   * Missing Open Delimeters
   *
   * @example
   * tag %}
   * object -}}
   */
  MissingOpenDelimiter,
  /**
   * Missing close delimeter
   *
   * @example
   * {% tag %
   * {{ objects | filter: '' }
   */
  MissingCloseDelimiter,
  /**
   * Missing colon
   *
   * @example
   * {{ object | filter '' }}
   */
  MissingColon,
  /**
   * Missing Property
   *
   * @example
   * {{ object. }}
   */
  MissingProperty,
  /**
   * Missing Filter
   *
   * @example
   * {{ tag | }}
   */
  MissingFilter,

  /**
   * Missing Filter Arguments
   *
   * @example
   * {{ tag | replace }} // Replace is missing arguments
   */
  MissingFilterArgument,

  /**
   * Missing condition
   *
   * @example
   * {% if foo > %} // no condition after >
   * {%- unless -%} // missing condition
   */
  MissingCondition,
  /**
   * Missing Quotation
   *
   * @example
   * {% if x == 'foo %}
   */
  MissingQuotation,
  /**
   * Invalid Tag Name
   *
   * @example
   * {% #tag %} // # is invalid
   * {% 100 -%} // 100 is invalid
   * {% /tag/ %} // / is invalid
   */
  InvalidTagName,
  /**
   * Invalid Object Name
   *
   * @example
   * {{ #tag }} // # is invalid
   * {{ 100 }} // 100 is invalid
   */
  InvalidObjectName,

  /**
   * Invalid Property Notation
   *
   * @example
   * {{- object.%.prop -}} // "%" is invalid
   * {{- object.# -}} // "#" is invalid
   */
  InvalidProperty,

  /**
   * Invalid Property Notation
   *
   * @example
   * {{- object[var]"foo" -}} // "foo" is invalid
   * {{- object["prop"]foo -}} // foo is invalid
   */
  InvalidPropertyNotation,
  /**
   * Invalid Character
   *
   * @example
   * {% assign * = '' %} // * is invalid
   * {% - if foo == x %} // - is invalid
   * {{- tag | x = 1 -}} // = is invalid
   */
  InvalidCharacter,

  /**
   * Invalid Character
   *
   * @example
   * {% assign x foo = '' %} // foo is invalid
   * {% -- if foo == x %} // -- is invalid
   * {{- tag | x and 1 -}} // and is invalid
   */
  InvalidCharacters,

  /**
   * Invalid String Quotation match
   *
   * @example
   * {{ object["prop'] }}
   */
  InvalidQuotation,
  /**
   * Invalid Syntactic
   *
   * Thrown (generally) when the parser encounters a
   * child type tag incorrectly placed.
   *
   * @example
   * {% else %} // Invalid Syntactic
   * {% if foo %}
   * {% endif %}
   */
  InvalidSyntactic,
  /**
   * Invalid Operator
   *
   * @example
   * {% unless x << y %} // << is invalid
   * {%- if foo =! x -%} // =! is invalid
   */
  InvalidOperator,
  /**
   * Reject String
   *
   * @example
   * {% 'assign' = 'x' -%} // assign should not be string
   * {%- increment '1' -%} // increment should not be string
   */
  RejectString,
  /**
   * Reject Number
   *
   * @example
   * {{ 100 }} // number cannot be used as object name
   */
  RejectNumber,
  /**
   * Reject Boolean
   *
   * @example
   * {% for x in false %}
   */
  RejectBoolean,
  /**
   * Reject Array
   */
  RejectArray,
  /**
   * Reject Object
   */
  RejectObject,
  /**
   * Reject Parameters
   */
  RejectParameters,
  /**
   * Reject Filters
   */
  RejectFilters,
  /**
   * Reject Whitespace
   *
   * @example
   * {{ object['prop   '] }} // whitespace "\s\s\s" is not allowed
   */
  RejectWhitespace,
  /**
   * Reject Whitespace Control
   *
   * @example
   * {%- schema -%} // dash "-" is not allowed
   */
  RejectWhitespaceControl,
  /**
   * Warn Extrenous Whitespace
   *
   * @example
   * {{- foo.  prop -}}
   * {{- foo ['prop'] }}
   * {{- foo ['    prop'] }}
   */
  WarnWhitespace,
}
