import { NodeLanguage } from './lexical/language';
import { Engine } from '@liquify/specs';

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
  engine?: Engine;

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
   * Whether or not to parse HTML markup and include
   * tags in the generated AST.
   *
   * @default true
   */
  html?: boolean;

  /**
   * An LSP specific option which informs that we will
   * be persisting, ie: executing frequent parses in watch mode.
   *
   * By setting this option to `true` the parser will keep
   * an initialize its cache model and execute partial changes,
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
  frontmatter?: boolean;

  /**
   * Whether or not to process unknown tags, filter or objects
   * encountered. If this option is set to `true` the parser
   * will perform in `strict` mode and throw warnings when it
   * ecounters tokens(tags/filters) not present in specifications.
   *
   * @default true
   */
  strict?: boolean;

  /**
   * Whether or not to parse HTML comments. In Liquify, you can
   * optionally supply linting, formatting and validation rules
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
  validate?: {
    /**
     * Whether or not values should type checked
     *
     * @default false
     */
    extraneousWhitespace: boolean;
    /**
     * Whether or not values should type checked
     *
     * @default false
     */
    tagNames: boolean;
    /**
     * Whether or not values should type checked
     *
     * @default true
     */
    tagPlacement: boolean;
    /**
     * Whether or not values should type checked
     *
     * @default true
     */
    filterNames: boolean;
    /**
     * Whether or not values should type checked
     *
     * @default true
     */
    filterArguments: boolean,
    /**
     * Whether or not to warn about unknown properties
     *
     * @default true
     */
    unknownProperties: boolean;
    /**
     * Whether or not to warn about unknown objects
     *
     * @default true
     */
    unknownObjects: boolean;
    /**
     * Whether or not values should type checked
     *
     * @default false
     */
    valueTypeChecks: boolean;
    /**
     * Validate quotation characters
     *
     * @default false
     */
    quotationCharacters: 'single' | 'double' | 'off',
    /**
     * Whether or not to validate syntactic pairs
     *
     * @default false
     */
    syntacticPairs: boolean;
  };

  /**
   *
   */
  associates?: any
}

/**
 * Parser Options
 *
 * Parse configuration options used when constructing the AST.
 * Options defined here effect how the parser should behave, what
 * should be parsed/skipped/included etc etc.
 */
export const config: IConfig = {
  license: '',
  persist: true,
  frontmatter: false,
  strict: true,
  variables: true,
  comments: false,
  validate: {
    extraneousWhitespace: false,
    filterArguments: false,
    filterNames: true,
    quotationCharacters: 'single',
    syntacticPairs: true,
    tagNames: true,
    tagPlacement: true,
    unknownObjects: true,
    unknownProperties: true,
    valueTypeChecks: false
  },
  associates: [
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
