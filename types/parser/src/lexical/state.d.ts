/**
 * Cache Context
 */
export declare const enum ScanCache {
    Reset = 0,
    SkipClose = 1,
    PassThrough = 2,
    TrimRight = 3,
    GotoEnd = 4,
    Tokenize = 5,
    StringOpen = 6,
    StringClose = 7,
    HTMLToken = 8,
    HTMLVoidTag = 9,
    RequireParent = 10,
    BracketNotation = 11,
    BracketNotationObject = 12,
    BracketNotationString = 13,
    BracketNotationVariable = 14,
    BracketNotationClose = 15,
    UnterminatedDelimiter = 16
}
export declare const enum ScanScope {
    Reset = 0,
    WithinHTMLAttribute = 1,
    WithinHTMLStartTag = 2,
    WithinHTMLVoidTag = 3
}
/**
 * Scanner State Enumerables
 *
 * Enumerated Scan States used to distinguish the position
 * at which we are within the document and pertaining token.
 *
 * Each enum is has a code example, the `^` character in
 * the comment docs signifies the position within the token
 * the stream would presumedly be located.
 */
export declare const enum ScanState {
    /**
     * Character Sequence
     *
     * Character sequencing matcher, executing parse
     * captures by seeking out start point delimeters.
     */
    CharSeq = 1,
    /**
     * Liquid Tag
     *
     * Passes to Liquid Tag scanner, state is applied as
     * a fallback when `scan()` function  does not return match
     */
    Liquid = 2,
    /**
     * Liquid Tag
     *
     * Passes to Liquid Tag scanner, state is applied as
     * a fallback when `scan()` function  does not return match
     */
    HTML = 3,
    /**
     * Parse Error
     *
     * Indicates a parsing error was encounted while
     * scan was running.
     */
    ParseError = 4,
    /**
     * Goto End of Tag
     *
     * Passes the scan to consumer which attempts to
     * close the curren token in stream.
     */
    GotoTagEnd = 5,
    /**
     * Skips Tag
     *
     * Skips the scanning a matched tag, generally used
     * for `{% raw %}`or when ignore inline comment detected
     */
    SkipTag = 6,
    SkipTagContents = 7,
    BeforeTagName = 8,
    BeforeEndTagName = 9,
    BeforeOutputTagName = 10,
    AfterTagOpen = 11,
    AfterEndTagOpen = 12,
    AfterOutputTagOpen = 13,
    AfterOutputTagName = 14,
    BeforeOutputTagClose = 15,
    BeforeStartTagClose = 16,
    BeforeEndTagClose = 17,
    BeforeSingularTagClose = 18,
    AfterHTMLStartTagName = 19,
    AfterHTMLEndTagName = 20,
    AfterHTMLVoidTagName = 21,
    BeforeHTMLStartTagClose = 22,
    BeforeHTMLEndTagClose = 23,
    BeforeHTMLVoidTagClose = 24,
    AfterHTMLTagName = 25,
    TagBasicName = 26,
    TagType = 27,
    TagUnknown = 28,
    TypeFilter = 29,
    EmbeddedLanguage = 30,
    EmbeddedTagEnd = 31,
    /**
     *  `---^`
     *
     * ---
     *
     * Position is after starting 3 dashed frontmatter delimiters
     */
    FrontmatterOpen = 32,
    /**
     * `---^`
     *
     * ---
     *
     * Position is after ending 3 dashed frontmatter delimiter
     */
    FrontmatterClose = 33,
    /**
     * `{%^`
     *
     * ---
     *
     * Position is after left side liquid tag delimiter tag
     */
    TagOpen = 34,
    /**
     * `{{^`
     *
     * ---
     *
     * Position is after left side liquid tag delimiter tag
     */
    TagOutputOpen = 35,
    /**
     * `{%-^`
     *
     * ---
     *
     * Position is after left side whitespace trim dash
     */
    TagOpenTrim = 36,
    /**
     * `{{-^`
     *
     * ---
     *
     * Position is after left side whitespace trim dash
     */
    TagOutputOpenTrim = 37,
    /**
     * `^%}` or `^}}`
     *
     * ---
     *
     * Position is before left side liquid tag delimiter tag
     */
    TagClose = 38,
    /**
     * `-^%}` or `-^}}`
     *
     * ---
     *
     * Position is after right side whitespace trim dash
     */
    TagCloseTrim = 39,
    /**
     * `end^name` we are at `name`
     *
     * ---
     *
     * End Tag
     */
    TagEndIdentifier = 40,
    /**
     * `{{^ object }}`
     *
     * ---
     *
     * Position is before dot seperator of object
     */
    Object = 41,
    /**
     * `^obj }}` or `| filter: ^obj.prop }}`
     *
     * ---
     *
     * Position is before an object name, we use to scan
     * objects used in arguments or as values.
     */
    ObjectName = 42,
    /**
     * `{{ object^.`
     *
     * ---
     *
     * Position is before dot seperator of an unknown object
     */
    ObjectValue = 43,
    /**
     * `{{ object.^`
     *
     * ---
     *
     * Position is after a dot seperator within object
     */
    ObjectDotNotation = 44,
    /**
     * `{{ object[^`
     *
     * ---
     *
     * Position is after left side bracket of object
     */
    ObjectBracketNotation = 45,
    /**
     * `{{ object["foo"]^`
     *
     * ---
     *
     * Position is after right side bracket of object
     */
    ObjectBracketNotationEnd = 46,
    /**
     * `{{ object.property^`
     *
     * ---
     *
     * Position is after property value but before dot seperator
     */
    ObjectProperty = 47,
    /**
     * `{{ object["property"^`
     *
     * ---
     *
     * Position is after last quotation within bracket notation
     */
    ObjectPropertyString = 48,
    /**
     * `{{ tag |^`
     *
     * ---
     *
     * Position is after pipe seperator
     */
    Filter = 49,
    /**
     * `{{ tag | filter^`
     *
     * ---
     *
     * Position is after filter name identifier
     */
    FilterIdentifier = 50,
    /**
     * `{{ tag | filter^`
     *
     * ---
     *
     * Position is after an unknown filter name identifier
     */
    FilterIdentifierUnknown = 51,
    /**
     * `{{ tag | filter:^`
     *
     * ---
     *
     * Position is after name identifier
     */
    FilterOperator = 52,
    /**
     * `| filter: ^argument }}`
     *
     * ---
     *
     * Position before argument, specification is consulted and
     * we will dispatch to filter type scanner.
     */
    FilterArgumentType = 53,
    /**
     * `| filter: argument^, }}`
     *
     * ---
     *
     * Position before a seperator when filter type is "argument"
     */
    FilterArgument = 54,
    /**
     * `| filter: argument^, }}`
     *
     * ---
     *
     * Position before they key/property argument when filter type is "spread"
     */
    FilterSpread = 55,
    /**
     * `| filter: property^: }}`
     *
     * ---
     *
     * Position is after parameter argument but before the parameter operator
     */
    FilterParameter = 56,
    /**
     * `| filter: property:^ }}`
     *
     * ---
     *
     * Position is after nested property parameter operator
     */
    FilterParameterOperator = 57,
    /**
     * `| filter: property: argument^ }}`
     *
     * ---
     *
     * Position is after property parameter argument
     */
    FilterArgumentParameter = 58,
    /**
     * `| filter: argument,^ }}`
     *
     * ---
     *
     * Position is after seperator character
     */
    FilterSeparator = 59,
    /**
     * `{% if^` or `{% unless^`
     *
     * ---
     *
     * Position is after the tag name identifier
     */
    Control = 60,
    /**
     * `{% if condition^`
     *
     * ---
     *
     * Position is after the conditional argument
     */
    ControlCondition = 61,
    /**
     * `condition ==^` or `condition and^`
     *
     * ---
     *
     * Position is after the conditional operator
     */
    ControlOperator = 62,
    /**
     * `condition == comparison^`
     *
     * ---
     *
     * Position is after the comparison value (if any)
     */
    ControlComparison = 63,
    /**
     * `{% for^` or `{% cycle^`
     *
     * ---
     *
     * Position is after the tag name identifier
     */
    Iteration = 64,
    /**
     * `{% for iteree^`
     *
     * ---
     *
     * Position is after the tag name iteree identifier
     */
    IterationIteree = 65,
    /**
     * `{% for iteree in^`
     *
     * ---
     *
     * Position is after the iteration operator
     */
    IterationOperator = 66,
    /**
     * `{% for iteree in array^`
     *
     * ---
     *
     * Position is after the iteration array reference
     */
    IterationArray = 67,
    /**
     * `{% for i in (^`
     *
     * ---
     *
     * Position is after the left side parenthesis of a range
     */
    IterationRangeOpen = 68,
    /**
     * `{% for i in (1^`
     *
     * ---
     *
     * Position is after left side starting range value
     */
    IterationRangeStart = 69,
    /**
     * `{% for i in (1..^`
     *
     * ---
     *
     * Position is after double dot seperators of a range
     */
    IterationRangeSeparators = 70,
    /**
     * `{% for i in (1..10^`
     *
     * ---
     *
     * Position is after right side ending range value
     */
    IterationRangeEnd = 71,
    /**
     * `{% for i in (1..10)^`
     *
     * ---
     *
     * Position is after right side parenthesis of a range
     */
    IterationRangeClose = 72,
    /**
     * `{% for i in array ^param %}`
     *
     * ---
     *
     * Position before a parameter
     */
    IterationParameter = 73,
    /**
     * `{% for i in array param: ^value %}`
     *
     * ---
     *
     * Position before a parameter value
     */
    IterationParameterValue = 74,
    /**
     * `{% assign^ %}`
     *
     * ---
     *
     * Position is variable keyword
     */
    Variable = 75,
    /**
     * `{% assign var^ %}`
     *
     * ---
     *
     * Position is after variable name identifier
     */
    VariableIdentifier = 76,
    /**
     * `{% assign var =^ %}`
     *
     * ---
     *
     * Position is after variable operator
     */
    VariableOperator = 77,
    /**
     * `{% assign var = value^ %}`
     *
     * ---
     *
     * Position is after variable assignment value
     */
    VariableAssignment = 78,
    /**
     * `{% include^ %}`
     *
     * ---
     *
     * Position is import keyword
     */
    Import = 79,
    /**
     * `{% include 'dir/file'^ %}`
     *
     * ---
     *
     * Position is after import path
     */
    ImportPath = 80,
    /**
     * `{% rende 'dir/file' with^ %}`
     *
     * ---
     *
     * Position is after keyword parameter
     */
    ImportParameterKeyword = 81,
    /**
     * `{% tag , param^:`
     *
     * ---
     *
     * Position is after an iteration parameter name value
     */
    Parameter = 82,
    /**
     * `{% tag ,^` or `{% tag ^`
     *
     * ---
     *
     * Position is either after a parameter seperator when seperator
     * is whitespace or will be after the seperator when its comma value.
     */
    ParameterSeparator = 83,
    /**
     * `{% tag param:^` or `{% tag , param = ^`
     *
     * ---
     *
     * Position is after a parameter operator
     */
    ParameterOperator = 84,
    /**
     * `param: argument^` or `, param = argument^`
     *
     * ---
     *
     * Position is after a parameter argument value
     */
    ParameterArgument = 85,
    HTMLLiquidAttribute = 86,
    HTMLLiquidAttributeEnd = 87,
    /**
     * `<^`
     *
     * ---
     *
     * Position is after a HTML start tag delimiter
     */
    HTMLTagOpen = 88,
    /**
     * `<tag^`
     *
     * ---
     *
     * Position is after a HTML open tag name identifier
     */
    HTMLTagName = 89,
    /**
     * `<tag attr^`
     *
     * ---
     *
     * Position is after a HTML attribute name
     */
    HTMLAttributeName = 90,
    /**
     * `<tag attr=^`
     *
     * ---
     *
     * Position is after a HTML attribute delimeter
     */
    HTMLAttributeOperator = 91,
    /**
     * `<tag attr="value"^`
     *
     * ---
     *
     * Position is after a HTML attribute value
     */
    HTMLAttributeValue = 92,
    /**
     * `<!--^`
     *
     * ---
     *
     * Position is after a HTML open comment delimiter
     */
    HTMLCommentOpen = 93,
    /**
     * `-->^`
     *
     * ---
     *
     * Position is after a HTML comment delimiter
     */
    HTMLCommentClose = 94,
    /**
     * `</^`
     *
     * ---
     *
     * Position is after a HTML end tag delimiter
     */
    HTMLTagClose = 95,
    /**
     * `</tag^`
     *
     * ---
     *
     * Position is after a HTML end tag name identifier
     */
    HTMLTagCloseName = 96
}
