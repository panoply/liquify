/**
 * Token References
 */
declare const enum Tokens {
    HTMLTag = 1,
    HTMLAttribute = 2,
    HTMLValue = 3,
    LiquidEmbedded = 4,
    LiquidTag = 5,
    LiquidTagArgument = 6,
    LiquidTagParameter = 7,
    LiquidOutput = 8,
    LiquidObject = 9,
    LiquidProperty = 10,
    LiquidFilter = 11,
    LiquidFilterArgument = 12,
    LiquidFilterParameter = 13
}
declare const enum DataSource {
    HTMLWorkspaceSettings = 1,
    LiquifyContributes = 2,
    LiquidrcConfig = 3,
    LiquidSpecsFile = 4
}
/**
 * Scope References
 *
 * Enum used to define scopes, which are
 * keyword values that hold assigned values.
 */
declare const enum Scopes {
    /**
     * Unknown Scope
     *
     * This infers that the value has no known
     * scope or reference.
     *
     * @example
     * {% assign foo = 'xx' %}
     *
     * {{ foo }} // foo will have a string scope
     * {{ bar }} // bar is not known, ie: unknown
     */
    Unknown = 0,
    /**
     * Object Scope
     *
     * This infers that the value holds an object
     * or property value scope
     *
     * @example
     * {% assign foo = object.property %}
     *
     * {{ foo }} // foo will point to object.property
     */
    Object = 1,
    /**
     * String Scope
     *
     * This infers that the value holds a string type
     * scope.
     *
     * @example
     * {% assign foo = 'xx' %}
     *
     * {{ foo }} // foo holds 'xx' (string)
     */
    String = 2,
    /**
     * Number Scope
     *
     * This infers that the value holds a numeric type
     * scope
     *
     * @example
     * {% assign foo = 100 %}
     *
     * {{ foo }} // foo holds 100 (number)
     */
    Number = 3,
    /**
     * Array Scope
     *
     * This infers that the value holds a reference to an
     * array type scope value. Array scopes are also asserted
     * when an assignment ends with a `split` filter
     *
     * @example
     * {% assign foo = object.list %}
     * {% assign bar = 'one,two,three' | split: ',' %}
     *
     * {{ foo }} // foo points to an object value which is an array
     * {{ bar }} // bar points to an assignment that ends with split
     *
     * // CASES
     *
     * {{ foo.xx }} // This will not work and error will occur.
     * {{ foo[0] }} // This will succeed as it uses an index ref.
     */
    Array = 4,
    /**
     * Boolean Scope
     *
     * This infers that the value holds a boolean type
     * scope
     *
     * @example
     * {% assign foo = false %}
     *
     * {{ foo }} // foo holds false (boolean)
     */
    Boolean = 5
}
/**
 * Query Engine Errors
 *
 * Enum used when the query engine has
 * encountered an error.
 */
declare const enum Errors {
    ParameterNotUnique = 1,
    ParameterUnknown = 2
}
/**
 * Within References
 */
declare const enum Within {
    Tag = 1,
    Filter = 2,
    Arguments = 3,
    Parameter = 4,
    ParameterValue = 5
}
declare const enum TypeBasic {
    any = 1,
    object = 2,
    /**
     * **BASIC TYPE**
     *
     * A value that is a digit integer or float type. It
     * will assume one or the other.
     *
     * ---
     *
     * **Example**
     *
     * - `25`
     * - `-39.756`
     *
     * ---
     *
     */
    number = 3,
    /**
     * **BASIC TYPE**
     *
     * A value that is a digit integer or float type. It
     * will assume one or the other.
     *
     * ---
     *
     * **Example**
     *
     * - `25`
     * - `-39.756`
     *
     * ---
     *
     */
    float = 4,
    boolean = 5,
    string = 6,
    array = 7
}
/**
 * Separator Types
 *
 * Enum values used to infer separator characters of
 * arguments or parameters.
 */
declare const enum Separator {
    /**
     * `,`
     *
     * Comma character
     */
    Comma = 1,
    /**
     * ` `
     *
     * Whitespace character
     */
    Whitespace = 2,
    /**
     * `\n`
     *
     * Newline character
     */
    Newline = 3,
    /**
     * `=`
     *
     * Equals character
     */
    Equal = 4
}
/**
 * Engine Types
 *
 * String enums that define Liquid engines
 */
declare const enum Engine {
    /**
     * Liquid Standard Variation
     *
     * **FREE**
     */
    standard = "standard",
    /**
     * Liquid Shopify Variation
     *
     * **LICENSED**
     */
    shopify = "shopify",
    /**
     * Liquid Jekyll Variation
     *
     * **FREE**
     */
    jekyll = "jekyll",
    /**
     * Liquid Eleventy Variation
     *
     * **FREE**
     */
    eleventy = "eleventy"
}
/**
 * Combined Type Enum
 *
 * Specifications reference ranges on properties
 * and this export is used to match within those ranges.
 */
declare const enum Type {
    /**
     * **BASIC TYPE**
     *
     * Nil Type
     *
     * Asserts a `nil` type was provided
     */
    nil = 0,
    /**
     * **BASIC TYPE**
     *
     * Any Type
     *
     * Asserts any type on an argument, this is the
     * default. When a token uses this type alphanumeric
     * character sequences are consumed.
     *
     * ---
     *
     * **Examples**
     *
     * When an _any_ type is present the parser will
     * consume the argument and not run any validation.
     *
     * ---
     */
    any = 1,
    /**
     * **BASIC TYPE**
     *
     * Object types represent a token which has properties.
     * When a spec uses this type it is expected to have
     * additional values.
     *
     * ---
     *
     * **Example**
     *
     * - `object.prop`
     * - `object['prop']`
     *
     * ---
     *
     */
    object = 2,
    /**
     * **BASIC TYPE**
     *
     * A value that is a digit integer type. It assumes
     * a negative number (without decimal point) or basic
     * number (without decimal point).
     *
     * ---
     *
     * **Example**
     *
     * - `25`
     * - `1000`
     *
     * ---
     *
     */
    number = 3,
    /**
     * **BASIC TYPE**
     *
     * A value that is a digit integer or float type. It
     * will assume one or the other.
     *
     * ---
     *
     * **Example**
     *
     * - `25`
     * - `-39.756`
     *
     * ---
     *
     */
    float = 4,
    /**
     * **BASIC TYPE**
     *
     * Boolean type represents a word boolean value, but can also
     * represent additional word values as follows:
     *
     * ---
     *
     * **Example**
     *
     * - `true`
     * - `false`
     * - `nil`
     * - `empty`
     *
     * ---
     *
     */
    boolean = 5,
    /**
     * **BASIC TYPE**
     *
     * Refers to token value surrounded by quotation characters.
     *
     * ---
     *
     * **Example**
     *
     * - `'string'`
     * - `"string"`
     *
     * ---
     */
    string = 6,
    /**
     * **BASIC TYPE**
     *
     * Array types are used to describe a Liquid value object
     * which holds an array (collection) value, for example:
     *
     * ---
     *
     * **Example**
     *
     * You would assert an _array_ type when the token requires
     * such an input to correctly operate, for example an array
     * is required to be past in the for tag.
     *
     * - `{% for i in array %}`
     * - `{{ array | uniq }}`
     *
     * ---
     *
     */
    array = 7,
    /**
     * **BASIC TYPE**
     *
     * Constant Type
     *
     * Constant types described a value which contains no properties
     * and outputs data, likely to be globals, like that you would
     * encounter with `content_for_header` in shopify.
     *
     * ---
     *
     * **Example**
     *
     * - `{{ content_for_header }}`
     *
     * ---
     *
     */
    constant = 8,
    /**
     * **ARGUMENT TYPE**
     *
     * Refers to a Liquid parameter which is a
     * alphanumeric - colon token combination.
     *
     * ---
     *
     * **Example**
     *
     * - `param:`
     * - `some_param:`
     * - `param_1:`
     *
     * ---
     */
    parameter = 9,
    /**
     * **ARGUMENT TYPE**
     *
     * Keyword Type
     *
     * Refers to  word that will either hold or be assigned a value,
     * it cannot contain any characters other than letters and numbers.
     * When used with `value` the parser will assume an idententical
     * match is required.
     *
     * ---
     *
     * **Example**
     *
     * Keyword types can be used to describe an iterator token of
     * a `for` tag or the variable defined in a capture or assign tag.
     * In the Shopify specs a keyword is defined as a _type_ on the
     * `paginate` tag when decribing the `by` operator value.
     *
     * - `{% assign keyword = 'foo' %}`
     * - `{% for keyword in array %}`
     *
     * ---
     */
    keyword = 10,
    /**
     * **ARGUMENT TYPE**
     *
     * Refers to a HTML or Liquid which is a
     * alphanumeric - equal token combination.
     *
     * ---
     *
     * **Example**
     *
     * - `attr=`
     * - `key=`
     *
     * ---
     */
    attribute = 11,
    /**
     * **TAG TYPE**
     *
     * Control Type
     *
     * Control types use curly brace and percent delimiters.
     * Their keyword is defined by their specification. These tags
     * are used in conditional execution of code.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% if %}`
     * - `{% unless %}`
     * - `{% else %}`
     */
    control = 12,
    /**
     * **TAG TYPE**
     *
     * Comment Type
     *
     * Comment types can be either of Liquid or HTML kinds.
     * They are either defined by their specification or their
     * delimiter characters. The represent a comment.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% comment %} {% endcomment %}`
     * - `{% # comment %}`
     * - `<!-- comment -->`
     */
    comment = 13,
    /**
     * **TAG TYPE**
     *
     * Embedded Type
     *
     * Import types can use different (see: _kinds_ enums) of
     * delimiters. They are either defined by their specification,
     * their delimiter character or associate type. The
     * inner contents of these tags contain different languages.
     *
     * ---
     *
     * Variations:
     *
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% schema %}`
     * - `{% style %}`
     * - `<script>`
     * - `<style>`
     * - `---`
     */
    embedded = 14,
    /**
     * **TAG TYPE**
     *
     * Generator Type
     *
     * Generator types use curly brace and percent delimiters.
     * This type of tag generates markup like HTML or something else.
     * When a tag type is marked as a `generator` then its purpose is
     * to _generate_  some form of markup or content that is not a basic
     * type.  A generator can be a singular or pair kind.
     *
     * Use this type with clear intentions, and as a last resort when no
     * other type suffices, in addition its likely the tag will require
     * arguments or parameters, so be sure to apply them to prevent
     * parse errors occuring.
     *
     * ---
     *
     * Variations:
     *
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% form 'contact' %}{% endform %}`
     */
    generator = 15,
    /**
     * **TAG TYPE**
     *
     * Import Type
     *
     * Import types use curly brace and percent delimiters.
     * Their keyword is defined by their specification. These tags
     * purpose is to import different files.
     *
     * ---
     *
     * Examples:
     *
     * - `{% render '' %}`
     * - `{% section '' %}`
     * - `{% include '' %}`
     * - `<script src="">`
     */
    import = 16,
    /**
     * **TAG TYPE**
     *
     * Iteration Type
     *
     * Iteration types use curly brace and percent delimiters.
     * Their keyword is defined by their specification. These tags
     * repeatedly run blocks of code or are involved in interation
     * processes.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% for i in items %}`
     * - `{% cycle %}`
     * - `{% break %}` or `{% continue %}`
     */
    iteration = 17,
    /**
     * **TAG TYPE**
     *
     * Link Type
     *
     * Link types use curly brace and percent delimiters.
     * Their keyword is either defined by a specification or
     * it might be assumed depending on the variation and if the
     * tag contains forward slash characters. This tag is used
     * to generate links, can sometimes refer to frontmatter.
     *
     * ---
     *
     * Variations:
     *
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% link {{ page.my_variable }} %}`
     * - `{% post_url 2010-07-21-name-of-post %}`
     */
    link = 18,
    /**
     * **TAG TYPE**
     *
     * Output Type
     *
     * Output types use double curly brace delimiters
     * and their keyword is either a string, number or
     * word without dot `.` or bracket `[` character.
     * Output tags can also refer to keywords that are
     * not specified depending on variation, acting as
     * an **any** fallback type reference.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{{ 'foo' }}`
     * - `{{ variable }}`
     * - `{{ 100 }}`
     */
    output = 19,
    /**
     * **TAG TYPE**
     *
     * Variable Type
     *
     * Variable types use curly brace and percent delimiters.
     * Their keyword is defined by their specification.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% assign = '' %}`
     * - `{% capture %}`
     * - `{% increment %}`
     */
    variable = 20,
    /**
     * **TAG TYPE**
     *
     * Raw Type
     *
     * Raw types use curly brace and percent delimiters.
     * This type of tag has its contents excluded from
     * processing by Liquid engines.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% raw %} {% endraw %}`
     */
    raw = 21,
    /**
     * **TAG TYPE**
     *
     * Unknown Tag Type
     *
     * Unknown types use curly brace and percent delimiters.
     * This type of tag has been parsed sucessfully but has
     * no specification reference. Unknown types will treat
     * non-syntactic as singular, connect any pair heirarchs it
     * encounters and allow filters to be passed. These tags
     * are the equivelent of **any** as long as they are using
     * correct delimiter matchings.
     *
     * ---
     *
     * Variations:
     *
     * - Standard
     * - Shopify
     * - Jekyll
     * - Eleventy
     *
     * ---
     *
     * Examples:
     *
     * - `{% some_tag %}`
     */
    unknown = 22
}

