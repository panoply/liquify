import { Filters } from '../..';

export const filters: Filters = {
  item_count_for_variant: {
    description: 'Returns the total item count for a specified variant in the cart. \n\n\n\n#### Example\n\n```liquid\n\n{{ cart | item_count_for_variant: 39888235757633 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/item_count_for_variant)\n\n',
    returns: 'number',
    snippet: 'item_count_for_variant: ${1}',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ]
  },
  link_to_type: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to a collection page that lists all products of the given\nproduct type. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Health' | link_to_type }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_type)\n\n",
    returns: 'string',
    snippet: 'link_to_type'
  },
  link_to_vendor: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to a collection page that lists all products of a given\nproduct vendor. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"Polina's Potent Potions\" | link_to_vendor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_vendor)\n\n",
    snippet: 'link_to_vendor',
    returns: 'string'
  },
  sort_by: {
    description: "Generates a collection URL with the provided `sort_by` parameter appended. This filter must be applied to a collection URL. Accepts the following values:\n\n- `manual`\n- `best-selling`\n- `title-ascending`\n- `title-descending`\n- `price-ascending`\n- `price-descending`\n- `created-ascending`\n- `created-descending`\n\n\n\n**Tip**\n\n> You can append the `sort_by` filter to the [`url_for_type`](https://shopify.dev/docs/api/liquid/filters/url_for_type)\n> and [`url_for_vendor`](https://shopify.dev/docs/api/liquid/filters/url_for_vendor) filters.\n\n#### Example\n\n```liquid\n\n{{ collection.url | sort_by: 'best-selling' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_by)\n\n",
    snippet: 'sort_by: \'${1|manual,best-selling,title-ascending,title-descending,price-ascending,price-descending,created-ascending,created-descending|}\'',
    returns: 'string',
    arguments: [
      {
        type: 'string',
        required: true,
        value: [
          'manual',
          'best-selling',
          'title-ascending',
          'title-descending',
          'price-ascending',
          'price-descending',
          'created-ascending',
          'created-descending'
        ]
      }
    ]
  },
  url_for_type: {
    description: "Generates a URL for a collection page that lists all products of the given product type. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'health' | url_for_type }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_type)\n\n",
    returns: 'string'
  },
  url_for_vendor: {
    description: "Generates a URL for a collection page that lists all products from the given product vendor. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"Polina's Potent Potions\" | url_for_vendor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_vendor)\n\n",
    returns: 'string'
  },
  within: {
    description: 'Generates a product URL within the context of the provided collection. When the collection context is included, you can access the associated [`collection` object](https://shopify.dev/docs/api/liquid/objects/collection)\nin the [product template](https://shopify.dev/themes/architecture/templates/product).\n\n> Caution:\n> Because a standard product page and a product page in the context of a collection have the same content on separate\n> URLs, you should consider the SEO implications of using the `within` filter.\n\n#### Example\n\n```liquid\n\n{%- assign collection_product = collection.products.first -%}\n\n{{ collection_product.url | within: collection }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/within)\n\n',
    snippet: 'within: ${1}',
    returns: 'string',
    arguments: [
      {
        type: 'array',
        required: true
      }
    ]
  },
  brightness_difference: {
    description: "Calculates the [perceived brightness difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. \n\n**Tip**\n\n> For accessibility best practices, it's recommended to have a minimum brightness difference of 125.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | brightness_difference: '#FECEE9' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/brightness_difference)\n\n",
    snippet: "brightness_difference: '${1:#FECEE9}'",
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    returns: 'number'
  },
  color_brightness: {
    description: "Calculates the [perceived brightness](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) of a given color. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_brightness }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_brightness)\n\n",
    returns: 'number'
  },
  color_contrast: {
    description: "Calculates the contrast ratio between two colors and returns the ratio's numerator. The ratio's denominator, which isn't\nreturned, is always 1. For example, with a contrast ratio of 3.5:1, this filter returns 3.5. The order in which you specify the colors doesn't matter.\n\n\n\n**Tip**\n\n> For accessibility best practices, the\n> [WCAG 2.0 level AA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast-contrast) requires a\n> minimum contrast ratio of 4.5:1 for normal text, and 3:1 for large text. [Level AAA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast7)\n> requires a minimum contrast ratio of 7:1 for normal text, and 4.5:1 for large text.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | color_contrast: '#D9D8FF' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_contrast)\n\n",
    snippet: 'color_contrast: color: ${1:#FFF3F9}',
    arguments: [
      {
        type: 'string',
        description: 'A color to compare with the provided color.',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    returns: 'number'
  },
  color_darken: {
    description: "Darkens a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_darken: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_darken)\n\n",
    returns: 'string',
    snippet: 'color_darken: ${1:30}',
    arguments: [
      {
        type: 'number',
        description: 'A color to compare with the provided color.',
        pattern: [ 0, 100 ],
        required: true
      }
    ]
  },
  color_desaturate: {
    description: "Desaturates a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_desaturate: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_desaturate)\n\n",
    snippet: 'color_desaturate: ${1:30}',
    arguments: [
      {
        type: 'number',
        required: true,
        pattern: [ 0, 100 ],
        description: 'The amount to desaturate the provided color by.'
      }
    ],
    returns: 'string'
  },
  color_difference: {
    description: "Calculates the [color difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. \n\n**Tip**\n\n> For accessibility best practices, it's recommended to have a minimum color difference of 500.\n\n#### Example\n\n```liquid\n\n{{ '#720955' | color_difference: '#FFF3F9' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_difference)\n\n",
    snippet: 'color_difference: ${1:#FFF3F9}',
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true,
        description: 'A color to compare with the provided color.'
      }

    ],
    returns: 'number'
  },
  color_extract: {
    description: "Extracts a specific color component from a given color. Accepts the following color components:\n\n- `alpha`\n- `red`\n- `green`\n- `blue`\n- `hue`\n- `saturation`\n- `lightness`\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_extract: 'red' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_extract)\n\n",
    returns: 'number',
    snippet: "color_extract: '${1|alpha,red,green,blue,hue,saturation,lightness|}'",
    arguments: [
      {
        type: 'string',
        required: true,
        value: [
          'alpha',
          'red',
          'green',
          'blue',
          'hue',
          'saturation',
          'lightness'
        ]
      }
    ]
  },
  color_lighten: {
    description: "Lightens a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_lighten: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_lighten)\n\n",
    snippet: 'color_lighten: percent: ${1:30}',
    arguments: [
      {
        type: 'number',
        pattern: [ 0, 100 ],
        required: true,
        description: 'The amount to lighten the provided color by.'
      }
    ],
    returns: 'string'
  },
  color_mix: {
    description: "Blends two colors together by a specific percentage factor. The percentage must be between 0 and 100. \n\n**Tip**\n\n> A percentage factor of 100 returns the color being filtered. A percentage factor of 0 returns the color\n> supplied to the filter.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | color_mix: '#00936F', 50 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_mix)\n\n",
    snippet: "color_mix: '${1:#FECEE9}', ${2:100}",
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      },
      {
        type: 'number',
        pattern: [ 0, 100 ],
        required: true
      }
    ],
    returns: 'string'
  },
  color_modify: {
    description: "Modifies a specific color component of a given color by a specific amount. The following table outlines valid color components, and the value range for their modifications:\n\n| Component | Value range |\n| --- | --- |\n| <ul><li>`red`</li><li>`green`</li><li>`blue`</li></ul> | An integer between 0 and 255 |\n| `alpha` | A decimal between 0 and 1 |\n| `hue` | An integer between 0 and 360 |\n| <ul><li>`saturation`<li>`lightness`</li></ul> | An integer between 0 and 100 |\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_modify: 'red', 255 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_modify)\n\n",
    snippet: "color_modify: '${1|red,green,blue,alpha,hue,saturation,lightness|}', ${2:100}",
    arguments: [
      {
        type: 'string',
        required: true,
        value: [
          'red',
          'green',
          'blue',
          'alpha',
          'hue',
          'saturation',
          'lightness'
        ]
      },
      {
        type: 'number',
        required: true,
        pattern: {
          red: [
            0,
            255
          ],
          green: [
            0,
            255
          ],
          blue: [
            0,
            255
          ],
          alpha: [
            0,
            1
          ],
          hue: [
            0,
            360
          ],
          saturation: [
            0,
            100
          ]
        }
      }
    ],
    returns: 'string'
  },
  color_saturate: {
    description: "Saturates a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_saturate: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_saturate)\n\n",
    snippet: 'color_saturate: ${1:30}',
    arguments: [
      {
        type: 'number',
        pattern: [ 0, 100 ],
        required: true,
        description: 'The amount to saturate the provided color by.'
      }

    ],
    returns: 'string'

  },
  color_to_hex: {
    description: "Converts a CSS color string to hexadecimal format (`hex6`). Because colors are converted to `hex6` format, if a color with an alpha component is provided, then the alpha component\nis excluded from the output.\n\n#### Example\n\n```liquid\n\n{{ 'rgb(234, 90, 185)' | color_to_hex }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hex)\n\n",
    returns: 'string'
  },
  color_to_hsl: {
    description: "Converts a CSS color string to `HSL` format. If a color with an alpha component is provided, the color is converted to `HSLA` format.\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_to_hsl }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hsl)\n\n",
    returns: 'string'
  },
  color_to_rgb: {
    description: "Converts a CSS color string to `RGB` format. If a color with an alpha component is provided, then the color is converted to `RGBA` format.\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_to_rgb }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_rgb)\n\n",
    returns: 'string'
  },
  hex_to_rgba: {
    description: "⚠️ **DEPRECATED** ⚠️\n\nThe `hex_to_rgba` filter has been replaced by [`color_to_rgb`](/docs/api/liquid/filters/color_to_rgb) and\n[`color_modify`](/docs/api/liquid/filters/color_modify).\n\n---\n\nConverts a CSS color string from  hexadecimal format to `RGBA` format. Shorthand hexadecimal formatting (`hex3`) is also accepted. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | hex_to_rgba }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hex_to_rgba)\n\n",
    returns: 'string',
    deprecated: true,
    snippet: 'hex_to_rgba'
  },
  hmac_sha1: {
    description: "Converts a string into an SHA-1 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | hmac_sha1: 'Polina' -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha1)\n\n",
    returns: 'string',
    snippet: 'hmac_sha1: $1',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ]
  },
  hmac_sha256: {
    description: "Converts a string into an SHA-256 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | hmac_sha256: 'Polina' -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha256)\n\n",
    returns: 'string',
    snippet: 'hmac_sha256: $1',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ]
  },
  md5: {
    description: "Converts a string into an MD5 hash. \n\n\n\n#### Example\n\n```liquid\n\n{{ '' | md5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/md5)\n\n",
    returns: 'string'
  },
  sha1: {
    description: "Converts a string into an SHA-1 hash. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | sha1 -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha1)\n\n",
    returns: 'string'
  },
  sha256: {
    description: "Converts a string into an SHA-256 hash. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | sha256 -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha256)\n\n",
    returns: 'string',
    snippet: 'sha256'
  },
  currency_selector: {
    description: "⚠️ **DEPRECATED** ⚠️\n\nDeprecated without a direct replacement because the [currency form](/docs/api/liquid/tags/form#form-currency) has also been\ndeprecated.\n\n---\n\nGenerates an HTML `<select>` element with an option for each currency available on the store. The `currency_selector` filter must be applied to the [`form` object](https://shopify.dev/docs/api/liquid/objects/form) within a\n[currency form](https://shopify.dev/docs/api/liquid/tags/form#form-currency).\n\n#### Example\n\n```liquid\n\n{% form 'currency' %}\n  {{ form | currency_selector }}\n{% endform %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/currency_selector)\n\n",
    scope: 'form',
    deprecated: true,
    returns: 'string',
    snippet: 'currency_selector'
  },
  customer_login_link: {
    description: "Generates an HTML link to the customer login page. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Log in' | customer_login_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_login_link)\n\n",
    returns: 'string'
  },
  customer_logout_link: {
    description: "Generates an HTML link to log the customer out of their account and redirect to the homepage. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Log out' | customer_logout_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_logout_link)\n\n",
    returns: 'string'
  },
  customer_register_link: {
    description: "Generates an HTML link to the customer registration page. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Create an account' | customer_register_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_register_link)\n\n",
    returns: 'string'
  },
  date: {
    description: "Converts a timestamp into another date format. The `date` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand\nformats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or\n[strftime reference and sandbox](http://www.strfti.me/).\n\n#### Example\n\n```liquid\n\n{{ article.created_at | date: '%B %d, %Y' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/date)\n\n",
    arguments: [
      {
        type: 'string',
        required: false,
        description: 'The desired date format.'
      }
    ],
    returns: 'string'
  },
  font_face: {
    description: 'Generates a CSS [`@font_face` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face) to load the provided font. \n\n\n\n#### Example\n\n```liquid\n\n{{ settings.type_header_font | font_face }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_face)\n\n',
    arguments: [
      {
        type: 'parameter',
        value: {
          font_display: {
            type: 'string',
            pattern: /\b(?:auto|block|swap|fallback|optional)\b/,
            description: '[string] Customize the [`font_display` property](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) of the `@font-face` declaration.',
            value: [
              {
                value: 'auto',
                description: 'The font display strategy is defined by the user agent.'
              },
              {
                value: 'block',
                description: 'Gives the font face a short block period and an infinite swap period.'
              },
              {
                value: 'swap',
                description: 'Gives the font face an extremely small block period and an infinite swap period.'
              },
              {
                value: 'fallback',
                description: 'Gives the font face an extremely small block period and a short swap period.'
              },
              {
                value: 'optional',
                description: 'Gives the font face an extremely small block period and no swap period.'
              }
            ]
          }
        }
      }
    ],
    returns: 'string'

  },
  font_modify: {
    description: "Modifies a specific property of a given font. The `font_modify` filter requires two parameters. The first indicates which property should be modified and the second is\neither the new value, or modification amount, for that property.\n\n\n\n**Tip**\n\n> You can access every variant of the chosen font's family by using [`font.variants`](https://shopify.dev/docs/api/liquid/objects/font#font-variants).\n> However, you can more easily access specific styles and weights by using the `font_modify` filter.\n\nThe following table outlines the valid font properties and modification values:\n\n<table>\n  <thead>\n    <th>Property</th>\n    <th>Modification value</th>\n    <th>Output</th>\n  </thead>\n  <tbody>\n    <tr>\n      <td rowspan=3><code>style</code></td>\n      <td><code>normal</code></td>\n      <td>Returns the normal variant of the same weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>italic</code></td>\n      <td>Returns the italic variant of the same weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>oblique</code></td>\n      <td>\n        <p>Returns the oblique variant of the same weight, if it exists.</p>\n        <p>Oblique variants are similar to italic variants in appearance. All Shopify fonts have only oblique or italic variants, not both.</p>\n      </td>\n    </tr>\n    <tr>\n      <td rowspan=7><code>weight</code></td>\n      <td><code>100</code> &rarr; <code>900</code></td>\n      <td>Returns a variant of the same style with the given weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>normal</code></td>\n      <td>Returns a variant of the same style with a weight of <code>400</code>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>bold</code></td>\n      <td>Returns a variant of the same style with a weight of <code>700</code>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>+100</code> &rarr; <code>+900</code></td>\n      <td>\n        <p>Returns a variant of the same style with a weight incremented by the given value, if it exists.</p>\n        <p>For example, if a font has a weight of <code>400</code>, then using <code>+100</code> would return the font with a weight of <code>500</code>.</p>\n      </td>\n    </tr>\n    <tr>\n      <td><code>-100</code> &rarr; <code>-900</code></td>\n      <td>\n        <p>Returns a variant of the same style with a weight decremented by the given value, if it exists.</p>\n        <p>For example, if a font has a weight of <code>400</code>, then using <code>-100</code> would return the font with a weight of <code>300</code>.</p>\n      </td>\n    </tr>\n    <tr>\n      <td><code>lighter</code></td>\n      <td>Returns a lighter variant of the same style by applying the rules used by the <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights\">CSS <code>font-weight</code> property</a> and browser <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights\">fallback weights</a>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>bolder</code></td>\n      <td>Returns a bolder variant of the same style by applying the rules used by the <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights\">CSS <code>font-weight</code> property</a> and browser <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights\">fallback weights</a>, if it exists.</td>\n    </tr>\n  </tbody>\n</table>\n\n#### Example\n\n```liquid\n\n{%- assign bold_font = settings.type_body_font | font_modify: 'weight', 'bold' -%}\n\nh2 {\n  font-weight: {{ bold_font.weight }};\n}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_modify)\n\n",
    snippet: "font_modify: '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
    arguments: [
      {
        type: 'string',
        required: true,
        value: [ 'style', 'weight' ]
      },
      {
        type: 'string',
        required: true,
        pattern: {
          style: /\b(?:normal|italic|oblique)\b/,
          weight: /\b(?:normal|bold|bolder|lighter|[+-]?[1-9]0{2})\b/
        },
        value: {
          style: [
            {
              value: 'normal',
              description: 'Returns the normal variant of the same weight (if it exists)'
            },
            {
              value: 'italic',
              description: 'Returns the italic variant of the same weight (if it exists)'
            },
            {
              value: 'oblique',
              description: 'Has the same behavior as italic. None of the font families provided by Shopify have both italic and oblique styles.'
            }
          ],
          weight: [
            {
              value: 'normal',
              description: 'Has the same behavior as `400`.'
            },
            {
              value: 'bold',
              description: 'Has the same behavior as `700`'
            },
            {
              value: 'bolder',
              description: 'Returns a bolder variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists).'
            },
            {
              value: 'lighter',
              description: 'Returns a lighter variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists).'
            }
          ]
        }
      }
    ],
    returns: 'any'
  },
  font_url: {
    description: 'Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for the provided font in `woff2` format. \n\n\n\n#### Example\n\n```liquid\n\n{{ settings.type_header_font | font_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_url)\n\n',
    arguments: [
      {
        type: 'string',
        required: false,
        description: 'Choose to return the URL for the font in `woff` format, instead of `woff2`.'
      }
    ],
    returns: 'string'
  },
  default_errors: {
    description: 'Generates default error messages for each possible value of [`form.errors`](https://shopify.dev/docs/themes/liquid/reference/objects/form#form-errors). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_errors)\n\n',
    scope: 'form',
    returns: 'string'
  },
  payment_button: {
    description: "Generates an HTML container to host [dynamic checkout buttons](https://help.shopify.com/manual/online-store/dynamic-checkout)\nfor a product. The `payment_button` filter must be used on the `form` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product). \n\n**Note**\n\n> You can't render dynamic checkout buttons through AJAX requests, including those through the\n> [Section Rendering API](https://shopify.dev/api/section-rendering). The dynamic checkout buttons are added by JavaScript included\n> by Shopify through the [`content_for_header`](https://shopify.dev/docs/api/liquid/objects/content_for_header) object, which only runs on\n> the initial page load.\n\n#### Example\n\n```liquid\n\n{% form 'product', product %}\n  {{ form | payment_button }}\n{% endform %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_button)\n\n",
    scope: 'form',
    returns: 'string'
  },
  payment_terms: {
    description: "Generates the HTML for the [Shop Pay Installments banner](https://shopify.dev/themes/pricing-payments/installments). The `payment_terms` filter must be used on the `form` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product) or\n[cart form](https://shopify.dev/docs/api/liquid/tags/form#form-cart).\n\n```liquid\n{% form 'product', product %}\n  {{ form | payment_terms }}\n{% endform %}\n```\n\n```liquid\n{% form 'cart', cart %}\n  {{ form | payment_terms }}\n{% endform %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_terms)\n\n",
    returns: 'string'
  },
  time_tag: {
    description: "Converts a timestamp into an HTML `<time>` tag. The `time_tag` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand\nformats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or\n[strftime reference and sandbox](http://www.strfti.me/).\n\n#### Example\n\n```liquid\n\n{{ article.created_at | time_tag: '%B %d, %Y' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/time_tag)\n\n",
    arguments: [
      {
        type: 'string',
        pattern: /%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,
        description: 'The time_tag filter accepts the same parameters as Ruby\'s strftime method.'
      },
      {
        type: 'parameter',
        value: {
          datetime: {
            type: 'string',
            pattern: /%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,
            description: 'A datetime parameter with strftime shorthand formats to use a custom format for the datetime attribute of the output `<time>` tag.'
          },
          format: {
            type: 'string',
            description: 'The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use',
            strict: false,
            value: [
              {
                value: 'abbreviated_date',
                description: 'Dec 31, 2018'
              },
              {
                value: 'basic',
                description: '12/31/2018'
              },
              {
                value: 'date',
                description: 'December 31, 2018'
              },
              {
                value: 'date_at_time',
                description: 'December 31, 2018 at 1:00 pm'
              },
              {
                value: 'default',
                description: 'Monday, December 31, 2018 at 1:00 pm -0500'
              },
              {
                value: 'on_date',
                description: 'on Dec 31, 2018'
              }
            ]
          }
        }
      }
    ],
    returns: 'string',
    snippet: 'time_tag'
  },
  translate: {
    description: 'Returns a string of translated text for a given translation key from a [locale file](https://shopify.dev/themes/architecture/locales). The `translate` filter has an alias of `t`, which is more commonly used.\n\n\n\n**Tip**\n\n> To learn more about using the `t` filter, refer to [storefront locale file usage](https://shopify.dev/themes/architecture/locales/storefront-locale-files#usage)\n> or [schema locale file usage](https://shopify.dev/themes/architecture/locales/schema-locale-files#usage).\n\n#### Example\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/translate)\n\n',
    returns: 'string'
  },
  json: {
    description: "Converts a string, or object, into JSON format. \n\n**Tip**\n\n> When using the JSON output in JavaScript, you don't need to wrap it in quotes because the `json` filter includes them.\n> The `json` filter also escapes any quotes inside the output.\n\n#### Product inventory\n\nWhen applied to a [`product` object](https://shopify.dev/docs/api/liquid/objects/product) on any Shopify store created after December 5, 2017, the\n`json` filter doesn't output values for the `inventory_quantity` and `inventory_policy` properties of any associated\n[variants](https://shopify.dev/docs/api/liquid/objects/variant). These properties are excluded to help prevent bots and crawlers from retrieving\ninventory quantities for stores to which they aren't granted access.\n\nIf you need inventory information, you can access it through individual variants.\n\n#### Example\n\n```liquid\n\n{{ product | json }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/json)\n\n",
    returns: 'string'
  },
  abs: {
    description: 'Returns the absolute value of a number. \n\n\n\n#### Example\n\n```liquid\n\n{{ -3 | abs }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/abs)\n\n',
    returns: 'number'
  },
  append: {
    description: 'Adds a given string to the end of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%-  assign path = product.url -%}\n\n{{ request.origin | append: path }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/append)\n\n',
    snippet: "append: '${1}'",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  at_least: {
    description: 'Limits a number to a minimum value. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | at_least: 5 }}\n{{ 4 | at_least: 3 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_least)\n\n',
    snippet: 'at_least: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  at_most: {
    description: 'Limits a number to a maximum value. \n\n\n\n#### Example\n\n```liquid\n\n{{ 6 | at_most: 5 }}\n{{ 4 | at_most: 5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_most)\n\n',
    snippet: 'at_most: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  base64_decode: {
    description: "Decodes a string in [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'b25lIHR3byB0aHJlZQ==' | base64_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_decode)\n\n",
    returns: 'string'
  },
  base64_encode: {
    description: "Encodes a string to [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'one two three' | base64_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_encode)\n\n",
    returns: 'string'
  },
  base64_url_safe_decode: {
    description: "Decodes a string in URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'b25lIHR3byB0aHJlZQ==' | base64_url_safe_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_decode)\n\n",
    returns: 'string'
  },
  base64_url_safe_encode: {
    description: "Encodes a string to URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\nTo produce URL-safe Base64, this filter uses `-` and `_` in place of `+` and `/`.\n\n```liquid\n\n{{ 'one two three' | base64_url_safe_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_encode)\n\n",
    returns: 'string'
  },
  capitalize: {
    description: "Capitalizes the first word in a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'this sentence should start with a capitalized word.' | capitalize }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/capitalize)\n\n",
    returns: 'string'
  },
  ceil: {
    description: 'Rounds a number up to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 1.2 | ceil }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/ceil)\n\n',
    returns: 'number'
  },
  compact: {
    description: "Removes any `nil` items from an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign original_prices = collection.products | map: 'compare_at_price' -%}\n\nOriginal prices:\n\n{% for price in original_prices -%}\n  - {{ price }}\n{%- endfor %}\n\n{%- assign compacted_original_prices = original_prices | compact -%}\n\nOriginal prices - compacted:\n\n{% for price in compacted_original_prices -%}\n  - {{ price }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/compact)\n\n",
    returns: 'array'
  },
  concat: {
    description: "Concatenates (combines) two arrays. \n\n**Note**\n\n> The `concat` filter won't filter out duplicates. If you want to remove duplicates, then you need to use the\n> [`uniq` filter](https://shopify.dev/docs/api/liquid/filters/uniq).\n\n#### Example\n\n```liquid\n\n{%- assign types_and_vendors = collection.all_types | concat: collection.all_vendors -%}\n\nTypes and vendors:\n\n{% for item in types_and_vendors -%}\n  {%- if item != blank -%}\n    - {{ item }}\n  {%- endif -%}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/concat)\n\n",
    snippet: 'concat: ${1}',
    arguments: [
      {
        type: 'array',
        required: true
      }
    ],
    returns: 'array'
  },
  default: {
    description: 'Sets a default value for any variable whose value is one of the following:\n\n- [`empty`](https://shopify.dev/docs/api/liquid/basics#empty)\n- [`false`](https://shopify.dev/docs/api/liquid/basics#truthy-and-falsy)\n- [`nil`](https://shopify.dev/docs/api/liquid/basics#nil) \n\n\n\n#### Example\n\n```liquid\n\n{{ product.selected_variant.url | default: product.url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default)\n\n',
    arguments: [
      {
        type: 'parameter',
        value: {
          allow_false: {
            type: 'boolean',
            description: 'Whether to use false values instead of the default.'
          }
        }
      }
    ],
    returns: 'any'
  },
  divided_by: {
    description: 'Divides a number by a given number. The `divided_by` filter produces a result of the same type as the divisor. This means if you divide by an integer, the result will be an integer, and if you divide by a float, the result will be a float. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | divided_by: 2 }}\n\n# divisor is an integer\n{{ 20 | divided_by: 7 }}\n\n# divisor is a float \n{{ 20 | divided_by: 7.0 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/divided_by)\n\n',
    snippet: 'divided_by: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  downcase: {
    description: 'Converts a string to all lowercase characters. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.title | downcase }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/downcase)\n\n',
    returns: 'string'
  },
  escape: {
    description: "Escapes special characters in HTML, such as `<>`, `'`, and `&`, and converts characters into escape sequences. The filter doesn't effect characters within the string that don’t have a corresponding escape sequence.\". \n\n\n\n#### Example\n\n```liquid\n\n{{ '<p>Text to be escaped.</p>' | escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape)\n\n",
    returns: 'string'
  },
  escape_once: {
    description: "Escapes a string without changing characters that have already been escaped. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign escaped_text = '<p>Text to be escaped.</p>' | escape -%}\n\n{{ escaped_text }}\n{{ escaped_text | escape_once }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape_once)\n\n",
    returns: 'string'
  },
  first: {
    description: 'Returns the first item in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign first_product = collection.products | first -%}\n\n{{ first_product.title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/first)\n\n',
    returns: 'any'
  },
  floor: {
    description: 'Rounds a number down to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 1.2 | floor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/floor)\n\n',
    returns: 'number'
  },
  join: {
    description: 'Combines all of the items in an array into a single string, separated by a space. \n\n\n\n#### Example\n\n```liquid\n\n{{ collection.all_tags | join }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/join)\n\n',
    snippet: "join: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  last: {
    description: 'Returns the last item in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign last_product = collection.products | last -%}\n\n{{ last_product.title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/last)\n\n',
    returns: 'any'
  },
  lstrip: {
    description: "Strips all whitespace from the left of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = '  Some potions create whitespace.      ' -%}\n\n\"{{ text }}\"\n\"{{ text | lstrip }}\"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/lstrip)\n\n",
    returns: 'string'
  },
  map: {
    description: "Creates an array of values from a specific property of the items in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign product_titles = collection.products | map: 'title' -%}\n\n{{ product_titles | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/map)\n\n",
    snippet: 'map: $1',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ],
    returns: 'array'
  },
  minus: {
    description: 'Subtracts a given number from another number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | minus: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/minus)\n\n',
    snippet: 'minus: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  modulo: {
    description: 'Returns the remainder of dividing a number by a given number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 12 | modulo: 5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/modulo)\n\n',
    snippet: 'modulo: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  newline_to_br: {
    description: 'Converts newlines (`\\n`) in a string to HTML line breaks (`<br>`). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.description | newline_to_br }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/newline_to_br)\n\n',
    returns: 'string'
  },
  plus: {
    description: 'Adds two numbers. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2 | plus: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/plus)\n\n',
    snippet: 'plus: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  prepend: {
    description: 'Adds a given string to the beginning of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign origin = request.origin -%}\n\n{{ product.url | prepend: origin }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/prepend)\n\n',
    snippet: "prepend: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  remove: {
    description: "Removes any instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"I can't do it!\" | remove: \"'t\" }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove)\n\n",
    snippet: "remove: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  remove_first: {
    description: "Removes the first instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"I hate it when I accidentally spill my duplication potion accidentally!\" | remove_first: ' accidentally' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_first)\n\n",
    snippet: 'remove_first: $1',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  remove_last: {
    description: "Removes the last instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"I hate it when I accidentally spill my duplication potion accidentally!\" | remove_last: ' accidentally' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_last)\n\n",
    returns: 'string',
    snippet: 'remove_last: ${1}',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ]
  },
  replace: {
    description: "Replaces any instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace)\n\n",
    snippet: 'replace: $1, $2',
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  replace_first: {
    description: "Replaces the first instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace_first: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_first)\n\n",
    snippet: 'replace_first: $1, $2',
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  replace_last: {
    description: "Replaces the last instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace_last: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_last)\n\n",
    returns: 'string',
    snippet: 'replace_last: $1, $2',
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ]
  },
  reverse: {
    description: "Reverses the order of the items in an array. \n\n\n\n#### Example\n\n```liquid\n\nOriginal order:\n{{ collection.products | map: 'title' | join: ', ' }}\n\nReverse order:\n{{ collection.products | reverse | map: 'title' | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/reverse)\n\n",
    returns: 'array'
  },
  round: {
    description: 'Rounds a number to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2.7 | round }}\n{{ 1.3 | round }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/round)\n\n',
    arguments: [
      {
        type: 'number',
        required: false
      }
    ],
    returns: 'number'
  },
  rstrip: {
    description: "Strips all whitespace from the right of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = '  Some potions create whitespace.      ' -%}\n\n\"{{ text }}\"\n\"{{ text | rstrip }}\"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/rstrip)\n\n",
    returns: 'string'
  },
  size: {
    description: 'Returns the size of a string or array. The size of a string is the number of characters that the string includes. The size of an array is the number of items\nin the array.\n\n#### Example\n\n```liquid\n\n{{ collection.title | size }}\n{{ collection.products | size }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/size)\n\n',
    returns: 'number'
  },
  slice: {
    description: "Returns a substring or series of array items, starting at a given 0-based index. By default, the substring has a length of one character, and the array series has one array item. However, you can\nprovide a second parameter to specify the number of characters or array items.\n\n#### Example\n\n```liquid\n\n{{ collection.title | slice: 0 }}\n{{ collection.title | slice: 0, 5 }}\n\n{{ collection.all_tags | slice: 1, 2 | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/slice)\n\n",
    snippet: 'slice: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      },
      {
        type: 'number',
        required: false
      }
    ],
    returns: 'string'
  },
  sort: {
    description: 'Sorts the items in an array in case-sensitive alphabetical, or numerical, order. \n\n\n\n#### Example\n\n```liquid\n\n{% assign tags = collection.all_tags | sort %}\n\n{% for tag in tags -%}\n  {{ tag }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort)\n\n',
    arguments: [
      {
        type: 'number',
        required: false
      }
    ],
    returns: 'array'
  },
  sort_natural: {
    description: "Sorts the items in an array in case-insensitive alphabetical order.\n\n> Caution:\n> You shouldn't use the `sort_natural` filter to sort numerical values. When comparing items an array, each item is converted to a\n> string, so sorting on numerical values can lead to unexpected results.\n\n#### Example\n\n```liquid\n\n{% assign tags = collection.all_tags | sort_natural %}\n\n{% for tag in tags -%}\n  {{ tag }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_natural)\n\n",
    returns: 'array'
  },
  split: {
    description: "Splits a string into an array of substrings based on a given separator. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign title_words = product.handle | split: '-' -%}\n\n{% for word in title_words -%}\n  {{ word }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/split)\n\n",
    snippet: 'split: $1',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ],
    returns: 'array'
  },
  strip: {
    description: "Strips all whitespace from the left and right of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = '  Some potions create whitespace.      ' -%}\n\n\"{{ text }}\"\n\"{{ text | strip }}\"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip)\n\n",
    returns: 'string'
  },
  strip_html: {
    description: 'Strips all HTML tags from a string. \n\n\n\n#### Example\n\n```liquid\n\n<!-- With HTML -->\n{{ product.description }}\n\n<!-- HTML stripped -->\n{{ product.description | strip_html }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_html)\n\n',
    returns: 'string'
  },
  strip_newlines: {
    description: 'Strips all newline characters (line breaks) from a string. \n\n\n\n#### Example\n\n```liquid\n\n<!-- With newlines -->\n{{ product.description }}\n\n<!-- Newlines stripped -->\n{{ product.description | strip_newlines }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_newlines)\n\n',
    returns: 'string'
  },
  sum: {
    description: "Returns the sum of all elements in an array. \n\n\n\n#### Example\n\n```liquid\n\n{% assign fibonacci = '0, 1, 1, 2, 3, 5' | split: ', ' %}\n\n{{ fibonacci | sum }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sum)\n\n"
  },
  times: {
    description: 'Multiplies a number by a given number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2 | times: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/times)\n\n',
    snippet: 'times: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'number'
  },
  truncate: {
    description: 'Truncates a string down to a given number of characters. If the specified number of characters is less than the length of the string, then an ellipsis (`...`) is appended to\nthe truncated string. The ellipsis is included in the character count of the truncated string.\n\n#### Example\n\n```liquid\n\n{{ article.title | truncate: 15 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncate)\n\n',
    snippet: 'truncate: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'string'
  },
  truncatewords: {
    description: "Truncates a string down to a given number of words. If the specified number of words is less than the number of words in the string, then an ellipsis (`...`) is appended to\nthe truncated string.\n\n> Caution:\n> HTML tags are treated as words, so you should strip any HTML from truncated content. If you don't strip HTML, then\n> closing HTML tags can be removed, which can result in unexpected behavior.\n\n#### Example\n\n```liquid\n\n{{ article.content | strip_html | truncatewords: 15 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncatewords)\n\n",
    snippet: 'truncatewords: $1',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    returns: 'string'
  },
  uniq: {
    description: "Removes any duplicate items in an array. \n\n\n\n#### Example\n\n```liquid\n\n{% assign potion_array = 'invisibility, health, love, health, invisibility' | split: ', ' %}\n\n{{ potion_array | uniq | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/uniq)\n\n",
    returns: 'array'
  },
  upcase: {
    description: 'Converts a string to all uppercase characters. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.title | upcase }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/upcase)\n\n',
    returns: 'string'
  },
  url_decode: {
    description: "Decodes any [percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) characters\nin a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'test%40test.com' | url_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_decode)\n\n",
    returns: 'string'
  },
  url_encode: {
    description: "Converts any URL-unsafe characters in a string to the\n[percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) equivalent. \n\n**Note**\n\n> Spaces are converted to a `+` character, instead of a percent-encoded character.\n\n#### Example\n\n```liquid\n\n{{ 'test@test.com' | url_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_encode)\n\n",
    returns: 'string'
  },
  where: {
    description: "Filters an array to include only items with a specific property value. This requires you to provide both the property name and the associated value.\n\n#### Example\n\n```liquid\n\n{% assign polina_products = collection.products | where: 'vendor', \"Polina's Potent Potions\" %}\n\nProducts from Polina's Potent Potions:\n\n{% for product in polina_products -%}\n  - {{ product.title }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/where)\n\n",
    snippet: 'where: ${1}, ${2}',
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'array'
  },
  external_video_tag: {
    description: "Generates an HTML `<iframe>` tag containing the player for a given external video. The input for the `external_video_tag`\nfilter can be either a [`media` object](https://shopify.dev/docs/api/liquid/objects/media) or [`external_video_url`](https://shopify.dev/docs/api/liquid/filters/external_video_url). If [alt text is set on the video](https://help.shopify.com/en/manual/products/product-media/add-alt-text), then it's\nincluded in the `title` attribute of the `<iframe>`. If no alt text is set, then the `title` attribute is set to the\nproduct title.\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'external_video' %}\n    {% if media.host == 'youtube' %}\n      {{ media | external_video_url: color: 'white' | external_video_tag }}\n    {% elsif media.host == 'vimeo' %}\n      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}\n    {% endif %}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_tag)\n\n",
    returns: 'string'
  },
  external_video_url: {
    description: "Returns the URL for a given external video. Use this filter to specify parameters for the external video player generated\nby the [`external_video_tag` filter](https://shopify.dev/docs/api/liquid/filters/external_video_tag). \n\n\n\n#### Example\n\nYou can specify [YouTube](https://developers.google.com/youtube/player_parameters#Parameters) and [Vimeo](https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters) video parameters by adding a parameter that matches the parameter name, and the desired value.\n\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'external_video' %}\n    {% if media.host == 'youtube' %}\n      {{ media | external_video_url: color: 'white' | external_video_tag }}\n    {% elsif media.host == 'vimeo' %}\n      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}\n    {% endif %}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_url)\n\n",
    returns: 'string',
    snippet: 'external_video_url: $1: $2',
    arguments: [
      {
        type: 'any',
        required: true
      },
      {
        type: 'any',
        required: true
      }
    ]
  },
  image_tag: {
    description: 'Generates an HTML `<img>` tag for a given [`image_url`](https://shopify.dev/docs/api/liquid/filters/image_url). By default, `width` and `height` attributes are added to the `<img>` tag based on the dimensions and aspect ratio from\nthe image URL. However, you can override these attributes with the [width](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-width) and [height](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-height)\nparameters. If only one parameter is provided, then only that attribute is added.\n\n\n\n**Note**\n\n> This filter automatically applies the `object-position` css style from the focal point value if set. For more\n> information, refer to the [`focal_point` object](https://shopify.dev/docs/api/liquid/objects/focal_point).\n\n#### Example\n\n```liquid\n\n{{ product | image_url: width: 200 | image_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_tag)\n\n',
    returns: 'string',
    snippet: 'image_tag'
  },
  media_tag: {
    description: 'Generates an appropriate HTML tag for a given media object. \n\n\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {{- media | media_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/media_tag)\n\n',
    returns: 'string',
    snippet: 'media_tag'
  },
  model_viewer_tag: {
    description: "Generates a [Google model viewer component](https://modelviewer.dev/) for a given 3D model. \n\n\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'model' %}\n    {{ media | model_viewer_tag }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag)\n\n",
    returns: 'string',
    snippet: 'model_viewer_tag'
  },
  video_tag: {
    description: "Generates an HTML `<video>` tag for a given video. \n\n**Note**\n\n> When `mp4` videos are uploaded, Shopify generates an `m3u8` file as an additional [`video_source`](https://shopify.dev/docs/api/liquid/objects/video_source).\n> An `m3u8` file enables video players to leverage [HTTP live streaming (HLS)](https://developer.apple.com/streaming/),\n> resulting in an optimized video experience based on the user's internet connection. If loop is enabled, the HLS source is not used\n> in order to allow progessive download to cache the video.\n>\n> If the `m3u8` source isn't supported, then the player falls back to the `mp4` source.\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'video' %}\n    {{ media | video_tag }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/video_tag)\n\n",
    returns: 'string',
    snippet: 'video_tag'
  },
  metafield_tag: {
    description: "Generates an HTML element to host the metafield data. The type of element that's generated differs depending on the\ntype of metafield. \n\n**Note**\n\n> The `metafield_tag` filter doesn't support list metafields other than `list.single_line_text_field`.\n\n#### Basic types\n\nMost metafield types return a simple HTML element:\n\n| Type | Element | Attributes |\n| --- | --- | --- |\n| `boolean` | `<span>` | `class=\"metafield-boolean\"` |\n| `collection_reference` | `<a>` | `class=\"metafield-collection_reference\"` |\n| `color` | `<span>` | `class=\"metafield-color\"` |\n| `date` | `<time>` | `datetime=\"<the metafield value>\"`<br><br>`class=\"metafield-date\"`<br><br>Value is localized to the customer |\n| `date_time` | `<time>` | `datetime=\"<the metafield value>\"`<br><br>`class=\"metafield-date\"`<br><br>Value is localized to the customer |\n| `json` | `<script>` | `type=\"application/json\"`<br><br>`class=\"metafield-json\"` |\n| `money` | `<span>` | `class=\"metafield-money\"`<br><br>Value is formatted using the store's [HTML with currency setting](https://help.shopify.com/manual/payments/currency-formatting) |\n| `multi_line_text_field` | `<span>` | `class=\"metafield-multi_line_text_field\"` |\n| `number_decimal` | `<span>` | `class=\"metafield-number_decimal\"` |\n| `number_integer` | `<span>` | `class=\"metafield-number_integer\"` |\n| `page_reference` | `<a>` | `class=\"metafield-page_reference\"` |\n| `product_reference` | `<a>` | `class=\"metafield-page_reference\"` |\n| `rating` | `<span>` | `class=\"metafield-rating\"` | |\n| `single_line_text_field` | `<span>` | `class=\"metafield-single_line_text_field\"` |\n| `url` | `<a>` | `class=\"metafield-url\"` |\n| `variant_reference` | `<a>` | `class=\"metafield-variant_reference\"` |\n| `rich_text_field` | `<div>` | `class=\"metafield-rich_text_field\"` |\n\n\n```liquid\n\n<!-- boolean -->\n{{ product.metafields.information.seasonal | metafield_tag }}\n\n<!-- collection_reference -->\n{{ product.metafields.information.related_collection | metafield_tag }}\n\n<!-- color -->\n{{ product.metafields.details.potion_color | metafield_tag }}\n\n<!-- date -->\n{{ product.metafields.information.expiry | metafield_tag }}\n\n<!-- date_time -->\n{{ product.metafields.information.brew_date | metafield_tag }}\n\n<!-- json -->\n{{ product.metafields.information.burn_temperature | metafield_tag }}\n\n<!-- money -->\n{{ product.metafields.details.price_per_ml | metafield_tag }}\n\n<!-- multi_line_text_field -->\n{{ product.metafields.information.shipping | metafield_tag }}\n\n<!-- number_decimal -->\n{{ product.metafields.information.salinity | metafield_tag }}\n\n<!-- number_integer -->\n{{ product.metafields.information.doses_per_day | metafield_tag }}\n\n<!-- page_reference -->\n{{ product.metafields.information.dosage | metafield_tag }}\n\n<!-- product_reference -->\n{{ product.metafields.information.related_product | metafield_tag }}\n\n<!-- rating -->\n{{ product.metafields.details.rating | metafield_tag }}\n\n<!-- single_line_text_field -->\n{{ product.metafields.information.directions | metafield_tag }}\n\n<!-- url -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- variant_reference -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- rich_text_field -->\n{{ product.metafields.information.rich_description | metafield_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_tag)\n\n",
    returns: 'string'
  },
  metafield_text: {
    description: "Generates a text version of the metafield data. The following outlines the output for each metafield type:\n\n| Metafield type | Output |\n| --- | --- |\n| `single_line_text_field` | The metafield text. |\n| `multi_line_text_field` | The metafield text. |\n| `page_reference` | The page title. |\n| `product_reference` | The product title. |\n| `collection_reference` | The collection title. |\n| `variant_reference` | The variant title. |\n| `file_reference` | The file URL. |\n| `number_integer` | The number. |\n| `number_decimal` | The number. |\n| `date` | The date. |\n| `date-time` | The date and time. |\n| `url` | The URL. |\n| `json` | The JSON. |\n| `boolean` | The boolean value. |\n| `color` | The color value. |\n| `weight` | The weight value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `volume` | The volume value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `dimension` | The dimension value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `rating` | The rating value. |\n| `list.single_line_text_field` | The metafield values converted to a sentence.<br><br>For example, if you had the values `Toronto`, `Ottawa`, and `Vancouver`, then the output would be:<br><br>`Toronto, Ottawa, and Vancouver` |\n| `money` | The money value, formatted using the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). |\n| `rich_text_field` | The rich text value as simple text. |\n\n#### Example\n\n```liquid\n\n{{ product.metafields.information.dosage | metafield_text }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_text)\n\n",
    returns: 'string'
  },
  money: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money)\n\n",
    returns: 'string'
  },
  money_with_currency: {
    description: "Formats a given price based on the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_with_currency }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_with_currency)\n\n",
    returns: 'string'
  },
  money_without_currency: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), without the currency symbol. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_without_currency }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_currency)\n\n",
    returns: 'string'
  },
  money_without_trailing_zeros: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), excluding the decimal separator\n(either `.` or `,`) and trailing zeros.\n\nIf the price has a non-zero decimal value, then the output is the same as the [`money` filter](https://shopify.dev/docs/api/liquid/filters#money). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_without_trailing_zeros }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_trailing_zeros)\n\n",
    returns: 'string'
  },
  default_pagination: {
    description: 'Generates HTML for a set of links for paginated results. Must be applied to the [`paginate` object](https://shopify.dev/docs/api/liquid/objects/paginate). \n\n\n\n#### Example\n\n```liquid\n\n{% paginate collection.products by 2 %}\n  {% for product in collection.products %}\n    {{- product.title }}\n  {% endfor %}\n\n  {{- paginate | default_pagination -}}\n{% endpaginate %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_pagination)\n\n',
    scope: 'paginate',
    returns: 'string'
  },
  login_button: {
    description: "Generates an HTML Button that enables a customer to follow the Shop in the Shop App Configure the storefront for Follow on Shop. [Learn more](https://help.shopify.com/manual/online-store/themes/customizing-themes/follow-on-shop)\n\n\n\n**Note**\n\n> The presence of the [Shop](https://shopify.dev/docs/api/liquid/objects/shop) object\n> is required for validation purposes only.\n\n\n\n**Note**\n\n> The `action` specified is always `'follow'`. If this parameter is not supplied the button will not render.\n\n```liquid\n{{ shop | login_button: action: 'follow' }}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/login_button)\n\n",
    returns: 'string',
    scope: 'shop',
    snippet: "login_button: action: 'follow'",
    arguments: [
      {
        type: 'parameter',
        requires: [ 'action' ],
        value: {
          action: {
            type: 'string',
            value: 'follow'
          }
        }
      }
    ]
  },
  camelize: {
    description: "Converts a string to CamelCase. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'variable-name' | camelize }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/camelize)\n\n",
    returns: 'string'
  },
  handleize: {
    description: 'Converts a string into a [handle](https://shopify.dev/docs/api/liquid/basics#handles). \n\n**Note**\n\n> The `handleize` filter has an alias of `handle`.\n\n#### Example\n\n```liquid\n\n{{ product.title | handleize }}\n{{ product.title | handle }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/handleize)\n\n',
    returns: 'string'
  },
  url_escape: {
    description: "Escapes any URL-unsafe characters in a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ '<p>Health & Love potions</p>' | url_escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_escape)\n\n",
    returns: 'string'
  },
  url_param_escape: {
    description: "Escapes any characters in a string that are unsafe for URL parameters. The `url_param_escape` filter escapes the same characters as [`url_escape`](https://shopify.dev/docs/api/liquid/filters/url_escape), with the\naddition of `&`.\n\n#### Example\n\n```liquid\n\n{{ '<p>Health & Love potions</p>' | url_param_escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_param_escape)\n\n",
    returns: 'string'
  },
  highlight_active_tag: {
    description: 'Wraps a given tag in an HTML `<span>` tag, with a `class` attribute of `active`, if the tag is currently active. Only\napplies to collection tags. \n\n\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {{- tag | highlight_active_tag | link_to_tag: tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight_active_tag)\n\n',
    scope: 'collection',
    returns: 'string'
  },
  link_to_add_tag: {
    description: 'Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have a given tag, as well as any currently active tags. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {%- if current_tags contains tag -%}\n    {{ tag }}\n  {%- else -%}\n    {{ tag | link_to_add_tag: tag }}\n  {%- endif -%}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_add_tag)\n\n',
    snippet: 'link_to_add_tag: $1',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  link_to_remove_tag: {
    description: 'Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have any currently active tags, except the provided tag. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {%- if current_tags contains tag -%}\n    {{ tag | link_to_remove_tag: tag }}\n  {%- else -%}\n    {{ tag | link_to_add_tag: tag }}\n  {%- endif -%}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_remove_tag)\n\n',
    snippet: 'link_to_remove_tag: $1',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  link_to_tag: {
    description: 'Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have a given tag. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {{- tag | link_to_tag: tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_tag)\n\n',
    snippet: 'link_to_tag: $1',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    returns: 'string'
  },
  format_address: {
    description: "Generates an HTML address display, with each address component ordered according to the address's locale. \n\n\n\n#### Example\n\n```liquid\n\n{{ shop.address | format_address }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/format_address)\n\n",
    returns: 'string'
  },
  highlight: {
    description: "Wraps all instances of a specific string, within a given string, with an HTML `<strong>` tag with a `class` attribute\nof `highlight`. \n\n\n\n#### Example\n\n```liquid\n\n{% for item in search.results %}\n  {% if item.object_type == 'product' %}\n    {{ item.description | highlight: search.terms }}\n  {% else %}\n    {{ item.content | highlight: search.terms }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight)\n\n",
    scope: 'search',
    returns: 'string',
    snippet: 'highlight: ${1:search.terms}',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ]
  },
  pluralize: {
    description: "Outputs the singular or plural version of a string based on a given number.\n\n> Caution:\n> The `pluralize` filter applies English pluralization rules to determine which string to output. You shouldn't use this\n> filter on non-English strings because it could lead to incorrect pluralizations.\n\n#### Example\n\n```liquid\n\nCart item count: {{ cart.item_count }} {{ cart.item_count | pluralize: 'item', 'items' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/pluralize)\n\n",
    returns: 'string',
    snippet: 'pluralize: $1, $2',
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ]
  },
  article_img_url: {
    description: "⚠️ **DEPRECATED** ⚠️\n\nThe `article_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an [article's image](https://shopify.dev/docs/api/liquid/objects/article#article-image). \n\n\n\n#### Example\n\n```liquid\n\n{{ article.image | article_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/article_img_url)\n\n",
    returns: 'string',
    deprecated: true,
    snippet: 'article_img_url'
  },
  asset_img_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image in the\n[`assets` directory](https://shopify.dev/themes/architecture#assets) of a theme. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'red-and-black-bramble-berries.jpg' | asset_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_img_url)\n\n",
    arguments: [
      {
        type: 'string',
        description: 'The original image size',
        pattern: /\b(?:master|x?[1-9]\d{2,3}|[1-9]\d{2,3}x|[1-9]\d{2,3}x[1-9]\d{2,3})\b/,
        value: [
          'master',
          '2000x',
          '1500x',
          '1000x',
          '500x',
          '250x',
          '1500x1500',
          '1000x1000',
          '500x500',
          '250x250'
        ]
      },
      {
        type: 'parameter',
        value: {
          crop: {
            type: 'string',
            description: 'You can specify a crop parameter to make sure that the resulting image\'s dimensions match the requested dimensions. If the entire image won\'t fit in your requested dimensions, the crop parameter specifies what part of the image to show',
            pattern: /\b(?:top|center|bottom|right)\b/,
            value: [
              'top',
              'center',
              'bottom',
              'left',
              'right'
            ]
          },
          scale: {
            type: 'number',
            description: 'The scale parameter lets you specify the pixel density of the image',
            pattern: /\b[23]\b/,
            value: [
              '2',
              '3'
            ]
          },
          format: {
            type: 'string',
            description: 'The format parameter lets you specify what file format to use for the displayed image.',
            pattern: /\bp?jpg\b/,
            value: [
              {
                value: 'jpg'
              },
              {
                value: 'pjpg',
                description: 'pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG.'
              }
            ]
          }
        }
      }
    ],
    returns: 'string',
    snippet: 'asset_img_url'
  },
  asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file in the\n[`assets` directory](https://shopify.dev/themes/architecture#assets) of a theme. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_url)\n\n",
    returns: 'string'
  },
  collection_img_url: {
    description: "⚠️ **DEPRECATED** ⚠️\n\nThe `collection_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [collection's image](https://shopify.dev/docs/api/liquid/objects/collection#collection-image). \n\n\n\n#### Example\n\n```liquid\n\n{{ collection.image | collection_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/collection_img_url)\n\n",
    returns: 'string',
    deprecated: true,
    snippet: 'collection_img_url'
  },
  file_img_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image from the\n[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'potions-header.png' | file_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_img_url)\n\n",
    snippet: 'file_img_url',
    returns: 'string'
  },
  file_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file from the\n[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'disclaimer.pdf' | file_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_url)\n\n",
    returns: 'string',
    snippet: 'file_url'
  },
  global_asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a global asset. Global assets are kept in a directory on Shopify's server. Using global assets can be faster than loading the resource\ndirectly.\n\nDepending on the resource type, you might need to use an additional filter to load the resource. The following table\noutlines which filter to use for specific resource types.\n\n| Resource type | Additional filter |\n| --- | --- |\n| JavaScript (`.js`) | [`script_tag`](https://shopify.dev/docs/api/liquid/filters/script_tag) |\n| CSS (`.css`) | [`stylesheet_tag`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)  |\n\nThe following table outlines the available global assets:\n\n| Category | Assets |\n| --- | --- |\n| Firebug | - `firebug/firebug.css`<br>- `firebug/firebug.html`<br>- `firebug/firebug.js`<br>- `firebug/firebugx.js`<br>- `firebug/errorIcon.png`<br>- `firebug/infoIcon.png`<br>- `firebug/warningIcon.png` |\n| JavaScript libraries | - `controls.js`<br>- `dragdrop.js`<br>- `effects.js`<br>- `ga.js`<br>- `mootools.js` |\n| Lightbox | - `lightbox.css`<br>- `lightbox.js`<br><br>- `lightbox/v1/lightbox.css`<br>- `lightbox/v1/lightbox.js`<br><br>- `lightbox/v2/lightbox.css`<br>- `lightbox/v2/lightbox.js`<br>- `lightbox/v2/close.gif`<br>- `lightbox/v2/loading.gif`<br>- `lightbox/v2/overlay.png`<br>- `lightbox/v2/zoom-lg.gif`<br><br>- `lightbox/v204/lightbox.css`<br>- `lightbox/v204/lightbox.js`<br>- `lightbox/v204/bullet.gif`<br>- `lightbox/v204/close.gif`<br>- `lightbox/v204/closelabel.gif`<br>- `lightbox/v204/donatebutton.gif`<br>- `lightbox/v204/downloadicon.gif`<br>- `lightbox/v204/loading.gif`<br>- `lightbox/v204/nextlabel.png`<br>- `lightbox/v204/prevlabel.gif` |\n| Prototype | - `prototype.js`<br>- `prototype/1.5/prototype.js`<br>- `prototype/1.6/prototype.js` |\n| script.aculo.us | - `scriptaculous/1.8.2/scriptaculous.js`<br>- `scriptaculous/1.8.2/builder.js`<br>- `scriptaculous/1.8.2/controls.js`<br>- `scriptaculous/1.8.2/dragdrop.js`<br>- `scriptaculous/1.8.2/effects.js`<br>- `scriptaculous/1.8.2/slider.js`<br>- `scriptaculous/1.8.2/sound.js`<br>- `scriptaculous/1.8.2/unittest.js` |\n| Shopify | - `list-collection.css`<br>- `textile.css` |\n\n#### Example\n\n```liquid\n\n{{ 'lightbox.js' | global_asset_url | script_tag }}\n\n{{ 'lightbox.css' | global_asset_url | stylesheet_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/global_asset_url)\n\n",
    returns: 'string'
  },
  image_url: {
    description: 'Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the `image_url` filter on the following objects, as well as their `src` property:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n- [`country`](https://shopify.dev/docs/api/liquid/objects/country)\n\n> Caution:\n> You need to specify either a [`width`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-width) or\n> [`height`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-height) parameter. If neither are specified, then an error is returned.\n\n\n\n**Note**\n\n> Regardless of the specified dimensions, an image can never be resized to be larger than its original dimensions.\n\n#### Example\n\n```liquid\n\n{{ product | image_url: width: 450 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_url)\n\n',
    returns: 'string',
    objects: [
      'article',
      'collection',
      'image',
      'line_item',
      'product',
      'variant',
      'country'
    ],
    snippet: 'image_url: ${1|width,height|}: $2',
    arguments: [
      {
        type: 'parameter',
        strict: true,
        requires: /\b(?:width|height)\b/,
        value: {
          width: {
            type: 'number',
            description: 'Specify the width of the image up to a maximum of `5760px`. If only the width is specified, then the height is automatically calculated based on the image\'s dimensions.',
            pattern: [ 0, 5760 ]
          },
          height: {
            type: 'number',
            description: 'Specify the height of the image up to a maximum of `5760px`. If only the height is specified, then the width is automatically calculated based on the image\'s dimensions.',
            pattern: [ 0, 5760 ]
          },
          format: {
            type: 'string',
            description: 'Specify which file format to use for the image. The valid formats are `pjpg` and `jpg`.\n\nIt\'s not practical to convert a lossy image format, like `jpg`, to a lossless image format, like `png`, so Shopify can do only the following conversions:\n\n- `png` to `jpg`\n- `png` to `pjpg`\n- `jpg` to `pjpg`\n\n> **Note**\n>\n>Shopify automatically detects which image formats are supported by the client (e.g. `WebP`, `AVIF`, etc.) and selects a file format for optimal quality and file size. When a format is specified, Shopify takes into account the features (e.g. progressive, alpha channel) of the specified file format when making the final automatic format selection. To learn more, visit [https://cdn.shopify.com/](https://cdn.shopify.com/).',
            pattern: /\b(?:p?jpg)\b/,
            value: [
              'jpg',
              'pjpg'
            ]
          },
          pad_color: {
            type: 'string',
            pattern: /(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
            description: 'Specify a color to pad the image if the specified dimensions result in an aspect ratio that differs from the original. The color must be in hexadecimal format (`hex3` or `hex6`).'
          },
          crop: {
            type: 'string',
            description: 'Specify which part of the image to show if the specified dimensions result in an aspect ratio that differs from the original. You can use the following values:\n\n- top\n- center\n- bottom\n- left\n- right\n- region\n\nThe default value is `center`.\n\nWhen using the `region` crop mode, the starting point for the crop is defined by `crop_left` and `crop_top` and extends to the `crop_width` and `crop_height`. Optionally, to resize the region extracted by the crop, use the width and height parameters.',
            value: [
              'top',
              'center',
              'bottom',
              'left',
              'right',
              'region'
            ]
          },
          crop_left: {
            type: 'number',
            pattern: [ 0, 5760 ],
            when: [
              [ 'crop', 'region' ]
            ]
          },
          crop_top: {
            type: 'number',
            pattern: [ 0, 5760 ],
            when: [
              [ 'crop', 'region' ]
            ]
          },
          crop_width: {
            type: 'number',
            pattern: [ 0, 5760 ],
            when: [
              [ 'crop', 'region' ]
            ]
          },
          crop_height: {
            type: 'number',
            pattern: [ 0, 5760 ],
            when: [
              [ 'crop', 'region' ]
            ]
          }
        }

      }
    ]
  },
  img_tag: {
    description: '⚠️ **DEPRECATED** ⚠️\n\nThe `img_tag` filter has been replaced by [`image_tag`](/docs/api/liquid/filters/image_tag).\n\n---\n\nGenerates an HTML `<img>` tag for a given image URL. You can also use the `img_tag` filter on the following objects:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n\n#### Example\n\n```liquid\n\n{{ product | img_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_tag)\n\n',
    returns: 'string',
    deprecated: true,
    arguments: [
      {
        type: 'string'
      },
      {
        type: 'string'
      },
      {
        type: 'string'
      }
    ]
  },
  img_url: {
    description: '⚠️ **DEPRECATED** ⚠️\n\nThe `img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the `img_url` filter on the following objects:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n\n#### Example\n\n```liquid\n\n{{ product | img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_url)\n\n',
    snippet: "img_url: '${2:medium}'",
    returns: 'string',
    deprecated: true,
    objects: [
      'article',
      'collection',
      'image',
      'line_item',
      'product',
      'variant',
      'country'
    ]
  },
  link_to: {
    description: "Generates an HTML `<a>` tag. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Shopify' | link_to: 'https://www.shopify.com' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to)\n\n",
    snippet: 'link_to: $1',
    arguments: [
      {
        type: 'string',
        required: true,
        description: 'The URL to link to.'
      },
      {
        type: 'parameter',
        strict: false,
        description: "You can specify [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes) by including a parameter that matches the attribute name, and the desired value.\n\n#### Example\n\n```liquid\n\n{{ 'Shopify' | link_to: 'https://www.shopify.com', class: 'link-class' }}\n\n```\n\n",
        value: {
          class: {
            type: 'string'
          },
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          }
        }
      }
    ],
    returns: 'string'
  },
  line_items_for: {
    description: "Returns the subset of cart line items that include a specified product or variant. Accepts the following object types:\n\n- `product`\n- `variant`\n\n#### Example\n\n```liquid\n\n{% assign product = all_products['bloodroot-whole'] %}\n{% assign line_items = cart | line_items_for: product %}\n\nTotal cart quantity for product: {{ line_items | sum: 'quantity' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/line_items_for)\n\n\nLast Updated: 0th October 2023\n\n\n",
    returns: 'array',
    snippet: 'line_items_for: $1,',
    arguments: [
      {
        type: 'any',
        required: true
      }
    ]
  },
  payment_type_img_url: {
    description: 'Returns the URL for an SVG image of a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). \n\n\n\n#### Example\n\n```liquid\n\n{% for type in shop.enabled_payment_types %}\n<img src="{{ type | payment_type_img_url }}" />\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_img_url)\n\n',
    returns: 'string'
  },
  payment_type_svg_tag: {
    description: 'Generates an HTML `<svg>` tag for a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). \n\n\n\n#### Example\n\n```liquid\n\n{% for type in shop.enabled_payment_types -%}\n  {{ type | payment_type_svg_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag)\n\n',
    returns: 'string'
  },
  placeholder_svg_tag: {
    description: "Generates an HTML `<svg>` tag for a given placeholder name. Accepts the following placeholder names:\n\n- `collection-1`\n- `collection-2`\n- `collection-3`\n- `collection-4`\n- `collection-5`\n- `collection-6`\n- `image`\n- `lifestyle-1`\n- `lifestyle-2`\n- `product-1`\n- `product-2`\n- `product-3`\n- `product-4`\n- `product-5`\n- `product-6`\n\n#### Example\n\n```liquid\n\n{{ 'collection-1' | placeholder_svg_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/placeholder_svg_tag)\n\n",
    returns: 'string'
  },
  preload_tag: {
    description: "Generates an HTML `<link>` tag with a `rel` attribute of `preload` to prioritize loading a given Shopify-hosted asset.\nThe asset URL is also added to the [Link header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)\nwith a `rel` attribute of `preload`. You should use this filter sparingly. For example, consider preloading only resources necessary for rendering\nabove-the-fold content. To learn more about preloading resources, refer to\n[Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others).\n\n\n\n**Tip**\n\n> If you want to preload a stylesheet, then use [`stylesheet_tag`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag). If you want to\n> preload an image, then use [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag).\n\nThe input to this filter must be a URL from one of the following filters:\n\n- [`asset_url`](https://shopify.dev/docs/api/liquid/filters/asset_url)\n- [`global_asset_url`](https://shopify.dev/docs/api/liquid/filters/global_asset_url)\n- [`shopify_asset_url`](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)\n\nThe `preload_tag` filter also requires an [`as` parameter](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-as)\nbased on the kind of resource being preloaded.\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url | preload_tag: as: 'script' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/preload_tag)\n\n",
    returns: 'string',
    snippet: 'preload_tag: as: ${1|audio,document,embed,fetch,font,image,object,script,style,track,video,worker|}',
    filters: [
      'asset_url',
      'global_asset_url',
      'shopify_asset_url'
    ],
    arguments: [
      {
        type: 'parameter',
        strict: false,
        requires: [ 'as' ],
        value: {
          as: {
            type: 'string',
            value: [
              'audio',
              'document',
              'embed',
              'fetch',
              'font',
              'image',
              'object',
              'script',
              'style',
              'track',
              'video',
              'worker'
            ]
          }
        }
      }
    ]
  },
  product_img_url: {
    description: "⚠️ **DEPRECATED** ⚠️\n\nThe `product_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [product image](https://shopify.dev/docs/api/liquid/objects/product). This can be the product's `featured_image` or any image from the `images` array.\n\n#### Example\n\n```liquid\n\n{{ product.featured_image | product_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/product_img_url)\n\n",
    returns: 'string',
    deprecated: true,
    snippet: 'product_img_url'
  },
  script_tag: {
    description: "Generates an HTML `<script>` tag for a given resource URL. The tag has a `type` attribute of `text/javascript`. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url | script_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/script_tag)\n\n",
    returns: 'string'
  },
  shopify_asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a globally accessible Shopify asset. The following are the globally accessible Shopify assets:\n\n- `option_selection.js`\n- `api.jquery.js`\n- `shopify_common.js`\n- `customer_area.js`\n- `currencies.js`\n- `customer.css`\n\n#### Example\n\n```liquid\n\n{{ 'option_selection.js' | shopify_asset_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)\n\n",
    returns: 'string'
  },
  stylesheet_tag: {
    description: "Generates an HTML `<link>` tag for a given resource URL. The tag has the following parameters:\n\n| Attribute | Value |\n| --- | --- |\n| `rel` | `stylesheet` |\n| `type` | `text/css` |\n| `media` | `all` | \n\n\n\n#### Example\n\n```liquid\n\n{{ 'base.css' | asset_url | stylesheet_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)\n\n",
    returns: 'string',
    snippet: 'stylesheet_tag',
    arguments: [
      {
        type: 'parameter',
        value: {
          preload: {
            type: 'boolean',
            description: "Specify whether the stylesheet should be preloaded. When preload is set to true, a resource hint is sent as a Link header with a rel value of [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload).\n\nThis option doesn't affect the HTML link tag directly. You should use the preload parameter sparingly. For example, consider preloading only render-blocking stylesheets that are needed for initial functionality of the page, such as above-the-fold content. To learn more about resource hints in Shopify themes, refer to [Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others)."
          }
        }
      }
    ]
  },
  weight_with_unit: {
    description: 'Generates a formatted weight for a [`variant` object](https://shopify.dev/docs/api/liquid/objects/variant#variant-weight). The weight unit is\nset in the [general settings](https://www.shopify.com/admin/settings/general) in the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign variant = product.variants.first -%}\n\n{{ variant.weight | weight_with_unit }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/weight_with_unit)\n\n',
    arguments: [
      {
        type: 'string',
        required: false,
        description: 'The weight unit to use in place of the default weight unit.'
      }
    ],
    returns: 'string'
  }
};
