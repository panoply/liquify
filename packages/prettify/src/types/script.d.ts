import { SharedOptions, SharedEnforced } from './shared';

/**
 * Enforced CSS and SCSS Formatting Rules
 *
 * These rulesets are enforced for CSS and SCSS languages
 * in order to prevent any errors occuring while a format
 * is being executed.
 */
export interface ScriptEnforced extends SharedEnforced {

  readonly language_name: 'JavaScript/Liquid',
  readonly language: 'javascript',
  readonly language_default: 'javascript';
  readonly lexer: 'script',

}

export interface IScriptOptions extends SharedOptions {

   /**
   * **Description**
   *
   * Removes semicolons that would be inserted by ASI.
   * This option is in conflict with option `correct` and takes
   * precedence over conflicting features. Use of this option is
   * a possible security/stability risk.
   */
  noSemicolon: boolean,

  /**
   * **Description**
   *
   * Automatically correct some sloppiness in code
   */
  attemptCorrection: boolean

  /**
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
  endComma: 'none' | 'always' | 'never'

  /**
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
  braceStyle: 'none' | 'collapse' | 'collapse-preserve-inline' | 'expand',

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
   * ```javascript
   * const obj = {
   *    array: [
   *      {
   *        name: "foo"
   *      },
   *      {
   *        name: "bar"
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
   * ```javascript
   * const obj = {
   *    array: [
   *      {
   *        name: "foo"
   *      }, {
   *        name: "bar"
   *      }, {
   *        name: "baz"
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
   * ```javascript
   * const obj = {
   *
   *  foo: {
   *
   *   bar: {
   *      baz: 0
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
   * ```javascript
   * const obj = {
   *  foo: {
   *   bar: {
   *      baz: 0
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

  /**
   * **Description**
   *
   * If a blank new line should be forced above comments.
   *
   * @default false
   */
  commentNewline: boolean

  /**
   * **Description**
   *
   * This will determine whether comments should always start at position
   * `0` of each line or if comments should be indented according to the code.
   *
   * @default false
   */
  commentIndent: boolean

  /**
   * **Description**
   *
   * Prevent comment reformatting due to option wrap.
   *
   * @default true
   */
  preserveComment: boolean,

  /**
   * **Description**
   *
   * If text in the provided markup code should be preserved exactly as provided.
   * This option eliminates beautification and wrapping of text content.
   *
   * @default false
   */
  preserveText: boolean,

  /**
   * **Description**
   *
   * If true an empty line will be inserted after opening curly braces
   * and before closing curly braces.
   *
   * @default false
   */
  braceNewline: boolean,

  /**
   * **Description**
   *
   * If the colon separating a case's expression (of a switch/case block)
   * from its statement should be followed by a space instead of indentation,
   * thereby keeping the case on a single line of code.
   */
  caseSpace: boolean,

  /**
   * **Description**
   *
   * If else_line is true then the keyword 'else' is
   * forced onto a new line.
   */
  elseNewline: boolean,

  /**
   * **Description**
   *
   * If a space should follow a JavaScript function name.
   */
  functionNameSpace: boolean,

  /**
   * **Description**
   *
   * Inserts a space following the function keyword for anonymous functions.
   */
  functionSpace: boolean,

  /**
   * **Description**
   *
   * When to break consecutively chained methods and properties onto
   * separate lines. A negative value disables this option. A value of 0
   * ensures method chainsare never broken.
   */
  methodChain: number,

  /**
   * **Description**
   *
   * If destructured lists in script should never be flattend.
   */
  neverFlatten: boolean,

  /**
   * **Description**
   *
   * If the colon separating a case's expression (of a switch/case block)
   * from its statement should be followed by a space instead of indentation,
   * thereby keeping the case on a single line of code.
   */
  noCaseIndent: boolean,

  /**
   * **Description**
   *
   * If true and mode is 'diff' and lang is 'javascript' all semicolon characters
   * that immediately precede any white space containing a new line character
   * will be removed so as to eliminate some differences from the code comparison.
   */
  semicolon: boolean,

  /**
   * **Description**
   *
   * If ternary operators in JavaScript `?` and `:` should remain on the same line.
   */
  ternaryLine: boolean,

  /**
   * **Description**
   *
   * If consecutive JavaScript variables should be merged into a
   * comma separated list or if variables in a list should be separated.
   * each — Ensurce each reference is a single declaration statement.
   */
  variableList: 'none',

  /**
   * **Description**
   *
   * If lists of assignments and properties should be vertically aligned
   */

  vertical: boolean,
  /**
   * **Description**
   *
   * If the quotes of script attributes should be converted to single quotes
   * or double quotes.
   *
   * **Options**
   *
   * - `double` Converts single quotes to double quotes
   * - `none` Ignores this option
   * - `single` Converts double quotes to single quotes
   *
   * ---
   *
   * @default 'none'
   */
  quoteConvert: 'double' | 'single' | 'none'
}
