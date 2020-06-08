// @ts-check

import _ from 'lodash'
import fs from 'fs'
import { readFileSync, exists } from 'fs-extra'
import { basename } from 'path'
import { Config } from './config'
import { Expressions } from '../parser/lexical'
import { propLevels, regexp } from '../utils/functions'
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
  capabilities ({
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

    this.rcfile = rcfile
    this.license = license
    this.service = { ...this.service, ...service }
    this.hasConfigurationCapability = !!(workspace && !!workspace.configuration)
    this.hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders)
    this.hasDiagnosticRelatedInformationCapability = !!(
      textDocument &&
      textDocument.publishDiagnostics &&
      textDocument.publishDiagnostics.relatedInformation
    )

    if (this.hasWorkspaceFolderCapability) {
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
   * @param {*} resource
   * @param {*} connection
   * @returns
   * @memberof LiquidServer
   */
  documents = (resource, connection) => {

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

    return {

      /**
       * Configuration changed
       */
      onDidChangeConfiguration: ({ liquid }) => this.setProviders(liquid),

      /**
       * Changed files
       */
      onDidChangeWatchedFiles: ({ changes: [ { uri } ] }) => {

        return basename(this.rcfile) === basename(uri)
          ? this.setUserSettings()
          : null
      }

    }[event](settings)

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   *
   * @returns
   * @memberof LiquidServer
   */
  setUserSettings = async () => {

    const settings = await this.setLiquidrc(this.rcfile)

    await this.setSpecification(settings.engine)
    await this.setParseExpressions(this.specification)
    await this.setDiagnosticRules(settings.validate)
    await this.setFormattingRules(settings.format)

  }

  setLiquidrc = rcfile => {

    if (!rcfile) return null

    try {
      const read = readFileSync(rcfile).toString()
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
  setProviders = (liquid) => {

    Object.entries(liquid).forEach(([ prop, setting ]) => {
      if (this.provider?.[prop] && setting?.enable) {
        this.provider[prop] = setting.enable
      }
    })

    return this.setUserSettings()

  }

  /**
   * Set Specification
   *
   * @private
   * @memberof LiquidServer
   */
  setSpecification = async engine => {

    if (this.engine !== engine) {
      const spec = await specs(this.license)
      this.engine = engine
      this.engineLabel = `\n${_.upperFirst(engine)} Liquid`
      this.specification = spec[this.engine]()
    }

    return this.specification

  }

  setParseExpressions = ({ objects, filters }) => {

    const { html, blocks, output } = Expressions

    this.parser.parsing = regexp(`${html}|${blocks}|${output}`, 'g')
    this.parser.objects = regexp(`\\b(?:${objects})\\.?(?:[^\\s\\n]*\\b)?`, 'gm')
    this.parser.filters = regexp(Object.keys(filters).join('|'), 'g')

    return this.parser

  }

  /**
   * Diagnostics
   *
   * @param {object} userRules
   * @memberof Server
   */
  setDiagnosticRules = userRules => {

    Object.values(validations).forEach(({
      meta: {
        group,
        rules
      }
    }) => Object.assign(rules, userRules[group]))

    return validations

  }

  /**
   * Formatter - Merges user configuration Config used
   * when formatting is being applied
   *
   * @param {object} userFormatRules
   * @memberof Config
   */
  setFormattingRules = userFormatRules => {

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

    return this.formatRules

  }

}

// export const Server = new LiquidServer()

// Server.validate
// const s = new LanguageServerService()
