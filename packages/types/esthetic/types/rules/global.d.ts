import { LiteralUnion } from 'type-fest';
import { LanguageName } from '../shared';

export interface GlobalRules {

  /**
   * **Default** `false`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `true`
   */
  correct?: boolean;

  /**
   * **Default** `none`
   *
   * 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `recommended`
   *
   * A preset ruleset style guide to use. This will assign rules according to a set of defaults
   * to produce a certain beautification result.
   *
   * ---
   *
   * 👎 &nbsp;&nbsp;**default**
   *
   * This is the default and the most unobtrusive. Formatting will use a preservational
   * based technique with this preset mode.
   *
   * 👍 &nbsp;&nbsp;**recommended**
   *
   * This style guide is typically suited for most cases, it will apply a base set of
   * rules aligned with the Æsthetic approach.
   *
   * 👍 &nbsp;&nbsp;**strict**
   *
   * This is a strict ruleset curated by the projects author [Panoply](https://github.com/panoply).
   *
   * 👍 &nbsp;&nbsp;**warrington**
   *
   * This style guide preset is best suited for developers and specifically teams working with
   * Shopify themes. The preset was curated by the talented [David Warrington](https://ellodave.dev/).
   *
   *
   * 🤡 &nbsp;&nbsp;**prettier**
   *
   * Replicates the Prettier style of formatting. If you've used the Shopify Liquid Prettier Plugin and
   * enjoy that beautification style using this preset will produce the same results.
   *
   */
  preset?: LiteralUnion<'default' | 'recommended' | 'strict' | 'warrington' | 'prettier', string> ;
  /**
   * **Default** `auto`
   *
   * The name of the language provided.
   */
  language?: LanguageName;

  /**
   * **Default** `2`
   *
   * The number of `indentChar` values to comprise a single indentation.
   */
  indentSize?: number;

  /**
   * **Default** `0`
   *
   * How much indentation padding should be applied to beautification?
   * This option is internally used for code that requires switching
   * between libraries.
   */
  indentLevel?: number;

  /**
   *  **Default** `0`
   *
   * Character width limit before applying word wrap. A `0` value
   * disables this option. A negative value concatenates script strings.
   */
  wrap?: number;

  /**
   * **Default** `0`
   *
   *
   * Wrap fraction is used on internal structures as a secondary point of control.
   * By default, it will use a 75% metric according to `wrap` defined values.
   */
  wrapFraction?: number;

  /**
   *  **Default** `false`
   *
   * Whether or not to insert a final line. When this rule is undefined in
   * a `.liquidrc` file the Text Editors settings will be used, in vscode
   * that is `*.endWithNewline` where `*` is a language name.  If an
   * `.editorconfig` file is found present in root, those rules will be
   * applied in **precedence** over Text Editor.
   */
  endNewline?: boolean;

  /**
   *  **Default** `false`
   *
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   */
  crlf?: boolean;

  /**
   * **Default** ` `
   *
   * The string characters to comprise a single indentation.
   * Any string combination is accepted
   */
  indentChar?: string;

  /**
   * **Default** `2`
   *
   * The maximum number of consecutive empty lines to retain.
   */
  preserveLine?: number;
}
