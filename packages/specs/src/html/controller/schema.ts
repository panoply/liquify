import { isObject, isString } from 'shared/typeof';
import { MarkupContent } from 'vscode-languageserver-types';
import {
  IHTMLValue,
  IHTMLAttribute,
  IHTMLTagAttributes,
  IHTMLSpecs
} from 'html/types/markup';

import {
  HTMLDataVSCode,
  IValueData,
  IValueSet,
  ITagData,
  IAttributeData
} from 'html/types/custom';

/**
 * Merges custom data using vscode schema to Liquify compatiable HTML spec
 */
export function schema (custom: HTMLDataVSCode, specs: IHTMLSpecs): IHTMLSpecs {

  if (custom.tags) {
    Object.assign(
      specs.tags,
      custom.tags.reduce(toTags, {} as ITagData)
    );
  }

  if (custom.globalAttributes) {
    Object.assign(
      specs.attributes,
      custom.globalAttributes.reduce(toAttributes, {} as IHTMLAttribute)
    );
  }

  if (custom.valueSets) {
    Object.assign(
      specs.tags,
      custom.valueSets.reduce(toValues, {} as IHTMLValue)
    );
  }

  return specs;

}

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toTags (
  tags: ITagData,
  {
    name,
    attributes,
    description,
    references: [ reference ]
  }: ITagData
) {

  tags[name] = {};
  tags[name].description = description;
  tags[name].reference = reference;
  tags[name].attributes = attributes.length > 0
    ? attributes.reduce(toTagAttributes, [])
    : [];

  return tags;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toTagAttributes (
  attrs: IHTMLTagAttributes[],
  {
    name,
    description,
    valueSet
  }: IAttributeData
) {

  const attribute: IHTMLTagAttributes = { name };

  if (isObject(description)) attribute.description = (description as MarkupContent).value;
  if (isString(description)) attribute.description = description as string;
  if (isString(valueSet)) attribute.value = valueSet;

  attrs.push(attribute);

  return attrs;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toAttributes (
  attrs: IHTMLAttribute,
  {
    name,
    description,
    references,
    valueSet
  }: IAttributeData
) {

  attrs[name] = {};

  if (valueSet) attrs[name].value = valueSet;
  if (description) attrs[name].description = (description as MarkupContent).value;
  if (references.length) attrs[name].reference = references[0];

  return attrs;

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toValuesValue (value: IValueData) {

  return value.description ? {
    label: value.name,
    documentation: value.description
  } : {
    label: value.name
  };

}

/**
 * Converts vscode custom data to Liquify compatiable specification
 */
function toValues (
  value: IHTMLValue,
  {
    name,
    values
  }: IValueSet
) {

  value[name] = values.map(toValuesValue);

  return value;

}
