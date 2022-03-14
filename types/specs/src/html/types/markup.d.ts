import { IHTMLCompletions } from './completions';
export interface IReference {
    /**
     * Reference name of the documentation
     */
    name: string;
    /**
     * the reference url linking to the documentation
     */
    url: string;
}
export interface IHTMLTagAttributes {
    /**
     * The name of attribute the tag accepts
     */
    name: string;
    /**
     * Description of the attribute value
     */
    description?: string;
    /**
     * A reference to the value set the attribute
     * accepts as a value.
     */
    value?: string;
}
export interface IHTMLTag {
    /**
     * The description of the HTML tag
     */
    description?: string;
    /**
     * A list of valid attributes the tag accepts. If
     * the attributes value is an empty array, it infers the
     * tag accepts attributes contained in the Attributes export.
     */
    attributes: [] | IHTMLTagAttributes[];
    /**
     * Whether the tag is a void or pair type
     */
    void: boolean;
    /**
     * URL and name reference to online documentation explaining the tag
     *
     * @default undefined
     */
    reference?: IReference;
}
export interface Tags {
    [tag: string]: IHTMLTag;
}
export interface IHTMLAttribute {
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
    reference?: IReference;
}
export interface Attributes {
    [attribute: string]: IHTMLAttribute;
}
export interface IHTMLValue {
    /**
     * The predefined value name for the value
     */
    label: string;
    /**
     * An optional description for this value
     */
    documentation?: {
        kind: 'markdown' | 'plaintext';
        value: string;
    };
}
export interface Values {
    [value: string]: IHTMLValue[];
}
export interface IHTMLSpecs {
    tags?: Tags;
    attributes?: Attributes;
    values?: Values;
    completions?: IHTMLCompletions;
}
