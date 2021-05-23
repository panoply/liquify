/**
 * Configuration
 *
 * The class scopes listed here are settings used by the language server. The
 * presets defined here are defaults and will maintain server configuration state.
 *
 * @export
 * @class Config
 */
export class Config {

  /**
   * Specification References
   *
   * @type {Specification.Variation}
   * @memberof Config
   */
  specification = null

  /**
   * Strict Specification - This will validate syntax according
   * to the engine spec, if you're using Jekyll, this should be `false`
   * whereas the Shopify engine can use true.
   *
   * @memberof Config
   */
  strictSpec = false

  /**
   * The `.liquidrc` file location
   *
   * @type {string}
   * @memberof Config
   */
  rcfile = null

  /**
   * The rootURI path of workspace
   *
   * @type {string}
   * @memberof Config
   */
  rootUri = null

  /**
   * Path includes used to resolve include/import tags
   *
   * @type {object}
   * @memberof Config
   */
  paths = {}

  /**
   * Server Document Settings - Records settings of documents
   *
   * @memberof LiquidServer
   */
  settings = new Map()

  /**
   * Server capabilities - Used for different text editor implementations
   * that can consume and/or support the Language Server Protocol
   *
   */
  capability = {

    /**
     * Server - hasConfigurationCapability
     *
     * @type {boolean}
     * @memberof Config
     */
    hasConfigurationCapability: false,

    /**
     * Server - hasWorkspaceFolderCapability
     *
     * @type {boolean}
     * @memberof Config
     */
    hasWorkspaceFolderCapability: false,

    /**
     * Server - hasDiagnosticRelatedInformationCapability
     *
     * @type {boolean}
     * @memberof Config
     */
    hasDiagnosticRelatedInformationCapability: false

  }

  /**
   * **NOT YET IMPLEMENTED**
   *
   * Third party extensions - In future version we will inherit
   * formatting rulesets from alternative formatters/beautifiers
   *
   * @protected
   */
  thirdParties = {

    /**
     * Prettier - NOT YET AVAILABLE - DO NOT USE
     */
    prettier: null,

    /**
     * JS Beautify - NOT YET AVAILABLE - DO NOT USE
     */
    jsbeautify: null

  }

  /**
   * Server tracing (LSP related)
   */
  trace = {

    /**
     * Trace LSP
     */
    server: 'off'

  }

  /**
   * Notification options - Used to limit and control what
   * notifications are shown by the extension
   */
  notifier = {

    /**
     * Show version notification for new releases
     */
    releases: true,

    /**
     * Project recommendation - Show project recommendations
     */
    recommendations: true,

    /**
     * Notify when conflicting extensions are active
     */
    conflicts: true

  }

  provider = {

    /**
     * Enable/Disable Liquid formatting
     *
     * @type {boolean}
     */
    format: true,

    /**
     * Enable/Disable Liquid completions
     *
     * @type {boolean}
     */
    completion: true,

    /**
     * Enable/Disable Liquid hover descriptions
     *
     * @type {boolean}
     */
    hover: true,

    /**
     * Enable/Disable Liquid validation diagnostic features
     *
     * @type {boolean}
     */
    validate: true,

    /**
     * Enable/Disable validations running on document open
     *
     * @type {boolean}
     */
    validateOnOpen: true,

    /**
     * Enable/Disable Liquid document links, ie: include
     *
     * @type {boolean}
     */
    link: true

  }

  /**
   * The embedded language services to provide
   */
  service = {

    /**
     * The JSON Language Server
     *
     * @type {boolean}
     */
    json: true,

    /**
     * The CSS Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     */
    css: false,

    /**
     * The SCSS Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     */
    scss: false,

    /**
     * The JavaScript Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     */
    javascript: false

  }

  /**
   * PrettyDiff options the HTML/Liquid language
   *
   * @type {FormattingRules}
   */
  formatting = {

    /**
     * Files and tags to be ignored by formatter
     */
    ignore: {

      /**
       * Ignored files - List of files to skip formatting on
       */
      files: [],

      /**
       * Ignored Tags - List of tags to ignore from formatting
       */
      tags: []

    },

    /**
     * Editor Rules - Inherit relative formatting options from editor
     */
    editorRules: {

      /**
       * Indentation - Editor Setting
       */
      tabSize: 2,

      /**
       * Word Wrap - Editor Setting
       */
      wordWrapColumn: 0

    },

    /**
     * Custom Rules - Language Server extended rule sets
     */
    customRules: {

      /**
       * Custom Options - HTML
       */
      html: {

        /**
         * Format `<script></script>` elements
         */
        format_script: false,

        /**
         * Format `<style></style>` elements
         */
        format_style: false,

        /**
         * Should embedded tags use newlines
         */
        tag_newline: false,

        /**
         * Should the inner content of Liquid tags use equal spacing
         */
        tag_spacing: true,

        /**
         * Should Liquid tags apply whitespace dashes
         */
        tag_whitespace: 'ignore'

      }

    },

    /**
     * Associated Tags - Shipping as default additional tags
     */
    associateTags: [
      {
        language: 'javascript',
        kind: 'html',
        name: 'script',
        type: 'associate'
      },
      {
        language: 'json',
        kind: 'html',
        type: 'associate',
        name: 'script',
        attr: 'application\\/json'
      },
      {
        language: 'json',
        kind: 'html',
        type: 'associate',
        name: 'script',
        attr: 'application\\/ld\\+json'
      },
      {
        language: 'css',
        kind: 'html',
        type: 'associate',
        name: 'style'
      }
    ],

    languageRules: {

      /**
       * PrettyDiff options the HTML/Liquid language
       *
       * @type {object}
       */
      html: {

        mode: 'beautify',
        end_quietly: 'log',
        node_error: 'log',
        language_name: 'HTML/Liquid',
        language: 'html',
        language_default: 'liquid',
        lexer: 'markup',
        new_line: true,
        space_close: false,
        indent_size: 2,
        indent_level: 0,
        preserve: 2,
        preserve_comment: true,
        comment_line: true,
        comments: true,
        preserve_text: true,
        correct: false

      },

      /**
       * PrettyDiff options for the JavaScript language
       *
       * @type {object}
       */
      javascript: {

        mode: 'beautify',
        end_quietly: 'log',
        node_error: 'log',
        language_name: 'JavaScript',
        language: 'javascript',
        lexer: 'script',
        new_line: true,
        indent_size: 2,
        preserve: 2

      },

      /**
       * PrettyDiff options for the JSON language
       *
       * @type {object}
       */
      json: {

        mode: 'beautify',
        end_quietly: 'log',
        node_error: 'log',
        language_name: 'JSON',
        language: 'json',
        lexer: 'script',
        no_semicolon: true,
        new_line: true,
        indent_size: 2,
        indent_level: 0,
        preserve: 1

      },

      /**
       * PrettyDiff options for the SCSS language
       *
       * @type {object}
       */
      scss: {

        mode: 'beautify',
        end_quietly: 'log',
        node_error: 'log',
        language_name: 'SASS',
        language: 'scss',
        lexer: 'style',
        new_line: true,
        indent_size: 2,
        indent_level: 0,
        preserve: 1

      },

      /**
       * PrettyDiff options for the CSS language
       *
       * @type {object}
       */
      css: {

        mode: 'beautify',
        end_quietly: 'log',
        node_error: 'log',
        language_name: 'CSS',
        language: 'css',
        lexer: 'style',
        new_line: true,
        indent_level: 0,
        indent_size: 2,
        preserve: 1

      }
    }

  }

}
