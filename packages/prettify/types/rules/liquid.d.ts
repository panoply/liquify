export interface LiquidOptions {

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
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `tags`
   *
   * How delimiter whitespace trim dashes should handled on
   * Liquid tokens. You should avoid setting this to `force` in order to
   * avoid stripping whitespace between text content. The rule accepts one
   * of the following options:
   *
   * - `preserve`
   * - `strip`
   * - `force`
   * - `tags`
   * - `outputs`
   *
   * ---
   *
   * #### Preserve Example
   *
   * *Below is an example of how this rule works if set to `preserve` which is
   * the default and leaves all occurances of trims intact*
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {% if x -%}
   *   {{- foo_bar }} {{- trims }}
   * {% endof -%}
   *
   * <!-- Before formatting -->
   * {% if x -%}
   *   {{- foo_bar }} {{- trims }}
   * {% endof -%}
   * ```
   *
   * ---
   *
   * #### Strip Example
   *
   * *Below is an example of how this rule works if set to `strip` which will
   * remove all occurances of trims from Liquid tokens.*
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {%- if x -%}
   *   {{- foo_bar -}}
   * {%- endof -%}
   *
   * <!-- Before formatting -->
   * {% if x %}
   *   {{ foo_bar }}
   * {% endof %}
   *
   * ```
   *
   * ---
   *
   * #### Force Example
   *
   * *Below is an example of how this rule works if set to `force` which will
   * apply trims on all Liquid tokens.*
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {% if x %}
   *   {{ foo_bar }}
   * {% endof %}
   *
   * <!-- Before formatting -->
   * {%- if x -%}
   *   {{- foo_bar -}}
   * {%- endof -%}
   *
   * ```
   *
   *
   * ---
   *
   * #### Tags Example
   *
   * *Below is an example of how this rule works if set to `tags` which will
   * apply trims to Liquid tag tokens but leave object output tokens intact.*
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {% if x %}
   *  {{ foo_bar -}} {{ no_trims }}
   * {% endof %}
   *
   * <!-- After formatting -->
   * {%- if x -%}
   *   {{ foo_bar -}} {{ no_trims }}
   * {%- endof -%}
   *
   * ```
   *
   * ---
   *
   * #### Outputs Example
   *
   * *Below is an example of how this rule works if set to `outputs` which will
   * apply trims to Liquid object output tokens but leave tag tokens intact.*
   *
   * ```liquid
   *
   * <!-- Before formatting -->
   * {% if x -%}
   *  {{ foo_bar }} {{ trims }}
   * {%- endof %}
   *
   * <!-- After formatting -->
   * {% if x -%}
   *   {{- foo_bar -}} {{- trims -}}
   * {%- endof %}
   *
   * ```
   */
  delimiterTrims?: 'preserve' | 'strip' | 'force' | 'tags' | 'outputs';

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
   * **Default** `default`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `before`
   *
   * Controls the placement of Liquid tag operator type characters in newline structures.
   * In situations where you write a multiline tag expression this rule can augment the
   * order of leading operator characters such as the parameter comma `,` separator.
   */
  lineBreakSeparator?: 'default' | 'before' | 'after';

  /**
   * **Default** `false`
   *
   * Prevent comment reformatting due to option wrap.
   */
  preserveComment?: boolean;

  /**
   * **Default** `[]`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`
   *
   * A list of Liquid tags that should excluded from formatting.
   * Only tags which contain a start and end types are valid.
   *
   */
  ignoreTagList?: string[];

  /**
   * **Default** `intent`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `intent`
   *
   * Controls force indentation applied in accordance with the attribute value expressions.
   * This rule is Liquid specific.
   *
   */
  valueForce?: 'wrap' | 'newline' | 'intent' | 'always' | 'never';
}
