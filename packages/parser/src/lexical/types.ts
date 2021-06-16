/**
 * Node Types
 *
 * Describes the type of nodes
 *
 * - Context starts from the opening delimeter, eg: `{{` or `{%`
 * - Context ends before the closing delimeter, eg: `}}` or `%}`
 */
export enum NodeType {
  /**
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
  "control" = 1,

  /**
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
  "comment",

  /**
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
  "embedded",

  /**
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
  "import",

  /**
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
  "iteration",

  /**
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
  "link",

  /**
   * Object Type
   *
   * Object types use double curly brace delimiters and
   * their keyword contains a dot `.` or bracket `[` character.
   * Object types can also be asserted when the name refers
   * to an `object` or `array` in their specification.
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
   * - `{{ object.prop }}`
   * - `{{ object['prop'] }}`
   * - `{{ some_object }}` or `{{ some_array }}`
   */
  "object",

  /**
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
  "output",

  /**
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
  "variable",

  /**
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
  "raw",

  /**
   * Unknown Type
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
  "unknown",
}
