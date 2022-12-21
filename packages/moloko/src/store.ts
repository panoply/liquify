import type { Languages, Attrs, Options, Paths, ISamples } from '@types';
import { attrs, basePath } from './attrs';

/**
 * Reference to loaded languages
 */
const languages: Set<Languages> = new Set();

/**
 * Reference to loaded languages
 */
const samples: Map<keyof ISamples, string> = new Map();

/**
 * Path location reference containing editor
 * modules within the projects distributed location.
 * These paths are relative to the root entry location.
 */
export const paths: Paths = {
  extensions: {
    split: `${basePath}/moloko/extensions/split.js`
  },
  modules: {
    prettify: `${basePath}/moloko/modules/prettify.js`
  },
  themes: {
    potion: `${basePath}/moloko/themes/potion.js`,
    github: `${basePath}/moloko/themes/github.js`
  },
  workers: {
    base: `${basePath}/moloko/workers/worker-base.js`,
    html: `${basePath}/moloko/workers/worker-html.js`,
    css: `${basePath}/moloko/workers/worker-css.js`,
    javascript: `${basePath}/moloko/workers/worker-javascript.js`,
    xml: `${basePath}/moloko/workers/worker-xml.js`,
    json: `${basePath}/moloko/workers/worker-json.js`
  },
  languages: {
    liquid: `${basePath}/moloko/language/liquid.js`,
    javascript: `${basePath}/moloko/language/javascript.js`,
    typescript: `${basePath}/moloko/language/typescript.js`,
    css: `${basePath}/moloko/language/css.js`,
    html: `${basePath}/moloko/language/html.js`,
    jsx: `${basePath}/moloko/language/jsx.js`,
    scss: `${basePath}/moloko/language/scss.js`,
    tsx: `${basePath}/moloko/language/tsx.js`,
    json: `${basePath}/moloko/language/json.js`,
    markdown: `${basePath}/moloko/language/markdown.js`,
    xml: `${basePath}/moloko/language/xml.js`,
    yaml: `${basePath}/moloko/language/yaml.js`,
    text: `${basePath}/moloko/language/text.js`,
    auto: `${basePath}/moloko/language/text.js`
  },
  samples: {

    /* -------------------------------------------- */
    /* HTML                                         */
    /* -------------------------------------------- */

    'attribute-sorting.html': `${basePath}/moloko/samples/html/attribute-sorting.js`,
    'comment-ignores.html': `${basePath}/moloko/samples/html/comment-ignores.js`,
    'html5-doctype.html': `${basePath}/moloko/samples/html/html5-doctype.js`,
    'json-ld-sample.html': `${basePath}/moloko/samples/html/json-ld-sample.js`,

    /* -------------------------------------------- */
    /* LIQUID                                       */
    /* -------------------------------------------- */

    'attribute-values.liquid': `${basePath}/moloko/samples/liquid/attribute-values.js`,
    'eleventy-sample.liquid': `${basePath}/moloko/samples/liquid/eleventy-sample.js`,
    'embedded-languages.liquid': `${basePath}/moloko/samples/liquid/embedded-languages.js`,
    'frontmatter.liquid': `${basePath}/moloko/samples/liquid/frontmatter.js`,
    'jekyll-sample.liquid': `${basePath}/moloko/samples/liquid/jekyll-sample.js`,
    'script-with-liquid.liquid': `${basePath}/moloko/samples/liquid/script-with-liquid.js`,
    'shopify-sample.liquid': `${basePath}/moloko/samples/liquid/shopify-sample.js`,
    'shopify-section.liquid': `${basePath}/moloko/samples/liquid/shopify-section.js`,
    'style-with-liquid.liquid': `${basePath}/moloko/samples/liquid/style-with-liquid.js`,

    /* -------------------------------------------- */
    /* JAVASCRIPT                                   */
    /* -------------------------------------------- */

    'arrays-and-objects.js': `${basePath}/moloko/samples/javascript/arrays-and-objects.js`,
    'block-comments.js': `${basePath}/moloko/samples/javascript/block-comments.js`,
    'condition-samples.js': `${basePath}/moloko/samples/javascript/condition-samples.js`,
    'functions-and-promises.js': `${basePath}/moloko/samples/javascript/functions-and-promises.js`,
    'js-with-liquid.js': `${basePath}/moloko/samples/javascript/js-with-liquid.js`,
    'jsx-sample.js': `${basePath}/moloko/samples/javascript/jsx-sample.js`,
    'object-sorting.js': `${basePath}/moloko/samples/javascript/object-sorting.js`,
    'variables-and-methods.js': `${basePath}/moloko/samples/javascript/variables-and-methods.js`,

    /* -------------------------------------------- */
    /* TYPESCRIPT                                   */
    /* -------------------------------------------- */

    'declaration-sample.ts': `${basePath}/moloko/samples/typescript/declaration-sample.js`,
    'interface-sample.ts': `${basePath}/moloko/samples/typescript/interface-sample.js`,
    'tsx-sample.ts': `${basePath}/moloko/samples/typescript/tsx-sample.js`,
    'decorators.ts': `${basePath}/moloko/samples/typescript/decorators.js`,

    /* -------------------------------------------- */
    /* CSS                                          */
    /* -------------------------------------------- */
    'liquid-in-css.css': `${basePath}/moloko/samples/liquid/liquid-in-css.js`,
    'properties-and-classes.css': `${basePath}/moloko/samples/liquid/properties-and-classes.js`,

    /* -------------------------------------------- */
    /* SCSS                                         */
    /* -------------------------------------------- */
    'liquid-in-scss.scss': `${basePath}/moloko/samples/liquid/liquid-in-scss.js`,
    'mixins-sample.scss': `${basePath}/moloko/samples/liquid/mixins-sample.js`,
    'sass-functions.scss': `${basePath}/moloko/samples/liquid/sass-functions.js`,
    'sass-variables.scss': `${basePath}/moloko/samples/liquid/sass-variables.js`

  }
};

export const options: Options = {
  language: 'liquid',
  theme: 'potion',
  fontSize: 12.7,
  basePath,
  hash: true,
  allowSettings: false,
  format: true,
  formatOnSave: true,
  components: {
    newFile: null
  }
};

/**
 * Get a sample
 */
export async function sample (filename: keyof ISamples) {

  let content: string;

  if (samples.has(filename)) {
    content = samples.get(filename);
  } else {
    const module = await import(paths.samples[filename]);
    content = module.default;
    samples.set(filename, content);
  }

  return content;

}

/**
 * Merges and updates editor options. This function
 * does not allow language or theme updates to be applied,
 * for augmenting those use the `file` session.
 */
export function config (opts: Omit<Options, 'language' | 'theme' | 'format' | 'fontSize'> = {}): Options {

  return Object.assign(options, opts);

}

export async function language (languageId: Languages = attrs.language): Promise<Attrs['mode']> {

  if (languageId === null) return;
  if (!paths.languages[languageId]) throw Error('Language not supported');

  attrs.mode = `ace/mode/${languageId}`;

  if (!languages.has(languageId)) {
    await import(paths.languages[languageId]);
    languages.add(languageId);
  }

  return attrs.mode;
}
