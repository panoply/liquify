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
  readonly description?: string,

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

export interface IParameter {

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
  readonly description?: string | undefined;

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
   * Whether the parameter values can be loosely matched, meaning
   * that addition values that are not otherwise provided can
   * be defined as long as the value matche the `type` provided.
   *
   * When `undefined` the parser will assume `true`
   */
  readonly strict?: boolean;

  /**
   * The parameter value can be pre-defined or user defined.
   * When a value is supplied, it will be provided to completions.
   */
  readonly value?: string | string[] | Values[]

}

export namespace IArgument {

  export interface Parameter {

    /**
     * Argument type is equal to value of 'parameter'
     */
    readonly type: Type.parameter

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
    readonly value: { [parameter: string]: IParameter } | BasicTypeRange

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
     * Values can be expressed as different types but it is important
     * to note that the query engine will match certain argument sequences.
     *
     * **PAIR SEQUENCES**
     *
     * Pair arguments can be inferred occur when 2 (or more) entries exist on
     * the `arguments` array of filters or tags. When an argument `value` is
     * expressed as an _object_, and the previous argument `value` is expressed
     * as an _array_  properties can reference those values, for example:
     *
     * ```js
     * [
     *   {
     *     type: 10, // keyword
     *     required: true, // arugment must be present
     *     value: 'xxx'
     *   },
     *   {
     *     type: 6, // string
     *     required: true, // arugment must be present
     *     value: ['foo', 'bar', 'baz']
     *   },
     *   {
     *     type: 2, // object
     *     required: true, // arugment must be present
     *     strict: false, // infers a loose match ('baz' does need pairing),
     *     seperator: 1, // comma character seperator
     *     value: {
     *       foo: { value: [ 'quux' ] },
     *       bar: { value: [ 'quuz.corge', 'grault.graply' ] },
     *     }
     *   },
     *   {
     *     type: 9, // parameter
     *     required: true, // arugment must be present
     *     seperator: 1, // comma character seperator
     *     value: {
     *       param: {
     *         type: 6,
     *         strict: false, // infers a loose match (accepts additional values),
     *         value: [ 'some-value', 'another-value' ]
     *       },
     *     }
     *   }
     * ]
     *
     * ```
     *
     * In the above example we are inferring a `pair` argument sequence. The
     * `value` defined at index 0 are being reference in the `value` defined at
     * index 1. We asserted a _loose_ match, if `foo` or `bar` are provided
     * as an argument, then the values supplied in index 1 must follow, but if
     * `baz` was provided, it does not require pairing.
     *
     * Using the above example
     *
     * ```js
     *
     * // VALID
     *
     * // foo was supplied
     * {% some_tag xxx 'foo', quux, param: 'some-value'  %}
     *
     * // bar was supplied
     * {% some_tag xxx 'bar', grault.graply, param: 'loose'  %}
     *
     * // baz was supplied
     * {% some_tag xxx 'baz', param: 'another-value' %}
     *
     * // INVALID
     *
     * // foo only accepts 'quux' and param must be a string
     * {% some_tag xxx 'foo', quuz.corge, param: 100  %}
     *
     * // bar is missing a pair value
     * {% some_tag xxx 'bar', param: 'some-value'  %}
     *
     * // baz does not accept pair matches and param must be a string
     * {% some_tag xxx 'baz', quux,  param: true %}
     *
     * ```
     */
    readonly value?: string | string[] | Values[] | { [property: string]: Values[]}

    /**
     * Whether the argument values can loosely matched, meaning
     * that addition values that are not otherwise provided can
     * be defined as long as the value matches the `type` provided.
     *
     * When `undefined` the parser will assume `true`
     */
    readonly strict?: boolean;

    /**
     * Whether the argument is required or optional. When an argument
     * is _required_ and it is not expressed a parse error occurs.
     *
     * When `undefined` the parser will assume `false`
     */
    readonly required?: boolean;

    /**
     * Description of argument which will be rendered in
     * completions, hovers or signatures of the Language Server.
     */
    readonly description?: string | undefined;

    /**
     * Documentation reference to this argument
     */
    readonly reference?: IReferences | undefined;

    /**
     * Template name scopes arguments are in which this argument
     * can be used and displayed. This is mostly a Shopify variation
     * specific option.
     */
    readonly template?: ITemplates | Array<ITemplates> | undefined;

  }

}

export type Arguments = IArgument.Argument | IArgument.Parameter
