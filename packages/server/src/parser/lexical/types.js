
/**
 * `1` Associate Type, eg: `<tag> </tag>` | `{% tag %} {% endtag %}`
 */
export const associate = 1

/**
 * `2` Control Type, eg: `{% if %}` | `{% unless %}`
 */
export const control = 2

/**
 * `3` Comment Type, eg: `{% comment %} {% endcomment %}`
 */
export const comment = 3

/**
 * `4` Embedded Type, eg: `{% schema %} {% endschema %}`
 */
export const embedded = 4

/**
 * `5` Include Type, eg: `{% include '' %}` | `{% render '' %}`
 */
export const include = 5

/**
 * `6` Iteration Type, eg: `{% for %} {% endfor %}` | `{% cycle %} {% endcycle %}`
 */
export const iteration = 6

/**
 * `7` Object Type, eg: `{{ tag }}`
 */
export const object = 7

/**
 * `8` Output Type, eg: `{% assign = '' %}` | `{% capture %}`
 */
export const variable = 8
