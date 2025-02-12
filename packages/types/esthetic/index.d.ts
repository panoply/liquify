/* eslint-disable no-redeclare */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */

import { Events } from './types/events';
import { Hooks } from './types/hooks';
import * as Æ from './types/index';
import {
  LiquidFormat,
  HTMLFormat,
  CSSFormat,
  JSONFormat,
  XMLFormat
} from './types/misc/specifics';

declare namespace Æsthetic {

  interface Static {
    /**
     * #### _ÆSTHETIC ~ Rule Presets_
     *
     * Rule defintions which describe the different formatting options
     * esthetic offers.
     */
    preset: {
      /**
       * Immutable rule preset merging. Returns a preset with provided
       * rules in isolation. The ruleset returns will not be persisted
       * or applied, that is left up to you.
       */
      (id: Æ.RulePresetNames, rules: Rules): Rules;
      /**
       *
       * 👎 **default**
       *
       * This is the default and the most unobtrusive. Formatting will use a preservational
       * based technique with this preset mode.
       */
      get default(): Rules;
      /*
       * 👍 **recommended**
       *
       * This style guide is typically suited for most cases, it will apply a base set of
       * rules aligned with the Æsthetic approach.
       */
      get recommended(): Rules;
      /*
       * 👍 **strict**
       *
       * This is a strict ruleset curated by the projects author [Panoply](https://github.com/panoply).
       */
      get strict(): Rules;
      /*
       * 👍 **warrington**
       *
       * This style guide preset is best suited for developers and specifically teams working with
       * Shopify themes. The preset was curated by the talented [David Warrington](https://ellodave.dev/).
       */
      get warrington(): Rules;
      /*
       * 🤡 **prettier**
       *
       * Replicates the Prettier style of formatting. If you've used the Shopify Liquid Prettier Plugin and
       * enjoy that beautification style using this preset will produce the same results.
       *
       */
      get prettier(): Rules;
    };
    /**
     * #### _ÆSTHETIC ~ Rule Defintions_
     *
     * Rule defintions which describe the different formatting options
     * esthetic offers.
     */
    get definitions(): Æ.Definitions;
    /**
     * #### _ÆSTHETIC ~ Statistics_
     *
     * Maintains a reference of statistical information about the executed
     * operation, also available in events like `esthetic.on('format')` and
     * `esthetic.on('parse')` arguments.
     */
    get stats(): Æ.Stats;
    /**
     * #### _ÆSTHETIC ~ Parse Table_
     *
     * Returns the current Parse Table data~structure. You can only call this
     * in a post beautification or parse cycle.
     */
    get table(): Æ.Data;
    /**
     * #### _ÆSTHETIC ~ Parse Error_
     *
     * Returns the the Parse Error or `null` if no error
     */
    get error(): Æ.IParseError;
    /**
     * #### _Æsthetic Liquid_
     *
     * Formatting for the Liquid Template Language.
     */
    liquid: LiquidFormat;
    /**
     * #### _Æsthetic HTML_
     *
     * Formatting for the HTML Language.
     */
    html: HTMLFormat;
    /**
     * #### _Æsthetic XML_
     *
     * Formatting for the XML Language.
     */
    xml: XMLFormat;
    /**
     * #### _Æsthetic CSS_
     *
     * Formatting for the CSS Language.
     */
    css: CSSFormat
    /**
     * #### _Æsthetic JSON_
     *
     * Formatting for the JSON Language.
     */
    json: JSONFormat;
    /**
     * #### _Æsthetic JavaScript_
     *
     * **⚠️ EXPERIMENTAL ⚠️**
     *
     * Formatting for the JavaScript Language.
     */
    js: LiquidFormat;
    /**
     * #### _Æsthetic TypeScript_
     *
     * **⚠️ EXPERIMENTAL ⚠️**
     *
     * Formatting for the TypeScript Language.
     */
    ts: LiquidFormat;
    /**
     * #### _ÆSTHETIC_
     *
     * **Format**
     *
     * Æsthetic supports multiple languages but one should use
     * the experimental languages with caution until they are
     * out of BETA with full support.
     *
     * Full Support:
     *
     * - Liquid
     * - HTML
     * - XML
     * - CSS
     * - SCSS
     * - JSON
     *
     * Partial Support:
     *
     * - JavaScript
     * - TypeScript
     * - JSX
     * - TSX
     * ---
     *
     * @example
     *
     * import esthetic from 'esthetic';
     *
     * const output = esthetic.format('<div id="foo"> Hello World </div>', {
     *   language: 'html',
     *   markup: {
     *     forceAttribute: true
     *   }
     * });
     *
     * console.log(output);
     *
     */
    format: (source: string | Buffer, rules?: Æ.Rules) => string;

