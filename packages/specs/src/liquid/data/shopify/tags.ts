import { Tags as ITags, Type } from 'liquid/types/tags';

export let Tags: ITags;

Tags = {
  echo: {
    type: Type.variable,
    description: 'Outputs an expression in the rendered HTML. This is identical to wrapping an expression in `{{` and `}}`, but works inside liquid tags. Filters are supported.',
    singular: true,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/theme-tags#echo'
    }
  },
  form: {
    type: Type.generator,
    description: 'Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.',
    pattern: /(?:activate_|recover_|reset_|create_)customer_password|contact|guest_login|storefront_password|currency|product|new_comment|(?:create_)?customer(?:_address|_login)/,
    arguments: [
      {
        type: Type.string,
        value: 'activate_customer_password',
        template: 'customer/activate_account',
        description: 'Generates a form for activating a customer account on the activate_account.liquid template.'
      },
      {
        type: Type.string,
        value: 'product',
        description: 'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.',
        parameter: {
          seperator: 1,
          required: true,
          value: {
            product: {
              type: Type.keyword,
              description: 'The `product` object is required when generating a form for adding a product variant to the cart'
            }
          }
        }
      },
      {
        type: Type.string,
        value: 'new_comment',
        template: 'article',
        description: 'Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter.',
        parameter: {
          seperator: 1,
          required: true,
          value: {
            article: {
              type: Type.keyword,
              description: 'The `article` object'
            }
          }
        }
      },
      {
        description: 'Generates a form for creating a new customer account on the register.liquid template.',
        type: Type.string,
        value: 'create_customer',
        template: 'customer/register'
      },
      {
        type: Type.string,
        value: 'customer',
        description: "Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."
      },
      {
        type: Type.string,
        value: 'customer_address',
        description: 'Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address.',
        parameter: {
          seperator: 1,
          value: {
            'customer.new_address': {
              type: Type.keyword,
              description: 'The `customer.new_address` is required for creating a new address'
            },
            address: {
              type: Type.keyword,
              description: 'The `address` is required when editing an existing address'
            }
          }
        }
      },
      {
        value: 'customer_login',
        description: 'Generates a form for logging into Customer Accounts on the login.liquid template.',
        type: Type.string,
        template: 'customer/login'
      },
      {
        value: 'recover_customer_password',
        description: 'Generates a form for recovering a lost password on the login.liquid template.',
        type: Type.string,
        template: 'customer/login'
      },
      {
        value: 'contact',
        description: 'Generates a form for submitting an email through the Liquid contact form',
        type: Type.string
      },
      {
        value: 'reset_customer_password',
        description: 'Generates a form on the customers/reset_password.liquid template for a customer to reset their password.',
        type: Type.string,
        template: 'customer/login'
      },
      {
        value: 'guest_login',
        description: 'Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.',
        type: Type.string,
        template: 'customer/login'

      },
      {
        value: 'storefront_password',
        description: 'Generates a form on the password.liquid template for entering a password-protected storefront.',
        type: Type.string
      },
      {
        value: 'currency',
        description: 'Generates a form that lets your customer change the currency in your storefront.',
        type: Type.string
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/tags/theme-tags#form'
    }
  },
  include: {
    description: 'The include tag has been deprecated because the way that it handles variables reduces performance and makes theme code harder to both read and maintain.',
    filters: false,
    deprecated: true,
    singular: true,
    type: Type.import,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
    }
  },
  layout: {
    description: "Include \"{% layout 'alternate' %}\" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:",
    singular: true,
    type: Type.import,
    arguments: [
      {
        type: Type.string,
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags/theme-tags#layout'
    }
  },
  paginate: {
    type: Type.iteration,
    description: 'Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.',
    arguments: [
      {
        type: Type.array,
        required: true
      },
      {
        type: Type.keyword,
        value: 'by',
        required: true
      },
      {
        type: Type.integer,
        required: true,
        pattern: [ 1, 50 ]
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags/theme-tags#paginate'
    }
  },
  section: {
    description: 'Renders a section from the sections folder of a theme.',
    filters: false,
    singular: true,
    type: Type.import,
    arguments: [
      {
        type: Type.string,
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags/theme-tags#section'
    }
  },
  schema: {
    description: 'The javascript tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ',
    filters: false,
    language: 'json',
    unique: true,
    type: Type.embedded,
    trims: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
    }
  },
  style: {
    type: Type.embedded,
    description: 'The Liquid style tag renders an HTML `<style>` tag with a Shopify data attribute.',
    filters: false,
    trims: false,
    language: 'css',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/themes/liquid/tags/theme-tags#style'
    }
  },
  stylesheet: {
    type: Type.embedded,
    description: 'The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
    filters: false,
    trims: false,
    unique: true,
    deprecated: true,
    language: 'css',
    arguments: [
      {
        type: Type.string,
        value: 'scss',
        description: 'SASS support is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/themes/architecture/sections/section-schema'
    }
  },
  javascript: {
    type: Type.embedded,
    description: 'The javascript tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
    filters: false,
    deprecated: true,
    trims: false,
    language: 'javascript',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/themes/architecture/sections/section-assets#javascript'
    }
  }
};
