import { InitializeParams, ServerCapabilities } from 'vscode-languageserver';
import { LiquidParser } from '@liquify/liquid-parser';
import { ILiquidrc } from 'types/settings';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
// import upperFirst from 'lodash/upperFirst';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { basename, resolve, join, normalize } from 'path';
import stripJSONC from 'strip-json-comments';
import { Config } from 'provide/config';

export class LiquidServer extends Config {

  public capabilities (
    {
      initializationOptions: {
        service = null,
        rcfile = null
      },
      capabilities: {
        textDocument,
        workspace
      }
    }: InitializeParams,
    capabilities: ServerCapabilities
  ) {

    /* TEXT DOCUMENT ------------------------------ */

    textDocument.completion.contextSupport = true;
    textDocument.completion.completionItem.snippetSupport = true;
    textDocument.completion.dynamicRegistration = true;

    /* CONFIG ------------------------------------- */

    this.rcfile = rcfile;
    this.service = { ...this.service, ...service };

    /* CONFIG CAPABILITIES ------------------------ */

    this.capability.hasConfigurationCapability = !!(
      workspace && !!workspace.configuration
    );

    this.capability.hasWorkspaceFolderCapability = !!(
      workspace && !!workspace.workspaceFolders
    );

    this.capability.hasDiagnosticRelatedInformationCapability = !!(
      textDocument &&
      textDocument.publishDiagnostics &&
      textDocument.publishDiagnostics.relatedInformation
    );

    if (this.capability.hasWorkspaceFolderCapability) {
      capabilities.workspace = { workspaceFolders: { supported: true } };
    }

    return { capabilities };

  }

  private setFormatConfig (settings) {

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
    ];

    for (const lang in settings.format) {

      const rules = settings.format[lang];

      if (this.formatting.languageRules?.[lang]) {
        this.formatting.languageRules[lang] = {
          ...this.formatting.languageRules[lang]
          , ...omit(rules, enforce)
          , ...this.formatting.editorRules
        };
      }
    }

  }

  /**
   * Parses the Liquidrc File
   */
  private parseLiquidrc (rcfile: string): ILiquidrc {

    if (!rcfile) return null;

    try {

      const read = readFileSync(rcfile).toString();
      const rules = JSON.parse(stripJSONC(read, { whitespace: false }));

      return rules;

    } catch (error) {

      throw console.error(error.toString());

    }

  }

  /**
   * Set Liquid Engine
   */
  public setLiquidEngine (settings) {

    LiquidParser.engine(settings.engine);

    // this.engineLabel = `\n${upperFirst(Parser.spec.variant.engine)} Liquid`;

    return this.setFormatConfig(settings);

  }

  /**
   * Set Path Includes
   */
  public setPathIncludes (settings) {

    if (!settings?.paths) return null;

    for (const path in settings.paths) {
      if (existsSync(settings.paths[path])) {
        const strip = normalize(settings.paths[path]);
        settings.paths[path] = readdirSync(resolve(strip)).map(file => (
          `${this.rootUri}/${join(strip, file)}`
        ));
      }
    }

  }

  /**
   * Get User Settings - Reads and parsed the `.liquidrc` file
   * containing user configuration
   */
  public setUserSettings () {

    const settings = this.parseLiquidrc(this.rcfile);

    return this.setLiquidEngine(settings);

  }

  /**
   * Set Provider Services
   *
   * @private
   * @param {object} liquid
   */
  public setProviders ({ liquid }) {

    Object.entries(liquid).forEach(([ prop, setting ]) => {
      if (this.provider?.[prop] && setting?.enable) {
        this.provider[prop] = setting.enable;
      }
    });

    return this.setUserSettings();

  }

  /**
   * Configure Server Settings
   */
  public configure = (
    event: 'onDidChangeWatchedFiles' | 'onDidChangeConfiguration',
    settings
  ) => {

    if (event === 'onDidChangeConfiguration') {
      return this.setProviders(settings);
    }
    if (event === 'onDidChangeWatchedFiles') {

      return ((
        {
          changes: [
            {
              uri
            }
          ]
        }
      ) => basename(this.rcfile) !== basename(uri)
        ? null
        : this.setUserSettings()

      )(settings);

    }

  }

}
