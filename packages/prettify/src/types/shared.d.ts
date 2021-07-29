export interface SharedOptions {
  /**
   * **Description**
   *
   * The number of `indentChar` values to comprise a single indentation.
   * Defaults this to `4` but we overwrite to `2` or assign the vscode workspace
   * editor options.
   */
  indentSize: number,

  /**
   * **Description**
   *
   * How much indentation padding should be applied to beautification?
   * This option is internally used for code that requires switching
   * between libraries.
   *
   * @default 0
   */
  indentLevel: number,

  /**
   * **Description**
   *
   * Character width limit before applying word wrap. A `0` value
   * disables this option. A negative value concatenates script strings.
   *
   * @default 0
   */
  wrap: number

  /**
   * **Description**
   *
   * The maximum number of consecutive empty lines to retain
   *
   * @default 2
   */
  preserveLines: number,

  /**
   * **PrettyDiff**: `new_line`
   *
   * ---
   *
   * **Description**
   *
   * Whether or not to insert a final line. When this rule is undefined in
   * a `.liquidrc` file the Text Editors settings will be used, in vscode
   * that is `*.endWithNewline` where `*` is a language name.  If an
   * `.editorconfig` file is found present in root, those rules will be
   * applied in **precedence** over Text Editor.
   *
   * @default false
   */
  newlineEnd: boolean
}


export interface SharedEnforced {

   /**
   * **PrettyDiff**: `indent_size`
   *
   * ---
   *
   *  **Description**
   *
   * The operation to be performed. This should always
   * be set to 'beautify' and no other option should be applied.
   */
  readonly mode: 'beautify';


  /**
   * **PrettyDiff** `indent_char`
   *
   * ---
   *
   * **Description**
   *
   * The string characters to comprise a single indentation. Any string
   * combination is accepted. This will insert characters instead
   * of whitespaces for indentation. This is **NEVER** desirable within
   * this environment.
   */
  readonly indentChar: ' '
}
