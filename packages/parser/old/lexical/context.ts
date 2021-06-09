/**
 * Token Context
 *
 * Describes the inner context of Liquid tokens. It breaks down the
 * stack of each node as we walk over its inner characters.
 */
export const enum TokenContext {
  /**
   * Opening Delimiter: `{{` `{%` `<` `</` `---`
   */
  OpenTag = "open",

  /**
   * Closing Delimiter: `}}` `%}` `>` ` />` `---`
   */
  CloseTag = "close",

  /**
   * Left Whitespace Trim Dash: `-`
   */
  LeftTrim = "trim",

  /**
   * Right Whitespace Trim Dash: `-`
   */
  RightTrim = "trim",

  /**
   * Whitespace: `\s`
   */
  Whitespace = "whitespace",

  /**
   * Invalid: `\n`
   */
  Invalid = "invalid",

  /**
   * Newlines: `\n`
   */
  Newline = "newline",

  /**
   * The tag name
   */
  Identifier = "identifier",

  /**
   * Control Operators `!=|==|<|>|<=|=>|and|or|contains`
   */
  Operator = "operator",

  /**
   * Control Condition
   */
  Condition = "condition",

  /**
   * Iteration iteree value
   */
  Iteree = "iteree",

  /**
   * Assignment Character: `=` or `:`
   */
  Assignment = "assignment",

  /**
   * Variable value
   */
  Variable = "variable",

  /**
   * Filters and Keywords: `in` or `upcase`
   */
  Keyword = "keyword",

  /**
   * Seperator character: `,` or `|`
   */
  Separator = "seperator",

  /**
   * Value between:  `""` or `''`
   */
  String = "string",

  /**
   * Number Value: `1, 2, 3`
   */
  Number = "number",

  /**
   * Number Value: `1, 2, 3`
   */
  Integer = "integer",

  /**
   * Number Value: `1.12, -23.32, 3.22`
   */
  Float = "float",

  /**
   * Boolean Value: `true` or `false`
   */
  Boolean = "boolean",

  /**
   * An object value: `object.prop`
   */
  Object = "object",

  /**
   * An object property value: `object.prop`
   */
  Property = "property",

  /**
   * An object or array property bracket value: `[`
   */
  OpenBracket = "start",

  /**
   * An object or array property bracket value: `]`
   */
  CloseBracket = "end",

  /**
   * An object string property value: `object[name.prop]`
   */
  PropertyObject = "PropertyObject",

  /**
   * An object string property value: `object["prop"]`
   */
  PropertyString = "PropertyString",

  /**
   * Array value (used in iteration)
   */
  Array = "array",

  /**
   * Attribute HTML Name
   */
  Attribute = "attribute",

  /**
   * Range value (used in iteration): `(1..2)`
   */
  Range = "range",

  /**
   * Control Condition
   */
  Parameter = "parameter",

  /**
   * Empty Drop (used on objects)
   */
  EndTag = "end_tag",

  /**
   * Empty Drop (used on objects)
   */
  EmptyDrop = "EmptyDrop",
}