/**
 * Reset
 *
 * Resets all states. This is executed everytime we
 * encounter a new tag.
 */
declare function reset(hard?: boolean): void;
/**
 * Get Tag Name List
 *
 * Returns all Liquid tag names of the current defined
 * variation when no engine is provided.
 */
declare function getTags(engine?: Engine): string[];
/**
 * Get Filters Name List
 *
 * Returns all Liquid filter names of the current defined
 * variation when no engine is provided.
 */
declare function getFilters(engine?: Engine): string[];
/**
 * Get Objects Name List
 *
 * Returns all Liquid object names of the current defined
 * variation when no engine is provided.
 *
 * ---
 *
 * **Note**: The standard variation will return an empty array.
 */
declare function getObjects(engine?: Engine.shopify | Engine.jekyll | Engine.eleventy): string[];
/**
 * Get Argument
 *
 * Walks over _optional_ arguments contained on a tag
 * or filter until a `type` match is detected. If an
 * argument is `required` walk is cancelled.
 */
declare function isArgument(type: any): boolean;
/**
 * Is Parameter
 *
 * Queries the current argument for a `parameter` type. When
 * an argument does not have a `parameter` type, it attempts
 * to find a parameter argument via the `GetArgument` function.
 *
 * The function will return a boolean value to inform upon a
 * successful or unsuccessful match.
 *
 * ---
 *
 * **GET ARGUMENT**
 *
 * If an argument does equal type `parameter` it will attempt
 * to match the parameter passed value to a property listed
 * on the arguments `value` and if successful, the state reference
 * `argument` variable is updated and points to the parameter.
 *
 * ---
 *
 * **VALUE AS TYPE**
 *
 * If a parameters `value` points a _enum_  (number) the state
 * reference `argument` will remain pointing to the argument at index
 * and a boolean `true` will be returned.
 */
declare function isParameter(token: string): boolean;
/**
 * Is Value
 *
 * Validates an a argument value. This function will run
 * several typeof checks to figure out how a value should
 * be validated, starting with patterns and working its way
 * down to a specificaions `value` entries.
 *
 * ---
 *
 * **Note**: When an array parameter pattern is provided, like
 * that found on shopify `color_saturate` filter then the `value`
 * state reference will be reflect a string value of:
 *
 * `0 and 100`
 *
 * This `$.liquid.value` is used in validations etc.
 */
declare function isValue(token: string): boolean;
/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
declare function setCompletions(): Completions;
/**
 * Set Engine
 *
 * Sets the Liquid `variation` and `engine` variable.
 * This will change what specification we reference.
 */
declare function setEngine(name: Engine): void;
/**
 * Set Tag
 *
 * Finds a tag matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched tag.
 */
declare function setTag(name: string): boolean;
/**
 * Set Filter
 *
 * Finds a filter matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched filter.
 */
declare function setFilter(name: string): boolean;
/**
 * Set Variable
 *
 * Add a variable assignment reference to the `data.variables`
 * store. Returns the index at which the reference exists in
 * the array list of variables. The variable store is an object
 * who's keys represent the variable keywords and the values are
 * an array. Each entry in the array will hold the the assigned value.
 */
declare function setVariable(name: string): void;
/**
 * Set Object
 *
 * Finds a matching object specification. Objects can be
 * contained in tags and filter, so the `cursor` is not
 * modified, instead the `object` state variable is updated.
 */
declare function setObject(name: string): boolean;
/**
 * Set Type
 *
 * Keeps a peristed store of a specific `type` which will
 * not change until re-setting via this function. It augments
 * the state `type` value. Typically used when walking object properties
 * to exclude non matching types.
 *
 * > This was added for usage in the vscode-liquid extension.
 */
declare function setType(type: Type): boolean;
/**
 * Has Object
 *
 * Queries the current variation to check whether or not the
 * provided name parameter exist in the object specifications.
 *
 * **DOES NOT MODIFY STATE**
 */
declare function hasObject(name: string): boolean;
/**
 * Has Property
 *
 * Queries the current object in state to check whether or not the
 * provided `prop` parameter exists on the object
 *
 * **DOES NOT MODIFY STATE**
 */
declare function hasProperty(name: string): boolean;
/**
 * Is Property
 *
 * Queries the current object for a property value
 * matching the parameter `value` provided. The object state
 * reference will update and point to the property
 * value when a match occurs.
 *
 * Accepts an optional `scopeArrays` which defaults to `true`
 * and will allow the spec to move state forward when object
 * type is array and its scope property matches. When `false`,
 * the object will persist.
 */
declare function isProperty(token: string): boolean;
/**
 * Is Allowed
 *
 * Checks the current cursor allows a value or some sort,
 * like filters or trim dashes. By default, when a value is
 * undefined on the specs, it is typically assumed to be `true`
 * unless we a dealing with a `required` value, which this
 * function does not validate for.
 */
declare function isAllowed(prop: 'trims' | 'filters'): boolean;
/**
 * Is Parent
 *
 * Check to see if the tag or object has the correct parent
 * tag, ie: a child of a certain tag or scope.
 */
declare function isParent(name: string): boolean;
/**
 * Is Variable
 *
 * Checks to see if the provide parameter is a scoped variable,
 * meaning that it holds a property assignment (ie: object).
 * When determined, the state `liquid.object` is aligned
 * and boolean type `true` is returned. If the variable scope does not
 * hold a property assignment then `false` is returned.
 *
 * When `false` is returned, the `liquid.variable` state will
 * represent the variable assignment type.
 */
