/**
 * Token References
 */
export const enum Tokens {
  HTMLTag = 1,
  HTMLAttribute,
  HTMLValue,
  LiquidEmbedded,
  LiquidTag,
  LiquidTagArgument,
  LiquidTagParameter,
  LiquidOutput,
  LiquidObject,
  LiquidProperty,
  LiquidFilter,
  LiquidFilterArgument,
  LiquidFilterParameter
}

export const enum DataSource {
  HTMLWorkspaceSettings = 1,
  LiquifyContributes,
  LiquidrcConfig,
  LiquidSpecsFile
}

/**
 * Scope References
 *
 * Enum used to define scopes, which are
 * keyword values that hold assigned values.
 */
export const enum Scopes {
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
  Unknown,
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
  Object,
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
  String,
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
  Number,
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
  Array,
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
  Boolean
}

/**
 * Query Engine Errors
 *
 * Enum used when the query engine has
 * encountered an error.
 */
export const enum Errors {
  ParameterNotUnique = 1,
  ParameterUnknown
}

/**
 * Within References
 */
export const enum Within {
  Tag = 1,
  Filter,
  Arguments,
  Parameter,
  ParameterValue,
}

export const enum TypeBasic {
  any = 1,
  object,
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
  number,
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
  float,
  boolean,
  string,
  array,
  null
}

/**
 * Separator Types
 *
 * Enum values used to infer separator characters of
 * arguments or parameters.
 */
export const enum Separator {
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
  Whitespace,
  /**
   * `\n`
   *
   * Newline character
   */
  Newline,
  /**
   * `=`
   *
   * Equals character
   */
  Equal
}

/**
 * Engine Types
 *
 * String enums that define Liquid engines
 */
export const enum Engine {
  /**
   * Liquid Standard Variation
   *
   * **FREE**
   */
  standard = 'standard',
  /**
   * Liquid Shopify Variation
   *
   * **LICENSED**
   */
  shopify = 'shopify',
  /**
   * Liquid Jekyll Variation
   *
   * **FREE**
   */
  jekyll = 'jekyll',
  /**
   * Liquid Eleventy Variation
   *
   * **FREE**
   */
  eleventy = 'eleventy'
}

/**
 * Combined Type Enum
 *
 * Specifications reference ranges on properties
 * and this export is used to match within those ranges.
 */
export const enum Type {

  /* -------------------------------------------- */
  /* BASIC TYPES                                  */
  /* -------------------------------------------- */
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
  any,
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
  object,
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
  number,
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
  float,
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
  boolean,
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
  string,
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
  array,
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
  constant,

  /* -------------------------------------------- */
  /* ARGUMENT TYPES                               */
  /* -------------------------------------------- */

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
  parameter,
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
  keyword,
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
  attribute,

  /* -------------------------------------------- */
  /* TAG TYPES                                    */
  /* -------------------------------------------- */

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
  control,
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
  comment,
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
  embedded,
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
  generator,
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
  import,
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
  iteration,
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
  link,
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
  output,
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
  variable,
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
  raw,
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
  unknown,
}
