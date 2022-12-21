/* -------------------------------------------- */
/* ENGINE ENUM                                  */
/* -------------------------------------------- */

export declare type Engines = (
  | 'standard'
  | 'shopify'
  | 'jekyll'
  | 'eleventy'
)

/* -------------------------------------------- */
/* LIQUID SPECIFICATION NAMES                   */
/* -------------------------------------------- */

export type SpecNames = (
  | 'Standard'
  | 'Shopify'
  | 'Jekyll'
  | 'Eleventy'
);

/* -------------------------------------------- */
/* SHOPIFY TEMPLATE NAMES                       */
/* -------------------------------------------- */

export declare type Templates = (
  | 'customer/register'
  | 'customer/reset_password'
  | 'customer/activate_account'
  | 'customer/account'
  | 'customer/login'
  | 'customer/addresses'
  | 'customer/order'
  | '404'
  | 'article'
  | 'blog'
  | 'cart'
  | 'collection'
  | 'gift_card'
  | 'index'
  | 'list-collections'
  | `page.${string}`
  | 'page.contact'
  | 'page'
  | 'password'
  | 'product'
  | 'search'
)

/* -------------------------------------------- */
/* PATTERN TYPE                                 */
/* -------------------------------------------- */

export declare type Pattern = string | RegExp | [number, number]

/* -------------------------------------------- */
/* REFERENCE                                    */
/* -------------------------------------------- */
export declare interface References {
  /**
   * The name of the Liquid Variation
   */
  name: `${Capitalize<Engines>} Liquid`;
  /**
   * Link to online documentation
   */
  url: string;
}
