
interface EnforcedRules {

  /**
   * We only want the `beautify` feature from PrettyDiff. So
   * we will assert and enforce this `mode` for all rules.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * The operation to be performed.
   *
   * **PrettyDiff Options**
   *
   * > `beautify`
   *  Beautifies code and returns a string (**selected**)

   * > ~~`diff`~~
   *  Returns either command line list of differences or an HTML report
   *
   * > ~~`minify`~~
   *  Minifies code and returns a string
   *
   * > ~~`parse`~~
   * Using option `parseFormat` returns an object with shallow arrays,
   * a multidimensional array, or an HTML report.
   *
   */
  readonly mode: 'beautify',

  /**
   * We never want this rule active, it is not required in Liquify
   * or an LSP environment.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * An educational tool to generate HTML output of JavaScript
   * code to identify scope regions and declared references by color.
   * This option is ignored unless the code language is JavaScript or TypeScript.
   *
   * **PrettyDiff Options**
   *
   * > ~~`html`~~
   *  Generates HTML output with escaped angle braces and ampersands for
   *  embedding as code, which is handy in code producing tools
   *
   * > `none`
   *  Prevents use of this option (**selected**)
   *
   * > ~~`report`~~
   *  Generates HTML output that renders in web browsers
   *
   */
  readonly jsscope: 'none'

  /**
   * We will not activate this rule. No terminal logging is supported in
   * LSP or Liquify, logs are passed directly to the editor.
   *
   * ---
   *
   *  **PrettyDiff Description**
   *
   * A node only option to determine if terminal summary data should be
   * logged to the console.
   *
   * **PrettyDiff Options**
   *
   * > ~~`double`~~
   *  Default minimal summary
   *
   * > `log`
   *  Verbose logging (**selected**)
   *
   * > ~~`quiet`~~
   *  No extraneous logging
   *
   */
  readonly end_quietly: 'quiet';

  /**
   * We enable this rule, unsure of its actual use-case but might be related
   * to error logging when parse issues occur.
   *
   * ---
   *
   *  **PrettyDiff Description**
   *
   * A Node.js only option if parse errors should be written to the console.
   */
  readonly node_error: true;

  /**
   * This will insert characters instead of whitespaces for indentation. This
   * is **NEVER** desirable within this environment.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * The string characters to comprise a single indentation. Any string
   * combination is accepted.
   */
  readonly indent_char: ' '
}

interface SharedRules {
  /**
   * PrettyDiff defaults this to `4` but we overwrite to `2` or assign
   * the vscode workspace editor options.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * The number of `indent_char` values to comprise a single indentation.
   *
   */
  indent_size: number,

  /**
   * When no `indent_level` is defined in a `.liquirc` file, then indentation
   * levels are inhertied from the Text Editors workspace settings. If
   * an `.editorconfig` file is found present in root, those rules will be
   * applied in **precedence** over Text Editor.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * How much indentation padding should be applied to beautification?
   * This option is internally used for code that requires switching
   * between libraries.
   *
   * @default 0
   */
  indent_level: number,

  /**
   * When no `wrap` is defined in a `.liquirc` file, then wrap levels are
   * inhertied from the Text Editors workspace settings.
   *
   * **Notes**
   *
   * When using with `force_attribute` Liquid singular (output) type
   * tags will format inline with tag pairs. This is an issue that needs
   * to be fixed.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Character width limit before applying word wrap. A `0` value
   * disables this option. A negative value concatenates script strings.
   *
   * @default 0
   */
  wrap: number

  /**
   * PrettyDiff defaults this to `0` but we overwrite to `2` or assign
   * the vscode workspace editor options.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * The maximum number of consecutive empty lines to retain
   *
   * @default 2
   */
  preserve: number,

  /**
   * Whether or not to insert a final line. When this rule is undefined in
   * a `.liquidrc` file the Text Editors settings will be used, in vscode
   * that is `*.endWithNewline` where `*` is a language name.  If an
   * `.editorconfig` file is found present in root, those rules will be
   * applied in **precedence** over Text Editor.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Insert an empty line at the end of output.
   *
   * @default false
   */
  new_line: boolean
}

export interface HTMLEnforce {

