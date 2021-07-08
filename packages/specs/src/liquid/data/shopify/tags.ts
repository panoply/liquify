import { Tags as ITags, Types } from 'liquid/types/tags';

const Tags: ITags = {
  echo: {
    type: Types.Tag.variable,
    description: 'Outputs an expression in the rendered HTML. This is identical to wrapping an expression in `{{` and `}}`, but works inside liquid tags. Filters are supported.',
    singular: true,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/theme-tags#echo'
    }
  },
  form: {
    type: Types.Tag.output,
    description: 'Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.',
    arguments: [
      {
        type: Types.Basic.string,
        value: 'activate_customer_password',
        template: 'customer/activate_account',
        description: 'Generates a form for activating a customer account on the activate_account.liquid template.'
      },
      {
        type: Types.Basic.string,
        value: 'product',
        description: 'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.',
        parameter: {
          seperator: 1,
          required: true,
          value: {
            product: {
              description: 'The `product` object is required when generating a form for adding a product variant to the cart',
              keyword: true
            }
          }
        }
      },
      {
        type: Types.Basic.string,
        value: 'new_comment',
        template: 'article',
        description: 'Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter.',
        parameter: {
          seperator: 1,
          required: true,
          value: {
            article: {
              description: 'The `article` object',
              keyword: true
            }
          }
        }
      },
      {
        description: 'Generates a form for creating a new customer account on the register.liquid template.',
        type: Types.Basic.string,
        value: 'create_customer',
        template: 'customer/register'
      },
      {
        type: Types.Basic.string,
        value: 'customer',
        description: "Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."
      },
      {
        type: Types.Basic.string,
        value: 'customer_address',
        description: 'Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address.',
        parameter: {
          seperator: 1,
          unique: true,
          value: {
            'customer.new_address': {
              keyword: true,
              description: 'The `customer.new_address` is required for creating a new address'
            },
            address: {
              keyword: true,
              description: 'The `address` is required when editing an existing address'
            }
          }
        }
      },
      {
        value: 'customer_login',
        description: 'Generates a form for logging into Customer Accounts on the login.liquid template.',
        type: Types.Basic.string,
        template: 'customer/login'
      },
      {
        value: 'recover_customer_password',
        description: 'Generates a form for recovering a lost password on the login.liquid template.',
        type: Types.Basic.string,
        template: 'customer/login'
      },
      {
        value: 'contact',
        description: 'Generates a form for submitting an email through the Liquid contact form',
        type: Types.Basic.string
      },
      {
        value: 'reset_customer_password',
        description: 'Generates a form on the customers/reset_password.liquid template for a customer to reset their password.',
        type: Types.Basic.string,
        template: 'customer/login'
      },
      {
        value: 'guest_login',
        description: 'Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.',
        type: Types.Basic.string,
        template: 'customer/login'

      },
      {
        value: 'storefront_password',
        description: 'Generates a form on the password.liquid template for entering a password-protected storefront.',
        type: Types.Basic.string
      },
      {
        value: 'currency',
        description: 'Generates a form that lets your customer change the currency in your storefront.',
        type: Types.Basic.string
      }
    ],
    pattern: /(?:activate_|recover_|reset_|create_)customer_password|contact|guest_login|storefront_password|currency|product|new_comment|(?:create_)?customer(?:_address|_login)/,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://shopify.dev/docs/themes/liquid/reference/tags/theme-tags#form'
    }
  },
  include: {
    description: 'The include tag has been deprecated because the way that it handles variables reduces performance and makes theme code harder to both read and maintain.',
    filters: false,
    trims: false,
    deprecated: true,
    singular: true,
    type: Types.Tag.import,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
    }
  },
  layout: {
    description: "Include \"{% layout 'alternate' %}\" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:",
    singular: true,
    type: Types.Tag.import,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
    }
  },
  paginate: {
    description: 'Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.',
    type: Types.Tag.iteration,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
    }
  },
  section: {
    description: 'Renders a section from the sections folder of a theme.',
    filters: false,
    singular: true,
    type: Types.Tag.import,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
    }
  },
  schema: {
    description: 'The javascript tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ',
    filters: false,
    language: 'json',
    type: Types.Tag.embedded,
    trims: false,
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
    }
  },
  style: {
    type: Types.Tag.embedded,
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
    type: Types.Tag.embedded,
    description: 'The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
    filters: false,
    trims: false,
    deprecated: true,
    language: 'css',
    pattern: /scss/,
    arguments: [
      {
        type: Types.Basic.string,
        value: 'scss',
        description: 'SASS support is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.'
      }
    ],
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#javascript-and-stylesheet-tags'
    }
  },
  javascript: {
    type: Types.Tag.embedded,
    description: 'The javascript tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
    filters: false,
    deprecated: true,
    trims: false,
    language: 'javascript',
    reference: {
      name: 'Shopify Liquid',
      url: 'https://help.shopify.com/en/themes/development/sections#javascript-and-stylesheet-tags'
    }
  }
};

export default Tags;
