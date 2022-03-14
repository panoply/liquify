export declare const enum ErrorLevel {
    /**
     * Reports an error.
     */
    Error = 1,
    /**
     * Reports a warning.
     */
    Warning = 2,
    /**
     * Reports an information.
     */
    Information = 3,
    /**
     * Reports a hint.
     */
    Hint = 4
}
export declare const enum ParseError {
    /**
     * Parsing error occured. This could
     * be any error, its a fallback
     */
    ParsingError = 1,
    /**
     * Duplicated HTML attributes on same tag
     *
     * @example
     * <tag class="foo" class="bar"> // class is defined multiple times.
     */
    DuplicatedHTMLAttributes = 2,
    /**
     * Duplicated parameter values
     *
     * @example
     * {{- tag | filter: param: 'foo',  param: 'bar' -}} // param must be unqiue
     */
    DuplicatedParameters = 3,
    /**
     * Missing HTML attribute value
     *
     * @example
     * <div class=""> // class attribute is missing
     */
    MissingHTMLAttributeValue = 4,
    /**
     * Tag name is missing
     *
     * @example
     * {% %}
     */
    MissingTagName = 5,
    /**
     * Object name is missing
     *
     * @example
     * {{ }}
     */
    MissingObjectName = 6,
    /**
     * Object BracketNotation closer
     *
     * @example
     * {{ object["foo" }}
     */
    MissingBracketNotation = 7,
    /**
     * Start Tag is missing
     *
     * @example
     * {% endtag %}
     */
    MissingStartTag = 8,
    /**
     * End Tag is missing
     *
     * @example
     * {% if tag %}
     * {% else %}
     */
    MissingEndTag = 9,
    /**
     * Missing Open Delimeters
     *
     * @example
     * tag %}
     * object -}}
     */
    MissingOpenDelimiter = 10,
    /**
     * Missing close delimeter
     *
     * @example
     * {% tag %
     * {{ objects | filter: '' }
     */
    MissingCloseDelimiter = 11,
    /**
     * Missing colon
     *
     * @example
     * {{ object | filter '' }}
     */
    MissingColon = 12,
    /**
     * Missing Property
     *
     * @example
     * {{ object. }}
     */
    MissingProperty = 13,
    /**
     * Missing Filter
     *
     * @example
     * {{ tag | }}
     */
    MissingFilter = 14,
    /**
     * Missing Filter
     *
     * @example
     * {{ tag | abs: 100. }} // missing number after decimal
     */
    MissingNumber = 15,
    /**
     * Missing Filter Arguments
     *
     * @example
     * {{ tag | replace }} // Replace is missing arguments
     */
    MissingFilterArgument = 16,
    /**
     * Missing Filter Arguments
     *
     * @example
     * {{ tag | replace: 'foo' 'bar' }} // Missing commas separator
     */
    MissingFilterSeparator = 17,
    /**
     * Missing condition
     *
     * @example
     * {% if foo > %} // no condition after >
     * {%- unless -%} // missing condition
     */
    MissingCondition = 18,
    /**
     * Missing Quotation
     *
     * @example
     * {% if x == 'foo %}
     */
    MissingQuotation = 19,
    /**
     * Missing Iteration Range Seperator
     *
     * @example
     * {% for i in (1.5) %} // . is invalid, 2 are required
     */
    MissingIterationRangeSeperator = 20,
    /**
     * Missing Iteration Iteree
     *
     * @example
     * {% for %}
     */
    MissingIterationIteree = 21,
    /**
     * Missing Iteration Array
     *
     * @example
     * {% for i in  %}
     */
    MissingIterationArray = 22,
    /**
     * Missing Whitespace
     *
     * @example
     * {{- tag |filter:foo }} // | and foo require spacing
     */
    MissingWhitespace = 23,
    /**
     * Invalid HTML Attribute
     *
     * @example
     * <div type="text"> // type attributes belong on input tags
     */
    InvalidHTMLAttribute = 24,
    /**
     * Invalid HTML Attribute Value
     *
     * @example
     * <input type="foo"> // foo is incorrect
     */
    InvalidHTMLAttributeValue = 25,
    /**
     * Invalid Name
     *
     * @example
     * {% for in in %} // in is invalid
     */
    InvalidName = 26,
    /**
     * Invalid Tag Name
     *
     * @example
     * {% #tag %} // # is invalid
     * {% 100 -%} // 100 is invalid
     * {% /tag/ %} // / is invalid
     */
    InvalidTagName = 27,
    /**
     * Invalid Decimal point
     *
     * @example
     * {{- tag | plus: 100. -}} // has a hanging decimal
     */
    InvalidDecimalPoint = 28,
    /**
     * Invalid Object Name
     *
     * @example
     * {{ #tag }} // # is invalid
     * {{ 100 }} // 100 is invalid
     */
    InvalidObjectName = 29,
    /**
     * Invalid Property Notation
     *
     * @example
     * {{- object.%.prop -}} // "%" is invalid
     * {{- object.# -}} // "#" is invalid
     */
    InvalidProperty = 30,
    /**
     * Invalid Property Notation
     *
     * @example
     * {{- object[var]"foo" -}} // "foo" is invalid
     * {{- object["prop"]foo -}} // foo is invalid
     */
    InvalidPropertyNotation = 31,
    /**
     * Invalid Character
     *
     * @example
     * {% assign * = '' %} // * is invalid
     * {% - if foo == x %} // - is invalid
     * {{- tag | x = 1 -}} // = is invalid
     */
    InvalidCharacter = 32,
    /**
     * Invalid Character
     *
     * @example
     * {{ tag | font_modify: 'weight', 'bar' }} // 'bar' is invalid
     */
    InvalidArgument = 33,
    /**
     * Invalid Argument Number Range
     *
     * @example
     * {{ tag | color_modify: 'red', 2000  }} // '2000' is invalid
     */
    InvalidNumberRange = 34,
    /**
     * Invalid Iteration Type
     *
     * @example
     * {% for i in product.title %} // 'title' is not an array
     */
    InvalidIterationType = 35,
    /**
     * Invalid Iteration Parameter
     *
     * @example
     * {% for i in array foo %} // 'foo' is invalid
     */
    InvalidIterationParameter = 36,
    /**
     * Invalid Character
     *
     * @example
     * {% assign x foo = '' %} // foo is invalid
     * {% -- if foo == x %} // -- is invalid
     * {{- tag | x and 1 -}} // and is invalid
     */
    InvalidCharacters = 37,
    /**
     * Invalid String Quotation match
     *
     * @example
     * {{ object["prop'] }}
     */
    InvalidQuotation = 38,
    /**
     * Invalid Filter
     *
     * @example
     * {{ tag | fooo }} // 'fooo' is invalid or unknown
     */
    InvalidFilter = 39,
    /**
     * Invalid Syntactic
     *
     * Thrown (generally) when the parser encounters a
     * child type tag incorrectly placed.
     *
     * @example
     * {% if foo %}
     */
    InvalidSyntactic = 40,
    /**
     * Invalid Placement Syntactic
     *
     * Thrown when tag is not in correct scope
     *
     * @example
     * {% else %} // Invalid Placement
     * {% if foo %}
     * {% endif %}
     */
    InvalidPlacement = 41,
    /**
     * Invalid Operator
     *
     * @example
     * {% unless x << y %} // << is invalid
     * {%- if foo =! x -%} // =! is invalid
     */
    InvalidOperator = 42,
    /**
     * Reject String
     *
     * @example
     * {% 'assign' = 'x' -%} // assign should not be string
     * {%- increment '1' -%} // increment should not be string
     */
    RejectString = 43,
    /**
     * Reject Number
     *
     * @example
     * {{ 100 }} // number cannot be used as object name
     */
    RejectNumber = 44,
    /**
     * Reject Integer
     *
     * @example
     * {{ tag | filter: -10 }} // `-10` is integer and cannot be used
     */
    RejectInteger = 45,
    /**
     * Reject Integer
     *
     * @example
     * {{ tag | filter: 10.10 }} // `10.10` is float and cannot be used
     */
    RejectFloat = 46,
    /**
     * Reject Boolean
     *
     * @example
     * {% for x in false %}
     */
    RejectBoolean = 47,
    /**
     * Reject Array
     */
    RejectArray = 48,
    /**
     * Reject Object
     */
    RejectObject = 49,
    /**
     * Reject Property
     */
    RejectProperty = 50,
    /**
     * Reject Parameters
     */
    RejectParameters = 51,
    /**
     * Reject Filters
     */
    RejectFilters = 52,
    /**
     * Reject Filter Arguments
     *
     * @example
     * {{ tag | filter: argument }} // argument is not allowed
     */
    RejectFilterArguments = 53,
    /**
     * Reject Whitespace
     *
     * @example
     * {{ object['prop   '] }} // whitespace "\s\s\s" is not allowed
     */
    RejectWhitespace = 54,
    /**
     * Reject Whitespace Control
     *
     * @example
     * {%- schema -%} // dash "-" is not allowed
     */
    RejectWhitespaceControl = 55,
    /**
     * Required Filter Argument
     *
     * @example
     * {{ tag | append^ }} // Filter argument is required
     */
    RequireFilterArgument = 56,
    /**
     * Warn Extrenous Whitespace
     *
     * @example
     * {{- foo.  prop -}}
     * {{- foo ['prop'] }}
     * {{- foo ['    prop'] }}
     */
    WarnWhitespace = 57,
    /**
     * Warn Extrenous Whitespace
     *
     * @example
     * {{- foo.  prop -}}
     * {{- foo ['prop'] }}
     * {{- foo ['    prop'] }}
     */
    RejectItereeTypeValue = 58,
    /**
     * Unknown Filter Argument Parameter
     *
     * @example
     * {{ tag | filter: foo: 'bar' }} // 'foo' is unknown
     */
    UnknownFilterArgumentParameter = 59,
    /**
     * Unknown Property
     *
     * @example
     * {{- product.not_known_propery -}}
     */
    UnknownProperty = 60
}
