import * as IServer from 'types/server';

export class Config implements IServer.Config {

  rcfile: IServer.IRCFiles = {};

  rootUri: undefined;
  paths: {};

  capability: IServer.Capability = {
    hasConfigurationCapability: false,
    hasWorkspaceFolderCapability: false,
    hasDiagnosticRelatedInformationCapability: false
  };

  trace: IServer.Trace = {
    server: 'off'
  };

  notifier: IServer.Notifiers = {
    releases: true,
    recommendations: true,
    conflicts: true

  };

  provider: IServer.Providers = {
    format: true,
    formatOnType: true,
    completion: true,
    hover: true,
    validations: true,
    validateOnOpen: true,
    documentLinks: true,
    signatures: true
  };

  service: IServer.Services = {
    json: true,
    css: true,
    scss: false,
    javascript: false
  };

  formatting: IServer.Formatting = {

    ignore: {
      files: []
    },

    editorRules: {
      tabSize: 2,
      wordWrapColumn: 0
    },

    languageRules: {

      markup: {},
      json: {},
      script: {},
      style: {}
    }

  };

}
