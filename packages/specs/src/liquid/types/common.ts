import { shopify, standard } from '../data/export';
import { UnionConcat } from './utils';
import { Type, BasicTypeRange, BasicToArgumentTypeRange } from './types';
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
/* ACCEPTS                                      */
/* -------------------------------------------- */

declare type IAccepts = UnionConcat<'string' | 'number' | 'boolean' | 'object' | 'array', '|'>;

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
/* PATTERN TYPE                                 */
/* -------------------------------------------- */

 type Pattern = string | RegExp | [number, number]

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
  readonly value: string | string[],
  /**
   * An optional desciption for the value to be shown
   * in hovers and completions.
   */
  readonly description?: string | IDescription,

  /**
   * A template scope id. when provided, values will only
   * appear in completions when used within a specific
   * template (file) that matches the basename+extension URI
   * that is supplied here.
   *
   * This is mostly a Shopify variation specific, typically this
   * can be omitted.
   */
  readonly template?: ITemplates | Array<ITemplates> | undefined;
}

export interface IParameters {

  /**
   * The type value the parameter accepts. When a parameter is a keyword type,
   * ie: no colon operator then assert the _keyword_ type enum (`10`) and omit
   * the `value` property. If type is set `keyword` and a value exists, those
   * entries will be ignored.
   */
  readonly type?: BasicTypeRange | Type.keyword

  /**
   * Description of argument which will be rendered in
   * completions, hovers or signatures.
   */
  readonly description?: IDescription | string | undefined;

  /**
   * Pattern
   *
   * An parameter may accepts a pattern match value. When provided,
   * the parser will validate the value against the pattern provided.
   *
   * You can pass a Regular Expression or _number_ range as array, eg: `[0, 10]`.
   * In addition, one may also provide a regex string match.
   *
   * ---
   *
   * **USE WITH CAUTION**
   *
   * Use this option with extreme caution. Do not pass global flags or
   * complex patterns else you will exhaust the parser. Keep it simple.
   *
   */
  readonly pattern?: Pattern,

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
   * When `undefined` the parser will assume `comma` or `whitespace`
   * depending on whether it knows about the tag or filter.
   *
   * - `1` Comma
   * - `2` Whitespace
   * - `3` Equals
   */
  readonly seperator?: Separator

  /**
   * The parameters available to the argument. If the parameter has no
   * known values, or can accept a custom parameter not known to the spec,
   * then pass the expected type.
   *
   * For example, the `t` (translation filter) in the Shopify variation
   * accepts _any_ type parameter values, by passing a basic _string_ type
   * enum to `value` that parser will suffice, the parser will validate
   * the character sequence and intercepts value type, but accept any parameter
   * name that is a alpha-numeric combination.
   */
  readonly value: { [parameter: string]: IParameters } | BasicTypeRange

}

export interface Argument {

  /**
   * Argument type is equal to value of 'parameter'
   */
  readonly type: BasicToArgumentTypeRange

  /**
   * Pattern
   *
   * An argument may accepts a pattern match value. When provided,
   * the parser will validate the token against the pattern provided.
   *
   * You can pass a Regular Expression, _number_ range as array, eg: `[0, 10]`.
   * The property also accepts an _object_. When passing an `object` the
   * properties must point to the previous argument values. In addition, one
   * may also provide a regex string match.
   *
   * ---
   *
   * **USE WITH CAUTION**
   *
   * Use this option with extreme caution. Do not pass global flags or
   * complex patterns else you will exhaust the parser. Keep it simple.
   *
   */
  readonly pattern?: Pattern | { [property: string]: Pattern },

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
  readonly type: Type.parameter;

  /**
   * EXCLUDES
   */
  readonly parameter?: never;
}

/* -------------------------------------------- */
/* EXPORT                                       */
/* -------------------------------------------- */

export type IArgument = Argument | ArgumentAsParameter
