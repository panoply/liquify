/* ENGINES ------------------------------------ */

export type Engine = "standard" | "shopify" | "jekyll" | "eleventy";

/* OBJECT TYPEOF ------------------------------ */

export type ObjectTypes =
  | "object"
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "variable";

/* OBJECT PROPERTIES -------------------------- */

interface ObjectProperties {
  /**
   * Name of the property value available to the object
   */
  readonly name: string;
  /**
   * Description of thes property value used by this object
   */
  readonly description?: string;
  /**
   * The Typeof object value
   */
  readonly type: ObjectTypes;
  /**
   * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
   */
  readonly properties?: ObjectProperties[];
}

/* OBJECT SPECS ------------------------------- */

export type IObject = {
  /**
   * Name of the Object
   */
  readonly name: string;

  /**
   * The automatically applied tag type, which is "object"
   */
  readonly type: ObjectTypes;

  /**
   * Description of this object
   *
   */
  readonly description?: string;

  /**
   * A URL reference to the documentation pertaining to this tag
   *
   * @default undefined
   */
  readonly link?: string;

  /**
   * Object tags will always be singular tags, enforces `true`
   *
   * @default true
   */
  readonly singular: true;

  /**
   * Does this tag accept filters
   *
   * @default true
   */
  readonly filters?: boolean;

  /**
   * Does this tag accept whitespace trim dashes?
   *
   * @default true
   */
  readonly trims?: boolean;

  /**
   * The object is a global accessible object
   *
   * @default false
   */
  readonly global?: boolean;

  /**
   * Whether or not this object is a content or constanant value
   */
  readonly const?: boolean;

  /**
   * Is this object tag deprecated?
   */
  readonly deprecated?: boolean;

  /**
   * Object is only accessible within tag based scope.
   */
  readonly scope?: string[];

  /**
   * List of property values this tag object supports, recursively
   * supply properties for deep nested objects.
   */
  readonly properties?: ObjectProperties[];
};

export interface Objects {
  [name: string]: IObject;
}

/* -------------------------------------------- */
/*                    FILTERS                   */
/* -------------------------------------------- */

/* FILTER ACCEPT TYPES ------------------------ */

export type FilterAcceptsTypes =
  | "string"
  | "number"
  | "boolean"
  | "reference"
  | "path";

/* FILTER ARGUMENT TYPES ---------------------- */

export type FilterArgumentTypes = "argument" | "parameter" | "spread";

interface FilterArgumentOptions {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string | string[];
  /**
   * Description of this paramter
   */
  readonly description?: string;
}

interface FilterArguments {
  /**
   * Name of the parameter this tag accepts
   */
  readonly type: FilterArgumentTypes;

  /**
   * Argument is required for the filter
   *
   * @default false
   */
  readonly required?: boolean;

  /**
   * Whether or not options should be validated
   *
   * @default false
   */
  readonly validate?: boolean;

  /**
   * Argument is required for the filter
   *
   * @default false
   */
  readonly accepts?: FilterAcceptsTypes;

  /**
   * Name of the argument this tag accepts
   */
  readonly name?: string;

  /**
   * Description of this parameter
   *
   * @default undefined
   */
  readonly description?: string;

  /**
   * Argument options list
   *
   * @default undefined
   */
  readonly options?: FilterArgumentOptions[];
}

export type IFilter = {
  /**
   * Description of the filter
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * URL reference to online documentation explaining this filter
   *
   * @default undefined
   */
  readonly link?: string;

  /**
   * Is the filter tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;

  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;

  /**
   * When the filter is available within specific object and/or tag
   *
   * @default undefined
   */
  readonly within?: string[];
  /**
   * Filter argument parameters can differ greatly depending on how they are
   * implemented. The spec understands the below filter structures:
   *
   * @example
   *
   * {{ tag | filter: 'hello', param: 'world' }} // comma seperated params
   * {{ tag | filter: 'arg1', 'arg2', }} // comma seperated string
   * {{ tag | filter: argument: 'foo' }} // injected argument params
   *
   * @default undefined
   */
  readonly arguments?: FilterArguments[];

  /**
   * Information field which holds some additional information
   * about the filter spec. This is auto-generated within cryptospec.
   *
   * @default false
   */
  readonly $i?: {
    /**
     * The argument length size (minus 1), eg: `filter.arguments.length - 1`
     * It's a helper function when scanning arguments.
     */
    argsize?: number;
  };
};

export interface Filters {
  [name: string]: IFilter;
}

/* TAG TYPES ---------------------------------- */

export type TagTypes =
  | "associate"
  | "control"
  | "comment"
  | "embedded"
  | "import"
  | "iteration"
  | "object"
  | "output"
  | "variable"
  | "raw";

/* TAG PARAMETER TYPES ------------------------ */

export type TagParameterTypes =
  | "keyword"
  | "string"
  | "number"
  | "boolean"
  | "reference";

/* TAG ARGUMENT ACCEPTS ----------------------- */

export type TagArgumentAccepts = "keyword" | "string" | "reference";

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

/* TAG PARAMETERS ----------------------------- */

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

export type ITag = {
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
  readonly kind?: "liquid" | "html";

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
  readonly language?: string;

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
   * @default undefined
   */
  readonly arguments?: TagArguments[];
  /**
   * List of arguments available to this tag
   *
   * @default undefined
   */
  readonly parameters?: TagParameters[];
};

export interface Tags {
  [name: string]: ITag;
}

/* NODE SPECIFICS ----------------------------- */

export interface Nodes {
  /**
   * Objects contained in the specification
   */
  readonly objects?: Objects;
  /**
   * Filters contained in the specification
   */
  readonly filters: Filters;
  /**
   * Tags contained in the specification
   */
  readonly tags: Tags;
}

/* COMPLETE VARIATION ------------------------- */

export interface Variation {
  readonly engine: string;
  readonly updated: string;
  readonly filters: Filters;
  readonly objects?: Objects;
  readonly tags: Tags;
}

/* -------------------------------------------- */
/*                 SPECIFICATION                */
/* -------------------------------------------- */

export default interface Initialize {
  getSpecs(password: string): Promise<Variation[]>;
  getSpecsSync(password: string): Variation[];
}

export as namespace Specs;
