import { Objects as IObjects, Types } from '../../types/objects';

const Objects: IObjects = {
  additional_checkout_buttons: {
    description: "Returns true if a merchant's store has any payment providers with offsite checkouts, such as PayPal Express Checkout. Use additional_checkout_buttons to check whether these gateways exist, and content_for_additional_checkout_buttons to show the additional buttons.",
    const: true,
    global: true,
    type: Types.Basic.boolean,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#additional-checkout-buttons'
    }
  },
  address: {
    description: "The address object contains information entered by a customer in Shopify's checkout pages.",
    type: Types.Basic.object,
    properties: {
      province_code: {
        description: 'Returns the abbreviated value of the Province/State field of the address.',
        type: Types.Basic.string
      },
      street: {
        description: 'Returns the combined values of the Address1 and Address2 fields of the address.',
        type: Types.Basic.string
      },
      url: {
        description: 'Returns the relative URL of the address.',
        type: Types.Basic.string
      },
      address1: {
        description: 'Returns the value of the Address1 field of the address.',
        type: Types.Basic.string
      },
      address2: {
        description: 'Returns the value of the Address2 field of the address.',
        type: Types.Basic.string
      },
      city: {
        description: 'Returns the value of the City field of the address.',
        type: Types.Basic.string
      },
      company: {
        description: 'Returns the value of the Company field of the address.',
        type: Types.Basic.string
      },
      country_code: {
        description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format.',
        type: Types.Basic.string
      },
      country: {
        description: 'Returns the value of the Country field of the address.',
        type: Types.Basic.string
      },
      first_name: {
        description: 'Returns the value of the First Name field of the address.',
        type: Types.Basic.string
      },
      last_name: {
        description: 'Returns the value of the Last Name field of the address.',
        type: Types.Basic.string
      },
      phone: {
        description: 'Returns the value of the Phone field of the address.',
        type: Types.Basic.string
      },
      zip: {
        description: 'Returns the value of the Postal/Zip field of the address.',
        type: Types.Basic.string
      },
      province: {
        description: 'Returns the value of the Province/State field of the address.',
        type: Types.Basic.string
      },
      name: {
        description: 'Returns the values of the First Name and Last Name fields of the address.',
        type: Types.Basic.string
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/address'
    }
  },
  all_country_option_tags: {
    type: Types.Basic.array,
    description: "The all_country_option_tags object creates an <option> tag for each country. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute.",
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#all_products'
    }
  },
  all_products: {
    type: Types.Basic.array,
    description: 'Returns a list of all the products in your store. You can use all_products to access products by their handles.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#all_products'
    }
  },
  article: {
    description: 'Returns a list of all the blog articles in a store.',
    type: Types.Basic.object,
    properties: {
      tags: {
        description: 'Returns all the tags for the article.',
        type: Types.Basic.array
      },
      user: {
        description: "Returns an object with information about the article's author.",
        type: Types.Basic.object,
        properties: {
          bio: {
            description: 'Returns the bio of the author of the article.',
            type: Types.Basic.string
          },
          email: {
            description: 'Returns the email of the author of the article.',
            type: Types.Basic.string
          },
          first_name: {
            description: 'Returns the first name of the author of the article.',
            type: Types.Basic.string
          },
          homepage: {
            description: 'Returns the home page of the article author.',
            type: Types.Basic.string
          },
          image: {
            description: 'Returns the image object of the author of the article.',
            type: Types.Basic.object,
            properties: {
              alt: {
                description: "Returns the article image's alt text.",
                type: Types.Basic.string
              },
              src: {
                description: 'Returns the relative URL to the article image.',
                type: Types.Basic.string
              }
            }
          },
          last_name: {
            description: 'Returns the last name of the author of the article.',
            type: Types.Basic.string
          },
          account_owner: {
            description: 'Returns true if the author of the article is the account owner of the store. Returns false if the author is not the account owner.',
            type: Types.Basic.string
          }
        }
      },
      excerpt_or_content: {
        description: 'Returns article.excerpt of the article if it exists. Returns article.content if an excerpt does not exist for the article.',
        type: Types.Basic.string
      },
      image: {
        description: "Returns the article's image object.",
        type: Types.Basic.object,
        properties: {
          alt: {
            description: "Returns the article image's alt text.",
            type: Types.Basic.string
          },
          src: {
            description: 'Returns the relative URL to the article image.',
            type: Types.Basic.string
          }
        }
      },
      content: {
        type: Types.Basic.string,
        description: 'Returns the content of the article.'
      },
      excerpt: {
        type: Types.Basic.string,
        description: 'Returns the excerpt of the article.'
      },
      author: {
        type: Types.Basic.string,
        description: "Returns the full name of the article's author."
      },
      handle: {
        type: Types.Basic.string,
        description: 'Returns the handle of the article.'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the id of the article.'
      },
      comments_count: {
        type: Types.Basic.number,
        description: 'Returns the number of published comments for the article.'
      },
      comments: {
        type: Types.Basic.array,
        description: 'Returns the published comments of the article. Returns an empty array if comments are disabled.'
      },
      url: {
        description: 'Returns the relative URL of the article.',
        type: Types.Basic.string
      },
      comment_post_url: {
        description: 'Returns the relative URL where POST requests are sent to when creating new comments.',
        type: Types.Basic.string
      },
      created_at: {
        description: 'Returns the timestamp of when the article was created. Use the date filter to format the timestamp.',
        type: Types.Basic.string
      },
      title: {
        description: 'Returns the title of the article.',
        type: Types.Basic.string
      },
      comments_enabled: {
        description: 'Returns true if comments are enabled. Returns false if comments are disabled.',
        type: Types.Basic.boolean
      },
      moderated: {
        description: 'Returns true if the blog that the article belongs to is set to moderate comments. Returns false if the blog is not moderated.',
        type: Types.Basic.boolean
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects#articles'
    }
  },
  block: {
    description: 'A block represents the content and settings of a single block in an array of section blocks. The block object can be accessed in a section file by looping through section.blocks.',
    type: Types.Basic.object,
    properties: {
      shopify_attributes: {
        type: Types.Basic.string,
        description: "Returns a string representing the block's attributes."
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns a unique ID dynamically generated by Shopify.'
      },
      settings: {
        type: Types.Basic.object,
        description: "Returns an object of the block settings set in the theme editor. Retrieve setting values by referencing the setting's unique id."
      },
      type: {
        type: Types.Basic.string,
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
    type: Types.Basic.object,
    properties: {
      tags: {
        description: 'Returns all tags in a blog. Similar to all_tags, but only returns tags of articles that are in the filtered view.',
        type: Types.Basic.array
      },
      all_tags: {
        description: 'Returns all tags of all articles of a blog. This includes tags of articles that are not in the current pagination view.',
        type: Types.Basic.array
      },
      articles: {
        description: 'Returns an array of all articles in a blog.',
        type: Types.Basic.array
      },
      handle: {
        description: 'Returns the handle of the blog.',
        type: Types.Basic.string
      },
      id: {
        description: 'Returns the id of the blog.',
        type: Types.Basic.number
      },
      next_article: {
        description: 'Returns the next (older) article. Returns nil if there is no next article.',
        type: Types.Basic.string
      },
      previous_article: {
        description: 'Returns the previous (newer) article. Returns nil if there is no next article.',
        type: Types.Basic.string
      },
      link: {
        description: 'Returns the relative URL of the blog.',
        type: Types.Basic.string
      },
      title: {
        description: 'Returns the title of the blog.',
        type: Types.Basic.string
      },
      articles_count: {
        description: 'Returns the total number of articles in a blog. This total does not include hidden articles.',
        type: Types.Basic.number
      },
      comments_enabled: {
        description: 'Returns true if comments are enabled, or false if they are disabled.',
        type: Types.Basic.boolean
      },
      moderated: {
        description: 'Returns true if comments are moderated, or false if they are not moderated.',
        type: Types.Basic.boolean
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#blogs'
    }
  },
  canonical_url: {
    type: Types.Basic.object,
    description: "Returns the canonical URL of the current page. A page's canonical URL is the page's default URL without any URL parameters. For products and variants, the canonical URL is the default product page with no collection or variant selected.",
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    }
  },
  cart: {
    type: Types.Basic.object,
    description: 'Cart object',
    properties: {
      attributes: {
        type: Types.Basic.string,
        description: 'Cart attributes allow the capturing of more information on the cart page.'
      },
      items: {
        type: Types.Basic.array,
        description: 'Returns all of the line items in the cart.'
      },
      cart_level_discount_applications: {
        type: Types.Basic.array,
        description: 'Returns an array of any cart-specific discount applications for the cart.'
      },
      discount_applications: {
        description: 'Returns an array of discount applications for the cart.',
        type: Types.Basic.array
      },
      currency: {
        type: Types.Basic.string,
        description: "Returns the currency of the cart. If your store uses multi-currency, then the cart.currency is the same as the customer's local (presentment) currency. Otherwise, the cart currency is the same as your store currency."
      },
      item_count: {
        description: 'Returns the number of items inside the cart.',
        type: Types.Basic.number
      },
      original_total_price: {
        description: 'Returns the subtotal of the cart before any discounts have been applied.',
        type: Types.Basic.number
      },
      items_subtotal_price: {
        description: "Returns the sum of the cart's line-item prices after any line-item discount. The subtotal doesn't include taxes (unless taxes are included in the prices), cart discounts, or shipping costs.",
        type: Types.Basic.number
      },
      total_discount: {
        description: 'Returns the total of all discounts (the amount saved) for the cart.',
        type: Types.Basic.number
      },
      total_price: {
        description: 'Returns the total price of all of the items in the cart after discounts have been applied.',
        type: Types.Basic.number
      },
      total_weight: {
        description: 'Returns the total weight of all of the items in the cart.',
        type: Types.Basic.number
      },
      note: {
        description: 'cart.note allows the capturing of more information on the cart page.',
        type: Types.Basic.string
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    }
  },
  collection: {
    type: Types.Basic.object,
    filters: false,
    description: 'Returns a collection',
    properties: {
      all_tags: {
        description: 'Returns a list of all product tags in a collection. collection.all_tags will return the full list of tags even when the collection view is filtered. collection.all_tags will return at most 1,000 tags',
        type: Types.Basic.array
      },
      all_types: {
        description: 'Returns a list of all product types in a collection',
        type: Types.Basic.array
      },
      all_vendors: {
        description: 'Returns a list of all product vendors in a collection.',
        type: Types.Basic.array
      },
      products: {
        description: 'Returns all of the products in a collection. You can show a maximum of 50 products per page. Use the paginate tag to choose how many products are shown per page',
        type: Types.Basic.array,
        object: 'product'
      },
      sort_options: {
        description: 'Returns an array of sorting options for the collection',
        type: Types.Basic.array
      },
      id: {
        description: 'Returns the ID number of the collection.',
        type: Types.Basic.number
      },
      link: {
        description: 'Returns the URL of the collection',
        type: Types.Basic.string
      },
      handle: {
        description: "Returns the collection's handle",
        type: Types.Basic.string
      },
      published_at: {
        description: "Returns the date and time when the collection was published. You can set this information on the collection's page in your Shopify admin by the Set publish date calendar icon. You can use a date filter to format the date",
        type: Types.Basic.string
      },
      description: {
        description: 'Returns the description of the collection',
        type: Types.Basic.string
      },
      image: {
        description: 'Returns the image of the collection',
        type: Types.Basic.string
      },
      template_suffix: {
        description: 'Returns the name of the custom collection template assigned to the `collection`, without the collection. prefix or the `.liquid` extension. Returns `nil` if a custom template is not assigned to the collection.',
        type: Types.Basic.string
      },
      next_product: {
        description: 'Returns the next product in the collection. Returns `nil` if there is no next product',
        type: Types.Basic.string
      },
      products_count: {
        description: 'Returns the number of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, collection.`products_count` will return the number of products that match the chosen tag.',
        type: Types.Basic.number
      },
      all_products_count: {
        description: 'Returns the number of products in a collection. collection.all_products_count will return the total number of products even when the collection view is filtered.',
        type: Types.Basic.number
      },
      previous_product: {
        description: 'Returns the previous product in the collection. Returns `nil` if there is no previous product.',
        type: Types.Basic.string
      },
      current_type: {
        description: 'Returns the product type on a `/collections/types?q=TYPE` collection page. For example, you may be on the automatic Shirts collection, which lists all products of type ‘shirts’ in the store: `myshop.shopify.com/collections/types?q=Shirts`',
        type: Types.Basic.string
      },
      sort_by: {
        description: 'Returns the sort order applied to the collection by the `sort_by` URL parameter. When there is no `sort_by` URL parameter, the value is null.',
        type: Types.Basic.string
      },
      default_sort_by: {
        description: 'Returns the sort order of the collection, which is set in the collection pages of the Admin',
        type: Types.Basic.string
      },
      tags: {
        description: 'Returns the tags of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, `collection.tags` will return the tags for the products that match the current filter',
        type: Types.Basic.array
      },
      title: {
        description: 'Returns the title of the collection',
        type: Types.Basic.string
      },
      current_vendor: {
        description: 'Returns the vendor name on a `/collections/vendors?q=VENDOR` collection page. For example, you may be on the automatic Shopify collection, which lists all products with vendor ‘shopify’ in the store: `myshop.shopify.com/collections/vendors?q=Shopify`',
        type: Types.Basic.string
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collection'
    }
  },
  collections: {
    type: Types.Basic.array,
    description: 'Returns a list of all of the collections in a store',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collections'
    }
  },
  comment: {
    type: Types.Basic.object,
    filters: false,
    description: 'Article Comment',
    properties: {
      link: {
        type: Types.Basic.string,
        description: 'Returns the URL of the article with `comment.id` appended to it. This is so the page will automatically scroll to the comment'
      },
      author: {
        description: 'Returns the author of the comment',
        type: Types.Basic.string
      },
      content: {
        description: 'Returns the content of the comment',
        type: Types.Basic.string
      },
      email: {
        type: Types.Basic.string,
        description: "Returns the e-mail address of the comment's author"
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the id (unique identifier) of the comment'
      },
      status: {
        type: Types.Basic.string,
        description: 'Returns the status of the comment'
      },
      created_at: {
        type: Types.Basic.string,
        description: 'Returns the timestamp of when the comment was submitted. Use the `date` filter to convert the timestamp into a more readable format'
      },
      updated_at: {
        type: Types.Basic.string,
        description: "Returns the timestamp of when the comment's status was last changed. For example, the timestamp of when a comment was approved by the article's author. Use the `date` filter to convert the timestamp into a more readable format"
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/comment'
    }
  },
  content_for_additional_checkout_buttons: {
    const: true,
    type: Types.Basic.data,
    description: 'Returns checkout buttons for any active payment providers with offsite checkouts. The "additional_checkout_buttons" and "content_for_additional_checkout_buttons" are used in many Shopify themes.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects#content_for_additional_checkout_buttons'
    }
  },
  content_for_header: {
    const: true,
    type: Types.Basic.data,
    description: 'The content_for_header object is required in theme.liquid. It must be placed inside the HTML <head> tag. It dynamically loads all scripts required by Shopify into the document head. These scripts include Shopify analytics, Google Analytics, and scripts required for Shopify apps.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-objects'
    }
  },
  content_for_index: {
    const: true,
    type: Types.Basic.data,
    description: 'The content_for_index object contains the content of dynamic sections to be rendered on the home page. This object must be included in templates/index.liquid.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-for-index'
    }
  },
  content_for_layout: {
    const: true,
    type: Types.Basic.data,
    description: 'The content_for_layout object is required in theme.liquid. It must be placed inside the HTML <body> tag. It dynamically loads content generated by other templates such as index.liquid or product.liquid.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects#content-for-layout'
    }
  },
  country_option_tags: {
    const: true,
    type: Types.Basic.data,
    description: "The country_option_tags object creates an <option> tag for each country that is included as a shipping zone on the Shipping page of the admin. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute",
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags'
    }
  },
  currency: {
    description: 'The currency object',
    filters: false,
    type: Types.Basic.object,
    trims: false,
    properties: {
      iso_code: {
        type: Types.Basic.string,
        description: 'Returns the ISO code of the currency (for example `USD` or `EUR`).'
      },
      symbol: {
        type: Types.Basic.string,
        description: "Returns the currency's symbol (for example, `$` or `€`)."
      },
      name: {
        type: Types.Basic.string,
        description: 'Returns the name of the currency (for example United States dollars or Euro).'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags'
    }
  },
  current_page: {
    type: Types.Basic.number,
    scope: [ 'paginate' ],
    description: 'current_page returns the number of the page you are on when browsing through paginated content. It can be used outside the paginate block',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#collections'
    }
  },
  current_tags: {
    type: Types.Basic.array,
    description: 'Product tags are used to filter a collection to only show products that contain a specific product tag. Similarly, article tags are used to filter a blog to only show products that contain a specific article tag. The current_tags variable is an array that contains all tags that are being used to filter a collection or blog.',
    filters: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/current-tags'
    }
  },
  customer: {
    type: Types.Basic.object,
    description: 'The customer object contains information about a customer who has a customer account',
    trims: false,
    properties: {
      accepts_marketing: {
        description: 'Returns `true` if the customer accepts marketing, returns `false` if the customer does not',
        type: Types.Basic.boolean
      },
      addresses: {
        description: 'Returns an array of all addresses associated with a customer',
        type: Types.Basic.array
      },
      orders: {
        description: 'Returns an array of all orders placed by the customer',
        type: Types.Basic.array
      },
      default_address: {
        description: 'Returns the default customer_address',
        type: Types.Basic.string
      },
      email: {
        description: 'Returns the email address of the customer',
        type: Types.Basic.string
      },
      first_name: {
        description: 'Returns the first name of the customer',
        type: Types.Basic.string
      },
      name: {
        description: 'Returns the full name of the customer',
        type: Types.Basic.string
      },
      id: {
        description: 'Returns the id of the customer',
        type: Types.Basic.number
      },
      last_name: {
        description: 'Returns the last name of the customer',
        type: Types.Basic.string
      },
      last_order: {
        description: 'Returns the last order placed by the customer, not including test orders',
        type: Types.Basic.string
      },
      tags: {
        description: 'Returns the list of tags associated with the customer',
        type: Types.Basic.array
      },
      addresses_count: {
        description: 'Returns the number of addresses associated with a customer',
        type: Types.Basic.number
      },
      phone: {
        description: 'Returns the phone number of the customer',
        type: Types.Basic.string
      },
      total_spent: {
        description: 'Returns the total amount spent on all orders',
        type: Types.Basic.string
      },
      orders_count: {
        description: 'Returns the total number of orders a customer has placed',
        type: Types.Basic.number
      },
      has_account: {
        description: 'Returns true if the email associated with an order is also tied to a customer account. Returns `false` if it is not. Helpful in email templates',
        type: Types.Basic.boolean
      },
      tax_exempt: {
        description: 'Returns whether or not the customer is exempt from taxes',
        type: Types.Basic.boolean
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer'
    }
  },
  customer_address: {
    description: 'The currency object',
    type: Types.Basic.object,
    trims: false,
    properties: {
      province_code: {
        type: Types.Basic.string,
        description: 'Returns the abbreviated value of the Province/State field of the address'
      },
      street: {
        type: Types.Basic.string,
        description: 'Returns the combined values of the Address1 and Address2 fields of the address'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the id of customer address'
      },
      address1: {
        type: Types.Basic.string,
        description: 'Returns the value of the Address1 field of the address'
      },
      address2: {
        type: Types.Basic.string,
        description: 'Returns the value of the Address2 field of the address'
      },
      city: {
        type: Types.Basic.string,
        description: 'Returns the value of the City field of the address'
      },
      company: {
        type: Types.Basic.string,
        description: 'Returns the value of the Company field of the address'
      },
      country_code: {
        type: Types.Basic.string,
        description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format'
      },
      country: {
        type: Types.Basic.string,
        description: 'Returns the value of the Country field of the address'
      },
      first_name: {
        type: Types.Basic.string,
        description: 'Returns the value of the First Name field of the address'
      },
      last_name: {
        type: Types.Basic.string,
        description: 'Returns the value of the Last Name field of the address'
      },
      phone: {
        type: Types.Basic.string,
        description: 'Returns the value of the Phone field of the address'
      },
      zip: {
        type: Types.Basic.string,
        description: 'Returns the value of the Postal/Zip field of the address'
      },
      province: {
        type: Types.Basic.string,
        description: 'Returns the value of the Province/State field of the address'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer-address'
    }
  },
  discount_allocation: {
    type: Types.Basic.object,
    trims: false,
    description: 'The `discount_allocation` object contains all of the information about how a particular discount affects a line item and how the price reduces. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the `discount_allocation` object in the `checkout.liquid` layout file.',
    properties: {
      discount_application: {
        type: Types.Basic.string,
        description: 'The discount application that allocates the amount on the line item'
      },
      amount: {
        type: Types.Basic.number,
        description: 'The discounted amount on a line item by a particular discount'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-allocation'
    }
  },
  discount_application: {
    type: Types.Basic.object,
    trims: false,
    description: 'The `discount_application` object captures the intent of a `discount applied` on an order. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the discount_allocation object in the checkout.liquid layout file.',
    properties: {
      target_selection: {
        type: Types.Basic.string,
        description: 'Describes how a discount selects line items in the cart to be discounted'
      },
      target_type: {
        type: Types.Basic.string,
        description: 'Describes the type of item that a discount applies to. `target_type` has the following possible values, line_item or shipping_line'
      },
      title: {
        type: Types.Basic.string,
        description: 'The customer-facing name of the discount. For example, `Welcome10` or `CBBWQQAKYBYY`'
      },
      total_allocated_amount: {
        type: Types.Basic.number,
        description: 'The total amount that the price of an order is reduced by the discount'
      },
      type: {
        type: Types.Basic.string,
        description: 'The type of the discount. type has the following possible values:\n\n- automatic\n- manual\n-discount_code\n-script'
      },
      value: {
        type: Types.Basic.number,
        description: 'The value of the discount.'
      },
      value_type: {
        type: Types.Basic.string,
        description: 'The value type of the discount. value_type has the following possible values:\n\n- fixed_amount\n- percentagel'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-application'
    }
  },
  external_video: {
    type: Types.Basic.object,
    description: "The external_video object can be accessed from the product object's media attribute. It contains information about a YouTube video associated with a product",
    properties: {
      external_id: {
        type: Types.Basic.number,
        description: 'Returns the ID of the YouTube video'
      },
      alt: {
        type: Types.Basic.string,
        description: 'Returns the alt tag of the video set on the product details page of the Shopify admin'
      },
      aspect_ratio: {
        type: Types.Basic.string,
        description: 'Returns the aspect ratio of the YouTube video'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the media_id of the external video.'
      },
      video_host: {
        type: Types.Basic.string,
        description: 'Returns the name of the video host (youtube).'
      },
      position: {
        type: Types.Basic.string,
        description: "Returns the position of the external_video in the product object's media array."
      },
      media_type: {
        type: Types.Basic.string,
        description: "Returns the type of the object (external_video). This can be used to filter the product object's media array."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/external-video'
    }
  },
  font: {
    type: Types.Basic.object,
    description: 'The font object is used to access the font_picker settings. It can be accessed via the global settings object',
    properties: {
      variants: {
        description: "Returns all of the variants within the font's family. Each of the variants is also a font object",
        type: Types.Basic.array
      },
      family: {
        description: "Returns the font's name",
        type: Types.Basic.string
      },
      baseline_ratio: {
        type: Types.Basic.string,
        description: 'Returns the position of the baseline within the em box (measured from the bottom). You can learn more about baseline ratios in the Plumber SASS documentation'
      },
      style: {
        description: 'Returns the selected font style',
        type: Types.Basic.string
      },
      weight: {
        description: 'Returns the selected font weight',
        type: Types.Basic.string
      },
      fallback_families: {
        description: 'Returns the suggested fallback font families',
        type: Types.Basic.string
      }
    }
  },
  form: {
    type: Types.Basic.object,
    description: 'The form object is used within the form tag. It contains attributes of its parent form.',
    filters: false,
    scope: [ 'form' ],
    properties: {
      address1: {
        type: Types.Basic.string,
        description: 'Returns the first address line associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      address2: {
        type: Types.Basic.string,
        description: 'Returns the second address line associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      author: {
        type: Types.Basic.string,
        description: 'Returns the name of the author of the blog article comment. Exclusive to form tags with the "article" parameter.'
      },
      body: {
        type: Types.Basic.string,
        description: 'Returns the content of the blog article comment. Exclusive to form tags with the "article" parameter.'
      },
      city: {
        type: Types.Basic.string,
        description: 'Returns the city associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      company: {
        type: Types.Basic.string,
        description: 'Returns the company name associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      country: {
        type: Types.Basic.string,
        description: 'Returns the country associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      email: {
        type: Types.Basic.string,
        description: "Returns the email of the blog article comment's author. Exclusive to form tags with the \"article\" parameter."
      },
      errors: {
        type: Types.Basic.array,
        description: 'Returns an array of strings if the form was not submitted successfully. The strings returned depend on which fields of the form were left empty or contained errors. Possible values are:\n\n- author\n- body\n- email\n- form\n'
      },
      first_name: {
        type: Types.Basic.string,
        description: 'Returns the first name associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the id (unique identifier) of the form.'
      },
      last_name: {
        type: Types.Basic.string,
        description: 'Returns the last name associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      password_needed: {
        type: Types.Basic.boolean,
        description: 'Used only for form tags with the "customer_login" parameter. The form.password_needed attribute always returns true.'
      },
      phone: {
        type: Types.Basic.string,
        description: 'Returns the telephone number associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
      },
      'posted_successfully?': {
        type: Types.Basic.boolean,
        description: 'Returns true if the form was submitted successfully, or false if the form contained errors. All forms but the address form set that property. The address form is always submitted successfully.'
      },
      province: {
        type: Types.Basic.string,
        description: 'Returns the province or state associated with the address. Exclusive to form tags with the "address" parameter.'
      },
      set_as_default_checkbox: {
        type: Types.Basic.data,
        description: "Renders an HTML checkbox that can submit the current form as the customer's default address. Exclusive to form tags with the \"address\" parameter"
      },
      zip: {
        type: Types.Basic.string,
        description: 'Returns the zip code or postal code associated with the address. Exclusive to form tags with the "address" parameter.'
      }
    }
  },
  forloop: {
    scope: [ 'for' ],
    type: Types.Basic.object,
    description: 'The forloop object contains attributes of its parent for loop.',
    filters: false,
    properties: {
      rindex: {
        description: 'Returns `forloop.index` in reverse order.',
        type: Types.Basic.number
      },
      rindex0: {
        description: 'Returns `forloop.index0` in reverse order.',
        type: Types.Basic.number
      },
      index0: {
        description: 'Returns the current index of the for loop, starting at 0.',
        type: Types.Basic.number
      },
      index: {
        description: 'Returns the current index of the for loop, starting at 1.',
        type: Types.Basic.number
      },
      length: {
        description: 'Returns the number of iterations of the loop.',
        type: Types.Basic.number
      },
      first: {
        description: "Returns true if it's the first iteration of the for loop. Returns false if it is not the first iteration.",
        type: Types.Basic.boolean
      },
      last: {
        description: "Returns true if it's the last iteration of the for loop. Returns false if it is not the last iteration.",
        type: Types.Basic.boolean
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/for-loops'
    }
  },
  fulfillment: {
    type: Types.Basic.object,
    description: 'The fulfillment object',
    properties: {
      fulfillment_line_items: {
        type: Types.Basic.array,
        description: 'Returns an array of all line items and their quantity included in the fulfillment. Any line items that have already been fulfilled, or are yet to be fulfilled, will not be included in the array.'
      },
      item_count: {
        type: Types.Basic.array,
        description: 'Returns the total number of items included in the fulfillment.'
      },
      tracking_company: {
        type: Types.Basic.string,
        description: 'Returns the name of the fulfillment service.'
      },
      tracking_number: {
        type: Types.Basic.string,
        description: "Returns a fulfillment's tracking number, if it exists."
      },
      tracking_url: {
        type: Types.Basic.string,
        description: 'Returns the URL for a tracking number.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/fulfillment'
    }
  },
  handle: {
    type: Types.Basic.string,
    global: true,
    description: 'Returns the handle of the page that is being viewed',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#handle'
    }
  },
  image: {
    type: Types.Basic.object,
    description: 'The image object returns information about an image.',
    properties: {
      variants: {
        description: 'Returns an array of attributes for the variant that the image is associated with.',
        type: Types.Basic.array
      },
      alt: {
        description: 'Returns the alt tag of the image, set in the Products page of the Admin.',
        type: Types.Basic.string
      },
      aspect_ratio: {
        type: Types.Basic.string,
        description: 'Returns the aspect ratio (width / height) of the image.'
      },
      height: {
        type: Types.Basic.number,
        description: 'Returns the height of the image in pixels.'
      },
      product_id: {
        description: "Returns the id of the image's product.",
        type: Types.Basic.number
      },
      id: {
        description: 'Returns the id of the image.',
        type: Types.Basic.number
      },
      position: {
        type: Types.Basic.number,
        description: 'Returns the position of the image, starting at 1. This is the same as outputting forloop.index.'
      },
      src: {
        type: Types.Basic.string,
        description: 'Returns the relative path of the product image. This is the same as outputting "{{ image }}".'
      },
      width: {
        type: Types.Basic.number,
        description: 'Returns the width of the image in pixels.'
      },
      attached_to_variant: {
        type: Types.Basic.boolean,
        description: 'Returns true if the image has been associated with a variant. Returns false otherwise. This can be used in cases where you want to create a gallery of images that are not associated with variants.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#image'
    }
  },
  line_item: {
    type: Types.Basic.object,
    description: 'A line_item represents a single line in the shopping cart. There is one line item for each distinct product variant in the cart. The line_item object can be accessed in all Liquid templates via cart.items',
    properties: {
      discount_allocations: {
        type: Types.Basic.array,
        description: 'Returns a list of all discount allocations containing the discounted amount and the reference to the parent discount application. line_item.discount_allocations is available on line items in carts, checkouts, orders, and draft orders.'
      },
      final_line_price: {
        type: Types.Basic.number,
        description: 'Returns the combined price of all the items in the line item. This is equal to line_item.final_price times line_item.quantity.'
      },
      final_price: {
        type: Types.Basic.number,
        description: 'Returns the price of the line item including all line level discount amounts.'
      },
      fulfillment: {
        type: Types.Basic.string,
        description: 'Returns the fulfillment of the line item.'
      },
      fulfillment_service: {
        type: Types.Basic.string,
        description: "Returns the fulfillment service associated with the line item's variant. Line items that have no fulfillment service will return manual."
      },
      gift_card: {
        type: Types.Basic.boolean,
        description: "Returns true if the line item's product is a gift card, or false if it is not."
      },
      grams: {
        type: Types.Basic.number,
        description: 'Returns the weight of the line item. Use the weight_with_unit filter to format the weight.'
      },
      image: {
        type: Types.Basic.string,
        description: "Returns the line item's image."
      },
      key: {
        type: Types.Basic.number,
        description: "Returns the line item key, a unique identifier for the line item. The line item key is constructed from the line item's variant ID plus a hash of the line item's properties, even if the item has no additional properties."
      },
      line_level_discount_allocations: {
        type: Types.Basic.array,
        description: 'Returns a list of line-specific discount allocations containing the discounted amount and the reference to the parent discount application.'
      },
      line_level_total_discount: {
        type: Types.Basic.array,
        description: "Returns the total amount of all discounts applied to the line item specifically. This doesn't include discounts that are added to the cart."
      },
      message: {
        type: Types.Basic.string,
        description: 'Returns the discount message if a script has applied a discount to the line item.'
      },
      options_with_values: {
        type: Types.Basic.array,
        description: "Returns an array of selected values from the item's product options."
      },
      original_line_price: {
        type: Types.Basic.number,
        description: 'Returns the combined price of the quantity of items included in the line, before discounts were applied.'
      },
      original_price: {
        type: Types.Basic.number,
        description: 'Returns the original price of the line item before discounts were applied.'
      },
      product: {
        type: Types.Basic.object,
        description: 'Returns the product of the line item.'
      },
      product_id: {
        type: Types.Basic.number,
        description: "Returns the ID of the line item's product."
      },
      properties: {
        type: Types.Basic.array,
        description: 'line_item.properties returns an array of custom information for an item that has been added to the cart.'
      },
      quantity: {
        type: Types.Basic.number,
        description: 'Returns the quantity of the line item.'
      },
      requires_shipping: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant of the line item requires shipping, or false if it does not.'
      },
      selling_plan_allocation: {
        type: Types.Basic.object,
        description: 'Returns a selling_plan_allocation object when the line item contains a selling plan.'
      },
      sku: {
        type: Types.Basic.number,
        description: "Returns the SKU (stock keeping unit) of the line item's variant."
      },
      successfully_fulfilled_quantity: {
        type: Types.Basic.number,
        description: 'Returns the successfully fulfilled quantity of the line item.'
      },
      taxable: {
        type: Types.Basic.boolean,
        description: "Returns true if taxes are charged on the line item's variant, or false if they are not."
      },
      title: {
        type: Types.Basic.string,
        description: "Returns the title of the line item. line_item.title combines both the line item's product.title and the line item's variant.title, separated by a hyphen."
      },
      unit_price: {
        type: Types.Basic.number,
        description: 'Returns the unit price of the line item. The price reflects any discounts that are applied to the line item.'
      },
      unit_price_measurement: {
        type: Types.Basic.object,
        description: 'Returns a unit_price_measurement object for the line item.'
      },
      url: {
        type: Types.Basic.string,
        description: "Returns the relative URL of the line item's variant. The relative URL does not include your store's root URL (mystore.myshopify.com)."
      },
      variant: {
        type: Types.Basic.object,
        description: 'Returns the variant of the line item.'
      },
      variant_id: {
        type: Types.Basic.number,
        description: "Returns the ID of the line item's variant."
      },
      vendor: {
        type: Types.Basic.object,
        description: "Returns the vendor of the line item's product."
      },
      id: {
        type: Types.Basic.number,
        description: "Returns the line item's ID."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/line_item'
    }
  },
  link: {
    type: Types.Basic.object,
    scope: [ 'linklist' ],
    description: 'The link object cannot be invoked on its own. It must be invoked inside a linklist.',
    properties: {
      active: {
        type: Types.Basic.boolean,
        description: 'Returns true if the link is active, or false if the link is inactive'
      },
      child_active: {
        type: Types.Basic.boolean,
        description: 'Similar to `link.active`, but returns true if a child link of the parent link is active, or false if no child links of the parent link are active.'
      },
      child_current: {
        type: Types.Basic.boolean,
        description: 'Returns `true` if a child link has a link object with link.current equal to `true`. Returns `false` if no child links have a link object with link.current equal to `true`.'
      },
      current: {
        type: Types.Basic.boolean,
        description: "Returns `true` if the page content associated with the `link` is considered a match to the current page. Returns `false` if the content isn't considered a match"
      },
      levels: {
        type: Types.Basic.number,
        description: 'Returns the number of nested levels that a link contains.'
      },
      links: {
        type: Types.Basic.array,
        description: 'Returns an array of the child links associated with the parent link.'
      },
      object: {
        type: Types.Basic.object,
        description: 'Returns the variable associated to the link. The possible types are: product, collection, page, blog.'
      },
      title: {
        type: Types.Basic.string,
        description: 'Returns the title of the link'
      },
      type: {
        type: Types.Basic.string,
        description: 'Returns the type of the link. The possible values are:\n\n- collection_link\n- product_link\n- page_link\n- blog_link\n- relative_link\n- http_link'
      },
      url: {
        type: Types.Basic.string,
        description: 'Returns the URL of the link.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/link'
    }
  },
  linklist: {
    type: Types.Basic.object,
    description: 'linklist objects appear as ‘menus’ in the Navigation page of the Shopify admin.',
    properties: {
      handle: {
        type: Types.Basic.string,
        description: 'Returns the handle of the linklist.'
      },
      levels: {
        type: Types.Basic.number,
        description: 'Returns the number of nested levels that a linklist contains.'
      },
      links: {
        type: Types.Basic.array,
        description: 'Returns an array of links in the linklist.'
      },
      title: {
        type: Types.Basic.string,
        description: 'Returns the title of the linklist'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects/linklist'
    }
  },
  images: {
    type: Types.Basic.object,
    description: 'Allows you to access any image in a store by its filename',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#images'
    }
  },
  linklists: {
    type: Types.Basic.array,
    description: 'Returns a list of all the menus (link lists) in your store. You can use linklists to access your link lists with their handles.',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#linklists'
    }
  },
  page: {
    type: Types.Basic.object,
    description: 'The page object has the following attributes',
    properties: {
      author: {
        type: Types.Basic.string,
        description: 'Returns the author of a page.'
      },
      content: {
        type: Types.Basic.string,
        description: 'Returns the content of a page.'
      },
      handle: {
        type: Types.Basic.string,
        description: 'Returns the handle of the page.'
      },
      id: {
        type: Types.Basic.string,
        description: 'Returns the id of the page.'
      },
      published_at: {
        type: Types.Basic.string,
        description: 'Returns the timestamp of when the page was created. Use the date filter to format the timestamp.'
      },
      template_suffix: {
        type: Types.Basic.string,
        description: 'Returns the name of the custom page template assigned to the page, without the page.'
      },
      title: {
        type: Types.Basic.string,
        description: 'Returns the title of a page.'
      },
      url: {
        type: Types.Basic.string,
        description: 'Returns the relative URL of the page.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/page'
    }
  },
  page_description: {
    type: Types.Basic.object,
    description: 'Returns the description of a page set in its respective section in the admin',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/page-description'
    }
  },
  product: {
    type: Types.Basic.object,
    description: 'Product object',
    properties: {
      collections: {
        type: Types.Basic.array,
        description: 'Returns an array of all of the collections that a product belongs to, except any collections that are not available on the sales channel being used.'
      },
      tags: {
        type: Types.Basic.array,
        description: "Returns an array of all of the product's tags. The tags are returned in alphabetical order."
      },
      images: {
        type: Types.Basic.array,
        description: "Returns an array of the product's images. Use the img_url filter to link to the product image on Shopify's content delivery network (CDN)."
      },
      options: {
        type: Types.Basic.array,
        description: "Returns an array of the product's option names."
      },
      options_with_values: {
        type: Types.Basic.array,
        description: "Returns an array of the product's options.",
        object: 'product_options'
      },
      variants: {
        type: Types.Basic.array,
        description: "Returns an array of the product's variants."
      },
      content: {
        type: Types.Basic.string,
        description: 'Returns the description of the product. Alias for product.description.'
      },
      description: {
        type: Types.Basic.string,
        description: 'Returns the description of the product.'
      },
      handle: {
        type: Types.Basic.string,
        description: 'Returns the handle of a product.'
      },
      compare_at_price_max: {
        type: Types.Basic.number,
        description: 'Returns the highest compare at price.'
      },
      price_max: {
        type: Types.Basic.number,
        description: 'Returns the highest price of the product.'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the id of the product.'
      },
      compare_at_price_min: {
        type: Types.Basic.number,
        description: 'Returns the lowest compare at price.'
      },
      price: {
        type: Types.Basic.number,
        description: "Returns the lowest price of all the product's variants. This attribute is the same as product.price_min."
      },
      price_min: {
        type: Types.Basic.number,
        description: 'Returns the lowest price of the product.'
      },
      template_suffix: {
        type: Types.Basic.string,
        description: 'Returns the name of the custom product template assigned to the product, without the product. prefix nor the .liquid extension. Returns nil if a custom template is not assigned to the product.'
      },
      featured_image: {
        type: Types.Basic.string,
        description: "Returns the relative URL of the product's featured image."
      },
      type: {
        type: Types.Basic.string,
        description: 'Returns the relative URL of the product.'
      },
      title: {
        type: Types.Basic.string,
        description: 'Returns the title of the product.'
      },
      selected_variant: {
        type: Types.Basic.object,
        description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` in the URL. Returns nil if there is not.'
      },
      selected_or_first_available_variant: {
        type: Types.Basic.object,
        description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` parameter in the URL. If there is no selected variant, the first available variant is returned. In order for a variant to be available, its `variant.inventory_quantity` must be greater than zero or `variant.inventory_policy` must be set to continue. A variant with no `inventory_management` is considered available.'
      },
      first_available_variant: {
        type: Types.Basic.object,
        description: 'Returns the variant object of the first product variant that is available for purchase. In order for a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no inventory_policy is considered available.'
      },
      vendor: {
        type: Types.Basic.string,
        description: 'Returns the vendor of the product.'
      },
      available: {
        type: Types.Basic.boolean,
        description: "Returns true if a product is available for purchase. Returns `false` if all of the products variants' inventory_quantity values are zero or less, and their `inventory_policy` is not set to \"_Allow users to purchase this item, even if it is no longer in stock._\""
      },
      compare_at_price_varies: {
        type: Types.Basic.boolean,
        description: 'Returns true if the compare_at_price_min is different from the compare_at_price_max. Returns false if they are the same.'
      },
      has_only_default_variant: {
        type: Types.Basic.boolean,
        description: 'Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.'
      },
      price_varies: {
        type: Types.Basic.boolean,
        description: "Returns true if the product's variants have varying prices. Returns false if all of the product's variants have the same price."
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/objects#product'
    }
  },
  product_options: {
    type: Types.Basic.object,
    description: 'The product_option object is available for each option in a product options array. The product options array is accessible via product.options_with_values.',
    properties: {
      name: {
        type: Types.Basic.string,
        description: 'Returns the product option\'s name'
      },
      position: {
        type: Types.Basic.number,
        description: 'Returns the product option\'s position in the product options array.'
      },
      selected_value: {
        type: Types.Basic.string,
        description: 'Returns the currently selected value for this product option.'
      },
      values: {
        type: Types.Basic.array,
        description: 'Returns an array of possible values for this product option.',
        object: Types.Basic.string
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/objects/product_option'
    }
  },
  location: {
    type: Types.Basic.object,
    description: 'This object allows you access store location information using Liquid.',
    properties: {
      address: {
        type: Types.Basic.string,
        description: 'Returns the address object corresponding to this location.'
      },
      id: {
        type: Types.Basic.string,
        description: 'Returns the ID of the location.'
      },
      latitude: {
        type: Types.Basic.string,
        description: 'Returns the latitude associated to the location. It will return null if the address is not verified.'
      },
      longitude: {
        type: Types.Basic.string,
        description: 'Returns the longitude associated with the location. It will return null if the address is not verified.'
      },
      name: {
        type: Types.Basic.string,
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
    type: Types.Basic.object,
    properties: {
      attributes: {
        description: "Returns the custom cart attributes for the order, if there are any. You can add as many custom attributes to your cart as you like.\n\nWhen you're looping through attributes, use \"{{ attribute | first }}\" to get the name of the attribute, and \"{{ attribute | last }}\" to get its value.",
        type: Types.Basic.array
      },
      billing_address: {
        description: 'Returns the billing address of the order.',
        type: Types.Basic.string
      },
      cancelled: {
        description: 'Returns true if an order is canceled, or false if it is not.',
        type: Types.Basic.string
      },
      cancelled_at: {
        description: 'Returns the timestamp of when an order was canceled. Use the date filter to format the timestamp.',
        type: Types.Basic.string
      },
      cancel_reason: {
        description: 'Returns one of the following cancellation reasons, if an order was canceled:\n\n-items unavailable\n- fraudulent order\n- customer changed/cancelled order\n- other\n',
        type: Types.Basic.string
      },
      cancel_reason_label: {
        description: "Returns the translated output of an order's order.cancel_reason.",
        type: Types.Basic.string
      },
      cart_level_discount_applications: {
        description: 'Returns an array of order-specific discount applications for an order.',
        type: Types.Basic.array
      },
      created_at: {
        description: 'Returns the timestamp of when an order was created. Use the date filter to format the timestamp.',
        type: Types.Basic.string
      },
      customer: {
        description: 'Returns the customer associated with the order.',
        type: Types.Basic.string
      },
      customer_url: {
        description: 'Returns a unique URL that the customer can use to access the order.',
        type: Types.Basic.string
      },
      discount_applications: {
        description: 'Returns an array of discount applications for an order.',
        type: Types.Basic.string
      },
      email: {
        description: 'Returns the email address associated with an order, if it exists.',
        type: Types.Basic.string
      },
      financial_status: {
        description: 'Returns the financial status of an order. The possible values are:\n\n- pending\n- authorized\n- paid\n- partially_paid\n- refunded\n- partially_refunded\n- voided',
        type: Types.Basic.string
      },
      financial_status_label: {
        description: "Returns the translated output of an order's \"financial_status\".",
        type: Types.Basic.string
      },
      fulfillment_status: {
        description: 'Returns the fulfillment status of an order.',
        type: Types.Basic.string
      },
      fulfillment_status_label: {
        description: "Returns the translated output of an order's fulfillment_status.",
        type: Types.Basic.string
      },
      line_items: {
        description: 'Returns an array of line items for the order.',
        type: Types.Basic.array
      },
      line_items_subtotal_price: {
        description: "Returns the sum of the order's line-item prices after any line item discounts have been applied. The subtotal amount doesn't include cart discounts, taxes (unless taxes are included in the prices), or shipping costs.",
        type: Types.Basic.string
      },
      location: {
        description: '(POS only) Returns the physical location of the order. You can configure locations in the Locations settings of your Shopify admin.',
        type: Types.Basic.string
      },
      name: {
        description: 'Returns the name of the order in the format set in the Standards and formats section of the General settings of your Shopify admin.',
        type: Types.Basic.string
      },
      note: {
        description: 'Returns the note associated with a customer order.',
        type: Types.Basic.string
      },
      order_number: {
        description: 'Returns the integer representation of the order name.',
        type: Types.Basic.number
      },
      order_status_url: {
        description: 'Returns the unique URL for the order status page of the order.',
        type: Types.Basic.string
      },
      phone: {
        description: 'Returns the phone number associated with an order, if it exists.',
        type: Types.Basic.string
      },
      shipping_address: {
        description: 'Returns the shipping address of the order.',
        type: Types.Basic.string
      },
      shipping_methods: {
        description: 'Returns an array of shipping_method variables from the order.',
        type: Types.Basic.string
      },
      shipping_price: {
        description: 'Returns the shipping price of an order.',
        type: Types.Basic.string
      },
      subtotal_price: {
        description: "Returns the subtotal price of all the items in the order after both line-item and cart discounts have been applied. The subtotal doesn't include taxes (unless taxes are included in the prices) or shipping costs.",
        type: Types.Basic.string
      },
      tags: {
        description: "Returns an array of all of the order's tags. The tags are returned in alphabetical order.",
        type: Types.Basic.array
      },
      tax_lines: {
        description: 'Returns an array of tax_line variables for an order.',
        type: Types.Basic.string
      },
      tax_price: {
        description: "Returns the order's tax price.",
        type: Types.Basic.string
      },
      total_discounts: {
        description: 'Returns the total value of all discounts applied to the order.',
        type: Types.Basic.string
      },
      total_net_amount: {
        description: 'Returns the net amount of the order.\n\nThe "order.total_net_amount" is calculated after refunds are applied. The value is equivalent to "order.total_price minus" "order.total_refunded_amount".',
        type: Types.Basic.string
      },
      total_price: {
        description: 'Returns the total price of an order.\n\nThe "order.total_price amount" is calculated before refunds are applied. To get the value of refunds, use the "order.total_refunded_amount property."',
        type: Types.Basic.string
      },
      total_refunded_amount: {
        description: 'Returns the total refunded amount of an order.',
        type: Types.Basic.string
      },
      transactions: {
        description: 'Returns an array of transactions from the order.',
        type: Types.Basic.array
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/order'
    }
  },
  section: {
    description: "The section object lets you access a section's properties and setting values.",
    type: Types.Basic.object,
    properties: {
      blocks: {
        description: "Returns an array of the section's blocks.",
        type: Types.Basic.array
      },
      id: {
        description: "For static sections, returns the section's file name without \".liquid\". For dynamic sections, returns a dynamically generated ID.",
        type: Types.Basic.number
      },
      settings: {
        description: "Returns an object of the section settings set in the theme editor. Retrieve setting values by referencing the setting's unique id.",
        type: Types.Basic.object
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/section'
    }
  },
  model: {
    type: Types.Basic.object,
    description: 'The model object contains information about a 3D model uploaded from the product details page in the Shopify admin.',
    properties: {
      alt: {
        type: Types.Basic.string,
        description: 'Returns the alt tag of the model set on the product details page of the Shopify admin.'
      },
      id: {
        type: Types.Basic.string,
        description: 'Returns the media_id of the model.'
      },
      media_type: {
        type: Types.Basic.object,
        description: 'Returns the type of the object (model).'
      },
      position: {
        type: Types.Basic.number,
        description: "Returns the position of the model in the product object's media array"
      },
      preview_image: {
        type: Types.Basic.string,
        description: 'Returns a preview image for the model.'
      },
      sources: {
        type: Types.Basic.array,
        description: 'Returns an array of model source objects.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/model'
    }
  },
  model_source: {
    type: Types.Basic.object,
    description: 'The model_source object contains information about the source files for a    model associated with a product.',
    properties: {
      mime_type: {
        type: Types.Basic.string,
        description: 'Returns the MIME type of the model source file.'
      },
      format: {
        type: Types.Basic.string,
        description: 'Returns the format of the model source file.'
      },
      url: {
        type: Types.Basic.string,
        description: 'Returns the URL of the model source file.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/model-source'
    }
  },
  media: {
    type: Types.Basic.object,
    description: 'The media object represents an object returned in a product.media array.',
    properties: {
      alt: {
        type: Types.Basic.string,
        description: 'Returns the alt tag of the media'
      },
      id: {
        type: Types.Basic.number,
        description: 'Returns the ID of the media.'
      },
      media_type: {
        type: Types.Basic.object,
        description: 'Returns the media type of the object.'
      },
      position: {
        type: Types.Basic.object,
        description: "Returns the position of the specific media object in the product object's media array."
      },
      preview_image: {
        type: Types.Basic.string,
        description: 'Returns a preview image for the media.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/media'
    }
  },
  variant: {
    type: Types.Basic.object,
    properties: {
      available: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant is available for purchase, or false if it not. For a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no variant.inventory_management is also considered available.'
      },
      barcode: {
        type: Types.Basic.string,
        description: "Returns the variant's barcode."
      },
      compare_at_price: {
        type: Types.Basic.string,
        description: "Returns the variant's compare at price. Use a money filter to return the value in a monetary format."
      },
      featured_media: {
        type: Types.Basic.string,
        description: 'Returns the first media item attached to the variant.'
      },
      id: {
        description: "Returns the variant's unique ID.",
        type: Types.Basic.number
      },
      image: {
        description: 'Returns the image object associated with the variant.',
        type: Types.Basic.object,
        properties: {
          alt: {
            description: "Returns the image's alt text.",
            type: Types.Basic.string
          },
          src: {
            description: 'Returns the relative URL to the image.',
            type: Types.Basic.string
          }
        }
      },
      incoming: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant has incoming inventory.'
      },
      inventory_management: {
        type: Types.Basic.string,
        description: "Returns the variant's inventory tracking service."
      },
      inventory_policy: {
        type: Types.Basic.string,
        description: 'Returns the string continue if the "Allow users to purchase this item, even if it is no longer in stock." checkbox is checked in the variant options in the Admin. Returns deny if it is unchecked.'
      },
      inventory_quantity: {
        type: Types.Basic.number,
        description: "Returns the variant's inventory quantity."
      },
      next_incoming_date: {
        type: Types.Basic.string,
        description: 'Returns the date when the next incoming inventory will arrive.'
      },
      options: {
        type: Types.Basic.array,
        description: "Returns an array of the variant's product option values."
      },
      option1: {
        type: Types.Basic.string,
        description: "Returns the value of the variant's first product option."
      },
      option2: {
        type: Types.Basic.string,
        description: "Returns the value of the variant's second product option."
      },
      option3: {
        type: Types.Basic.string,
        description: "Returns the value of the variant's third product option."
      },
      price: {
        type: Types.Basic.string,
        description: "Returns the variant's price. Use a money filter to return the value in a monetary format."
      },
      requires_shipping: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant is set to require shipping.'
      },
      requires_selling_plan: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant is set to require a selling_plan when added to the cart.'
      },
      selected: {
        type: Types.Basic.boolean,
        description: 'Returns true if the variant is currently selected. The selected variant is based on the URL parameter variant.'
      },
      selected_selling_plan_allocation: {
        type: Types.Basic.number,
        description: 'Returns a selling_plan_allocation object based on the URL parameter selling_plan.\n\nFor example, given the URL parameters "?variant=12345&selling_plan=8765", the selling plan allocation for the variant 12345 with a selling plan id of 8765 is returned.\n\nIf there is no selected selling plan allocation, then this property returns nil.'
      },
      selling_plan_allocations: {
        type: Types.Basic.array,
        description: 'An array of selling_plan_allocation objects available for the variant.'
      },
      sku: {
        type: Types.Basic.string,
        description: "Returns the variant's SKU."
      },
      store_availabilities: {
        type: Types.Basic.array,
        description: 'Returns an array of store_availability objects if variant.selected is true.'
      },
      taxable: {
        type: Types.Basic.boolean,
        description: 'Returns true if taxes are charged for the variant, or false if they are not.'
      },
      title: {
        type: Types.Basic.string,
        description: "Returns the concatenation of all the variant's product option values, joined by / characters."
      },
      unit_price: {
        type: Types.Basic.string,
        description: 'Unit prices are available only to stores located in Germany or France.Returns the unit price of the product variant.\n\nThe price reflects any discounts that are applied to the line item.'
      },
      unit_price_measurement: {
        type: Types.Basic.object,
        description: 'Returns a unit_price_measurement object for the product variant.'
      },
      url: {
        type: Types.Basic.string,
        description: 'Returns a URL that is unique to only one product variant. The variant ID is used as the unique identifier.'
      },
      weight: {
        type: Types.Basic.number,
        description: "Returns the variant's weight in grams. Use the weight_with_unit filter to convert it to your store's weight format or the weight unit configured on the variant."
      },
      weight_unit: {
        type: Types.Basic.number,
        description: 'Returns the unit for the weight configured on the variant. Works well paired with the weight_in_unit attribute and the weight_with_unit filter.'
      },
      weight_in_unit: {
        type: Types.Basic.number,
        description: 'Returns the weight of the product converted to the unit configured on the variant. Works well paired with the weight_unit attribute and the weight_with_unit filter.'
      }
    },
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/objects/variant'
    }
  }
};

export default Objects;
