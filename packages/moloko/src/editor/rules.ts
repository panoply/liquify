import type { IAttrs } from 'types';
import m from 'mithril';
import * as monaco from 'monaco-editor';
import esthetic from 'esthetic';

monaco.languages.registerDocumentRangeFormattingEditProvider({ language: 'json' }, {
  provideDocumentRangeFormattingEdits: (model) => {

    const text = esthetic.json(model.getValue());

    return [
      {
        text,
        range: model.getFullModelRange()
      }
    ];
  }
});

export const Rules: m.Component<IAttrs> = {
  oncreate: (
    {
      dom,
      attrs
    }
  ) => {

    attrs.editor.rules = monaco.editor.create(dom as HTMLElement, {
      model: attrs.model.rules
    });

    attrs.editor.rules.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {

      esthetic.rules(JSON.parse(attrs.model.rules.getValue()));

      console.log(esthetic.rules());

      attrs.editor.rules
        .getAction('editor.action.formatDocument')
        .run()
        .then(async () => {

          await attrs.editor.input
            .getAction('editor.action.formatDocument')
            .run();

        });
    });

  },
  onremove: ({ attrs }) => {

    attrs.editor.rules.dispose();

  },
  view: () => m('div', { style: { height: '100%', overflow: 'hidden' } })

};
