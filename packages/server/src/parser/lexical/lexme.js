
/* ------------------ LIQUID ------------------ */
/* eslint key-spacing: ["error", { "align": "value" }] */

/**
 * After Delimeter `---`
 */
export const YAMLFrontmatterStart = 1

/**
 * After Delimeter `---`
 */
export const YAMLFrontmatterClose = 2

/**
 * Before Delimeter `#` _when_ `# comment`
 */
export const YAMLCommentStart = 3

/**
 * Within Tag `# comment`
 */
export const YAMLComment = 4

/**
 * After Delimeter `\n` _when_ `# comment`
 */
export const YAMLCommentClose = 5

/**
 * Before Delimeter `{%` _when_ `{%- start -%}`
 */
export const LiquidStartTagOpen = 6

/**
 * Within Tag `{%- start -%}`
 */
export const LiquidStartTag = 7

/**
 * After Delimeter `%}` _when_ `{%- start -%}`
 */
export const LiquidStartTagClose = 8

/**
 * Before Delimeter `{%` _when_ `{%- endstart -%}`
 */
export const LiquidEndTagOpen = 9

/**
 * Within Tag `{%- endstart -%}`
 */
export const LiquidEndTag = 10

/**
 * After Delimeter `%}` _when_ `{%- endstart -%}`
 */
export const LiquidEndTagClose = 11

/**
 * Before Delimeter `{%` _when_ `{%- tag -%}`
 */
export const LiquidSingularTagOpen = 12

/**
 * Within Tag  `{%- tag -%}`
 */
export const LiquidSingularTag = 13

/**
 * After Delimeter `%}` _when_ `{%- tag -%}`
 */
export const LiquidSingularTagClose = 14

/**
 * Before Delimeter `{{` _when_ `{{- object -}}`
 */
export const LiquidObjectTagOpen = 15

/**
 * Within Tag `{{- object -}}`
 */
export const LiquidObjectTag = 16

/**
 * After Delimeter `}}` _when_ `{{- tag -}}`
 */
export const LiquidObjectTagClose = 17

/**
 * Before Delimeter `<` _when_ `<tag>`
 */
export const HTMLStartTagOpen = 18

/**
 * Within Tag `<tag>`
 */
export const HTMLStartTag = 19

/**
 * After Delimeter `>` _when_ `<tag>`
 */
export const HTMLStartTagClose = 20

/**
 * Before Delimeter `<` _when_ `</tag>`
 */
export const HTMLEndTagOpen = 21

/**
 * Within Tag `</tag>`
 */
export const HTMLEndTag = 22

/**
 * After Delimeter `>` _when_ `</tag>`
 */
export const HTMLEndTagClose = 23

/**
 * Before Delimeter `<` _when_ `<!-- comment -->`
 */
export const HTMLStartCommentTag = 24

/**
 * Within Tag `<!-- comment -->`
 */
export const HTMLComment = 25

/**
 * After Delimeter `>` _when_ `<!-- comment -->`
 */
export const HTMLEndCommentTag = 26

/**
 * Attribute `attr` _when_ `<tag attr="value">`
 */
export const HTMLAttributeName = 27

/**
 * Value `"value"` _when_ `<tag attr="value">`
 */
export const HTMLAttributeValue = 28

/* -------------------------------------------- */
/*                     STATE                    */
/* -------------------------------------------- */

/*
export enum TokenType {
	StartCommentTag,
	Comment,
	EndCommentTag,
	StartTagOpen,
	StartTagClose,
	StartTagSelfClose,
	StartTag,
	EndTagOpen,
	EndTagClose,
	EndTag,
	DelimiterAssign,
	AttributeName,
	AttributeValue,
	StartDoctypeTag,
	Doctype,
	EndDoctypeTag,
	Content,
	Whitespace,
	Unknown,
	Script,
	Styles,
	EOS
}

*/
