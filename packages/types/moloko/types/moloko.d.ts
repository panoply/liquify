import type { editor } from 'monaco-editor';
import type { Rules, LanguageName, LanguageOfficialName } from 'esthetic';
import type { Liquid } from 'liquidjs';
export { StandardProperties as Style } from 'csstype';

export type Icons = (
  | 'pane'
  | 'document'
  | 'link'
  | 'table'
  | 'plus'
  | 'check'
  | 'eye'
  | 'cross'
  | 'gears'
  | 'ghissue'
  | 'refresh'
  | 'issue'
  | 'discord'
  | 'code'
  | 'rules'
  | 'detect'
  | 'detectoff'
)

export type ISidebarActionKeys = (
  | 'document'
  | 'rules'
  | 'github'
  | 'link'
  | 'command'
)

export interface IGithubIssue {
  /**
   * The Issue Description
   */
  body?: string;
  /**
   * The Issue Title
   */
  title?: string;
  /**
   * List of labels to apply
   */
  labels?: string[];
  /**
   * Render Template
   */
  template?: string
  /**
   * Attach milestone
   */
  milestone?: string;
  /**
   * Apply Assigneee
   */
  assignee?: string;
  /**
   * Attach Projects
   */
  projects?: string[]
}

export interface IActions {
  /**
   * Whether or not action is active/enabled.
   */
  active: boolean;
  /**
   * The icon to use
   */
  icon: Icons;
  /**
   * Tooltip Hover
   */
  tooltip?: string;
}

export interface ISidebar {
  /**
   * Enable sidebar
   *
   * @default true
   */
  enable?: boolean;
  /**
   * Width of the sidebar
   *
   * @default 75
   */
  width?: number;
  /**
   * Sidebar background color (defaults to `ui.background`)
   *
   * @default '#0f1215'
   */
  background?: string;
  /**
   * Action Buttons
   *
   * Returns in the order of each key.
   */
  actions?: {
    /**
     * The current file
     */
    file?: IActions;
    /**
     * The Æsthetic JSON rules
     */
    rules?: IActions;
    /**
     * Whether or not to show parse table
     */
    table?: IActions;
    /**
     * Whether or not to activate preview pane
     */
    preview?: IActions;
    /**
     * Hash link copy
     */
    link?: IActions;
    /**
     * Rules export
     */
    export?: IActions
    /**
     * Submit an issue to github with playground reference
     */
    ghissue?: IActions
  }
}

export interface IFooter {
  /**
   * Enable footer
   *
   * @default true
   */
  enable?: boolean;
  /**
   * Height of the footer
   *
   * @default 35
   */
  height?: number;
  /**
   * Footer background color (defaults to `ui.background`)
   *
   * @default '#0f1215'
   */
  background?: string;
  /**
   * Action Buttons
   *
   * Returns in the order of each key.
   */
  actions?: {
    /**
     * Language detection control
     *
     */
    detect?: IActions;
    /**
     * The Æsthetic JSON rules
     */
    language?: IActions;
    /**
     * The formatting toggle
     */
    formatToggle?: IActions;
    /**
     * Formatting stats
     */
    stats?: IActions;
  }

}

export interface IEditor {
  /**
   * Rules model and editor instances
   */
  rules: editor.IStandaloneCodeEditor;
  /**
  * Input editor session and instance
  */
  input: editor.IStandaloneCodeEditor;
  /**
  * Input editor session and instance
  */
  preview: editor.IStandaloneCodeEditor;
}

