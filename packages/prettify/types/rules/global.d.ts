import { LanguageNames, LexerNames } from '../common';
import { LiteralUnion } from 'type-fest';

export type EmbeddedHTML = {
  [tag: string]: {
    /**
     * The embedded language to refer
     */
    language: LanguageNames;
    /**
     * Attributes matchers
     */
    attribute?: {
      /**
       * Accepts an Regular expression string, or array of strings.
       */
      [attribute: string]: RegExp | string | string[]
    }
  }[]
}

export type EmbeddedLiquid = {
  [tag: string]: {
    /**
     * The embedded language to refer
     */
    language: LanguageNames;
    /**
     * Accepts an Regular expression string, or array of strings.
     */
    argument?: RegExp | string | string[];
  }[]
}

export interface Grammars {
  /**
   * Extended token grammars for the Liquid Template Language
   */
  liquid?: {
    /**
     * **Tags**
     *
     * String list of token names to be treated as tag blocks. These are tags,
     * which require an `{% end %}` token be defined, like (for example) the
     * `{% capture %}` token which requires `{% endcapture %}`.
     *
     * The Tags names you provide here will inform Prettify to cancel beautification
     * when no ender can be found or the ender is in-correctly placed.
     */
    tags?: string[];

    /**
     * **Control Tags**
     *
     * String list of token names to be treated as control type openers. These are tags,
     * which are used within conditionals.
     *
     * The Tags names you provide here will inform Prettify on how to reason and handle
     * certain expressions when building data structures for beautification.
     *
     * #### Defaults
     *
     * ```js
     * [
     *  'if',
     *  'unless',
     *  'case'
     * ]
     *
     * ```
     */
    control: string[];

    /**
     * **Else Tags**
     *
     * String list of token names to be treated as else type control singletons. These are tags,
     * which are used within control tags.
     *
     * The Tags names you provide here will inform Prettify to cancel beautification
     * when no ender can be found or the ender is in-correctly placed.
     *
     * #### Defaults
     *
     * ```js
     * [
     *  'else',
     *  'elsif',
     *  'when'
     * ]
     *
     * ```
     */
    else?: string[];

    /**
     * **Singletons**
     *
     * String list of token names to be treated as singletons. These are tags,
     * which no require an `{% end %}` token to be defined, like (for example)
     * the `{% assign %}` token is a singleton.
     *
     * The Tags names you provide here will inform Prettify to cancel beautification
     * when if the token uses an ender.
     */
    singletons?: string[];

    /**
     * **Embedded**
     *
     * A list of Liquid token names who's inner contents should be formatted using a different
     * lexer mode. Embedded tags will treat their contained content as external and allow
     * you to apply region based beautification to custom tag blocks.
     *
     * Embedded region grammar references expect an array list or strings, Regular Expressions
     * or for more pricise control you can provide an array who's first value represets the
     * tag name and second value an attribute.
     *
     * #### Example
     *
     * ```js
     * prettify.options({
     *  grammar: {
     *    liquid: {
     *      embedded: {
     *        schema: [
     *         { language: 'json' }
     *        ],
     *        capture: [
     *         { language: 'json', name: ['some_json', 'ld_json'] },
     *         { language: 'css', name: ['some_css', 'css_example'] }
     *        ],
     *        stylesheet: [
     *          { language: 'css' },
     *          { language: 'scss', match: /\\s*['"]scss['"]/ },
     *        ],
     *      }
     *    }
     *  }
     * })
     * ```
     *
     */
    embedded?: EmbeddedLiquid
  };
  /**
   * Extended token grammars for HTML
   */
  html?: {
    /**
     * HTML Tags
     *
     * String list of HTML tag blocks
     */
    tags?: string[]
    /**
     * HTML Voids
     *
     * String list of additional or custom void type
     * HTML tags.
     */
    voids?: string[]

    /**
     * **Embedded**
     *
     * A list of HTML token tag names who's inner contents should be formatted using a different
     * lexer mode. Embedded tags will treat their contained content as external and allow
     * you to apply region based beautification to custom tag blocks.
     *
     * Embedded region grammar references expect an array list or strings, Regular Expressions
     * or for more pricise control you can provide an array who's first value represets the
     * tag name and second value an attribute.
     *
     * #### Example
     *
     * ```js
     * prettify.options({
     *  grammar: {
     *    html: {
     *      embedded: {
     *        script: [
     *          {
     *            language: 'json',
     *            attribute: {
     *              type: [
     *                'application/json',
     *                'application/ld+json'
     *              ]
     *            }
     *          }
     *        ],
     *        style: [
     *         { language: 'scss', attribute: { type: 'type/scss' } }
     *        ]
     *      }
     *    }
     *  }
     * })
     * ```
     */
    embedded?: EmbeddedHTML
  }
  /**
   * Internal Usage
   */
  script?: {

    /**
     * **API Keywords**
     *
     * A list of API keywords
     *
     */
    keywords?: string[]

  }
  /**
   * Internal Usage
   */
  style?: {

    /**
     * At-rules are CSS statements that instruct CSS how to behave.
     * They begin with an at sign, `@`, followed by an identifier and
     * includes everything up to the next semicolon, `;` or the next CSS block,
     * whichever comes first.
     *
     * @see
     * https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
     *
     */
    atrules?: string[];
    /**
     * Style Units
     *
     * String list of dimensions and units used in style
     * languages like CSS and SCSS.
     */
    units?: string[];

    /**
     * List of CSS WebKit pseudo Elements keywords for web-compatibility
     * reasons, Blink, WebKit, and Gecko browsers treat all pseudo-elements
     * starting with ::-webkit- as valid.
     *
     * @see
     * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
     *
     * @example
     * ::webkit- {}
     */
    webkit?: {

      /**
       * List of CSS WebKit pseudo Elements keywords for web-compatibility
       * reasons, Blink, WebKit, and Gecko browsers treat all pseudo-elements
       * starting with ::-webkit- as valid.
       *
       * @see
       * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
       *
       * @example
       * ::webkit- {}
       */
      elements?: string[]
      /**
       * List of CSS WebKit pseudo class keywords for web-compatibility
       * reasons, Blink, WebKit, and Gecko browsers treat all pseudo-elements
       * starting with :-webkit- as valid.
       *
       * @see
       * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
       *
       * @example
       * :webkit- {}
       */
      classes?: string[]

    };

    /**
     * Style Pseudo Selectors
     *
     * String list of psuedo selectors used in style languages
     * like CSS and SCSS
     */
    pseudo?: {
      /**
       * List of CSS pseudo-class keywords added to a selector that
       * specify a special state on selected element(s).
       *
       * @see
       * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
       *
       * @example
       * :root {}
       */
      classes?: string[];
      /**
       * List of CSS pseudo-element keyword added to a selector that
       * style a specific part of a selected element(s).
       *
       * @see
       * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
       *
       * @example
       * p::first-line {}
       */
      elements?: string[];
      /**
       * List of CSS pseudo selector functions. This pseudo selector can
       * accept arguments within parenthesis
       *
       * @see
       * https://developer.mozilla.org/en-US/docs/Web/CSS/:host_function
       *
       * @example
       * :host(.special-custom-element)
       */
      functions?: string[];
    }

  }

}

