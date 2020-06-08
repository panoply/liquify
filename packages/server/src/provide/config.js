import { License } from './license'

/**
 * Configuration
 *
 * The class scopes listed here are settings used by the language server. The
 * presets defined here are defaults and will maintain server configuration state.
 *
 * @export
 */
export class Config extends License {

  /**
   * Engine Variation Spec, eg: `standard` | `shopify` | `jekyll`
   *
   * @type {string}
   */
  engine = null

  /**
   * Specification References
   *
   * @memberof Config
   */
  specification = null

  parser = {}

  /**
   * The `.liquidrc` file location
   *
   * @type {string}
   */
  rcfile = null

  /**
   * Server Document Settings - Records settings of documents
   *
   * @memberof LiquidServer
   */
  settings = new Map()

  /**
   * Server - hasConfigurationCapability
   *
   * @type {boolean}
   * @memberof Config
   */
  hasConfigurationCapability = false

  /**
   * Server = hasWorkspaceFolderCapability
   *
   * @type {boolean}
   * @memberof Config
   */
  hasWorkspaceFolderCapability = false

  /**
   * Server - hasDiagnosticRelatedInformationCapability
   *
   * @type {boolean}
   * @memberof Config
   */
  hasDiagnosticRelatedInformationCapability = false

  /**
   * Settings - Language Server settings and configuration option
   *
   * @memberof Config
   */
  workspaceSettings = {

    /**
     * The `.liquidrc` file location
     *
     * @type {string}
     */
    rcfile: null,

    /**
     * Additional specification refernces
     *
     * @type {Specification}
     */
    spec: null,

    /**
     * Notification options - Used to limit and control what
     * notifications are shown by the extension
     */
    notifications: {

      /**
       * Show version notification for new releases
       */
      releaseNotes: true,

      /**
       * Project reccomendation - Show project reccomendations
       */
      projectReccomendations: false,

      /**
       * Notify when conflicting extensions are active
       */
      conflictingExtensions: true

    },

    /**
     * Server tracing (LSP related)
     */
    trace: {

      /**
       * Trace LSP
       */
      server: 'off'

    },

    /**
     * Third party extensions - In future version we will inherit
     * formatting rulesets from alternative formatters/beautifiers
     */
    extensions: {

      /**
       * Prettier - NOT YET AVAILABLE - DO NOT USE
       */
      prettier: null,

      /**
       * JS Beautify - NOT YET AVAILABLE - DO NOT USE
       */
      jsbeautiy: null

    }

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
    validate: true

  }

  /**
   * The embedded language services to provide
   */
  service = {

    /**
     * The JSON Language Server
     *
     * @type {boolean}
     * @constant
     */
    json: true,

    /**
     * The CSS Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     * @constant
     */
    css: false,

    /**
     * The SCSS Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     * @constant
     */
    scss: false,

    /**
     * The JavaScript Language Server - NOT YET AVAILABLE
     *
     * @type {boolean}
     * @constant
     */
    javascript: false

  }

  /**
   * PrettyDiff options the HTML/Liquid language
   *
   * @type {FormattingRules}
   */
  formatRules = {

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
     * Custom Rules - Langauge Server extended rulesets
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
     * Excluded Rules - Formatting Rules to be omitted on assignment
     *
     * @readonly
     */
    excludedRules: [
      'mode',
      'end_quietly',
      'node_error',
      'language_name',
      'language',
      'lexer',
      'tags',
      'files',
      'format_script',
      'format_style',
      'tag_newline',
      'tag_whitespace',
      'tag_spacing'
    ],

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
       * PrettyDiff options the JavaScript language
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
       * PrettyDiff options the JSON language
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
       * PrettyDiff options the SCSS language
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
       * PrettyDiff options the CSS language
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

  /**
  * Validation Rules - The default rule options which are executed
  *
  * @type {ValidationRules}
  */
  linter = {

    tag: {

      /**
       * Validates start and end tag existence, For example,
       * a tag like `{% capture %}` requires the `{% endcapture %}` tag.
       */
      pair: true,

      /**
       * Validates the placement position of tags. For example,
       * the `{% when %}` tag must be nested within the `{% case %}` tag.
       */
      placement: true,

      /**
       * Validates if the tag accepts whitespace dash `-` attribute
       * values, For example, `{%- tag -%}`.
       */
      whitespace: true,

      /**
       * Validates if a tag can span multiple lines or just a single line
       * For example, `{%- \n tag \n -%}` is invalid when set to `true`.
       */
      newline: true

    },

    control: {
      /**
       * Validates condition values used on control flow type tags,
       * verifies their validity and if they can be used or not.
       */
      condition: true,

      /**
       * Validates the conditional operator values, in control tags.
       * For example,  `!=`, `and` will be validated
       */
      operator: true

    },

    iteration: {

      /**
       * Validates the iteration tag type operator value, For example,
       * the `in` contained within `{% for tag in tags %}`
       */
      operator: true,

      /**
       * Validates iteration parameter values, For example, the `reverse`
       * within `{% for tag in tags reversed %}` is validated
       */
      parameter: true,

      /**
       * Validates iteration iteree value, check to see if its an existing value,
       * For example, `{% for tag in tag %}` would be invalid
       */
      iteree: true

    },

    object: {

      /**
       * Validates object tag names. For example, The `{{ sitez.prop }}` tag
       * would be invalid as `sitez` is not a known object.
       */
      name: true,

      /**
       * Validates object propery existense and value, For example, `{{ tag. }}`
       * would fail and `{{ object.does_not_exist }}` would aswell.
       */
      property: true

    },

    filter: {

      /**
       * Validates the existence of tag filters. For example, `{{ tag | }}` or
       * `{% if tag | %}` would both be invalid.
       */
      existence: true,

      /**
       * Validates filter parameters. For example, `{{ tag | replace }}`
       * would be invalid as `replace` requires parameters.
       */
      parameter: true

    }
  }

}
