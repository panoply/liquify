import { LiteralUnion } from 'type-fest';
import { EmbeddedLiquid } from 'types/misc/grammar';

import { JSONRules } from './json';

export interface LiquidRules {
  /**
   * #### Default: `0`
   *
   * >
   *
   * #### [Argument Line Break](https://aesthetic.js.org/rules/liquid/argumentLineBreak/)
   *
   * The number of tag arguments or parameters allowed before applying a line break.
   * By default, this is set to `0`, which signals Æsthetic to apply line breaks when the
   * tokens exceed the global word `wrap` limit. Providing a value of `1` or more will apply
   * line breaks based on the count, meaning line breaks will be applied when the total
   * number of arguments (or parameters) is **equal to** or **greater than** the specified value.
   *
   * > **NOTE**
   *
   * > **Wrap limit will always run precedence. If the number of arguments (or parameters) is**
   * > **less than the count limit defined but the word wrap has been exceeded, linebreaks will apply.**
   *
   */
  argumentLineBreak?: number;
  /**
   * #### Default: `true`
   *
   * >
   *
   * #### [Comment Indent](https://aesthetic.js.org/rules/liquid/commentIndent/)
   *
   * This will determine whether comments should always start at position
   * `0` of each line or if comments should be indented according to the code.
   * It is unlikely you will ever want to set this to `false` so generally, just
   * leave it to `true`
   *
   */
  commentIndent?: boolean;
  /**
   * #### Default: `false`
   *
   * >
   *
   * ### [Comment Preserve](https://aesthetic.js.org/rules/liquid/commentPreserve/)
   *
   * Prevent Æsthetic from carrying out formatting on comments. When enabled (i.e, `true`),
   * comment formatting will be ignored.
   *
   * > **NOTE**
   * >
   * > **This rule will override and run precedence on the `commentIndent` rule.**
   * > **When enabled (i.e, `true`) it will have no effect.**
   *
   */
  commentPreserve?: boolean;

