// @ts-check

import _ from 'lodash'
import fs from 'fs'
import path from 'path'
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
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ServerConfigureParams} ServerConfigureParams
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').FormattingRules} FormattingRules
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ValidationPromises} ValidationPromises
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
  async capabilities (initializeParams, capabilities) {

    const spec = await specs('sissel siv')

    console.log(spec.shopify())

    const {
      initializationOptions: {
        service = null,
        rcfile = null
      },
      capabilities: {
        textDocument,
        workspace
      }
    } = initializeParams

    // Language Services
    Object.assign(this.service, service)

    // Location of `.liquidrc` file
    this.rcfile = rcfile

    // Completion capabilities
    textDocument.completion.contextSupport = true
    textDocument.completion.dynamicRegistration = true
    textDocument.completion.completionItem.snippetSupport = true

    // Workspace configuration patches
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
      onDidChangeWatchedFiles: (
        { changes: [ { uri } ] }
      ) => ((
        path.basename(this.rcfile) === path.basename(uri)
      ) && (
        this.#setUserSettings()
      )),
      onDidChangeConfiguration: ({ liquid }) => (
        this
        .#setProviders(liquid)
        .#setUserSettings()
      )
    }[event])(settings)

  }

  #rcfileReadSync = () => {

    if (!this.rcfile) return false

    try {

      const read = fs.readFileSync(this.rcfile, 'utf8')
      const rules = JSON.parse(require('strip-json-comments')(read), null)

      return rules

    } catch (error) {

      return console.error(error.toString())

    }

  }

  /**
   * Set Provider Services
   *
   * @param {object} liquid
   */
  #setProviders = liquid => {

    Object.entries(liquid).forEach(([
      prop,
      setting
    ]) => (
      _.has(this.provider, prop) && _.has(setting, 'enable')
    ) && (
      this.provider[prop] = setting.enable
    ))

    return this

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   *
   * @returns
   * @memberof LiquidServer
   */
  #setUserSettings = () => {

    const settings = this.#rcfileReadSync()

    console.log(settings)

    if (!settings) return null

    // Set Readable Engine Label
    // Used for Diagnostics and Hover descriptions
    settings.engineLabel = `\n${_.upperFirst(settings.engine)} Liquid`

    return this
    .#setVariationEngine(settings.engine)
    .#setDiagnosticRules(settings.validate)
    .#setFormattingRules(settings.format)

  }

  /**
   * Set Variation Engine - Sets the specification references
   *
   * @param {string} engine
   * @memberof LiquidServer
   */
  #setVariationEngine = (engine) => {

    // Return early if engine has not changed
    if (this.engine === engine) return this

    this.engine = engine

    const { spec, parse } = require('@liquify/liquid-language-specs')

    this.specification = spec

    return this
    .#setParsingConfig(parse)
    .#setSpecification()

  }

  /**
   * Set Parsing References
   *
   * @param {object} parse
   * @memberof LiquidServer
   */
  #setParsingConfig = (parse) => {

    const { blocks, html, output, comments, frontmatter } = Expressions

    this.parsing = {
      parsing: new RegExp(`${html}|${blocks}|${output}`, 'g'),
      objects: new RegExp(`\\b(${parse.objects.join('|')})\\.?(\\b[\\w-.]+)?`, 'g'),
      filters: new RegExp(parse.filters.join('|'), 'g')
    }

    return this.#setSpecification()

  }

  /**
   * Set Specification
   *
   * @memberof LiquidServer
   */
  #setSpecification = () => {

    for (const prop in this.specification) {

      const spec = this.specification[prop]

      // Mark all tag kinds as liquid is `kind` property is not defined
      !_.has(spec, 'kind') && (spec.kind = 'liquid')

      // Extract types
      _.has(spec, 'types') && (spec.types = spec.types.map(({ name }) => (name)))

      // Extract properties
      _.has(spec, 'properties') && (
        spec.props = _.isArray(spec.properties)
          ? spec.properties.map(propLevels)
          : spec.properties || true
      )

    }

    return this

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

    return this

  }

  /**
   * Formatter - Merges user configuration Config used
   * when formatting is being applied
   *
   * @param {object} userFormatRules
   * @memberof Config
   */
  #setFormattingRules = (userFormatRules) => {

    for (const language in userFormatRules) {

      const rules = userFormatRules[language]

      if (rules?.tags) {
        for (const associate of rules.tags) {
          Object.assign(associate, { language, type: 'associate' })
          this.formatRules.associateTags.push({ ...associate })
        }
      }

      if (this.formatRules.customRules?.[language]) {
        this.formatRules.customRules[language] = _.pick(
          rules
          , _.keys(this.formatRules.customRules[language])
        )
      }

      if (this.formatRules.languageRules?.[language]) {
        Object.assign(
          this.formatRules.languageRules[language]
          , _.omit(rules, this.formatRules.excludedRules)
          , this.formatRules.editorRules
        )
      }
    }

  }

}

// export const Server = new LiquidServer()

// Server.validate
// const s = new LanguageServerService()
