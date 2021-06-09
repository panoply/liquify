export class Config {

  /**
   * The `.liquidrc` file location
   */
  rcfile: string = null

  /**
   * The rootURI path of workspace
   */
  rootUri: string =null

  /**
   * Path includes used to resolve include/import tags
   *
   */
  paths: object ={}


  /**
   * Server capabilities - Used for different text editor implementations
   * that can consume and/or support the Language Server Protocol
   *
   */
  capability: {

    /**
     * Server - hasConfigurationCapability
     */
    hasConfigurationCapability: boolean = false,

    /**
     * Server - hasWorkspaceFolderCapability
     */
    hasWorkspaceFolderCapability: boolean = false,

    /**
     * Server - hasDiagnosticRelatedInformationCapability
     */
    hasDiagnosticRelatedInformationCapability: boolean = false

  }

  /**
   * Server tracing (LSP related)
   */
  trace: {

    /**
     * Trace LSP
     */
    server: string = 'on'

  }

  /**
   * Notification options - Used to limit and control what
   * notifications are shown by the extension
   */
  notifier: {

    /**
     * Show version notification for new releases
     */
    releases: boolean = true,

    /**
     * Project recommendation - Show project recommendations
     */
    recommendations: boolean = true,

    /**
     * Notify when conflicting extensions are active
     */
    conflicts: boolean = true

  }

  provider: {

    /**
     * Enable/Disable Liquid formatting
     */
    format: boolean = true

    /**
     * Enable/Disable Liquid formatting on type
     */
    formatOnType: boolean = true

    /**
     * Enable/Disable Liquid completions
     */
    completion: boolean = true

    /**
     * Enable/Disable Liquid hover descriptions
     */
    hover: boolean = true

    /**
     * Enable/Disable Liquid validation diagnostic features
     */
    validations: boolean = true

    /**
     * Enable/Disable validations running on document open
     */
    validateOnOpen: boolean = true

    /**
     * Enable/Disable Liquid document links, ie: include
     */
    documentLinks: boolean = true

    /**
     * Enable/Disable Liquid document links, ie: include
     */
    signatures: boolean = true

  }

  /**
   * The embedded language services to provide
   */
  service: {

    /**
     * The JSON Language Server
     */
    json: boolean = true

    /**
     * The CSS Language Server
     *
     * **NOT YET AVAILABLE**
     */
    css: boolean = false

    /**
     * The SCSS Language Server
     *
     * **NOT YET AVAILABLE**
     */
    scss: boolean = false

    /**
     * The JavaScript Language Server
     *
     * **NOT YET AVAILABLE**
     */
    javascript: boolean = false

  }

  /**
   * PrettyDiff options the HTML/Liquid language
   *
   */
  formatting: {

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

    }

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