  readonly language_name: 'HTML/Liquid';
  readonly language: 'html';
  readonly language_default: 'html';
  readonly lexer: 'markup';

  /**
   * We want to avoid this at all costs, it should ALWAYS be `false`.
   * It's a legacy PrettyDiff rule that will wreak havoc within HTML.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Allows immediately adjacement start and end markup tags
   * of the same name to be combined into a single self-closing tag.
   */
  readonly tag_merge: false

  /**
   * We want to avoid this at all costs, it should ALWAYS be `false`.
   * It's attempts to sort tag placements. Its wreaks havoc within HTML.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Sort child items of each respective markup parent element.
   */
  readonly tag_sort: false
}

export interface HTMLRules extends SharedRules, EnforcedRules, HTMLEnforce {

  /**
   * HTML Attribute sorting. When enabled it will sort attributes
   * alphabetically.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Alphanumerically sort markup attributes. Attribute sorting is
   * ignored on tags that contain attributes template attributes.
   *
   * @default false
   */
  attribute_sort: boolean

  /**
   * Define a sort list from which attributes should be arranged
   *
   * ---
   *
   *  **PrettyDiff Description**
   *
   * A comma separated list of attribute names. Attributes will be sorted according to
   * this list and then alphanumerically. This option requires 'attribute_sort' have
   * a value of true.
   *
   * @default ''
   */
  attribute_sort_list: string

  /**
   * **PrettyDiff Description**
   *
   * If a blank new line should be forced above comments.
   *
   * @default false
   */
  comment_line: boolean

  /**
   * **PrettyDiff Description**
   *
   * This will determine whether comments should always start at position
   * `0` of each line or if comments should be indented according to the code.
   *
   * @default false
   */
  comments: boolean

  /**
   * **PrettyDiff Description**
   *
   * Insert an empty line at the end of output
   *
   * @default false
   */
  new_line: boolean,

  /**
   * **PrettyDiff Description**
   *
   * Markup self-closing tags end will end with `' />'` instead of `'/>'`
   *
   * @default false
   */
  space_close: boolean,

  /**
   * **PrettyDiff Description**
   *
   * Prevent comment reformatting due to option wrap.
   *
   * @default true
   */
  preserve_comment: boolean,

  /**
   * **PrettyDiff Description**
   *
   * If text in the provided markup code should be preserved exactly as provided.
   * This option eliminates beautification and wrapping of text content.
   *
   * @default false
   */
  preserve_text: boolean,

  /**
   * **PrettyDiff Description**
   *
   * Automatically correct some sloppiness in code
   *
   * @default false
   */
  correct: boolean

  /**
   * **PrettyDiff Description**
   *
   * If all markup attributes should be indented each onto their own line._
   *
   * @default false
   */
  force_attribute: boolean

  /**
   * **PrettyDiff Description**
   *
   * Will force indentation upon all content and tags without regard for the
   * of new text nodes.
   *
   * @default false
   */
  force_indent: boolean

  /**
   * **PrettyDiff Description**
   *
   * If the quotes of markup attributes should be converted to single quotes
   * or double quotes.
   *
   * **PrettyDiff Options**
   *
   * - `double` Converts single quotes to double quotes
   * - `none` Ignores this option
   * - `single` Converts double quotes to single quotes
   *
   * ---
   *
   * @default 'none'
   */
  quote_convert: 'double' | 'single' | 'none'

  /**
   * **PrettyDiff Description**
   *
   * If markup tags should have their insides preserved.
   * This option is only available to markup and does not support
   * child tokens that require a different lexer.
   *
   * @default false
   */
  unformatted: boolean

}

/**
 * Enforced Formatting Rules
 *
 * These rulesets are enforced for the JSON language
 * in order to prevent any errors occuring while a format
 * is being executed.
 */
export interface JSONEnforce {

  /**
   * **PrettyDiff Description**
   *
   * Removes semicolons that would be inserted by ASI.
   * This option is in conflict with option `correct` and takes
   * precedence over conflicting features. Use of this option is
   * a possible security/stability risk.
   *
   */
  readonly no_semicolon: true,

  /**
   * We are asserting a `no_semicolon` rule set in JSON, this should
   * never be true to avoid conflicting errors.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Automatically correct some sloppiness in code
   */
  readonly correct: false