export interface GlobalOptions {
  /**
   * **Default** `auto`
   *
   * The name of the language provided.
   */
  language?: LanguageNames;

  /**
   * The official language proper naming convertion, for example:
   *
   * - _typescript_ > TypeScript
   * - _javascript_ > JavaScript
   *
   * Typically this can omitted as Prettify will automaticaly assign this
   * when `language` is passed. - This is mostly used internally and with
   * extension based tooling. In the future will be used in the CLI and reporting.
   *
   * **Note**
   *
   * In future version, the Language Name may also be used to infer specific
   * Liquid variations, like for example:
   *
   * - `Liquid Shopify`
   * - `Liquid Jekyll`
   * - `Liquid 11ty`
   *
   * When such is defined it will help Prettify apply default grammar rules like
   * beautification to certain embedded regions.
   */
  languageName?: string;

  /**
   * **Default** `2`
   *
   * The number of `indentChar` values to comprise a single indentation.
   */
  indentSize?: number;

  /**
   * **Default** `0`
   *
   * How much indentation padding should be applied to beautification?
   * This option is internally used for code that requires switching
   * between libraries.
   */
  indentLevel?: number;

  /**
   *  **Default** `0`
   *
   * Character width limit before applying word wrap. A `0` value
   * disables this option. A negative value concatenates script strings.
   */
  wrap?: number;

  /**
   *  **Default** `false`
   *
   * Whether or not to insert a final line. When this rule is undefined in
   * a `.liquidrc` file the Text Editors settings will be used, in vscode
   * that is `*.endWithNewline` where `*` is a language name.  If an
   * `.editorconfig` file is found present in root, those rules will be
   * applied in **precedence** over Text Editor.
   */
  endNewline?: boolean;

  /**
   *  **Default** `false`
   *
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   */
  crlf?: boolean;

  /**
   * **Default** ` `
   *
   * The string characters to comprise a single indentation.
   * Any string combination is accepted
   */
  indentChar?: string;

  /**
   * **Default** `2`
   *
   * The maximum number of consecutive empty lines to retain.
   */
  preserveLine?: number;

  /* -------------------------------------------- */
  /* OTHER                                        */
  /* -------------------------------------------- */

  /**
   * The lexer name for this language - Can be omitted
   * as setting `language` will suffice and apply lexer reference
   * accordingly.
   */
  lexer?: LiteralUnion<LexerNames, string>;
  /**
   * The mode to be invoked. Unless you need direct access to the
   * data structure generated by Sparser, this can be omitted. When
   * providing `parse` the structure is returned, otherwise `beautify`
   * which returns the formatted string.
   */
  mode?: 'beautify' | 'parse';
  /**
   * **EXPERIMENTAL**
   *
   * **This option is will be available in future releases and is currently
   * experimental and not fully operational.**
   *
   * ---
   *
   * #### Grammar
   *
   * Low level access to optionally extend the lexers tag handling algorithm.
   * This option allows you to inform Prettify of any custom or additional tokens
   * to provide better context and handling. This is helpful when you need Prettify to
   * process custom tags in a specific manner and only available in markup based languages.
   */
  grammar?: Grammars
}
