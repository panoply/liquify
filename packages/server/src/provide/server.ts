import { InitializeParams, ServerCapabilities, WorkspaceFolder } from 'vscode-languageserver';
import { Parser } from './parser';
import { ILiquidrc } from 'types/settings';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { basename, resolve, join, normalize } from 'path';
import stripJSONC from 'strip-json-comments';
import { Config } from 'provide/config';
import esthetic, { Rules } from 'esthetic';

export class LiquidServer extends Config {

  public capabilities (
    {
      workspaceFolders,
      initializationOptions: {
        service = null
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

    this.getConfigFiles(workspaceFolders);
    this.service = Object.assign(this.service, service);

    /* CONFIG CAPABILITIES ------------------------ */

    this.capability.hasConfigurationCapability = !!(workspace && !!workspace.configuration);
    this.capability.hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders);
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

  private getConfigFiles (workspaceFolders: WorkspaceFolder[]) {

    const filenames = [
      '.env',
      '.liquidrc',
      '.liquidrc.js',
      '.liquidrc.yaml',
      '.liquidrc.yml',
      '.liquidrc.json',
      '.prettierrc',
      '.prettierrc.js',
      '.prettierrc.yaml',
      '.prettierrc.yml',
      '.prettierrc.json',
      '.prettierignore',
      '.jsbeautifyrc',
      '.jsbeautifyrc.js',
      '.jsbeautifyrc.yaml',
      '.jsbeautifyrc.yml',
      '.jsbeautifyrc.json',
      '.editorconfig'
    ];

    for (let i = 0; i < workspaceFolders.length; i++) {

      const { uri } = workspaceFolders[i];

      for (const filename of filenames) {

        const path = join(uri.slice(6), filename);

        if (existsSync(path)) {

          const match = filename.slice(1).match(/([a-z]+)(?:\.\b(js|json|yml|yaml)\b)?/);

          if (match === null) continue;

          const prop = match[1];

          if (typeof this.rcfile[prop] !== 'object') this.rcfile[prop] = {};

          this.rcfile[prop].path = path;
          this.rcfile[prop].filename = filename;
          this.rcfile[prop].language = match[2] ?? 'raw';

        }
      }
    }

  }

  private setFormatConfig (settings) {

    this.formatting.prettify = esthetic.rules();

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

    Parser.engine(settings.engine);

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

    const settings = this.parseLiquidrc(this.rcfile.liquidrc.path);

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
  public configure (event: 'onDidChangeWatchedFiles' | 'onDidChangeConfiguration', settings) {

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
      ) => basename(this.rcfile.liquidrc.path) !== basename(uri)
        ? null
        : this.setUserSettings()

      )(settings);

    }

  };

}
