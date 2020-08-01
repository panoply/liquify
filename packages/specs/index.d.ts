export enum TokenTypes {
  "associate" = 1,
  "control",
  "comment",
  "embedded",
  "include",
  "iteration",
  "object",
  "variable",
  "raw",
}

export interface Attributes {
  name: string;
  description: string;
}

export interface Params {
  name: string | string[];
  description: string;
  type: string;
  accepts?: [
    {
      name: string;
      description: string;
      seperator: "space" | "comma" | "pipe";
      snippet: string;
      requires: string[];
    }
  ];
}

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

interface ArgumentParameterAccepts {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string;
  /**
   * Description of this paramter
   */
  readonly description?: string;
}

interface ArgumentParameters {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string;
  /**
   * Description of this paramter
   */
  readonly description?: string;
  /**
   * A list of parameters that are required when using this paramater.
   * Hierarchy is respected, and matches will begin searching from the
   * parameters define `name` value, In the below example
   * the `for` parameter would use the `requires` property
   *
   * @example
   *
   * // if the `as` parameter was missing, parse would fail
   * {% include 'post' for collection.posts as post %}
   *
   * @default undefined
   */
  readonly requires?: string[];
  /**
   * Filter Seperation character. In most cases this will be a `,` comma
   * value, however this is not always the case, as some tags will require
   * only a space, for example the Jekyll `{% include param="foo"%}` tag
   * and Standard `{% for i in arr limit: 1%}` tag uses a space seperator.
   *
   * @example
   *
   * // A filter like this would use `colon`
   * {% tag | filter: argument: 'params' %}
   *
   * @default "space"
   */
  readonly seperator?: "space" | "comma" | "colon";
  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;
  /**
   * What the parameter meter value should accept, for example
   * filter param can accept basic strings, number and at times even
   * Liquid output `{{ tag }}` tags. The spec attempts to cover most
   * use cases or tags.
   *
   * You can pass a string regex expression to the property, which can
   * be used to validate the string values.
   *
   * @example
   *
   * {{ tag | filter: 'hello' }} // Basic string
   * {% include a.liquid | output: {{ page.url }} %} // Liquid output
   * {{ tag | filter: 10 }} // Number
   *
   * @default undefined
   */
  readonly accepts?:
    | "string"
    | "number"
    | "output"
    | ArgumentParameterAccepts[];
}

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
  /**
   * Filter argument parameters can differ greatly, depending on how they are
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
  readonly parameters?: ArgumentParameters[];
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
  readonly seperator?: "space" | "comma" | "colon";
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
  /**
   * List of arguments available to this tag
   *
   * @default undefined
   */
  readonly objects?: Object;
}

export type Tags = { [name: string]: Tag };

/* -------------------------------------------- */
/*            DEFAULT SPECIFICATIONS            */
/* -------------------------------------------- */

export type NodeSpecification = Object | Tag | Filter;

export type Records = "filters" | "objects" | "filters";

export interface Variation {
  readonly engine: string;
  readonly updated: string;
  readonly filters: Filters;
  readonly objects?: Object;
  readonly tags: Tags;
}

/* -------------------------------------------- */
/*                 SPECIFICATION                */
/* -------------------------------------------- */

interface Initialize {
  getSpecs(password: string): Promise<Variation[]>;
  getSpecsSync(password: string): Variation[];
}

export default Initialize;
