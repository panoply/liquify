import type { MarkupContent } from 'vscode-languageserver-types';

export interface HTMLReference {
  /**
   * Reference name of the documentation
   */
  name: string;

  /**
   * the reference url linking to the documentation
   */
  url: string;
}

/* -------------------------------------------- */
/* TAGS                                         */
/* -------------------------------------------- */

export interface HTMLTagAttributes {

  /**
   * The name of attribute the tag accepts
   */
  name: string,

  /**
   * Description of the attribute value
   */
  description?: string

  /**
   * A reference to the value set the attribute
   * accepts as a value.
   */
  value?: string

}

export interface HTMLTag {
  /**
   * The description of the HTML tag
   */
  description?: string;

  /**
   * A list of valid attributes the tag accepts. If
   * the attributes value is an empty array, it infers the
   * tag accepts attributes contained in the Attributes export.
   */
  attributes: [] | HTMLTagAttributes[];

  /**
   * Whether the tag is a void or pair type
   */
  void: boolean

  /**
   * URL and name reference to online documentation explaining the tag
   *
   * @default undefined
   */
  reference?: HTMLReference
}

export declare interface HTMLTags { [tag: string]: HTMLTag }

/* -------------------------------------------- */
/* ATTRIBUTES                                   */
/* -------------------------------------------- */

export interface HTMLAttribute {

  /**
   * The description of the attribute
   */
  description?: string;

  /**
   * Mapping to a value-set lists.
   */
  value?: string;

  /**
   * URL and name reference to online documentation explaining this attribute
   *
   * @default undefined
   */
  reference?: HTMLReference

}

export interface HTMLAttributes { [attribute: string]: HTMLAttribute }

/* -------------------------------------------- */
/* VALUES                                       */
/* -------------------------------------------- */

export interface HTMLValue {
  /**
   * The predefined value name for the value
   */
  label: string;

  /**
   * An optional description for this value
   */
  documentation?: {
    kind: 'markdown' | 'plaintext',
    value: string
  }
}

export interface HTMLValues { [value: string]: HTMLValue[] }

/* -------------------------------------------- */
/* COMPLETIONS                                  */
/* -------------------------------------------- */

/**
 * HTML completion data. This is generated for HTML
 * tags which do not provide a predefined set of attributes.
 *
 * For example, the `<input>` tag accepts a attributes which
 * are unique to that tag and thus accepts additional attributes,
 * such a tag would not use this interface, whereas a `<div>`
 * tag would use this interface.
 */
export interface HTMLCompletionData {

  /**
   * Returns the value set reference or when no value boolean `false`
   */
  value: string | boolean
}

/**
 * HTML Completions data generated attributes. This array type is
 * applied to HTML tags which accept additional attribute values,
 * like the `<input>` tag which accepts attributes like `value=""`
 *
 * In the generated specs, such tags contain an array list of the
 * additional attributes, those attributes are generated and passed
 * to the `data` object of a completion item.
 */
export type HTMLCompletionAttrs = Array<{

  /**
   * The completion attribute name
   */
  label: string,

  /**
   * The completion description
   */
  documentation: MarkupContent,

  /**
   * HTML completion data
   */
  data: HTMLCompletionData
}>

/**
 * HTML completion tag data. This interface represents properties
 * that will be passed to the `data{}` object of a completion item.
 *
 * The data is used when a completion item resolves.
 */
export declare interface HTMLCompletionTagData {

  /**
   * Whether the tag is a void type tag or not
   */
  void: boolean,

  /**
   * Generated completion list of tag attributes.
   * This is applied to the `data` object of a completion
   */
  attributes?: [] | HTMLCompletionAttrs
}

/**
 * HTML completion tags, used when completions are
 * generated from the specs at runtime.
 */
export type HTMLCompletionTags = Array<{
  /**
   * The completion attribute name
   */
  label: string,

  /**
   * The completion description
   */
  documentation: MarkupContent,

  /**
   * The completion data reference
   */
  data: HTMLCompletionTagData
}>

/**
 * HTML Completion provider combinator, asserting
 * that a completion item `data{}` will accept additional
 * attributes (as per the defined spec) or no attributes.
 */
export type HTMLProvideAttrs = HTMLCompletionAttrs | HTMLTagAttributes[]

/**
 * The generated completions interface
 */
export declare interface HTMLCompletions {

  /**
   * List of available HTML tag completion
   */
  tags: HTMLCompletionTags,

  /**
   * List of global HTML tag attributes
   */
  attributes: HTMLCompletionAttrs
}

/**
 * Lifted from vscode-html-languageservice
 */
export declare interface ValueData {
  name: string;
  description?: string | MarkupContent;
  references?: HTMLReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export declare interface AttributeData {
  name: string;
  description?: string | MarkupContent;
  valueSet?: string;
  values?: ValueData[];
  references?: HTMLReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export declare interface TagData {
  name: string;
  description?: string | MarkupContent;
  attributes: AttributeData[];
  references?: HTMLReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export declare interface ValueSet {
  name: string;
  values: ValueData[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export declare interface HTMLDataVSCode {
  version: 1 | 1.1;
  tags?: TagData[];
  globalAttributes?: AttributeData[];
  valueSets?: ValueSet[];
}
