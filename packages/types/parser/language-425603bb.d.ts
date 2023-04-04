declare enum ErrorLevel {
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
declare enum ParseError {
    /**
     * Parsing error occured. This could
     * be any error, its a fallback
     */
    ParsingError = 1,
    /**
     * Shows a deprecation warning for a specific
     * or value that was passed.
     */
    Deprecation = 2,
    /**
     * Duplicated HTML attributes on same tag
     *
     * @example
     * <tag class="foo" class="bar"> // class is defined multiple times.
     */
    DuplicatedHTMLAttributes = 3,
    /**
     * Duplicated parameter values
     *
     * @example
     * {{- tag | filter: param: 'foo',  param: 'bar' -}} // param must be unqiue
     */
    DuplicatedParameters = 4,
    /**
     * Missing HTML attribute value
     *
     * @example
     * <div class=""> // class attribute is missing
     */
    MissingHTMLAttributeValue = 5,
    /**
     * Tag name is missing
     *
     * @example
     * {% %}
     */
    MissingTagName = 6,
    /**
     * Object name is missing
     *
     * @example
     * {{ }}
     */
    MissingObjectName = 7,
    /**
     * Object BracketNotation closer
     *
     * @example
     * {{ object["foo" }}
     */
    MissingBracketNotation = 8,
    /**
     * Start Tag is missing
     *
     * @example
     * {% endtag %}
     */
    MissingStartTag = 9,
    /**
     * End Tag is missing
     *
     * @example
     * {% if tag %}
     * {% else %}
     */
    MissingEndTag = 10,
    /**
     * Missing Open Delimeters
     *
     * @example
     * tag %}
     * object -}}
     */
    MissingOpenDelimiter = 11,
    /**
     * Missing close delimeter
     *
     * @example
     * {% tag %
     * {{ objects | filter: '' }
     */
    MissingCloseDelimiter = 12,
    /**
     * Missing colon
     *
     * @example
     * {{ object | filter '' }}
     */
    MissingColon = 13,
    /**
     * Missing Property
     *
     * @example
     * {{ object. }}
     */
    MissingProperty = 14,
    /**
     * Missing Filter
     *
     * @example
     * {{ tag | }}
     */
    MissingFilter = 15,
    /**
     * Missing Filter
     *
     * @example
     * {{ tag | abs: 100. }} // missing number after decimal
     */
    MissingNumber = 16,
    /**
     * Missing Filter Arguments
     *
     * @example
     * {% tag  ^ %} // Tag is missing an argument
     */
    MissingTagArgument = 17,
    /**
     * Missing Filter Arguments
     *
     * @example
     * {{ tag | replace }} // Replace is missing arguments
     */
    MissingFilterArgument = 18,
    /**
     * Missing Filter Arguments
     *
     * @example
     * {{ tag | replace: 'foo' 'bar' }} // Missing commas separator
     */
    MissingFilterSeparator = 19,
    /**
     * Missing condition
     *
     * @example
     * {% if foo > %} // no condition after >
     * {%- unless -%} // missing condition
     */
    MissingCondition = 20,
    /**
     * Missing Quotation
     *
     * @example
     * {% if x == 'foo %}
     */
    MissingQuotation = 21,
    /**
     * Missing Argument Separator
     *
     * @example
     * {% tag arg foo %} // Separator is required between arg and foo
     */
    MissingArgumentSeparator = 22,
    /**
     * Missing Iteration Range Seperator
     *
     * @example
     * {% for i in (1.5) %} // . is invalid, 2 are required
     */
    MissingIterationRangeSeparator = 23,
    /**
     * Missing Iteration Iteree
     *
     * @example
     * {% for %}
     */
    MissingIterationIteree = 24,
    /**
     * Missing Iteration Array
     *
     * @example
     * {% for i in  %}
     */
    MissingIterationArray = 25,
    /**
     * Missing Iteration Parameter Value
     *
     * @example
     *  {% for i in arr offset:   %} // offset is missing value
     */
    MissingIterationParameterValue = 26,
    /**
     * Missing Whitespace
     *
     * @example
     * {{- tag |filter:foo }} // | and foo require spacing
     */
    MissingWhitespace = 27,
    /**
     * Invalid HTML Attribute
     *
     * @example
     * <div type="text"> // type attributes belong on input tags
     */
    InvalidHTMLAttribute = 28,
    /**
     * Invalid HTML Attribute Value
     *
     * @example
     * <input type="foo"> // foo is incorrect
     */
    InvalidHTMLAttributeValue = 29,
    /**
     * Invalid Name
     *
     * @example
     * {% for in in %} // in is invalid
     */
    InvalidName = 30,
    /**
     * Invalid Tag Name
     *
     * @example
     * {% #tag %} // # is invalid
     * {% 100 -%} // 100 is invalid
     * {% /tag/ %} // / is invalid
     */
    InvalidTagName = 31,
    /**
     * Invalid Decimal point
     *
     * @example
     * {{- tag | plus: 100. -}} // has a hanging decimal
     */
    InvalidDecimalPoint = 32,
    /**
     * Invalid Object Name
     *
     * @example
     * {{ #tag }} // # is invalid
     * {{ 100 }} // 100 is invalid
     */
    InvalidObjectName = 33,
    /**
     * Invalid Property Notation
     *
     * @example
     * {{- object.%.prop -}} // "%" is invalid
     * {{- object.# -}} // "#" is invalid
     */
    InvalidProperty = 34,
    /**
     * Invalid Property Notation
     *
     * @example
     * {{- object[var]"foo" -}} // "foo" is invalid
     * {{- object["prop"]foo -}} // foo is invalid
     */
    InvalidPropertyNotation = 35,
    /**
     * Invalid Character
     *
     * @example
     * {% assign * = '' %} // * is invalid
     * {% - if foo == x %} // - is invalid
     * {{- tag | x = 1 -}} // = is invalid
     */
    InvalidCharacter = 36,
    /**
     * Invalid Character
     *
     * @example
     * {{ tag | font_modify: 'weight', 'bar' }} // 'bar' is invalid
     */
    InvalidArgument = 37,
    /**
     * Invalid Argument Number Range
     *
     * @example
     * {{ tag | color_modify: 'red', 2000  }} // '2000' is invalid
     */
    InvalidNumberRange = 38,
    /**
     * Invalid Iteration Type
     *
     * @example
     * {% for i in product.title %} // 'title' is not an array
     */
    InvalidIterationType = 39,
    /**
     * Invalid Iteration Parameter
     *
     * @example
     * {% for i in array foo %} // 'foo' is invalid
     */
    InvalidIterationParameter = 40,
    /**
     * Invalid Character
     *
     * @example
     * {% assign x foo = '' %} // foo is invalid
     * {% -- if foo == x %} // -- is invalid
     * {{- tag | x and 1 -}} // and is invalid
     */
    InvalidCharacters = 41,
    /**
     * Invalid String Quotation match
     *
     * @example
     * {{ object["prop'] }}
     */
    InvalidQuotation = 42,
    /**
     * Invalid Filter
     *
     * @example
     * {{ tag | fooo }} // 'fooo' is invalid or unknown
     */
    InvalidFilter = 43,
    /**
     * Invalid Syntactic
     *
     * Thrown (generally) when the parser encounters a
     * child type tag incorrectly placed.
     *
     * @example
     * {% if foo %}
     */
    InvalidSyntactic = 44,
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
    InvalidPlacement = 45,
    /**
     * Invalid Operator
     *
     * @example
     * {% unless x << y %} // << is invalid
     * {%- if foo =! x -%} // =! is invalid
     */
    InvalidOperator = 46,
    /**
     * Reject String
     *
     * @example
     * {% 'assign' = 'x' -%} // assign should not be string
     * {%- increment '1' -%} // increment should not be string
     */
    RejectString = 47,
    /**
     * Reject Number
     *
     * @example
     * {{ 100 }} // number cannot be used as object name
     */
    RejectNumber = 48,
    /**
     * Reject Integer
     *
     * @example
     * {{ tag | filter: -10 }} // `-10` is integer and cannot be used
     */
    RejectInteger = 49,
    /**
     * Reject Integer
     *
     * @example
     * {{ tag | filter: 10.10 }} // `10.10` is float and cannot be used
     */
    RejectFloat = 50,
    /**
     * Reject Boolean
     *
     * @example
     * {% for x in false %}
     */
    RejectBoolean = 51,
    /**
     * Reject Array
     */
    RejectArray = 52,
    /**
     * Reject Object
     */
    RejectObject = 53,
    /**
     * Reject Property
     */
    RejectProperty = 54,
    /**
     * Reject Parameters
     */
    RejectParameters = 55,
    /**
     * Reject Filters
     */
    RejectFilters = 56,
    /**
     * Reject Filter Arguments
     *
     * @example
     * {{ tag | filter: argument }} // argument is not allowed
     */
    RejectFilterArguments = 57,
    /**
     * Reject Whitespace
     *
     * @example
     * {{ object['prop   '] }} // whitespace "\s\s\s" is not allowed
     */
    RejectWhitespace = 58,
    /**
     * Reject Whitespace Control
     *
     * @example
     * {%- schema -%} // dash "-" is not allowed
     */
    RejectWhitespaceControl = 59,
    /**
     * Required Filter Argument
     *
     * @example
     * {{ tag | append^ }} // Filter argument is required
     */
    RequireFilterArgument = 60,
    /**
     * Warn Extrenous Whitespace
     *
     * @example
     * {{- foo.  prop -}}
     * {{- foo ['prop'] }}
     * {{- foo ['    prop'] }}
     */
    WarnWhitespace = 61,
    /**
     * Warn Extrenous Whitespace
     *
     * @example
     * {{- foo.  prop -}}
     * {{- foo ['prop'] }}
     * {{- foo ['    prop'] }}
     */
    RejectItereeTypeValue = 62,
    /**
     * Unknown Filter Argument Parameter
     *
     * @example
     * {{ tag | filter: foo: 'bar' }} // 'foo' is unknown
     */
    UnknownFilterArgumentParameter = 63,
    /**
     * Unknown Object
     *
     * @example
     * {{- something.this_is_unknown_object -}}
     */
    UnknownObject = 64,
    /**
     * Unknown Property
     *
     * @example
     * {{- product.not_known_propery -}}
     */
    UnknownProperty = 65
}

declare enum NodeType {
    Root = 0,
    Pair = 1,
    Void = 2,
    Start = 3,
    Embed = 4,
    Output = 5,
    Singular = 6
}

/**
 * The Tag Type
 */
declare enum TagType {
    /**
     * Output Tag Type
     *
     * `{{ tag }}`
     */
    Output = 1,
    /**
     * Template Tag Type
     *
     * `{% tag %} {% endtag %}`
     */
    Template = 2,
    /**
     * Singleton Tag Type
     *
     * `{% tag %}`
     */
    Singleton = 3
}

/**
 * Token Kinds
 *
 * When parsing a document, we are likely to come across different
 * "kinds" of tokens. We mark the the token kind for every node we
 * encounter. This is different from `languages` where the language
 * identifiers refer to the embedded type language of tag, but the
 * `kind` refers to the token itself.
 *
 * ---
 *
 * **IMPORTANT**
 *
 * By default, all tokens are assumed to be `liquid`
 *
 * ---
 */
declare enum NodeKind {
    /**
     * Liquid Kind, eg: `{{ tag }}` | `{% tag %}`
     */
    Liquid = 1,
    /**
     * HTML Kind, eg: `<tag>` | `</tag>` | `<tag />`
     */
    HTML = 2,
    /**
     * Frontmatter, eg: `---` | `---`
     */
    Frontmatter = 3,
    /**
     * Raw, eg: `{% raw %}` | `{% endraw %}
     */
    Raw = 4,
    /**
     * Comment, eg: `{% comment %}` | `<!-- -->` | `{% # comment %}`
     */
    Comment = 5
}

/**
 * Embedded Language IDS
 *
 * Language identifier name enums. We use these names to indicate
 * what the language is of this tokens inner content. For example,
 * the HTML `<script>` tag is `javascript` or within the Shopify
 * Liquid variation the `{% schema %}` tag contains `json` and
 * thus the language identifier for that tag is json.
 *
 * ---
 *
 * **IMPORTANT**
 *
 * By default, all tags are assumed to be `liquid`
 *
 */
declare enum NodeLanguage {
    /**
     * Liquid Language - ALL TAGS DEFAULT TO LIQUID
     */
    "liquid" = "liquid",
    /**
     * HTML Language
     */
    "html" = "html",
    /**
     * YAML Language
     */
    "yaml" = "yaml",
    /**
     * JavaScript Language
     */
    "javascript" = "javascript",
    /**
     * JSON Language
     */
    "json" = "json",
    /**
     * CSS Language
     */
    "css" = "css",
    /**
     * SCSS Language
     */
    "scss" = "scss"
}

export { ErrorLevel as E, NodeKind as N, ParseError as P, TagType as T, NodeType as a, NodeLanguage as b };