    /**
     * #### _ÆSTHETIC_
     *
     * **Parse**
     *
     * Executes a parse operation and returns the generate data structure.
     * When calling this method, beautification will not be applied, the
     * parse table is returned.
     *
     * The `esthetic.format()` method will execute a parse, so only use this
     * method when you are working with the parse table itself, otherwise use
     * `esthetic.format()` or one of the language specifics.
     *
     * ---
     *
     * **NOTE**
     *
     * You cannot pass rules, use the `esthetic.rules({})` method instead.
     *
     * ---
     *
     * @example
     *
     * import esthetic from 'esthetic';
     *
     * const æ = esthetic.parse('<div id="foo"> Hello World </div>');
     *
     * // Parse Table
     *
     * æ.data.begin[]
     * æ.data.ender[]
     * æ.data.lexer[]
     * æ.data.lines[]
     * æ.data.stack[]
     * æ.data.token[]
     * æ.data.types[]
     *
     * // Traverse Table
     *
     * æ.traverse(function(record, index) {
     *
     *  this.getRange(index)    // => Range;
     *  this.getPosition(index) // => Position;
     *
     * });
     *
     */
    parse: (source: string | Buffer) => {
      /**
       * Returns the parse table data~structure
       */
      get data(): Æ.Data;
      /**
       * Returns the parse table data~structure
       */
      traverse(
        callback: (
          this: {
            getRange(record: Æ.Record | number): {
              start: {
                col: number;
                line: number;
              },
              end: {
                col: number;
                line: number;
              }
            },
            getPosition(record: Æ.Record | number): {
              col: number;
              line: number;
            }
          },
          record: Æ.Record,
          index: number
        ) => void
      ): void;
    }
    /**
     * #### _ÆSTHETIC_
     *
     * **Lines**
     *
     * The line numbers according to parse table record indexes. This is an isolated
     * reference and is used in logs, reports and parse operations.
     *
     * @example
     *
     * // Take the following data structure
     * [
     *  { begin: -1, ender: 1, lexer: 'markup', }, // etc
     *  { begin: -1, ender: 1, lexer: 'markup', }, // etc
     * ]
     *
     * // The lines reference will be as followed, assuming
     * // index 0 and index 1 ae on the same line
     * [
     *   1,
     *   1
     * ]
     */
    lines: number[]

    /**
     * #### _ÆSTHETIC_
     *
     * Events
     *
     * Event Listener which invokes on different operations.
     */
    on: Events<Pick<Static, | 'on'| 'parse'| 'format'>>;

    /**
     * #### _ÆSTHETIC_
     *
     * Hooks
     *
     * Hook into the parse and beatification operations. Hooks allow you to
     * refine output and control different logic during execution cycles.
     */
    hook: Hooks<Pick<Static, | 'on'| 'parse'| 'format'>>;

