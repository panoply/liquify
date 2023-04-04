export interface ScriptRules {

  /**
   * **Former Rule**
   *
   * `end_comma`
   *
   * **Description**
   *
   * If there should be a trailing comma in arrays and objects.
   * Value "multiline" only applies to modes beautify and diff.
   * always — Always ensure there is a tailing comma._
   *
   * **Options**
   *
   * - `always` Always ensure there is a tailing comma
   * - `never` Remove trailing commas
   * - `none` Ignore this option
   *
   */
  endComma?: 'none' | 'always' | 'never'

  /**
   * **Default** `true`
   *
   * If a blank new line should be forced above comments.
   * When this rule is `true` comments will always have a
   * newline applied before they start, this includes within
   * objects.
   *
   * Please note, that this rule will only be applied to block
   * type comments, line (`//`) comments will not be touched.
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
   * **Default: `none`**
   *
   * Emulates JSBeautify's brace_style option using existing options.
   *
   * **Options**
   *
   * `collapse`
   * > Sets `format_object` to `indent` and `neverflatten` to `true`.
   *
   * `collapse-preserve-inline`
   * > Sets `brace_padding` to true and `formatObject` to `inline`.
   *
   * `expand`
   * > Sets `braces` to `true`, `formatObject` to `indent`, and
   * `neverflatten` to `true`
   *
   * `none`
   * > Ignores this option
   */
  braceStyle?: 'none' | 'collapse' | 'collapse-preserve-inline' | 'expand',

  /**
   * This option will alphabetically sort object properties in JSON objects.
   *
   * ---
   * **Description**
   *
   * Sorts markup attributes and properties by key name in script and style
   *
   * @default false
   */
  objectSort?: boolean

  /**
   * This option will determine how arrays cotained on objects will
   * be formatted.
   *
   * ---
   *
   * #### Enabled
   *
   * Below is an example when this option is set to `true` and each
   * object in the array starts on a newline.
   *
   * ```javascript
   *
   * const obj = {
   *    array: [
   *      {
   *        name: "foo"
   *      },
   *      {
   *        name: "bar"
   *      },
   *      {
   *        "name": "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * #### Disabled
   *
   * Below is an example when this option is set to `false` and
   * each object in the array starts curly braces inline.
   *
   * ```javascript
   *
   * const obj = {
   *    array: [
   *      {
   *        name: "foo"
   *      }, {
   *        name: "bar"
   *      }, {
   *        name: "baz"
   *      }
   *    ]
   * }
   * ```
   *
   * ---
   *
   * **Description**
   *
   * Determines if opening curly braces will exist on
   * the same line as their condition or be forced onto a new line.
   * (Allman style indentation).
   *
   */
  braceAllman?: boolean,

  /**
   * This will create a newline before and after objects values, for example:
   *
   * ---
   *
   * #### Enabled
   *
   * Below is an example when this option is set to `true`
   *
   * ```javascript
   *
   * const obj = {
   *
   *  foo: {
   *
   *   bar: {
   *      baz: 0
   *    }
   *
   *   }
   *
   * }
   * ```
   *
   * #### Disabled
   *
   * _Below is an example when this option is set to `false` - If `true` an empty
   * line will be inserted after opening curly braces and before closing curly braces._
   *
   * ```javascript
   * const obj = {
   *  foo: {
   *   bar: {
   *      baz: 0
   *    }
   *   }
   * }
   * ```
   *
   */
  bracePadding?: boolean,

  /**
   * Controls how arrays on objects are formatted.
   *
   * ---
   *
   * **Description**
   *
   * Determines if all array indexes should be indented, never indented,
   * or left to the default._
   *
   * **Options**
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
  arrayFormat?: 'default' | 'indent' | 'inline',

  /**
   * Controls how arrays on objects are formatted. We will exclude
   * the `inline` option to prevent unreadable objects.
   *
   * ---
   *
   * **Description**
   *
   * Determines if all object keys should be indented, never indented,
   * or left to the default._
   *
   * **Options**
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
  objectIndent?: 'default' | 'indent' | 'inline',

  /**
   * **Description**
   *
   * If true an empty line will be inserted after opening curly braces
   * and before closing curly braces.
   *
   * @default false
   */
  braceNewline?: boolean,

  /**
   * **Description**
   *
   * If the colon separating a case's expression (of a switch/case block)
   * from its statement should be followed by a space instead of indentation,
   * thereby keeping the case on a single line of code.
   */
  caseSpace?: boolean,

  /**
   * Allow inline returns without braces
   *
   * @default true
   */
  inlineReturn?: boolean,

  /**
   * **Description**
   *
   * If else_line is true then the keyword 'else' is
   * forced onto a new line.
   */
  elseNewline?: boolean,

  /**
   * **Description**
   *
   * If a space should follow a JavaScript function name.
   */
  functionNameSpace?: boolean,

  /**
   * **Description**
   *
   * Inserts a space following the function keyword for anonymous functions.
   */
  functionSpace?: boolean,

  /**
   * **Description**
   *
   * When to break consecutively chained methods and properties onto
   * separate lines. A negative value disables this option. A value of 0
   * ensures method chainsare never broken.
   */
  methodChain?: number,

  /**
   * **Description**
   *
   * If destructured lists in script should never be flattend.
   */
  neverFlatten?: boolean,

  /**
   * **Description**
   *
   * If the colon separating a case's expression (of a switch/case block)
   * from its statement should be followed by a space instead of indentation,
   * thereby keeping the case on a single line of code.
   */
  noCaseIndent?: boolean,

  /**
   * **Description**
   *
   * Removes semicolons that would be inserted by ASI.
   * This option is in conflict with option `attemptCorrection` and takes
   * precedence over conflicting features. Use of this option is
   * a possible security/stability risk.
   */
  noSemicolon?: boolean;

  /**
   * **Description**
   *
   * If ternary operators in JavaScript `?` and `:` should remain on the same line.
   */
  ternaryLine?: boolean,

  /**
   * **Description**
   *
   * If consecutive JavaScript variables should be merged into a
   * comma separated list or if variables in a list should be separated.
   * ---
   *
   * **Example**
   *
   * Below is an example of how this rule works if it's enabled, ie: `true`
   *
   * **Before Formatting:**
   *
   * ```js
   * const foo = 'x'
   * const bar = 'x'
   * const baz = 'x'
   * ```
   *
   * **After Formatting:**
   *
   * ```js
   * const foo = 'x',
   *   bar = 'x',
   *   baz = 'x';
   * ```
   */
  variableList?: 'none' | 'each' | 'list';

  /**
   * **Default** `false`
   *
   * Prevent comment reformatting due to option wrap.
   */
  preserveComment?: boolean;

  /**
   * **Description**
   *
   * If lists of assignments and properties should be vertically aligned
   *
   * ---
   *
   * **Example**
   *
   * Below is an example of how this rule works if it's enabled, ie: `true`
   *
   * **Before Formatting:**
   *
   * ```js
   * const object = {
   *   someProperty: 'x',
   *   anotherProperty: 'x',
   *   fooProperty: 'x'
   * };
   * ```
   *
   * **After Formatting:**
   *
   * ```js
   * const object = {
   *   someProperty    : 'x',
   *   anotherProperty : 'x',
   *   fooProperty     : 'x'
   * };
   * ```
   */
  vertical?: boolean,
  /**
   * **Description**
   *
   * If the quotes of script attributes should be converted to single quotes
   * or double quotes.
   *
   * **Options**
   *
   * - `double` Converts single quotes to double quotes
   * - `none` Ignores this option
   * - `single` Converts double quotes to single quotes
   *
   * ---
   *
   * @default 'none'
   */
  quoteConvert?: 'double' | 'single' | 'none';

  /**
   * Style Guides
   */
  styleGuide?:
  | 'none'
  | 'airbnb'
  | 'crockford'
  | 'google'
  | 'jquery'
  | 'jslint'
  | 'none'
  | 'standard'
  | 'yandex';
}
