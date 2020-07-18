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
 * Unknown Characters
 *
 * @enum {number}
 */
export const Content = 3

/**
 * Last Chacters in stream
 *
 * @enum {number}
 */
export const EOS = 4

/**
 * After Delimeter `---`
 *
 * @enum {number}
 */
export const YAMLFrontmatterStart = 5

/**
 * After Delimeter `---`
 *
 * @enum {number}
 */
export const YAMLFrontmatterClose = 6

/**
 * Before Delimeter `#` _when_ `# comment`
 *
 * @enum {number}
 */
export const YAMLCommentStart = 7

/**
 * Within Tag `# comment`
 *
 * @enum {number}
 */
export const YAMLComment = 8

/**
 * After Delimeter `\n` _when_ `# comment`
 *
 * @enum {number}
 */
export const YAMLCommentClose = 9

/**
 * Before Delimeter `{%` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTagOpen = 10

/**
 * Within Tag `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTag = 11

/**
 * After Delimeter `%}` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const LiquidStartTagClose = 12

/**
 * Before Delimeter `{%` _when_ `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTagOpen = 13

/**
 * Within Tag `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTag = 14

/**
 * After Delimeter `%}` _when_ `{%- endstart -%}`
 *
 * @enum {number}
 */
export const LiquidEndTagClose = 15

/**
 * Before Delimeter `{%` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTagOpen = 16

/**
 * Within Tag  `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTag = 17

/**
 * After Delimeter `%}` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const LiquidSingularTagClose = 18

/**
 * Before Delimeter `{{` _when_ `{{- object -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTagOpen = 19

/**
 * Within Tag `{{- object -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTag = 20

/**
 * After Delimeter `}}` _when_ `{{- tag -}}`
 *
 * @enum {number}
 */
export const LiquidObjectTagClose = 21

/**
 * Before Delimeter `<` _when_ `<tag>`
 *
 * @enum {number}
 */
export const HTMLStartTagOpen = 22

/**
 * Within Tag `<tag>`
 *
 * @enum {number}
 */
export const HTMLTagName = 23

/**
 * After Delimeter `>` _when_ `<tag>`
 *
 * @enum {number}
 */
export const HTMLStartTagClose = 24

/**
 * After Delimeter `/>` _when_ `<tag />`
 *
 * @enum {number}
 */
export const HTMLStartTagSelfClose = 25

/**
 * Before Delimeter `<` _when_ `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTagOpen = 26

/**
 * Within Tag `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTag = 27

/**
 * After Delimeter `>` _when_ `</tag>`
 *
 * @enum {number}
 */
export const HTMLEndTagClose = 28

/**
 * Before Delimeter `<` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLStartCommentTag = 29

/**
 * Within Tag `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLComment = 30

/**
 * After Delimeter `>` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const HTMLEndCommentTag = 31

/**
 * Attribute `attr` _when_ `<tag attr="value">`
 *
 * @enum {number}
 */
export const HTMLAttributeName = 32

/**
 * Attribute `attr` _when_ `<tag attr="value">`
 *
 * @enum {number}
 */
export const HTMLOperatorValue = 33

/**
 * Value `"value"` _when_ `<tag attr="value">`
 *
 * @enum {number}
 */
export const HTMLAttributeValue = 34
