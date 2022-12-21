/* eslint-disable no-use-before-define */

import { Templates, Pattern, References } from './shared';
import { Types } from './types';
import { Type } from '../utils/enums';

export declare interface Value {
  /**
   * Description
   *
   * An optional desciption for the value to be shown
   * in hovers and completions.
   */
  readonly description?: string;
  /**
   * Deprecated
   *
   * Whether the argument is deprecated or not
   */
  readonly deprecated?: boolean;
  /**
   * Template
   *
   * A template scope id. when provided, values will only
   * appear in completions when used within a specific
   * template (file) that matches the basename + extension URI
   * supplied here.
   *
   * This is mostly a Shopify variation specific, typically this
   * can be omitted.
   *
   * @default undefined
   */
  readonly template?: Templates | Templates[] | undefined;
  /**
   * Value
   *
   * A pre-defined argument value, can be a string or
   * an array of strings (when multiple values occur)
   */
  readonly value: string | string[]
}

export declare interface Parameter {
  /**
   * The type value the parameter accepts. When a parameter is a keyword type,
   * ie: no colon operator then assert the _keyword_ type (enum `10`) and omit
   * the `value` property. If type is set to `keyword` and a value exists, those
   * entries will be ignored.
   */
  readonly type: Type | Types.Basic | 'keyword'
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
  readonly value?: string | string[] | Value[]
}

export declare interface ArgumentParameter extends Omit<Parameter, 'type' | 'value'> {
  /**
   * Type
   *
   * Argument type is equal to value of 'parameter'
   */
  readonly type: 'parameter'

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
   * Seperator
   *
   * When the parameter should be proceeded by a seperator character.
   * When `undefined` the parser will assume `whitespace` depending on whether
   * it knows about the tag or filter.
   *
   * - `44` OR `,`
   * - `10` OR `\n`
   * - `61` or `=`
   *
   * @default NaN
   */
  readonly separator?: 44 | 10 | 61
  /**
   * Value
   *
   * The parameters available to the argument. If the parameter has no
   * known values, or can accept a custom parameter not known to the spec,
   * then pass the expected type.
   *
   * For example, the `t` (translation filter) in the Shopify variation
   * accepts _any_ type parameter values, by passing a basic _string_ type
   * enum to `value` will suffice.
   *
   * The parser will validate the character sequence and intercepts value types,
   * and accept any parameter name that is a alpha-numeric combination.
   */
  readonly value: Types.Basic | { [parameter: string]: Parameter }
}

export declare interface Argument {
  /**
   * Type
   *
   * Argument type is equal to value of 'parameter'
   */
  readonly type: Type | Types.Basic | Types.Argument
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
   * Strict
   *
   * Whether the argument values can loosely matched, meaning
   * that addition values that are not otherwise provided can
   * be defined as long as the value matches the `type` provided.
   *
   * When `undefined` the parser will assume `true`
   *
   * @default true
   */
  readonly strict?: boolean;
  /**
   * Required
   *
   * Whether the argument is required or optional. When an argument
   * is _required_ and it is not expressed a parse error occurs.
   *
   * When `undefined` the parser will assume `false`
   *
   * @default true
   */
  readonly required?: boolean;
  /**
   * Deprecated
   *
   * Whether the argument is deprecated or not
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * Seperator
   *
   * When the parameter should be proceeded by a seperator character.
   * When `undefined` the parser will assume `whitespace` depending on whether
   * it knows about the tag or filter.
   *
   * - `44` OR `comma`
   * - `10` OR `newline`
   * - `61` or `equals`
   *
   * @default NaN
   */
  readonly separator?: 44 | 10 | 61
  /**
   * Description
   *
   * Description of argument which will be rendered in
   * completions, hovers or signatures of the Language Server.
   *
   * @default undefined
   */
  readonly description?: string | undefined;
  /**
   * Reference
   *
   * Documentation reference to this argument
   *
   * @default undefined
   */
  readonly reference?: References | undefined;
  /**
   * Template
   *
   * Template name scopes arguments are in which this argument
   * can be used and displayed. This is mostly a Shopify variation
   * specific option.
   *
   * @default undefined
   */
  readonly template?: Templates | Templates[] | undefined;
  /**
   * Value
   *
   * The argument value can be pre-defined or user defined.
   * When a `value` is supplied, it will be provided to completions.
   * Values can be expressed in different forms and structures. The query
   * engine will match certain argument sequences.
   *
   * **PAIR SEQUENCES**
   *
   * Pair arguments can be inferred and occur when 2 (or more) entries exist on
   * the `arguments` array list property available on filters or tags. When an
   * argument item `value` uses an object `{}` type and the previous argument item
   * in the list uses an array `value` type then the properties of the object
   * type can reference the values, for example:
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
   * `value` defined at index `0` is being reference in the `value` defined at
   * index `1`. We asserted a _loose_ match, so if `foo` or `bar` are provided
   * as an argument in the tag, then the values supplied in index `1` must follow,
   * but if `baz` was provided, it does not require pairing.
   *
   * Using the above example:
   *
   * ```js
   *
   * // VALID
   *
   * // foo was supplied
   * {% some_tag xxx 'foo', quux, param: 'some-value' %}
   *
   * // bar was supplied
   * {% some_tag xxx 'bar', grault.graply, param: 'loose' %}
   *
   * // baz was supplied
   * {% some_tag xxx 'baz', param: 'another-value' %}
   *
   * // INVALID
   *
   * // foo only accepts 'quux' and param must be a string
   * {% some_tag xxx 'foo', quuz.corge, param: 100 %}
   *
   * // bar is missing a pair value
   * {% some_tag xxx 'bar', param: 'some-value' %}
   *
   * // baz does not accept pair matches and param must be a string
   * {% some_tag xxx 'baz', quux,  param: true %}
   *
   * ```
   */
  readonly value?: string | string[] | Value[] | { [argument: string]: Value[] }
}

export declare type Arguments = Array<Argument | ArgumentParameter>
