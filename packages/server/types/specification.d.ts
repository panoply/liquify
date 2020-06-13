import { TokenTypes } from "./parser";

/* -------------------------------------------- */
/*                    ENGINE                    */
/* -------------------------------------------- */

export declare type Engine = "standard" | "shopify" | "jekyll" | "11ty";

/* -------------------------------------------- */
/*                    OBJECTS                   */
/* -------------------------------------------- */

interface Properties {
  /**
   * Name of the property value available to the object
   */
  readonly name: string;
  /**
   * Description of thes property value used by this object
   */
  readonly description: string;
  /**
   * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
   */
  readonly properties?: Properties[];
}

export interface Object {
  /**
   * The automatically applied tag type, which is "object"
   */
  readonly type: "object";
  /**
   * Description of this object
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * A URL reference to the documentation pretaining to this tag
   *
   * @default undefined
   */
  readonly reference?: string;
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
   * Does this tag accept whitespace dashes?
   *
   * @default true
   */
  readonly whitespace?: boolean;
  /**
   * Is this object tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * This object tag must be contained within a specific block tag
   *
   * @default undefined
   */
  readonly within?: string[];
  /**
   * List of property values this tag object supports, recursively
   * supply properties for deep nested objects.
   *
   * @default undefined
   */
  readonly properties?: Properties[];
}

export declare type Objects = { [name: string]: Object };

/* -------------------------------------------- */
/*                    FILTERS                   */
/* -------------------------------------------- */

export interface Filter {
  /**
   * The automatically applied tag type, which is "filter"
   *
   * @default undefined
   */
  readonly type: "filter";
  /**
   * Description of the filter
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * Is this object tag deprecated?
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
}

export declare type Filters = { [name: string]: Filter };

/* -------------------------------------------- */
/*                     TAGS                     */
/* -------------------------------------------- */

interface Parameters {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string;
  /**
   * Description of this paramter
   */
  readonly description?: string;
  /**
   * A list of parameters that are required
   * when using this paramater.
   *
   * @default undefined
   */
  readonly requires?: string[];
  /**
   * Description of this argument
   *
   * @default "space"
   */
  readonly preceding?: "space" | "comma" | "colon";
  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;
}

interface Types {
  /**
   * The argument value this tag supports
   */
  readonly name: string;
  /**
   * Description of this argument
   */
  readonly description: string;
}

export interface Tag {
  /**
   * The `attr` property value pertains to `HTML` kind tags, where
   * a mime/type attribute is required when capturing tag. Generally
   * this property is used only on type `associate` tags, which are in most
   * cases either defined via the `.liquidrc` file.
   *
   * @default undefined
   */
  readonly attr?: string;
  /**
   * The language kind of this tag, accepts either html or liquid.
   * This property is automatically applied to the specification on intialisation.
   *
   * @default 'liquid'
   */
  readonly kind?: "liquid" | "html";
  /**
   * The type categorization of the tag. Type categorization is
   * required on tags.
   *
   * @default undefined
   */
  readonly type: TokenTypes;
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
  readonly reference?: string;
  /**
   * Is this tag singular, ie: does not require an `{% endtag %}`
   *
   * @default false
   */
  readonly singular: boolean;
  /**
   * Does this tag accept filters
   *
   * @default true
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
  readonly whitespace?: boolean;
  /**
   * Is this tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * This tag must be contained within a specific block tag
   *
   * @default undefined
   */
  readonly within?: string[];
  /**
   * List of parameters available to this tag
   *
   * @default undefined
   */
  readonly parameters?: Parameters[];
  /**
   * List of arguments available to this tag
   *
   * @default undefined
   */
  readonly types?: Types[];
}

export declare type Tags = { [name: string]: Tag };

/* -------------------------------------------- */
/*            DEFAULT SPECIFICATIONS            */
/* -------------------------------------------- */

export declare type NodeSpecification = Object | Tag | Filter;

export interface StandardSpecification {
  readonly engine: string;
  readonly updated: string;
  readonly filters: Filters;
  readonly tags: Tags;
}

export interface VariationSpecification {
  readonly engine: string;
  readonly updated: string;
  readonly filters: Filters;
  readonly objects?: Objects;
  readonly tags: Tags;
}

export type Specifications = {
  readonly standard: StandardSpecification;
  readonly jekyll: VariationSpecification;
  readonly shopify: VariationSpecification;
};

/* -------------------------------------------- */
/*                 SPECIFICATION                */
/* -------------------------------------------- */

export type Specification = VariationSpecification;
