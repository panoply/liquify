/* eslint-disable no-use-before-define */

import { LanguageName, LanguageOfficialName, LexerName } from './shared';
import { GlobalRules } from './rules/global';
import { LiquidRules } from './rules/liquid';
import { MarkupRules } from './rules/markup';
import { StyleRules } from './rules/style';
import { ScriptRules } from './rules/script';
import { JSONRules } from './rules/json';
import { Grammars } from './misc/grammar';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export * from './shared';
export * from './parse/tokens';
export * from './parse/parser';
export * from './misc/grammar';
export * from './misc/defintions';
export * from './misc/settings';
export * from './rules/global';
export * from './rules/liquid';
export * from './rules/markup';
export * from './rules/style';
export * from './rules/script';
export * from './rules/json';
export * from './next';
export * from './events';

/**
 * Rule Language Items
 */
export type RuleItems = (
  | LiquidRules
  | MarkupRules
  | StyleRules
  | ScriptRules
  | JSONRules
)

/**
 * Language Beautification Options
 */
export interface Rules extends GlobalRules {
  liquid?: LiquidRules;
  markup?: MarkupRules;
  style?: StyleRules;
  script?: ScriptRules;
  json?: JSONRules;
}

/**
 * Language Beautification Options
 */
export interface RulesInternal extends GlobalRules {
  liquid?: LiquidRules;
  markup?: MarkupRules;
  style?: StyleRules;
  script?: ScriptRules;
  json?: ScriptRules;
}

export type GlobalRuleChanges = {
  [K in keyof GlobalRules]?: {
    /**
     * The old rule value that was changed.
     */
    old: GlobalRules[K];
    /**
     * The new rule value now being used.
     */
    now: GlobalRules[K];
  };
};

export type LiquidRuleChanges = {
  [K in keyof LiquidRules]: {
    /**
     * The old `liquid` rule value that was changed.
     */
    old: LiquidRules[K];
    /**
     * The new `liquid` rule value now being used.
     */
    now: LiquidRules[K];
  };
}

export type MarkupRuleChanges = {
  [K in keyof MarkupRules]: {
    /**
     * The old `markup` rule value that was changed.
     */
    old: MarkupRules[K];
    /**
     * The new `markup` rule value now being used.
     */
    now: MarkupRules[K];
  };
}

export type StyleRuleChanges = {
  [K in keyof StyleRules]: {
    /**
     * The old `style` rule value that was changed.
     */
    old: StyleRules[K];
    /**
     * The new `style` rule value now being used.
     */
    now: StyleRules[K];
  };
}

export type ScriptRuleChanges = {
  [K in keyof ScriptRules]: {
    /**
     * The old `script` rule value that was changed.
     */
    old: ScriptRules[K];
    /**
     * The new `script` rule value now being used.
     */
    now: ScriptRules[K];
  };
}

export interface RulesChanges extends GlobalRuleChanges {
  /**
   * Liquid Rule Changes
   */
  liquid?: LiquidRuleChanges;
  /**
   * Markup Rule Changes
   */
  markup?: MarkupRuleChanges;
  /**
   * Style Rule Changes
   */
  style?: StyleRuleChanges;
  /**
   * Script Rule Changes
   */
  script?: ScriptRuleChanges;
}

export interface Language {
  /**
   * The language name in lowercase.
   */
  language: LanguageName
  /**
   * The lexer the language uses.
   */
  lexer: LexerName;
  /**
   * The language proper name (used in reporting)
   */
  languageName: LanguageOfficialName
}

/**
 * Internal faceing Grammar control
 */
export interface Grammar {
  /**
   * HTML Grammar rules
   */
  html: {
    /**
     * Set list of void type tags
     */
    voids: Set<string>;
    /**
     * Set list of start/end tags
     */
    tags: Set<string>;
    /**
     * Embedded Language HTML type tag handler
     */
    embed: {
      /**
       * The tag name identifier
       */
      [tagName: string]: {
        /**
         * The embedded Language name in lowercase format,
         * this will be used to determine the lexer to use
         */
        language: LanguageName;
        /**
         * The attribute match reference
         */
        attribute?: string;
        /**
         * The value checksum
         */
        value?(token: string): boolean
      }
    }
  };
  /**
   * Liquid Grammar rules
   */
  liquid: {
    /**
     * Set list of start/end tags
     */
    tags: Set<string>;
    /**
     * Set list of else type tokens used in control tags
     */
    else: Set<string>;
    /**
     * Set list of singleton type tokens
     */
    singletons: Set<string>;
    /**
     * Embedded Language Liquid type tag handler
     */
    embed: {
      /**
       * The tag name identifier
       */
      [tagName: string]: {
        /**
         * The Language name in lowercase format,
         * this will be used to determine the lexer to use
         */
        language: LanguageName;
        /**
         * The attributee match reference checksum
         */
        attribute?(token: string): boolean
        /**
         * Checksum to determine whether or not the token
         * `tagName` has reached the `{% endtag %}` tag.
         */
        end(token: string): boolean
      }
    }
  };
  /**
   * CSS language grammar rules
   */
  css: {
    /**
     * Set list of valid units
     */
    units: Set<string>
  };
  /**
   * JavaScript Grammar rules
   */
  javascript: {
    /**
     * Set list of keyword rules
     */
    keywords: Set<string>
  };

  /**
   * Extend grammar utility for combining user
   * defined options with pre-defined ones.
   */
  extend(options: Grammars): void;

  /**
   * Extend grammar utility for combining user
   * defined options with pre-defined ones.
   */
  embed(options: Grammars): void
}

export interface Format<T extends string, O extends Rules> {

  /**
   * **ÆSTHETIC**
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
  (source: T, rules?: O): T

}
