import type { IObject, Properties, Types } from '..';
import { TypeNames } from '../../utils/signature';
import { CompletionItem, TextEdit, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';
import { liquid } from './states';
import { entries, values } from '../../utils/native';
import { ObjectGroupItems } from 'types/completions';
import { Type, TypeBasic } from '../../utils/enums';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
export function ObjectDetail (type: Type | Types.Basic) {

  switch (type) {
    case Type.string: return 'string';
    case Type.array: return 'array';
    case Type.boolean: return 'boolean';
    case Type.number: return 'number';
    case Type.nil: return 'nil';
    case Type.object: return 'object';
    case Type.constant: return 'constant';
    case Type.unknown: return 'unknown';
    case Type.iteration: return 'iteration';
    case Type.comment: return 'iteration';
    case Type.import: return 'import';
    case Type.variable: return 'variable';
    case Type.embedded: return 'embedded';
    case Type.control: return 'control';
    case Type.any: return 'any';
  }

}

/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
export function ObjectKind (type: Type | Types.Basic) {

  switch (type) {
    case Type.string: return 'string';
    case Type.array: return 'array';
    case Type.boolean: return 'boolean';
    case Type.number: return 'number';
    case Type.nil: return 'nil';
    case Type.object: return 'object';
    case Type.constant: return 'constant';
    case Type.unknown: return 'unknown';
    case Type.iteration: return 'iteration';
    case Type.comment: return 'iteration';
    case Type.import: return 'import';
    case Type.variable: return 'variable';
    case Type.embedded: return 'embedded';
    case Type.control: return 'control';
    case Type.any: return 'any';
  }

}
/**
 * Get Completion Detail
 *
 * Returns the `CompletionItemKind` enum reference that
 * should be applied to the generated completion item.
 */
export function ObjectType (type: string) {

  switch (type) {
    case 'string': return Type.string;
    case 'array': return Type.array;
    case 'boolean': return Type.boolean;
    case 'number': return Type.number;
    case 'nil': return Type.nil;
    case 'object': return Type.object;
    case 'constant': return Type.constant;
    case 'unknown': return Type.unknown;
    case 'iteration': return Type.iteration;
    case 'comment': return Type.comment;
    case 'import': return Type.import;
    case 'variable': return Type.variable;
    case 'embedded': return Type.embedded;
    case 'control': return Type.control;
    case 'any': return Type.any;
  }

}

/**
 * Object Type Groups
 *
 * Groups object completions according to their type. Returns
 * a partial completion item for implementation into clients.
 */
export function ObjectGroups (
  template: string,
  callback:(object: IObject, item: any) => any
): ObjectGroupItems {

  const items: ObjectGroupItems = {
    all: [],
    any: [],
    template: [],
    array: [],
    string: [],
    number: [],
    constant: [],
    boolean: [],
    object: []
  };

  for (const [
    label,
    object
  ] of entries(liquid.data.variation.objects) as [ label: string, object: IObject ][]) {

    const item: any = {
      label,
      detail: ObjectDetail(object.type),
      preselect: true
    };

    const entry = callback(object, item);

    if (object?.properties) {

      const props = values(object.properties);

      if (props.some(x => x.type === TypeBasic.array)) {
        items.array.push(entry);
      } else if (props.some(x => x.type === TypeBasic.string)) {
        items.string.push(entry);
      } else if (props.some(x => x.type === TypeBasic.boolean)) {
        items.boolean.push(entry);
      } else if (props.some(x => x.type === TypeBasic.number)) {
        items.number.push(entry);
      } else if (props.some(x => x.type === TypeBasic.object)) {
        items.object.push(entry);
      } else if (props.some(x => x.type === TypeBasic.any)) {
        items.any.push(entry);
      }

    } else if (object.const) {

      entry.sortText = 'z';
      items.constant.push(entry);

    } else {
      entry.sortText = 'z';
    }

    items.all.push(entry);

    if (object?.template?.length > 0 && object.template.indexOf(template) > -1) {

      items.template.push(entry);

    }

  }

  return items;

}

/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
export function ProvideProps ([ label, { description = '', type, snippet = label } ]): CompletionItem {

  return {
    label,
    insertText: snippet,
    detail: TypeNames[type],
    kind: CompletionItemKind.Property,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value: description
    },
    data: { snippet }
  };

}

export function LiquidFilterResolve (item: CompletionItem) {

  item.kind = CompletionItemKind.Value;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = `${item.data.snippet}`;

  return item;

}
export function LiquidOutputResolve (item: CompletionItem, edits?: TextEdit[]) {

  item.kind = CompletionItemKind.Value;
  item.additionalTextEdits = edits;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = ` ${item.label} }}`;

  return item;

}

export function LiquidTagResolve (item: CompletionItem, edits?: TextEdit[]) {

  item.kind = CompletionItemKind.Property;
  item.additionalTextEdits = edits;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = ` ${item.label} ${item.data.snippet} %} ${item.data.singular
    ? '$0'
    : `$0 {% end${item.label} %}`}`;

  return item;

}

/* -------------------------------------------- */
/* OBJECT PROPERTY COMPLETIONS                  */
/* -------------------------------------------- */

function walkProps (props: string[], value: Properties) {

  if (!value) return null;

  if (value?.[props[0]]?.properties) {

    const { properties } = value[props[0]];

    // We check if we have walked to the last property
    // to which we can then provide properties, if we haven't
    // we continuall walk the values
    return props.length > 1
      ? walkProps(props.slice(1), properties)
      : entries(properties).map(ProvideProps);
  } else {

    if (value[props[0]]?.scope) {
      const { properties } = liquid.data.variation.objects[value[props[0]]?.scope];
      return entries(properties).map(ProvideProps);
    }
  }

  return entries(value).map(ProvideProps);

}

/**
 * Liquid Property Completions
 *
 * Walks over defined objects and provides the property completions.
 * It works in such a way that Liquid objects can be queried and passed
 * to completions at any point,
 */
export async function LiquidPropertyComplete (node: any, offset: number) {

  const { objects } = liquid.data.variation;

  // let scope = node.parent.scope?.[node.tag];
  // @ts-ignore
  let props: string[] = node.objects[offset - 1];

  if (typeof props === 'number') props = node.objects[props] as string[];

  const first = objects?.[props[0]];

  if (first) {

    return walkProps(props.slice(1), first?.properties);

  } else if (liquid.data.variables.has(props[0])) {

    const variable = liquid.data.variables.get(props[0])[node.scope[props[0]]];

    return walkProps(props.slice(1), (variable.value as IObject)?.properties);
  }

}
