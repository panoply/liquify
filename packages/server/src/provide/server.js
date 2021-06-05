import omit from 'lodash/omit'
import pick from 'lodash/pick'
import upperFirst from 'lodash/upperFirst'
import { readFileSync, readdirSync, existsSync } from 'fs-extra'
import { basename, resolve, join, normalize } from 'path'
import { Spec } from 'provide/parser'
import stripJSONC from 'strip-json-comments'

/**
 * Liquid Language Server
 */
export default (function (config) {

  /**
   * Formatter - Merges user configuration Config used
   * when formatting is being applied
   *
   * @private
   * @param {object} settings
   * @memberof Config
   */
  const setFormattingRules = (settings) => {

    const enforce = [
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
    ]

    for (const lang in settings.format) {

      const rules = settings.format[lang]

      if (rules?.tags) {
        for (const associate of rules.tags) {
          config.formatting.associateTags.push({
            ...associate
            , lang
            , type: 'associate'
          })
        }
      }

      if (config.formatting.customRules?.[lang]) {
        config.formatting.customRules[lang] = pick(
          Object.keys(config.formatting.customRules[lang]),
          rules
        )
      }

      if (config.formatting.languageRules?.[lang]) {
        config.formatting.languageRules[lang] = {
          ...config.formatting.languageRules[lang]
          , ...omit(rules, enforce)
          , ...config.formatting.editorRules
        }
      }
    }

  }

  /**
   * Set Provider Services
   *
   * @private
   * @param {string} rcfile
   */
  const parseLiquidrcFile = rcfile => {

    if (!rcfile) return null

    try {

      const read = readFileSync(rcfile).toString()
      const rules = JSON.parse(stripJSONC(read, { whitespace: false }))

      return rules

    } catch (error) {

      return console.error(error.toString())

    }

  }

  /**
   * Set Specification
   *
   * @private
   * @param {object} settings
   * @memberof LiquidServer
   */
  const setSpecification = async settings => {

    return setFormattingRules(settings)

  }

  /**
   * Set Liquid Engine
   *
   * @private
   * @param {object} settings
   */
  const setLiquidEngine = (settings) => {

    Spec.engine(settings.engine)
    config.engineLabel = `\n${upperFirst(Spec.variant.engine)} Liquid`

    return setSpecification(settings)

  }

  /**
   * Set Path Includes
   *
   * @private
   * @param {object} settings
   */
  const setPathIncludes = settings => {

    if (!settings?.paths) return null

    for (const path in settings.paths) {
      if (existsSync(settings.paths[path])) {
        const strip = normalize(settings.paths[path])
        this.paths[path] = readdirSync(resolve(strip)).map(file => (
          `${this.rootUri}/${join(strip, file)}`
        ))
      }
    }

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   *
   * @private
   * @returns
   * @memberof LiquidServer
   */
  const setUserSettings = () => {

    const settings = parseLiquidrcFile(config.rcfile)

    return setLiquidEngine(settings)

  }

  /**
   * Set Provider Services
   *
   * @private
   * @param {object} liquid
   */
  const setProviders = ({ liquid }) => {

    Object.entries(liquid).forEach(([ prop, setting ]) => {
      if (config.provider?.[prop] && setting?.enable) {
        config.provider[prop] = setting.enable
      }
    })

    return setUserSettings()

  }

  /**
   * Configure Server Settings
   *
   * @param {object} settings
   * @memberof LiquidServer
   */
  const configure = (event, settings) => {

    if (event === 'onDidChangeConfiguration') return setProviders(settings)

    if (event === 'onDidChangeWatchedFiles') {

      return ((
        {
          changes: [
            {
              uri
            }
          ]
        }
      ) => basename(config.rcfile) !== basename(uri)
        ? null
        : setUserSettings()
      )(settings)

    }

  }

  /**
   * Configuration - The `onInitialize` event handler.
   *
   * @param {LSP.InitializeParams} initializeParams
   * @param {LSP.ServerCapabilities} capabilities
   * @memberof LiquidServer
   */
  const capabilities = (
    {
      initializationOptions: {
        service = null
        , license = 'sissel siv'
        , rcfile = null
      },
      capabilities: {
        textDocument
        , workspace
      }
    }
    , capabilities
  ) => {

    /* TEXT DOCUMENT ------------------------------ */

    textDocument.completion.contextSupport = true
    textDocument.completion.completionItem.snippetSupport = true
    textDocument.completion.dynamicRegistration = true

    /* CONFIG ------------------------------------- */

    config.rcfile = rcfile
    config.license = license
    config.service = { ...config.service, ...service }

    /* CONFIG CAPABILITIES ------------------------ */

    config.capability.hasConfigurationCapability = !!(
      workspace && !!workspace.configuration
    )

    config.capability.hasWorkspaceFolderCapability = !!(
      workspace && !!workspace.workspaceFolders
    )

    config.capability.hasDiagnosticRelatedInformationCapability = !!(
      textDocument &&
      textDocument.publishDiagnostics &&
      textDocument.publishDiagnostics.relatedInformation
    )

    if (config.capability.hasWorkspaceFolderCapability) {
      capabilities.workspace = { workspaceFolders: { supported: true } }
    }

    return { capabilities }

  }

  return {
    capabilities,
    configure,
    get service () {
      return config.service
    },
    get capability () {
      return config.capability
    },
    get provider () {
      return config.provider
    },
    get formatting () {
      return config.formatting
    }
  }

})(
  {

    /**
     * Strict Specification - This will validate syntax according
     * to the engine spec, if you're using Jekyll, this should be `false`
     * whereas the Shopify engine can use true.
     *
     * @memberof Config
     */
    strictSpec: false,

    /**
     * The `.liquidrc` file location
     *
     * @type {string}
     * @memberof Config
     */
    rcfile: null,

    /**
     * The rootURI path of workspace
     *
     * @type {string}
     * @memberof Config
     */
    rootUri: null,

    /**
     * Path includes used to resolve include/import tags
     *
     * @type {object}
     * @memberof Config
     */
    paths: {},

    /**
     * Server Document Settings - Records settings of documents
     *
     * @memberof LiquidServer
     */
    settings: new Map(),

    /**
     * Server capabilities - Used for different text editor implementations
     * that can consume and/or support the Language Server Protocol
     *
     */
    capability: {

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

    },

    /**
     * **NOT YET IMPLEMENTED**
     *
     * Third party extensions - In future version we will inherit
     * formatting rule sets from alternative formatters/beautifiers
     *
     * @protected
     */
    thirdParties: {

      /**
       * Prettier - NOT YET AVAILABLE - DO NOT USE
       */
      prettier: null,

      /**
       * JS Beautify - NOT YET AVAILABLE - DO NOT USE
       */
      jsbeautify: null

    },

    /**
     * Server tracing (LSP related)
     */
    trace: {

      /**
       * Trace LSP
       */
      server: 'on'

    },

    /**
     * Notification options - Used to limit and control what
     * notifications are shown by the extension
     */
    notifier: {

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

    },

    provider: {

      /**
       * Enable/Disable Liquid formatting
       *
       * @type {boolean}
       */
      format: true,

      /**
       * Enable/Disable Liquid formatting on type
       *
       * @type {boolean}
       */
      formatOnType: true,

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

    },

    /**
     * The embedded language services to provide
     */
    service: {

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

    },

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
)