export interface IFile {
  /**
   * The Language identifier
   */
  language: string;
  /**
   * The Official Language Name
   */
  languageName: LanguageOfficialName;
  /**
   * Input editor session and instance
   */
  model: editor.ITextModel;
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
   * **NOT YET AVAILABLE**
   *
   * Additional Service modules for extended usage
   *
   * @default null
   */
  service: {
    /**
     * LiquidJS rendered
     */
    liquidjs: Liquid
  };
  /**
   * Panes Width
   */
  panes: {
    /**
     * Input Editor
     */
    editor: number;
    /**
     * Rules
     */
    rules: number;
    /**
     * Rules
     */
    preview: number;
  };
  /**
   * Æsthetic formatting Rules
   */
  get rules(): Rules;
  /**
   * The preview mode showing
   *
   * @default null
   */
  previewMode: null | 'diff' | 'table';
  /**
   * Whether or not language detection is enabled
   *
   * @default true
   */
  detectLanguage: boolean;
  /**
   * Whether or not the language selector is open
   *
   * - `0` _inactive (hidden)_
   * - `1` _active (shown)_
   * - `2` _toggled (transitions)_
   *
   * @default 0
   */
  languagesOpen: 0 | 1 | 2;
  /**
   * Æsthetic Rules Editor Open
   *
   * - `0` _inactive (hidden)_
   * - `1` _active (shown)_
   * - `2` _toggled (transitions)_
   *
   * @default 0
   */
  rulesOpen: 0 | 1 | 2;
  /**
   * Whether or not the Preview pane is open
   *
   * - `0` _inactive (hidden)_
   * - `1` _active (shown)_
   * - `2` _toggled (transitions)_
   *
   * @default 0
   */
  previewOpen: 0 | 1 | 2;
  /**
   * List of open editor model files
   */
  model: {
    /**
     * Preview String
     */
    preview: string;
    /**
    * Rules Editor model
    */
    rules: editor.ITextModel;
    /**
     * Input Editor Models
     */
    input: editor.ITextModel;
  }
  /**
   * Editor Instances
   */
  editor: IEditor;

}

