import { SharedOptions, SharedEnforced } from './shared'

/**
 * Enforced CSS and SCSS Formatting Rules
 *
 * These rulesets are enforced for CSS and SCSS languages
 * in order to prevent any errors occuring while a format
 * is being executed.
 */
export interface StyleEnforced extends SharedEnforced {

  readonly language_name: 'CSS/Liquid',
  readonly language: 'css',
  readonly language_default: 'css';
  readonly lexer: 'style',

  /**
   * We will enforce this option to true in CSS, we want the CSS
   * to be clear, this option complicates readability.
   *
   * ---
   *
   * **Description**
   *
   * If CSS should be beautified in a style where the properties and
   * values are minifed for faster reading of selectors.
   */
  readonly compressedCSS: false,


}

export interface IStyleOptions extends SharedOptions {

  /**
   * This option will alphabetically sort CSS properties contained
   * within classes.
   *
   * ---
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true` first
   * and how a class would be formatted.
   *
   * Before:
   *
   * ```css
   * .class {
   *   width: 100px;
   *   color: blue;
   *   background: pink;
   * }
   * ```
   *
   * After:
   *
   * ```css
   * .class {
   *   background: pink;
   *   color: blue;
   *   width: 100px;
   * }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * Sorts markup attributes and properties by key name in script and style
   *
   * @default false
   */
  objectSort: boolean

  /**
   * **Enabled**
   *
   * Below is an example when this option is set to `true` and the
   * class braces be positioned onto a newline.
   *
   * Before:
   *
   * ```css
   * .class
   * {
   *   width: 100px;
   *   color: blue;
   *   background: pink;
   * }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false` which
   * is the default.
   *
   * ```css
   * .class {
   *   width: 100px;
   *   color: blue;
   *   background: pink;
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
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```css
   * .class-a { width: 100px; }
   * .class-b { width: 100px; }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false` notice
   * the newline between classes
   *
   * ```css
   * .class-a { width: 100px; }
   * .class-b { width: 100px; }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * Inserts new line characters between every CSS code block.
   *
   * @default false
   */
  classPadding: boolean,

  /**
   * This will eliminate leading zeros from numbers expressed
   * within values.
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```css
   * .class { width: .10rem; }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false`
   *
   * ```css
   * .class-a { width: 0.10rem; }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * Inserts new line characters between every CSS code block.
   *
   * @default false
   */
  noLeadZero: boolean;

  /**
   * **Description**
   *
   * If the quotes of markup attributes should be converted to single quotes
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


