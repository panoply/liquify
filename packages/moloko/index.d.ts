import { Editor } from './types/editor';
import type Prettify from '@liquify/prettify';
import type { Options as PrettifyOptions } from '@liquify/prettify';
import { Options, Languages, Paths, Attrs, ISamples } from './types/moloko';
export * as Ace from './types/editor';
export * from './types/moloko';

/**
 * **Moloko Editor 🥛**
 *
 * Liquid text editor built atop of Ace.
 */
declare const moloko: {
  /**
   * **Moloko Mount**
   *
   * Renders the text edtior to the provided element.
   * Optionally pass in options.
   */
  mount(element: Element | HTMLElement, options?: Options): Promise<Editor>
  /**
   * **Prettify 💅**
   *
   * Returns the Prettify instance used by the editor. If `options.format` is
   * `false` then `null` is returned.
   */
  prettify: typeof Prettify;
  /**
   * Invoke programmatic beautification on the current active file.
   * This function expects beautification rules to be passed.
   */
  beautify(rules: PrettifyOptions): typeof Prettify;
  /**
   * Toggles pane views
   */
  pane (pane: 'split' | 'editor' | 'preview'): void
  /**
   * A `Set` of language modes that have been loaded.
   * Use `store.languages.has` method to check if an ESM
   * mode has been loaded or not.
   */
  languages: Set<Languages>;
  /**
   * Path mappings to modules used by moloko.
   */
  paths: Paths;
  /**
   * The editor options provided in `mount`
   */
  options: Options;
  /**
   * A list of getter/setters for interacting with
   * the current open file.
   */
  file: File;
  /**
   * The state object
   */
  state(): Attrs;
  /**
   * Merges and updates editor options. This function
   * does not allow language or theme updates to be applied,
   * for augmenting those use `file` session.
   */
  config(options?: Omit<Options, 'language' | 'theme' | 'format'>): Options;
  /**
   * Loads a sample snippets (Prettify specific option)
   */
  sample (file: keyof ISamples): Promise<string>

};

export default moloko;
