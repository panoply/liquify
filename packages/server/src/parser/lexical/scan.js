
/**
 * Before Start Delimeter `---`
 */
export const BeforeOpeningFrontmatterStartTag = 1

/**
 * Before End Delimeter `---`
 */
export const BeforeOpeningFrontmatterEndTag = 2

/**
 * After `LAN <` Delimeter, `t` _when_ `<tag>`
 */
export const AfterOpeningHTMLStartTag = 3

/**
 * After `FWS /` Delimeter `/` _when_ `</tag>`
 */
export const AfterOpeningHTMLEndTag = 4

/**
 * Within ` attr="foo"` _when_ `<tag attr="foo">`
 */
export const WithinHTMLTag = 5

/**
 * Within ` >` _when_ `</tag >`
 */
export const WithinHTMLEndTag = 6

/**
 * Within ` comment ` _when_ `<!-- comment -->`
 */
export const WithinHTMLComment = 7

/**
 * Before `=` After `attr` _when_ `<tag attr="foo">`
 */
export const AfterHTMLAttributeName = 8

/**
 * After `="` _when_ `<tag attr="foo">`
 */
export const BeforeHTMLAttributeValue = 9

/**
 * After `PER %` Delimeter `%` _when_ `{% start %}`
 */
export const AfterOpeningLiquidStartTag = 10

/**
 * After `PER %` Delimeter `%` _when_ `{% endstart %}`
 */
export const AfterOpeningLiquidEndTag = 11

/**
 * After `LCB {` Delimeter `{` _when_ `{{ object }}`
 */
export const AfterOpeningLiquidObjectTag = 12

/**
 * After `PER %` Delimeter `%` _when_ `{% tag %}`
 */
export const AfterOpeningLiquidSingularTag = 13

/**
 * Before `COL :` After `param` _when_ `{% tag param: 5 %}`
 */
export const AfterLiquidParameterName = 14

/**
 * Within `- start -` _when_ `{%- start -%}`
 */
export const WithinLiquidStartTag = 15

/**
 * Within `- endtag -` _when_ `{%- endtag -%}`
 */
export const WithinLiquidEndTag = 16

/**
 * Within `- object -` _when_ `{{- object -}}`
 */
export const WithinLiquidObjectTag = 17

/**
 * Within `- tag -` _when_ `{%- tag -%}`
 */
export const WithinLiquidSingularTag = 18

/**
 * Between `{%- comment -%}` _and_ `{%- endcomment -%}`
 */
export const WithinLiquidComment = 19

/**
 * After `PIP |`  _when_ `{{ tag | filter }}`
 */
export const BeforeLiquidFilterName = 20

/**
 * After `value`  _when_ `{{ tag | filter: value }}`
 */
export const AfterLiquidFilterValue = 21

/**
 * After `=` _or_ `:` _when_ `{% tag param: 5 %}`
 */
export const BeforeLiquidParameterValue = 22

/**
 * After `DSH -` _when_ `{%- tag -%}` _or_ `{{- object -}}`
 */
export const BeforeLiquidTagName = 23

/**
 * Before `DQO "` _or_ `'` _when_ `{% tag 'attribute' %}`
 */
export const BeforeLiquidAttribute = 24

/**
 * Before `EQL =` _when_ `{% if tag == value %}`
 */
export const BeforeLiquidOperator = 25
