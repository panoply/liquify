/* -------------------------------------------- */
/*           TOKEN CONTEXT PLACEMENTS           */
/* -------------------------------------------- */

/**
 * `---^`
 *
 * @enum {number}
 */
export const AfterOpeningFrontmatter = 1
/**
 * `{%^`
 *
 * @enum {number}
 */
export const AfterOpeningTag = 2

/**
 * `{{^`
 *
 * @enum {number}
 */
export const AfterOpeningObject = 3

/**
 * `{% tag^`
 *
 * @enum {number}
 */
export const AfterTagName = 4

/**
 * `{{ object^` - Excludes `.` seperator
 *
 * @enum {number}
 */
export const AfterObjectName = 5

/**
 * `{{ object^` - Excludes `.` seperator
 *
 * @enum {number}
 */
export const AfterObjectProperty = 6

/**
 * `{% if condition^`
 *
 * @enum {number}
 */
export const AfterConditionValue = 7

/**
 * `==!=|<|>|>=|<=|or|and|contains`
 *
 * @enum {number}
 */
export const AfterConditionOperator = 8

/**
 * `{% for iteree^`
 *
 * @enum {number}
 */
export const AfterForLoopIteree = 9

/**
 * `{% for iteree in^`
 *
 * @enum {number}
 */
export const AfterForLoopOperator = 10

/**
 * `{% for i in (^`
 *
 * @enum {number}
 */
export const AfterOpeningForLoopRange = 11

/**
 * `{% for i in (1^`
 *
 * @enum {number}
 */
export const AfterForLoopRangeStart = 12

/**
 * `{% for i in (1..^`
 *
 * @enum {number}
 */
export const AfterForLoopRangeSeperators = 13

/**
 * `{% for i in (1..10^`
 *
 * @enum {number}
 */
export const AfterForLoopRangeEnd = 14

/**
 * `{% for i in (1..10)^`
 *
 * @enum {number}
 */
export const AfterForLoopRange = 15

/**
 * `\s` or `,`
 *
 * @enum {number}
 */
export const AfterParameterSperator = 16

/**
 * `{% for tag in tags limit^`
 *
 * @enum {number}
 */
export const AfterParameterName = 17

/**
 * `:|=`
 *
 * @enum {number}
 */
export const AfterParameterAssignment = 18

/**
 * `{% tag in tags limit: 100^`
 *
 * @enum {number}
 */
export const AfterParameterValue = 19

/**
 * `{{ tag |^`
 *
 * @enum {number}
 */
export const AfterFilterPipe = 20

/**
 * `{{ tag | filter^`
 *
 * @enum {number}
 */
export const AfterFilterName = 21

/**
 * `{{ tag | filter: value^ }}`
 *
 * @enum {number}
 */
export const AfterFilterValue = 22

/**
 * `{% assign var^ %}`
 *
 * @enum {number}
 */
export const AfterVariableName = 23

/**
 * `{% assign var = value^`
 *
 * @enum {number}
 */
export const AfterVariableAssignment = 24

/**
 * `{% include 'path/file.ext'^`
 *
 * @enum {number}
 */
export const AfterIncludePath = 25

/**
 * `<^`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLStartTag = 26

/**
 * `</^`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLEndTag = 27

/**
 * `</tag^`
 *
 * @enum {number}
 */
export const AfterHTMLEndTagName = 28

/**
 * `<tag^`
 *
 * @enum {number}
 */
export const AfterHTMLStartTagName = 29

/**
 * `<tag attr^`
 *
 * @enum {number}
 */
export const AfterHTMLAttribute = 30

/**
 * `<tag attr="value"^`
 *
 * @enum {number}
 */
export const AfterHTMLAttributeValue = 31

/**
 * `<!--`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLComment = 32

/**
 * `{%|{{|<|</|<!--`
 *
 * @enum {number}
 */
export const TokenDelimeters = 33

/**
 * `{%|{{|<|</|<!--`
 *
 * @enum {number}
 */
export const TokenUnknown = 34
