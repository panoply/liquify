import { IAttrs } from 'types';
import m from 'mithril';
import b from 'bss';
import * as monaco from 'monaco-editor';

export const Preview: m.Component<IAttrs> = {
  oncreate: ({ dom }) => monaco.editor.colorizeElement(dom as HTMLElement, {}),
  view: ({ attrs }) => m(
    `pre[data-lang="text/${attrs.input.language}"]` + b(
      {
        height: '100%',
        overflowY: 'scroll',
        backgroundColor: '#0e0e0e',
        fontFamily: '"Courier New", Monaco, Menlo, Monaco, "Courier New", monospace',
        fontWeight: 'normal',
        fontSize: '16px',
        fontFeatureSettings: '"liga" 0, "calt" 0',
        fontVariationSettings: 'normal',
        lineHeight: '19px',
        letterSpacing: '0px'
      }
    )
    , m.trust(attrs.editor.diff)
  )

};
