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
export const enum TokenStack {
  /**
   * Trim Whitespace Delimeter Dash Left: `-`
   */
  TrimLeft = "trim_left",

  /**
   * Trim Whitespace Delimeter Dash Right: `-`
   */
  TrimRight = "trim_right",

  /**
   * Trim Whitespace Delimeter Dash LEft: `-`
   */
  Object = "object",

  /**
   * Trim Whitespace Delimeter Dash LEft: `-`
   */
  Property = "property",

  /**
   * Whitespace: `\s`
   */
  Whitespace = "whitespace",

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
   * Boolean Value: `true` or `false`
   */
  Boolean = "boolean",

  /**
   * An object or array property bracket value: `[`
   */
  OpenBracket = "start",

  /**
   * An object or array property bracket value: `]`
   */
  CloseBracket = "end",

  /**
   * Array value (used in iteration)
   */
  Array = "array",

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
  EmptyDrop = "EmptyDrop",
}