  /**
   * We will enforce double quotes in JSON language as single quotes are
   * invalid and if we leave it default, this would allow single quotes and
   * wreak havoc.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * If the quotes of markup attributes should be converted to single quotes
   * or double quotes.
   *
   *
   */
  readonly quote_convert: 'double'

  /**
   * We **NEVER** want to apply end commas in JSON because it is
   * results in invalid syntax.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * If there should be a trailing comma in arrays and objects.
   * Value "multiline" only applies to modes beautify and diff.
   * always — Always ensure there is a tailing comma._
   *
   * **PrettyDiff Options**
   *
   * - `always` Always ensure there is a tailing comma
   * - `never` Remove trailing commas
   * - `none` Ignore this option
   *
   */
  readonly end_comma: 'never'

  /**
   * We will ignore the `brace_style` option because its just sugar. It will
   * re-assign options to align with JS Beautify standards, which is fine
   * but its better the have the user _explicitly_ define the options. We
   * will enforce this option to `none`
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * > Emulates JSBeautify's brace_style option using existing
   * Pretty Diff options._
   *
   * **PrettyDiff Options**
   *
   * `collapse`
   * > Sets `format_object` to `indent` and `neverflatten` to `true`.
   *
   * `collapse-preserve-inline`
   * > Sets `brace_padding` to true and `format_object` to `inline`.
   *
   * `expand`
   * > Sets `braces` to `true`, `format_object` to `indent`, and
   * and `neverflatten` to `true`
   *
   * `none`
   * > Ignores this option
   */
  readonly brace_style: 'none',

}

export interface JSONRules extends SharedRules, EnforcedRules, JSONEnforce {

  readonly language_name: 'JSON',
  readonly language: 'json',
  readonly language_default: 'json';
  readonly lexer: 'script',

  /**
   * This option will alphabetically sort object properties in JSON objects.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Sorts markup attributes and properties by key name in script and style
   *
   * @default false
   */
  object_sort: boolean

  /**
   * This option will determine how arrays cotained on objects will
   * be formatted.
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true` and each
   * object in the array starts on a newline.
   *
   * ```json
   * {
   *    "array": [
   *      {
   *        "name": "foo"
   *      },
   *      {
   *        "name": "bar"
   *      },
   *      {
   *        "name": "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false` and
   * each object in the array starts curly braces inline.
   *
   * ```json
   * {
   *    "array": [
   *      {
   *        "name": "foo"
   *      }, {
   *        "name": "bar"
   *      }, {
   *        "name": "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Determines if opening curly braces will exist on
   * the same line as their condition or be forced onto a new line.
   * (Allman style indentation).
   *
   */
  readonly braces: boolean,

  /**
   * This will create a newline before and after objects values, for example:
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```json
   * {
   *
   *  "foo": {
   *
   *   "bar": {
   *      "baz": 0
   *    }
   *
   *   }
   *
   * }
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false`
   *
   * ```json
   * {
   *  "foo": {
   *   "bar": {
   *      "baz": 0
   *    }
   *   }
   * }
   * ```
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * If true an empty line will be inserted after opening curly braces
   * and before closing curly braces.
   *
   */
  brace_line: boolean,

  /**
   * Controls how arrays on objects are formatted.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Determines if all array indexes should be indented, never indented,
   * or left to the default._
   *
   * **PrettyDiff Options**
   *
   * - `default`
   *  Default formatting (**Selected**)
   *
   * - `indent`
   *  "Always indent each index of an array
   *
   * - `inline`
   *  Ensure all array indexes appear on a single line
   *
   * @default 'default'
   */
  format_array: 'default' | 'indent' | 'inline',

  /**
   * Controls how arrays on objects are formatted. We will exclude
   * the `inline` option to prevent unreadable objects.
   *
   * ---
   *
   * **PrettyDiff Description**
   *
   * Determines if all object keys should be indented, never indented,
   * or left to the default._
   *
   * **PrettyDiff Options**
   *
   * > `default` (**Selected**)
   *  Default formatting
   *
   * > `indent`
   *  "Always indent each index of an array
   *
   * > `inline` (**Disabled**)
   *  Ensure all array indexes appear on a single line
   *
   * @default 'default'
   */
  format_object: 'default' | 'indent',
}
