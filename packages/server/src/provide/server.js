// @ts-check

import _ from 'lodash'
import fs from 'fs'
import { readFileSync, exists } from 'fs-extra'
import { basename } from 'path'
import { Config } from './config'
import { Expressions } from '../parser/lexical'
import { propLevels } from '../utils/functions'
import * as validations from '../service/validate/index'
import specs from '@liquify/liquid-language-specs'

/**
 * Liquid Language Server
 *
 * @export
 * @typedef { import('vscode-languageserver').InitializeParams } InitializeParams
 * @typedef {import('vscode-languageserver').ServerCapabilities} ServerCapabilities
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} TextDocument
 * @typedef {import('vscode-languageserver').TextEdit} TextEdit
 * @class LiquidServer
 * @extends {Config}
 */
export class LiquidServer extends Config {

  /**
   * Configuration - The `onInitialize` event handler.
   *
   * @param {InitializeParams} initializeParams
   * @param {ServerCapabilities} capabilities
   * @memberof LiquidServer
   */
  async capabilities ({
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

    // Completion capabilities
    textDocument.completion.contextSupport = true
    textDocument.completion.dynamicRegistration = true
    textDocument.completion.completionItem.snippetSupport = true

    this.rcfile = rcfile
    this.license = await this.#authenticate(license)
    this.service = { ...this.service, ...service }

    this.hasConfigurationCapability = !!(workspace && !!workspace.configuration)
    this.hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders)
    this.hasDiagnosticRelatedInformationCapability = !!(
      textDocument &&
      textDocument.publishDiagnostics &&
      textDocument.publishDiagnostics.relatedInformation
    )

    return { capabilities }

  }

  /**
   *
   *
   * @param {*} resource
   * @param {*} connection
   * @returns
   * @memberof LiquidServer
   */
  documents (resource, connection) {

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
   * @param {ServerConfigureParams} event
   * @param {object} settings
   * @memberof LiquidServer
   */
  configure (event, settings) {

    return ({
      onDidChangeWatchedFiles: ({ changes: [ { uri } ] }) => {

        if (basename(this.rcfile) !== basename(uri)) return null

        this.#setUserSettings()

      },
      onDidChangeConfiguration: ({ liquid }) => {

        this.#setProviders(liquid)
        this.#setUserSettings()

      }

    }[event])(settings)

  }

  #rcfile = rcfile => {

    if (!rcfile) return false

    try {

      const read = readFileSync(rcfile).toString()
      const rules = JSON.parse(require('strip-json-comments')(read), null)

      return rules

    } catch (error) {

      return console.error(error.toString())

    }
  }

  #authenticate = license => {

    return license

  }

  /**
   * Set Provider Services
   *
   * @param {object} liquid
   */
  #setProviders = liquid => {

    for (const [ prop, setting ] of Object.entries(liquid)) {
      if (this.provider?.[prop] && setting?.enable) {
        this.provider[prop] = setting.enable
      }
    }

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   *
   * @returns
   * @memberof LiquidServer
   */
  #setUserSettings = () => {

    const settings = this.#rcfile(this.rcfile)

    if (!settings) return null

    this.engine = settings.engine
    this.engineLabel = `\n${_.upperFirst(settings.engine)} Liquid`

    this.#setSpecification()
    this.#setFormattingRules(settings.format)

  }

  /**
   * Set Parsing References
   *
   * @param {object} parse
   * @memberof LiquidServer
   */
  #setParsingConfig = () => {

    const { blocks, html, output, comments, frontmatter } = Expressions

    const objects = Object
    .entries(this.specification)
    .filter(([ prop, { type } ]) => type === 'object')
    .map(([ prop ]) => prop)

    const filters = Object
    .entries(this.specification)
    .filter(([ prop, { type } ]) => type === 'filter')
    .map(([ prop ]) => prop)

    this.parsing = {
      parsing: new RegExp(`${html}|${blocks}|${output}`, 'g'),
      objects: new RegExp(`\\b(${objects.join('|')})\\.?(\\b[\\w-.]+)?`, 'g'),
      filters: new RegExp(filters.join('|'), 'g')
    }

  }

  /**
   * Set Specification
   *
   * @memberof LiquidServer
   */
  #setSpecification = async () => {

    this.specification = await (await specs(this.license))[this.engine]()

    for (const spec of Object.values(this.specification)) {
      spec.kind = spec?.kind || 'liquid'
      spec.types = !spec?.types || spec.types.map(({ name }) => name)
      spec.props = !spec?.properties || spec.properties.map(propLevels)
    }

    return this.#setParsingConfig()
  }

  /**
   * Diagnostics
   *
   * @param {object} userRules
   * @memberof Server
   */
  #setDiagnosticRules = (userRules) => {

    for (const {
      meta: {
        group,
        rules
      }
    } of Object.values(validations)) Object.assign(rules, userRules[group])

  }

  /**
   * Formatter - Merges user configuration Config used
   * when formatting is being applied
   *
   * @param {object} userFormatRules
   * @memberof Config
   */
  #setFormattingRules = userFormatRules => {

    for (const language in userFormatRules) {

      const rules = userFormatRules[language]

      if (rules?.tags) {
        for (const associate of rules.tags) {
          this.formatRules.associateTags.push({
            ...associate
            , language
            , type: 'associate'
          })
        }
      }

      if (this.formatRules.customRules?.[language]) {
        this.formatRules.customRules[language] = _.pick(
          rules
          , Object.keys(this.formatRules.customRules[language])
        )
      }

      if (this.formatRules.languageRules?.[language]) {
        this.formatRules.languageRules[language] = {
          ...this.formatRules.languageRules[language]
          , ..._.omit(rules, this.formatRules.excludedRules)
          , ...this.formatRules.editorRules
        }
      }
    }

  }

}

// export const Server = new LiquidServer()

// Server.validate
// const s = new LanguageServerService()
