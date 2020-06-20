// @ts-check

import _ from 'lodash'
import R from 'ramda'
import { readFileSync, readdirSync, existsSync } from 'fs-extra'
import { basename, resolve, join, normalize } from 'path'
import { Config } from './config'
import { Expressions } from '../parser/lexical'
import { regexp } from '../utils/functions'
import specs from '@liquify/liquid-language-specs'

/**
 * Liquid Language Server
 *
 * @export
 * @class LiquidServer
 * @extends {Config}
 */
export class LiquidServer extends Config {

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
    this.hasDiagnosticRelatedInformationCapability = !!(
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
   * Configure Server Settings
   *
   * @param {object} settings
   * @memberof LiquidServer
   */
  configure (event, settings) {

    /**
     * Configuration changed
     */
    return {
      onDidChangeConfiguration: this.#setProviders,
      onDidChangeWatchedFiles: (
        {
          changes: [ { uri } ]
        }
      ) => basename(this.rcfile) !== basename(uri) ? null : this.#setUserSettings()

    }[event](settings)

  }

  /**
   * Set Provider Services
   *
   * @private
   * @param {string} rcfile
   */
  #setLiquidrc = (rcfile) => {

    if (!rcfile) return null

    try {

      const read = readFileSync(rcfile).toString()
      const rules = JSON.parse(require('strip-json-comments')(read, {
        whitespace: false
      }))

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

    Object
      .entries(liquid)
      .forEach(([ prop, setting ]) => {
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

    const settings = this.#setLiquidrc(this.rcfile)

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

    const spec = await specs(this.license)

    this.specification = spec[this.engine]()

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

    for (const language in settings.format) {

      const rules = settings.format[language]

      if (rules?.tags) {
        rules.tags.forEach(associate => {
          this.formatRules.associateTags.push({
            ...associate
            , language
            , type: 'associate'
          })
        })
      }

      if (this.formatRules.customRules?.[language]) {
        this.formatRules.customRules[language] = R.pick(
          Object.keys(this.formatRules.customRules[language]),
          rules
        )
      }

      if (this.formatRules.languageRules?.[language]) {
        this.formatRules.languageRules[language] = {
          ...this.formatRules.languageRules[language]
          , ..._.omit(rules, enforce)
          , ...this.formatRules.editorRules
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
  #setParseExpressions = (settings) => {

    const { html, blocks, output } = Expressions
    const { objects, filters, tags } = this.specification

    const includes = Object
      .entries(tags)
      .filter(([ key, { type, params } ]) => type === 'include')
      .map(([ key, { params } ]) => key)
      .join('|')

    this.parser = {
      ...this.parser,
      parsing: regexp(`${html}|${blocks}|${output}`, 'g'),
      objects: regexp(`\\b(?:${Object.keys(objects).join('|')})\\.?(?:[^\\s\\n]*\\b)?`, 'g'),
      filters: regexp(Object.keys(filters).join('|'), 'g'),
      frontmatter: Expressions.frontmatter,
      includes: new RegExp(`(?<=\\b(${includes})\\b\\s+)["']?([\\w.]+)["']?`)
    }

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

// const Server = new LiquidServer()
// Server
// const s = new LanguageServerService()
