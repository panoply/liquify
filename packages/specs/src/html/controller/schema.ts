import type { HTMLValue, HTMLAttribute, HTMLTagAttributes, HTML5 } from '../';
import type { TagData, HTMLDataVSCode, AttributeData, ValueData, ValueSet } from '../../types/html';
import { isObject, isString } from '../../utils/typeof';
import { MarkupContent } from 'vscode-languageserver-types';
import { html5 } from './states';

/**
 * Merges custom data using vscode schema to Liquify compatiable HTML spec
 */
export function schema (custom: HTMLDataVSCode, specs: HTML5['data']['variation']): HTML5 {

  if (custom.tags) {
    Object.assign(html5.data.variation.tags, custom.tags.reduce(toTags, Object.create(null)));
  }

  if (custom.globalAttributes) {
    Object.assign(html5.data.variation.attributes, custom.globalAttributes.reduce(toAttributes, Object.create(null)));
  }

  if (custom.valueSets) {
    Object.assign(html5.data.variation.tags, custom.valueSets.reduce(toValues, Object.create(null)));
  }

  return html5;

}

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toTags (tags: TagData, { name, attributes, description, references: [ reference ] }: TagData) {

  tags[name] = Object.create(null);
  tags[name].description = description;
  tags[name].reference = reference;
  tags[name].attributes = attributes.length > 0 ? attributes.reduce(toTagAttributes, []) : [];

  return tags;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toTagAttributes (attrs: HTMLTagAttributes[], { name, description, valueSet }: AttributeData) {

  const attribute: HTMLTagAttributes = { name };

  if (isObject(description)) attribute.description = (description as MarkupContent).value;
  if (isString(description)) attribute.description = description as string;
  if (isString(valueSet)) attribute.value = valueSet;

  attrs.push(attribute);

  return attrs;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toAttributes (attrs: HTMLAttribute, { name, description, references, valueSet }: AttributeData) {

  attrs[name] = Object.create(null);

  if (valueSet) attrs[name].value = valueSet;
  if (description) attrs[name].description = (description as MarkupContent).value;
  if (references.length) attrs[name].reference = references[0];

  return attrs;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toValuesValue (value: ValueData) {

  const data = Object.create(null);

  if (value.description) {
    data.label = value.name;
    data.documentation = value.description;
  } else {
    data.label = value.name;
  }

  return data;
}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toValues (value: HTMLValue, { name, values }: ValueSet) {

  value[name] = values.map(toValuesValue);

  return value;

}
