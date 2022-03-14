import { IMarkupOptions, IJSONOptions, IScriptOptions, IStyleOptions } from '@liquify/prettify';

export interface AssociateTags {
  kind: 'html' | 'liquid'
  name: string
  attr?: string
}

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
  markup: Partial<IMarkupOptions>

  /**
   * PrettyDiff options for the JSON language
   */
  json: Partial<IJSONOptions>

  /**
   * @todo Implement Prettier or JSBeautify
   */
  script: Partial<IScriptOptions>
  /**
   * @todo Implement Prettier or JSBeautify
   */
  style: Partial<IStyleOptions>
}
