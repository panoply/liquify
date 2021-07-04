import { shopify, standard } from '../export';
import { UnionConcat } from './utils';

/* -------------------------------------------- */
/* ANY TYPE                                     */
/* -------------------------------------------- */

/**
 * Any Type
 *
 * Asserts any type on an argument, this is the
 * default.
 *
 * ---
 *
 * **Examples**
 *
 * When an _any_ type is present the parser will
 * consume the argument and not run any validation.
 *
 * ---
 */
declare type AnyType = 1
declare type AnyTypeKey = 'any'

/* -------------------------------------------- */
/* PARAMETER TYPE                               */
/* -------------------------------------------- */

/**
 * Parameter Type (Special Type)
 *
 * Refers to a Liquid parameter which is a
 * alphanumeric - colon token combination.
 *
 * ---
 *
 * **Example**
 *
 * - `param:`
 * - `some_param:`
 * - `param_1:`
 *
 * ---
 */
declare type ParameterType = 2
declare type ParameterTypeKey = 'parameter'

/* -------------------------------------------- */
/* KEYWORD TYPE                                 */
/* -------------------------------------------- */

/**
 * Keyword Type (Special Type)
 *
 * Refers to alphanumeric combination word that
 * are will either hold or be assigned a value, it cannot
 * contain any characters other than letters and numbers.
 *
 * ---
 *
 * **Example**
 *
 * Keywords types can be used to describe an
 * iterator token of a `for` tag or the variable
 * defined in a capture or assign tag.
 *
 * - `{% assign keyword = 'foo' %}`
 * - `{% for keyword in array %}`
 *
 * ---
 */
declare type KeywordType = 3
declare type KeywordTypeKey = 'keyword'

/* -------------------------------------------- */
/* BASIC TYPES                                  */
/* -------------------------------------------- */

export const enum BasicTypes {

  /**
   * A value that is a digit, it may be an integer or
   * float type (the parser will determine that)
   *
   * ---
   *
   * **Example**
   *
   * - `25`
   * - `-39.756`
   *
   * ---
   *
   */
  number = 4,

  /**
   * A value of boolean.
   *
   * ---
   *
   * **Example**
   *
   * - `true`
   * - `false`
   *
   * ---
   *
   */
  boolean,

  /**
   * String Type
   *
   * Refers to token value surrounded by
   * quotation characters.
   *
   * ---
   *
   * **Example**
   *
   * - `'string'`
   * - `"string"`
   *
   * ---
   */
  string,

  /**
   * Array Type
   *
   * Refers to an object or variable token which has
   * type value of array. The parser will validate the input.
   *
   * ---
   *
   * **Example**
   *
   * You would assert an _array_ type when the token requires
   * such an input to correctly operate, for example an array
   * is required to be past in the for tag.
   *
   * - `{% for i in array %}`
   * - `{{ array | uniq }}`
   *
   * ---
   *
   */
  array,

}

declare type BasicTypeKeys = keyof typeof BasicTypes

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export type ITypes = (
  | AnyTypeKey
  | ParameterTypeKey
  | KeywordTypeKey
  | BasicTypeKeys
);

/* -------------------------------------------- */
/* ACCEPTS                                      */
/* -------------------------------------------- */

export type IAccepts = UnionConcat<BasicTypeKeys, '|'>;

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

interface Values {
  value: string,
  description?: string | IDescription
}

/* -------------------------------------------- */
/* PARAMETERS INTERFACE                         */
/* -------------------------------------------- */

interface Parameters {

  /**
   * Description of argument which will be rendered in
   * completions, hovers or signatures.
   *
   * @default undefined
   */
  readonly description?: IDescription | string | undefined;

  /**
   * When the parameter should be proceeded by a
   * seperator character. When `undefined` the parser
   * will assumed whitespace, so there is no need to explictly
   * reference this.
   *
   * @default 'whitespace'
   */
  readonly seperator?: 'comma' | 'whitespace'

}

interface ParametersArgument extends Parameters {

  /**
   * Exclude `type` when parameter requires argument
   */
  readonly keyword?: never;

  /**
   * What parameters the tag accepts if values are
   * provided.
   *
   * @default undefined
   */
  readonly accepts: IAccepts;

}

interface ParameterKeyword extends Parameters {

  /**
   * Exclude `accepts` when parameter is keyword type
   */
  readonly accepts?: never;

  /**
   * When the parameter does not requires arguments
   */
  readonly keyword: true;

}

export declare type IParameters = ParametersArgument | ParameterKeyword

/* -------------------------------------------- */
/* ARGUMENTS                                    */
/* -------------------------------------------- */

interface Arguments {

  /**
   * The argument value can be pre-defined  or
   * user defined. When a value is supplied, it will
   * be provided to completions.
   *
   * @default undefined
   */
  readonly value?: string | string[] | Values[]

  /**
   * Whether the argument is required or optional.
   * By default, this is `false` so the argument is
   * considered optional.
   *
   * @default false
   */
  readonly required?: boolean;

  /**
   * Description of argument which will be rendered in
   * completions, hovers or signatures.
   *
   * @default undefined
   */
  readonly description?: IDescription | string | undefined;

  /**
   * Documentation reference to this argument
   *
   * @default undefined
   */
  readonly references?: IReferences[] | undefined;

  /**
   * Template name scopes arguments are valid within.
   * This is mostly a Shopify variation specific.
   *
   * @default undefined
   */
  readonly template?: ITemplates | Array<ITemplates> | undefined;

}

declare interface ArgumentsArgument extends Arguments {

  /**
   * Exclude `accepts` when parameter is keyword type
   */
  readonly accepts?: never;

  /**
   * Argument type is equal to value of 'parameter'
   *
   * @default 'any'
   */
  readonly type: AnyTypeKey | KeywordTypeKey | BasicTypeKeys

  /**
   * Argument parameters available to this value
   *
   * @default undefined
   */
  readonly parameters?: { [parameter: string]: IParameters }

}

interface ArgumentsParameter extends Arguments {

  /**
   * Exclude `accepts` when parameter is keyword type
   */
  readonly parameters?: never;

  /**
   * What parameters the tag accepts if values are
   * provided.
   *
   * @default undefined
   */
  readonly accepts: IAccepts | Array<{
    readonly value: string,
    readonly type: AnyTypeKey | KeywordTypeKey | BasicTypeKeys,
    readonly description?: IDescription | string | undefined;
  }>;

  /**
   * Argument type is equal to value of 'parameter'
   */
  readonly type: ParameterTypeKey;

}

/* -------------------------------------------- */
/* ARGUMENTS INTERFACE                          */
/* -------------------------------------------- */

export declare type IArguments = ArgumentsParameter | ArgumentsArgument
