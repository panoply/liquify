/**
 * Whitespace Characters `\s\t\r\f\n`
 *
 * @enum {number}
 */
export const Whitespace = 1

/**
 * Unknown Characters
 *
 * @enum {number}
 */
export const Unknown = 2

/**
 * Last Chacters in stream
 *
 * @enum {number}
 */
export const EOS = 3

/**
 * After Delimeter `---`
 *
 * @enum {number}
 */
export const YAMLFrontmatterStart = 4

/**
 * After Delimeter `---`
 *
 * @enum {number}
 */
export const YAMLFrontmatterClose = 5

/**
 * Before Delimeter `#` _when_ `# comment`
 *
 * @enum {number}
 */
export const YAMLCommentStart = 6

/**
 * Within Tag `# comment`
 *
 * @enum {number}
 */
export const YAMLComment = 7

/**
 * After Delimeter `\n` _when_ `# comment`
 *
 * @enum {number}
 */
export const YAMLCommentClose = 8

/**
 * Before Delimeter `{%` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTagOpen = 9

/**
 * Within Tag `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTag = 10

/**
 * After Delimeter `%}` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTagClose = 11

/**
 * Before Delimeter `{%` _when_ `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTagOpen = 12

/**
 * Within Tag `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTag = 13

/**
 * After Delimeter `%}` _when_ `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTagClose = 14

/**
 * Before Delimeter `{%` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTagOpen = 15

/**
 * Within Tag  `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTag = 16

/**
 * After Delimeter `%}` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTagClose = 17

/**
 * Before Delimeter `{{` _when_ `{{- object -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTagOpen = 18

/**
 * Within Tag `{{- object -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTag = 19

/**
 * After Delimeter `}}` _when_ `{{- tag -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTagClose = 20

/**
 * Before Delimeter `<` _when_ `<tag>`
 *
 * @enum {number}
 */
export const HTMLStartTagOpen = 21

/**
 * Within Tag `<tag>`
 *
 * @enum {number}
 */
export const HTMLStartTag = 22

/**
 * After Delimeter `>` _when_ `<tag>`
 *
 * @enum {number}
 */
export const HTMLStartTagClose = 23

/**
 * Before Delimeter `<` _when_ `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTagOpen = 24

/**
 * Within Tag `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTag = 25

/**
 * After Delimeter `>` _when_ `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTagClose = 26

/**
 * Before Delimeter `<` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLStartCommentTag = 27

/**
 * Within Tag `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLComment = 28

/**
 * After Delimeter `>` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLEndCommentTag = 29

/**
 * Attribute `attr` _when_ `<tag attr="value">`
 *
 * @enum {number}
 */
export const HTMLAttributeName = 30

/**
 * Value `"value"` _when_ `<tag attr="value">`
 *
 * @enum {number}
 */
export const HTMLAttributeValue = 31
