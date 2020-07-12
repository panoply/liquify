
/**
 * Before Start Delimeter `---`
 *
 * @enum {number}
 */
export const BeforeYAMLFrontmatter = 1

/**
 * Between `---` _and_ `---`
 *
 * @enum {number}
 */
export const WithinYAMLFrontmatter = 2

/**
 * After `LAN <` Delimeter, `t` _when_ `<tag>`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLStartTag = 3

/**
 * After `FWS /` Delimeter `/` _when_ `</tag>`
 *
 * @enum {number}
 */
export const AfterOpeningHTMLEndTag = 4

/**
 * Within ` attr="foo"` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const WithinHTMLTag = 5

/**
 * Within ` >` _when_ `</tag >`
 *
 * @enum {number}
 */
export const WithinHTMLEndTag = 6

/**
 * Within ` comment ` _when_ `<!-- comment -->`
 *
 * @enum {number}
 */
export const WithinHTMLComment = 7

/**
 * Before `=` After `attr` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const AfterHTMLAttributeName = 8

/**
 * After `="` _when_ `<tag attr="foo">`
 *
 * @enum {number}
 */
export const BeforeHTMLAttributeValue = 9

/**
 * After `PER %` Delimeter `%` _when_ `{% start %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidStartTag = 10

/**
 * After `PER %` Delimeter `%` _when_ `{% endstart %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidEndTag = 11

/**
 * After `LCB {` Delimeter `{` _when_ `{{ object }}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidObjectTag = 12

/**
 * After `PER %` Delimeter `%` _when_ `{% tag %}`
 *
 * @enum {number}
 */
export const AfterOpeningLiquidSingularTag = 13

/**
 * Before `COL :` After `param` _when_ `{% tag param: 5 %}`
 *
 * @enum {number}
 */
export const AfterLiquidParameterName = 14

/**
 * Within `- start -` _when_ `{%- start -%}`
 *
 * @enum {number}
 */
export const WithinLiquidStartTag = 15

/**
 * Within `- endtag -` _when_ `{%- endtag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidEndTag = 16

/**
 * Within `- object -` _when_ `{{- object -}}`
 *
 * @enum {number}
 */
export const WithinLiquidObjectTag = 17

/**
 * Within `- tag -` _when_ `{%- tag -%}`
 *
 * @enum {number}
 */
export const WithinLiquidSingularTag = 18

/**
 * Between `{%- comment -%}` _and_ `{%- endcomment -%}`
 *
 * @enum {number}
 */
export const WithinLiquidComment = 19

/**
 * After `PIP |`  _when_ `{{ tag | filter }}`
 *
 * @enum {number}
 */
export const BeforeLiquidFilterName = 20

/**
 * After `value`  _when_ `{{ tag | filter: value }}`
 *
 * @enum {number}
 */
export const AfterLiquidFilterValue = 21

/**
 * After `=` _or_ `:` _when_ `{% tag param: 5 %}`
 *
 * @enum {number}
 */
export const BeforeLiquidParameterValue = 22

/**
 * After `DSH -` _when_ `{%- tag -%}` _or_ `{{- object -}}`
 *
 * @enum {number}
 */
export const BeforeLiquidTagName = 23

/**
 * Before `DQO "` _or_ `'` _when_ `{% tag 'attribute' %}`
 *
 * @enum {number}
 */
export const BeforeLiquidAttribute = 24

/**
 * Before `EQL =` _when_ `{% if tag == value %}`
 *
 * @enum {number}
 */
export const BeforeLiquidOperator = 25
