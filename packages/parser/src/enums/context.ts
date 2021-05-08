/**
 * Token Context
 *
 * Describes the inner context of Liquid tokens. Context is defined
 * within delimeter values. Tags (in general) will almost always start
 * with either `Dash` or `Indentifier`
 *
 * - Context starts from the opening delimeter, eg: `{{` or `{%`
 * - Context ends before the closing delimeter, eg: `}}` or `%}`
 */
export const enum TokenContext {
  /**
   * Trim Whitespace Delimeter Dash LEft: `-`
   */
  LeftTrim = "TrimLeft",

  /**
   * Trim Whitespace Delimeter Dash LEft: `-`
   */
  RightTrim = "TrimRight",

  /**
   * Whitespace: `\s`
   */
  Whitespace = "Whitespace",

  /**
   * Invalid: `\n`
   */
  Invalid = "Invalid",

  /**
   * Newlines: `\n`
   */
  Newline = "Newline",

  /**
   * The tag name
   */
  Identifier = "Identifier",

  /**
   * Control Operators `!=|==|<|>|<=|=>|and|or|contains`
   */
  Operator = "Operator",

  /**
   * Control Condition
   */
  Condition = "Condition",

  /**
   * Iteration iteree value
   */
  Iteree = "Iteree",

  /**
   * Assignment Character: `=` or `:`
   */
  Assignment = "Assignment",

  /**
   * Variable value
   */
  Variable = "Variable",

  /**
   * Filters and Keywords: `in` or `upcase`
   */
  Keyword = "Keyword",

  /**
   * Seperator character: `,` or `|`
   */
  Separator = "Seperator",

  /**
   * Value between:  `""` or `''`
   */
  String = "String",

  /**
   * Number Value: `1, 2, 3`
   */
  Number = "Number",

  /**
   * Boolean Value: `true` or `false`
   */
  Boolean = "Boolean",

  /**
   * An object value: `object.prop`
   */
  Object = "Object",

  /**
   * An object property value: `object.prop`
   */
  Property = "Property",

  /**
   * An object or array property bracket value: `[`
   */
  OpenBracket = "OpenBracket",

  /**
   * An object or array property bracket value: `]`
   */
  CloseBracket = "CloseBracket",

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
  Array = "Array",

  /**
   * Range value (used in iteration): `(1..2)`
   */
  Range = "Range",

  /**
   * Control Condition
   */
  Parameter = "Parameter",

  /**
   * Empty Drop (used on objects)
   */
  EmptyDrop = "EmptyDrop",
}
