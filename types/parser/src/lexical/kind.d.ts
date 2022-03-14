/**
 * Token Kinds
 *
 * When parsing a document, we are likely to come across different
 * "kinds" of tokens. We mark the the token kind for every node we
 * encounter. This is different from `languages` where the language
 * identifiers refer to the embedded type language of tag, but the
 * `kind`refers to the token itself.
 *
 * ---
 *
 * **IMPORTANT**
 *
 * By default, all tokens are assumed to be `liquid`
 *
 * ---
 */
export declare const enum NodeKind {
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
     * Comment, eg: `{% comment %}` | `<!-- -->`
     */
    Comment = 5
}
