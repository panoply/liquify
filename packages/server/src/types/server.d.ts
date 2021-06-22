import { IFormatting, FormattingEditorConfigs } from './formatting';

/* ---------------------------------------------------------------- */
/* SERVER                                                           */
/* ---------------------------------------------------------------- */

/**
 * Client Initialization Options
 *
 * @export
 */
export type initializationOptions = {
  engine: 'standard' | 'shopify' | 'jekyll';
  rcfile: string;
};

export interface Formatting {

  /**
   * Files and tags to be ignored by formatter
   */
  ignore: {

    /**
     * Ignored files - List of files to skip formatting on
     */
    files: string[],

  },
  editorRules: FormattingEditorConfigs,
  languageRules: IFormatting
}

/**
 * Server tracing (LSP related)
 */
export interface Trace {
  server: 'messages' | 'verbose' | 'off',

}

/**
 * Notification options - Used to limit and control what
 * notifications are shown by the extension
 */
export interface Notifiers {

  /**
   * Show version notification for new releases
   */
  releases: boolean,

  /**
   * Project recommendation - Show project recommendations
   */
  recommendations: boolean,

  /**
   * Notify when conflicting extensions are active
   */
  conflicts: boolean
}

/**
 * Server capabilities
 *
 * Used for different text editor implementations
 * that can consume and/or support the Language Server Protocol
 */
export interface Capability {
  /**
   * Server - hasConfigurationCapability
   */
  hasConfigurationCapability: boolean | false,

  /**
   * Server - hasWorkspaceFolderCapability
   */
  hasWorkspaceFolderCapability: boolean | false,

  /**
   * Server - hasDiagnosticRelatedInformationCapability
   */
  hasDiagnosticRelatedInformationCapability: boolean | false
}

/**
 * Server Features
 */
export interface Providers {
  /**
   * Enable/Disable Liquid formatting
   */
  format: boolean;

  /**
   * Enable/Disable Liquid formatting on type
   */
  formatOnType: boolean;

  /**
   * Enable/Disable Liquid completions
   */
  completion: boolean;

  /**
   * Enable/Disable Liquid hover descriptions
   */
  hover: boolean;

  /**
   * Enable/Disable Liquid validation diagnostic features
   */
  validations: boolean;

  /**
   * Enable/Disable validations running on document open
   */
  validateOnOpen: boolean;

  /**
   * Enable/Disable Liquid document links, ie: include
   */
  documentLinks: boolean;

  /**
   * Enable/Disable Liquid document links, ie: include
   */
  signatures: boolean;

}

/**
 * Language Services
 *
 * @export
 */
export interface Services {

  /**
   * The HTML Language Service
   */
  html: boolean;

  /**
   * The JSON Language Service
   */
  json: boolean;

  /**
   * The CSS Language Service
   *
   * **NOT YET AVAILABLE**
   */
  css: false;

  /**
   * The SCSS Language Service
   *
   * **NOT YET AVAILABLE**
   */
  scss: false;

  /**
   * The JavaScript Language Service
   *
   * **NOT YET AVAILABLE**
   */
  javascript: false;

}

/**
 * Liquid Server Configuration
 */
export class Config {

  /**
   * The `.liquidrc` file location
   */
  rcfile: string

  /**
   * The rootURI path of workspace
   */
  rootUri: string

  /**
   * Path includes used to resolve include/import tags
   */
  paths: object
  capability: Capability
  trace:Trace
  notifier: Notifiers
  provider: Providers
  service: Services
  formatting: {
    ignore: { files: string[] },
    editorRules: FormattingEditorConfigs,
    languageRules: IFormatting
  }

}
