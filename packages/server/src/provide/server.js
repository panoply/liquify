// @ts-check

import _ from 'lodash'
import { readFileSync, readdirSync, existsSync } from 'fs-extra'
import { basename, resolve, join, normalize } from 'path'
import { Expressions } from '../parser/lexical'
import { Config } from './config'
import stripJSONC from 'strip-json-comments'
import specs from '@liquify/liquid-language-specs'

/**
 * Liquid Language Server
 *
 * @export
 * @class LiquidServer
 * @extends {Config}
 */
class LiquidServer extends Config {

  /**
   * Configuration - The `onInitialize` event handler.
   *
   * @param {LSP.InitializeParams} initializeParams
   * @param {LSP.ServerCapabilities} capabilities
   * @memberof LiquidServer
   */
  capabilities ({
    rootUri,
    initializationOptions: {
      service = null
      , license = 'sissel siv'
      , rcfile = null
    },
    capabilities: {
      textDocument
      , workspace
    }
  }, capabilities) {

    textDocument.completion.contextSupport = true
    textDocument.completion.completionItem.snippetSupport = true
    textDocument.completion.dynamicRegistration = true

    this.rootUri = rootUri
    this.rcfile = rcfile
    this.license = license
    this.service = { ...this.service, ...service }

    this.capability.hasConfigurationCapability = !!(workspace && !!workspace.configuration)
    this.capability.hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders)
    this.capability.hasDiagnosticRelatedInformationCapability = !!(
      textDocument &&
      textDocument.publishDiagnostics &&
      textDocument.publishDiagnostics.relatedInformation
    )

    if (this.capability.hasWorkspaceFolderCapability) {
      capabilities.workspace = {
        workspaceFolders: {
          supported: true
        }
      }
    }

    return { capabilities }

  }

  /**
   * Configure Server Settings
   *
   * @param {object} settings
   * @memberof LiquidServer
   */
  configure (event, settings) {

    if (event === 'onDidChangeConfiguration') {

      return this.#setProviders(settings)

    } else if (event === 'onDidChangeWatchedFiles') {

      return (({ changes: [ { uri } ] }) => (

        basename(this.rcfile) !== basename(uri)
          ? null
          : this.#setUserSettings()

      ))(settings)

    }

  }

  /**
   *
   *
   * @param {string} resource
   * @param {object} connection
   * @returns
   * @memberof LiquidServer
   */
  #documents = (resource, connection) => {

    if (!this.hasConfigurationCapability) return Promise.resolve(this.settings)

    let result = this.settings.get(resource)

    if (!result) {

      result = connection.workspace.getConfiguration({
        scopeUri: resource,
        section: 'languageServerExample'
      })

      this.settings.set(resource, result)

    }

    return result

  }

  /**
   * Set Provider Services
   *
   * @private
   * @param {string} rcfile
   */
  #parseLiquidrcFile = rcfile => {

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
   * Set Provider Services
   *
   * @private
   * @param {object} liquid
   */
  #setProviders = ({ liquid }) => {

    Object.entries(liquid).forEach(([ prop, setting ]) => {
      if (this.provider?.[prop] && setting?.enable) {
        this.provider[prop] = setting.enable
      }
    })

    return this.#setUserSettings()

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   *
   * @private
   * @returns
   * @memberof LiquidServer
   */
  #setUserSettings = () => {

    const settings = this.#parseLiquidrcFile(this.rcfile)

    return this.#setLiquidEngine(settings)

  }

  #setLiquidEngine = (settings) => {

    if (this.engine === settings.engine) return null

    this.engine = settings.engine
    this.engineLabel = `\n${_.upperFirst(this.engine)} Liquid`

    return this.#setSpecification(settings)

  }

  /**
   * Set Specification
   *
   * @private
   * @param {object} settings
   * @memberof LiquidServer
   */
  #setSpecification = async settings => {

    this.specification = (await specs(this.license))[this.engine]()

    return this.#setFormattingRules(settings)

  }

  /**
   * Diagnostics
   *
   * @private
   * @param {object} settings
   * @memberof Server
   */
  #setDiagnosticRules = (settings) => {

    /* Object.values(validations).forEach(({
      meta: {
        group,
        rules
      }
    }) => Object.assign(rules, settings.validate[group])) */

  }

  /**
   * Formatter - Merges user configuration Config used
   * when formatting is being applied
   *
   * @private
   * @param {object} settings
   * @memberof Config
   */
  #setFormattingRules = (settings) => {

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
        rules.tags.forEach(associate => {
          this.formatting.associateTags.push({
            ...associate
            , lang
            , type: 'associate'
          })
        })
      }

      if (this.formatting.customRules?.[lang]) {
        this.formatting.customRules[lang] = _.pick(
          Object.keys(this.formatting.customRules[lang]),
          rules
        )
      }

      if (this.formatting.languageRules?.[lang]) {
        this.formatting.languageRules[lang] = {
          ...this.formatting.languageRules[lang]
          , ..._.omit(rules, enforce)
          , ...this.formatting.editorRules
        }
      }
    }

    return this.#setParseExpressions(settings)

  }

  /**
   * Set Specification
   *
   * @private
   * @param {object} settings
   * @memberof LiquidServer
   */
  #setParseExpressions = settings => {

    this.lexical = Expressions({
      tags: {
        objects: Object.keys(this.specification.objects)
      },
      html: {
        comments: [ 'liquid-(format|linter)-(ignore|enable|disable)' ],
        tokens: [ 'script', 'style' ],
        tokens_with_attribute: [
          [ 'script' ],
          [ 'application/type="ld+json"' ]
        ]
      }
    })

    return this.#setPathIncludes(settings)

  }

  /**
   * Set Specification
   *
   * @private
   * @param {object} settings
   * @memberof LiquidServer
   */
  #setPathIncludes = settings => {

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

}

export const Server = new LiquidServer()