declare function isVariable(name: string): boolean;
/**
 * Is Error
 *
 * Conditional checks the local error state reference
 * with the provided Query error enum.
 */
declare function isError(err: Errors): boolean;
/**
 * Is Object Variables
 *
 * Check a variables reference object properties
 * are valid by walknig over the object itself.
 */
declare function isObjectVars(vars: string[]): boolean;
/**
 * Is Object Type
 *
 * Validate the current object reference `type` value.
 * The object being validate will be type matched against
 * the most recent object applied at `SetObject()` or via
 * `isProperty()` function.
 */
declare function isObjectType(type: Type): boolean;
/**
 * Is Tag Type
 *
 * Validate a current tag `type` value. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
declare function isTagType(type: Type): boolean;
/**
 * Is Type
 *
 * Validate the current argument `type` value. It will match
 * an argument/parameter value type. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
declare function isType(type: Type): boolean;
/**
 * Is Within
 *
 * Used to validate the whereabouts of the current tag or filter
 * argument query engine position.
 */
declare function isWithin(token: Within): boolean;
/**
 * Is Required
 *
 * Checks the requirement for arguments, argument parameters or
 * parameter values. When a parameter has a `keyword` type, then
 * this returns `true`.
 */
declare function isRequired(): boolean;
/**
 * Is Optional
 *
 * Checks the requirement for every liquid.argument. If an arguments
 *  `required` value returns `true` then a boolean `false` will
 * be returned indicating that arguments are not optional and at
 * least 1 value is required. The function accepts a starting index,
 * default to the current argument index location.
 *
 * Some tag/filter arguments might all be optional, whereas some
 * might contain an optional starting arguments, but require arguments
 * proceeding that.
 */
declare function isOptional(from?: number): boolean;
/**
 * Previous Argument
 *
 * Moves the arugment back a position. If we are currently
 * walking the index `2` (argument 3) calling this will
 * move the arugment reference states to index `1`.
 */
declare function prevArgument(): boolean;
/**
 * Next Argument
 *
 * Moves to the _next_ argument (if available) and updates the
 * reference state variables. Returns a `boolean` which
 * indicates if we have reached the last argument or not.
 */
declare function nextArgument(): boolean;
/**
 * Next Parameter
 *
 * Despite its name, this function will reset the `argument`
 * state reference to its index starting point. When we
 * encounter a `parameter` type, the `argument` variable is
 * moved to its property value. This function reverts that.
 */
declare function nextParameter(): boolean;

/**
 * Defines an unsigned integer in the range of 0 to 2^31 - 1.
 */
declare type uinteger = number;
declare namespace uinteger {
    const MIN_VALUE = 0;
    const MAX_VALUE = 2147483647;
    function is(value: any): value is uinteger;
}
/**
 * The LSP any type.
 *
 * In the current implementation we map LSPAny to any. This is due to the fact
 * that the TypeScript compilers can't infer string access signatures for
 * interface correctly (it can though for types). See the following issue for
 * details: https://github.com/microsoft/TypeScript/issues/15300.
 *
 * When the issue is addressed LSPAny can be defined as follows:
 *
 * ```ts
 * export type LSPAny = LSPObject | LSPArray | string | integer | uinteger | decimal | boolean | null | undefined;
 * export type LSPObject = { [key: string]: LSPAny };
 * export type LSPArray = LSPAny[];
 * ```
 *
 * Please note that strictly speaking a property with the value `undefined`
 * can't be converted into JSON preserving the property name. However for
 * convenience it is allowed and assumed that all these properties are
 * optional as well.
 *
 * @since 3.17.0
 */
declare type LSPAny = any;
/**
 * Position in a text document expressed as zero-based line and character
 * offset. Prior to 3.17 the offsets were always based on a UTF-16 string
 * representation. So a string of the form `a𐐀b` the character offset of the
 * character `a` is 0, the character offset of `𐐀` is 1 and the character
 * offset of b is 3 since `𐐀` is represented using two code units in UTF-16.
 * Since 3.17 clients and servers can agree on a different string encoding
 * representation (e.g. UTF-8). The client announces it's supported encoding
 * via the client capability [`general.positionEncodings`](#clientCapabilities).
 * The value is an array of position encodings the client supports, with
 * decreasing preference (e.g. the encoding at index `0` is the most preferred
 * one). To stay backwards compatible the only mandatory encoding is UTF-16
 * represented via the string `utf-16`. The server can pick one of the
 * encodings offered by the client and signals that encoding back to the
 * client via the initialize result's property
 * [`capabilities.positionEncoding`](#serverCapabilities). If the string value
 * `utf-16` is missing from the client's capability `general.positionEncodings`
 * servers can safely assume that the client supports UTF-16. If the server
 * omits the position encoding in its initialize result the encoding defaults
 * to the string value `utf-16`. Implementation considerations: since the
 * conversion from one encoding into another requires the content of the
 * file / line the conversion is best done where the file is read which is
 * usually on the server side.
 *
 * Positions are line end character agnostic. So you can not specify a position
 * that denotes `\r|\n` or `\n|` where `|` represents the character offset.
 *
 * @since 3.17.0 - support for negotiated position encoding.
 */
interface Position {
    /**
     * Line position in a document (zero-based).
     *
     * If a line number is greater than the number of lines in a document, it defaults back to the number of lines in the document.
     * If a line number is negative, it defaults to 0.
     */
    line: uinteger;
    /**
     * Character offset on a line in a document (zero-based).
     *
     * The meaning of this offset is determined by the negotiated
     * `PositionEncodingKind`.
     *
     * If the character value is greater than the line length it defaults back to the
     * line length.
     */
    character: uinteger;
}
/**
 * The Position namespace provides helper functions to work with
 * {@link Position} literals.
 */
declare namespace Position {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line: uinteger, character: uinteger): Position;
    /**
     * Checks whether the given literal conforms to the {@link Position} interface.
     */
    function is(value: any): value is Position;
}
/**
 * A range in a text document expressed as (zero-based) start and end positions.
 *
 * If you want to specify a range that contains a line including the line ending
 * character(s) then use an end position denoting the start of the next line.
 * For example:
 * ```ts
 * {
 *     start: { line: 5, character: 23 }
 *     end : { line 6, character : 0 }
 * }
 * ```
 */
interface Range {
    /**
     * The range's start position.
     */
    start: Position;
    /**
     * The range's end position.
     */
    end: Position;
}
/**
 * The Range namespace provides helper functions to work with
 * {@link Range} literals.
 */
declare namespace Range {
    /**
     * Create a new Range literal.
     * @param start The range's start position.
     * @param end The range's end position.
     */
    function create(start: Position, end: Position): Range;
    /**
     * Create a new Range literal.
     * @param startLine The start line number.
     * @param startCharacter The start character.
     * @param endLine The end line number.
     * @param endCharacter The end character.
     */
    function create(startLine: uinteger, startCharacter: uinteger, endLine: uinteger, endCharacter: uinteger): Range;
    /**
     * Checks whether the given literal conforms to the {@link Range} interface.
     */
    function is(value: any): value is Range;
}
/**
 * Represents a reference to a command. Provides a title which
 * will be used to represent a command in the UI and, optionally,
 * an array of arguments which will be passed to the command handler
 * function when invoked.
 */
interface Command {
    /**
     * Title of the command, like `save`.
     */
    title: string;
    /**
     * The identifier of the actual command handler.
     */
    command: string;
    /**
     * Arguments that the command handler should be
     * invoked with.
     */
    arguments?: LSPAny[];
}
/**
 * The Command namespace provides helper functions to work with
 * {@link Command} literals.
 */
declare namespace Command {
    /**
     * Creates a new Command literal.
     */
    function create(title: string, command: string, ...args: any[]): Command;
    /**
     * Checks whether the given literal conforms to the {@link Command} interface.
     */
    function is(value: any): value is Command;
}
/**
 * A text edit applicable to a text document.
 */
interface TextEdit {
    /**
     * The range of the text document to be manipulated. To insert
     * text into a document create a range where start === end.
     */
    range: Range;
    /**
     * The string to be inserted. For delete operations use an
     * empty string.
     */
    newText: string;
}
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
declare namespace TextEdit {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range: Range, newText: string): TextEdit;
    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position: Position, newText: string): TextEdit;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range: Range): TextEdit;
    function is(value: any): value is TextEdit;
}
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
declare namespace MarkupKind {
    /**
     * Plain text is supported as a content format
     */
    const PlainText: 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    const Markdown: 'markdown';
    /**
     * Checks whether the given value is a value of the {@link MarkupKind} type.
     */
    function is(value: any): value is MarkupKind;
}
declare type MarkupKind = 'plaintext' | 'markdown';
/**
 * A `MarkupContent` literal represents a string value which content is interpreted base on its
 * kind flag. Currently the protocol supports `plaintext` and `markdown` as markup kinds.
 *
 * If the kind is `markdown` then the value can contain fenced code blocks like in GitHub issues.
 * See https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting
 *
 * Here is an example how such a string can be constructed using JavaScript / TypeScript:
 * ```ts
 * let markdown: MarkdownContent = {
 *  kind: MarkupKind.Markdown,
 *  value: [
 *    '# Header',
 *    'Some text',
 *    '```typescript',
 *    'someCode();',
 *    '```'
 *  ].join('\n')
 * };
 * ```
 *
 * *Please Note* that clients might sanitize the return markdown. A client could decide to
 * remove HTML from the markdown to avoid script execution.
 */
