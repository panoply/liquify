import { LiteralUnion } from 'type-fest';

export interface MarkupRules {
  /**
   * #### Default: `preserve`
   *
   * >
   *
   * ### [Comment Delimiter](https://aesthetic.js.org/rules/markup/commentDelimiter/)
   *
   * This rule controls the formatting style of HTML and XML markup comment delimiters. Æsthetic
   * can produce 5 different output styles for markup comments, based on this ruleset as it will
   * augments delimiter (`<!--` and `-->`) placements.
   *
   * > **NOTE**
   * >
   * > **If `commentPreserve` is set to `true` then this rule will have no effect.**
   *
   * ---
   *
   * >
   *
   * #### Options:
   *
   * This rule accepts the one of the following options:
   *
   * - `preserve`
   * - `consistent`
   * - `newline`
   * - `inline`
   * - `inline-align`
   *
   */
  commentDelimiter?: LiteralUnion<
  | 'preserve'
  | 'consistent'
  | 'newline'
  | 'inline'
  | 'inline-align', string>;

  /**
   * #### Default: `true`
   *
   * >
   *
   * ### [Comment Indent](https://aesthetic.js.org/rules/markup/commentIndent/)
   *
   * This will determine whether comments should always start at position
   * `0` of each line or if comments should be indented according to the code.
   *
   * > **NOTE**
   * >
   * > **If `commentPreserve` is set to `true` then this rule will have no effect.**
   *
   */
  commentIndent?: boolean;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Comment Preserve](https://aesthetic.js.org/rules/markup/commentPreserve/)
   *
   * Prevent Æsthetic from carrying out formatting on comments. When enabled (i.e, `true`),
   * comment formatting will be ignored.
   *
   * > **NOTE**
   * >
   * > **This rule will override and run precedence on the `commentDelimiter` and `commentIndent`**
   * > **rules, and when enabled (i.e, `true`) they will have no effect**
   *
   */
  commentPreserve?: boolean;
  /**
   * #### Default: `preserve`
   *
   * >
   *
   * ### [Attribute Casing](https://aesthetic.js.org/rules/markup/attributeCasing/)
   *
   * How attribute keys and value casing should be processed. This defaults to `preserve`
   * which will leave casing intact is _typically_ the best option to use. Accepts one
   * of the following options:
   *
   * ---
   *
   * >
   *
   * #### Options:
   *
   * This rule accepts the one of the following options:
   *
   * - `preserve`
   * - `lowercase`
   * - `lowercase-name`
   * - `lowercase-value`
   *
   */
  attributeCasing?: LiteralUnion<
  | 'preserve'
  | 'lowercase'
  | 'lowercase-name'
  | 'lowercase-value', string>;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Attribute Line Break](https://aesthetic.js.org/rules/attributeLineBreak/)
   *
   * Controls the formatting tactic to apply on tag attributes. The rule accepts either
   * a boolean (i.e, `true` or `false`), or alternatively an integer (limit). By default,
   * Æsthetic will keep tag attributes inline and only apply linebreaks when (or if) the
   * global `wrap` limit has been exceeded.
   *
   * > **NOTE**
   * >
   * > **Attribute linebreaks respect word `wrap` and unless `attribute` is `true`, forcing**
   * > **will apply. Please note, that unless the `textBoundTag` is set `default` or `phrasing`**
   * > **attributes of tags encapsulated by text content not adhere to this rule.**
   *
   * ---
   *
   * > `true`
   *
   * > If you prefer to control attribute forcing on a per-tag basis, set this to `true` and
   * > signal to Æsthetic linebreaks should apply by inserting a newline character before the
   * > first attribute occurance within a tag.
   *
   * > `number`
   *
   * > Using an `integer` value will instruct Æsthetic to apply linebreaks on attributes only
   * > when the number of attributes is either **equal to** or **more than** the value provided.
   *
   */
  attributeLineBreak?: boolean | number;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Attribute Preserve](https://aesthetic.js.org/rules/markup/attributePreserve/)
   *
   * Whether or not markup tags should have their insides preserved. This option is only
   * available to markup and does not support child tokens that require a different lexer.
   * When enabled (i.e, `true`), attributes contained within tags will be excluded from
   * formatting.
   *
   * > **NOTE**
   * >
   * > **This rule will override and run precedence on all attribute related rules.**
   *
   */
  attributePreserve?: boolean;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Delimiter Terminus](https://aesthetic.js.org/rules/markup/delimiterTerminus/)
   *
   * Whether or not ending HTML tag delimiters should be forced onto a newline.
   * This will emulate the style of Prettier's `bracketSameLine` formatting
   * option, wherein the last `>` delimiter character is forced onto a newline.
   *
   * > **NOTE**
   * >
   * > If you wish to emulate the behaviour of Prettier, then set this to `2`
   */
  delimiterTerminus?: boolean | number;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Attribute Sort](https://aesthetic.js.org/rules/markup/attributeSort/)
   *
   * This rule will alphanumerically sort attributes annotated on markup tags. The rule
   * accepts either a `boolean` or a `string[]` type. When a boolean value of `true` is
   * provided, Æsthetic will sort attributes alphanumerically. Passing a list of attribute
   * names allows you to customize the ordering of attribute names, wherein sorting applies
   * according to the provided list and then alphanumerically thereafter.
   *
   * > **NOTE**
   * >
   * > **Sorting will be skipped on elements which contain Liquid expressions or conditional**
   * > **rendering logic. The rule will only work on markup-safe elements.**
   *
   */
  attributeSort?: boolean | string[];

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Class List Sort](https://aesthetic.js.org/rules/markup/classListSort/)
   *
   * The rule will alphanumerically sort attributes classes contained in the `class=""` attribute.
   * The rule accepts either a `boolean` or a `string[]` type. When a boolean value of `true` is
   * provided, Æsthetic will classes alphanumerically. Passing a string list of class names will apply
   * according to the provided list and then alphanumerically thereafter.
   *
   * > **NOTE**
   * >
   * > **Sorting will be skipped when class values contain Liquid expressions**
   *
   */
  classListSort?: boolean | string[]

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Class List Unique](https://aesthetic.js.org/rules/markup/classListUnique/)
   *
   * Whether or not identical occurences of class names should be removed.
   *
   * **Example**
   *
   * ```html
   * <!-- before formatting -->
   * <div class="foo bar baz foo baz"></div>
   *
   * <!-- after formatting -->
   * <div class="foo bar baz"></div>
   * ```
   */
  classListUnique?: boolean;
  /**
   * #### Default: `true`
   *
   * >
   *
   * ### [Self Close Space](https://aesthetic.js.org/rules/selfCloseSpace/)
   *
   * Markup self-closing tags will end with `' />'` instead of `'/>'`
   *
   */
  selfCloseSpace?: boolean;
  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Self Close SVG](https://aesthetic.js.org/rules/selfCloseSVG/)
   *
   * Whether or not SVG type tags should be converted to self-closing void
   * types, or vice versa. When enabled (`true`), tags contained within an `<svg>`
   * element that use an end tag will be transformed to a
   * void, self-closing tag, i.e: `</path>` → `<path />`.
   */
  selfCloseSVG?: boolean;
  /**
   * #### Default: `[]`
   *
   * >
   *
   * ### [Text Node List](https://aesthetic.js.org/rules/textNodeList/)
   *
   * > **Refer to [text nodes documentation](https://aesthetic.js.org/languages/html/#text-nodes)
   * for the default list used by Æsthetic**
   *
   * List of HTML tag names to apply inline formatting upon when their child type is text content.
   * By default, Æsthetic will format tags containing text content according to a special cherry-picked
   * list of phrasing-content type tags. You can override the default list, add to the default list by
   * prefixing entries with a `+` character, or alternatively, you can exclude certain tags from the default
   * list using an `!` prefix (see below example).
   *
   * ```js
   * // Excluding: Continue to use the default list but exclude <span> and <h1> tags.
   * { textNodes: ['!span', '!h1'] }
   *
   * // Extending: Continue to use the default list and include <label> and <p> tags.
   * { textNodes: ['+label', '+p'] }
   *
   * // Overrides: Do not use defaults, only treat <div> and <p> as text nodes.
   * { textNodes: ['div', 'p'] }
   * ```
   *
   * > **NOTE**
   * >
   * > **Text nodes defined here will be excluded from forced indentation if `forceIndent` is `true` and**
   * > **the child token is text content. Entries here will be used by the `textBoundTag` rule when it**
   * > **is set to the `default` option.**
   */
  textNodeList?: string[];
  /**
   * #### Default: `true`
   *
   * >
   *
   * ### [Text Bound Inline](https://aesthetic.js.org/rules/textBoundInline/)
   *
   * Controls how text bound tags (i.e, tags surrounded by text content) should be formatted. By default,
   * Æsthetic will respect input intent, and format tags in accordance with the implied structures.
   *
   * > `true`
   *
   * > Tags which are encapsulated by text content will remain inline and not adhere to atrribute
   * > line breaks for forced indentation. Instead, Æsthetic will format in accordance with structure.
   *
   * > `false`
   *
   * > Setting this option to `false` will apply formatting in accordance with current rulesets and
   * > tags which are encapsulated by text content will format without regard for placement.
   *
   */
  textBoundInline?: boolean
  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Text Preserve](https://aesthetic.js.org/rules/textPreserve/)
   *
   * If text in the provided markup code should be preserved exactly as provided.
   * This option eliminates beautification and wrapping of text content.
   *
   *
   * > **NOTE**
   * >
   * > **Text bound tags will be formatted according to the `textBoundInline` rule.**
   * > **Enabling this rule will only apply preservation of text content, not bound tags**
   *
   */
  textPreserve?: boolean;
  /**
   * #### Default: `true`
   *
   * >
   *
   * ### [Force Indent](https://aesthetic.js.org/rules/forceIndent/)
   *
   * Will force indentation linebreaks upon all content contained within tags. By default,
   * Æsthetic will force indent if the global `wrap` limit was exceeded, or when a newline
   * follows the start token ending delimiter. For example:
   *
   * ```html
   * <!-- BEFORE FORMATTING -->
   * <div>a
   * </div>
   * <div>
   * b</div>
   *
   * <!-- AFTER FORMATTING -->
   * <div>a</div>
   * <div>
   *   b
   * </div>
   * ```
   *
   * Notice how the second node (`<div>b</div>`) applied linebreak, whereas the first was
   * inlined. The second nodes ending (start tag) delimiter `>` was proceeding with a newline.
   * When `forceIndent` is disabled (i.e, `false`) which is the default, linebreak indentation
   * will behave according to the above. When enabled `true` then Æsthetic will produce apply
   * that output for all tags.
   */
  forceIndent?: boolean;

  /**
   * #### Default: `none`
   *
   * >
   *
   * ### [Quote Convert](https://aesthetic.js.org/rules/quoteConvert/)
   *
   * If the quotes of markup attributes should be converted to single quotes
   * or double quotes. It's highly discouraged to use single quotation characters
   * in markup languages for attribute values. Please use double quotations.
   *
   * > `double`
   *
   * > Converts single quotes to double quotes
   *
   * > `single`
   *
   * > Converts double quotes to single quotes
   *
   * > `none`
   *
   * > Quote conversion is excluded. Please note, that nested quotes (i.e, quotes within quotes),
   * will be automatically handled according to nesting order, for example:
   *
   * > ```js
   * > ""x"" → "'x'"
   * > ''x'' → '"x"'
   * > ```
   *
   */
  quoteConvert?: LiteralUnion<
  | 'double'
  | 'single'
  | 'none', string>;
  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Strip Attribute Lines](https://aesthetic.js.org/rules/stripAttributeLines/)
   *
   * Whether or not newlines contained existing between tag attributes should be removed
   * or preserved. This rule will be used along side `attributeLineBreak` and when
   * enabled (i.e, `true`) Æsthetic will remove any newlines. When disabled (i.e, `false`)
   * then Æsthetic will preserve newlines in accordance with the **global** value
   * defined in `preserveLine`.
   *
   * > **NOTE**
   * >
   * > **This rule only applies to attributes names not values.**
   */
  stripAttributeLines?: boolean;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Strip Text Wrap Lines](https://aesthetic.js.org/rules/markup/stripTextWrapLines/)
   *
   * Whether or not Æsthetic should strip newline occurances when applying word-wrap on text
   * content. This rule will only take effect if a word wrap limit has been defined via `wrap` option.
   * When enabled, Æsthetic will remove newline occurances from text identified content and produce a
   * strictly formed wrap.
   *
   * By default, this rule is `false` and Æsthetic will preserve newlines within text content, ensuring that
   * newline occurances adhere to the `preserveLine` limit regardless of whether or not a `wrap` limit has been set.
   * Setting this to `true` will override `preserveLine` within text specific content and instead refer to the `wrap`
   * limitation.
   *
   * > **NOTE**
   * >
   * > **If you have set `preserveText` to `true` this rule will be ignored, as the `preserveText` rule**
   * > **takes precedence and will override**.
   */
  stripTextWrapLines?: boolean;

  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Ignore CSS](https://aesthetic.js.org/rules/markup/ignoreCSS/)
   *
   * Whether HTML and Liquid tags identified to be containing CSS or SCSS
   * should be ignored from beautification.
   */
  ignoreCSS?: boolean;

  /**
   * #### Default: `true`
   *
   * >
   *
   * ### [Ignore CSS](https://aesthetic.js.org/rules/markup/ignoreJS/)
   *
   * Whether HTML and Liquid tags identified to be containing JavaScript
   * should be ignored from beautification. When disabled, formatting will
   * be applied in accordance with rules defined in the `script` lexer.
   *
   * > **NOTE**
   *
   * > **This rules is currently set to `true` by default as JavaScript formatting**
   * > **is not yet production ready, but still operational to an extent. Enable at**
   * > **your on discretion**
   *
   */
  ignoreJS?: boolean;
  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Ignore JSON](https://aesthetic.js.org/rules/markup/ignoreCSS/)
   *
   * Whether HTML `<script type="application/json>` tags or those annotated with a
   * JSON identifiable attribute should be ignored from beautification. When disabled,
   * formatting will be applied in accordancee with rules defined in the `json` ruleset.
   *
   */
  ignoreJSON?: boolean;
  /**
   * #### Default: `preserve`
   *
   * >
   *
   * ### [Value Spacing](https://aesthetic.js.org/rules/markup/valueSpacing/)
   *
   * Allows Æsthetic to carry-out formatting on attribute values. By default, Æsthetic
   * will preserve attribute values, but you may prefer to have values processed for consistency.
   * This should be used with consideration, especially if your project is leveraging a library
   * that require unique structures.
   *
   *
   * > `preserve`
   *
   * > This is the default. When set to `preserve`, values are left intact and the global `wrap`
   * > limit can be exceeded. This is the safest option to use.
   *
   * > `equipoise`
   *
   * > Setting this rule to `equipoise` will apply whitespace equalisation and format values in
   * > accordance with the implied structure. The Equipoise option performs predictive analysis
   * > in the safest way possible. It's important to note that newline occurences will be aligned
   * > when using equipoise.
   *
   * > `wrap`
   *
   * > You may prefer to linebreak values when the global `wrap` limit is exceeded. When using `wrap`
   * > option, values will insert a `\n` character on wrap edge.
   *
   */
  valueSpacing?: LiteralUnion<
  | 'preserve'
  | 'equipoise'
  | 'wrap', string>

}
