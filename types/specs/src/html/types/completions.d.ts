import { IHTMLTagAttributes } from './markup';
import { MarkupContent } from 'vscode-languageserver-types';
/**
 * HTML completion data. This is generated for HTML
 * tags which do not provide a predefined set of attributes.
 *
 * For example, the `<input>` tag accepts a attributes which
 * are unique to that tag and thus accepts additional attributes,
 * such a tag would not use this interface, whereas a `<div>`
 * tag would use this interface.
 */
export interface IHTMLCompletionData {
    /**
     * Returns the value set reference or when no value boolean `false`
     */
    value: string | boolean;
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
export declare type IHTMLCompletionAttrs = Array<{
    /**
     * The completion attribute name
     */
    label: string;
    /**
     * The completion description
     */
    documentation: MarkupContent;
    /**
     * HTML completion data
     */
    data: IHTMLCompletionData;
}>;
/**
 * HTML completion tag data. This interface represents properties
 * that will be passed to the `data{}` object of a completion item.
 *
 * The data is used when a completion item resolves.
 */
export interface IHTMLCompletionTagData {
    /**
     * Whether the tag is a void type tag or not
     */
    void: boolean;
    /**
     * Generated completion list of tag attributes.
     * This is applied to the `data` object of a completion
     */
    attributes?: [] | IHTMLCompletionAttrs;
}
/**
 * HTML completion tags, used when completions are
 * generated from the specs at runtime.
 */
export declare type IHTMLCompletionTags = Array<{
    /**
      * The completion attribute name
      */
    label: string;
    /**
     * The completion description
     */
    documentation: MarkupContent;
    /**
     * The completion data reference
     */
    data: IHTMLCompletionTagData;
}>;
/**
 * HTML Completion provider combinator, asserting
 * that a completion item `data{}` will accept additional
 * attributes (as per the defined spec) or no attributes.
 */
export declare type IHTMLProvideAttrs = IHTMLCompletionAttrs | IHTMLTagAttributes[];
/**
 * The generated completions interface
 */
export interface IHTMLCompletions {
    /**
     * List of available HTML tag completion
     */
    tags: IHTMLCompletionTags;
    /**
     * List of global HTML tag attributes
     */
    attributes: IHTMLCompletionAttrs;
}