interface MarkupContent {
    /**
     * The type of the Markup
     */
    kind: MarkupKind;
    /**
     * The content itself
     */
    value: string;
}
declare namespace MarkupContent {
    /**
     * Checks whether the given value conforms to the {@link MarkupContent} interface.
     */
    function is(value: any): value is MarkupContent;
}
/**
 * The kind of a completion entry.
 */
declare namespace CompletionItemKind {
    const Text: 1;
    const Method: 2;
    const Function: 3;
    const Constructor: 4;
    const Field: 5;
    const Variable: 6;
    const Class: 7;
    const Interface: 8;
    const Module: 9;
    const Property: 10;
    const Unit: 11;
    const Value: 12;
    const Enum: 13;
    const Keyword: 14;
    const Snippet: 15;
    const Color: 16;
    const File: 17;
    const Reference: 18;
    const Folder: 19;
    const EnumMember: 20;
    const Constant: 21;
    const Struct: 22;
    const Event: 23;
    const Operator: 24;
    const TypeParameter: 25;
}
declare type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
declare namespace InsertTextFormat {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    const PlainText: 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */
    const Snippet: 2;
}
declare type InsertTextFormat = 1 | 2;
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
declare namespace CompletionItemTag {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    const Deprecated = 1;
}
declare type CompletionItemTag = 1;
/**
 * A special text edit to provide an insert and a replace operation.
 *
 * @since 3.16.0
 */
interface InsertReplaceEdit {
    /**
     * The string to be inserted.
     */
    newText: string;
    /**
     * The range if the insert is requested
     */
    insert: Range;
    /**
     * The range if the replace is requested.
     */
    replace: Range;
}
/**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */
declare namespace InsertReplaceEdit {
    /**
     * Creates a new insert / replace edit
     */
    function create(newText: string, insert: Range, replace: Range): InsertReplaceEdit;
    /**
     * Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
     */
    function is(value: TextEdit | InsertReplaceEdit): value is InsertReplaceEdit;
}
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
declare namespace InsertTextMode {
    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */
    const asIs: 1;
    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */
    const adjustIndentation: 2;
}
declare type InsertTextMode = 1 | 2;
/**
 * Additional details for a completion item label.
 *
 * @since 3.17.0
 */
interface CompletionItemLabelDetails {
    /**
     * An optional string which is rendered less prominently directly after {@link CompletionItem.label label},
     * without any spacing. Should be used for function signatures and type annotations.
     */
    detail?: string;
    /**
     * An optional string which is rendered less prominently after {@link CompletionItem.detail}. Should be used
     * for fully qualified names and file paths.
     */
    description?: string;
}
declare namespace CompletionItemLabelDetails {
    function is(value: any): value is CompletionItemLabelDetails;
}
/**
 * A completion item represents a text snippet that is
 * proposed to complete text that is being typed.
 */
interface CompletionItem {
    /**
     * The label of this completion item.
     *
     * The label property is also by default the text that
     * is inserted when selecting this completion.
     *
     * If label details are provided the label itself should
     * be an unqualified name of the completion item.
     */
    label: string;
    /**
     * Additional details for the label
     *
     * @since 3.17.0
     */
    labelDetails?: CompletionItemLabelDetails;
    /**
     * The kind of this completion item. Based of the kind
     * an icon is chosen by the editor.
     */
    kind?: CompletionItemKind;
    /**
     * Tags for this completion item.
     *
     * @since 3.15.0
     */
    tags?: CompletionItemTag[];
    /**
     * A human-readable string with additional information
     * about this item, like type or symbol information.
     */
    detail?: string;
    /**
     * A human-readable string that represents a doc-comment.
     */
    documentation?: string | MarkupContent;
    /**
     * Indicates if this item is deprecated.
     * @deprecated Use `tags` instead.
     */
    deprecated?: boolean;
    /**
     * Select this item when showing.
     *
     * *Note* that only one completion item can be selected and that the
     * tool / client decides which item that is. The rule is that the *first*
     * item of those that match best is selected.
     */
    preselect?: boolean;
    /**
     * A string that should be used when comparing this item
     * with other items. When `falsy` the {@link CompletionItem.label label}
     * is used.
     */
    sortText?: string;
    /**
     * A string that should be used when filtering a set of
     * completion items. When `falsy` the {@link CompletionItem.label label}
     * is used.
     */
    filterText?: string;
    /**
     * A string that should be inserted into a document when selecting
     * this completion. When `falsy` the {@link CompletionItem.label label}
     * is used.
     *
     * The `insertText` is subject to interpretation by the client side.
     * Some tools might not take the string literally. For example
     * VS Code when code complete is requested in this example
     * `con<cursor position>` and a completion item with an `insertText` of
     * `console` is provided it will only insert `sole`. Therefore it is
     * recommended to use `textEdit` instead since it avoids additional client
     * side interpretation.
     */
    insertText?: string;
    /**
     * The format of the insert text. The format applies to both the
     * `insertText` property and the `newText` property of a provided
     * `textEdit`. If omitted defaults to `InsertTextFormat.PlainText`.
     *
     * Please note that the insertTextFormat doesn't apply to
     * `additionalTextEdits`.
     */
    insertTextFormat?: InsertTextFormat;
    /**
     * How whitespace and indentation is handled during completion
     * item insertion. If not provided the clients default value depends on
     * the `textDocument.completion.insertTextMode` client capability.
     *
     * @since 3.16.0
     */
    insertTextMode?: InsertTextMode;
    /**
     * An {@link TextEdit edit} which is applied to a document when selecting
     * this completion. When an edit is provided the value of
     * {@link CompletionItem.insertText insertText} is ignored.
     *
     * Most editors support two different operations when accepting a completion
     * item. One is to insert a completion text and the other is to replace an
     * existing text with a completion text. Since this can usually not be
     * predetermined by a server it can report both ranges. Clients need to
     * signal support for `InsertReplaceEdits` via the
     * `textDocument.completion.insertReplaceSupport` client capability
     * property.
     *
     * *Note 1:* The text edit's range as well as both ranges from an insert
     * replace edit must be a [single line] and they must contain the position
     * at which completion has been requested.
     * *Note 2:* If an `InsertReplaceEdit` is returned the edit's insert range
     * must be a prefix of the edit's replace range, that means it must be
     * contained and starting at the same position.
     *
     * @since 3.16.0 additional type `InsertReplaceEdit`
     */
    textEdit?: TextEdit | InsertReplaceEdit;
    /**
     * The edit text used if the completion item is part of a CompletionList and
     * CompletionList defines an item default for the text edit range.
     *
     * Clients will only honor this property if they opt into completion list
     * item defaults using the capability `completionList.itemDefaults`.
     *
     * If not provided and a list's default range is provided the label
     * property is used as a text.
     *
     * @since 3.17.0
     */
    textEditText?: string;
    /**
     * An optional array of additional {@link TextEdit text edits} that are applied when
     * selecting this completion. Edits must not overlap (including the same insert position)
     * with the main {@link CompletionItem.textEdit edit} nor with themselves.
     *
     * Additional text edits should be used to change text unrelated to the current cursor position
     * (for example adding an import statement at the top of the file if the completion item will
     * insert an unqualified type).
     */
    additionalTextEdits?: TextEdit[];
    /**
     * An optional set of characters that when pressed while this completion is active will accept it first and
     * then type that character. *Note* that all commit characters should have `length=1` and that superfluous
     * characters will be ignored.
     */
    commitCharacters?: string[];
    /**
     * An optional {@link Command command} that is executed *after* inserting this completion. *Note* that
     * additional modifications to the current document should be described with the
     * {@link CompletionItem.additionalTextEdits additionalTextEdits}-property.
     */
    command?: Command;
    /**
     * A data entry field that is preserved on a completion item between a
     * {@link CompletionRequest} and a {@link CompletionResolveRequest}.
     */
    data?: LSPAny;
}
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
declare namespace CompletionItem {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label: string): CompletionItem;
}

declare type Engines = ('standard' | 'shopify' | 'jekyll' | 'eleventy');
type SpecNames = ('Standard' | 'Shopify' | 'Jekyll' | 'Eleventy');
declare type Templates = ('customer/register' | 'customer/reset_password' | 'customer/activate_account' | 'customer/account' | 'customer/login' | 'customer/addresses' | 'customer/order' | '404' | 'article' | 'blog' | 'cart' | 'collection' | 'gift_card' | 'index' | 'list-collections' | `page.${string}` | 'page.contact' | 'page' | 'password' | 'product' | 'search');
declare type Pattern = string | RegExp | [number, number];
declare interface Descriptions {
    /**
     * Summary
     *
     * This is a basic descriptive which describes the object.
     * The `description` property is where markdown descriptions exist.
     *
     * @default undefined
     */
    summary?: string;
    /**
     * Description
     *
     * A detailed description of this reference that can include code examples. This
     * is where you'd place **markdown** expressive information about the object.
     *
     * @default undefined
     */
    description?: string;
}
declare interface References {
    /**
     * The name of the Liquid Variation
     */
    name: `${Capitalize<Engines>} Liquid`;
    /**
     * Link to online documentation
     */
    url: string;
}

declare namespace Types {
    type Basic = ('any' | 'object' | 'number' | 'boolean' | 'string' | 'array' | 'constant');
    type Argument = ('parameter' | 'keyword' | 'attribute');
    type Tag = ('control' | 'comment' | 'embedded' | 'generator' | 'import' | 'iteration' | 'link' | 'output' | 'variable' | 'raw' | 'unknown');
    type Separators = (',' | '\n' | '=');
}

