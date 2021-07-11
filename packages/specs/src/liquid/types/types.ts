import { Range } from './utils';

/* -------------------------------------------- */
/* MAIN EXPORT USING ALL TYPES                  */
/* -------------------------------------------- */

// THIS ENUM WILL BE EXPORTED AND CONSUMED BY PUBLIC
// MODULES. IT HAS ALL CONST ENUMS COMBINED, WHEREAS
// THE SINGLE ENUM EXPORTS ARE USED ONLY WITHIN THIS
// MODULE TO CONSTRUCT THE SPECIFICATION FILES USED.

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
  object,

  /**
   * **BASIC TYPE**
   *
   * A value that is a digit integer type. It assumes
   * a non negative number value with no decimal points
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
  integer,

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
   * Data Type
   *
   * Data types described a value which contains no properties
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
  data,

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
   * - `{% comment %}`
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

export type BasicTypeRange = Range<1, 9>
export type ArgumentTypeRange = Range<9, 12>
export type BasicToArgumentTypeRange = Range<1, 12>
export type TagTypeRange = Range<12, 22>
