
export default {
  asset_img_url: {
    description: "Returns the asset URL of an image in the \"assets\" folder of a theme. asset_img_url accepts an image size parameter.\n\nYou can specify only a width or only a height and Shopify will calculate the other dimension based on the original image size, keeping the original image's aspect ratio.",
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_img_url',
    arguments: [
      {
        type: 'argument',
        accepts: 'string|reference',
        options: [
          {
            name: 'master',
            description: 'The original image size'
          }
        ]
      },
      {
        type: 'parameter',
        name: 'crop',
        description: "You can specify a crop parameter to make sure that the resulting image's dimensions match the requested dimensions. If the entire image won't fit in your requested dimensions, the crop parameter specifies what part of the image to show",
        required: false,
        accepts: 'string|reference',
        validate: true,
        options: [
          {
            name: 'top'
          },
          {
            name: 'center'
          },
          {
            name: 'bottom'
          },
          {
            name: 'left'
          },
          {
            name: 'right'
          }
        ]
      },
      {
        type: 'parameter',
        name: 'scale',
        description: 'The scale parameter lets you specify the pixel density of the image',
        accepts: 'integer|reference',
        validate: true,
        options: [
          {
            name: '2'
          },
          {
            name: '3'
          }
        ]
      },
      {
        type: 'parameter',
        name: 'format',
        description: 'The format parameter lets you specify what file format to use for the displayed image.',
        accepts: 'string|reference',
        validate: true,
        options: [
          {
            name: 'jpg'
          },
          {
            name: 'pjpg',
            description: 'pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG.'
          }
        ]
      }
    ]
  },
  asset_url: {
    description: 'Returns the URL of a file in the "assets" folder of a theme.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_url'
  },
  currency_selector: {
    description: 'Generates a drop-down list that customers can use to select an accepted currency on your storefront. This filter must be used on the form object within a currency form',
    link: 'https://help.shopify.com/en/themes/liquid/filters/html-filters#currency_selector',
    snippet: 'class: $1, id: $2',
    within: 'form',
    arguments: [
      {
        type: 'parameter',
        name: 'format',
        required: false,
        accepts: 'string|reference'
      },
      {
        type: 'parameter',
        name: 'id',
        description: 'The id to be applied',
        required: false,
        accepts: 'string|reference'
      }
    ]
  },
  customer_login_link: {
    description: 'Generates a link to the customer login page.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#customer_login_link'
  },
  file_img_url: {
    description: 'Returns the URL of an image in the Files page of the admin. file_img_url accepts an image size parameter.',
    snippet: '${1|file_img_url|file_img_url: ${2}}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_img_url'
  },
  file_url: {
    description: 'Returns the URL of a file in the Files page of the admin.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_url'
  },
  font_face: {
    description: 'Returns a CSS @font-face declaration to load the chosen font',
    link: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face',
    arguments: [
      {
        type: 'parameter',
        name: 'font_display',
        description: 'The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use',
        accepts: 'string|reference',
        validate: true,
        options: [
          {
            name: 'auto',
            description: 'The font display strategy is defined by the user agent.'
          },
          {
            name: 'block',
            description: 'Gives the font face a short block period and an infinite swap period.'
          },
          {
            name: 'swap',
            description: 'Gives the font face an extremely small block period and an infinite swap period.'
          },
          {
            name: 'fallback',
            description: 'Gives the font face an extremely small block period and a short swap period.'
          },
          {
            name: 'optional',
            description: 'Gives the font face an extremely small block period and no swap period.'
          }
        ]
      }
    ]
  },
  font_modify: {
    description: 'font_modify takes two arguments. The first indicates which property should be modified and the second is the modification to be made.',
    snippet: "font_modify:  '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
    link: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face',
    arguments: [
      {
        type: 'spread',
        name: 'style',
        accepts: 'string|reference',
        validate: true,
        options: [
          {
            name: 'normal',
            description: 'Returns the normal variant of the same weight (if it exists)'
          },
          {
            name: 'italic',
            description: 'Returns the italic variant of the same weight (if it exists)'
          },
          {
            name: 'oblique',
            description: 'Has the same behavior as italic. None of the font families provided by Shopify have both italic and oblique styles.'
          }
        ]
      },
      {
        type: 'spread',
        name: 'weight',
        accepts: 'string|reference',
        validate: true,
        options: [
          {
            name: 'R:[1-8]0{2}',
            description: 'Returns a variant of the same style with the given weight (if it exists).'
          },
          {
            name: 'R:\\+[1-8]0{2}',
            description: 'Returns an incrementally bolder font of the same style (if it exists). For example, if font has a weight of 400, then font | font_modify "weight", "+100" returns the variant with a weight of 500 for the same style.'
          },
          {
            name: 'R:-[1-8]0{2}',
            description: 'Returns an incrementally lighter font of the same style (if it exists). For example, if font has a weight of 400, then font | font_modify "weight", "-100" returns the variant with a weight of 300 for the same style.'
          }
        ]
      }
    ]
  },
  font_url: {
    description: 'Returns a CDN URL for the chosen font. By default, font_url returns the woff2 version, but it can also be called with an additional parameter to specify the format. Both woff and woff2 are supported.',
    snippet: "${1|font_url|font_url: 'woff'}",
    link: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face',
    arguments: [
      {
        type: 'argument',
        accepts: 'string|reference'
      }
    ]
  },
  global_asset_url: {
    description: 'Returns the URL of a global asset. Global assets are kept in a central directory on Shopify’s servers. Using global assets can improve the load times of your pages.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#global_asset_url'
  },
  img_tag: {
    description: 'Generates an image tag.',
    link: 'https://help.shopify.com/themes/liquid/filters/html-filters#img_tag'
  },
  img_url: {
    description: 'Returns the URL of an image. Accepts an image size as a parameter.',
    snippet: '${1|img_url|img_url: ${2}}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#img_url'
  },
  link_to: {
    description: 'Generates an HTML link. The first parameter is the URL of the link, and the optional second parameter is the title of the link.',
    snippet: "link_to: '${1:url}', '${2:title}'",
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to',
    arguments: [
      {
        type: 'argument',
        required: true,
        accepts: 'string|reference'
      },
      {
        type: 'argument',
        required: false,
        accepts: 'string|reference'
      }
    ]
  },
  link_to_add_tag: {
    description: 'Creates a link to all products in a collection that have a given tag as well as any tags that have been already selected.',
    snippet: 'link_to_add_tag: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_add_tag',
    arguments: [
      {
        type: 'argument',
        required: true,
        accepts: 'string|reference'
      }
    ]
  },
  link_to_remove_tag: {
    description: 'Generates a link to all products in a collection that have the given tag and all the previous tags that might have been added already.',
    snippet: 'link_to_remove_tag: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_remove_tag',
    arguments: [
      {
        type: 'argument',
        required: true,
        accepts: 'string|reference'
      }
    ]
  },
  link_to_tag: {
    description: 'Creates a link to all products in a collection that have a given tag.',
    snippet: 'link_to_tag: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_tag',
    arguments: [
      {
        type: 'argument',
        required: true,
        accepts: 'string|reference'
      }
    ]
  },
  link_to_type: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a product type.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_type'
  },
  link_to_vendor: {
    description: 'Creates an HTML link to a collection page that lists all products belonging to a vendor.',
    snippet: 'link_to_vendor',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_vendor'
  },
  money: {
    description: 'Formats the price based on the shop’s `HTML without currency` setting',
    link: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money'
  },
  money_with_currency: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting.',
    link: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_with_currency'
  },
  money_without_currency: {
    description: 'Formats the price using a decimal.',
    link: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_currency'
  },
  money_without_trailing_zeros: {
    description: 'Formats the price based on the shop’s `HTML with currency` setting and excludes the decimal point and trailing zeros.',
    link: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_trailing_zeros'
  },
  payment_button: {
    description: 'Creates a dynamic checkout button for a product. This filter must be used on the form object within a product form.',
    link: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
  },
  payment_type_img_url: {
    description: 'Returns the URL of the payment type’s SVG image. Used in conjunction with the shop.enabled_payment_types variable.',
    snippet: 'link_to_remove_tag: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#payment_type_img_url'
  },
  payment_type_svg_tag: {
    description: 'Returns the `<svg>` tag of the requested payment type image for inlining purposes. Used in conjunction with the `shop.enabled_payment_types` variable.',
    snippet: 'class: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
  },
  script_tag: {
    description: 'Generates a script tag.',
    link: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
  },
  shopify_asset_url: {
    description: 'Returns the URL of a global assets that are found on Shopify’s servers.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#shopify_asset_url'
  },
  sort_by: {
    description: 'Creates a URL to a collection page with the provided sort_by parameter. This filter must be applied to a collection URL.',
    snippet: 'sort_by: ${1}',
    link: 'https://help.shopify.com/en/themes/liquid/filters/url-filters#sort_by'
  },
  stylesheet_tag: {
    description: 'Generates a link tag that points to the given stylesheet.',
    link: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
  },
  url_for_type: {
    description: 'Creates a URL that links to a collection page containing products with a specific product type.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_type'
  },
  url_for_vendor: {
    description: 'Creates a URL that links to a collection page containing products with a specific product vendor.',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_vendor'
  },
  within: {
    description: 'Creates a collection-aware product URL by prepending /collections/collection-handle to a product URL, where collection-handle is the handle of the collection that is currently being viewed.',
    snippet: 'within: ${1}',
    link: 'https://help.shopify.com/themes/liquid/filters/url-filters#within'
  }
};