declare interface Value extends Descriptions {
    /**
     * Deprecated
     *
     * Whether the argument is deprecated or not
     */
    deprecated?: boolean;
    /**
     * Template
     *
     * A template scope id. when provided, values will only
     * appear in completions when used within a specific
     * template (file) that matches the basename + extension URI
     * supplied here.
     *
     * This is mostly a Shopify variation specific, typically this
     * can be omitted.
     *
     * @default undefined
     */
    template?: Templates | Templates[] | undefined;
    /**
     * Value
     *
     * A pre-defined argument value, can be a string or
     * an array of strings (when multiple values occur)
     */
    value: string | string[];
}
declare interface Parameter extends Descriptions {
    /**
     * The type value the parameter accepts. When a parameter is a keyword type,
     * ie: no colon operator then assert the _keyword_ type (enum `10`) and omit
     * the `value` property. If type is set to `keyword` and a value exists, those
     * entries will be ignored.
     */
    type: Type | Types.Basic | 'keyword';
    /**
     * Pattern
     *
     * An parameter may accepts a pattern match value. When provided,
     * the parser will validate the value against the pattern provided.
     *
     * You can pass a Regular Expression or _number_ range as array, eg: `[0, 10]`.
     * In addition, one may also provide a regex string match.
     *
     * ---
     *
     * **USE WITH CAUTION**
     *
     * Use this option with extreme caution. Do not pass global flags or
     * complex patterns else you will exhaust the parser. Keep it simple.
     *
     */
    pattern?: Pattern;
    /**
     * Whether the parameter values can be loosely matched, meaning
     * that addition values that are not otherwise provided can
     * be defined as long as the value matche the `type` provided.
     *
     * When `undefined` the parser will assume `true`
     */
    strict?: boolean;
    /**
     * The parameter value can be pre-defined or user defined.
     * When a value is supplied, it will be provided to completions.
     */
    value?: string | string[] | Value[];
}
declare interface ArgumentParameter extends Omit<Parameter, 'type' | 'value'> {
    /**
     * Type
     *
     * Argument type is equal to value of 'parameter'
     */
    type: 'parameter';
    /**
     * Whether the argument is required or optional.
     * When `undefined` the parser will assume `false`
     */
    required?: boolean;
    /**
     * If parameters should be unqiue, no duplicate entries.
     * When `undefined` the parser will assume `true`
     */
    unique?: boolean;
    /**
     * Seperator
     *
     * When the parameter should be proceeded by a seperator character.
     * When `undefined` the parser will assume `whitespace` depending on whether
     * it knows about the tag or filter.
     *
     * - `44` OR `,`
     * - `10` OR `\n`
     * - `61` or `=`
     *
     * @default NaN
     */
    separator?: 44 | 10 | 61;
    /**
     * Value
     *
     * The parameters available to the argument. If the parameter has no
     * known values, or can accept a custom parameter not known to the spec,
     * then pass the expected type.
     *
     * For example, the `t` (translation filter) in the Shopify variation
     * accepts _any_ type parameter values, by passing a basic _string_ type
     * enum to `value` will suffice.
     *
     * The parser will validate the character sequence and intercepts value types,
     * and accept any parameter name that is a alpha-numeric combination.
     */
    value: Types.Basic | {
        [parameter: string]: Parameter;
    };
}
declare interface Argument extends Descriptions {
    /**
     * Type
     *
     * Argument type is equal to value of 'parameter'
     */
    type: Type | Types.Basic | Types.Argument;
    /**
     * Pattern
     *
     * An argument may accepts a pattern match value. When provided,
     * the parser will validate the token against the pattern provided.
     *
     * You can pass a Regular Expression, _number_ range as array, eg: `[0, 10]`.
     * The property also accepts an _object_. When passing an `object` the
     * properties must point to the previous argument values. In addition, one
     * may also provide a regex string match.
     *
     * ---
     *
     * **USE WITH CAUTION**
     *
     * Use this option with extreme caution. Do not pass global flags or
     * complex patterns else you will exhaust the parser. Keep it simple.
     *
     */
    pattern?: Pattern | {
        [property: string]: Pattern;
    };
    /**
     * Strict
     *
     * Whether the argument values can loosely matched, meaning
     * that addition values that are not otherwise provided can
     * be defined as long as the value matches the `type` provided.
     *
     * When `undefined` the parser will assume `true`
     *
     * @default true
     */
    strict?: boolean;
    /**
     * Required
     *
     * Whether the argument is required or optional. When an argument
     * is _required_ and it is not expressed a parse error occurs.
     *
     * When `undefined` the parser will assume `false`
     *
     * @default true
     */
    required?: boolean;
    /**
     * Deprecated
     *
     * Whether the argument is deprecated or not
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Seperator
     *
     * When the parameter should be proceeded by a seperator character.
     * When `undefined` the parser will assume `whitespace` depending on whether
     * it knows about the tag or filter.
     *
     * - `44` OR `comma`
     * - `10` OR `newline`
     * - `61` or `equals`
     *
     * @default NaN
     */
    separator?: 44 | 10 | 61;
    /**
     * Template
     *
     * Template name scopes arguments are in which this argument
     * can be used and displayed. This is mostly a Shopify variation
     * specific option.
     *
     * @default undefined
     */
    template?: Templates | Templates[] | undefined;
    /**
     * Value
     *
     * The argument value can be pre-defined or user defined.
     * When a `value` is supplied, it will be provided to completions.
     * Values can be expressed in different forms and structures. The query
     * engine will match certain argument sequences.
     *
     * **PAIR SEQUENCES**
     *
     * Pair arguments can be inferred and occur when 2 (or more) entries exist on
     * the `arguments` array list property available on filters or tags. When an
     * argument item `value` uses an object `{}` type and the previous argument item
     * in the list uses an array `value` type then the properties of the object
     * type can reference the values, for example:
     *
     * ```js
     * [
     *   {
     *     type: 10, // keyword
     *     required: true, // arugment must be present
     *     value: 'xxx'
     *   },
     *   {
     *     type: 6, // string
     *     required: true, // arugment must be present
     *     value: ['foo', 'bar', 'baz']
     *   },
     *   {
     *     type: 2, // object
     *     required: true, // arugment must be present
     *     strict: false, // infers a loose match ('baz' does need pairing),
     *     seperator: 1, // comma character seperator
     *     value: {
     *       foo: { value: [ 'quux' ] },
     *       bar: { value: [ 'quuz.corge', 'grault.graply' ] },
     *     }
     *   },
     *   {
     *     type: 9, // parameter
     *     required: true, // arugment must be present
     *     seperator: 1, // comma character seperator
     *     value: {
     *       param: {
     *         type: 6,
     *         strict: false, // infers a loose match (accepts additional values),
     *         value: [ 'some-value', 'another-value' ]
     *       },
     *     }
     *   }
     * ]
     *
     * ```
     *
     * In the above example we are inferring a `pair` argument sequence. The
     * `value` defined at index `0` is being reference in the `value` defined at
     * index `1`. We asserted a _loose_ match, so if `foo` or `bar` are provided
     * as an argument in the tag, then the values supplied in index `1` must follow,
     * but if `baz` was provided, it does not require pairing.
     *
     * Using the above example:
     *
     * ```js
     *
     * // VALID
     *
     * // foo was supplied
     * {% some_tag xxx 'foo', quux, param: 'some-value' %}
     *
     * // bar was supplied
     * {% some_tag xxx 'bar', grault.graply, param: 'loose' %}
     *
     * // baz was supplied
     * {% some_tag xxx 'baz', param: 'another-value' %}
     *
     * // INVALID
     *
     * // foo only accepts 'quux' and param must be a string
     * {% some_tag xxx 'foo', quuz.corge, param: 100 %}
     *
     * // bar is missing a pair value
     * {% some_tag xxx 'bar', param: 'some-value' %}
     *
     * // baz does not accept pair matches and param must be a string
     * {% some_tag xxx 'baz', quux,  param: true %}
     *
     * ```
     */
    value?: string | string[] | Value[] | {
        [argument: string]: Value[];
    };
}
declare type Arguments = Array<Argument | ArgumentParameter>;

