import type { Languages, Attrs, Options, Paths } from 'types';
import { attrs, basePath } from './attrs';

/**
 * Reference to loaded languages
 */
export const languages: Set<Languages> = new Set();

/**
 * Path location reference containing editor
 * modules within the projects distributed location.
 * These paths are relative to the root entry location.
 */
export const paths: Paths = {
  themes: {
    potion: `${basePath}/moloko/themes/potion.js`,
    github: `${basePath}/moloko/themes/github.js`
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
  }
};

export const options: Options = {
  language: 'liquid',
  theme: 'potion',
  fontSize: 12,
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
