import { SharedOptions, SharedEnforced } from './shared';

/**
 * Enforced HTML Formatting Rules
 *
 * These rulesets are enforced for the HTML language
 * in order to prevent any errors occuring while a format
 * is being executed. This are not exposed as exports,
 * they are used internally only.
 */
export interface MarkupEnforced extends SharedEnforced {

  readonly languageName: 'HTML/Liquid';
  readonly language: 'html';
  readonly languageDefault: 'html';
  readonly lexer: 'markup';

  /**
   * We want to avoid this at all costs, it should ALWAYS be `false`.
   * It's a legacy rule that will wreak havoc within HTML.
   *
   * ---
   *
   * **Description**
   *
   * Allows immediately adjacement start and end markup tags
   * of the same name to be combined into a single self-closing tag.
   */
  readonly tagMerge: false

  /**
   * We want to avoid this at all costs, it should ALWAYS be `false`.
   * It's attempts to sort tag placements. Its wreaks havoc within HTML.
   *
   * ---
   *
   * **Description**
   *
   * Sort child items of each respective markup parent element.
   */
  readonly tagSort: false

}

/**
 * Markup Formatting Rules
 *
 * These rulesets are enforced for the HTML language
 * in order to prevent any errors occuring while a format
 * is being executed. This are not exposed as exports,
 * they are used internally only.
 */
export interface IMarkupOptions extends SharedOptions {

  /**
   * HTML Attribute sorting. When enabled it will sort attributes
   * alphabetically.
   *
   * ---
   *
   * **Description**
   *
   * Alphanumerically sort markup attributes. Attribute sorting is
   * ignored on tags that contain attributes template attributes.
   *
   * @default false
   */
  attributeSort: boolean

  /**
   * Define a sort list from which attributes should be arranged
   *
   * ---
   *
   *  **Description**
   *
   * A comma separated list of attribute names. Attributes will be sorted according to
   * this list and then alphanumerically. This option requires 'attribute_sort' have
   * a value of true.
   *
   * @default ''
   */
  attributeSortList: string[]

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
   * Markup self-closing tags end will end with `' />'` instead of `'/>'`
   *
   * @default false
   */
  selfCloseSpace: boolean,

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
   * Automatically correct some sloppiness in code
   *
   * @default false
   */
  attemptCorrection: boolean

  /**
   * **Description**
   *
   * If all markup attributes should be indented each onto their own line.
   *
   * @default false
   */
  forceAttribute: boolean

  /**
   * **Description**
   *
   * Will force indentation upon all content and tags without regard for the
   * of new text nodes.
   *
   * @default false
   */
  forceIndent: boolean

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

  /**
   * **Description**
   *
   * If markup tags should have their insides preserved.
   * This option is only available to markup and does not support
   * child tokens that require a different lexer.
   *
   * @default false
   */
  preserveAttributes: boolean

}
