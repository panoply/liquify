
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
  MissingOpenDelimeter,
  /**
   * Missing close delimeter
   *
   * @example
   * {% tag %
   * {{ objects | filter: '' }
   */
  MissingCloseDelimeter,
  /**
   * Missing colon
   *
   * @example
   * {{ object | filter '' }}
   */
  MissingColon,
  /**
   * Missing Propertty
   *
   * @example
   * {{ object. }}
   */
  MissingProperty,
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
   * Invalid Character
   *
   * @example
   * {% assign * = '' %} // * is invalid
   * {% - if foo == x %} // - is invalid
   * {{- tag | x = 1 -}} // = is invalid
   */
  InvalidCharacter,
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
   * {% 'assign' = 'x' -%} // asssign should not be string
   * {%- increment '1' -%} // increment should not be string
   */
  RejectString,
  /**
   * Reject Number
   */
  RejectNumber,
  /**
   * Reject Boolean
   *
   * @example
   * {% for x in false }}
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
   * Reject Whitespace Control
   *
   * @example
   * {%- schema -%} // dash "-" is not allowed
   */
  RejectWhitespaceControl
}


