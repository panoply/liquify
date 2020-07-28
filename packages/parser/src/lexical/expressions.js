/**
 * `{` | `<` | `"` etc
 *
 * Sequence Characters, to delimeter starters
 */
export const SequenceCharacters = /[\r\n'"{-]/

/**
 * `{% if condition %}` > `condition`
 *
 * Liquid Condition Indentifiers
 */
export const IdentifierCondition = /^(?:[^"'\W\s]+|[.-]+)+/

/**
 * `{% if condition == value %}` > `==`
 *
 * Liquid Condition Operators
 */
export const ConditionOperators = /==|!=|>=|<=|<|>/

/**
 * `{% if condition and value %}` > `and`
 *
 * Liquid Condition Operators
 */
export const LogicalOperators = /\b(?:and|or)\b/
