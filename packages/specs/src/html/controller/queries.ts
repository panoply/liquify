import { HTMLValue, HTMLTagAttributes } from '../';
import { html5 } from './states';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

/**
 * Attribute Specification
 */
let attrs: string[];

/**
 * Value Set Specification
 */
let values: HTMLValue[];

/**
 * The current active attributes
 */
const unique: Set<string> = new Set();

/* -------------------------------------------- */
/* SETTERS                                      */
/* -------------------------------------------- */

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
export function setHTMLTag (name: string): boolean {

  html5.tag = undefined;
  attrs = undefined;

  unique.clear();

  if (!html5.data.variation.tags?.[name]) return false;

  html5.tag = html5.data.variation.tags[name];

  if (html5.tag.attributes.length) {
    attrs = html5.tag.attributes.map((attr: HTMLTagAttributes) => attr.name);
  }

  return true;

}

/* -------------------------------------------- */
/* VALIDATORS                                   */
/* -------------------------------------------- */

/**
 * Checks to see if the provided HTML tag is an
 * embedded type tag, eg: <style> or <script>
 */
export function isEmbedded (name: string): 'css' | 'javascript' | false {

  return name === 'script' ? 'javascript' : name === 'style' ? 'css' : false;

}

/**
 * Checks the the attribute language of an embedded
 * tag,
 */
export function isLanguage (attribute: string) {

  switch (attribute) {
    case 'module':
    case 'text/javascript':
    case 'text/ecmascript':
    case 'text/babel':
    case 'application/javascript':
    case 'application/ecmascript': return 'javascript';
    case 'application/json':
    case 'application/ld+json': return 'json';
  }

}

/**
 * Checks to see if the provided HTML tag is a void
 * type tag, meaning it does not required an ender.
 */
export function isVoid (name: string) {

  return html5.data.variation.tags?.[name]?.void;

}

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
export function isAttribute (name: string): boolean {

  // reset values to ensure a fresh reference
  values = undefined;

  unique.add(name);

  // Allow `data-` attributes to pass
  if (name.slice(0, 5) === 'data-') return true;

  // check predefined attributes
  if (attrs) {
    const index = attrs.indexOf(name);
    if (index > -1) {
      values = html5.data.variation.values[html5.tag.attributes[index]?.value];
      return true;
    }
  }

  // Check global attributes
  if (!html5.data.variation.attributes?.[name]) return false;

  values = html5.data.variation.values[html5.data.variation.attributes[name]?.value];
  return true;

}

/**
 * Checks to see if the attribute already exists on the tag.
 * If a tag contains Liquid syntax, we will skip this check at
 * scanner level after some validations.
 */
export function isAttributeUniq (name: string): boolean {

  return !unique.has(name);

}

/**
 * Validates an provided attribute value when a pre-defined
 * value set exists for the provided attribute.
 *
 * @todo
 * Because the specs value sets exists as an array,
 * the values are walked this might be hurt perfomance
 * and may be worth re-thinking in the future.
 */
export function isAttributeValue (value: string) {

  // allow undefined values to pass
  if (!values) return true;

  return values.some(item => item.label === value);

}

/**
 * Checks to see if a value is required on the attribute.
 * When a tag attribute contains a pre-defined attribute
 * set, it is inferred that a value is to be provided.
 */
export function isValueRequired (): boolean {

  return attrs !== undefined;

}