    /**
     * #### _ÆSTHETIC_
     *
     * Settings
     *
     * Control the execution behaviour of Æsthetic. Options exposed in this method
     * allow you to refine operations.
     *
     * To return the configuration settings currently applied along with addition
     * reference applied internally, then do no provide a parameter.
     */
    settings: {
      /**
       * Returns the current configuration options with additional internal references
       */
      (): Required<Æ.IConfigInternal>;
      /**
       * Customise the execution behaviour. Please ensure that you pass this method
       * before using `esthetic.format` or `esthetic.parse`, for example:
       *
       * ```js
       * import esthetic from 'esthetic';
       *
       * esthetic.config({
       *   persistRules: false,
       *   reportStats: false
       *   // etc etc
       * })
       *
       * esthetic.format('...')
       *
       * // Alternatively, you can chain:
       *
       * esthetic.settings({}).format('')
       * ```
       */
      (options: Æ.ISettings): Pick<Static, | 'on' | 'grammar' | 'rules' | 'hook' | 'parse' | 'format'>;
    };

    /**
     * #### _ÆSTHETIC RULES_
     *
     * Set format rules to be applied to syntax. Use this method if you are executing
     * repeated runs and do not require Æsthetic to validate rules for every cycle.
     *
     * To return the current beautification rules, then do not provide a parameter.
     */
    rules: {
      /**
       * Returns the current rulesets Æsthetic is using.
       */
      (): Æ.Rules;
      /**
       * Update the current rules.
       */
      (rules: Rules): Pick<Static, 'on'| 'parse'| 'format'>;
    };

    /**
     * #### _ÆSTHETIC GRAMMAR_
     *
     * Extend built-in grammar references. By default, Æsthetics supports all current
     * specification standards.
     *
     * This is helpful when you need to provide additional context and handling
     * in languages like Liquid, but you can also extend the core languages like CSS.
     *
     * To return the current grammar presets, then do not provide a parameter.
     */
    grammar: {
      /**
       * Returns the current grammar references
       */
      (): Æ.Grammars;
      /**
       * Extend the current grammar references
       */
      (grammar: Æ.Grammars): Pick<Static, 'on' | 'hook' | 'rules' | 'parse' | 'format'>
    };

    /**
     * #### _ÆSTHETIC_
     *
     * Language Detection
     *
     * Automatic language detection based on the string input.
     * Returns lexer, language and official name.
     */
    detect: (sample: string) => Æ.Language;
  }

  /**
   * #### _ÆSTHETIC_
   *
   * **Settings (Type)**
   *
   * Type export of the execution configuration options which is available
   * via the `esthetic.config(configuration)` method.
   */
  type Settings = Æ.ISettings;

  /**
   * #### _ÆSTHETIC_
   *
   * **Stats (Type)**
   *
   * Type export of Statistics return value which is available via
   * the `esthetic.stats` getter method.
   */
  type Stats = Æ.Stats;

  /**
   * #### _ÆSTHETIC_
   *
   * Global Rules (Type)
   *
   * Type export of Global Formatting Rules. These rules are used
   * for every supported language.
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules)
   */
  type Rules = Æ.Rules;