export interface IConfig {
  /**
   * URI Path Resolved
   *
   * By default, all files will resolve at the following locations:
   *
   * - `https://website.com/moloko.js`
   * - `https://website.com/moloko.css`
   * - `https://website.com/module/esthetic.js`
   * - `https://website.com/module/mithri.js`
   * - `https://website.com/monaco/monaco.js`
   * - `https://website.com/monaco/monaco.css`
   * - `https://website.com/monaco/workers/css.js`
   * - `https://website.com/monaco/workers/editor.js`
   * - `https://website.com/monaco/workers/html.js`
   * - `https://website.com/monaco/workers/json.js`
   * - `https://website.com/monaco/workers/typescript.js`
   * - `https://website.com/samples/plaintext.js`
   * - `https://website.com/samples/html.js`
   * - `https://website.com/samples/xml.js`
   * - `https://website.com/samples/liquid.js`
   * - `https://website.com/samples/css.js`
   * - `https://website.com/samples/json.js`
   * - `https://website.com/samples/scss.js`
   * - `https://website.com/samples/javascript.js`
   * - `https://website.com/samples/typescript.js`
   * - `https://website.com/samples/jsx.js`
   * - `https://website.com/samples/tsx.js`
   * - `https://website.com/samples/yaml.js`
   */
  resolve?: {
    /**
     * Origin Location
     *
     * @default window.location.origin
     */
    origin?: string;
    /**
     * Moloko Directory location.
     *
     * **NOTE**
     *
     * Do not include extensions, provide only path detinations.
     *
     * ```js
     * import moloko from 'moloko';
     *
     * moloko.mount(document.body, {
     *   resolve: {
     *     path: 'assets/moloko' // Resolution path for workers
     *   }
     * })
     *
     * ```
     */
    path?: string;
    /**
     * Mithril Module
     *
     * `true`
     *
     * Uses the included mithril module.
     *
     * `false`
     *
     * Passing `false` will expect a variable of `m` to be exposed on `globalThis`
     *
     * `string`
     *
     * A path value or CDN reference to resolve mithril
     *
     *
     * `typeof m`
     *
     * Provide an already invoked mithril instance
     *
     * ```js
     * import m from 'mithril';
     * import moloko from 'moloko';
     *
     * moloko.mount(document.body, {
     *   resolve: {
     *     mithril: m // provide the mithril import here
     *   }
     * })
     *
     * ```
     * @default true
     */
    mithril?: boolean | string | typeof import('mithril');

    /**
     * Whether to use bundled esthetic.js
     *
     * `true`
     *
     * Uses the included esthetic module.
     *
     * `false`
     *
     * Passing `false` will expect a variable of `esthetic` to be exposed on `globalThis`
     *
     * `string`
     *
     * A path value or CDN reference to resolve esthetic
     *
     *
     * `typeof esthetic`
     *
     * Provide an already invoked esthetic instance
     *
     * ```js
     * import esthetic from 'mithril';
     * import moloko from 'moloko';
     *
     * moloko.mount(document.body, {
     *   resolve: {
     *     esthetic // provide the esthetic import here
     *   }
     * })
     *
     * ```
     * @default true
     */
    esthetic?: boolean | string | typeof import('esthetic');
  };
  /**
   * Use Moloko Code Samples
   *
   * @default true
   */
  samples?: boolean | {
    /**
     * Plaintext
     *
     * @default true
     */
    plaintext: boolean;
    /**
     * HTML
     *
     * @default true
     */
    html: boolean;
    /**
     * XML
     *
     * @default true
     */
    xml: boolean;
    /**
     * Liquid
     *
     * @default true
     */
    liquid: boolean;
    /**
     * CSS
     *
     * @default true
     */
    css: boolean;
    /**
     * JSON
     *
     * @default true
     */
    json: boolean;
    /**
     * SCSS
     *
     * @default true
     */
    scss: boolean;
    /**
     * JavaScript
     *
     * @default true
     */
    javascript: boolean;
    /**
     * TypeScript
     *
     * @default true
     */
    typescript: boolean;
    /**
     * JSX
     *
     * @default true
     */
    jsx: boolean;
    /**
     * TSX
     *
     * @default true
     */
    tsx: boolean;
    /**
     * YAML
     *
     * @default true
     */
    yaml: boolean;
  }
  /**
   * Splash screen loading for when moloko intializes
   *
   * @default true
   */
  splash?: boolean
  /**
   * Monaco Editor Options
   *
   * These will be defined at runtime as defaults.
   */
  monaco?: editor.IEditorOptions;
  /**
   * **NOT YET AVAILABLE**
   *
   * Tabs
   */
  tabs?: boolean;
  /**
   * **NOT YET AVAILABLE**
   *
   * Whether or not instructions should render onload
   */
  instructions?: boolean;
  /**
   * Æsthetic Rules
   */
  rules?: {
    /**
     * Enable Æsthetic
     *
     * @default true
     */
    enable?: boolean;
    /**
     * Pass Æsthetic rules for startup instance
     */
    esthetic?: Rules;
  };
  /**
   * The code preview pane
   */
  preview?: {
    /**
     * Enable Preview
     *
     * @default true
     */
    enable?: boolean;
    /**
     * The background colour of the preview pane
     */
    background?: string;
    /**
     * Control the scroll sync behaviour
     */
    scrollSync?: 'off' | 'auto' | 'instant' | 'smooth';
  }
  /**
   * The default Language
   *
   * @default liquid
   */
  language?: LanguageName;
  /**
   * Offset Top
   */
  offset?: number;
  /**
   * Whether or not language detection is enabled
   *
   * @default true
   */
  detect?: boolean;
  /**
   * Whether or not to persist in a hash
   *
   * @default true
   */
  hash?: boolean;
  /**
   * The default input to render.
   *
   * @default ''
   */
  input?: LanguageName;
  /**
   * Whether or not to render preview diff
   *
   * @default false
   */
  diff?: boolean;
  /**
   * Sidebar Component
   */
  sidebar?: ISidebar;
  /**
   * **NOT YET AVAILABLE**
   *
   * Footer Component
   */
  footer?: IFooter;
  /**
   * Moloko base colors
   */
  colors?: {
    /**
     * The base background color
     */
    background?: string;
    /**
     * The base backdrop color (a lighter tone than background)
     */
    backdrop?: string;
    /**
     * The accent color (ie: hovers, active etc)
     */
    accents?: string;
    /**
     * The border colors
     */
    borders?: string
  };
}

export interface Hash extends Omit<IAttrs, (
  | 'hash'
  | 'input'
  | 'editor'
  | 'files'
  | 'model'
  | 'path'
)> {
  model: string;
  language: string;
}
