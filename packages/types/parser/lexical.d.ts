export { E as ErrorLevel, N as NodeKind, b as NodeLanguage, a as NodeType, P as ParseError, T as TagType } from './language-425603bb.js';

declare enum CharCode {
    /**
     * `*` – Whitespace - Used to space characters
     */
    ARS = 42,
    /**
     * `<` – Left Angle Bracket - Used in HTML delimiters and Liquid operators
     */
    LAN = 60,
    /**
     * `>` – Right Angle Bracket - Used in HTML delimiters and Liquid operators
     */
    RAN = 62,
    /**
     * `{` – Left Curly Brace - Used in Liquid delimiters
     */
    LCB = 123,
    /**
     * `}` – Right Curly Brace - Used in Liquid delimiters
     */
    RCB = 125,
    /**
     * `!` – Bang character - Used in HTML comments and Liquid operators
     */
    BNG = 33,
    /**
     * `?` – Question Mark character - Used in Liquid tokens (sometimes)
     */
    QWS = 63,
    /**
     * `-` – Dash character - Used in Liquid delimiters (whitespace)
     */
    DSH = 45,
    /**
     * `%` – Percent character - Used in Liquid delimiters
     */
    PER = 37,
    /**
     * `|` – Pipe character - Used in Liquid filters
     */
    PIP = 124,
    /**
     * `.` – Dot chacter - Used in Liquid object properties
     */
    DOT = 46,
    /**
     * `:` – Colon character - Used in Liquid filter and iteration parameters
     */
    COL = 58,
    /**
     * `,` – Comma character - Used in Liquid filter parameters
     */
    COM = 44,
    /**
     * `=` – Equals character - Used in Liquid operators and assignments
     */
    EQS = 61,
    /**
     * `/` – Forward Slash Character - Used in HTML closing tags
     */
    FWS = 47,
    /**
     * `\` – Backward Slash Character - Used in HTML closing tags
     */
    BWS = 92,
    /**
     * `"` – Double Quoted Character - Used in Liquid to define string values
     */
    DQO = 34,
    /**
     * `'` – Single Quoted Character - Used in Liquid to define string values
     */
    SQO = 39,
    /**
     * `\n` – Newline Character - Used to check newlines
     */
    NWL = 10,
    /**
     * `\r` – Carriage Return Character - Used to check newlines
     */
    CAR = 13,
    /**
     * `\f` – Form Return Character - Used to check newlines
     */
    LFD = 12,
    /**
     * `\t` – Tabs - Used for tab spaces
     */
    TAB = 9,
    /**
     * `\s` – Whitespace - Used to space characters
     */
    WSP = 32,
    /**
     * `[` – Left Open Bracket - Used to Liquid arrays
     */
    LOB = 91,
    /**
     * `]` – Left Open Bracket - Used to Liquid arrays
     */
    ROB = 93,
    /**
     * `(` – Left Open Parenthesis - Used to Liquid Iterations
     */
    LOP = 40,
    /**
     * `)` – Right Open Parenthesis - Used to Liquid Iterations
     */
    ROP = 41
}

