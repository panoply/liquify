
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
export const enum TokenTags {
  "associate" = 1,
  "control",
  "comment",
  "embedded",
  "include",
  "iteration",
  "object",
  "variable",
  "raw",
}
