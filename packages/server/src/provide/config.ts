import * as IServer from 'types/server';

export class Config implements IServer.Config {

  rcfile: undefined
  rootUri: undefined
  paths: {}

  capability: IServer.Capability = {
    hasConfigurationCapability: false,
    hasWorkspaceFolderCapability: false,
    hasDiagnosticRelatedInformationCapability: false
  }

  trace: IServer.Trace = {
    server: 'off'
  }

  notifier: IServer.Notifiers = {
    releases: true,
    recommendations: true,
    conflicts: true

  }

  provider: IServer.Providers = {
    format: true,
    formatOnType: true,
    completion: true,
    hover: true,
    validations: true,
    validateOnOpen: true,
    documentLinks: true,
    signatures: true
  }

  service: IServer.Services= {
    json: true,
    css: false,
    scss: false,
    javascript: false
  }

  formatting: IServer.Formatting = {

    ignore: {
      files: []
    },

    editorRules: {
      tabSize: 2,
      wordWrapColumn: 0
    },

    languageRules: {

      html: {
        mode: 'beautify',
        end_quietly: 'quiet',
        node_error: true,
        language_name: 'HTML/Liquid',
        language: 'html',
        language_default: 'html',
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
        correct: false,
        attribute_sort: false,
        attribute_sort_list: '',
        force_attribute: false,
        force_indent: false,
        quote_convert: 'none',
        tag_merge: false,
        tag_sort: false,
        unformatted: false,
        indent_char: ' ',
        jsscope: 'none',
        wrap: 0,
        tags: []
      },

      json: {
        jsscope: 'none',
        mode: 'beautify',
        end_quietly: 'quiet',
        node_error: true,
        language_name: 'JSON',
        language_default: 'json',
        language: 'json',
        lexer: 'script',
        brace_style: 'none',
        indent_char: ' ',
        correct: false,
        end_comma: 'never',
        format_array: 'default',
        format_object: 'default',
        no_semicolon: true,
        object_sort: false,
        quote_convert: 'double',
        wrap: 0,
        new_line: true,
        indent_size: 2,
        indent_level: 0,
        preserve: 1,
        brace_line: false,
        braces: false,
        tags: []
      },

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
