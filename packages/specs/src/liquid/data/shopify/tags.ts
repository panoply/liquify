import { ITags } from '../../types/tags';

export let Tags: ITags;

Tags = {
  echo: {
    type: 'variable',
    description: 'Outputs an expression in the rendered HTML. This is identical to wrapping an expression in `{{` and `}}`, but works inside liquid tags. Filters are supported.',
    singular: true,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/theme-tags#echo'
    }
  },
  form: {
    type: 'generator',
    description: 'Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.',
    arguments: [
      {
        type: 'string',
        required: true,
        pattern: /(?:activate_|recover_|reset_|create_)customer_password|contact|guest_login|storefront_password|currency|product|new_comment|(?:create_)?customer(?:_address|_login)/,
        value: [
          {
            value: 'activate_customer_password',
            template: 'customer/activate_account',
            description: 'Generates a form for activating a customer account on the activate_account.liquid template.'
          },
          {
            value: 'product',
            description: 'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.'
          },
          {
            value: 'new_comment',
            template: 'article',
            description: 'Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter.'
          },
          {
            description: 'Generates a form for creating a new customer account on the register.liquid template.',
            value: 'create_customer',
            template: 'customer/register'
          },
          {
            value: 'customer',
            description: "Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."
          },
          {
            value: 'customer_address',
            description: 'Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address.'
          },
          {
            value: 'customer_login',
            description: 'Generates a form for logging into Customer Accounts on the login.liquid template.',
            template: 'customer/login'
          },
          {
            value: 'recover_customer_password',
            description: 'Generates a form for recovering a lost password on the login.liquid template.',
            template: 'customer/login'
          },
          {
            value: 'contact',
            description: 'Generates a form for submitting an email through the Liquid contact form'
          },
          {
            value: 'reset_customer_password',
            description: 'Generates a form on the customers/reset_password.liquid template for a customer to reset their password.',
            template: 'customer/login'
          },
          {
            value: 'guest_login',
            description: 'Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.',
            template: 'customer/login'

          },
          {
            value: 'storefront_password',
            description: 'Generates a form on the password.liquid template for entering a password-protected storefront.'
          },
          {
            value: 'currency',
            description: 'Generates a form that lets your customer change the currency in your storefront.'
          }
        ]
      },
      {
        type: 'object',
        value: {
          product: [
            {
              value: 'product',
              description: 'The `product` object is required when generating a form for adding a product variant to the cart'
            }
          ],
          new_comment: [
            {
              value: 'article',
              description: 'The `article` object'
            }
          ],
          customer_address: [
            {
              value: 'customer.new_address',
              description: 'The `customer.new_address` is required for creating a new address'
            },
            {
              value: 'address',
              description: 'The `address` is required when editing an existing address'
            }
          ]
        }
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
    type: 'import',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
    }
  },
  layout: {
    description: "Include \"{% layout 'alternate' %}\" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:",
    singular: true,
    type: 'import',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags/theme-tags#layout'
    }
  },
  paginate: {
    type: 'iteration',
    description: 'Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.',
    arguments: [
      {
        type: 'array',
        required: true
      },
      {
        type: 'keyword',
        value: 'by',
        required: true
      },
      {
        type: 'integer',
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
    type: 'import',
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/api/liquid/tags/theme-tags#section'
    }
  },
  schema: {
    description: 'The schema tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ',
    filters: false,
    language: 'json',
    unique: true,
    type: 'embedded',
    trims: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
    }
  },
  style: {
    type: 'embedded',
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
    type: 'embedded',
    description: 'The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
    filters: false,
    trims: false,
    unique: true,
    deprecated: true,
    language: 'css',
    arguments: [
      {
        type: 'string',
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
    type: 'embedded',
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
