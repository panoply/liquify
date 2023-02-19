import type { IObject, Properties } from '..';
import { TypeNames } from '../../utils/signature';
import { CompletionItem, TextEdit, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';
import { liquid } from './states';
import { entries } from '../../utils/native';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
export function ProvideProps ([ label, { description, type, snippet = label } ]): CompletionItem {

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
