import { AssociateTags } from './types/parser';
import { NodeLanguage } from './lexical/language';
import { IEngine } from '@liquify/liquid-language-specs';

export interface IConfig {

  /**
   * The Liquid engine (the variation name).
   * Liquify supports multiple variations and different
   * variation require different actions from the parser.
   * This defaults to `standard`.
   *
   * Please note, that you cannot parse licensed variations
   * without a valid license key which you can obtain at
   * [https://liquify.dev/license](https://liquify.dev/license).
   *
   * @default 'standard'
   */
  engine?: IEngine;

  /**
   * **NOT YET AVAILABLE**
   *
   * The license key to unlock specifications and
   * provide capabilities to Liquid variations.
   *
   * You can acquire a license key to unlock variations
   * at: [https://liquify.dev/license](https://liquify.dev/license).
   *
   * @default ''
   * @deprecated
   */
  license?: string;

  /**
   * Whether or not to parser HTML markup and include
   * tags in the generated AST.
   *
   * @default true
   */
  html?: boolean;

  /**
   * An LSP specific option which informs that we will
   * be persisting, ie: executing frequent parses like
   * that which is relevant to LSP or other editors.
   *
   * By setting this option to `true` the parser will keep
   * initialize its cache model and execute partial changes,
   * similar to incremental type updates.
   *
   * @default false
   */
  persist: boolean;

  /**
   * Whether or not frontmatter should be parsed and tracked.
   * When set to `true` frontmatter data is scoped.
   *
   * @default false
   */
  frontmatter?: false;

  /**
   * Whether or not keep track of whitespaces within tags.
   * Tracking whitespace will decrease performance.
   *
   * When `context` is `true` it will include whitespace in
   * its output, if this option is set to `false` whitespace
   * will not be included in `context`
   *
   * @default false
   */
  whitespace?: false;

  /**
   * Whether or not keep track of newlines within tags.
   *
   * When `context` is `true` it will include newlines in
   * its output, if this option is set to `false` newlines
   * will not be included in `context`
   *
   * @default false
   */
  newlines?: false;

  /**
   * Whether or not to process unknown tags, filter or objects
   * encountered. If this option is set to `false` the parser
   * will perform in `strict` mode throw warnings when it
   * ecounters tokens(tags/filters) not present in specifications.
   *
   * @default true
   */
  strict?: boolean;

  /**
   * Whether or not to parse HTML comments. In Liquify, you can
   * optionally supply lint, formatting and validation rules
   * inline within Liquid or HTML comments. Settings this to `false`
   * will ignore all comments and skip their contents for inline options.
   *
   * @default true
   */
  comments?: boolean;

  /**
   * Whether or not to track variables. This is an LSP specific option,
   * which will keep a record of defined variables in a documents local
   * scope and provide them as completions and/or validate them.
   *
   * @default true
   */
  variables?: boolean;

  /**
   * Linting rules the parser should validate against. The parser
   * validates while parsing. These rulesets are digested in the language
   * server and validation (diagnostics) are thrown if rules are broken.
   * By default all rules are not active.
   */
  linting?: object;
  associate_tags?: AssociateTags[];
}

/**
 * Parser Options
 *
 * Parse configuration options used when constructing the AST.
 * Options defined here effect how the parser should behave, what
 * should be parsed/skipped/included etc etc.
 */
export const Config: IConfig = {
  license: '',
  persist: true,
  frontmatter: false,
  whitespace: false,
  newlines: false,
  variables: true,
  comments: false,
  associate_tags: [
    {
      language: NodeLanguage.javascript,
      kind: 'html',
      name: 'script'
    },
    {
      language: NodeLanguage.json,
      kind: 'html',
      name: 'script',
      attr: 'application\\/json'
    },
    {
      language: NodeLanguage.json,
      kind: 'html',
      name: 'script',
      attr: 'application\\/ld\\+json'
    },
    {
      language: NodeLanguage.css,
      kind: 'html',
      name: 'style'
    }
  ]
};