declare enum TokenType {
    Whitespace = 0,
    Newline = 1,
    String = 2,
    Boolean = 3,
    Integer = 4,
    Float = 5,
    Number = 6,
    Separator = 7,
    /**
     * Variable
     *
     * **EXAMPLES**
     *
     * - `{% assign %}`
     * - `{% capture %}`
     * - `{% increment %}`
     */
    Variable = 8,
    /**
     * Variable Keyword
     *
     * The next known token which represents the assignment keyword name
     * of a variable type token.
     *
     * **EXAMPLES**
     *
     * - `foo` in `{% assign foo^`
     * - `foo` in `{% capture foo^`
     * - `foo` in `{% increment foo^`
     */
    VariableKeyword = 9,
    /**
     * Variable Operator
     *
     * The operation equals token character used in the assignment of
     * variable keywords.
     *
     * **EXAMPLES**
     *
     * - `=` in `{% assign foo =^`
     *
     */
    VariableOperator = 10,
    VariableValue = 11,
    VariableValueString = 12,
    VariableValueNumber = 13,
    VariableValueKeyword = 14,
    VariableValueObject = 15,
    VariableValueObjectProperty = 16,
    TagArgument = 17,
    Filter = 18,
    FilterOperator = 19,
    FilterArgument = 20,
    FilterArgumentNumber = 21,
    FilterIdentifier = 22,
    FilterParameter = 23,
    FilterEnd = 24,
    Unknown = 25,
    Control = 26,
    ControlCondition = 27,
    ControlOperator = 28,
    ControlElse = 29,
    ControlElseIf = 30,
    DelimiterOpen = 31,
    DelimiterClose = 32,
    DelimiterEnder = 33,
    TagOpen = 34,
    TagClose = 35,
    EndTagOpen = 36,
    EndTagClose = 37,
    OutputTagOpen = 38,
    /**
     * Start Tag Close
     *
     * After the ending delimiter of a tag
     *
     * **EXAMPLES**
     *
     * - `{% for i in arr %}^`
     * - `{% if x == cond %}^`
     */
    StartTagClose = 39,
    /**
     * Singular Tag Close
     *
     * After the ending delimiter of a singular type tag
     *
     * **EXAMPLES**
     *
     * - `{% assign %}^`
     * - `{% render %}^`
     */
    SingularTagClose = 40,
    /**
     * Output Tag Close
     *
     * After the ending delimiter of an output type tag
     *
     * **EXAMPLES**
     *
     * - `{{ x }}^`
     */
    OutputTagClose = 41,
    /**
     * Start Tag Name
     *
     * _Start tags require an `endtag` be defined_
     *
     * **EXAMPLES**
     *
     * - `{% for^`
     * - `{% if^`
     */
    StartTagName = 42,
    /**
     * End Tag Name
     *
     * _End tags are the ender pairing of a start tag._
     *
     * **EXAMPLES**
     *
     * - `{% endfor^`
     * - `{% endraw^`
     */
    EndTagName = 43,
    /**
     * Singular Tag Name
     *
     * _Singular tags do not require an endtag, ie: singleton_
     *
     * **EXAMPLES**
     *
     * - `{% assign^`
     * - `{% render^`
     * - `{% elsif^`
     * - `{% break^`
     */
    SingularTagName = 44,
    /**
     * Output Tag Name
     *
     * _Output tags are `const` types or those which are not identified as objects_
     *
     * **EXAMPLES**
     *
     * - `{{ content_for_header^`
     * - `{{ 'string'^`
     * - `{{ 100^`
     */
    OutputTagName = 45,
    /**
     * Object Tag Name
     *
     * _Similar to `output` types but references a **known** object in the spec_
     *
     * **EXAMPLES**
     *
     * - `{{ product^`
     * - `{{ article^`
     */
    ObjectTagName = 46,
    Iteration = 47,
    IterationIteree = 48,
    IterationOperator = 49,
    IterationArray = 50,
    IterationParameter = 51,
    IterationParameterValue = 52,
    TrimDashLeft = 53,
    TrimDashRight = 54,
    TagName = 55,
    /**
     * Object
     *
     * The object name and/or point before notation of an object, different from
     * the types `ObjectTagName` and ` ObjectTagNameKnown` in the sense that the
     * expression does not exist at the start of the token
     *
     * **EXAMPLES**
     *
     * - `foo` in `{% if foo.bar %}`
     * - `foo` in `{{ x | filter: foo.bar }}`
     *
     */
    Object = 56,
    /**
     * Object Property
     *
     * _After an object property_
     *
     * **EXAMPLES**
     *
     * - `bar` in `{{ foo.bar }}`
     * - `bar` in `{% if foo.bar %}`
     * - `bar` in `{{ x | filter: foo.bar }}`
     */
    ObjectProperty = 57,
    ObjectPropertyString = 58,
    /**
     * Object Property Object
     *
     * An object reference used within a backet notation.
     *
     * **EXAMPLES**
     *
     * - `object` in `{{ foo[object.prop] }}`
     * - `object` in `{{ foo[bar.prop[object]] }}`
     */
    ObjectPropertyObject = 59,
    ObjectPropertyNumber = 60,
    ObjectDotNotation = 61,
    ObjectBracketNotationOpen = 62,
    ObjectBracketNotationClose = 63,
    StringSingleQuote = 64,
    StringDoubleQuote = 65,
    Embedded = 66,
    EmbeddedJSON = 67,
    EmbeddedJavaScript = 68,
    EmbeddedCSS = 69,
    EmbeddedSCSS = 70,
    Comment = 71,
    ParsePrevNode = 72,
    ParseResolve = 73,
    ParseCancel = 74,
    ParseError = 75,
    ParseWarning = 76,
    ParseSkip = 77,
    ParseTolerate = 78,
    Content = 79,
    EOS = 80,
    FrontmatterStart = 81,
    FrontmatterEnd = 82,
    YAMLCommentStart = 83,
    YAMLComment = 84,
    YAMLCommentClose = 85,
    LiquidTagOpen = 86,
    LiquidTag = 87,
    LiquidTagClose = 88,
    LiquidEndTagOpen = 89,
    LiquidEndTag = 90,
    LiquidEndTagClose = 91,
    LiquidTagName = 92,
    LiquidSingularTag = 93,
    LiquidSingularTagClose = 94,
    LiquidObjectTagOpen = 95,
    LiquidObjectName = 96,
    LiquidObjectTagClose = 97,
    HTMLStartTagOpen = 98,
    HTMLStartTagClose = 99,
    HTMLStartTagLiquidStart = 100,
    HTMLStartTagLiquidEnd = 101,
    HTMLStartTagLiquidOutput = 102,
    HTMLEndTagOpen = 103,
    HTMLEndTagClose = 104,
    HTMLVoidTagOpen = 105,
    HTMLVoidTagClose = 106,
    HTMLVoidTagLiquidStart = 107,
    HTMLVoidTagLiquidEnd = 108,
    HTMLVoidTagLiquidOutput = 109,
    HTMLStartCommentTag = 110,
    HTMLComment = 111,
    HTMLEmbedded = 112,
    HTMLAttributeName = 113,
    HTMLLiquidAttribute = 114,
    HTMLAttributeValue = 115,
    HTMLOperatorValue = 116
}

export { CharCode, TokenType };
