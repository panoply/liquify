/* eslint-disable no-unused-vars */

import { LanguageName, Rules } from 'esthetic';
import type { editor } from 'monaco-editor';
import { IConfig } from './moloko';

export enum Mode {
  /**
   * Formatted Input Result
   */
  Formatted = 1,
  /**
   * Æsthetic Parse Error
   */
  ParseError,
  /**
   * Æsthetic Parse Table
   */
  ParseTable,
  /**
   * Runtime iFrame
   *
   * **NOT YET AVAILABLE**
   */
  Runtime,

}

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
   * The pane is opened
   */
  Reopen = 4,
}

export interface IAttrs {
  /**
   * Base Path for file resolutions
   */
  path: string;
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
   * Language reference
   */
  language: {
    state: State;
    current: LanguageName;
    detect: boolean;
  };
  input: {
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor;
  };
  preview: {
    state: State;
    mode: Mode;
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor
  };
  esthetic: {
    state: State;
    width: number;
    model: editor.ITextModel;
    editor: editor.IStandaloneCodeEditor;
    get rules(): Rules;
  }
}

export interface Hash extends Omit<IAttrs, | 'config' | 'hash' | 'screen' | 'input' | 'esthetic' | 'preview' | 'path'> {
  input: {
    value: string;
    width: number;
  },
  preview: {
    state: State;
    mode: Mode;
    width: number;
  },
  esthetic: {
    state: State;
    width: number;
    rules: Rules;
  }
}
