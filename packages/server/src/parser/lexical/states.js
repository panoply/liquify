/**
 * Between `---` _and_ `---`
 *
 * @enum {number}
 */
export const WithinYAMLFrontmatter = 1

/**
 * Within `<tag attr="foo">`
 *
 * @enum {number}
 */
export const WithinHTMLStartTag = 2

/**
 * Within ` >` _when_ `</tag >`
 *
 * @enum {number}
 */
export const WithinHTMLEndTag = 3

/**
 * Within ` comment ` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const WithinHTMLComment = 4

/**
 * Within `- start -` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const WithinLiquidTag = 5

/**
 * Within `- endtag -` _when_ `{%- endtag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidEndTag = 6

/**
 * Within `- tag -` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidSingularTag = 7

/**
 * Within `- object -` _when_ `{{- object -}}`
 *
 * @enum {number}
 */
export const WithinLiquidObjectTag = 8

/**
 * Between `{%- comment -%}` _and_ `{%- endcomment -%}`
 *
 * @enum {number}
 */
export const WithinLiquidComment = 9

/**
 * Unkown Contents
 *
 * @enum {number}
 */
export const WithinUnkown = 10

export const WhitespaceDash = 11

export const ControlTag = 12
