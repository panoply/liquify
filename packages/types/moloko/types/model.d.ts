/* eslint-disable no-unused-vars */

import { LanguageName, Rules } from 'esthetic';
import type { editor } from 'monaco-editor';
import { IConfig } from './moloko';
import { Mode } from 'editor/enums';

export enum State {
  /**
   * The pane (editor) is not active
   */
  Hidden = 1,
  /**
   * The pane is opening or in transition
   */
  Toggle = 2,
  /**
   * The pane is opened
   */
  Opened = 3,
  /**
   * Re-open a closed pane on next toggle
   */
  Reopen = 4,
  /**
   * Prevent Pane from toggling
   */
  Disable = 5,
}

export interface IAttrs {
  /**
   * Base Path for file resolutions
   */
  path: string;
  /**
   * the current open sidebar item
   */
  open: string;
  /**
   * The current hash reference
   *
   * @default null
   */
  hash: string;
  /**
   * Current screen width
   */
  get config(): IConfig
  /**
   * Code Samples
   */
  documents: {
    plaintext: {
      sample: string;
      input: string;
    };
    html: {
      sample: string;
      input: string;
    };
    xml: {
      sample: string;
      input: string;
    };
    liquid: {
      sample: string;
      input: string;
    };
    css: {
      sample: string;
      input: string;
    };
    json: {
      sample: string;
      input: string;
    };
    scss: {
      sample: string;
      input: string;
    };
    javascript: {
      sample: string;
      input: string;
    };
    typescript: {
      sample: string;
      input: string;
    };
    jsx: {
      sample: string;
      input: string;
    };
    tsx: {
      sample: string;
      input: string;
    };
    yaml: {
      sample: string;
      input: string;
    };
  }
  /**
   * Language reference
   */
  language: {
    state: State;
    node: HTMLElement,
    current: LanguageName;
    detect: boolean;
  };
  input: {
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor;
    node: HTMLElement;
    state: State;
  };
  preview: {
    state: State;
    mode: Mode;
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor,
    node: HTMLElement
  };
  table: {
    state: State;
    width: number;
    node: HTMLElement
  };
  rules: {
    state: State;
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor;
    esthetic: Rules;
    node: HTMLElement
  }
}

export interface Hash extends Omit<IAttrs, (
  | 'config'
  | 'hash'
  | 'screen'
  | 'input'
  | 'rules'
  | 'preview'
  | 'path'
)> {
  input: {
    value: string;
    width: number;
    state: State
  },
  preview: {
    state: State;
    mode: Mode;
    width: number;
  },
  rules: {
    state: State;
    width: number;
    esthetic: Rules;
  }
}
