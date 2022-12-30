/* eslint-disable object-curly-newline */

import {
  Options,
  Definitions,
  Language,
  Format,
  Parse
} from './types/prettify';

export {
  Definition,
  Definitions,
  Options,
  GlobalOptions,
  MarkupOptions,
  ScriptOptions,
  StyleOptions,
  JSONOptions,
  Language,
  LanguageNames,
  LanguageProperNames,
  LexerNames
} from './types/prettify';

declare const prettify: {
  /**
   * **PRETTIFY 🎀**
   *
   * The new generation beautification tool for Liquid. Async
   * export which resolves a promise.
   *
   * - Liquid + HTML
   * - Liquid + XHTML
   * - Liquid + XML
   * - Liquid + CSS
   * - Liquid + SCSS
   * - Liquid + SASS
   * - Liquid + LESS
   * - Liquid + JavaScript
   * - Liquid + TypeScript
   * - Liquid + JSX
   * - Liquid + TSX
   * - JSON
   */
  format?: Format<Promise<string>>
  /**
   * **PRETTIFY 🎀**
   *
   * The new generation beautification tool for Liquid. Sync
   * export which throws if error.
   *
   * - Liquid + HTML
   * - Liquid + XHTML
   * - Liquid + XML
   * - Liquid + CSS
   * - Liquid + SCSS
   * - Liquid + SASS
   * - Liquid + LESS
   * - Liquid + JavaScript
   * - Liquid + TypeScript
   * - Liquid + JSX
   * - Liquid + TSX
   * - JSON
   */
  formatSync?: Format<string>
  /**
   * **Parse**
   *
   * Returns the Sparser data~structure. Async
   * export which resolves a promise.
   */
  parse?: Parse<string>;
  /**
   * **Parse**
   *
   * Returns the Sparser data~structure. Async
   * export which resolves a promise.
   */
  parseSync?: Parse<Promise<string>>
  /**
   * **Options**
   *
   * Set format options to be applied to syntax
   */
  options?: {
    (rules: Options): Options;
    /**
     * **Current Rules**
     *
     * Returns the current formatting rule options. This
     * getter will reflect the last known options to have been
     * passed.
     */
    get rules(): Options;
    /**
     * **Change Listener**
     *
     * Hook listener wich will be invoked when beautification
     * options change or are augmented.
     */
    listen?: (callback: (opions: Options) => void) => void
  };
  /**
   * **Language**
   *
   * Automatic language detection based on the string input.
   * Returns lexer, language and official name.
   */
  language?: {
    /**
     * **Detect Language**
     *
     * Automatic language detection based on the string input.
     * Returns lexer, language and official name.
     */
    (sample: string): Language;
    /**
     * **Language Reference**
     *
     * Returns a language from a supplied language
     * name reference.
     */
    reference?(languageId: Language): Language;
    /**
     * **Language Listener**
     *
     * Trigger a callback to execute after language detection has
     * completed. Optionally return an augmentation
     */
    listen?: (callback: (language: Language) => void | Language) => void;
  };
};

/**
 * **Defintions**
 *
 * Rule defintions which describe the different formatting options
 * prettify offers.
 */
export declare const definitions: Definitions;

export default prettify;
