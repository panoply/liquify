
import { Options, SharedOptions, MarkupOptions, JSONOptions, ScriptOptions, StyleOptions } from '@liquify/prettify';
import type { actions } from './actions';

export interface File {
  /**
   * Whether or not the tab (file) is open
   */
  open: boolean;
  /**
   * The lexer this value is using
   */
  lexer: string;
  /**
   * The provided input string, ie: source of the file.
   * This will remain static unless editor is enabled.
   * The beautified output will be written to `output`
   */
  source: string;
  /**
   * The beautified source string.
   */
  output: string;
  /**
   * Whether or not the this file is a sample
   */
  sample: boolean;
  /**
   * Whether or not the editor is active
   */
  editor: boolean;
  /**
   * The presumed or defined language of the file
   */
  language: string;
}

export interface Rulesets {
  /**
   * Global rules - The global rulesets are grouped
   * in an isolated manner for the purpose of the playground.
   */
  global: SharedOptions;
  /**
   * Markup specific rulesets
   */
  liquid: Options['liquid'];
  /**
   * Markup specific rulesets
   */
  markup: MarkupOptions;
  /**
   * Script specific rulesets
   */
  script: ScriptOptions;
  /**
   * Style specific rulesets
   */
  style: StyleOptions;
  /**
   * JSON specific rulesets
   */
  json: JSONOptions;

}

export interface State {
  /**
   * A boolean value informing on whether or not beautification
   * is being applied.
   */
  loading: boolean;
  /**
   * Formatting errors (if any)
   */
  error: string;
  /**
   * The Prettify version
   */
  version: string;
  /**
   * The current opened filename, use this to reference
   * documents in `files`;
   */
  open: string;
  /**
   * The applied per-language formatting rules
   */
  rules: Rulesets;
  /**
   * The combined formatting rules. The value
   * defined here will be passed to prettydiff. It
   * includes all formatting options.
   */
  options: Partial<Options>;

}

export interface Attrs {
  s: State;
  a: ReturnType<typeof actions>
}