declare interface IProperty extends Descriptions {
    /**
     * Deprecated
     *
     * Is this object deprecated?
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Scope
     *
     * Point to an object in the spec for which this property
     * will implement. This is typically used when `type` is `array`,
     * but can also be used for circular referenced objects.
     *
     * @default undefined
     */
    scope?: string;
    /**
     * Items
     *
     * When type is `array` and the object property does have a `scope`
     * but each entry in the array has known type, it can be defined here.
     *
     * @default undefined
     */
    items?: string | Types.Basic;
    /**
     * Type
     *
     * The Typeof object value
     */
    type: Type | Types.Basic;
    /**
     * Literals
     *
     * A known value list which will be returned by this property.
     * Say for example, the values that will be returns will either
     * be `foo` or `bar` then you'd provide them here.
     *
     * @default undefined
     */
    literal?: string[] | undefined;
    /**
     * Reference
     *
     * Documentation References
     */
    reference?: References;
    /**
     * Properties
     *
     * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
     */
    properties?: {
        [name: string]: IProperty;
    };
}
declare interface IObject extends Descriptions {
    /**
     * Type
     *
     * The automatically applied tag type, which is "object"
     *
     * @default 'object'
     */
    type?: Type | Types.Basic;
    /**
     * Reference
     *
     * Documentation References
     */
    reference?: References;
    /**
     * Does this tag accept filters
     *
     * @default true
     */
    filters?: boolean;
    /**
     * Template
     *
     * List of template files which the object is accessible.
     *
     * @default []
     */
    template?: string[];
    /**
     * The object is a global accessible object. This simply means that
     * the object can be used at any point across the workspace. When the
     * value is `false` then the object must meet certain conditions, like
     * (for example) the current `template` or `scope`
     *
     * @default false
     */
    global?: boolean;
    /**
     * Scope
     *
     * Point to an object in the spec for which this object
     * will implement. This is typically used when `type` is `array`,
     * but can also be used for circular referenced objects.
     *
     * @default undefined
     */
    scope?: string;
    /**
     * Const
     *
     * Whether or not this object is a content or constant value. When an
     * object is defined as constant, it denotes that it cannot be used in
     * filters not apply any form of augmentation. An example of a `const`
     * type is the `content_for_header` object in the Shopify variation.
     *
     * @default false
     */
    const?: boolean;
    /**
     * Literals
     *
     * A known value list which will be returned by this property.
     * Say for example, the values that will be returns will either
     * be `foo` or `bar` then you'd provide them here.
     *
     * @default undefined
     */
    literal?: string[] | undefined;
    /**
     * Deprecated
     *
     * Is this object deprecated?
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Parents
     *
     * Object is only accessible within this scope. Define
     * the tags wherein the object is allowed.
     *
     * @default []
     */
    parent?: string[];
    /**
     * Properties
     *
     * List of property values this tag object supports, recursively
     * supply properties for deep nested objects.
     */
    properties?: {
        [name: string]: IProperty;
    };
}
declare interface Properties {
    [name: string]: IProperty;
}
declare interface Objects {
    [name: string]: IObject;
}

interface ObjectGroupItems {
    /**
     * All Objects
     */
    all: CompletionItem[];
    /**
     * Objects which are template specific
     */
    template: CompletionItem[];
    /**
     * Objects with type `any`
     */
    any: CompletionItem[];
    /**
     * Objects with type `array`
     */
    array: CompletionItem[];
    /**
     * Objects with type `string`
     */
    string: CompletionItem[];
    /**
     * Objects with type `number`
     */
    number: CompletionItem[];
    /**
     * Objects with type `constant`
     */
    constant: CompletionItem[];
    /**
     * Objects with type `boolean`
     */
    boolean: CompletionItem[];
    /**
     * Objects with type `object`
     */
    object: CompletionItem[];
}
interface Completion extends CompletionItem {
    data?: {
        /**
         * String snippet applied for completions
         */
        snippet?: string;
        /**
         * Whether or not the tage is a singular type
         */
        singular?: boolean;
        /**
         * An array string list of parent tag name scopes
         */
        parents?: string[];
        /**
         * Arguments applied to this completion
         */
        arguments?: Arguments;
    };
}
interface Completions {
    /**
     * A list of tag completions items
     */
    tags: Completion[];
    /**
     * A list of filter completions items
     */
    filters: Completion[];
    /**
     * A list of object completions items
     */
    objects?: Completion[];
}

/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
declare function ObjectDetail(type: Type | Types.Basic): "string" | "object" | "number" | "boolean" | "array" | "any" | "constant" | "control" | "embedded" | "import" | "iteration" | "variable" | "unknown" | "nil";
/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
declare function ObjectKind(type: Type | Types.Basic): "string" | "object" | "number" | "boolean" | "array" | "any" | "constant" | "control" | "embedded" | "import" | "iteration" | "variable" | "unknown" | "nil";
/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
declare function ObjectType(type: string): Type.nil | Type.any | Type.object | Type.number | Type.boolean | Type.string | Type.array | Type.constant | Type.control | Type.comment | Type.embedded | Type.import | Type.iteration | Type.variable | Type.unknown;
/**
 * Object Type Groups
 *
 * Groups object completions according to their type. Returns
 * a partial completion item for implementation into clients.
 */
declare function ObjectGroups(template: string, callback: (object: IObject, item: any) => any): ObjectGroupItems;
/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
declare function ProvideProps([label, { description, type, snippet }]: [any, {
    description: any;
    type: any;
    snippet?: any;
}]): CompletionItem;
declare function LiquidFilterResolve(item: CompletionItem): CompletionItem;
declare function LiquidOutputResolve(item: CompletionItem, edits?: TextEdit[]): CompletionItem;
declare function LiquidTagResolve(item: CompletionItem, edits?: TextEdit[]): CompletionItem;
/**
 * Liquid Property Completions
 *
 * Walks over defined objects and provides the property completions.
 * It works in such a way that Liquid objects can be queried and passed
 * to completions at any point,
 */
declare function LiquidPropertyComplete(node: any, offset: number): Promise<any>;

interface HTMLReference {
    /**
     * Reference name of the documentation
     */
    name: string;
    /**
     * the reference url linking to the documentation
     */
    url: string;
}
interface HTMLTagAttributes {
    /**
     * The name of attribute the tag accepts
     */
    name: string;
    /**
     * Description of the attribute value
     */
    description?: string;
    /**
     * A reference to the value set the attribute
     * accepts as a value.
     */
    value?: string;
}
interface HTMLTag {
    /**
     * The description of the HTML tag
     */
    description?: string;
    /**
     * A list of valid attributes the tag accepts. If
     * the attributes value is an empty array, it infers the
     * tag accepts attributes contained in the Attributes export.
     */
    attributes: [] | HTMLTagAttributes[];
    /**
     * Whether the tag is a void or pair type
     */
    void: boolean;
    /**
     * URL and name reference to online documentation explaining the tag
     *
     * @default undefined
     */
    reference?: HTMLReference;
}
declare interface HTMLTags {
    [tag: string]: HTMLTag;
}
interface HTMLAttribute {
    /**
     * The description of the attribute
     */
    description?: string;
    /**
     * Mapping to a value-set lists.
     */
    value?: string;
    /**
     * URL and name reference to online documentation explaining this attribute
     *
     * @default undefined
     */
    reference?: HTMLReference;
}
interface HTMLAttributes {
    [attribute: string]: HTMLAttribute;
}
interface HTMLValue {
    /**
     * The predefined value name for the value
     */
    label: string;
    /**
     * An optional description for this value
     */
    documentation?: {
        kind: 'markdown' | 'plaintext';
        value: string;
    };
}
interface HTMLValues {
    [value: string]: HTMLValue[];
}
/**
 * HTML completion data. This is generated for HTML
 * tags which do not provide a predefined set of attributes.
 *
 * For example, the `<input>` tag accepts a attributes which
 * are unique to that tag and thus accepts additional attributes,
 * such a tag would not use this interface, whereas a `<div>`
 * tag would use this interface.
 */
interface HTMLCompletionData {
    /**
     * Returns the value set reference or when no value boolean `false`
     */
    value: string | boolean;
}
/**
 * HTML Completions data generated attributes. This array type is
 * applied to HTML tags which accept additional attribute values,
 * like the `<input>` tag which accepts attributes like `value=""`
 *
 * In the generated specs, such tags contain an array list of the
 * additional attributes, those attributes are generated and passed
 * to the `data` object of a completion item.
 */
type HTMLCompletionAttrs = Array<{
    /**
     * The completion attribute name
     */
    label: string;
    /**
     * The completion description
     */
    documentation: MarkupContent;
    /**
     * HTML completion data
     */
    data: HTMLCompletionData;
}>;
/**
 * HTML completion tag data. This interface represents properties
 * that will be passed to the `data{}` object of a completion item.
 *
 * The data is used when a completion item resolves.
 */
declare interface HTMLCompletionTagData {
    /**
     * Whether the tag is a void type tag or not
     */
    void: boolean;
    /**
     * Generated completion list of tag attributes.
     * This is applied to the `data` object of a completion
     */
    attributes?: [] | HTMLCompletionAttrs;
}
/**
 * HTML completion tags, used when completions are
 * generated from the specs at runtime.
 */
type HTMLCompletionTags = Array<{
    /**
     * The completion attribute name
     */
    label: string;
    /**
     * The completion description
     */
    documentation: MarkupContent;
    /**
     * The completion data reference
     */
    data: HTMLCompletionTagData;
}>;
/**
 * HTML Completion provider combinator, asserting
 * that a completion item `data{}` will accept additional
 * attributes (as per the defined spec) or no attributes.
 */
type HTMLProvideAttrs = HTMLCompletionAttrs | HTMLTagAttributes[];
/**
 * The generated completions interface
 */
declare interface HTMLCompletions$1 {
    /**
     * List of available HTML tag completion
     */
    tags: HTMLCompletionTags;
    /**
     * List of global HTML tag attributes
     */
    attributes: HTMLCompletionAttrs;
}
/**
 * Lifted from vscode-html-languageservice
 */
declare interface ValueData {
    name: string;
    description?: string | MarkupContent;
    references?: HTMLReference[];
}
/**
 * Lifted from vscode-html-languageservice
 */
declare interface AttributeData {
    name: string;
    description?: string | MarkupContent;
    valueSet?: string;
    values?: ValueData[];
    references?: HTMLReference[];
}
/**
 * Lifted from vscode-html-languageservice
 */
declare interface TagData {
    name: string;
    description?: string | MarkupContent;
    attributes: AttributeData[];
    references?: HTMLReference[];
}
/**
 * Lifted from vscode-html-languageservice
 */
declare interface ValueSet {
    name: string;
    values: ValueData[];
}
/**
 * Lifted from vscode-html-languageservice
 */
