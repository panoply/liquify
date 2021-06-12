import { HTMLRules, JSONRules } from './prettydiff';
export { EnforcedRules, HTMLEnforce, JSONEnforce, SharedRules } from './prettydiff';

export interface AssociateTags {
  kind: 'html' | 'liquid'
  name: string
  attr?: string
}

/**
 * Extend associated tags to HTML
 */
interface IHTMLFormat extends HTMLRules { tags?: AssociateTags[] }

/**
 * Extend associated tags to JSON
 */
interface IJSONFormat extends JSONRules { tags?: AssociateTags[] }

/**
 * Text Editor Settings
 *
 * We will inherit these rulesets as fallbacks.
 */
export interface FormattingEditorConfigs {

  /**
   * Indentation - Editor Setting
   */
  tabSize: number;

  /**
   * Word Wrap - Editor Setting
   */
  wordWrapColumn: number;

}

/**
 * Server Language Formatting
 */
export interface IFormatting {
  /**
   * PrettyDiff options the HTML/Liquid language
   */
  html: IHTMLFormat;

  /**
   * PrettyDiff options for the JSON language
   */
  json: IJSONFormat;

  /**
   * @todo Implement Prettier or JSBeautify
   */
  javascript: any;
  /**
   * @todo Implement Prettier or JSBeautify
   */
  css: any;
  /**
   * @todo Implement Prettier or JSBeautify
   */
  scss: any;
}
