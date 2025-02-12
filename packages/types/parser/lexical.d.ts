export { E as ErrorLevel, N as NodeKind, b as NodeLanguage, a as NodeType, P as ParseError, T as TagType } from './language-BYcPZFcX.js';

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
    /**
     * Import tag file
     *
     * _Similar to `output` types but references a **known** object in the spec_
     *
     * **EXAMPLES**
     *
     * - `{% render 'file'^`
     * - `{% include 'file'^`
     * - `{% section 'file'^`
     * - `{% layout 'file'^`
     */
    ImportFileString = 47,
    Iteration = 48,
    IterationIteree = 49,
    IterationOperator = 50,
    IterationArray = 51,
    IterationParameter = 52,
    IterationParameterValue = 53,
    TrimDashLeft = 54,
    TrimDashRight = 55,
    TagName = 56,
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
    Object = 57,
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
    ObjectProperty = 58,
    ObjectPropertyString = 59,
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
    ObjectPropertyObject = 60,
    ObjectPropertyNumber = 61,
    ObjectDotNotation = 62,
    ObjectBracketNotationOpen = 63,
    ObjectBracketNotationClose = 64,
    StringSingleQuote = 65,
    StringDoubleQuote = 66,
    Embedded = 67,
    EmbeddedJSON = 68,
    EmbeddedJavaScript = 69,
    EmbeddedCSS = 70,
    EmbeddedSCSS = 71,
    Comment = 72,
    ParsePrevNode = 73,
    ParseResolve = 74,
    ParseCancel = 75,
    ParseError = 76,
    ParseWarning = 77,
    ParseSkip = 78,
    ParseTolerate = 79,
    Content = 80,
    EOS = 81,
    FrontmatterStart = 82,
    FrontmatterEnd = 83,
    YAMLCommentStart = 84,
    YAMLComment = 85,
    YAMLCommentClose = 86,
    LiquidTagOpen = 87,
    LiquidTag = 88,
    LiquidTagClose = 89,
    LiquidEndTagOpen = 90,
    LiquidEndTag = 91,
    LiquidEndTagClose = 92,
    LiquidTagName = 93,
    LiquidSingularTag = 94,
    LiquidSingularTagClose = 95,
    LiquidObjectTagOpen = 96,
    LiquidObjectName = 97,
    LiquidObjectTagClose = 98,
    HTMLStartTagOpen = 99,
    HTMLStartTagClose = 100,
    HTMLStartTagLiquidStart = 101,
    HTMLStartTagLiquidEnd = 102,
    HTMLStartTagLiquidOutput = 103,
    HTMLEndTagOpen = 104,
    HTMLEndTagClose = 105,
    HTMLVoidTagOpen = 106,
    HTMLVoidTagClose = 107,
    HTMLVoidTagLiquidStart = 108,
    HTMLVoidTagLiquidEnd = 109,
    HTMLVoidTagLiquidOutput = 110,
    HTMLStartCommentTag = 111,
    HTMLComment = 112,
    HTMLEmbedded = 113,
    HTMLAttributeName = 114,
    HTMLLiquidAttribute = 115,
    HTMLAttributeValue = 116,
    HTMLOperatorValue = 117
}

export { CharCode, TokenType };
