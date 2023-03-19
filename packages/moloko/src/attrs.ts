import type { Attrs, Ace } from 'types';

/**
 * The default base path location entry file
 */
export const basePath = '.';

/**
 * Internal state reference.
 */
export const attrs: Attrs = {
  hash: '',
  idx: 1,
  ready: false,
  fontSize: 12,
  autoDetect: false,
  onChange: false,
  pane: 'split',
  editor: null,
  input: null,
  output: null,
  rules: null,
  language: 'liquid',
  languageName: 'Liquid + HTML',
  selectLanguage: false,
  mode: 'ace/mode/liquid',
  active: 0,
  files: [
    {
      filename: 'file.liquid',
      language: 'liquid',
      session: null
    }
  ],
  stats: {
    characterLength: '0 Characters',
    languageName: 'Plain Text',
    estheticTime: 'Formatted&nbsp;in&nbsp;0ms' as any
  }
};

export const commands = {
  onSave: <Ace.EditorCommand>{
    exec: null,
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S'
    }
  }
};
