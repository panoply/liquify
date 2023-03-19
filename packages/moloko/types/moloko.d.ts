import type { Editor, IEditSession, Split } from 'types/editor';
import type { Rules } from 'esthetic';
import m from 'mithril';

export type Languages = (
  | 'liquid'
  | 'javascript'
  | 'jsx'
  | 'typescript'
  | 'tsx'
  | 'html'
  | 'css'
  | 'scss'
  | 'json'
  | 'markdown'
  | 'xml'
  | 'yaml'
  | 'text'
  | 'auto'
)

type SamplePaths<T extends string> = `${GetBasePath<'.' | `./${string}/`>}moloko/samples/${T}.js`

export interface Samples {
  liquid: {
    name: 'Liquid',
    path: SamplePaths<'liquid' | 'shopify' | 'eleventy' | 'jekyll'>
  }[];
}

export interface Options {
  /**
   * The document language
   *
   * @default 'liquid'
   */
  language?: Languages;
  /**
   * The font size of the editor
   *
   * @default 12.7 // converts to pixels
   */
  fontSize?: number;
  /**
   * Mithril components to be rendered
   */
  components?: {
    /**
     * Rendered for newfiles that have been created
     */
    newFile?: m.Component<Attrs>
  };
  /**
   * The distributed bundle location, where the entry file exists.
   * The `basePath` location will be relative to the distribution path, eg:
   *
   * ```
   * // The distribution entry file that is put to:
   * './dist/index.js'
   *
   * // The base path moloko directory will exist at:
   * './dist/moloko/'
   * ```
   *
   * @default '.'
   */
  basePath?: '.' | `./${string}/`;
  /**
   * The editor theme to use (defaults to potion),
   *
   * **NOTE**: You should probably not use Github theme
   * util the project is more stable.
   *
   * @default 'potion'
   */
  theme?: 'potion' | 'github';
  /**
   * Whether or not to compress and save editor state
   * in an ecoded URI which preserves editor state between
   * page refreshing and allows sharable linking.
   *
   * @default `true`
   */
  hash?: boolean;
  /**
   * Whether or not formatting is enabled
   *
   * @default true
   */
  format?: boolean;
  /**
   * Whether or not formatting should be applied to
   * documents on save. When `true` the editor will
   * listen for `cmd + s` and run Prettify when invoked.
   *
   * @default true
   */
  formatOnSave?: boolean;
  /**
   * **NOT YET AVAILABLE**
   *
   * Whether or not users can control editor settings.
   * When `true` the workspace will render a toggle
   * button which exposes editor settings. (defaults to `false`)
   *
   * @default false
   */
  allowSettings?: boolean;
}

type GetBasePath<T extends Options['basePath']> = T extends '.' ? './' : `./${string}/`

export interface Paths {
  /**
   * The paths to themes contained within the project.
   */
  themes: {
    potion: `${GetBasePath<'.' | `./${string}/`>}moloko/themes/potion.js`,
    github: `${GetBasePath<'.' | `./${string}/`>}moloko/themes/github.js`
  };
  /**
   * The paths to language mode files contained  within the project.
   */
  languages: {
    liquid: `${GetBasePath<'.' | `./${string}/`>}moloko/language/liquid.js`,
    javascript: `${GetBasePath<'.' | `./${string}/`>}moloko/language/javascript.js`,
    typescript: `${GetBasePath<'.' | `./${string}/`>}moloko/language/typescript.js`,
    css: `${GetBasePath<'.' | `./${string}/`>}moloko/language/css.js`,
    html: `${GetBasePath<'.' | `./${string}/`>}moloko/language/html.js`,
    jsx: `${GetBasePath<'.' | `./${string}/`>}moloko/language/jsx.js`,
    scss: `${GetBasePath<'.' | `./${string}/`>}moloko/language/scss.js`,
    tsx: `${GetBasePath<'.' | `./${string}/`>}moloko/language/tsx.js`,
    json: `${GetBasePath<'.' | `./${string}/`>}moloko/language/json.js`,
    markdown: `${GetBasePath<'.' | `./${string}/`>}moloko/language/markdown.js`,
    xml: `${GetBasePath<'.' | `./${string}/`>}moloko/language/xml.js`,
    yaml: `${GetBasePath<'.' | `./${string}/`>}moloko/language/yaml.js`,
    text: `${GetBasePath<'.' | `./${string}/`>}moloko/language/text.js`,
    auto: `${GetBasePath<'.' | `./${string}/`>}moloko/language/text.js`
  };
}

export interface Attrs {
  /**
   * Whether or not editor is ready
   *
   * @default false
   */
  ready: boolean;
  /**
   * The file language
   *
   * @default 'liquid'
   */
  language: Languages;
  /**
   * The file language name
   *
   * @default 'Liquid
   */
  languageName: string;
  /**
   * The font size of the editor
   *
   * @default 12.7 // converts to pixels
   */
  fontSize: number;
  /**
   * Automatically detect language
   *
   * @default false
   */
  autoDetect: boolean;
  /**
   * Whether or not the onChange listener is enabled
   *
   * @default false
   */
  onChange: boolean;
  /**
   * The current editor split index. A value of `0` when pane is
   * `preview` or `1` when pane is `editor` or `split`.
   *
   * @default 1
   */
  idx: 0 | 1;
  /**
   * The current pane view
   *
   * @default 'split'
   */
  pane: 'split' | 'editor' | 'preview'
  /**
   * Whether or not select language is open
   *
   * @default false
   */
  selectLanguage: boolean;
  /**
   * The current mode reference
   *
   * @default 'ace/mode/liquid'
   */
  mode: `ace/mode/${Languages}`;
  /**
   * The current hash reference
   *
   * @default null
   */
  hash: string;
  /**
   * Editor
   */
  editor: Split;
  /**
   * Input editor session and instance
   */
  input: IEditSession;
  /**
   * Output editor session and instance
   */
  output: IEditSession;
  /**
   * Æsthetic rules editor session and instance
   */
  rules: Editor;
  /**
   * An index reference to the current opened file.
   * When not using file tabs, this will be `0`
   */
  active: number;
  /**
   * Files
   */
  files: Array<{
    /**
     * The name of the file (tab)
     */
    filename: string;
    /**
     * The language name of the file
     */
    language: Languages;
    /**
     * The document source string
     */
    session: IEditSession
  }>
  /**
   * Prettify stats copy
   */
  stats?: {
    estheticTime: string;
    languageName: string;
    characterLength: string;
  }
}

export interface Hash {
  language: Languages;
  languageName: string;
  idx: 0 | 1
  autoDetect: boolean;
  fontSize: number;
  pane: 'split' | 'editor' | 'preview'
  options: Options;
  open: number;
  mode: `ace/mode/${Languages}`;
  settings: boolean;
  stats: Attrs['stats'];
  input: string;
  output: string;
  rules: Rules;
}
