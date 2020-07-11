/**
 * Whitespace Characters `\s\t\r\f\n`
 */
export const Whitespace = 1

/**
 * Unknown Characters
 */
export const Unknown = 2

/**
 * Last Chacters in stream
 */
export const EOS = 3

/**
 * After Delimeter `---`
 */
export const YAMLFrontmatterStart = 4

/**
 * After Delimeter `---`
 */
export const YAMLFrontmatterClose = 5

/**
 * Before Delimeter `#` _when_ `# comment`
 */
export const YAMLCommentStart = 6

/**
 * Within Tag `# comment`
 */
export const YAMLComment = 7

/**
 * After Delimeter `\n` _when_ `# comment`
 */
export const YAMLCommentClose = 8

/**
 * Before Delimeter `{%` _when_ `{%- start -%}`
 */
export const LiquidStartTagOpen = 9

/**
 * Within Tag `{%- start -%}`
 */
export const LiquidStartTag = 10

/**
 * After Delimeter `%}` _when_ `{%- start -%}`
 */
export const LiquidStartTagClose = 11

/**
 * Before Delimeter `{%` _when_ `{%- endstart -%}`
 */
export const LiquidEndTagOpen = 12

/**
 * Within Tag `{%- endstart -%}`
 */
export const LiquidEndTag = 13

/**
 * After Delimeter `%}` _when_ `{%- endstart -%}`
 */
export const LiquidEndTagClose = 14

/**
 * Before Delimeter `{%` _when_ `{%- tag -%}`
 */
export const LiquidSingularTagOpen = 15

/**
 * Within Tag  `{%- tag -%}`
 */
export const LiquidSingularTag = 16

/**
 * After Delimeter `%}` _when_ `{%- tag -%}`
 */
export const LiquidSingularTagClose = 17

/**
 * Before Delimeter `{{` _when_ `{{- object -}}`
 */
export const LiquidObjectTagOpen = 18

/**
 * Within Tag `{{- object -}}`
 */
export const LiquidObjectTag = 19

/**
 * After Delimeter `}}` _when_ `{{- tag -}}`
 */
export const LiquidObjectTagClose = 20

/**
 * Before Delimeter `<` _when_ `<tag>`
 */
export const HTMLStartTagOpen = 21

/**
 * Within Tag `<tag>`
 */
export const HTMLStartTag = 22

/**
 * After Delimeter `>` _when_ `<tag>`
 */
export const HTMLStartTagClose = 23

/**
 * Before Delimeter `<` _when_ `</tag>`
 */
export const HTMLEndTagOpen = 24

/**
 * Within Tag `</tag>`
 */
export const HTMLEndTag = 25

/**
 * After Delimeter `>` _when_ `</tag>`
 */
export const HTMLEndTagClose = 26

/**
 * Before Delimeter `<` _when_ `<!-- comment -->`
 */
export const HTMLStartCommentTag = 27

/**
 * Within Tag `<!-- comment -->`
 */
export const HTMLComment = 28

/**
 * After Delimeter `>` _when_ `<!-- comment -->`
 */
export const HTMLEndCommentTag = 29

/**
 * Attribute `attr` _when_ `<tag attr="value">`
 */
export const HTMLAttributeName = 30

/**
 * Value `"value"` _when_ `<tag attr="value">`
 */
export const HTMLAttributeValue = 31