  /**
   * #### _ÆSTHETIC_
   *
   * **Global Rules (Type)**
   *
   * Type export of Global Formatting Rules. These rules are used
   * for every supported language.
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#global)
   */
  type GlobalRules = Æ.GlobalRules;
  /**
   * #### _ÆSTHETIC_
   *
   * **Liquid Rules (Type)**
   *
   * Type export of Liquid Formatting Rules. These rules are specific
   * to the Liquid Language.
   *
   * - Liquid Template Language
   * - HTML
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#liquid)
   */
  type LiquidRules = Æ.LiquidRules;
  /**
   * #### _ÆSTHETIC_
   *
   * **Markup Rules (Type)**
   *
   * Type export of Markup Formatting Rules. These rules are specific
   * to the HTML, XML, Liquid and other Languages which use Markup.
   *
   * - HTML
   * - XHTML
   * - XML
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#markup)
   */
  type MarkupRules = Æ.MarkupRules;
  /**
   * #### _ÆSTHETIC_
   *
   * **Script Rules (Type)**
   *
   * Type export of Script Formatting Rules. These rules are specific
   * to the JavaScript, TypeScript, JSX, TSX and other Languages which use Scripts.
   *
   * - JavaScript
   * - TypeScript
   * - JSX
   * - TSX
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#script)
   */
  type ScriptRules = Æ.ScriptRules;
  /**
   * #### _ÆSTHETIC_
   *
   * Style Rules (Type)
   *
   * Type export of Style Formatting Rules. These rules are specific
   * to the CSS, SCSS  and other Languages which use Styles.
   *
   * - CSS
   * - SCSS
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#style)
   */
  type StyleRules = Æ.StyleRules;
  /**
   * #### _ÆSTHETIC_
   *
   * JSON Rules (Type)
   *
   * Type export of JSON Formatting Rules. These rules are specific
   * to the JSON language.
   *
   * - JSON
   * - JSONC
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#style)
   */
  type JSONRules = Æ.JSONRules;
  /**
   * #### _ÆSTHETIC_
   *
   * **Language Name (Type)**
   *
   * Type export of lowercase Language names used for determining
   * the language Æsthetic is handling. This is the Type used via
   * the global rules `language` option.
   *
   * The type is a Literal Union and leveraged in CLI and reportings.
   */
  type LanguageName = Æ.LanguageName;
  /**
   * #### _ÆSTHETIC_
   *
   * **Official Language Names (Type)**
   *
   * Type export of the official Language names, for example, if the
   * the Language name is `liquid` then the official is `Liquid` (with)
   * a captial `L`.
   *
   * The type is a Literal Union and leveraged in CLI and reportings.
   *
   * ---
   *
   * [Æsthetic Docs](https://aesthetic.js.org/rules#style)
   */
  type LanguageOfficialName = Æ.LanguageOfficialName;
  /**
   * #### _ÆSTHETIC_
   *
   * **Lexer Names (Type)**
   *
   * Type export of the lexer names. This is mostly an internal option but has
   * been exposed here for API usage. The **Lexer** name is any one of these 6:
   *
   * ---
   *
   * `auto`
   *
   *  _Automatic Detection of Lexer and Language_
   *
   * `text`
   *
   *  _Used for Plain Text_
   *
   * `markup`
   *
   * _Used for HTML, XML, Liquid_
   *
   * `style`
   *
   * _Used for CSS and SCSS_
   *
   * `script`
   *
   * _Used for JavaScript, TypeScript, JSON_
   *
   * `ignore`
   *
   * _Used to ignore a language or region_
   *
   */
  type LexerName = Æ.LexerName;
  /**
   * #### _ÆSTHETIC_
   *
   * **Parse Hook (Type)**
   *
   * Type export of Parse hooks function events.
   *
   */
  type ParseHook = Æ.ParseHook;
  /**
   * #### _ÆSTHETIC_
   *
   * **Parse Table Record (Type)**
   *
   * Type export of the data structure (parse table) records.
   *
   */
  type Record = Æ.Record;
  /**
   * #### _ÆSTHETIC_
   *
   * **Parse Table (Type)**
   *
   * Type export of the data structure Parse Table.
   *
   */
  type ParseTable = Æ.Data;
  /**
   * #### _ÆSTHETIC_
   *
   * **Æsthetic Grammar (Type)**
   *
   * Type export of Grammars method parameter.
   */
  type Grammar = Æ.Grammars;
  /**
   * #### _ÆSTHETIC_
   *
   * **Parse Error (Type)**
   *
   * Type export of the Parse Error Model which is provided and returned
   * by the `esthetic.error` getter.
   */
  type ParseError = Æ.IParseError;
}

declare global {

  interface Window {
    /**
     * #### _ÆSTHETIC_
     *
     * Syntactical code beautification leveraging the Sparser algorithm.
     */
    get esthetic(): Æsthetic.Static
  }

  /**
   * #### _ÆSTHETIC_
   *
   * Syntactical code beautification leveraging the Sparser algorithm.
   */
  export const esthetic: Æsthetic.Static;

}

/**
 * #### _ÆSTHETIC_
 *
 * Syntactical code beautification leveraging the Sparser algorithm.
 */
declare const Æsthetic: Æsthetic.Static;

export = Æsthetic
