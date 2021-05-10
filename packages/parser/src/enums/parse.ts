/**
 * Token Context
 *
 * Describes the inner context of Liquid tokens. Context is defined
 * within delimeter values. Tags (in general) will almost always start
 * with either `Dash` or `Indentifier`
 *
 * - Context starts from the opening delimeter, eg: `{{` or `{%`
 * - Context ends before the closing delimeter, eg: `}}` or `%}`
 */
export const enum TokenTags {
  /**
   * Associate Type, eg: `<tag> </tag>` | `{% tag %} {% endtag %}`
   */
  "associate" = 1,
  /**
   * Control Type, eg: `{% if %}` | `{% unless %}`
   */
  "control",
  /**
   * Comment Type, eg: `{% comment %} {% endcomment %}`
   */
  "comment",
  /**
   * Embedded Type, eg: `{% schema %} {% endschema %}`
   */
  "embedded",
  /**
   * Import Type, eg: `{% include '' %}` | `{% render '' %}`
   */
  "import",
  /**
   * Iteration Type, eg: `{% for %} {% endfor %}` | `{% cycle %} {% endcycle %}`
   */
  "iteration",
  /**
   * Object Type, eg: `{{ tag }}`
   */
  "object",
  /**
   * Output Type, eg: `{% assign = '' %}` | `{% capture %}`
   */
  "variable",
  /**
   * Raw Type, eg: `{% raw %}`
   */
  "raw",
  /**
   * Unkown Type, eg: `{% no_spec %}`
   */
  "unknown",
}
