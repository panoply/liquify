
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

}

interface SharedRules {
  disabled?: boolean | undefined;
  eol?: string | undefined;
  end_with_newline?: boolean | undefined;
  indent_size?: number | undefined;
  indent_char?: string | undefined;
  indent_level?: number | undefined;
  preserve_newlines?: boolean | undefined;
  max_preserve_newlines?: number | undefined;
  indent_with_tabs?: boolean | undefined;
  wrap_line_length?: number | undefined;
  indent_empty_lines?: boolean | undefined;
  templating?: string[] | undefined;
}

/**
 * Enforced Formatting Rules
 *
 * These rulesets are enforced for the JSON language
 * in order to prevent any errors occuring while a format
 * is being executed.
 */
export interface JavaScriptEnforce {

  /**
   * This is related to JS Lint, we disable this feature
   * as JavaScript contained within Liquid will not be linted.
   *
   * ---
   *
   * **JS Beautify Description**
   *
   * Enable jslint-stricter mode
   */
  readonly jslint_happy: false;

  /**
   * We do not want to test output in a raw manner, this option
   * should always be set to false.
   *
   */
  readonly test_output_raw: false

}

export interface JavaScriptRules extends SharedRules, EnforcedRules, JavaScriptEnforce {

  /**
   * Brace style which refers to curly braces within code.
   * This does not touch or effect Liquid Syntax.
   *
   * ---
   *
   * **JS Beautify Options**
   *
   * `collapse`
   * > Collapses braces onto their own line"
   *
   * `preserve-inline`
   * > Preserves braces on a single line.
   *
   * `end-expand`
   * > Ends braces on their own line
   *
   * `expand`
   * > Braces on their own line
   *
   * `none`
   * > Attempts to keep braces where they are, untouched.
   */
  brace_style?: 'collapse' | 'expand' | 'end-expand' | 'none' | 'preserve-inline' | undefined;

  /**
   *
   * **JS Beautify Description**
   *
   * Don't indent chained method calls
   *
   * @default false
   */
  unindent_chained_methods?: boolean | undefined;

  /**
   *
   * **JS Beautify Description**
   *
   * Break chained method calls across subsequent lines
   *
   * @default false
   */
  break_chained_methods?: boolean | undefined;

  /**
   *
   * **JS Beautify Description**
   *
   * Add padding spaces within paren, ie. `f( a, b )`
   *
   * @default false
   */
  space_in_paren?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Add a single space inside empty paren, ie. `f( )`
   *
   * @default false
   */
  space_in_empty_paren?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Add a space before an anonymous function's parens, ie. `function ()`
   *
   * @default false
   */
  space_after_anon_function?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Add a space before a named function's parens, i.e. `function example ()`
   *
   * @default false
   */
  space_after_named_function?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Preserve array indentation
   *
   * @default false
   */
  keep_array_indentation?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * _No description_
   *
   * @default false
   */
  space_before_conditional?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Decode printable characters encoded in xNN notation
   *
   * @default false
   */
  unescape_strings?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Pass E4X xml literals through untouched
   *
   * @default false
   */
  e4x?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Put commas at the beginning of new line instead of end
   *
   * @default false
   */
  comma_first?: boolean | undefined;

  /**
   * **JS Beautify Description**
   *
   * Set operator position
   *
   * ---
   *
   * **JS Beautify Options**
   *
   * `before-newline`
   * > Sets the operator before a newline
   *
   * `preserve-inline`
   * > Preserves the operator inline
   *
   * `after-newline`
   * > Sets operator on a newline
   *
   * ---
   *
   * @default 'before-newline'
   */
  operator_position?: 'before-newline' | 'after-newline' | 'preserve-newline' | undefined;

}
