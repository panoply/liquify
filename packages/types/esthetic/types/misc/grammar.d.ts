import { LanguageName } from '../shared';

export interface GrammarEmbedLiquid {
  /**
   * The tag name identifier
   */
  [tagName: string]: {
    /**
     * The Language name in lowercase format,
     * this will be used to determine the lexer to use
     */
    language?: LanguageName;
    /**
     * The argument match reference checksum
     */
    argument?(token: string): boolean
    /**
     * Checksum to determine whether or not the token
     * `tagName` has reached the `{% endtag %}` tag.
     */
    end?(token: string): boolean
  }

}

export interface GrammarEmbedHTML {
  /**
   * The tag name identifier
   */
  [tagName: string]: {
    /**
     * The embedded language to refer
     */
    language?: LanguageName;
    /**
     * The attribute name match reference
     */
    attribute?: string;
    /**
     * The attribute value checksum
     */
    value?(token: string):boolean
  }
}

export interface CSSTokens {
  /**
   * Style Units
   *
   * String list of dimensions and units used in style
   * languages like CSS and SCSS.
   */
  units: Set<string>;
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
  atrules: Set<string>;
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
  pseudoClasses: Set<string>;
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
  pseudoElements: Set<string>;
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
  pseudoFunctions: Set<string>;
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
  webkitElements: Set<string>;
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
  webkitClasses: Set<string>;

}

export type EmbeddedHTML = {
  [tag: string]: Array<{
    /**
     * The embedded language to refer
     */
    language: LanguageName;
    /**
     * Attributes matchers
     */
    attribute?: {
      /**
       * Accepts an Regular expression string, or array of strings.
       */
      [attribute: string]: RegExp | string | string[]
    }
  }>
}

export type EmbeddedLiquid = {

  [tag: string]: Array<{
    /**
     * The embedded language to refer
     */
    language: LanguageName;
    /**
     * Accepts an Regular expression string, or array of strings.
     */
    argument?: RegExp | string | string[];
  }>

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
     * prettify.grammar({
     *   liquid: {
     *     embedded: {
     *       schema: [
     *        {
     *          language: 'json'
     *        }
     *       ],
     *       capture: [
     *        {
     *          language: 'json',
     *          name: [
     *           'some_json',
     *           'ld_json'
     *          ]
     *        },
     *        {
     *          language: 'css',
     *          name: [
     *           'some_css',
     *           'css_example'
     *          ]
     *        }
     *       ],
     *       stylesheet: [
     *         {
     *           language: 'css'
     *         },
     *         {
     *           language: 'scss',
     *           match: /\\s*['"]scss['"]/
     *         }
     *       ]
     *     }
     *   }
     * })
     * ```
     *
     */
    embedded?: EmbeddedLiquid
  };
  svg?: {
    /**
     * SVG Void Tags
     *
     * String list of SVG Void self-closing tags.
     */
    voids?: string[];
    /**
     * HTML Tags
     *
     * String list of SVG containing tag blocks
     */
    tags?: string[];
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
     * prettify.grammar({
     *   html: {
     *     embedded: {
     *       script: [
     *         {
     *           language: 'json',
     *           attribute: {
     *             type: [
     *               'application/json',
     *               'application/ld+json'
     *             ]
     *           }
     *         }
     *       ],
     *       style: [
     *         {
     *           language: 'scss',
     *           attribute: {
     *             type: 'type/scss'
     *           }
     *         }
     *       ]
     *     }
     *   }
     * })
     * ```
     */
    embedded?: EmbeddedHTML
  }
  /**
   * Internal Usage
   */
  js?: {
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
  css?: {

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
