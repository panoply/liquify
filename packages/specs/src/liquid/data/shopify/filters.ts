import { Filters as IFilters } from './../../types/filters';

const Filters: IFilters = {
  asset_img_url: {
    description: {
      kind: 'markdown',
      value: 'Returns the asset URL of an image in the `/assets` folder of a theme. asset_img_url accepts an image size parameter.\n\nYou can specify only a `width` or only a `height` and Shopify will calculate the other dimension based on the original image size, keeping the original image\'s aspect ratio.'
    },
    arguments: [
      {
        value: 'master',
        type: 'string',
        description: 'The original image size',
        required: false
      },
      {
        value: 'crop',
        type: 'parameter',
        required: false,
        description: {
          kind: 'markdown',
          value: 'You can specify a crop parameter to make sure that the resulting image\'s dimensions match the requested dimensions. If the entire image won\'t fit in your requested dimensions, the crop parameter specifies what part of the image to show'
        },
        accepts: [
          {
            value: 'top',
            type: 'string'
          },
          {
            value: 'center',
            type: 'string'

          },
          {
            value: 'bottom',
            type: 'string'

          },
          {
            value: 'left',
            type: 'string'

          },
          {
            value: 'right',
            type: 'string'
          }
        ]
      },
      {
        type: 'parameter',
        value: 'scale',
        description: 'The scale parameter lets you specify the pixel density of the image',
        accepts: [
          {
            value: '2',
            type: 'string'
          },
          {
            value: '3',
            type: 'string'
          }
        ]
      },
      {
        type: 'parameter',
        value: 'format',
        description: 'The format parameter lets you specify what file format to use for the displayed image.',
        accepts: [
          {
            value: 'jpg',
            type: 'string'
          },
          {
            value: 'pjpg',
            type: 'string',
            description: 'pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG.'
          }
        ]
      }
    ],
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_img_url'
      }
    ]
  },
  asset_url: {
    description: 'Returns the URL of a file in the "assets" folder of a theme.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_url'
      }
    ]
  },
  currency_selector: {
    description: 'Generates a drop-down list that customers can use to select an accepted currency on your storefront. This filter must be used on the form object within a currency form',
    snippet: 'class: $1, id: $2',
    scope: [ 'form' ],
    deprecated: true
  },
  customer_login_link: {
    description: 'Generates a link to the customer login page.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#customer_login_link'
      }
    ]
  },
  file_img_url: {
    description: 'Returns the URL of an image in the Files page of the admin. file_img_url accepts an image size parameter.',
    snippet: '${1|file_img_url|file_img_url: ${2}}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_img_url'
      }
    ]
  },
  file_url: {
    description: 'Returns the URL of a file in the Files page of the admin.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_url'
      }
    ]
  },
  font_face: {
    description: 'Returns a CSS @font-face declaration to load the chosen font',
    arguments: [
      {
        type: 'parameter',
        value: 'font_display',
        description: 'The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use',
        accepts: [
          {
            type: 'string',
            value: 'auto',
            description: 'The font display strategy is defined by the user agent.'
          },
          {
            type: 'string',
            value: 'block',
            description: 'Gives the font face a short block period and an infinite swap period.'
          },
          {
            type: 'string',
            value: 'swap',
            description: 'Gives the font face an extremely small block period and an infinite swap period.'
          },
          {
            type: 'string',
            value: 'fallback',
            description: 'Gives the font face an extremely small block period and a short swap period.'
          },
          {
            type: 'string',
            value: 'optional',
            description: 'Gives the font face an extremely small block period and no swap period.'
          }
        ]
      }
    ],
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
      }
    ]
  },
  font_modify: {
    description: 'font_modify takes two arguments. The first indicates which property should be modified and the second is the modification to be made.',
    snippet: "font_modify:  '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
    arguments: [
      {
        type: 'string',
        required: true,
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
        type: 'string',
        required: true
      }
    ],
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
      }
    ]
  },
  font_url: {
    description: 'Returns a CDN URL for the chosen font. By default, font_url returns the woff2 version, but it can also be called with an additional parameter to specify the format. Both woff and woff2 are supported.',
    snippet: "${1|font_url|font_url: 'woff'}",
    arguments: [
      {
        type: 'string',
        required: false
      }
    ],
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
      }
    ]
  },
  global_asset_url: {
    description: 'Returns the URL of a global asset. Global assets are kept in a central directory on Shopify’s servers. Using global assets can improve the load times of your pages.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#global_asset_url'
      }
    ]
  },
  img_tag: {
    description: 'Generates an image tag.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/html-filters#img_tag'
      }
    ]
  },
  img_url: {
    description: 'Returns the URL of an image. Accepts an image size as a parameter.',
    snippet: '${1|img_url|img_url: ${2}}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#img_url'
      }
    ]
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
        type: 'string',
        required: false
      }
    ],
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to'
      }
    ]
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
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_add_tag'
      }
    ]
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
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_remove_tag'
      }
    ]
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
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_tag'
      }
    ]
  },
  link_to_type: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a product type.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_type'
      }
    ]
  },
  link_to_vendor: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a vendor.',
    snippet: 'link_to_vendor',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_vendor'
      }
    ]
  },
  money: {
    description: 'Formats the price based on the shop’s `HTML without currency` setting',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money'
      }
    ]
  },
  money_with_currency: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_with_currency'
      }
    ]
  },
  money_without_currency: {
    description: 'Formats the price using a decimal.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_currency'
      }
    ]
  },
  money_without_trailing_zeros: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting and excludes the decimal point and trailing zeros.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_trailing_zeros'
      }
    ]
  },
  payment_button: {
    description: 'Creates a dynamic checkout button for a product. This filter must be used on the form object within a product form.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
      }
    ]
  },
  payment_type_img_url: {
    description: 'Returns the URL of the payment type’s SVG image. Used in conjunction with the shop.enabled_payment_types variable.',
    snippet: 'link_to_remove_tag: ${1}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#payment_type_img_url'
      }
    ]
  },
  payment_type_svg_tag: {
    description: 'Returns the `<svg>` tag of the requested payment type image for inlining purposes. Used in conjunction with the `shop.enabled_payment_types` variable.',
    snippet: 'class: ${1}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
      }
    ]
  },
  script_tag: {
    description: 'Generates a script tag.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
      }
    ]
  },
  shopify_asset_url: {
    description: 'Returns the URL of a global assets that are found on Shopify’s servers.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#shopify_asset_url'
      }
    ]
  },
  sort_by: {
    description: 'Creates a URL to a collection page with the provided sort_by parameter. This filter must be applied to a collection URL.',
    snippet: 'sort_by: ${1}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/en/themes/liquid/filters/url-filters#sort_by'
      }
    ]
  },
  stylesheet_tag: {
    description: 'Generates a link tag that points to the given stylesheet.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
      }
    ]
  },
  url_for_type: {
    description: 'Creates a URL that links to a collection page containing products with a specific product type.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_type'
      }
    ]
  },
  url_for_vendor: {
    description: 'Creates a URL that links to a collection page containing products with a specific product vendor.',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_vendor'
      }
    ]
  },
  within: {
    description: 'Creates a collection-aware product URL by prepending /collections/collection-handle to a product URL, where collection-handle is the handle of the collection that is currently being viewed.',
    snippet: 'within: ${1}',
    references: [
      {
        name: 'Shopify Liquid',
        url: 'https://help.shopify.com/themes/liquid/filters/url-filters#within'
      }
    ]
  }

};

export default Filters;
