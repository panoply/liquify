import { IHTMLTag } from '../types/markup';
/**
 * Tag Specification
 */
export declare let tag: IHTMLTag;
/**
 * Set Tag
 *
 * Finds a HTML tag and updates the scope reference to it.
 * If no tag is found in the spec, it's likely a custom
 * HTML tag, this is allowed but that is handled at the
 * scanner/parser level.
 *
 * When a tag is matched, we immeadiatly check if the tag
 * accepts a list of pre-defined attributes, if they exists
 * we create a key list of the accepted values which we will
 * use to match attributes.
 */
export declare function setHTMLTag(name: string): boolean;
/**
 * Checks to see if the provided HTML tag is an
 * embedded type tag, eg: <style> or <script>
 */
export declare function isEmbedded(name: string): 'css' | 'javascript' | false;
/**
 * Checks the the attribute language of an embedded
 * tag,
 */
export declare function isLanguage(attribute: string): "javascript" | "json";
/**
 * Checks to see if the provided HTML tag is a void
 * type tag, meaning it does not required an ender.
 */
export declare function isVoid(name: string): boolean;
/**
 * Checks to see if the provided tag accepts a
 * supplied attribute. If the tag contains attributes
 * on its spec then the tag accepts a set of attributes
 * which are unique to that tag, like (for example) the
 * `<input>` tag which accepts attributes like `type=""`
 *
 * A local scope variable `attrs` generated in the setter,
 * holds string list of values which contain accepted pre-defined
 * attributes that we will check and from here determine if
 * that attribute has a pre-determined set of values.
 *
 * If `attrs` is undefined then the tag accepts global attributes,
 * so we will check the globals in the spec. When `attrs` is
 * undefined or the value passed does not match any values in
 * the list, we will proceed to the global attribute check.
 *
 * We allow `data-` attributes to pass
 */
export declare function isAttribute(name: string): boolean;
/**
 * Checks to see if the attribute already if it already
 * exists on the tag. If a tag contains Liquid syntax, we
 * will skip this check at scanner level after some validations.
 */
export declare function isAttributeUniq(name: string): boolean;
/**
 * Validates an provided attribute value when a pre-defined
 * value set exists for the provided attribute.
 *
 * @todo
 * Because the specs value sets exists as an array,
 * the values are walked this might be hurt perfomance
 * and may be worth re-thinking in the future.
 */
export declare function isAttributeValue(value: string): boolean;
/**
 * Checks to see if a value is required on the attribute.
 * When a tag attribute contains a pre-defined attribute
 * set, it is inferred that a value is to be provided.
 */
export declare function isValueRequired(): boolean;
