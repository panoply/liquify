/* eslint-disable no-unused-vars */

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
export const enum NodeKind {
  /**
   * Liquid Kind, eg: `{{ tag }}` | `{% tag %}`
   */
  Liquid = 1,

  /**
   * HTML Kind, eg: `<tag>` | `</tag>` | `<tag />`
   */
  HTML,

  /**
   * Frontmatter, eg: `---` | `---`
   */
  Frontmatter,

  /**
   * Raw, eg: `{% raw %}` | `{% endraw %}
   */
  Raw,

  /**
   * Comment, eg: `{% comment %}` | `<!-- -->` | `{% # comment %}`
   */
  Comment

}
