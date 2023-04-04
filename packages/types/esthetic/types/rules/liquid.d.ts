import { LiteralUnion } from 'type-fest';

export interface LiquidRules {

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
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `tags`
   *
   * How delimiter whitespace trim dashes should handled on
   * Liquid tokens. You should avoid setting this to `force` in order to
   * avoid stripping whitespace between text content. The rule accepts one
   * of the following options:
   *
   * - `preserve`
   * - `never`
   * - `always`
   * - `tags`
   * - `outputs`
   * - `multiline`
   * - `linebreak`
   *
   * ```
   */
  delimiterTrims?:
  | 'preserve'
  | 'never'
  | 'always'
  | 'tags'
  | 'outputs'
  | 'multiline'

  /**
   * **default** `preserve`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `consistent`
   *
   * Controls how opening and closing delimiters should be beautified.
   *
   * - `preserve`
   * - `default`
   * - `inline`
   * - `consistent`
   * - `force`
   * - `force-multiline`
   *
   */
  delimiterPlacement?:
  | 'default'
  | 'inline'
  | 'preserve'
  | 'consistent'
  | 'force'
  | 'force-multiline'

  /**
   * **Default** `0`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `2`
   *
   * Forces arguments onto newlines. When this value is `0` then arguments will
   * be forced according to wrap limit.
   */
  forceArgument?: number;

  /**
   * **Default** `0`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `4`
   *
   * Forces filter pipes `|` onto newlines. When this value is `0` then filters will
   * be forced according to the `wrapForce` limit. When `forceWrap` is disabled (ie: `false`)
   * then the global `wrap` limit is used.
   *
   */
  forceFilter?: number;

  /**
   * **Default** `false`
   *
   * Applies indentation of Liquid contained attributes contained on markup tags.
   * This rule will emulate the liquid-prettier-plugin logic.
   */
  indentAttribute?: boolean;

  /**
   * **Default** `[]`
   *
   * Prevent indentation from being applied to containing content of the tag.
   */
  dedentTagList?: Array<LiteralUnion<
  | 'form'
  | 'paginate'
  | 'capture'
  | 'case'
  | 'for'
  | 'if'
  | 'raw'
  | 'tablerow'
  | 'liquid'
  | 'unless'
  | 'schema'
  | 'style'
  | 'script'
  | 'stylesheet'
  | 'javascript', string>>;

  /**
   * **Default** `true`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   *
   * Whether or not to normalize and correct the inner spacing of Liquid tokens.
   * This rules will equally distribute whitespace characters contained within
   * Liquid tags and output tokens.
   *
   * **Note**
   *
   * Normalized spacing does not strip newline characters or code wrapped in quotation
   * characters (strings) from the inner contents of Liquid tokens.
   *
   * ---
   *
   * #### Example
   *
   * *Below is an example of how this rule works if it's enabled, ie: `true` which is the default.
   * Notice how in the below example, all string tokens are left intact whereas other tokens will
   * normalize the whitespace distribution*
   *
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {{  object.prop   |filter:'x'  , 'xx'|    filter   :   'preserves   strings'   }}
   * {% assign  'foo '  =   ' x '   |  append : object . prop    %}
   *
   * <!-- After formatting -->
   *
   * {{ object.prop | filter: 'x', 'xx' | filter: 'preserves   strings' }}
   *
   * {% assign 'foo ' = ' preserved ' | append: object.prop %}
   * ```
   */
  normalizeSpacing?: boolean;

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
   * **Default** `after`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `before`
   *
   * Controls the placement of Liquid tag operator type characters in newline structures.
   * In situations where you write a multiline tag expression this rule can augment the
   * order of leading operator characters such as the parameter comma `,` separator.
   */
  lineBreakSeparator?: 'preserve' | 'after' | 'before';

  /**
   * **Default** `false`
   *
   * Prevent comment reformatting due to option wrap.
   */
  preserveComment?: boolean;

  /**
   * **Default** `false`
   *
   * Prevent the internals structures of Liquid tokens from being formatted. When enabled, Æsthetic
   * will preserve the internal formations of output and tags.
   */
  preserveInternal?: boolean;

  /**
   * **Default** `[]`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is subjective
   *
   * A list of Liquid tags that should excluded from formatting.
   * Only tags which contain a start and end types are valid.
   *
   */
  ignoreTagList?: Array<LiteralUnion<
  | 'form'
  | 'paginate'
  | 'capture'
  | 'case'
  | 'for'
  | 'if'
  | 'raw'
  | 'tablerow'
  | 'liquid'
  | 'unless'
  | 'schema'
  | 'style'
  | 'script'
  | 'stylesheet'
  | 'javascript', string>>;

}
