import type { Filters as IFilters } from '../..';

export const Filters: IFilters = {
  asset_img_url: {
    description: 'Returns the asset URL of an image in the `/assets` folder of a theme. asset_img_url accepts an image size parameter.\n\nYou can specify only a `width` or only a `height` and Shopify will calculate the other dimension based on the original image size, keeping the original image\'s aspect ratio.',
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
            type: 'integer',
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
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_img_url'
    }

  },
  asset_url: {
    description: 'Returns the URL of a file in the "assets" folder of a theme.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_url'
    }

  },
  currency_selector: {
    description: 'Generates a drop-down list that customers can use to select an accepted currency on your storefront. This filter must be used on the form object within a currency form',
    snippet: 'class: $1, id: $2',
    scope: [ 'form' ],
    deprecated: true
  },
  customer_login_link: {
    description: 'Generates a link to the customer login page.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#customer_login_link'
    }
  },
  camelcase: {
    description: 'Converts a string into CamelCase.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#camelcase'
    }
  },
  color_to_rgb: {
    description: 'Converts a CSS color string to CSS `rgb()` format.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_to_rgb'
    }
  },
  color_to_hsl: {
    description: 'Converts a CSS color string to CSS `hsl()` format.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_to_hsl'
    }
  },
  color_to_hex: {
    description: 'Converts a CSS color string to `hex6` format.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_to_hex'
    }
  },
  color_extract: {
    description: 'Extracts a component from the color. Valid components are alpha, red, green, blue, hue, saturation and lightness.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_extract'
    }
  },
  color_brightness: {
    description: 'Calculates the perceived brightness of the given color. Uses [W3C recommendations for calculating perceived brightness](https://www.w3.org/TR/AERT#color-contrast), for the purpose of ensuring adequate contrast.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_brightness'
    }
  },
  color_modify: {
    description: 'Modifies the given component of a color',
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
        type: 'integer',
        required: true,
        pattern: {
          red: [ 0, 255 ],
          green: [ 0, 255 ],
          blue: [ 0, 255 ],
          alpha: [ 0, 1 ],
          hue: [ 0, 360 ],
          saturation: [ 0, 100 ]
        }
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_modify'
    }
  },
  color_lighten: {
    description: 'Lightens the input color. Takes a value between 0 and 100 percent.',
    arguments: [
      {
        type: 'integer',
        pattern: [ 0, 100 ],
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_lighten'
    }
  },
  color_saturate: {
    description: 'Saturates the input color. Takes a value between 0 and 100 percent.',
    arguments: [
      {
        type: 'integer',
        pattern: [ 0, 100 ],
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_saturate'
    }
  },
  color_desaturate: {
    description: 'Desaturates the input color. Takes a value between 0 and 100 percent.',
    arguments: [
      {
        type: 'integer',
        pattern: [ 0, 100 ],
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_desaturate'
    }
  },
  color_mix: {
    description: 'Blends together two colors. Blend factor should be a value between 0 and 100 percent.',
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      },
      {
        type: 'integer',
        pattern: [ 0, 100 ],
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_mix'
    }
  },
  color_contrast: {
    description: 'Calculates the contrast ratio between two colors. Returns the numerator part of the ratio, which has a denominator of 1. For example, for a contrast ratio of 3.5:1, the filter returns 3.5.\n\nWith regards to accessibility, [WCAG 2.0 level AA](https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast) requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. [Level AAA](https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7) requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.\n\nThe order in which you specify the colors does not matter. The filter will automatically detect the lighter and darker colors.',
    arguments: [
      {
        type: 'string',
        pattern: /#[A-Fa-f0-9]{8}/,
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_contrast'
    }
  },
  color_difference: {
    description: 'Calculates the [color difference](https://en.wikipedia.org/wiki/Color_difference) or distance between two colors. With regards to accessibility, the W3C [suggests](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) that the color difference should be greater than 500.',
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#color_difference'
    }
  },
  default_errors: {
    description: 'Outputs default error messages for the `form.errors` variable. The messages returned are dependent on the strings returned by form.errors.',
    scope: [ 'form' ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#default_errors'
    }
  },
  default_pagination: {
    description: 'Creates a set of links for paginated results. Used in conjunction with the [paginate](https://shopify.dev/api/liquid/objects/paginate) variable.',
    scope: [ 'paginate' ],
    arguments: [
      {
        type: 'parameter',
        value: {
          next: {
            type: 'string',
            description: 'The next link label'
          },
          prev: {
            type: 'string',
            description: 'The prev link label'
          }
        }
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#default_pagination'
    }
  },
  brightness_difference: {
    description: 'Calculates the perceived brightness difference between two colors. With regards to accessibility, the W3C [suggests](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) that the brightness difference should be greater than 125.',
    arguments: [
      {
        type: 'string',
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/color-filters#brightness_difference'
    }
  },
  file_img_url: {
    description: 'Returns the URL of an image in the Files page of the admin. file_img_url accepts an image size parameter.',
    snippet: '${1|file_img_url|file_img_url: ${2}}',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_img_url'
    }
  },
  file_url: {
    description: 'Returns the URL of a file in the Files page of the admin.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_url'
    }

  },
  font_face: {
    description: 'Returns a CSS @font-face declaration to load the chosen font',
    arguments: [
      {
        type: 'parameter',
        value: {
          font_display: {
            type: 'string',
            pattern: /\b(?:auto|block|swap|fallback|optional)\b/,
            description: 'The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use',
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
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
    }

  },
  font_modify: {
    description: 'font_modify takes two arguments. The first indicates which property should be modified and the second is the modification to be made.',
    snippet: "font_modify:  '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
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
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/font_modify'
    }

  },
  font_url: {
    description: 'Returns a CDN URL for the chosen font. By default, font_url returns the woff2 version, but it can also be called with an additional parameter to specify the format. Both woff and woff2 are supported.',
    snippet: "${1|font_url|font_url: 'woff'}",
    arguments: [
      {
        type: 'string'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
    }

  },
  format_address: {
    description: 'Use the `format_address` filter on an address to print the elements of the address in order according to their locale. The filter will only print the parts of the address that have been provided. This filter works on the addresses page for customers who have accounts in your store, or on your store\'s address',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#format_address'
    }
  },
  hmac_sha256: {
    description: 'Converts a string into a SHA-256 hash using a hash message authentication code (HMAC). Pass the secret key for the message as a parameter to the filter.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#hmac_sha256'
    }
  },
  handle: {
    description: 'Formats a string into a handle.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#handle-handleize'
    }
  },
  handleize: {
    description: 'Formats a string into a handle.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#handle-handleize'
    }
  },
  highlight: {
    description: 'Wraps words inside search results with an HTML `<strong>` tag with the class highlight if it matches the submitted [search.terms](https://shopify.dev/docs/themes/liquid/reference/objects/search/#search.terms).',
    scope: [ 'search' ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#highlight'
    }
  },
  highlight_active_tag: {
    description: 'Wraps a tag link in a `<span>` with the class `active` if that tag is being used to filter a collection.',
    scope: [ 'collection' ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#highlight_active_tag'
    }
  },
  global_asset_url: {
    description: 'Returns the URL of a global asset. Global assets are kept in a central directory on Shopify’s servers. Using global assets can improve the load times of your pages.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#global_asset_url'
    }

  },
  json: {
    description: 'Converts a string into JSON format.\n\nYou do not have to wrap the Liquid output in quotations - the json filter will add them in. The json filter will also escape quotes as needed inside the output.',
    scope: [ 'collection' ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#json'
    }
  },
  img_tag: {
    description: 'Generates an image tag.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#img_tag'
    }

  },
  img_url: {
    description: 'Returns the URL of an image. Accepts an image size as a parameter.',
    snippet: "img_url: '${2:medium}'",
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#img_url'
    }

  },
  link_to: {
    description: 'Generates an HTML link. The first parameter is the URL of the link, and the optional second parameter is the title of the link.',
    snippet: "link_to: '${1:url}', '${2:title}'",
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to'
    }

  },
  link_to_add_tag: {
    description: 'Creates a link to all products in a collection that have a given tag as well as any tags that have been already selected.',
    snippet: 'link_to_add_tag: ${1}',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_add_tag'
    }

  },
  link_to_remove_tag: {
    description: 'Generates a link to all products in a collection that have the given tag and all the previous tags that might have been added already.',
    snippet: 'link_to_remove_tag: ${1}',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_remove_tag'
    }

  },
  link_to_tag: {
    description: 'Creates a link to all products in a collection that have a given tag.',
    snippet: 'link_to_tag: ${1}',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_tag'
    }

  },
  link_to_type: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a product type.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_type'
    }

  },
  link_to_vendor: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a vendor.',
    snippet: 'link_to_vendor',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_vendor'
    }

  },
  md5: {
    description: 'Converts a string into an MD5 hash.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#md5'
    }
  },
  money: {
    description: 'Formats the price based on the shop’s `HTML without currency` setting',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money'
    }
  },
  money_with_currency: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_with_currency'
    }
  },
  money_without_currency: {
    description: 'Formats the price using a decimal.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_currency'
    }
  },
  money_without_trailing_zeros: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting and excludes the decimal point and trailing zeros.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_trailing_zeros'
    }
  },
  payment_button: {
    description: 'Creates a dynamic checkout button for a product. This filter must be used on the form object within a product form.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#newline_to_br'
    }
  },
  payment_type_img_url: {
    description: 'Returns the URL of the payment type’s SVG image. Used in conjunction with the shop.enabled_payment_types variable.',
    snippet: 'link_to_remove_tag: ${1}',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#payment_type_img_url'
    }

  },
  payment_type_svg_tag: {
    description: 'Returns the `<svg>` tag of the requested payment type image for inlining purposes. Used in conjunction with the `shop.enabled_payment_types` variable.',
    snippet: 'class: ${1}',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
    }

  },
  payment_terms: {
    description: 'Renders the Shop Pay Installments banner for a product. This filter must be used on the form object within a product form.\n\nThis filter is available only to eligible merchants that have been invited to join the Shop Pay Installments early access program. If you\'re a Shopify merchant and haven\'t been invited for early access, then you can join the waitlist.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/html-filters#payment_terms'
    }
  },
  placeholder_svg_tag: {
    description: 'Takes a placeholder name and outputs a placeholder SVG illustration. An optional argument can be supplied to include a custom class attribute on the SVG tag.',
    arguments: [
      {
        type: 'string'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#placeholder_svg_tag'
    }
  },
  pluralize: {
    description: 'Outputs the singular or plural version of an English string based on the value of a number. The first parameter is the singular string and the second parameter is the plural string.\n\nPluralize applies **English** pluralization rules to source strings. You shouldn\'t use this filter on non-English strings, because it will result in incorrect pluralizations for strings in other languages.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#pluralize'
    }
  },
  script_tag: {
    description: 'Generates a script tag.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
    }

  },
  sha1: {
    description: 'Converts a string into a SHA-1 hash.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#sha1'
    }
  },
  sha256: {
    description: 'Converts a string into a SHA-256 hash.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#sha256'
    }
  },
  shopify_asset_url: {
    description: 'Returns the URL of a global assets that are found on Shopify’s servers.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#shopify_asset_url'
    }

  },
  sort_by: {
    description: 'Creates a URL to a collection page with the provided sort_by parameter. This filter must be applied to a collection URL.',
    snippet: 'sort_by: ${1}',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/url-filters#sort_by'
    }

  },
  stylesheet_tag: {
    description: 'Generates a link tag that points to the given stylesheet.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
    }

  },
  t: {
    description: 'Uses a translation key to access the locale file for the active language. Returns the corresponding string of translated text in the locale file.',
    arguments: [
      {
        type: 'parameter',
        value: 'string',
        separator: 44
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#t-translation'
    }
  },
  time_tag: {
    description: 'Converts a timestamp into a HTML `<time>` tag.',
    arguments: [
      {
        type: 'string',
        pattern: /%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,
        description: 'The time_tag filter accepts the same parameters as Ruby\'s strftime method.'
      },
      {
        type: 'string',
        value: 'foo'
      },
      {
        type: 'string',
        value: 'bar'
      },
      {
        type: 'string',
        value: 'baz'
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
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/html-filters#time_tag'
    }
  },
  url_escape: {
    description: 'Identifies all characters in a string that are not allowed in URLS, and replaces the characters with their escaped variants.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#url_escape'
    }
  },
  url_param_escape: {
    description: 'Replaces all characters in a string that are not allowed in URLs with their escaped variants, including the ampersand (&).',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/string-filters#url_param_escape'
    }
  },
  url_for_type: {
    description: 'Creates a URL that links to a collection page containing products with a specific product type.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_type'
    }
  },
  url_for_vendor: {
    description: 'Creates a URL that links to a collection page containing products with a specific product vendor.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_vendor'
    }

  },
  within: {
    description: 'Creates a collection-aware product URL by prepending /collections/collection-handle to a product URL, where collection-handle is the handle of the collection that is currently being viewed.',
    snippet: 'within: ${1}',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#within'
    }
  },
  weight_with_unit: {
    description: 'Formats the product variant\'s weight. The weight unit is set in [General settings](https://www.shopify.com/admin/settings/general).',
    arguments: [
      {
        type: 'string'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/filters/additional-filters#weight_with_unit'
    }
  }
};
