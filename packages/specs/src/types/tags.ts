import { References } from './shared';
import { Type } from '../utils/enums';
import { Types } from './types';
import { Arguments, Parameter } from './arguments';

/* TAG EMBEDDED LANGUAGES --------------------- */

export declare type Languages = (
  | 'liquid'
  | 'html'
  | 'yaml'
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'css'
  | 'scss'
  | 'markdown'
);

/* TAG SPECIFICATIONS ------------------------- */

export declare interface Tag {
  /**
   * Type
   *
   * The type categorization of the tag. Type categorization is
   * required on all tags.
   */
  readonly type: Type | Types.Tag,
  /**
   * Singular
   *
   * Is this tag singular, ie: does not require an `{% endtag %}`
   *
   * @default false
   */
  readonly singular?: boolean;
  /**
   * Unique
   *
   * If the tag may only be used once per document, assert this
   * to `true`. This (for example) ensures a tag is only expressed
   * one time within each file.
   *
   * @default false
   */
  readonly unique?: boolean;
  /**
   * Snippet
   *
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;
  /**
   * Description
   *
   * Description of this tag
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * Reference
   *
   * A URL reference to the documentation pretaining to this tag
   *
   * @default undefined
   */
  readonly reference?: References | undefined;
  /**
   * Filters
   *
   * Whether or not the tag accepts filters. When `undefined` the parser
   * will assume `false`.
   *
   * @default false
   */
  readonly filters?: boolean;
  /**
   * Language
   *
   * When the contents of the tag is pertaining to another language,
   * this property is used to define the language contained within the
   * tag block.
   *
   * ---
   *
   * **IMPORTANT**
   *
   * Tag must not be `singular`
   *
   * @default true
   */
  readonly language?: Languages;
  /**
   * Trims
   *
   * Whether or not the tag accepts whitespace dash trims. When `undefined`
   * the parser will assume `true`
   *
   * @default true
   */
  readonly trims?: boolean;
  /**
   * Deprecated
   *
   * Is this tag deprecated? When `undefined` the parser will assume `false`
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * Parents
   *
   * When the tag is available within the scope of
   * a specific object and/or tag.
   *
   * @default undefined
   */
  readonly parents?: string[] | undefined;
  /**
   * Children
   *
   * When a tag requires children to be contained
   * within, list them here.
   *
   * @default undefined
   */
  readonly children?: string[] | undefined;
  /**
   * Arguments
   *
   * Arguments used within the contents of the tag.
   *
   * @default undefined
   */
  readonly arguments?: Arguments
  /**
   * Parameters
   *
   * Predefined tag parameters.
   *
   * @default undefined
   */
  readonly parameters?: { [parameter: string]: Parameter }
}

/* REFERENCE ---------------------------------- */

export declare interface Tags {
  [name: string]: Tag;
}