declare interface HTMLDataVSCode {
    version: 1 | 1.1;
    tags?: TagData[];
    globalAttributes?: AttributeData[];
    valueSets?: ValueSet[];
}

declare interface Filter extends Descriptions {
    /**
     * Deprecated
     *
     * Is the filter tag deprecated?
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Reference
     *
     * URL reference to online documentation explaining this filter
     *
     * @default undefined
     */
    reference?: References;
    /**
     * Snippet
     *
     * Supply a snippet to be used in completions
     *
     * @default undefined
     */
    snippet?: string;
    /**
     * Expects
     *
     * This infers the type in which the filter *expects* to recieve.
     * We use this value to denote expectations, for example say a
     * boolean was passed to a number filter, see below:
     *
     * @example
     *
     * {{ false | plus: 1 }}
     *
     * @default any
     */
    expects?: Types.Basic;
    /**
     * Returns
     *
     * This infers the type in which the filter *returns*.
     *
     * @example
     *
     * // Return type is array
     * {{ 'foo,bar,baz' | split: ',' }}
     */
    returns?: Types.Basic;
    /**
     * Scope
     *
     * When the filter is available within the scope of
     * a specific object and/or tag.
     *
     * @default undefined
     */
    scope?: string | undefined;
    /**
     * Filter arguments can differ greatly depending on how they are
     * implemented. The spec understands the below filter structures:
     *
     * @example
     *
     * {{ tag | filter: 'hello', param: 'world' }} // comma seperated params
     * {{ tag | filter: 'arg1', 'arg2', }} // comma seperated string
     * {{ tag | filter: argument: 'foo' }} // injected argument params
     *
     * @default undefined
     */
    arguments?: Arguments;
}
declare interface Filters {
    [name: string]: Filter;
}

declare type Languages = ('liquid' | 'html' | 'yaml' | 'javascript' | 'typescript' | 'json' | 'css' | 'scss' | 'markdown');
declare interface Tag extends Descriptions {
    /**
     * Type
     *
     * The type categorization of the tag. Type categorization is
     * required on all tags.
     */
    readonly type: Type | Types.Tag;
    /**
     * Singleton
     *
     * Is this tag a singleton. Singleton tags do not require an `{% endtag %}`
     *
     * @default false
     */
    readonly singleton?: boolean;
    /**
     * Unique
     *
     * If the tag may only be used once per document, assert this
     * to `true`. This (for example) ensures a tag is only expressed
     * one time within each file.
     *
     * @default false
     */
    readonly unique?: boolean;
    /**
     * Snippet
     *
     * Supply a snippet to be used in completions
     *
     * @default undefined
     */
    readonly snippet?: string;
    /**
     * Reference
     *
     * A URL reference to the documentation pretaining to this tag
     *
     * @default undefined
     */
    readonly reference?: References | undefined;
    /**
     * Filters
     *
     * Whether or not the tag accepts filters. When `undefined` the parser
     * will assume `false`.
     *
     * @default false
     */
    readonly filters?: boolean;
    /**
     * Language
     *
     * When the contents of the tag is pertaining to another language,
     * this property is used to define the language contained within the
     * tag block.
     *
     * ---
     *
     * **IMPORTANT**
     *
     * Tag must not be `singleton`
     *
     * @default undefined
     */
    readonly language?: Languages;
    /**
     * Deprecated
     *
     * Is this tag deprecated? When `undefined` the parser will assume `false`
     *
     * @default false
     */
    readonly deprecated?: boolean;
    /**
     * Template
     *
     * List of template files which the tag can only be made accessible.
     * By default, tags are available in all templates. When entries are
     * are defined on this value then tags will only be made available in
     * these specific templates.
     *
     * @default undefined
     */
    readonly template?: string[] | undefined;
    /**
     * Parents
     *
     * When the tag is available within the scope of a specific object and/or tag.
     *
     * @default undefined
     */
    readonly parents?: string[] | undefined;
    /**
     * Children
     *
     * When a tag requires children to be contained within, list them here.
     *
     * @default undefined
     */
    readonly children?: string[] | undefined;
    /**
     * Arguments
     *
     * Arguments used within the contents of the tag.
     *
     * @default undefined
     */
    readonly arguments?: Arguments;
    /**
     * Parameters
     *
     * Predefined tag parameters.
     *
     * @default undefined
     */
    readonly parameters?: {
        [parameter: string]: Parameter;
    };
}
declare interface Tags {
    [name: string]: Tag;
}

interface ScopeMapValue {
    /**
     * The scope enum which describes the value
     */
    scope?: Scopes;
    /**
     * The value assignment reference
     */
    value?: IObject | IProperty | string;
}
declare interface Liquid {
    /**
    * Engine
    */
    engine: Engine;
    /**
     * The current tag specification
     */
    tag: Tag;
    /**
     * The current filter specification
     */
    filter: Filter;
    /**
     * The current object specification
     */
    object: IObject;
    /**
     * A persisted store reference to the object type.
     * Used when walking properties so as the property types
     * are aligned.
     */
    type: Type;
    /**
     * The current argument or parameter references
     */
    argument: Argument | ArgumentParameter;
    /**
     * The value entry reference
     */
    value: string;
    /**
     * An enum reference which informs what specifier are within
     */
    within: Within;
    /**
     * The current scope map value
     */
    variable: Partial<ScopeMapValue>;
    /**
     * The current scope map value
     */
    scope: number;
    /**
     * A storage map for holding files and external data refs
     */
    readonly files: Map<string, any>;
    /**
     * Data References
     */
    data: {
        /**
         * Document variables
         */
        variables: Map<string, ScopeMapValue[]>;
        /**
         * Variation Spec
         */
        variation: {
            /**
             * Liquid Filters
             */
            readonly filters?: Filters;
            /**
             * Liquid Objects
             */
            readonly objects?: Objects;
            /**
             * Liquid Tags
             */
            readonly tags?: Tags;
        };
        /**
         * Completion Items (LSP Related)
         */
        completions: Completions;
    };
}

/**
 * Set Tag
 *
 * Finds a HTML tag and updates the scope reference to it.
 * If no tag is found in the spec, it's likely a custom
 * HTML tag, this is allowed but that is handled at the
 * scanner/parser level.
 *
 * When a tag is matched, we immeadiatly check if the tag
 * accepts a list of pre-defined attributes, if they exists
 * we create a key list of the accepted values which we will
 * use to match attributes.
 */
declare function setHTMLTag(name: string): boolean;
/**
 * Checks to see if the provided HTML tag is an
 * embedded type tag, eg: <style> or <script>
 */
declare function isEmbedded(name: string): 'css' | 'javascript' | false;
/**
 * Checks the the attribute language of an embedded
 * tag,
 */
declare function isLanguage(attribute: string): "javascript" | "json";
/**
 * Checks to see if the provided HTML tag is a void
 * type tag, meaning it does not required an ender.
 */
declare function isVoid(name: string): boolean;
/**
 * Checks to see if the provided tag accepts a
 * supplied attribute. If the tag contains attributes
 * on its spec then the tag accepts a set of attributes
 * which are unique to that tag, like (for example) the
 * `<input>` tag which accepts attributes like `type=""`
 *
 * A local scope variable `attrs` generated in the setter,
 * holds string list of values which contain accepted pre-defined
 * attributes that we will check and from here determine if
 * that attribute has a pre-determined set of values.
 *
 * If `attrs` is undefined then the tag accepts global attributes,
 * so we will check the globals in the spec. When `attrs` is
 * undefined or the value passed does not match any values in
 * the list, we will proceed to the global attribute check.
 *
 * We allow `data-` attributes to pass
 */
declare function isAttribute(name: string): boolean;
/**
 * Checks to see if the attribute already exists on the tag.
 * If a tag contains Liquid syntax, we will skip this check at
 * scanner level after some validations.
 */
declare function isAttributeUniq(name: string): boolean;
/**
 * Validates an provided attribute value when a pre-defined
 * value set exists for the provided attribute.
 *
 * @todo
 * Because the specs value sets exists as an array,
 * the values are walked this might be hurt perfomance
 * and may be worth re-thinking in the future.
 */
declare function isAttributeValue(value: string): boolean;
/**
 * Checks to see if a value is required on the attribute.
 * When a tag attribute contains a pre-defined attribute
 * set, it is inferred that a value is to be provided.
 */
declare function isValueRequired(): boolean;

declare function HTMLCompletions(): any;
/**
 * Accepts custom data as per the vscode spec
 * for HTML.
 */
declare function HTMLCustomData(data: HTMLDataVSCode): void;
declare function HTMLTagComplete(): HTMLCompletionTags;
declare function HTMLAttrsComplete(tag: string): HTMLProvideAttrs;
declare function HTMLValueComplete(token?: string): false | {
    data: {
        token: Tokens;
    };
    label: string;
    documentation?: {
        kind: "plaintext" | "markdown";
        value: string;
    };
}[];
declare function HTMLTagResolve(item: CompletionItem): CompletionItem;
declare function HTMLAttrsResolve(item: CompletionItem): CompletionItem;
declare function HTMLValueResolve(item: CompletionItem): CompletionItem & {
    kind: 12;
};
declare function HTMLTagAttrs(attrs: HTMLTagAttributes[]): HTMLCompletionAttrs;

