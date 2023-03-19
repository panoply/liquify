import type { Ace, Attrs } from 'types';
import { getLanguageService, TextDocument, type JSONSchema, type JSONDocument } from 'vscode-json-languageservice';
import m from 'mithril';
import * as ace from 'ace';
import esthetic from 'esthetic';
import { languages, paths } from 'store';
import { schema } from './schema';

// Create a web worker

// import and use this function in your other js files
export const useJsonLanguageService = (
  editor: Ace.Editor,
  schema: JSONSchema
) => {
  let textDocument: TextDocument;
  let jsonDocument: JSONDocument;

  const schemaUri = 'local://rules.json';
  const languageService = getLanguageService({
    schemaRequestService: (uri) => {

      console.log(uri);

      if (uri === schemaUri) {
        console.log('schema resolved');
        return Promise.resolve(JSON.stringify(schema));
      }
      return Promise.reject(new Error(`Unabled to load schema at ${uri}`));
    }
  });

  languageService.configure({
    allowComments: false,
    schemas: [
      {
        uri: 'local://rules.json',
        fileMatch: [ '*.json' ],
        schema
      }
    ]
  });

  function setContent (content: string) {
    textDocument = TextDocument.create('local://rules.json', 'json', 1, content);
    jsonDocument = languageService.parseJSONDocument(textDocument);
  }

  async function validate () {

    const diagnostics = await languageService.doValidation(textDocument, jsonDocument);

    const Tooltip = require('ace/tooltip').Tooltip;
    const tooltip = new Tooltip(editor.container);
    tooltip.setPosition(
      diagnostics[0].range.start.line,
      diagnostics[0].range.start.character
    );

    editor.session.setAnnotations(
      diagnostics.map((error) => ({
        row: error.range.start.line,
        text: error.message,
        type: 'error'
      }))
    );

  }

  function getAceCompleter (): Ace.Completer {

    return {
      getCompletions: async (editor, session, position, prefix, callback) => {

        const completionResult = await languageService.doComplete(
          textDocument,
          { line: position.row, character: position.column },
          jsonDocument
        );

        console.log(completionResult);

        if (completionResult) {
          callback(
            null,
            completionResult.items.map((item) => ({
              value: item.insertText ? item.insertText : item.label,
              score: item.kind ? item.kind : 10,
              meta: 'schema',
              snippet: item.label,
              caption: item.documentation as string
            }))
          );
        }
      }
    };
  }

  // create listeners
  editor.session.on('change', () => {
    setContent(editor.session.getValue());
    validate();
  });

  // add completer
  // @ts-ignore
  editor.com = [ getAceCompleter() ];

  // can use these to manually validate or setContent
  return {
    setContent,
    validate
  };
};

export const Rules: m.Component<Attrs> = {
  oncreate: async (
    {
      dom,
      attrs
    }
  ) => {

    if (!languages.has('json')) {
      await import(paths.languages.json);
      languages.add('json');
    }

    if (attrs.rules === null) {

      const rules = esthetic.rules();
      attrs.rules = ace.edit(dom as HTMLElement);
      attrs.rules.setTheme('ace/theme/potion');
      attrs.rules.session.setMode('ace/mode/json');
      attrs.rules.session.setValue(JSON.stringify(rules, null, 2));
      attrs.rules.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: '13px'
      });

      useJsonLanguageService(attrs.rules, schema);
    }

  },
  view: (
    {
      attrs
    }
  ) => m(
    'div'
    , {
      onclick: () => (
        attrs.selectLanguage = !attrs.selectLanguage
      )
      , style: {
        position: 'fixed',
        left: '0',
        width: '50%',
        height: '90%',
        top: '0',
        right: '0',
        'z-index': '9999'
      }
    }
  )

};
