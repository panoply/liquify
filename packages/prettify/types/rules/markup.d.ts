export interface MarkupOptions {

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * Automatically correct some sloppiness in code and allow Prettify to
   * reason with the intended structures in order to reduce chaos in otherwise
   * unreadble and terrible code.
   *
   * _The option enables Prettify to go about fixing code. It's not
   * going to produce miracles and for the most part it will have little effect
   * overall but can help in some situations._
   *
   * ---
   */
  correct?: boolean;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   *
   * If a blank new line should be forced above comments.
   */
  commentNewline?: boolean;

  /**
   * **Default** `true`
   *
   * This will determine whether comments should always start at position
   * `0` of each line or if comments should be indented according to the code.
   * It is unlikely you will ever want to set this to `false` so generally, just
   * leave it to `true`
   *
   */
  commentIndent?: boolean;

  /**
   * **Default** `preserve`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `preserve`
   *
   * How attribute keys and value casing should be processed. This defaults to `preserve`
   * which will leave casing intact and _typically_ the best option to use. Accepts one
   * of the following options:
   *
   * - `preserve`
   * - `lowercase`
   * - `lowercase-name`
   * - `lowercase-value`
   *
   * ---
   *
   * #### Preserve Example
   *
   * *Below is an example of how this rule works when it is set to `preserve`. This is
   * the default and the safest option to use.*
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <div dAtA-AtTr="FoO-bAr"></div>
   *
   * <!-- After Formatting -->
   * <div dAtA-AtTr="FoO-bAr"></div>
   *
   * ```
   *
   * ---
   *
   * #### Lowercase Example
   *
   * *Below is an example of how this rule work it it's set to `lowercase`. This might
   * be problematic to use projects where casing needs to be respected as both attribute
   * names and values will be converted to lowercase*
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <div DATA-ATTR="FOO-BAR"></div>
   *
   * <!-- After Formatting -->
   * <div data-attr="foo-bar"></div>
   *
   * ```
   *
   * ---
   *
   * #### Lowercase Name Example
   *
   * *Below is an example of how this rule work it it's set to `lowercase-name`. This will
   * ensure the the attribute names are always converted to lowercase*
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <div DATA-ATTR="FOO-BAR"></div>
   *
   * <!-- After Formatting -->
   * <div class="FOO-BAR"></div>
   *
   * ```
   *
   * ---
   *
   * #### Lowercase Value Example
   *
   * *Below is an example of how this rule work it it's set to `lowercase-value`. This will
   * ensure the the attribute values are always converted to lowercase*
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <div DATA-ATTR="FOO-BAR"></div>
   *
   * <!-- After Formatting -->
   * <div DATA-ATTR="foo-bar"></div>
   *
   * ```
   */
  attributeCasing?: 'preserve' | 'lowercase' | 'lowercase-name' | 'lowercase-value';

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * HTML Attribute sorting. When enabled it will sort attributes
   * alphabetically. Attribute sorting is ignored on tags that contain
   * template attributes.
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true`. Notice
   * how the attributes are not alphabetically sorted before formatting is applied
   * whereas after formatting they are sorted alphabetically.*
   *
   * ```html
   *
   * <!-- Before formatting -->
   * <div
   *   id="x"
   *   data-b="100"
   *   data-a="foo"
   *   data-c="x"
   *   class="xx">
   *
   * </div>
   *
   * <!-- After formatting -->
   * <div
   *   class="xx"
   *   data-a="foo"
   *   data-b="100"
   *   data-c="x"
   *   id="x">
   *
   * </div>
   * ```
   */
  attributeSort?: boolean;

  /**
   * **Default** `[]`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `[]`
   *
   * A comma separated list of attribute names. Attributes will be sorted according to
   * this list and then alphanumerically. This option requires `attributeSort` have
   * to be enabled, ie: have a value of `true`.
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled and you've defined
   * the following attribute sorting structure:*
   *
   * ```js
   * {
   *   attributeSort: true, // Must be true when using this rule
   *   attributeSortList: ['id', 'class', 'data-b']
   * }
   * ```
   *
   * *Using the above options, notice how how `data-a`, `data-c` and `data-d` are sorted
   * alphabetically in order following the sort list we provided*
   *
   * ```html
   *
   * <!-- Before formatting -->
   * <div
   *   data-a
   *   id="x"
   *   data-d
   *   data-c
   *   data-b
   *   class="xx">
   *
   * </div>
   *
   * <!-- After formatting -->
   * <div
   *   id="x"
   *   class="xx"
   *   data-b
   *   data-a
   *   data-c
   *   data-d>
   *
   * </div>
   * ```
   */
  attributeSortList?: string[];

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   *
   * Markup self-closing tags end will end with `' />'` instead of `'/>'`
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true`*
   *
   *
   * ```html
   *
   * <!-- Before formatting -->
   * <picture>
   *   <path srcset="."/>
   * </picture>
   *
   * <!-- After formatting - Notice the the space insertion applied -->
   * <picture>
   *   <path srcset="." />
   * </picture>
   *
   * ```
   */
  selfCloseSpace?: boolean;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * If text in the provided markup code should be preserved exactly as provided.
   * This option eliminates beautification and wrapping of text content.
   */
  preserveText?: boolean;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `3`
   *
   * If all markup attributes should be indented each onto their own line. You
   * can optionally provide an integer value of `1` or more. When an integer value
   * is passed, attributes will be forced only if the number of attributes contained
   * on the tag exceeds the supplied value limit. When you define a `wrap` level then
   * attributes will be automatically forced. This is typically a better solution than
   * forcing all attributes onto newlines or an even better solution would be to set
   * a limit level.
   *
   * ---
   *
   * #### Disabled Example
   *
   * *Below is the default, wherein attributes are only forced when wrap is exceeded.*
   *
   * ```html
   *
   * <div class="x" id="{{ foo }}" data-x="xx">
   *
   * </div>
   *
   * ```
   *
   * ---
   *
   * #### Enabled Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true`*
   *
   * ```html
   *
   * <div
   *   class="x"
   *   id="{{ foo }}"
   *   data-x="xx">
   *
   * </div>
   *
   * ```
   *
   * ---
   *
   * #### Limit Example
   *
   * *Below we provide a value of `2` so formatting will be applied as such:*
   *
   * ```html
   *
   * <!-- Tag contains 2 attributes, they will not be forced-->
   * <div class="x" id="{{ foo }}">
   *
   * </div>
   *
   * <!-- Tag contains 3 attributes, thus they will be forced -->
   * <div
   *   class="x"
   *   id="{{ foo }}"
   *   data-x="xx">
   *
   * </div>
   *
   * <!-- Tag contains 1 attribute, it will not be forced-->
   * <div class="x">
   *
   * </div>
   *
   * ```
   */
  forceAttribute?: boolean | number;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   *
   * Whether the leading attribute should be forced onto a newline when
   * word `wrap` limit is exceeded or if it should be preserved. By default,
   * Prettify preserves the leading attribute when applying wrap indentation.
   * Enabling this option will force indent all attributes if wrap is exceeded.
   *
   * This rule requires a `wrap` level to be defined. If you have `forceAttribute`
   * enabled or using a force attribute limit value it will override this option.
   * If you desire wrap based attribute indentation, set `forceAttribute` to `false`
   * and ensure a `wrap` level is defined.
   *
   * ---
   *
   * #### Disabled (default)
   *
   * *Below is an example of how this rule works if it's disabled (ie: `false`) and
   * attributes have exceeded a defined wrap limit. Notice how leading attributes
   * are preserved that have not exceeded wrap, but proceeding attributes are indented
   * onto their own lines, this is the default behaviour Prettify uses.*
   *
   * ```html
   *
   * <!-- Leading attribute is preserved -->
   * <div class="x"
   *   id="{{ foo }}"
   *   data-attribute-example="100"
   *   data-x="xx">
   *
   * </div>
   *
   * ```
   *
   * #### Enabled
   *
   * *Below is an example of how this rule works if it's enabled (ie: `true`) and
   * attributes have exceeded the defined wrap limit. Notice how all attributes
   * and indented onto their own line, including the leading attribute.*
   *
   *
   * ```html
   *
   * <!-- All attributes are forced including the leading attribute  -->
   * <div
   *   class="x"
   *   id="{{ foo }}"
   *   data-attribute-example="100"
   *   data-x="xx">
   *
   * </div>
   *
   * ```
   */
  forceLeadAttribute?: boolean | number;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   *
   * Will force indentation upon all content and tags without regard for the
   * text nodes.
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true`*
   *
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <ul>
   *  <li>Hello</li>
   *  <li>World</li>
   * </ul>
   *
   * <!-- After formatting -->
   * <ul>
   *   <li>
   *     Hello
   *   </li>
   *   <li>
   *     World
   *   </li>
   * </ul>
   * ```
   */
  forceIndent?: boolean;

  /**
   * **Default** `none`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `double`
   *
   * If the quotes of markup attributes should be converted to single quotes
   * or double quotes. Don't be a fucking hero with this option. Markup content
   * should use double quotations, it's the standard.
   *
   * **Options**
   *
   * - `double` Converts single quotes to double quotes
   * - `none` Ignores this option (default)
   * - `single` Converts double quotes to single quotes
   */
  quoteConvert?: 'double' | 'single' | 'none';

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * If markup tags should have their insides preserved.
   * This option is only available to markup and does not support
   * child tokens that require a different lexer. When enabled, this
   * rule will override and run precedence for all attribute related rules.
   *
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true`.
   * There is no difference between the _before_ and _after_ version of the code
   * when this option is enabled.*
   *
   * ```html
   *
   * <!-- Before Formatting -->
   * <div
   *  id="x"    data-x="foo"
   * class="xx"></div>
   *
   * <!-- After Formatting -->
   * <div
   *  id="x"    data-x="foo"
   * class="xx"></div>
   *
   * ```
   */
  preserveAttributes?: boolean;

  /**
   * **Default** `false`
   *
   * Prevent comment reformatting due to option wrap.
   */
  preserveComment?: boolean;

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * Whether HTML and Liquid tags identified to be containing CSS or SCSS
   * should be ignored from beautification.
   */
  ignoreStyles?: boolean;

  /**
   * **Default** `true`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * Whether HTML and Liquid tags identified to be containing JavaScript
   * should be ignored from beautification. When enabled, formatting will
   * be applied in accordance with rules defined in the `script` lexer.
   *
   * _This rules is currently set to `true` by default as JavaScript formatting
   * is not yet production ready, but still operational to an extent. Enable at
   * your on discretion_
   *
   */
  ignoreScripts?: boolean;

}
