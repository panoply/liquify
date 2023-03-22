import { IAttrs } from 'types';
import * as hash from 'editor/hash';
import m from 'mithril';
import esthetic from 'esthetic';
import * as monaco from 'monaco-editor';

monaco.languages.registerDocumentRangeFormattingEditProvider({ language: 'liquid' }, {
  provideDocumentRangeFormattingEdits: (model) => {

    const text = esthetic.format(model.getValue());

    return [
      {
        text,
        range: model.getFullModelRange()
      }
    ];
  }
});

export const Input: m.Component<IAttrs> = {

  oncreate: ({ dom, attrs }) => {

    attrs.editor.input = monaco.editor.create(dom as HTMLElement, {
      model: attrs.input.model
    });

    attrs.editor.input.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      attrs.editor.input.getAction('editor.action.formatDocument').run();
    });

    attrs.input.model.onDidChangeContent(async event => {

      hash.encode(attrs);

      if (event.isRedoing || event.isUndoing) return;

      if (attrs.previewOpen && attrs.previewMode === 'diff') {
        const value = attrs.editor.input.getValue();
        const text = esthetic.format(value);
        attrs.editor.diff = await monaco.editor.colorize(text, attrs.input.language, {});
        m.redraw();
      }

    });

    // hash.encode(attrs);

  },

  view: () => m('div', { style: { height: '100%' } })

};
