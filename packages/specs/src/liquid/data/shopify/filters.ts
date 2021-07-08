import { Filters as IFilters, Types } from 'liquid/types/filters';

const Filters: IFilters = {
  asset_img_url: {
    description: {
      kind: 'markdown',
      value: 'Returns the asset URL of an image in the `/assets` folder of a theme. asset_img_url accepts an image size parameter.\n\nYou can specify only a `width` or only a `height` and Shopify will calculate the other dimension based on the original image size, keeping the original image\'s aspect ratio.'
    },
    arguments: [
      {
        type: Types.Basic.string,
        description: 'The original image size',
        required: false,
        pattern: /(?!5760)\b(?:master|x?([1-9][0-9]{2,3})|[1-9][0-9]{2,3}x|[1-9][0-9]{2,3}x[1-9][0-9]{2,3})\b/,
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
        ],
        parameter: {
          required: false,
          unique: true,
          value: {
            crop: {
              type: Types.Basic.string,
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
              type: Types.Basic.number,
              description: 'The scale parameter lets you specify the pixel density of the image',
              pattern: /\b[23]\b/,
              value: [
                '2',
                '3'
              ]
            },
            format: {
              type: Types.Basic.string,
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
        type: Types.Argument.parameter,
        required: false,
        value: {
          font_display: {
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
        type: Types.Basic.string,
        required: true,
        pattern: /\b(?:style|weight)\b/,
        value: [
          {
            value: 'style'
          },
          {
            value: 'weight'
          }
        ]
      },
      {
        type: Types.Basic.string,
        required: true,
        pattern: {
          style: /\b(?:normal|italic|oblique)\b/,
          weight: /\b(?:normal|bold|bolder|lighter|[1-9]0{2}|-[1-9]0{2}|\+[1-9]0{2})\b/
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
      url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
    }

  },
  font_url: {
    description: 'Returns a CDN URL for the chosen font. By default, font_url returns the woff2 version, but it can also be called with an additional parameter to specify the format. Both woff and woff2 are supported.',
    snippet: "${1|font_url|font_url: 'woff'}",
    arguments: [
      {
        type: Types.Basic.string,
        required: false
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
    }

  },
  global_asset_url: {
    description: 'Returns the URL of a global asset. Global assets are kept in a central directory on Shopify’s servers. Using global assets can improve the load times of your pages.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/url-filters#global_asset_url'
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
    snippet: '${1|img_url|img_url: ${2}}',
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
        type: Types.Basic.string,
        required: true
      },
      {
        type: Types.Basic.string,
        required: false
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
        type: Types.Basic.string,
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
        type: Types.Basic.string,
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
        type: Types.Basic.string,
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
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
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
  script_tag: {
    description: 'Generates a script tag.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
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

  }
};

export default Filters;