  /**
   * **Default** `true`
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
   * ```liquid
   *
   * <!-- Before Formatting -->
   * {% if foo %}{{ object.prop }}{% endif %}
   *
   * <!-- After formatting -->
   * {% if foo %}
   *   {{ object.prop }}
   * {% endif %}
   * ```
   */
  forceIndent?: boolean;
  /**
   * #### Default: `preserve`
   *
   * >
   *
   * #### [Delimiter Trims](https://aesthetic.js.org/rules/liquid/delimiterTrims/)
   *
   * How delimiter whitespace trim dashes should handled on Liquid tokens. Delimiter trims
   * represent the `-` character either suffixed or prefixed to delimiters of tags and output
   * tokens, (e.g: `{%-`, `{{-`, `-}}`, `-%}`).
   *
   * > **NOTE**
   * >
   * > **The rule will not touch tokens contained in strings and/or encapsulated within quotation characters.**
   *
   *
   * #### Options
   *
   * The rule accepts one of the following options be provided and defaults to `preserve`.
   *
   * > `preserve`
   *
   * > This is the **default** and will preserves delimiter trims. Typically, the preferred option to use.
   *
   * > `never`
   *
   * > Removes trims from all delimiters, both tag and ouput types
   *
   * > `always`
   *
   * > Applies trims to all delimiter occurances, both tag and output types
   *
   * > `tags`
   *
   * > Applies trims to all tag (`{%` and `%}`) delimiters only. Output token delimiter trims are preserved
   *
   * > `outputs`
   *
   * > Applies trims to all output (`{{` and `}}`) delimiters. Tag delimiter trims will be preserved
   *
   * > `multiline`
   *
   * > Trims will be applied to tags and output tokens which span multiple lines or contained newline occurences.
   * > This option will perform analysis of the internal markup and work together with other rules.
   *
   */
  delimiterTrims?:
  | 'preserve'
  | 'never'
  | 'always'
  | 'tags'
  | 'outputs'
  | 'multiline'
  /**
   * #### Default: `preserve`
   *
   * >
   *
   * #### [Delimiter Placement](https://aesthetic.js.org/rules/liquid/delimiterPlacement/)
   *
   * Controls the placement of opening (`{{`, `{%`) and closing (`}}`, `%}`) token delimiters.
   * By default, the rule will preserve the placement, however you may prefer that delimiters
   * instead apply different placement behaviour depending on containing content.
   *
   * > `preserve`
   *
   * > This is the default. When set to `preserve`, delimiters are left intact.
   *
   * > `consistent`
   *
   * > Consistent will use the opening delimiter (`{{` or `{%`) placement to determine the closing
   * > delimiter placement. Opening delimiters proceeded by newline character apply forcing.
   *
   * > `inline`
   *
   * > Ensures that opening and closing delimiters are placed on the same line as the token internal
   * > expression and will strip any newline occurances before (or after) delimiters.
   *
   * > `newline-multiline`
   *
   * > Forces both the opening and closing delimiters onto newlines when the internal structure of the
   * > token spans multiple lines.
   *
   */
  delimiterPlacement?:
  | 'preserve'
  | 'consistent'
  | 'inline'
  | 'newline-multiline'
  /**
   * #### Default: `0` OR `true`
   *
   * >
   *
   * #### [Filter Line Break](https://aesthetic.js.org/rules/liquid/filterLineBreak/)
   *
   * Accepts either a boolean value or number limit. Controls filter newline break formatting
   * (i.e, pipe prefixed `|` expressions). By default, this is set to `0` which signals to Æsthetic
   * to apply newline breaks based on the global word `wrap` limit. If you prefer to determine line
   * breaks on a per-token occurance, provide a boolean `true` value. A value of `true` tells Æsthetic
   * to use a preservational handling approach and format according to the input structure.
   *
   * >
   *
   * #### Options
   *
   * The rule defaults to `0` which results in `wrap` based line breaks. However, if `wrap` is set to `0`
   * then the default value will be `true` and preservational handling applies.
   *
   * > `false`
   *
   * > Prevents filter line breaks from applying. Filter expression will be output inline. Using a value
   * > of `false` is **highly discouraged**.
   *
   * > `true`
   *
   * > Passing a value of `true` will signal to Æsthetic that filter line breaks are to be applied
   * > using a preservational handling approach, wherein you decide when line breaks occur.
   *
   * > `0`
   *
   * > Providing a value of `0` will use word `wrap` limit to determine newline breaks. Only when the
   * > filter expression or token exceed wrap limit will line breaks apply.
   *
   * > `1` (or more)
   *
   * > When a value of `1` **or more** is provided, Æsthetic will apply line breaks according to the
   * > number of filter expression contained in the token. Whenever the number of filters exceeds or
   * > is equal to the value passed newline breaks will apply.
   * >
   * > **Wrap limit will run precedence, if the number of filters is less than the count limit defined**
   * > **but the word wrap has been exceeded, linebreaks will apply.**
   *
   */
  filterLineBreak?: boolean | number;
  /**
   * #### Default: `true`
   *
   * >
   *
   * #### [Indent Attribute](https://aesthetic.js.org/rules/liquid/indentAttribute/)
   *
   * Whether or not Liquid tag expression contained within attributes of markup tags should
   * apply indentation or be aligned at the starting point of each line.
   *
   * > **NOTE**
   *
   * > **This rule emulates the behaviour of the Liquid Prettier Plugin by Shopify**
   */
  indentAttribute?: boolean;
  /**
   * #### Default: `true`
   *
   * >
   *
   * #### [Dedent Tag List](https://aesthetic.js.org/rules/liquid/dedentTagList/)
   *
   * Prevents indentation from being applied to the containing content of a specific tag.
   *
   * > **NOTE**
   * >
   * > **The rules accepts tags which require and ender. Singleton type tags will be ignored.**
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
   * #### Default: `true`
   *
   * >
   *
   * #### [Equipoise Spacing](https://aesthetic.js.org/rules/liquid/equipoiseSpacing/)
   *
   * Whether or not spacing within Liquid tokens should apply correction. This rule
   * will equally distribute whitespace characters contained within Liquid tags and output tokens.
   *
   * > **NOTE**
   * >
   * > **Equipoise does not apply to expressions contained in strings (i.e, quotation `" "` or `' '` characters).**
   * > **As such, Liquid tokens contained within markup attributes do not respect equipoise.**
   */
  equipoiseSpacing?: boolean;
  /**
   * #### Default: `none`
   *
   * >
   *
   * #### [Quote Convert](https://aesthetic.js.org/rules/liquid/quoteConvert/)
   *
   * If the quotes in Liquid tokens should be converted to single quotes, double
   * quotes or be left intact.
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
   * > Quote conversion is not applied. Please note, that quotes within markup quotes will be
   * > automatically handled depending on nesting order, for example:
   *
   * > ```liquid
   * > "{{ "x" }}" → "{{ 'x' }}"
   * > '{{ 'x' }}' → '{{ "x" }}'
   * > ```
   *
   */
  quoteConvert?: LiteralUnion<
  | 'double'
  | 'single'
  | 'none', string>;
  /**
   * #### Default: `before`
   *
   * >
   *
   * #### [Line Break Separator](https://aesthetic.js.org/rules/liquid/lineBreakSeparator/)
   *
   * Controls the placement of linebreak separator characters (typically comma `,` tokens).
   * By default, Æsthetic places such characters **before** content.
   */
  lineBreakSeparator?: LiteralUnion<
  | 'preserve'
  | 'after'
  | 'before', string>;
  /**
   * #### Default: `before`
   *
   * >
   *
   * #### [Line Break Logical](https://aesthetic.js.org/rules/liquid/lineBreakLogical/)
   *
   * Controls the placement of conditional keyword combinators (i.e, `and` or `or`)
   * The rule will take effect when conditional expressions apply linebreaks, which occurs
   * when global `wrap` limit has been exceeded.
   *
   * > `preserve`
   *
   * > Placement is preserved. Conditional keyword combinators can be placed before or after.
   *
   * > `after`
   *
   * > Placement of conditional keyword combinators will be placed on the right side (after)
   * > the condition expression when linebreaks occur.
   *
   * > `before`
   *
   * > Placement of conditional keyword combinators will be placed on the left side (before)
   * > the condition expression when linebreaks occur.
   *
   */
  lineBreakLogical?: LiteralUnion<
  | 'preserve'
  | 'after'
  | 'before', string>;
  /**
   * **NOT YET AVAILABLE**
   *
   * _This rule is under consideration and is not yet available for usage_
   *
   * ---
   *
   * **Default** `[]`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is subjective
   *
   * A list of Liquid tags that should have newlines forced above and
   * below. Singleton type Liquid tags are not supported, the rule will
   * only apply newlines on start and end types.
   *
   * > **Note**
   * >
   * > **This rule will respect the liquid `forceIndent` rule. Only when newline**
   * > **occurances are detected will padding be applied.**
   */
  paddedTagList?: Array<LiteralUnion<
  | 'form'
  | 'paginate'
  | 'when'
  | 'elsif'
  | 'else'
  | 'for'
  | 'if'
  | 'raw'
  | 'tablerow'
  | 'unless'
  | 'schema'
  | 'style'
  | 'script'
  | 'stylesheet'
  | 'javascript', string>>;
  /**
   * #### Default: `[]`
   *
   * >
   *
   * #### [Ignore Tag List](https://aesthetic.js.org/rules/liquid/ignoreTagList/)
   *
   * A list of Liquid **tag** tokens to be ignored from formatting. Only tag types are accepted,
   * Object type tokens, (i.e, `{{ }}`) are not permitted and will have no effect.
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
  | 'render'
  | 'include'
  | 'assign'
  | 'cycle'
  | 'unless'
  | 'schema'
  | 'style'
  | 'script'
  | 'stylesheet'
  | 'javascript', string>>;
}
