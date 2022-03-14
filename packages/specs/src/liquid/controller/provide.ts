import { Parser } from '@liquify/types';
import { IProperties } from '../types';
import { variation } from './queries';
import { descriptive, TypeNames } from '../../shared/generators';
import { isString } from '../../shared/typeof';
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat,
  TextEdit
} from 'vscode-languageserver-types';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
export function ProvideProps ([
  label,
  {
    description,
    type,
    snippet = label
  }
]) {

  return {
    label,
    kind: CompletionItemKind.Property,
    insertText: snippet,
    detail: TypeNames[type],
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: descriptive(description),
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

export async function LiquidPropertyComplete (node: Parser.INode, offset: number) {

  const scope = node.parent.scope?.[node.tag];

  // Lets first acquire the object from the node
  // We decrement the offset value by 1 for the dot or bracket seperator
  let props: string[] | number = node.objects[offset - 1];

  // Store the boolean checksum
  const isArray = Array.isArray(props);

  // Lets handle scoped references. When a token has a scope value it infers
  // a re-assignment (ie: {% assign x = something %} or {% for x in arr %})
  // where the x is the re-assignment. We need to replace the parsed entries
  // with the scope value which will be the object to walk
  if (isString(scope) && isArray) (props as string[]).splice(0, 1, scope);

  // If we are pointing to an array, the node objects property would
  // equate to "{ 10: [ 'object' ] }" where the value 10 is the offset
  // We prevent passing to the walk() iterator if we an object name.
  if (isArray && (props as string[]).length === 1) {
    const properties = variation.objects[props[0]]?.properties;
    return properties ? Object.entries(properties).map(ProvideProps) : null;
  }

  // If props is not pointing to a number, we cancel
  if (typeof props !== 'number') return null;

  // Lets now move to the node objects property which contains the
  // current object depths, eg: "{ 10: [ 'object', 'prop' ], 20: 10 }"
  // where our offset is "20" which points to property value "10"
  props = objects[props] as string[];

  // This is our iterator function, it allows us to
  // walk the objects contained on the node
  return (function walk (props: string[], value: IProperties) {

    if (!value) return null;

    const object = value?.[props[0]]?.properties;

    // We check if we have walked to the last property
    // to which we can then provide properties, if we haven't
    // we continuall walk the values
    return props.length > 1
      ? object && walk(props.slice(1), object)
      : object ? Object.entries(object).map(ProvideProps) : null;

  }(props.slice(1), variation.objects[props[0]]?.properties));

}
