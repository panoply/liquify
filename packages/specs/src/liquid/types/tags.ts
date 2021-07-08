import { IDescription, IReferences, IArgument, IParameters, TagScopes } from './common';
import { Types } from './types';
export { Types } from './types';

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

export interface ITag {

  /**
   * The type categorization of the tag. Type categorization is
   * required on tags.
   *
   * @default 'unknown'
   */
  readonly type: Types.Tag,

  /**
   * Is this tag singular, ie: does not require an `{% endtag %}`
   *
   * @default false
   */
  readonly singular?: boolean;

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
  readonly description?: IDescription | string;

  /**
   * A URL reference to the documentation pretaining to this tag
   *
   * @default undefined
   */
  readonly reference?: IReferences | undefined;

  /**
   * Does this tag accept filters
   *
   * @default false
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
   * Does this tag accept whitespace dashes?
   */
  readonly trims?: boolean;

  /**
   * Is this tag deprecated?
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
  readonly arguments?: IArgument[]

  /**
   * For values that contain special characters, an
   * option expression pattern match can be provided.
   */
  readonly pattern?: RegExp

  /**
   * Predefined tag parameters
   */
  readonly parameters?: { [parameter: string]: IParameters }

}

/* REFERENCE ---------------------------------- */

export interface Tags { [name: string]: ITag; }