interface HTML5 {
    /**
     * The current tag specification
     */
    tag: HTMLTag;
    /**
     * The current attribute value specification
     */
    value: string;
    /**
     * The current tag attribute specification
     */
    attribute: HTMLTagAttributes[];
    /**
     * Merged custom data references
     */
    data: {
        /**
         * Completion Items (LSP Related)
         */
        completions: HTMLCompletions$1;
        /**
         * The HTML variation. Similar to the Liquid specs
         * this record represents a specification reference.
         * This variation specifically will contain any vscode
         * custom data records.
         */
        variation: {
            /**
             * HTML Tags
             */
            readonly tags?: HTMLTags;
            /**
             * HTML Attributes
             */
            readonly attributes?: HTMLAttributes;
            /**
             * HTML Attribute Values
             */
            readonly values?: HTMLValues;
            /**
             * A string list of HTML Void tags
             */
            readonly voids?: string[];
        };
    };
}

declare const liquid$1: Liquid;

declare const html5: HTML5;

declare const s_html5: typeof html5;
declare namespace s {
  export {
    s_html5 as html5,
    liquid$1 as liquid,
  };
}

declare const p_HTMLAttrsComplete: typeof HTMLAttrsComplete;
declare const p_HTMLAttrsResolve: typeof HTMLAttrsResolve;
declare const p_HTMLCompletions: typeof HTMLCompletions;
declare const p_HTMLCustomData: typeof HTMLCustomData;
declare const p_HTMLTagAttrs: typeof HTMLTagAttrs;
declare const p_HTMLTagComplete: typeof HTMLTagComplete;
declare const p_HTMLTagResolve: typeof HTMLTagResolve;
declare const p_HTMLValueComplete: typeof HTMLValueComplete;
declare const p_HTMLValueResolve: typeof HTMLValueResolve;
declare const p_LiquidFilterResolve: typeof LiquidFilterResolve;
declare const p_LiquidOutputResolve: typeof LiquidOutputResolve;
declare const p_LiquidPropertyComplete: typeof LiquidPropertyComplete;
declare const p_LiquidTagResolve: typeof LiquidTagResolve;
declare const p_ObjectDetail: typeof ObjectDetail;
declare const p_ObjectGroups: typeof ObjectGroups;
declare const p_ObjectKind: typeof ObjectKind;
declare const p_ObjectType: typeof ObjectType;
declare const p_ProvideProps: typeof ProvideProps;
declare namespace p {
  export {
    p_HTMLAttrsComplete as HTMLAttrsComplete,
    p_HTMLAttrsResolve as HTMLAttrsResolve,
    p_HTMLCompletions as HTMLCompletions,
    p_HTMLCustomData as HTMLCustomData,
    p_HTMLTagAttrs as HTMLTagAttrs,
    p_HTMLTagComplete as HTMLTagComplete,
    p_HTMLTagResolve as HTMLTagResolve,
    p_HTMLValueComplete as HTMLValueComplete,
    p_HTMLValueResolve as HTMLValueResolve,
    p_LiquidFilterResolve as LiquidFilterResolve,
    p_LiquidOutputResolve as LiquidOutputResolve,
    p_LiquidPropertyComplete as LiquidPropertyComplete,
    p_LiquidTagResolve as LiquidTagResolve,
    p_ObjectDetail as ObjectDetail,
    p_ObjectGroups as ObjectGroups,
    p_ObjectKind as ObjectKind,
    p_ObjectType as ObjectType,
    p_ProvideProps as ProvideProps,
  };
}

declare const q_getFilters: typeof getFilters;
declare const q_getObjects: typeof getObjects;
declare const q_getTags: typeof getTags;
declare const q_hasObject: typeof hasObject;
declare const q_hasProperty: typeof hasProperty;
declare const q_isAllowed: typeof isAllowed;
declare const q_isArgument: typeof isArgument;
declare const q_isAttribute: typeof isAttribute;
declare const q_isAttributeUniq: typeof isAttributeUniq;
declare const q_isAttributeValue: typeof isAttributeValue;
declare const q_isEmbedded: typeof isEmbedded;
declare const q_isError: typeof isError;
declare const q_isLanguage: typeof isLanguage;
declare const q_isObjectType: typeof isObjectType;
declare const q_isObjectVars: typeof isObjectVars;
declare const q_isOptional: typeof isOptional;
declare const q_isParameter: typeof isParameter;
declare const q_isParent: typeof isParent;
declare const q_isProperty: typeof isProperty;
declare const q_isRequired: typeof isRequired;
declare const q_isTagType: typeof isTagType;
declare const q_isType: typeof isType;
declare const q_isValue: typeof isValue;
declare const q_isValueRequired: typeof isValueRequired;
declare const q_isVariable: typeof isVariable;
declare const q_isVoid: typeof isVoid;
declare const q_isWithin: typeof isWithin;
declare const q_nextArgument: typeof nextArgument;
declare const q_nextParameter: typeof nextParameter;
declare const q_prevArgument: typeof prevArgument;
declare const q_reset: typeof reset;
declare const q_setCompletions: typeof setCompletions;
declare const q_setEngine: typeof setEngine;
declare const q_setFilter: typeof setFilter;
declare const q_setHTMLTag: typeof setHTMLTag;
declare const q_setObject: typeof setObject;
declare const q_setTag: typeof setTag;
declare const q_setType: typeof setType;
declare const q_setVariable: typeof setVariable;
declare namespace q {
  export {
    q_getFilters as getFilters,
    q_getObjects as getObjects,
    q_getTags as getTags,
    q_hasObject as hasObject,
    q_hasProperty as hasProperty,
    q_isAllowed as isAllowed,
    q_isArgument as isArgument,
    q_isAttribute as isAttribute,
    q_isAttributeUniq as isAttributeUniq,
    q_isAttributeValue as isAttributeValue,
    q_isEmbedded as isEmbedded,
    q_isError as isError,
    q_isLanguage as isLanguage,
    q_isObjectType as isObjectType,
    q_isObjectVars as isObjectVars,
    q_isOptional as isOptional,
    q_isParameter as isParameter,
    q_isParent as isParent,
    q_isProperty as isProperty,
    q_isRequired as isRequired,
    q_isTagType as isTagType,
    q_isType as isType,
    q_isValue as isValue,
    q_isValueRequired as isValueRequired,
    q_isVariable as isVariable,
    q_isVoid as isVoid,
    q_isWithin as isWithin,
    q_nextArgument as nextArgument,
    q_nextParameter as nextParameter,
    q_prevArgument as prevArgument,
    q_reset as reset,
    q_setCompletions as setCompletions,
    q_setEngine as setEngine,
    q_setFilter as setFilter,
    q_setHTMLTag as setHTMLTag,
    q_setObject as setObject,
    q_setTag as setTag,
    q_setType as setType,
    q_setVariable as setVariable,
  };
}

/**
 * Liquid Specifications
 */
declare const liquid: {
    /**
     * Extend Specification
     *
     * This function allows the specification to be extended
     * with custom support for different references.
     */
    extend: (engine: Engine, spec: {
        objects?: Objects;
        filters?: Filters;
        tags?: Tags;
    }) => {
        objects?: Objects;
        filters: Filters;
        tags: Tags;
    };
    /**
     * Standard Liquid
     */
    get standard(): {
        /**
         * Liquid Standard Specification: Tags
         */
        tags: Tags;
        /**
         * Liquid Standard Filters: Tags
         */
        filters: Filters;
    };
    /**
     * Shopify Liquid
     */
    get shopify(): {
        /**
         * Liquid Shopify Specification: Tags
         *
         * Tags extend the Standard Variation and will be made
         * available here.
         */
        tags: Tags;
        /**
         * Liquid Shopify Specification: Filters
         *
         * Filters extend the Standard Variation and will be made
         * available here.
         */
        filters: Filters;
        /**
         * Liquid Shopify Specification: Filters
         *
         * Filters extend the Standard Variation and will be made
         * available here.
         */
        objects: Objects;
    };
    /**
     * Jekyll Liquid
     */
    get jekyll(): {
        /**
         * Liquid Jekyll Specification: Tags
         *
         * Tags extend the Standard Variation and will be made
         * available here.
         */
        tags: Tags;
        /**
         * Liquid Jekyll Specification: Filters
         *
         * Filters extend the Standard Variation and will be made
         * available here.
         */
        filters: Filters;
        /**
         * Liquid Jekyll Specification: Filters
         *
         * Filters extend the Standard Variation and will be made
         * available here.
         */
        objects: Objects;
    };
};
/**
 * Liquid Specifications
 */
declare const html: {
    /**
     * HTML Attributes
     */
    get attributes(): HTMLAttributes;
    /**
     * HTML Tags
     */
    get tags(): HTMLTags;
    /**
     * HTML Values
     */
    get values(): HTMLValues;
    /**
     * HTML Voids
     */
    get voids(): string[];
};

export { s as $, Argument, ArgumentParameter, Arguments, AttributeData, Completion, Completions, DataSource, Engine, Engines, Errors, Filter, Filters, HTML5, HTMLAttribute, HTMLAttributes, HTMLCompletionAttrs, HTMLCompletionData, HTMLCompletionTagData, HTMLCompletionTags, HTMLCompletions$1 as HTMLCompletions, HTMLDataVSCode, HTMLProvideAttrs, HTMLReference, HTMLTag, HTMLTagAttributes, HTMLTags, HTMLValue, HTMLValues, IObject, IProperty, Languages, Liquid, Objects, Parameter, Pattern, Properties, References, ScopeMapValue, Scopes, Separator, SpecNames, Tag, TagData, Tags, Templates, Tokens, Type, TypeBasic, Types, Value, ValueData, ValueSet, Within, html, liquid, p, q };
