/**
 * `{` | `<` | `"` etc
 *
 * Sequence Characters, to delimiter starters
 */
export const SequenceCharacters = /[\r\n'"{-]/

/**
 * `{% if condition %}` > `condition`
 *
 * Liquid Condition Identifiers
 */
export const IdentifierCondition = /^(?:[^"'\W\s]+|[.-]+)+/

/**
 * `{% if condition == value %}` > `==`
 *
 * Liquid Condition Operators
 */
export const ConditionOperators = /==|!=|>=|<=|<|>|\b(?:and|or)\b/

/**
 * `{% if condition and value %}` > `and`
 *
 * Liquid Condition Operators
 */
export const LogicalOperators = /\b(?:and|or)\b/
