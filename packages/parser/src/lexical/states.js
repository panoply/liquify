/**
 * After Delimters, `{{` , `{%` , `<tag` , `---` , `/*` , `//`
 *
 * @enum {number}
 */
export const WithinContent = 1

/**
 * Before Start Delimeter `---`
 *
 * @enum {number}
 */
export const BeforeYAMLFrontmatter = 2

/**
 * After ending `---` _when_ `--- ---`
 *
 * @enum {number}
 */
export const AfterOpeningFrontmatter = 3

/**
 * After `LAN <` Delimeter, `t` _when_ `<tag>`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLStartTag = 4

/**
 * After `FWS /` Delimeter `/` _when_ `</tag>`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLEndTag = 5

/**
 * Within ` attr="foo"` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLComment = 6

/**
 * Within ` >` _when_ `</tag >`
 *
 * @enum {number}
 */
export const WithinHTMLEndTag = 7

/**
 * Within ` comment ` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const WithinHTMLComment = 8

/**
 * Before `=` After `attr` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const AfterHTMLAttributeName = 9

/**
 * After `="` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const BeforeHTMLAttributeValue = 10

/**
 * After `PER %` Delimeter `%` _when_ `{% start %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidStartTag = 11

/**
 * After `PER %` Delimeter `%` _when_ `{% endstart %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidEndTag = 12

/**
 * After `LCB {` Delimeter `{` _when_ `{{ object }}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidObjectTag = 13

/**
 * After `PER %` Delimeter `%` _when_ `{% tag %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidSingularTag = 14

/**
 * Before `COL :` After `param` _when_ `{% tag param: 5 %}`
 *
 * @enum {number}
 */
export const AfterLiquidParameterName = 15

/**
 * Within `- start -` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const WithinLiquidStartTag = 16

/**
 * Within `- endtag -` _when_ `{%- endtag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidEndTag = 17

/**
 * Within `- object -` _when_ `{{- object -}}`
 *
 * @enum {number}
 */
export const WithinLiquidObjectTag = 18

/**
 * Within `- tag -` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidSingularTag = 19

/**
 * Between `{%- comment -%}` _and_ `{%- endcomment -%}`
 *
 * @enum {number}
 */
export const WithinLiquidComment = 20

/**
 * After `PIP |`  _when_ `{{ tag | filter }}`
 *
 * @enum {number}
 */
export const BeforeLiquidFilterName = 21

/**
 * After `value`  _when_ `{{ tag | filter: value }}`
 *
 * @enum {number}
 */
export const AfterLiquidFilterValue = 22

/**
 * After `=` _or_ `:` _when_ `{% tag param: 5 %}`
 *
 * @enum {number}
 */
export const BeforeLiquidParameterValue = 23

/**
 * After `DSH -` _when_ `{%- tag -%}` _or_ `{{- object -}}`
 *
 * @enum {number}
 */
export const BeforeLiquidTagName = 24

/**
 * Before `DQO "` _or_ `'` _when_ `{% tag 'attribute' %}`
 *
 * @enum {number}
 */
export const BeforeLiquidAttribute = 25

/**
 * Before `EQL =` _when_ `{% if tag == value %}`
 *
 * @enum {number}
 */
export const BeforeLiquidOperator = 26
