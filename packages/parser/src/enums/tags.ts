export const enum TagType {
  /**
   * Associate Type, eg: `<tag> </tag>` | `{% tag %} {% endtag %}`
   */
  associate,

  /**
   * Control Type, eg: `{% if %}` | `{% unless %}`
   */
  control,

  /**
   * Comment Type, eg: `{% comment %} {% endcomment %}`
   */
  comment,

  /**
   * Embedded Type, eg: `{% schema %} {% endschema %}`
   */
  embedded,

  /**
   * Include Type, eg: `{% include '' %}` | `{% render '' %}`
   */
  include,

  /**
   * Iteration Type, eg: `{% for %} {% endfor %}` | `{% cycle %} {% endcycle %}`
   */
  iteration,

  /**
   * Object Type, eg: `{{ tag }}`
   */
  object,

  /**
   * Output Type, eg: `{% assign = '' %}` | `{% capture %}`
   */
  variable,

  /**
   * Raw Type, eg: `{% raw %}`
   */
  raw,
}
