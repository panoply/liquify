/* -------------------------------------------- */
/*           TOKEN CONTEXT PLACEMENTS           */
/* -------------------------------------------- */

export const enum ScanState {

  /**
   * `---^`
   */
  FrontmatterOpen = 1,

  /**
   * `---^`
   */
  FrontmatterClose = 1,

  /**
   * `{%^`
   */
  TagOpen,

  TagOpenDash,

  /**
   * `%}^`
   */
  TagStartClose,

  WithinEndTag,

  /**
   * `{{^`
   */
  TagType,

  ObjectName,
  ObjectProperties,

  /**
   * `{% tag^`
   */
  TagName,

  /**
   * `{% tag %}^` or `{{ tag }}^`
   */
  TagClose,
  TagCloseDash,

  Whitespace,

  /**
   * `{{ object^` - Excludes `.` seperator
   */
  AfterObjectProperty,

  /**
   * `{% if condition^`
   */
  AfterConditionValue,

  /**
   * `==!=|<|>|>=|<=|or|and|contains`
   */
  AfterConditionOperator,

  /**
   * `{% for iteree^`
   */
  AfterForLoopIteree,

  /**
   * `{% for iteree in^`
   */
  AfterForLoopOperator,

  /**
   * `{% for i in (^`
   */
  AfterOpeningForLoopRange,

  /**
   * `{% for i in (1^`
   */
  AfterForLoopRangeStart,

  /**
   * `{% for i in (1..^`
   */
  AfterForLoopRangeSeperators,

  /**
   * `{% for i in (1..10^`
   */
  AfterForLoopRangeEnd,

  /**
   * `{% for i in (1..10)^`
   */
  AfterForLoopRange,

  /**
   * `\s` or `,`
   */
  AfterParameterSperator,

  /**
   * `{% for tag in tags limit^`
   */
  AfterParameterName,

  /**
   * `:|=`
   */
  AfterParameterAssignment,

  /**
   * `{% tag in tags limit: 100^`
   */
  AfterParameterValue,

  /**
   * `{{ tag |^`
   */
  AfterFilterPipe,

  /**
   * `{{ tag | filter^`
   */
  AfterFilterName,

  /**
   * `{{ tag | filter: value^ }}`
   */
  AfterFilterValue,

  /**
   * `{% assign var^ %}`
   */
  AfterVariableName,

  /**
   * `{% assign var = value^`
   */
  AfterVariableAssignment,

  /**
   * `{% include 'path/file.ext'^`
   */
  AfterIncludePath,

  /**
   * `<^`
   */
  HTMLOpenStartTag,

  /**
   * `</^`
   */
  HTMLOpenEndTag,

  /**
   * `</tag^`
   */
  AfterHTMLEndTagName,

  /**
   * `<tag^`
   */
  AfterHTMLStartTagName,

  /**
   * `<tag attr^`
   */
  HTMLAttribute,

  /**
   * `<tag attr="value"^`
   */
  HTMLAttributeValue,

  /**
   * `<!--`
   */
  AfterOpeningHTMLComment,

  /**
   * `{%|{{|<|</|<!--`
   */
  TokenDelimeters,

  /**
   * `{%|{{|<|</|<!--`
   */
  TokenUnknown,

  ControlCondition,
  ControlOperator,
  IterationIteree,
  IterationParameterSeperator,
  IterationOperator,
  IterationArray,
  IterationParameter,
  IterationParameterValue,

  StringQuotation,

/**PARE ISSUES */
  ParseError,
  TagUnknown,
  CharSeq
}
