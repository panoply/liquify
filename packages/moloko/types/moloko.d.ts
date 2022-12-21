import type { IEditSession, Split } from 'types/editor';
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
   * Whether or not to enable file tabs. Optionally
   * provide default tabs.
   */
  fileTabs?: boolean | {

  };
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

export interface ISamples {

  'html5-doctype.html': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/html/html5-doctype.js`;
  'json-ld-sample.html': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/html/json-ld-sample.js`;
  'attribute-sorting.html': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/html/attribute-sorting.js`;
  'comment-ignores.html': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/html/comment-ignores.js`;

  'attribute-values.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/attribute-values.js`;
  'eleventy-sample.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/eleventy-sample.js`;
  'embedded-languages.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/embedded-languages.js`;
  'frontmatter.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/frontmatter.js`;
  'jekyll-sample.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/jekyll-sample.js`;
  'script-with-liquid.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/script-with-liquid.js`;
  'shopify-sample.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/shopify-sample.js`;
  'shopify-section.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/shopify-section.js`;
  'style-with-liquid.liquid': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/style-with-liquid.js`;

  'arrays-and-objects.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/arrays-and-objects.js`;
  'block-comments.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/block-comments.js`;
  'condition-samples.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/condition-samples.js`;
  'functions-and-promises.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/functions-and-promises.js`;
  'js-with-liquid.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/js-with-liquid.js`;
  'jsx-sample.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/jsx-sample.js`;
  'object-sorting.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/object-sorting.js`;
  'variables-and-methods.js': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/javascript/variables-and-methods.js`;

  'declaration-sample.ts': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/typescript/declaration-sample.js`;
  'decorators.ts': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/typescript/decorators.js`;
  'interface-sample.ts': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/typescript/interface-sample.js`;
  'tsx-sample.ts': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/typescript/tsx-sample.js`;

  'liquid-in-css.css': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/liquid-in-css.js`;
  'liquid-in-scss.scss': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/liquid-in-scss.js`;
  'mixins-sample.scss': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/mixins-sample.js`;
  'properties-and-classes.css': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/properties-and-classes.js`;
  'sass-functions.scss': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/sass-functions.js`;
  'sass-variables.scss': `${GetBasePath<'.' | `./${string}/`>}moloko/samples/liquid/sass-variables.js`;

}

export interface Paths {
  /**
   * The paths to external extension modules
   */
  extensions: {
    split: `${GetBasePath<'.' | `./${string}/`>}moloko/extensions/split.js`
  },
  /**
   * The paths to external package modules
   */
  modules: {
    prettify: `${GetBasePath<'.' | `./${string}/`>}moloko/modules/prettify.js`
  },
  /**
   * The paths to external package modules
   */
  workers: {
    base: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-base.js`,
    html: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-html.js`,
    css: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-css.js`,
    json: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-json.js`,
    xml: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-xml.js`,
    javascript: `${GetBasePath<'.' | `./${string}/`>}moloko/workers/worker-javascript.js`
  },
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
  /**
   * Language sample snippets, typically not required and exist purely for Prettify
   * playground.
   */
  samples: ISamples
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
   * The code sample (if not selected is null)
   */
  sample: string;
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
   * Whether or not select sample is open
   *
   * @default false
   */
  selectSample: boolean;
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
    prettifyTime: string;
    languageName: string;
    characterLength: string;
    sizeOfFile: string;
  }
}

export interface Hash {
  language: Languages;
  languageName: string;
  idx: 0 | 1
  sample: string;
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
}
