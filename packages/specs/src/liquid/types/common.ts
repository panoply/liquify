import { shopify, standard } from '../data/export';
import { UnionConcat } from './utils';
import { Types } from './types';
import { IFilter } from './filters';
import { ITag } from './tags';
import { IObject } from './objects';

/* -------------------------------------------- */
/* ENGINE ENUM                                  */
/* -------------------------------------------- */

export const enum IEngine {

  /**
   * Liquid Standard Variation
   *
   * **FREE**
   */
  standard = 'standard',

  /**
   * Liquid Shopify Variation
   *
   * **LICENSED**
   */
  shopify = 'shopify',

  /**
   * Liquid Jekyll Variation
   *
   * **FREE**
   */
  jekyll = 'jekyll',

  /**
   * Liquid Eleventy Variation
   *
   * **FREE**
   */
  eleventy = 'eleventy'

}

/* -------------------------------------------- */
/* VARIATION                                    */
/* -------------------------------------------- */

export interface Variation {
  readonly engine?: IEngine;
  readonly updated?: string;
  readonly filters?: { [tag: string]: IFilter }
  readonly objects?:{ [tag: string]: IObject; }
  readonly tags?: { [tag: string]: ITag; }
}

/* -------------------------------------------- */
/* SPECIFIERS                                   */
/* -------------------------------------------- */

export type Specifiers = IFilter & IObject & ITag;

/* -------------------------------------------- */
/* SEPARATORS                                   */
/* -------------------------------------------- */

export const enum Separator { comma = 1, whitespace, equal }

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export type IArgumentTypeKeys = (
  | keyof typeof Types.Basic
  | keyof typeof Types.Argument
);

/* -------------------------------------------- */
/* ACCEPTS                                      */
/* -------------------------------------------- */

export type IAccepts = UnionConcat<
  'string' | 'number' | 'boolean' | 'object' | 'array'
  , '|'
>;

/* -------------------------------------------- */
/* TAG SCOPES                                   */
/* -------------------------------------------- */

export type TagScopes = (
  | shopify.TagList
  | standard.TagsList
);

/* -------------------------------------------- */
/* SCOPES                                       */
/* -------------------------------------------- */

export type IScopes = (
  | shopify.ObjectList
  | shopify.TagList
  | standard.TagsList
);

/* -------------------------------------------- */
/* LIQUID SPECIFICATION NAMES                   */
/* -------------------------------------------- */

export type ISpecs = (
  | 'Standard'
  | 'Shopify'
  | 'Jekyll'
  | 'Eleventy'
);

/* -------------------------------------------- */
/* SHOPIFY TEMPLATE NAMES                       */
/* -------------------------------------------- */

export type ITemplates =
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
  | 'page.contact'
  | 'page'
  | 'password'
  | 'product'
  | 'search'

/* -------------------------------------------- */
/* DESCRIPTION INTERFACE                        */
/* -------------------------------------------- */

export interface IDescription {
  kind: 'markdown' | 'plaintext';
  value: string;
}

/* -------------------------------------------- */
/* REFRENCES INTERFACE                          */
/* -------------------------------------------- */

export interface IReferences {

  /**
   * The name of the Liquid Variation
   */
  name: `${ISpecs} Liquid`;

  /**
   * Link to online documentation
   */
  url: string;
}

/* -------------------------------------------- */
/* VALUES INTERFACE                             */
/* -------------------------------------------- */

export interface Values {

  /**
   * A pre-defined argument value, can be a string or
   * an array of strings (when multiple values occur)
   */
  value: string | string[],
  /**
   * An optional desciption for the value to be shown
   * in hovers and completions.
   */
  description?: string | IDescription
}

export interface IParameters {

  /**
   * Argument type is equal to value of 'parameter'
   */
  readonly type?: Types.Basic

  /**
   * When a parameter is a keyword type, ie: no colon operator
   * Generally only used on tags, not filters.
   */
  readonly keyword?: boolean

  /**
   * Description of argument which will be rendered in
   * completions, hovers or signatures.
   */
  readonly description?: IDescription | string | undefined;

  /**
   * An optional expression pattern match for values.
   * Use this when `value` is of type array or requires special chars.
   */
  readonly pattern?: RegExp;

  /**
   * The parameter value can be pre-defined or user defined.
   * When a value is supplied, it will be provided to completions.
   */
  readonly value?: string | string[] | Values[]

}

export interface ParameterArgument {

  /**
   * Whether the argument is required or optional.
   * When `undefined` the parser will assume `false`
   */
  readonly required?: boolean;

  /**
   * If parameters should be unqiue, no duplicate entries.
   * When `undefined` the parser will assume `true`
   */
  readonly unique?: boolean

  /**
   * When the parameter should be proceeded by a seperator character.
   * When `undefined` the parser will assume `comma`.
   *
   * - `1` Comma
   * - `2` Whitespace
   * - `3` Equals
   */
  readonly seperator?: Separator

  /**
   * The parameters available to the argument
   */
  readonly value: { [parameter: string]: IParameters }

}

interface Argument {

  /**
   * Argument type is equal to value of 'parameter'
   */
  readonly type: Types.Basic | Types.Basic

  /**
   * For values that contain special characters, an
   * option expression pattern match can be provided.
   */
  readonly pattern?: RegExp | { [property: string]: RegExp },

  /**
   * The argument value can be pre-defined or user defined.
   * When a value is supplied, it will be provided to completions.
   */
  readonly value?: string | string[] | Values[] | { [property: string]: Values[]}

  /**
   * Whether the argument is required or optional.
   * When `undefined` the parser will assume `false`
   */
  readonly required?: boolean;

  /**
   * Description of argument which will be rendered in
   * completions, hovers or signatures.
   */
  readonly description?: IDescription | string | undefined;

  /**
   * Documentation reference to this argument
   */
  readonly reference?: IReferences | undefined;

  /**
   * Template name scopes arguments are valid within.
   * This is mostly a Shopify variation specific.
   */
  readonly template?: ITemplates | Array<ITemplates> | undefined;

  /**
   * Argument parameters available to this value
   * Optional, only use for Arugments with  Parameters.
   */
  readonly parameter?: ParameterArgument

}

interface ArgumentAsParameter extends ParameterArgument {

  /**
   * Argument type is equal to value of 'parameter'
   */
  readonly type: Types.Argument.parameter

  /**
   * EXCLUDES
   */
  readonly parameter?: never
}

/* -------------------------------------------- */
/* EXPORT                                       */
/* -------------------------------------------- */

export type IArgument = Argument | ArgumentAsParameter
