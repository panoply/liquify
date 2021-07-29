import { SharedOptions, SharedEnforced } from './shared'

/**
 * Enforced JSON Formatting Rules
 *
 * These rulesets are enforced for the JSON language
 * in order to prevent any errors occuring while a format
 * is being executed. These are internally used types,
 * they will not be provided on the public export
 */
export interface JSONEnforced extends SharedEnforced {

  readonly language_name: 'JSON',
  readonly language: 'json',
  readonly language_default: 'json';
  readonly lexer: 'script',

  /**
   * **Former Rule**
   *
   * `no_semicolon`
   *
   * **Description**
   *
   * Removes semicolons that would be inserted by ASI.
   * This option is in conflict with option `correct` and takes
   * precedence over conflicting features. Use of this option is
   * a possible security/stability risk.
   *
   */
  readonly noSemicolon: true,

  /**
   * We are asserting a `no_semicolon` rule set in JSON, this should
   * never be true to avoid conflicting errors.
   *
   * ---
   *
   * **Former Rule**
   *
   * `correct`
   *
   * **Description**
   *
   * Automatically correct some sloppiness in code
   */
  readonly attemptCorrection: false

  /**
   * We will enforce double quotes in JSON language as single quotes are
   * invalid and if we leave it default, this would allow single quotes and
   * wreak havoc.
   *
   * ---
   *
   * **Former Rule**
   *
   * `quote_convert`
   *
   * **Description**
   *
   * If the quotes of markup attributes should be converted to single quotes
   * or double quotes.
   *
   *
   */
  readonly quoteConvert: 'double'

  /**
   * We **NEVER** want to apply end commas in JSON because it is
   * results in invalid syntax.
   *
   * ---
   *
   * **Former Rule**
   *
   * `end_comma`
   *
   * **Description**
   *
   * If there should be a trailing comma in arrays and objects.
   * Value "multiline" only applies to modes beautify and diff.
   * always — Always ensure there is a tailing comma._
   *
   * **Options**
   *
   * - `always` Always ensure there is a tailing comma
   * - `never` Remove trailing commas
   * - `none` Ignore this option
   *
   */
  readonly endComma: 'never'

  /**
   * We will ignore the `braceStyle` option because its just sugar. It will
   * re-assign options to align with JS Beautify standards, which is fine
   * but its better the have the user _explicitly_ define the options. We
   * will enforce this option to `none`
   *
   * ---
   *
   * **Description**
   *
   * > Emulates JSBeautify's brace_style option using existing
   * Pretty Diff options._
   *
   * **Options**
   *
   * `collapse`
   * > Sets `format_object` to `indent` and `neverflatten` to `true`.
   *
   * `collapse-preserve-inline`
   * > Sets `brace_padding` to true and `format_object` to `inline`.
   *
   * `expand`
   * > Sets `braces` to `true`, `format_object` to `indent`, and
   * and `neverflatten` to `true`
   *
   * `none`
   * > Ignores this option
   */
  readonly braceStyle: 'none',

}

export interface IJSONOptions extends SharedOptions {
  /**
   * This option will alphabetically sort object properties in JSON objects.
   *
   * ---
   * **Description**
   *
   * Sorts markup attributes and properties by key name in script and style
   *
   * @default false
   */
  objectSort: boolean

  /**
   * This option will determine how arrays cotained on objects will
   * be formatted.
   *
   * ---
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true` and each
   * object in the array starts on a newline.
   *
   * ```json
   * {
   *    "array": [
   *      {
   *        "name": "foo"
   *      },
   *      {
   *        "name": "bar"
   *      },
   *      {
   *        "name": "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false` and
   * each object in the array starts curly braces inline.
   *
   * ```json
   * {
   *    "array": [
   *      {
   *        "name": "foo"
   *      }, {
   *        "name": "bar"
   *      }, {
   *        "name": "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * Determines if opening curly braces will exist on
   * the same line as their condition or be forced onto a new line.
   * (Allman style indentation).
   *
   */
  braceAllman: boolean,

  /**
   * This will create a newline before and after objects values, for example:
   *
   * ---
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```json
   * {
   *
   *  "foo": {
   *
   *   "bar": {
   *      "baz": 0
   *    }
   *
   *   }
   *
   * }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false`
   *
   * ```json
   * {
   *  "foo": {
   *   "bar": {
   *      "baz": 0
   *    }
   *   }
   * }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * If true an empty line will be inserted after opening curly braces
   * and before closing curly braces.
   *
   */
  bracePadding: boolean,

  /**
   * Controls how arrays on objects are formatted.
   *
   * ---
   *
   * **Description**
   *
   * Determines if all array indexes should be indented, never indented,
   * or left to the default._
   *
   * **Options**
   *
   * - `default`
   *  Default formatting (**Selected**)
   *
   * - `indent`
   *  "Always indent each index of an array
   *
   * - `inline`
   *  Ensure all array indexes appear on a single line
   *
   * @default 'default'
   */
  arrayFormat: 'default' | 'indent' | 'inline',

  /**
   * Controls how arrays on objects are formatted. We will exclude
   * the `inline` option to prevent unreadable objects.
   *
   * ---
   *
   * **Description**
   *
   * Determines if all object keys should be indented, never indented,
   * or left to the default._
   *
   * **Options**
   *
   * > `default` (**Selected**)
   *  Default formatting
   *
   * > `indent`
   *  "Always indent each index of an array
   *
   * > `inline` (**Disabled**)
   *  Ensure all array indexes appear on a single line
   *
   * @default 'default'
   */
  objectIndent: 'default' | 'indent',
}
