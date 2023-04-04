/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */

import { Events } from './types/events';
import { Hooks } from './types/hooks';

import {
  LiquidFormat,
  HTMLFormat,
  CSSFormat,
  JSONFormat,
  XMLFormat
} from './types/misc/specifics';

import {
  Rules,
  Definitions,
  Language,
  Grammars,
  Stats,
  IParseError,
  IConfig,
  IConfigInternal,
  Data
} from './types/index';

export {
  Definition,
  Definitions,
  Rules,
  GlobalRules,
  LiquidRules,
  MarkupRules,
  ScriptRules,
  StyleRules,
  JSONRules,
  Language,
  LanguageName,
  LanguageOfficialName,
  LexerName,
  Record,
  ParseHook,
  Data as ParseTable
} from './types/index';

export declare const esthetic: {
  /**
   * **Æsthetic Liquid**
   *
   * Formatting for the Liquid Template Language.
   */
  liquid: LiquidFormat;
  /**
   * **Æsthetic HTML**
   *
   * Formatting for the HTML Language.
   */
  html: HTMLFormat;
  /**
   * **Æsthetic XML**
   *
   * Formatting for the XML Language.
   */
  xml: XMLFormat;
  /**
   * **Æsthetic CSS**
   *
   * Formatting for the CSS Language.
   */
  css: CSSFormat
  /**
   * **Æsthetic JSON**
   *
   * Formatting for the JSON Language.
   */
  json: JSONFormat;
  /**
   * **Æsthetic JavaScript (BETA)**
   *
   * Formatting for the JavaScript Language.
   */
  js: LiquidFormat;
  /**
   * **Æsthetic TypeScript (BETA)**
   *
   * Formatting for the TypeScript Language.
   */
  ts: LiquidFormat;
  /**
   * **Æsthetic ~ Rule Defintions**
   *
   * Rule defintions which describe the different formatting options
   * esthetic offers.
   */
  get definitions(): Definitions;
  /**
   * **Æsthetic ~ Statistics**
   *
   * Maintains a reference of statistic information about the
   * operation, also available in events like `esthetic.on('format')` and
   * `esthetic.on('parse')` arguments.
   */
  get stats(): Stats;
  /**
   * **Æsthetic ~ Parse Table**
   *
   * Returns the current Parse Table data~structure. You can only call this
   * in a post beautification or parse cycle.
   */
  get table(): Data;
  /**
   * **Æsthetic ~ Parse Error**
   *
   * Returns the the Parse Error or `null` if no error
   */
  get error(): IParseError;

  /**
   * **Æsthetic ~ Format**
   *
   * Formatting Support:
   *
   * - Liquid
   * - HTML
   * - XML
   * - CSS
   * - SCSS
   * - JSON
   * - JavaScript ~ _use with caution_
   * - TypeScript ~ _use with caution_
   * - JSX
   * - TSX
   */
  format: (source: string | Buffer, rules?: Rules) => string;

  /**
   * **Æsthetic Parse**
   *
   * Executes a parse operation and returns the generate data structure.
   * When calling this method, beautification will not be applied, the
   * parse table is returned.
   *
   * The `esthetic.format()` method will execute a parse, so only use this
   * method when you are working with the parse table itself, otherwise use
   * `format` or one of the language specifics.
   *
   * ---
   *
   * **NOTE**
   *
   * You cannot pass rules, use the `esthetic.rules({})` method instead.
   */
  parse: (source: string | Buffer) => Data

  /**
   * **Æsthetic ~ Events**
   *
   * Event Listener which invokes on different operations.
   */
  on: Events<Pick<typeof esthetic, 'on' | 'parse' | 'format'>>;

  /**
   * **Æsthetic ~ Hooks**
   *
   * Hook into the parse and beatification operations. Hooks allow you to
   * refine output and control different logic during execution cycles.
   */
  hook: Hooks<Pick<typeof esthetic, 'on' | 'parse' | 'format'>>;

  /**
   * **Æsthetic ~ Configuration**
   *
   * Control the execution behaviour of Æsthetic. Options exposed in this method
   * allow you to refine operations.
   *
   * To return the configuration settings currently applied along with addition
   * reference applied internally, then do no provide a parameter.
   */
  config: {
    (options: IConfig): Pick<typeof esthetic, 'on' | 'grammar' | 'rules' | 'hook' | 'parse' | 'format'>
    (): IConfigInternal;
  }

  /**
   * **Æsthetic ~ Rules**
   *
   * Set format rules to be applied to syntax. Use this method if you are executing
   * repeated runs and do not require Æsthetic to validate rules for every cycle.
   *
   * To return the current beautification rules, then do not provide a parameter.
   */
  rules: {
    (rules: Rules): Pick<typeof esthetic, 'on'| 'parse'| 'format'>
    (): Rules
  }

  /**
   * **Æsthetic ~ Grammar**
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
    (grammar: Grammars): Pick<typeof esthetic, 'on' | 'hook' | 'rules' | 'parse' | 'format'>
    (): Grammars;
  }

  /**
   * **Æsthetic ~ Language Detection**
   *
   * Automatic language detection based on the string input.
   * Returns lexer, language and official name.
   */
  detect: (sample: string) => Language;

};

export default esthetic;
