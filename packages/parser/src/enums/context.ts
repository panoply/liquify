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
   * Whitespace Delimeter Dash: `-`
   */
  Dash = "Dash",

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
  Identifier = "Indentifier",

  /**
   * Control Operators `!=|==|<|>|<=|=>|and|or`
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
   * An object value: `object.prop`
   */
  Property = "Property",

  /**
   * Array value (used in iteration)
   */
  Array = "Array",

  /**
   * Range value (used in iteration): `(1..2)`
   */
  Range = "Range",

  /**
   * Empty Drop (used on objects)
   */
  EmptyDrop = "EmptyDrop",
}
