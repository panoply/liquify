import type { editor } from 'monaco-editor';
import type { Rules, LanguageName, LanguageOfficialName } from 'esthetic';

export type Icons = (
  | 'pane'
  | 'document'
  | 'link'
  | 'table'
  | 'plus'
  | 'check'
  | 'cross'
  | 'gears'
  | 'github'
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
  actions: {
    /**
     * The current file
     */
    file?: IActions;
    /**
     * The Æsthetic JSON rules
     */
    rules?: IActions;
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
    github?: IActions
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
  actions: {
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
   * The Language identifier
   */
  diff: string;
  /**
   * Rules model and editor instances
   */
  rules: editor.IStandaloneCodeEditor;
  /**
  * Input editor session and instance
  */
  input: editor.IStandaloneCodeEditor;
}

export interface IFile {
  /**
   * A URI identifier of the current document
   */
  uri: string;
  /**
   * The order index of the document tab (`0` if tabs are disabled)
   */
  order: number;
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
   * The current hash reference
   *
   * @default null
   */
  hash: string;
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
   * @default false
   */
  languagesOpen: boolean;
  /**
   * Æsthetic Rules Editor Open
   *
   * @default false
   */
  rulesOpen: boolean;
  /**
   * Whether or not the Preview pane is open
   *
   * @default false
   */
  previewOpen: boolean;
  /**
   * Active File
   */
  set input(file: IFile)
  /**
   * Active Input
   */
  get input(): IFile
  /**
   * Active File index
   */
  idx: number;
  /**
   * List of open editor model files
   */
  model: {
    /**
     * Diff Preview Editor Model
     */
    diff: editor.ITextModel
    /**
    * Rules Editor model
    */
    rules: editor.ITextModel;
    /**
     * Input Editor Models
     */
    input: IFile[];
  }
  /**
   * Editor Instances
   */
  editor: IEditor;

}

export interface IOptions {

  /**
   * Monaco Editor Options
   *
   * These will be defined at runtime as defaults.
   */
  monaco?: editor.IEditorOptions;
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
   * Whether or not to allow tabs
   *
   * **NOT YET AVAILABLE**
   *
   * @deprecated
   */
  tabs?: boolean;
  /**
   * Sidebar Component
   *
   */
  sidebar?: ISidebar;
  /**
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
     * The accent color (ie: hovers, active etc)
     */
    accents?: string;
    /**
     * The border colors
     */
    borders?: string
  };
}

export interface Hash extends Omit<IAttrs, | 'hash' | 'input' | 'editor' | 'files' | 'model'> {
  input: {
    uri: string;
    order: number;
    language: string;
    languageName: LanguageOfficialName;
    model: string;
  }[]
}
