
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
