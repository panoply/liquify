import { Objects } from '../..';

/**
 * Liquid Shopify Spec: Tags
 */
export const objects: Objects = {
  additional_checkout_buttons: {
    description: "Returns true if a merchant's store has any payment providers with offsite checkouts, such as PayPal Express Checkout. Use additional_checkout_buttons to check whether these gateways exist, and content_for_additional_checkout_buttons to show the additional buttons.",
    global: true,
    type: 'boolean',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#additional-checkout-buttons'
    }
  },
  address: {
    description: "The address object contains information entered by a customer in Shopify's checkout pages.",
    type: 'object',
    properties: {
      province_code: {
        description: 'Returns the abbreviated value of the Province/State field of the address.',
        type: 'string'
      },
      street: {
        description: 'Returns the combined values of the Address1 and Address2 fields of the address.',
        type: 'string'
      },
      url: {
        description: 'Returns the relative URL of the address.',
        type: 'string'
      },
      address1: {
        description: 'Returns the value of the Address1 field of the address.',
        type: 'string'
      },
      address2: {
        description: 'Returns the value of the Address2 field of the address.',
        type: 'string'
      },
      city: {
        description: 'Returns the value of the City field of the address.',
        type: 'string'
      },
      company: {
        description: 'Returns the value of the Company field of the address.',
        type: 'string'
      },
      country_code: {
        description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format.',
        type: 'string'
      },
      country: {
        description: 'Returns the value of the Country field of the address.',
        type: 'string'
      },
      first_name: {
        description: 'Returns the value of the First Name field of the address.',
        type: 'string'
      },
      last_name: {
        description: 'Returns the value of the Last Name field of the address.',
        type: 'string'
      },
      phone: {
        description: 'Returns the value of the Phone field of the address.',
        type: 'string'
      },
      zip: {
        description: 'Returns the value of the Postal/Zip field of the address.',
        type: 'string'
      },
      province: {
        description: 'Returns the value of the Province/State field of the address.',
        type: 'string'
      },
      name: {
        description: 'Returns the values of the First Name and Last Name fields of the address.',
        type: 'string'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/address'
    }
  },
  all_country_option_tags: {
    type: 'array',
    description: "The all_country_option_tags object creates an <option> tag for each country. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute.",
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#all_products'
    }
  },
  all_products: {
    type: 'array',
    description: 'Returns a list of all the products in your store. You can use all_products to access products by their handles.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#all_products'
    }
  },
  article: {
    description: 'Returns a list of all the blog articles in a store.',
    type: 'object',
    properties: {
      tags: {
        description: 'Returns all the tags for the article.',
        type: 'array'
      },
      user: {
        description: "Returns an object with information about the article's author.",
        type: 'object',
        properties: {
          bio: {
            description: 'Returns the bio of the author of the article.',
            type: 'string'
          },
          email: {
            description: 'Returns the email of the author of the article.',
            type: 'string'
          },
          first_name: {
            description: 'Returns the first name of the author of the article.',
            type: 'string'
          },
          homepage: {
            description: 'Returns the home page of the article author.',
            type: 'string'
          },
          image: {
            description: 'Returns the image object of the author of the article.',
            type: 'object',
            properties: {
              alt: {
                description: "Returns the article image's alt text.",
                type: 'string'
              },
              src: {
                description: 'Returns the relative URL to the article image.',
                type: 'string'
              }
            }
          },
          last_name: {
            description: 'Returns the last name of the author of the article.',
            type: 'string'
          },
          account_owner: {
            description: 'Returns true if the author of the article is the account owner of the store. Returns false if the author is not the account owner.',
            type: 'string'
          }
        }
      },
      excerpt_or_content: {
        description: 'Returns article.excerpt of the article if it exists. Returns article.content if an excerpt does not exist for the article.',
        type: 'string'
      },
      image: {
        description: "Returns the article's image object.",
        type: 'object',
        properties: {
          alt: {
            description: "Returns the article image's alt text.",
            type: 'string'
          },
          src: {
            description: 'Returns the relative URL to the article image.',
            type: 'string'
          }
        }
      },
      content: {
        type: 'string',
        description: 'Returns the content of the article.'
      },
      excerpt: {
        type: 'string',
        description: 'Returns the excerpt of the article.'
      },
      author: {
        type: 'string',
        description: "Returns the full name of the article's author."
      },
      handle: {
        type: 'string',
        description: 'Returns the handle of the article.'
      },
      id: {
        type: 'number',
        description: 'Returns the id of the article.'
      },
      comments_count: {
        type: 'number',
        description: 'Returns the number of published comments for the article.'
      },
      comments: {
        type: 'array',
        description: 'Returns the published comments of the article. Returns an empty array if comments are disabled.'
      },
      url: {
        description: 'Returns the relative URL of the article.',
        type: 'string'
      },
      comment_post_url: {
        description: 'Returns the relative URL where POST requests are sent to when creating new comments.',
        type: 'string'
      },
      created_at: {
        description: 'Returns the timestamp of when the article was created. Use the date filter to format the timestamp.',
        type: 'string'
      },
      title: {
        description: 'Returns the title of the article.',
        type: 'string'
      },
      comments_enabled: {
        description: 'Returns true if comments are enabled. Returns false if comments are disabled.',
        type: 'boolean'
      },
      moderated: {
        description: 'Returns true if the blog that the article belongs to is set to moderate comments. Returns false if the blog is not moderated.',
        type: 'boolean'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects#articles'
    }
  },
  block: {
    description: 'A block represents the content and settings of a single block in an array of section blocks. The block object can be accessed in a section file by looping through section.blocks.',
    type: 'object',
    properties: {
      shopify_attributes: {
        type: 'string',
        description: "Returns a string representing the block's attributes."
      },
      id: {
        type: 'number',
        description: 'Returns a unique ID dynamically generated by Shopify.'
      },
      settings: {
        type: 'object',
        description: "Returns an object of the block settings set in the theme editor. Retrieve setting values by referencing the setting's unique id."
      },
      type: {
        type: 'string',
        description: "Returns the type defined in the block's schema. This is useful for displaying different markup based on the block.type."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/block'
    }
  },
  blog: {
    description: 'Blog object',
    type: 'object',
    properties: {
      tags: {
        description: 'Returns all tags in a blog. Similar to all_tags, but only returns tags of articles that are in the filtered view.',
        type: 'array'
      },
      all_tags: {
        description: 'Returns all tags of all articles of a blog. This includes tags of articles that are not in the current pagination view.',
        type: 'array'
      },
      articles: {
        description: 'Returns an array of all articles in a blog.',
        type: 'array'
      },
      handle: {
        description: 'Returns the handle of the blog.',
        type: 'string'
      },
      id: {
        description: 'Returns the id of the blog.',
        type: 'number'
      },
      next_article: {
        description: 'Returns the next (older) article. Returns nil if there is no next article.',
        type: 'string'
      },
      previous_article: {
        description: 'Returns the previous (newer) article. Returns nil if there is no next article.',
        type: 'string'
      },
      link: {
        description: 'Returns the relative URL of the blog.',
        type: 'string'
      },
      title: {
        description: 'Returns the title of the blog.',
        type: 'string'
      },
      articles_count: {
        description: 'Returns the total number of articles in a blog. This total does not include hidden articles.',
        type: 'number'
      },
      comments_enabled: {
        description: 'Returns true if comments are enabled, or false if they are disabled.',
        type: 'boolean'
      },
      moderated: {
        description: 'Returns true if comments are moderated, or false if they are not moderated.',
        type: 'boolean'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#blogs'
    }
  },
  canonical_url: {
    type: 'object',
    description: "Returns the canonical URL of the current page. A page's canonical URL is the page's default URL without any URL parameters. For products and variants, the canonical URL is the default product page with no collection or variant selected.",
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    }
  },
  cart: {
    type: 'object',
    description: 'Cart object',
    properties: {
      attributes: {
        type: 'string',
        description: 'Cart attributes allow the capturing of more information on the cart page.'
      },
      items: {
        type: 'array',
        description: 'Returns all of the line items in the cart.'
      },
      cart_level_discount_applications: {
        type: 'array',
        description: 'Returns an array of any cart-specific discount applications for the cart.'
      },
      discount_applications: {
        description: 'Returns an array of discount applications for the cart.',
        type: 'array'
      },
      currency: {
        type: 'string',
        description: "Returns the currency of the cart. If your store uses multi-currency, then the cart.currency is the same as the customer's local (presentment) currency. Otherwise, the cart currency is the same as your store currency."
      },
      item_count: {
        description: 'Returns the number of items inside the cart.',
        type: 'number'
      },
      original_total_price: {
        description: 'Returns the subtotal of the cart before any discounts have been applied.',
        type: 'number'
      },
      items_subtotal_price: {
        description: "Returns the sum of the cart's line-item prices after any line-item discount. The subtotal doesn't include taxes (unless taxes are included in the prices), cart discounts, or shipping costs.",
        type: 'number'
      },
      total_discount: {
        description: 'Returns the total of all discounts (the amount saved) for the cart.',
        type: 'number'
      },
      total_price: {
        description: 'Returns the total price of all of the items in the cart after discounts have been applied.',
        type: 'number'
      },
      total_weight: {
        description: 'Returns the total weight of all of the items in the cart.',
        type: 'number'
      },
      note: {
        description: 'cart.note allows the capturing of more information on the cart page.',
        type: 'string'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    }
  },
  checkout: {
    type: 'object',
    filters: false,
    description: 'The checkout object can be accessed in the order status page of the checkout. Shopify Plus merchants can also access properties of the checkout object in the checkout.liquid layout file.',
    properties: {
      applied_gift_cards: {
        type: 'object',
        description: 'Returns the gift cards applied to the checkout.'
      },
      attributes: {
        type: 'object',
        description: 'Returns the attributes of the checkout, that were captured in the cart.'
      },
      billing_address: {
        type: 'string',
        description: 'Returns the billing address of the checkout.'
      },
      buyer_accepts_marketing: {
        type: 'boolean',
        description: 'Returns whether the buyer accepted the newsletter during the checkout.'
      },
      cart_level_discount_applications: {
        type: 'array',
        description: 'Returns an array of any cart-specific discount applications for the checkout.',
        items: 'discount-application'
      },
      currency: {
        type: 'string',
        description: 'Returns the currency of the checkout.'
      },
      customer: {
        type: 'object',
        description: 'Returns the customer associated with the checkout.'
      },
      discount_applications: {
        type: 'array',
        description: 'Returns an array of discount applications for a checkout.',
        items: 'discount-application'
      },
      discounts_amount: {
        type: 'number',
        description: 'Returns the sum of the amount of the discounts applied to the checkout.'
      },
      discounts_savings: {
        type: 'number',
        description: 'Returns the sum of the savings of the discounts applied to the checkout. The negative opposite of discounts_amount.'
      },
      email: {
        type: 'string',
        description: 'Returns the email used during the checkout.'
      },
      gift_cards_amount: {
        type: 'number',
        description: 'Returns the amount paid in gift cards of the checkout.'
      },
      id: {
        type: 'number',
        description: 'Returns the id of the checkout.'
      },
      line_items: {
        type: 'array',
        description: 'Returns all the line items of the checkout.',
        items: 'line_items'
      },
      line_items_subtotal_price: {
        type: 'number',
        description: 'Returns the sum of the cart\'s line item prices after any line item discounts. '
      },
      name: {
        type: 'string',
        description: 'Returns the name of the checkout.'
      },
      note: {
        type: 'string',
        description: 'Returns the note of the checkout.'
      },
      order: {
        type: 'object',
        description: 'Returns the order created by the checkout. '
      },
      order_id: {
        type: 'number',
        description: 'Returns the id of the order created by the checkout.'
      },
      order_name: {
        type: 'string',
        description: 'Returns the name of the order created by the checkout.'
      },
      order_number: {
        type: 'number',
        description: 'Returns the number of the order created by the checkout.'
      },
      requires_shipping: {
        type: 'boolean',
        description: 'Returns whether the checkout as a whole requires shipping, that is whether any of the line items require shipping.'
      },
      shipping_address: {
        type: 'string',
        description: 'Returns the shipping address of the checkout.'
      },
      shipping_method: {
        type: 'string',
        description: 'Returns the shipping method of the checkout.'
      },
      shipping_methods: {
        type: 'array',
        description: 'Returns an array of shipping methods of the checkout.',
        items: 'shipping_methods'
      },
      shipping_price: {
        type: 'number',
        description: 'Returns the shipping price of the checkout.'
      },
      tax_lines: {
        type: 'array',
        description: 'Returns all the tax lines of the checkout.',
        items: 'tax_lines'
      },
      tax_price: {
        type: 'string',
        description: 'Returns the tax price of the checkout, whether the taxes are included or not in the prices.'
      },
      total_price: {
        type: 'number',
        description: 'Returns the total price of the checkout.'
      },
      transactions: {
        type: 'array',
        description: 'Returns an array of transactions from the checkout.',
        items: 'transactions'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/checkout'
    }
  },
  collection: {
    type: 'object',
    filters: false,
    description: 'Returns a collection',
    properties: {
      all_tags: {
        description: 'Returns a list of all product tags in a collection. collection.all_tags will return the full list of tags even when the collection view is filtered. collection.all_tags will return at most 1,000 tags',
        type: 'array'
      },
      all_types: {
        description: 'Returns a list of all product types in a collection',
        type: 'array'
      },
      all_vendors: {
        description: 'Returns a list of all product vendors in a collection.',
        type: 'array'
      },
      products: {
        description: 'Returns all of the products in a collection. You can show a maximum of 50 products per page. Use the paginate tag to choose how many products are shown per page',
        type: 'array',
        items: 'product'
      },
      sort_options: {
        description: 'Returns an array of sorting options for the collection',
        type: 'array'
      },
      id: {
        description: 'Returns the ID number of the collection.',
        type: 'number'
      },
      link: {
        description: 'Returns the URL of the collection',
        type: 'string'
      },
      handle: {
        description: "Returns the collection's handle",
        type: 'string'
      },
      published_at: {
        description: "Returns the date and time when the collection was published. You can set this information on the collection's page in your Shopify admin by the Set publish date calendar icon. You can use a date filter to format the date",
        type: 'string'
      },
      description: {
        description: 'Returns the description of the collection',
        type: 'string'
      },
      image: {
        description: 'Returns the image of the collection',
        type: 'string'
      },
      template_suffix: {
        description: 'Returns the name of the custom collection template assigned to the `collection`, without the collection. prefix or the `.liquid` extension. Returns `nil` if a custom template is not assigned to the collection.',
        type: 'string'
      },
      next_product: {
        description: 'Returns the next product in the collection. Returns `nil` if there is no next product',
        type: 'string'
      },
      products_count: {
        description: 'Returns the number of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, collection.`products_count` will return the number of products that match the chosen tag.',
        type: 'number'
      },
      all_products_count: {
        description: 'Returns the number of products in a collection. collection.all_products_count will return the total number of products even when the collection view is filtered.',
        type: 'number'
      },
      previous_product: {
        description: 'Returns the previous product in the collection. Returns `nil` if there is no previous product.',
        type: 'string'
      },
      current_type: {
        description: 'Returns the product type on a `/collections/types?q=TYPE` collection page. For example, you may be on the automatic Shirts collection, which lists all products of type ‘shirts’ in the store: `myshop.shopify.com/collections/types?q=Shirts`',
        type: 'string'
      },
      sort_by: {
        description: 'Returns the sort order applied to the collection by the `sort_by` URL parameter. When there is no `sort_by` URL parameter, the value is null.',
        type: 'string'
      },
      default_sort_by: {
        description: 'Returns the sort order of the collection, which is set in the collection pages of the Admin',
        type: 'string'
      },
      tags: {
        description: 'Returns the tags of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, `collection.tags` will return the tags for the products that match the current filter',
        type: 'array'
      },
      title: {
        description: 'Returns the title of the collection',
        type: 'string'
      },
      current_vendor: {
        description: 'Returns the vendor name on a `/collections/vendors?q=VENDOR` collection page. For example, you may be on the automatic Shopify collection, which lists all products with vendor ‘shopify’ in the store: `myshop.shopify.com/collections/vendors?q=Shopify`',
        type: 'string'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collection'
    }
  },
  collections: {
    type: 'array',
    description: 'Returns a list of all of the collections in a store',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collections'
    }
  },
  color: {
    type: 'object',
    filters: false,
    description: 'The color object is returned from color type settings',
    properties: {
      alpha: {
        type: 'number',
        description: 'Returns the alpha component of the color, which is a decimal number between 0 and 1.'
      },
      blue: {
        type: 'number',
        description: 'Returns the blue component of the color, which is a number between 0 and 255.'
      },
      green: {
        type: 'number',
        description: 'Returns the green component of the color, which is a number between 0 and 255.'
      },
      hue: {
        type: 'number',
        description: 'Returns the hue component of the color, which is a number between 0 and 360.'
      },
      lightness: {
        type: 'number',
        description: 'Returns the lightness component of the color, which is a number between 0 and 100.'
      },
      red: {
        type: 'number',
        description: 'Returns the red component of the color, which is a number between 0 and 255.'
      },
      saturation: {
        type: 'number',
        description: 'Returns the saturation component of the color, which is a number between 0 and 100.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/color'
    }
  },
  comment: {
    type: 'object',
    filters: false,
    description: 'Article Comment',
    properties: {
      link: {
        type: 'string',
        description: 'Returns the URL of the article with `comment.id` appended to it. This is so the page will automatically scroll to the comment'
      },
      author: {
        description: 'Returns the author of the comment',
        type: 'string'
      },
      content: {
        description: 'Returns the content of the comment',
        type: 'string'
      },
      email: {
        type: 'string',
        description: "Returns the e-mail address of the comment's author"
      },
      id: {
        type: 'number',
        description: 'Returns the id (unique identifier) of the comment'
      },
      status: {
        type: 'string',
        description: 'Returns the status of the comment'
      },
      created_at: {
        type: 'string',
        description: 'Returns the timestamp of when the comment was submitted. Use the `date` filter to convert the timestamp into a more readable format'
      },
      updated_at: {
        type: 'string',
        description: "Returns the timestamp of when the comment's status was last changed. For example, the timestamp of when a comment was approved by the article's author. Use the `date` filter to convert the timestamp into a more readable format"
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/comment'
    }
  },
  content_for_additional_checkout_buttons: {
    type: 'constant',
    description: 'Returns checkout buttons for any active payment providers with offsite checkouts. The "additional_checkout_buttons" and "content_for_additional_checkout_buttons" are used in many Shopify themes.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects#content_for_additional_checkout_buttons'
    }
  },
  content_for_header: {
    type: 'constant',
    description: 'The content_for_header object is required in theme.liquid. It must be placed inside the HTML <head> tag. It dynamically loads all scripts required by Shopify into the document head. These scripts include Shopify analytics, Google Analytics, and scripts required for Shopify apps.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-objects'
    }
  },
  content_for_index: {
    type: 'constant',
    description: 'The content_for_index object contains the content of dynamic sections to be rendered on the home page. This object must be included in templates/index.liquid.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-for-index'
    }
  },
  content_for_layout: {
    type: 'constant',
    description: 'The content_for_layout object is required in theme.liquid. It must be placed inside the HTML <body> tag. It dynamically loads content generated by other templates such as index.liquid or product.liquid.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-for-layout'
    }
  },
  country: {
    type: 'object',
    filters: false,
    description: 'The country object has the following attributes:',
    properties: {
      currency: {
        type: 'object',
        description: 'Returns the currency used in the country.'
      },
      iso_code: {
        type: 'string',
        description: 'Returns the ISO code of the country. For example, US or FR for United States or France.'
      },
      name: {
        type: 'string',
        description: 'Returns the name of the country. For example, United States or France.'
      },
      unit_system: {
        type: 'string',
        description: 'Returns the unit system of the country. Can be either imperial or metric'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/country'
    }
  },
  country_option_tags: {
    type: 'constant',
    description: "The country_option_tags object creates an <option> tag for each country that is included as a shipping zone on the Shipping page of the admin. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute",
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags'
    }
  },
  currency: {
    description: 'The currency object',
    filters: false,
    type: 'object',
    trims: false,
    properties: {
      iso_code: {
        type: 'string',
        description: 'Returns the ISO code of the currency (for example `USD` or `EUR`).'
      },
      symbol: {
        type: 'string',
        description: "Returns the currency's symbol (for example, `$` or `€`)."
      },
      name: {
        type: 'string',
        description: 'Returns the name of the currency (for example United States dollars or Euro).'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags'
    }
  },
  current_page: {
    type: 'number',
    scope: [ 'paginate' ],
    description: 'current_page returns the number of the page you are on when browsing through paginated content. It can be used outside the paginate block',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collections'
    }
  },
  current_tags: {
    type: 'array',
    description: 'Product tags are used to filter a collection to only show products that contain a specific product tag. Similarly, article tags are used to filter a blog to only show products that contain a specific article tag. The current_tags variable is an array that contains all tags that are being used to filter a collection or blog.',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/current-tags'
    }
  },
  customer: {
    type: 'object',
    description: 'The customer object contains information about a customer who has a customer account',
    trims: false,
    properties: {
      accepts_marketing: {
        description: 'Returns `true` if the customer accepts marketing, returns `false` if the customer does not',
        type: 'boolean'
      },
      addresses: {
        description: 'Returns an array of all addresses associated with a customer',
        type: 'array'
      },
      orders: {
        description: 'Returns an array of all orders placed by the customer',
        type: 'array'
      },
      default_address: {
        description: 'Returns the default customer_address',
        type: 'string'
      },
      email: {
        description: 'Returns the email address of the customer',
        type: 'string'
      },
      first_name: {
        description: 'Returns the first name of the customer',
        type: 'string'
      },
      name: {
        description: 'Returns the full name of the customer',
        type: 'string'
      },
      id: {
        description: 'Returns the id of the customer',
        type: 'number'
      },
      last_name: {
        description: 'Returns the last name of the customer',
        type: 'string'
      },
      last_order: {
        description: 'Returns the last order placed by the customer, not including test orders',
        type: 'string'
      },
      tags: {
        description: 'Returns the list of tags associated with the customer',
        type: 'array'
      },
      addresses_count: {
        description: 'Returns the number of addresses associated with a customer',
        type: 'number'
      },
      phone: {
        description: 'Returns the phone number of the customer',
        type: 'string'
      },
      total_spent: {
        description: 'Returns the total amount spent on all orders',
        type: 'string'
      },
      orders_count: {
        description: 'Returns the total number of orders a customer has placed',
        type: 'number'
      },
      has_account: {
        description: 'Returns true if the email associated with an order is also tied to a customer account. Returns `false` if it is not. Helpful in email templates',
        type: 'boolean'
      },
      tax_exempt: {
        description: 'Returns whether or not the customer is exempt from taxes',
        type: 'boolean'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer'
    }
  },
  customer_address: {
    description: 'The currency object',
    type: 'object',
    trims: false,
    properties: {
      province_code: {
        type: 'string',
        description: 'Returns the abbreviated value of the Province/State field of the address'
      },
      street: {
        type: 'string',
        description: 'Returns the combined values of the Address1 and Address2 fields of the address'
      },
      id: {
        type: 'number',
        description: 'Returns the id of customer address'
      },
      address1: {
        type: 'string',
        description: 'Returns the value of the Address1 field of the address'
      },
      address2: {
        type: 'string',
        description: 'Returns the value of the Address2 field of the address'
      },
      city: {
        type: 'string',
        description: 'Returns the value of the City field of the address'
      },
      company: {
        type: 'string',
        description: 'Returns the value of the Company field of the address'
      },
      country_code: {
        type: 'string',
        description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format'
      },
      country: {
        type: 'string',
        description: 'Returns the value of the Country field of the address'
      },
      first_name: {
        type: 'string',
        description: 'Returns the value of the First Name field of the address'
      },
      last_name: {
        type: 'string',
        description: 'Returns the value of the Last Name field of the address'
      },
      phone: {
        type: 'string',
        description: 'Returns the value of the Phone field of the address'
      },
      zip: {
        type: 'string',
        description: 'Returns the value of the Postal/Zip field of the address'
      },
      province: {
        type: 'string',
        description: 'Returns the value of the Province/State field of the address'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer-address'
    }
  },
  discount_allocation: {
    type: 'object',
    trims: false,
    description: 'The `discount_allocation` object contains all of the information about how a particular discount affects a line item and how the price reduces. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the `discount_allocation` object in the `checkout.liquid` layout file.',
    properties: {
      discount_application: {
        type: 'string',
        description: 'The discount application that allocates the amount on the line item'
      },
      amount: {
        type: 'number',
        description: 'The discounted amount on a line item by a particular discount'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-allocation'
    }
  },
  discount_application: {
    type: 'object',
    trims: false,
    description: 'The `discount_application` object captures the intent of a `discount applied` on an order. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the discount_allocation object in the checkout.liquid layout file.',
    properties: {
      target_selection: {
        type: 'string',
        description: 'Describes how a discount selects line items in the cart to be discounted'
      },
      target_type: {
        type: 'string',
        description: 'Describes the type of item that a discount applies to. `target_type` has the following possible values, line_item or shipping_line'
      },
      title: {
        type: 'string',
        description: 'The customer-facing name of the discount. For example, `Welcome10` or `CBBWQQAKYBYY`'
      },
      total_allocated_amount: {
        type: 'number',
        description: 'The total amount that the price of an order is reduced by the discount'
      },
      type: {
        type: 'string',
        description: 'The type of the discount. type has the following possible values:\n\n- automatic\n- manual\n-discount_code\n-script'
      },
      value: {
        type: 'number',
        description: 'The value of the discount.'
      },
      value_type: {
        type: 'string',
        description: 'The value type of the discount. value_type has the following possible values:\n\n- fixed_amount\n- percentagel'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-application'
    }
  },
  external_video: {
    type: 'object',
    description: "The external_video object can be accessed from the product object's media attribute. It contains information about a YouTube video associated with a product",
    properties: {
      external_id: {
        type: 'number',
        description: 'Returns the ID of the YouTube video'
      },
      alt: {
        type: 'string',
        description: 'Returns the alt tag of the video set on the product details page of the Shopify admin'
      },
      aspect_ratio: {
        type: 'string',
        description: 'Returns the aspect ratio of the YouTube video'
      },
      id: {
        type: 'number',
        description: 'Returns the media_id of the external video.'
      },
      video_host: {
        type: 'string',
        description: 'Returns the name of the video host (youtube).'
      },
      position: {
        type: 'string',
        description: "Returns the position of the external_video in the product object's media array."
      },
      media_type: {
        type: 'string',
        description: "Returns the type of the object (external_video). This can be used to filter the product object's media array."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/external-video'
    }
  },
  font: {
    type: 'object',
    description: 'The font object is used to access the font_picker settings. It can be accessed via the global settings object',
    properties: {
      variants: {
        description: "Returns all of the variants within the font's family. Each of the variants is also a font object",
        type: 'array'
      },
      family: {
        description: "Returns the font's name",
        type: 'string'
      },
      baseline_ratio: {
        type: 'string',
        description: 'Returns the position of the baseline within the em box (measured from the bottom). You can learn more about baseline ratios in the Plumber SASS documentation'
      },
      style: {
        description: 'Returns the selected font style',
        type: 'string'
      },
      weight: {
        description: 'Returns the selected font weight',
        type: 'string'
      },
      fallback_families: {
        description: 'Returns the suggested fallback font families',
        type: 'string'
      }
    }
  },
  form: {
    type: 'object',
    description: 'The form object is used within the form tag. It contains attributes of its parent form.',
    filters: false,
    scope: [ 'form' ],
    properties: {
      address1: {
        type: 'string',
        description: 'Returns the first address line associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      address2: {
        type: 'string',
        description: 'Returns the second address line associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      author: {
        type: 'string',
        description: 'Returns the name of the author of the blog article comment. Exclusive to form tags with the "article" parameter.'
      },
      body: {
        type: 'string',
        description: 'Returns the content of the blog article comment. Exclusive to form tags with the "article" parameter.'
      },
      city: {
        type: 'string',
        description: 'Returns the city associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      company: {
        type: 'string',
        description: 'Returns the company name associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      country: {
        type: 'string',
        description: 'Returns the country associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      email: {
        type: 'string',
        description: "Returns the email of the blog article comment's author. Exclusive to form tags with the \"article\" parameter."
      },
      errors: {
        type: 'array',
        description: 'Returns an array of strings if the form was not submitted successfully. The strings returned depend on which fields of the form were left empty or contained errors. Possible values are:\n\n- author\n- body\n- email\n- form\n'
      },
      first_name: {
        type: 'string',
        description: 'Returns the first name associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      id: {
        type: 'number',
        description: 'Returns the id (unique identifier) of the form.'
      },
      last_name: {
        type: 'string',
        description: 'Returns the last name associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      password_needed: {
        type: 'boolean',
        description: 'Used only for form tags with the "customer_login" parameter. The form.password_needed attribute always returns true.'
      },
      phone: {
        type: 'string',
        description: 'Returns the telephone number associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      'posted_successfully?': {
        type: 'boolean',
        description: 'Returns true if the form was submitted successfully, or false if the form contained errors. All forms but the address form set that property. The address form is always submitted successfully.'
      },
      province: {
        type: 'string',
        description: 'Returns the province or state associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      set_as_default_checkbox: {
        type: 'constant',
        description: "Renders an HTML checkbox that can submit the current form as the customer's default address. Exclusive to form tags with the \"address\" parameter"
      },
      zip: {
        type: 'string',
        description: 'Returns the zip code or postal code associated with the address. Exclusive to form tags with the "address" parameter.'
      }
    }
  },
  forloop: {
    scope: [ 'for' ],
    type: 'object',
    description: 'The forloop object contains attributes of its parent for loop.',
    filters: false,
    properties: {
      rindex: {
        description: 'Returns `forloop.index` in reverse order.',
        type: 'number'
      },
      rindex0: {
        description: 'Returns `forloop.index0` in reverse order.',
        type: 'number'
      },
      index0: {
        description: 'Returns the current index of the for loop, starting at 0.',
        type: 'number'
      },
      index: {
        description: 'Returns the current index of the for loop, starting at 1.',
        type: 'number'
      },
      length: {
        description: 'Returns the number of iterations of the loop.',
        type: 'number'
      },
      first: {
        description: "Returns true if it's the first iteration of the for loop. Returns false if it is not the first iteration.",
        type: 'boolean'
      },
      last: {
        description: "Returns true if it's the last iteration of the for loop. Returns false if it is not the last iteration.",
        type: 'boolean'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/for-loops'
    }
  },
  fulfillment: {
    type: 'object',
    description: 'The fulfillment object',
    properties: {
      fulfillment_line_items: {
        type: 'array',
        description: 'Returns an array of all line items and their quantity included in the fulfillment. Any line items that have already been fulfilled, or are yet to be fulfilled, will not be included in the array.'
      },
      item_count: {
        type: 'array',
        description: 'Returns the total number of items included in the fulfillment.'
      },
      tracking_company: {
        type: 'string',
        description: 'Returns the name of the fulfillment service.'
      },
      tracking_number: {
        type: 'string',
        description: "Returns a fulfillment's tracking number, if it exists."
      },
      tracking_url: {
        type: 'string',
        description: 'Returns the URL for a tracking number.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/fulfillment'
    }
  },
  gift_card: {
    type: 'object',
    description: 'The gift_card object can be accessed in the following templates: 1. The Gift card created email notification template Email Notifications > Gift card created.2. The gift_card.liquid template.',
    properties: {
      balance: {
        type: 'number',
        description: 'Returns the amount of money remaining on the gift card.'
      },
      code: {
        type: 'number',
        description: 'Returns the code that was used to redeem the gift card.'
      },
      currency: {
        type: 'string',
        description: 'Returns the currency that the card was issued in. This currency is the currency of the store.'
      },
      customer: {
        type: 'string',
        description: 'Returns the customer variable of the customer that the gift card is assigned to.'
      },
      enabled: {
        type: 'boolean',
        description: 'Returns true if the card is enabled, or false if the card is disabled.'
      },
      expired: {
        type: 'boolean',
        description: 'Returns true if the card is expired, or false if the card is not.'
      },
      expires_on: {
        type: 'string',
        description: 'Returns the expiration date of the gift card'
      },
      initial_value: {
        type: 'number',
        description: 'Returns the initial amount of money on the gift card'
      },
      last_four_characters: {
        type: 'number',
        description: 'Returns the last four characters of the code that was used to redeem the gift card.'
      },
      properties: {
        type: 'array',
        description: 'Returns the line item properties assigned to the gift card when it was added to the cart.',
        items: 'line_item'
      },
      product: {
        type: 'object',
        description: 'Returns the product associated with the purchased gift card, or returns nothing if there is no associated product.'
      },
      url: {
        type: 'string',
        description: 'Returns the unique URL that links to the gift card\'s page on the shop'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/gift-card'
    }
  },
  group: {
    type: 'object',
    filters: false,
    description: 'The group object contains information about each default rule set in the robots object for the robots.txt file.',
    properties: {
      rules: {
        type: 'object',
        description: 'Returns of a list of rule objects for each rule in the group.'
      },
      sitemap: {
        type: 'object',
        description: 'Returns the group\'s sitemap object. If the group doesn\'t require a sitemap, then this returns blank.'
      },
      user_agent: {
        type: 'object',
        description: 'Returns the group\'s user_agent object.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/group'
    }
  },
  handle: {
    type: 'string',
    global: true,
    description: 'Returns the handle of the page that is being viewed',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#handle'
    }
  },
  image: {
    type: 'object',
    description: 'The image object returns information about an image.',
    properties: {
      variants: {
        description: 'Returns an array of attributes for the variant that the image is associated with.',
        type: 'array'
      },
      alt: {
        description: 'Returns the alt tag of the image, set in the Products page of the Admin.',
        type: 'string'
      },
      aspect_ratio: {
        type: 'string',
        description: 'Returns the aspect ratio (width / height) of the image.'
      },
      height: {
        type: 'number',
        description: 'Returns the height of the image in pixels.'
      },
      product_id: {
        description: "Returns the id of the image's product.",
        type: 'number'
      },
      id: {
        description: 'Returns the id of the image.',
        type: 'number'
      },
      position: {
        type: 'number',
        description: 'Returns the position of the image, starting at 1. This is the same as outputting forloop.index.'
      },
      src: {
        type: 'string',
        description: 'Returns the relative path of the product image. This is the same as outputting "{{ image }}".'
      },
      width: {
        type: 'number',
        description: 'Returns the width of the image in pixels.'
      },
      attached_to_variant: {
        type: 'boolean',
        description: 'Returns true if the image has been associated with a variant. Returns false otherwise. This can be used in cases where you want to create a gallery of images that are not associated with variants.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#image'
    }
  },
  line_item: {
    type: 'object',
    description: 'A line_item represents a single line in the shopping cart. There is one line item for each distinct product variant in the cart. The line_item object can be accessed in all Liquid templates via cart.items',
    properties: {
      discount_allocations: {
        type: 'array',
        description: 'Returns a list of all discount allocations containing the discounted amount and the reference to the parent discount application. line_item.discount_allocations is available on line items in carts, checkouts, orders, and draft orders.'
      },
      final_line_price: {
        type: 'number',
        description: 'Returns the combined price of all the items in the line item. This is equal to line_item.final_price times line_item.quantity.'
      },
      final_price: {
        type: 'number',
        description: 'Returns the price of the line item including all line level discount amounts.'
      },
      fulfillment: {
        type: 'string',
        description: 'Returns the fulfillment of the line item.'
      },
      fulfillment_service: {
        type: 'string',
        description: "Returns the fulfillment service associated with the line item's variant. Line items that have no fulfillment service will return manual."
      },
      gift_card: {
        type: 'boolean',
        description: "Returns true if the line item's product is a gift card, or false if it is not."
      },
      grams: {
        type: 'number',
        description: 'Returns the weight of the line item. Use the weight_with_unit filter to format the weight.'
      },
      image: {
        type: 'string',
        description: "Returns the line item's image."
      },
      key: {
        type: 'number',
        description: "Returns the line item key, a unique identifier for the line item. The line item key is constructed from the line item's variant ID plus a hash of the line item's properties, even if the item has no additional properties."
      },
      line_level_discount_allocations: {
        type: 'array',
        description: 'Returns a list of line-specific discount allocations containing the discounted amount and the reference to the parent discount application.'
      },
      line_level_total_discount: {
        type: 'array',
        description: "Returns the total amount of all discounts applied to the line item specifically. This doesn't include discounts that are added to the cart."
      },
      message: {
        type: 'string',
        description: 'Returns the discount message if a script has applied a discount to the line item.'
      },
      options_with_values: {
        type: 'array',
        description: "Returns an array of selected values from the item's product options."
      },
      original_line_price: {
        type: 'number',
        description: 'Returns the combined price of the quantity of items included in the line, before discounts were applied.'
      },
      original_price: {
        type: 'number',
        description: 'Returns the original price of the line item before discounts were applied.'
      },
      product: {
        type: 'object',
        description: 'Returns the product of the line item.'
      },
      product_id: {
        type: 'number',
        description: "Returns the ID of the line item's product."
      },
      properties: {
        type: 'array',
        description: 'line_item.properties returns an array of custom information for an item that has been added to the cart.'
      },
      quantity: {
        type: 'number',
        description: 'Returns the quantity of the line item.'
      },
      requires_shipping: {
        type: 'boolean',
        description: 'Returns true if the variant of the line item requires shipping, or false if it does not.'
      },
      selling_plan_allocation: {
        type: 'object',
        description: 'Returns a selling_plan_allocation object when the line item contains a selling plan.'
      },
      sku: {
        type: 'number',
        description: "Returns the SKU (stock keeping unit) of the line item's variant."
      },
      successfully_fulfilled_quantity: {
        type: 'number',
        description: 'Returns the successfully fulfilled quantity of the line item.'
      },
      taxable: {
        type: 'boolean',
        description: "Returns true if taxes are charged on the line item's variant, or false if they are not."
      },
      title: {
        type: 'string',
        description: "Returns the title of the line item. line_item.title combines both the line item's product.title and the line item's variant.title, separated by a hyphen."
      },
      unit_price: {
        type: 'number',
        description: 'Returns the unit price of the line item. The price reflects any discounts that are applied to the line item.'
      },
      unit_price_measurement: {
        type: 'object',
        description: 'Returns a unit_price_measurement object for the line item.'
      },
      url: {
        type: 'string',
        description: "Returns the relative URL of the line item's variant. The relative URL does not include your store's root URL (mystore.myshopify.com)."
      },
      variant: {
        type: 'object',
        description: 'Returns the variant of the line item.'
      },
      variant_id: {
        type: 'number',
        description: "Returns the ID of the line item's variant."
      },
      vendor: {
        type: 'object',
        description: "Returns the vendor of the line item's product."
      },
      id: {
        type: 'number',
        description: "Returns the line item's ID."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/line_item'
    }
  },
  link: {
    type: 'object',
    scope: [ 'linklist' ],
    description: 'The link object cannot be invoked on its own. It must be invoked inside a linklist.',
    properties: {
      active: {
        type: 'boolean',
        description: 'Returns true if the link is active, or false if the link is inactive'
      },
      child_active: {
        type: 'boolean',
        description: 'Similar to `link.active`, but returns true if a child link of the parent link is active, or false if no child links of the parent link are active.'
      },
      child_current: {
        type: 'boolean',
        description: 'Returns `true` if a child link has a link object with link.current equal to `true`. Returns `false` if no child links have a link object with link.current equal to `true`.'
      },
      current: {
        type: 'boolean',
        description: "Returns `true` if the page content associated with the `link` is considered a match to the current page. Returns `false` if the content isn't considered a match"
      },
      levels: {
        type: 'number',
        description: 'Returns the number of nested levels that a link contains.'
      },
      links: {
        type: 'array',
        description: 'Returns an array of the child links associated with the parent link.'
      },
      items: {
        type: 'object',
        description: 'Returns the variable associated to the link. The possible types are: product, collection, page, blog.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of the link'
      },
      type: {
        type: 'string',
        description: 'Returns the type of the link. The possible values are:\n\n- collection_link\n- product_link\n- page_link\n- blog_link\n- relative_link\n- http_link'
      },
      url: {
        type: 'string',
        description: 'Returns the URL of the link.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/link'
    }
  },
  linklist: {
    type: 'object',
    description: 'linklist objects appear as ‘menus’ in the Navigation page of the Shopify admin.',
    properties: {
      handle: {
        type: 'string',
        description: 'Returns the handle of the linklist.'
      },
      levels: {
        type: 'number',
        description: 'Returns the number of nested levels that a linklist contains.'
      },
      links: {
        type: 'array',
        description: 'Returns an array of links in the linklist.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of the linklist'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/linklist'
    }
  },
  localization: {
    type: 'object',
    description: 'The localization object has the following attributes:',
    scope: [ 'form' ],
    properties: {
      available_countries: {
        type: 'array',
        description: 'Returns a list of country objects for each country that the store supports.',
        items: 'country'
      },
      available_languages: {
        type: 'array',
        description: 'Returns a list of shop_locale objects for each language that the currently selected country supports.',
        items: 'shop_locale'
      },
      country: {
        type: 'object',
        description: 'Returns the country object for the currently selected country.'
      },
      language: {
        type: 'object',
        description: 'Returns the shop_locale object for the currently selected language.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/localization'
    }
  },
  images: {
    type: 'object',
    description: 'Allows you to access any image in a store by its filename',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#images'
    }
  },
  linklists: {
    type: 'array',
    description: 'Returns a list of all the menus (link lists) in your store. You can use linklists to access your link lists with their handles.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#linklists'
    }
  },
  page: {
    type: 'object',
    description: 'The page object has the following attributes',
    properties: {
      author: {
        type: 'string',
        description: 'Returns the author of a page.'
      },
      content: {
        type: 'string',
        description: 'Returns the content of a page.'
      },
      handle: {
        type: 'string',
        description: 'Returns the handle of the page.'
      },
      id: {
        type: 'string',
        description: 'Returns the id of the page.'
      },
      published_at: {
        type: 'string',
        description: 'Returns the timestamp of when the page was created. Use the date filter to format the timestamp.'
      },
      template_suffix: {
        type: 'string',
        description: 'Returns the name of the custom page template assigned to the page, without the page.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of a page.'
      },
      url: {
        type: 'string',
        description: 'Returns the relative URL of the page.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/page'
    }
  },
  page_description: {
    type: 'string',
    description: 'Returns the description of a page set in its respective section in the admin',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#page_description'
    }
  },
  page_image: {
    type: 'string',
    description: 'An image to be shown in search engine listings and social media previews for the current page.\n\nThe resource\'s featured image for product and collection pages, and blog posts, is used. For all other pages, or pages where there\'s no featured image, the social sharing image is used.\n\nOpen Graph fallback tags\n\nIf a theme doesn\'t include og:image tags for a page, then Shopify automatically generates the following tags using the page_image object:\n\n- og:image\n- og:image:secure_url\n- og:image:width-\n- og:image:height',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#page_image'
    }
  },
  page_title: {
    type: 'string',
    description: 'The `page_title` object can be used to specify the title of page for search engine listings and social media previews.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#page_title'
    }
  },
  product: {
    type: 'object',
    description: 'Product object',
    properties: {
      collections: {
        type: 'array',
        items: 'string',
        description: 'Returns an array of all of the collections that a product belongs to, except any collections that are not available on the sales channel being used.'
      },
      tags: {
        type: 'array',
        items: 'string',
        description: "Returns an array of all of the product's tags. The tags are returned in alphabetical order."
      },
      images: {
        type: 'array',
        items: 'string',
        description: "Returns an array of the product's images. Use the img_url filter to link to the product image on Shopify's content delivery network (CDN)."
      },
      options: {
        type: 'array',
        items: 'string',
        description: "Returns an array of the product's option names."
      },
      options_with_values: {
        type: 'array',
        items: 'product_options',
        description: "Returns an array of the product's options."
      },
      variants: {
        type: 'array',
        items: 'string',
        description: "Returns an array of the product's variants."
      },
      content: {
        type: 'string',
        description: 'Returns the description of the product. Alias for product.description.'
      },
      description: {
        type: 'string',
        description: 'Returns the description of the product.'
      },
      handle: {
        type: 'string',
        description: 'Returns the handle of a product.'
      },
      compare_at_price_max: {
        type: 'number',
        description: 'Returns the highest compare at price.'
      },
      price_max: {
        type: 'number',
        description: 'Returns the highest price of the product.'
      },
      id: {
        type: 'number',
        description: 'Returns the id of the product.'
      },
      compare_at_price_min: {
        type: 'number',
        description: 'Returns the lowest compare at price.'
      },
      price: {
        type: 'number',
        description: "Returns the lowest price of all the product's variants. This attribute is the same as product.price_min."
      },
      price_min: {
        type: 'number',
        description: 'Returns the lowest price of the product.'
      },
      template_suffix: {
        type: 'string',
        description: 'Returns the name of the custom product template assigned to the product, without the product. prefix nor the .liquid extension. Returns nil if a custom template is not assigned to the product.'
      },
      featured_image: {
        type: 'string',
        description: "Returns the relative URL of the product's featured image."
      },
      type: {
        type: 'string',
        description: 'Returns the relative URL of the product.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of the product.'
      },
      selected_variant: {
        type: 'object',
        description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` in the URL. Returns nil if there is not.'
      },
      selected_or_first_available_variant: {
        type: 'object',
        description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` parameter in the URL. If there is no selected variant, the first available variant is returned. In order for a variant to be available, its `variant.inventory_quantity` must be greater than zero or `variant.inventory_policy` must be set to continue. A variant with no `inventory_management` is considered available.'
      },
      first_available_variant: {
        type: 'object',
        description: 'Returns the variant object of the first product variant that is available for purchase. In order for a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no inventory_policy is considered available.'
      },
      vendor: {
        type: 'string',
        description: 'Returns the vendor of the product.'
      },
      available: {
        type: 'boolean',
        description: "Returns true if a product is available for purchase. Returns `false` if all of the products variants' inventory_quantity values are zero or less, and their `inventory_policy` is not set to \"_Allow users to purchase this item, even if it is no longer in stock._\""
      },
      compare_at_price_varies: {
        type: 'boolean',
        description: 'Returns true if the compare_at_price_min is different from the compare_at_price_max. Returns false if they are the same.'
      },
      has_only_default_variant: {
        type: 'boolean',
        description: 'Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.'
      },
      price_varies: {
        type: 'boolean',
        description: "Returns true if the product's variants have varying prices. Returns false if all of the product's variants have the same price."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#product'
    }
  },
  product_options: {
    type: 'object',
    description: 'The product_option object is available for each option in a product options array. The product options array is accessible via product.options_with_values.',
    properties: {
      name: {
        type: 'string',
        description: 'Returns the product option\'s name'
      },
      position: {
        type: 'number',
        description: 'Returns the product option\'s position in the product options array.'
      },
      selected_value: {
        type: 'string',
        description: 'Returns the currently selected value for this product option.'
      },
      values: {
        type: 'array',
        items: 'options_with_values',
        description: 'Returns an array of possible values for this product option.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/product_option'
    }
  },
  location: {
    type: 'object',
    description: 'This object allows you access store location information using Liquid.',
    properties: {
      address: {
        type: 'string',
        description: 'Returns the address object corresponding to this location.'
      },
      id: {
        type: 'string',
        description: 'Returns the ID of the location.'
      },
      latitude: {
        type: 'string',
        description: 'Returns the latitude associated to the location. It will return null if the address is not verified.'
      },
      longitude: {
        type: 'string',
        description: 'Returns the longitude associated with the location. It will return null if the address is not verified.'
      },
      name: {
        type: 'string',
        description: 'Returns the name of location.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/location'
    }
  },
  order: {
    description: "You can access the order object in a theme's Liquid templates with \"customer.orders\"",
    type: 'object',
    properties: {
      attributes: {
        description: "Returns the custom cart attributes for the order, if there are any. You can add as many custom attributes to your cart as you like.\n\nWhen you're looping through attributes, use \"{{ attribute | first }}\" to get the name of the attribute, and \"{{ attribute | last }}\" to get its value.",
        type: 'array'
      },
      billing_address: {
        description: 'Returns the billing address of the order.',
        type: 'string'
      },
      cancelled: {
        description: 'Returns true if an order is canceled, or false if it is not.',
        type: 'string'
      },
      cancelled_at: {
        description: 'Returns the timestamp of when an order was canceled. Use the date filter to format the timestamp.',
        type: 'string'
      },
      cancel_reason: {
        description: 'Returns one of the following cancellation reasons, if an order was canceled:\n\n-items unavailable\n- fraudulent order\n- customer changed/cancelled order\n- other\n',
        type: 'string'
      },
      cancel_reason_label: {
        description: "Returns the translated output of an order's order.cancel_reason.",
        type: 'string'
      },
      cart_level_discount_applications: {
        description: 'Returns an array of order-specific discount applications for an order.',
        type: 'array'
      },
      created_at: {
        description: 'Returns the timestamp of when an order was created. Use the date filter to format the timestamp.',
        type: 'string'
      },
      customer: {
        description: 'Returns the customer associated with the order.',
        type: 'string'
      },
      customer_url: {
        description: 'Returns a unique URL that the customer can use to access the order.',
        type: 'string'
      },
      discount_applications: {
        description: 'Returns an array of discount applications for an order.',
        type: 'string'
      },
      email: {
        description: 'Returns the email address associated with an order, if it exists.',
        type: 'string'
      },
      financial_status: {
        description: 'Returns the financial status of an order. The possible values are:\n\n- pending\n- authorized\n- paid\n- partially_paid\n- refunded\n- partially_refunded\n- voided',
        type: 'string'
      },
      financial_status_label: {
        description: "Returns the translated output of an order's \"financial_status\".",
        type: 'string'
      },
      fulfillment_status: {
        description: 'Returns the fulfillment status of an order.',
        type: 'string'
      },
      fulfillment_status_label: {
        description: "Returns the translated output of an order's fulfillment_status.",
        type: 'string'
      },
      line_items: {
        description: 'Returns an array of line items for the order.',
        type: 'array'
      },
      line_items_subtotal_price: {
        description: "Returns the sum of the order's line-item prices after any line item discounts have been applied. The subtotal amount doesn't include cart discounts, taxes (unless taxes are included in the prices), or shipping costs.",
        type: 'string'
      },
      location: {
        description: '(POS only) Returns the physical location of the order. You can configure locations in the Locations settings of your Shopify admin.',
        type: 'string'
      },
      name: {
        description: 'Returns the name of the order in the format set in the Standards and formats section of the General settings of your Shopify admin.',
        type: 'string'
      },
      note: {
        description: 'Returns the note associated with a customer order.',
        type: 'string'
      },
      order_number: {
        description: 'Returns the integer representation of the order name.',
        type: 'number'
      },
      order_status_url: {
        description: 'Returns the unique URL for the order status page of the order.',
        type: 'string'
      },
      phone: {
        description: 'Returns the phone number associated with an order, if it exists.',
        type: 'string'
      },
      shipping_address: {
        description: 'Returns the shipping address of the order.',
        type: 'string'
      },
      shipping_methods: {
        description: 'Returns an array of shipping_method variables from the order.',
        type: 'string'
      },
      shipping_price: {
        description: 'Returns the shipping price of an order.',
        type: 'string'
      },
      subtotal_price: {
        description: "Returns the subtotal price of all the items in the order after both line-item and cart discounts have been applied. The subtotal doesn't include taxes (unless taxes are included in the prices) or shipping costs.",
        type: 'string'
      },
      tags: {
        description: "Returns an array of all of the order's tags. The tags are returned in alphabetical order.",
        type: 'array'
      },
      tax_lines: {
        description: 'Returns an array of tax_line variables for an order.',
        type: 'string'
      },
      tax_price: {
        description: "Returns the order's tax price.",
        type: 'string'
      },
      total_discounts: {
        description: 'Returns the total value of all discounts applied to the order.',
        type: 'string'
      },
      total_net_amount: {
        description: 'Returns the net amount of the order.\n\nThe "order.total_net_amount" is calculated after refunds are applied. The value is equivalent to "order.total_price minus" "order.total_refunded_amount".',
        type: 'string'
      },
      total_price: {
        description: 'Returns the total price of an order.\n\nThe "order.total_price amount" is calculated before refunds are applied. To get the value of refunds, use the "order.total_refunded_amount property."',
        type: 'string'
      },
      total_refunded_amount: {
        description: 'Returns the total refunded amount of an order.',
        type: 'string'
      },
      transactions: {
        description: 'Returns an array of transactions from the order.',
        type: 'array'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/order'
    }
  },
  recommendations: {
    type: 'object',
    description: 'The recommendations object provides product recommendations that are related to a given product, based on data from sales, product descriptions, and relations between products and collections.',
    properties: {
      performed: {
        type: 'boolean',
        description: 'Returns true if the recommendations object is referenced inside a theme section that is rendered through the recommendations endpoint with valid parameters:'
      },
      products_count: {
        type: 'number',
        description: 'Returns the number of product recommendations, or returns 0 if recommendations.performed is false.'
      },
      products: {
        type: 'array',
        items: 'product',
        description: 'Returns product recommendations.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/recommendations'
    }
  },
  request: {
    type: 'object',
    description: 'The request object returns information about the URL used to access your store and the page being accessed.',
    properties: {
      design_mode: {
        type: 'boolean',
        description: 'Whether the request is being made from the theme editor.'
      },
      host: {
        type: 'string',
        description: 'You can use request.host to check which domain a customer is visiting from.'
      },
      locale: {
        type: 'string',
        description: 'Returns the shop_locale of the current request.'
      },
      path: {
        type: 'string',
        description: 'Returns the path to the current page.'
      },
      page_type: {
        type: 'string',
        description: 'Returns the type of the current page.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/request'
    }
  },
  robots: {
    type: 'object',
    description: 'The request object returns information about the URL used to access your store and the page being accessed.',
    properties: {
      default_groups: {
        type: 'array',
        items: 'group',
        description: 'Returns a list of group objects for each group of rules.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/robots'
    }
  },
  routes: {
    type: 'object',
    description: 'You can use the routes object to generate dynamic URLs to your storefront.',
    properties: {
      root_url: {
        type: 'string',
        description: 'Returns the base URL of the shop.'
      },
      account_url: {
        type: 'string',
        description: 'Returns the URL for the account page.'
      },
      account_login_url: {
        type: 'string',
        description: 'Returns the URL for the account login page.'
      },
      account_logout_url: {
        type: 'string',
        description: 'Returns the URL to log the customer out of their account.'
      },
      account_register_url: {
        type: 'string',
        description: 'Returns the URL for the account registration page.'
      },
      account_addresses_url: {
        type: 'string',
        description: 'Returns the URL for the page where the customer can manage the addresses associated with their account.'
      },
      collections_url: {
        type: 'string',
        description: 'Returns the URL for the collections page.'
      },
      all_products_collection_url: {
        type: 'string',
        description: 'Returns the URL for the collection that contains all of the products in the shop.'
      },
      search_url: {
        type: 'string',
        description: 'Returns the search URL.'
      },
      cart_url: {
        type: 'string',
        description: 'Returns the cart URL.'
      },
      cart_add_url: {
        type: 'string',
        description: 'Returns the URL that accepts items to be added to a cart.'
      },
      cart_change_url: {
        type: 'string',
        description: 'Returns the URL that allows you to change the quantity of an item.'
      },
      cart_clear_url: {
        type: 'string',
        description: 'Returns the URL that allows you to clear the cart.'
      },
      cart_update_url: {
        type: 'string',
        description: 'Returns the URL that allows you to update the quantity of an item.'
      },
      product_recommendations_url: {
        type: 'string',
        description: 'Returns the URL that serves product recommendations.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/routes'
    }
  },
  rule: {
    type: 'object',
    description: 'The rule object returns an individual rule for the robots.txt file',
    properties: {
      directive: {
        type: 'string',
        description: 'Returns the rule directive, which can be either Allow to allow crawlers to access the specified URL, or Disallow to block them.'
      },
      value: {
        type: 'string',
        description: 'Returns the associated URL path for the rule.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/rule'
    }
  },
  script: {
    type: 'object',
    description: 'script objects contain information about the Shopify Scripts published in your store.',
    properties: {
      id: {
        type: 'number',
        description: 'Returns the script\'s ID.'
      },
      name: {
        type: 'string',
        description: 'Returns the script\'s name.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/script'
    }
  },
  scripts: {
    type: 'object',
    description: 'The active scripts, of each script type, on the store.\n\nThere can be only one active script of each type. Currently, the only type accessible in Liquid is `cart_calculate_line_items.`',
    properties: {
      id: {
        type: 'number',
        description: 'Returns the script\'s ID.'
      },
      name: {
        type: 'string',
        description: 'Returns the script\'s name.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/script'
    }
  },
  search: {
    type: 'object',
    description: 'The search object has the following attributes:',
    properties: {
      performed: {
        type: 'boolean',
        description: 'Returns true if an HTML form with the attribute action="/search" was submitted successfully.'
      },
      results: {
        type: 'array',
        description: 'Returns an array of matching search result items.'
      },
      results_count: {
        type: 'number',
        description: 'Returns the number of results found.'
      },
      terms: {
        type: 'string',
        description: 'Returns the string that was entered in the search input box.'
      },
      types: {
        type: 'array',
        description: 'Returns an array of strings representing the types the search was performed on. '
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/search'
    }
  },
  section: {
    description: "The section object lets you access a section's properties and setting values.",
    type: 'object',
    properties: {
      blocks: {
        description: "Returns an array of the section's blocks.",
        type: 'array'
      },
      id: {
        description: "For static sections, returns the section's file name without \".liquid\". For dynamic sections, returns a dynamically generated ID.",
        type: 'number'
      },
      settings: {
        description: "Returns an object of the section settings set in the theme editor. Retrieve setting values by referencing the setting's unique id.",
        type: 'object'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/section'
    }
  },
  selling_plan: {
    type: 'object',
    description: 'The selling_plan object captures the intent of a selling plan applied on a line item.',
    properties: {
      description: {
        type: 'string',
        description: 'Returns the selling plan\'s description.'
      },
      group_id: {
        type: 'number',
        description: 'The unique ID of the selling_plan_group that the selling plan belongs to.'
      },
      id: {
        type: 'number',
        description: 'The unique ID of the selling plan.'
      },
      name: {
        type: 'string',
        description: 'The selling plan\'s name.'
      },
      options: {
        type: 'array',
        description: 'An array of selling_plan_option objects that contain information about the selling plan\'s value for a particular selling_plan_group_option.'
      },
      price_adjustments: {
        type: 'array',
        description: 'An array of selling_plan_price_adjustment objects.'
      },
      recurring_deliveries: {
        type: 'number',
        description: 'Returns true when the selling plan includes multiple recurring deliveries'
      },
      selected: {
        type: 'boolean',
        description: 'Returns true if the selling plan\'s ID is identified by the selling_plan URL parameter.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/selling-plan'
    }
  },
  selling_plan_allocation: {
    type: 'object',
    description: 'Information about how a specific selling plan affects a line item.',
    properties: {
      checkout_charge_amount: {
        type: 'string',
        description: 'The amount that the customer will be charged at checkout in the currency\'s subunit. The value is output in the customer\'s local (presentment) currency.'
      },
      compare_at_price: {
        type: 'number',
        description: 'The compare at price of the selling plan allocation in the currency\'s subunit. The value of the compare at price is the line item\'s price without the selling plan applied. If the price and compare at price are equal, then nil is returned.\n\nThe value is output in the customer\'s local (presentment) currency.'
      },
      per_delivery_price: {
        type: 'number',
        description: 'The price for each delivery in the selling plan in the currency\'s subunit.\n\nIf a selling plan includes multiple deliveries, then the `per_delivery_price` is the price divided by the number of deliveries.\n\nThe value is output in the customer\'s local (presentment) currency.'
      },
      price: {
        type: 'number',
        description: 'The price of the selling plan allocation in the currency\'s subunit.\n\nThe value is output in the customer\'s local (presentment) currency.'
      },
      price_adjustments: {
        type: 'array',
        items: 'selling_plan_price_adjustment',
        description: 'The selling plan allocation price adjustments.\n\nThe maximum length of the array is two. If the associated selling plan doesn\'t create any price adjustments, then the array is empty.\n\nEach `selling_plan_allocation_price_adjustment` maps to a `selling_plan_price_adjustment` in the selling_plan.`price_adjustments` array. The selling_plan.price_adjustments array contains the intent of the selling plan, and the `selling_plan_allocation.price_adjustments` array contains the resulting money amounts.'
      },
      remaining_balance_charge_amount: {
        type: 'number',
        description: 'The remaining amount for the customer to pay, in the currency\'s subunit.\n\nThe value is output in the customer\'s local (presentment) currency.'
      },
      selling_plan: {
        type: 'object',
        items: 'selling_plan',
        description: 'The selling plan that created the allocation.'
      },
      selling_plan_group_id: {
        type: 'string',
        description: 'The ID of the `selling_plan_group` that the selling plan of the allocation belongs to.'
      },
      unit_price: {
        type: 'number',
        description: 'The unit price of the variant associated with the selling plan, in the currency\'s subunit. If the variant doesn\'t have a unit price, then `nil` is returned.\n\nThe value is output in the customer\'s local (presentment) currency.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_allocation'
    }
  },
  selling_plan_allocation_price_adjustment: {
    type: 'object',
    description: 'The resulting price from the intent of the associated selling_plan_price_adjustment.\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).',
    properties: {
      position: {
        type: 'number',
        description: 'The 1-based index of the price adjustment in the `selling_plan_allocation.price_adjustments` array.'
      },
      price: {
        type: 'number',
        description: 'The price that will be charged for the price adjustment\'s lifetime, in the currency\'s subunit.\n\nThe value is output in the customer\'s local (presentment) currency.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_allocation_price_adjustment'
    }
  },
  selling_plan_checkout_charge: {
    type: 'object',
    description: 'Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects the amount that a customer needs to pay for a line item at checkout.\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).',
    properties: {
      value: {
        type: 'number',
        description: 'The value of the checkout charge. How this value is interpreted depends on the value type of the checkout charge. The following outlines what the value represents for each value type:\n\n`percentage`\n\nThe percent amount of the original price that the customer needs to pay.\n\nFor example, if the value is `50`, then the customer needs to pay 50% of the original price.\n\n`price`\n\nThe amount that the customer needs to pay in the currency\'s subunit.'
      },
      value_type: {
        type: 'string',
        description: 'The value type of the checkout charge.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_checkout_charge'
    }
  },
  selling_plan_group: {
    type: 'object',
    description: 'Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects the amount that a customer needs to pay for a line item at checkout.\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).',
    properties: {
      app_id: {
        type: 'number',
        description: 'An optional string provided by an app to identify selling plan groups created by that app. If the app doesn\'t provide a value, then `nil` is returned.'
      },
      id: {
        type: 'number',
        description: 'The ID of the selling plan group.'
      },
      name: {
        type: 'string',
        description: 'The name of the selling plan group.'
      },
      options: {
        type: 'array',
        items: 'selling_plan_group_option',
        description: 'The selling plan group options.'
      },
      selling_plan_selected: {
        type: 'boolean',
        description: 'Returns `true` if the currently selected selling plan is part of the selling plan group. Returns `false` if not.\n\n**Note:** The selected selling plan is determined by the `selling_plan` URL parameter.'
      },
      selling_plans: {
        type: 'array',
        items: 'selling_plan',
        description: 'The selling plans in the group.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_group'
    }
  },
  selling_plan_group_option: {
    type: 'object',
    description: 'Information about a specific option in a [selling plan group](https://shopify.dev/api/liquid/objects#selling_plan_group).',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the option.'
      },
      position: {
        type: 'number',
        description: 'The 1-based index of the option in the [`selling_plan_group.options`](https://shopify.dev/api/liquid/objects#selling_plan_group-options) array.'
      },
      selected_value: {
        type: 'string',
        description: 'The option value of the currently selected selling plan. If no selling plan is currently selected, then `nil` is returned.\n\n**Note** The selected selling plan is determined by the `selling_plan` URL parameter.'
      },
      values: {
        type: 'array',
        items: 'string',
        description: 'The values of the option.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_group_option'
    }
  },
  selling_plan_option: {
    type: 'object',
    description: 'Information about a selling plan\'s value for a specific [selling_plan_group_option](https://shopify.dev/api/liquid/objects#selling_plan_group_option).\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the associated `selling_plan_group_option`.'
      },
      position: {
        type: 'number',
        description: 'The 1-based index of the selling plan option in the associated [`selling_plan_group.options`](https://shopify.dev/api/liquid/objects#selling_plan_group-options) array.'
      },
      value: {
        type: 'string',
        description: 'The value of the selling plan option.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_option'
    }
  },
  selling_plan_price_adjustment: {
    type: 'object',
    description: 'Information about how a selling plan changes the price of a variant for a given period of time.\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).',
    properties: {
      order_count: {
        type: 'string',
        description: 'The number of orders that the price adjustment applies to.'
      },
      position: {
        type: 'number',
        description: 'The 1-based index of the price adjustment in the [`selling_plan.price_adjustments`](https://shopify.dev/api/liquid/objects#selling_plan-price_adjustments) array.'
      },
      value: {
        type: 'string',
        description: 'The value of the price adjustment as a decimal. How this value is interpreted depends on the [value type](https://shopify.dev/api/liquid/objects#selling_plan_price_adjustment-value_type) of the price adjustment.'
      },
      value_type: {
        type: 'string',
        description: 'The type of price adjustment.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#selling_plan_price_adjustment'
    }
  },
  settings: {
    type: 'object',
    description: 'Allows you to access all of the theme\'s settings from the [settings_schema.json](https://shopify.dev/themes/architecture/config/settings-schema-json) file.'
  },
  shipping_method: {
    type: 'object',
    description: 'The shipping_method object has the following attributes:',
    properties: {
      handle: {
        type: 'string',
        description: 'Returns the handle of the shipping method.'
      },
      original_price: {
        type: 'number',
        description: 'Returns the original price of the shipping method before discounts were applied.'
      },
      price: {
        type: 'number',
        description: 'Returns the price of the shipping method.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of the shipping method.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/shipping_method'
    }
  },
  shop: {
    type: 'object',
    description: 'The shop object',
    properties: {
      address: {
        type: 'object',
        description: 'You can add attributes to shop.address to return information about a shop\'s address.'
      },
      collections_count: {
        type: 'number',
        description: 'Returns the number of collections in a shop.'
      },
      currency: {
        type: 'string',
        description: 'Returns the store currency (in ISO 4217 format.)'
      },
      customer_accounts_enabled: {
        type: 'boolean',
        description: 'Returns true when a customer account is required to complete a checkout.'
      },
      customer_accounts_optional: {
        type: 'boolean',
        description: 'Returns true when a customer account is optional to complete a checkout. Otherwise, returns false.'
      },
      description: {
        type: 'string',
        description: 'Returns the description of the store.'
      },
      domain: {
        type: 'string',
        description: 'Returns the primary domain of the shop.'
      },
      email: {
        type: 'string',
        description: 'Returns the shop\'s email address.'
      },
      enabled_currencies: {
        type: 'object',
        description: 'Returns the list of currency objects that the store accepts.'
      },
      enabled_payment_types: {
        type: 'array',
        description: 'Returns an array of the shop\'s accepted credit cards, cryptocurrencies, and other payment types.'
      },
      id: {
        type: 'number',
        description: 'Returns the shop\'s ID.'
      },
      metafields: {
        type: 'array',
        description: 'Returns the shop\'s metafields.'
      },
      money_format: {
        type: 'string',
        description: 'Returns a string that is used by Shopify to format money without showing the currency.'
      },
      money_with_currency_format: {
        type: 'string',
        description: 'Returns a string that is used by Shopify to format money while also displaying the currency.'
      },
      name: {
        type: 'string',
        description: 'Returns the shop\'s name.'
      },
      password_message: {
        type: 'string',
        description: 'Returns the shop\'s password page message.'
      },
      permanent_domain: {
        type: 'string',
        description: 'Returns the .myshopify.com URL of a shop.'
      },
      phone: {
        type: 'string',
        description: 'Returns the shop\'s phone number.'
      },
      policies: {
        type: 'array',
        description: 'Returns an array of your shop\'s policy objects.',
        items: 'policy'
      },
      privacy_policy: {
        type: 'object',
        description: 'Returns a policy object for your store\'s privacy policy.'
      },
      published_locales: {
        type: 'array',
        description: 'Returns an array of shop_locale objects.',
        items: 'shop_locale'
      },
      refund_policy: {
        type: 'object',
        description: 'Returns a policy object for your store\'s refund policy.'
      },
      shipping_policy: {
        type: 'object',
        description: 'Returns a policy object for your store\'s shipping policy.'
      },
      subscription_policy: {
        type: 'object',
        description: 'Returns a policy object for your store\'s subscription policy.'
      },
      terms_of_service: {
        type: 'object',
        description: 'Returns a policy object for your store\'s terms of service.'
      },
      products_count: {
        type: 'object',
        description: 'Returns the number of products in a shop.'
      },
      secure_url: {
        type: 'string',
        description: 'Returns the full URL of a shop prepended by the https protocol.'
      },
      types: {
        type: 'array',
        description: 'Returns an array of all unique product types in a shop.',
        items: 'product_type'
      },
      url: {
        type: 'string',
        description: 'Returns the full URL of a shop.'
      },
      vendors: {
        type: 'array',
        description: 'Returns an array of all unique vendors in a shop.',
        items: 'product_vendor'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/shop'
    }
  },
  shop_locale: {
    type: 'object',
    description: 'A shop_local is an element of the shop.published_locales array',
    properties: {
      endonym_name: {
        type: 'string',
        description: 'Returns the locale endonym name.'
      },
      iso_code: {
        type: 'string',
        description: 'Returns the locale code.'
      },
      name: {
        type: 'string',
        description: 'Returns the locale name.'
      },
      primary: {
        type: 'boolean',
        description: 'Returns true when the locale is the shop\'s primary locale. '
      },
      root_url: {
        type: 'string',
        description: 'Returns the root relative URL of the locale.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/shop-locale'
    }
  },
  sitemap: {
    type: 'object',
    description: 'The sitemap object returns the sitemap for a specific group in the robots.txt file.',
    properties: {
      directive: {
        type: 'object',
        description: 'Returns Sitemap.'
      },
      value: {
        type: 'string',
        description: 'Returns the URL that the sitemap is hosted at.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/sitemap'
    }
  },
  sort_option: {
    type: 'object',
    description: 'A sort option for a collection or search results page.',
    properties: {
      name: {
        type: 'string',
        description: 'The customer-facing name of the sort option. The name can be edited by merchants in the [language editor](https://help.shopify.com/manual/online-store/themes/customizing-themes/language/change-wording).'
      },
      value: {
        type: 'string',
        description: 'The value of the sort option. This value is used when assigning the [`collection.sort_by`](https://shopify.dev/api/liquid/objects#collection-sort_by) and [`search.sort_by`](https://shopify.dev/api/liquid/objects#search-sort_by) parameters.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#sort_option'
    }
  },
  store_availability: {
    type: 'object',
    description: 'The store_availability object is used to show what variants are stocked at physical store locations, regardless of the current stock level.',
    properties: {
      available: {
        type: 'boolean',
        description: 'Returns true if the variant has stock.'
      },
      location: {
        type: 'object',
        description: 'Returns the location object that the variant is stocked at.'
      },
      pick_up_enabled: {
        type: 'boolean',
        description: 'Returns true if the variant is stocked at a location that has pickup enabled.'
      },
      pick_up_time: {
        type: 'string',
        description: 'Returns the amount of time it takes for pickup to be ready (Example: Usually ready in 24 hours).'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/storeavailability'
    }
  },
  tablerowloop: {
    type: 'object',
    scope: [ 'tablerow' ],
    description: 'Information about a parent [tablerow](https://shopify.dev/api/liquid/tags#tablerow) loop.',
    properties: {
      col: {
        type: 'number',
        description: 'The 1-based index of the current column.'
      },
      col0: {
        type: 'number',
        description: 'The 0-based index of the current column.'
      },
      col_first: {
        type: 'boolean',
        description: 'Returns `true` if the current column is the first in the row. Returns `false` if not.'
      },
      col_last: {
        type: 'boolean',
        description: 'Returns `true` if the current column is the last in the row. Returns `false` if not.'
      },
      first: {
        type: 'boolean',
        description: 'Returns `true` if the current iteration is the first. Returns `false` if not.'
      },
      index: {
        type: 'number',
        description: 'The 1-based index of the current iteration.'
      },
      index0: {
        type: 'number',
        description: 'The 0-based index of the current iteration.'
      },
      last: {
        type: 'boolean',
        description: 'Returns `true` if the current iteration is the last. Returns `false` if not.'
      },
      length: {
        type: 'number',
        description: 'The total number of iterations in the loop.'
      },
      rindex: {
        type: 'number',
        description: 'The 1-based index of the current iteration, in reverse order.'
      },
      rindex0: {
        type: 'number',
        description: 'The 0-based index of the current iteration, in reverse order.'
      },
      row: {
        type: 'number',
        description: 'The 1-based index of current row.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags#tablerow'
    }
  },
  tax_line: {
    type: 'object',
    description: 'The tax_line object has the following',
    properties: {
      price: {
        type: 'number',
        description: 'Returns the amount of the tax.'
      },
      rate: {
        type: 'number',
        description: 'Returns the rate of the tax in decimal notation.'
      },
      rate_percentage: {
        type: 'string',
        description: 'Returns the rate of the tax in percentage format.'
      },
      title: {
        type: 'string',
        description: 'Returns the title of the tax.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/tax_line'
    }
  },
  template: {
    type: 'object',
    description: 'Referencing just template returns the name of the template used to render the current page, with the .liquid extension omitted.',
    properties: {
      directory: {
        type: 'string',
        description: 'Returns the name of the template\'s parent directory'
      },
      name: {
        type: 'string',
        description: 'Returns the template\'s name without the template\'s custom suffix, if it exists.'
      },
      suffix: {
        type: 'string',
        description: 'Returns the name of the custom template without the template.name prefix or the .liquid extension. '
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/template'
    }
  },
  theme: {
    type: 'object',
    deprecated: true,
    description: 'The theme object contains information about a store\'s published theme.',
    properties: {
      id: {
        type: 'string',
        description: 'Returns the theme\'s ID.'
      },
      name: {
        type: 'string',
        description: 'Returns the name of the theme.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/theme'
    }
  },
  transaction: {
    type: 'object',
    description: '',
    properties: {
      amount: {
        type: 'string',
        description: 'Returns the amount of the transaction.'
      },
      created_at: {
        type: 'number',
        description: 'Returns the timestamp of when the transaction was created.'
      },
      gateway: {
        type: 'string',
        description: 'Returns the name of the payment provider used for the transaction.'
      },
      id: {
        type: 'number',
        description: 'Returns a unique numeric identifier for the transaction.'
      },
      kind: {
        type: 'string',
        description: 'Returns the type of transaction.'
      },
      name: {
        type: 'string',
        description: 'Returns the name of the transaction.'
      },
      payment_details: {
        type: 'object',
        description: 'The payment_details object contains additional properties related to the payment method used in the transaction.'
      },
      receipt: {
        type: 'string',
        description: 'Returns text with information from the payment provider about the payment receipt. This includes whether the payment was a test case and an authorization code if one was included in the transaction.'
      },
      status: {
        type: 'string',
        description: 'Returns the status of the transaction.'
      },
      status_label: {
        type: 'string',
        description: 'Returns the translated output of a transaction\'s status.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/transaction'
    }
  },
  transaction_payment_details: {
    type: 'object',
    description: 'Information about the payment methods used for a transaction.',
    properties: {
      credit_card_company: {
        type: 'string',
        description: 'The name of the company that issued the credit card used for the transaction.'
      },
      credit_card_number: {
        type: 'string',
        description: 'The credit card number used for the transaction.'
      }

    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#transaction_payment_details'
    }
  },
  unit_price_measurement: {
    type: 'object',
    description: 'Information about how units of a product variant are measured. It\'s used to calculate [unit prices](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product).\n\n**Note** Unit prices are available only to stores located in Germany and France.',
    properties: {
      measured_type: {
        type: 'string',
        description: 'The type of unit measurement.\n\n**Possible Values**\n\n- `volume`\n- `weight`\n - `dimension`'
      },
      quantity_unit: {
        type: 'number',
        description: 'The unit of measurement used to measure the [`quantity_value`](https://shopify.dev/api/liquid/objects#unit_price_measurement-quantity_value).'
      },
      quantity_value: {
        type: 'number',
        description: 'The quantity of the unit.'
      },
      reference_unit: {
        type: 'string',
        description: 'The unit of measurement used to measure the [`reference_value`](https://shopify.dev/api/liquid/objects#unit_price_measurement-reference_value).'
      },
      reference_value: {
        type: 'string',
        description: 'The quantity of the unit for the base unit price.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#unit_price_measurement'
    }
  },
  user_agent: {
    type: 'object',
    description: 'The user_agent object returns the user-agent, which is the name of the crawler, for a specific group in the robots.txt file.',
    properties: {
      directive: {
        type: 'string',
        description: 'Returns User-agent.'
      },
      value: {
        type: 'string',
        description: 'Returns the user-agent name.'
      }
    }
  },
  model: {
    type: 'object',
    description: 'The model object contains information about a 3D model uploaded from the product details page in the Shopify admin.',
    properties: {
      alt: {
        type: 'string',
        description: 'Returns the alt tag of the model set on the product details page of the Shopify admin.'
      },
      id: {
        type: 'string',
        description: 'Returns the media_id of the model.'
      },
      media_type: {
        type: 'object',
        description: 'Returns the type of the object (model).'
      },
      position: {
        type: 'number',
        description: "Returns the position of the model in the product object's media array"
      },
      preview_image: {
        type: 'string',
        description: 'Returns a preview image for the model.'
      },
      sources: {
        type: 'array',
        description: 'Returns an array of model source objects.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/model'
    }
  },
  model_source: {
    type: 'object',
    description: 'The model_source object contains information about the source files for a    model associated with a product.',
    properties: {
      mime_type: {
        type: 'string',
        description: 'Returns the MIME type of the model source file.'
      },
      format: {
        type: 'string',
        description: 'Returns the format of the model source file.'
      },
      url: {
        type: 'string',
        description: 'Returns the URL of the model source file.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/model-source'
    }
  },
  media: {
    type: 'object',
    description: 'The media object represents an object returned in a product.media array.',
    properties: {
      alt: {
        type: 'string',
        description: 'Returns the alt tag of the media'
      },
      id: {
        type: 'number',
        description: 'Returns the ID of the media.'
      },
      media_type: {
        type: 'object',
        description: 'Returns the media type of the object.'
      },
      position: {
        type: 'object',
        description: "Returns the position of the specific media object in the product object's media array."
      },
      preview_image: {
        type: 'string',
        description: 'Returns a preview image for the media.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/media'
    }
  },
  variant: {
    type: 'object',
    properties: {
      available: {
        type: 'boolean',
        description: 'Returns true if the variant is available for purchase, or false if it not. For a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no variant.inventory_management is also considered available.'
      },
      barcode: {
        type: 'string',
        description: "Returns the variant's barcode."
      },
      compare_at_price: {
        type: 'string',
        description: "Returns the variant's compare at price. Use a money filter to return the value in a monetary format."
      },
      featured_media: {
        type: 'string',
        description: 'Returns the first media item attached to the variant.'
      },
      id: {
        description: "Returns the variant's unique ID.",
        type: 'number'
      },
      image: {
        description: 'Returns the image object associated with the variant.',
        type: 'object',
        properties: {
          alt: {
            description: "Returns the image's alt text.",
            type: 'string'
          },
          src: {
            description: 'Returns the relative URL to the image.',
            type: 'string'
          }
        }
      },
      incoming: {
        type: 'boolean',
        description: 'Returns true if the variant has incoming inventory.'
      },
      inventory_management: {
        type: 'string',
        description: "Returns the variant's inventory tracking service."
      },
      inventory_policy: {
        type: 'string',
        description: 'Returns the string continue if the "Allow users to purchase this item, even if it is no longer in stock." checkbox is checked in the variant options in the Admin. Returns deny if it is unchecked.'
      },
      inventory_quantity: {
        type: 'number',
        description: "Returns the variant's inventory quantity."
      },
      next_incoming_date: {
        type: 'string',
        description: 'Returns the date when the next incoming inventory will arrive.'
      },
      options: {
        type: 'array',
        description: "Returns an array of the variant's product option values."
      },
      option1: {
        type: 'string',
        description: "Returns the value of the variant's first product option."
      },
      option2: {
        type: 'string',
        description: "Returns the value of the variant's second product option."
      },
      option3: {
        type: 'string',
        description: "Returns the value of the variant's third product option."
      },
      price: {
        type: 'string',
        description: "Returns the variant's price. Use a money filter to return the value in a monetary format."
      },
      requires_shipping: {
        type: 'boolean',
        description: 'Returns true if the variant is set to require shipping.'
      },
      requires_selling_plan: {
        type: 'boolean',
        description: 'Returns true if the variant is set to require a selling_plan when added to the cart.'
      },
      selected: {
        type: 'boolean',
        description: 'Returns true if the variant is currently selected. The selected variant is based on the URL parameter variant.'
      },
      selected_selling_plan_allocation: {
        type: 'number',
        description: 'Returns a selling_plan_allocation object based on the URL parameter selling_plan.\n\nFor example, given the URL parameters "?variant=12345&selling_plan=8765", the selling plan allocation for the variant 12345 with a selling plan id of 8765 is returned.\n\nIf there is no selected selling plan allocation, then this property returns nil.'
      },
      selling_plan_allocations: {
        type: 'array',
        description: 'An array of selling_plan_allocation objects available for the variant.'
      },
      sku: {
        type: 'string',
        description: "Returns the variant's SKU."
      },
      store_availabilities: {
        type: 'array',
        description: 'Returns an array of store_availability objects if variant.selected is true.'
      },
      taxable: {
        type: 'boolean',
        description: 'Returns true if taxes are charged for the variant, or false if they are not.'
      },
      title: {
        type: 'string',
        description: "Returns the concatenation of all the variant's product option values, joined by / characters."
      },
      unit_price: {
        type: 'string',
        description: 'Unit prices are available only to stores located in Germany or France.Returns the unit price of the product variant.\n\nThe price reflects any discounts that are applied to the line item.'
      },
      unit_price_measurement: {
        type: 'object',
        description: 'Returns a unit_price_measurement object for the product variant.'
      },
      url: {
        type: 'string',
        description: 'Returns a URL that is unique to only one product variant. The variant ID is used as the unique identifier.'
      },
      weight: {
        type: 'number',
        description: "Returns the variant's weight in grams. Use the weight_with_unit filter to convert it to your store's weight format or the weight unit configured on the variant."
      },
      weight_unit: {
        type: 'number',
        description: 'Returns the unit for the weight configured on the variant. Works well paired with the weight_in_unit attribute and the weight_with_unit filter.'
      },
      weight_in_unit: {
        type: 'number',
        description: 'Returns the weight of the product converted to the unit configured on the variant. Works well paired with the weight_unit attribute and the weight_with_unit filter.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/variant'
    }
  },
  video: {
    type: 'object',
    description: 'Information about a video uploaded as [product media](https://shopify.dev/api/liquid/objects#product-media) or a [`file_reference`](https://shopify.dev/apps/metafields/types) metafield',
    properties: {
      alt: {
        type: 'string',
        description: 'The alt text of the video.'
      },
      aspect_ratio: {
        type: 'number',
        description: 'The aspect ratio of the video as a decimal.'
      },
      duration: {
        type: 'number',
        description: 'The duration of the video in milliseconds.'
      },
      id: {
        type: 'number',
        description: 'The ID of the video.'
      },
      media_type: {
        type: 'string',
        description: 'The media type of the model. Always returns `video`.'
      },
      position: {
        type: 'string',
        description: 'The position of the video in the [product.media](https://shopify.dev/api/liquid/objects#product-media) array.'
      },
      preview_image: {
        type: 'object',
        items: 'image',
        description: 'A preview image for the video.'
      },
      sources: {
        type: 'array',
        items: 'video_source',
        description: 'The source files for the video.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#video'
    }
  },
  video_source: {
    type: 'object',
    description: 'Information about the source files for a video.',
    properties: {
      format: {
        type: 'string',
        description: 'The format of the video source file.\n\n**Note** When mp4 videos are uploaded, Shopify generates an m3u8 file as an additional video source. An m3u8 file enables video players to leverage HTTP live streaming (HLS), resulting in an optimized video experience based on the user\'s internet connection.\n\n**Possible Values**\n\n- `mov`\n- `mp4`\n- `m3u8`'
      },
      height: {
        type: 'number',
        description: 'The height of the video source file.'
      },
      mime_type: {
        type: 'string',
        description: 'The [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the video source file.'
      },
      url: {
        type: 'string',
        description: 'The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) of the video source file.'
      },
      width: {
        type: 'number',
        description: 'The width of the video source file.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects#video_source'
    }
  }
};
