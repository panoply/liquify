export interface JSONRules {

  /**
   * **Default:** `default`
   *
   * Controls how arrays on objects are formatted. This rules will
   * determines if all array indexes should be indented, never indented,
   * or left to the default.
   *
   * **Options**
   *
   * - `default`
   *  Default formatting (default)
   *
   * - `indent`
   *  "Always indent each index of an array
   *
   * - `inline`
   *  Ensure all array indexes appear on a single line
   *
   * @default 'default'
   */
  arrayFormat?: 'default' | 'indent' | 'inline';

  /**
   * **Default:** `true`
   *
   * This option will determine how arrays cotained on objects will
   * be formatted. If opening curly braces should exist on the same
   * line as their condition or be forced onto a new line.
   * (Allman style indentation).
   *
   * ---
   *
   * #### Enabled
   *
   * _Below is an example when this option is set to `true` and each
   * object in the array starts on a newline._
   *
   * ```json
   *
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
   * #### Disabled
   *
   * _Below is an example when this option is set to `false` and
   * each object in the array starts curly braces inline._
   *
   * ```json
   *
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
   */
  braceAllman?: boolean;

  /**
   * **Default:** `false`
   *
   * If true an empty line will be inserted after opening curly braces
   * and before closing curly braces.
   *
   * ---
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```json
   *
   * {
   *
   *  "foo": {
   *
   *    "bar": {}
   *
   * }
   *
   * ```
   *
   * ---
   *
   * **Disabled**
   *
   * Below is an example when this option is set to `false`
   *
   * ```json
   *
   * {
   *   "foo": {
   *     "bar": {}
   *   }
   * }
   *
   * ```
   */
  bracePadding?: boolean;

  /**
   * **Default:** `default`
   *
   * Controls how arrays on objects are formatted. We will exclude
   * the `inline` option to prevent unreadable objects. If all object
   * keys should be indented, never indented, or left to the default.
   *
   * **Options**
   *
   * > `default` (default)
   *  Default formatting
   *
   * > `indent`
   *  "Always indent each index of an array
   */
  objectIndent?: 'default' | 'inline' | 'indent';

  /**
   * **Default:** `false`
   *
   * This option will alphabetically sort object properties in JSON objects.
   * When JSON objects have more than 2k keys then this will be an expensive
   * operation, but in most cases is fine to use.
   *
   * ---
   *
   * **Enabled**
   *
   * Below is an example when this option is set to `true`
   *
   * ```json
   *
   * {
   *   "e": 5,
   *   "d": 4,
   *   "b": 2,
   *   "c": 3,
   *   "a": 1
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
   *
   * {
   *   "a": 1,
   *   "b": 2,
   *   "c": 3,
   *   "d": 4,
   *   "e": 5
   * }
   *
   * ```
   */
  objectSort?: boolean;
}
