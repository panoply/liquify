/* TAG TYPES ---------------------------------- */

export type TagTypes =
  | 'associate'
  | 'control'
  | 'comment'
  | 'embedded'
  | 'import'
  | 'iteration'
  | 'object'
  | 'output'
  | 'variable'
  | 'raw'
  | 'unknown';

/* TAG PARAMETER TYPES ------------------------ */

export type TagParameterTypes =
  | 'keyword'
  | 'string'
  | 'number'
  | 'boolean'
  | 'reference';

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

/* TAG ARGUMENT ACCEPTS ----------------------- */

export type TagArgumentAccepts = 'keyword' | 'string' | 'reference';

/* TAGS SPECIFICATION ------------------------- */

interface TagArguments {

  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string;

  /**
   * The type of argument the tag accepts
   */
  readonly accepts: TagArgumentAccepts;

  /**
   * Description of this paramter
   */
  readonly description?: string;
}

interface TagParameters {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string;

  /**
   * Description of this paramter
   */
  readonly description?: string;

  /**
   * What parameters the tag accepts
   *
   */
  readonly accepts?: TagParameterTypes;

  /**
   * If the parameter is required
   *
   * @default undefined
   */
  readonly required?: boolean;
}

/* TAG SPECIFICATIONS ------------------------- */

export interface ITag {

  /**
   * The argument value this tag supports
   */
  readonly name: string;

  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;

  /**
   * The language kind of this tag, accepts either html or liquid.
   * This property is automatically applied to the specification on intialisation.
   *
   * @default 'liquid'
   *
   * **TODO** FIX THIS
   */
  readonly kind?: 'liquid' | 'html';

  /**
   * The type categorization of the tag. Type categorization is
   * required on tags.
   *
   */
  readonly type: TagTypes;

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
  readonly link?: string;

  /**
   * Is this tag singular, ie: does not require an `{% endtag %}`
   *
   * @default false
   */
  readonly singular: boolean;

  /**
   * Does this tag accept filters
   *
   * @default false
   */
  readonly filters: boolean;

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
   *
   * @default true
   */
  readonly trims?: boolean;

  /**
   * Is this tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;

  /**
   * The tag scope
   *
   * @default undefined
   */
  readonly scope?: string[];

  /**
   * List of parameters available to this tag
   *
   * @default false
   */
  readonly arguments?: TagArguments[] | false;

  /**
   * List of arguments available to this tag
   *
   * @default undefined
   */
  readonly parameters?: TagParameters[];
}

/* REFERENCE ---------------------------------- */

export interface Tags {
  [name: string]: ITag;
}
