import { IReferences, IArgument, IParameter, TagScopes } from './common';
import { TagTypes } from './types';

/* TAG EMBEDDED LANGUAGES --------------------- */

export type TagEmbeddedLanguages =
  | 'liquid'
  | 'html'
  | 'yaml'
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'css'
  | 'scss'
  | 'markdown';

/* TAG SPECIFICATIONS ------------------------- */

export interface ITag<T = TagTypes> {

  /**
   * The type categorization of the tag. Type categorization is
   * required on tags.
   */
  readonly type: T,

  /**
   * Is this tag singular, ie: does not require an `{% endtag %}`
   *
   * @default false
   */
  readonly singular?: boolean;

  /**
   * If the tag may only be used once per document, assert this
   * to `true?.
   *
   * @default false
   */
  readonly unique?: boolean;

  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;

  /**
   * Description of this tag
   *
   * @default undefined
   */
  readonly description?: string;

  /**
   * A URL reference to the documentation pretaining to this tag
   *
   * @default undefined
   */
  readonly reference?: IReferences | undefined;

  /**
   * Whether or not the tag accepts filters,
   * When `undefined` the parser will assume `false`
   *
   */
  readonly filters?: boolean;

  /**
   * When the contents of the tag is pertaining to another language,
   * this property is used to define the language contained within the
   * tag block.
   *
   * **IMPORTANT** Tag must not be `singular`
   *
   * @default true
   */
  readonly language?: TagEmbeddedLanguages;

  /**
   * Whether or not the tag accepts whitespace dash trims.
   * When `undefined` the parser will assume `true`
   */
  readonly trims?: boolean;

  /**
   * Is this tag deprecated?
   * When `undefined` the parser will assume `false`
   */
  readonly deprecated?: boolean;

  /**
   * When the tag is available within the scope of
   * a specific object and/or tag.
   */
  readonly parents?: TagScopes;

  /**
   * When a tag requires children to be contained
   * within, list them here.
   */
  readonly children?: TagScopes;

  /**
   * Arguments used within the contents of the tag.
   */
  readonly arguments?: Array<IArgument.Argument | IArgument.Parameter>

  /**
   * Predefined tag parameters
   */
  readonly parameters?: { [parameter: string]: IParameter }

}

/* REFERENCE ---------------------------------- */

export interface ITags { [name: string]: ITag; }
