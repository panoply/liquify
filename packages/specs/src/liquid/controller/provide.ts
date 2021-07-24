import { ICompletions, TypeNames } from '../types/data';
import { Properties } from '../types/objects';
import { Type } from '../types/types';
import { Entries, PickByValue } from '../types/utils';
import { descriptive } from './../../utils/generators';
import { Tokens } from '../../shared/types';
import { completions, variation } from './queries';
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat,
  TextEdit

} from 'vscode-languageserver-types';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

export function LiquidTagComplete () {

  return completions.tags;

}

export function LiquidObjectComplete () {

  return completions.objects;

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

export async function LiquidPropertyComplete (
  objects: { [offset: number]: string[] | number },
  scope: { [tagName: string]: string } | string | string | undefined,
  offset: number
) {

  // Lets first acquire the object from the node
  // We decrement the offset value by 1 for the dot or bracket seperator
  let props: string[] | number = objects[offset - 1];

  // If we are pointing to an array, the node objects property would
  // equate to "{ 10: [ 'object' ] }" where the value 10 is the offset
  // We prevent passing to the walk() iterator if we an object name.
  if (Array.isArray(props) && props.length === 1) {

    const properties = variation.objects[props[0] as string]?.properties;

    return properties
      ? Object.entries(properties).map(ProvideProps)
      : null;
  }

  // If props is not pointing to a number, we cancel
  if (typeof props !== 'number') return null;

  // Lets now move to the node objects property which contains the
  // current object depths, eg: "{ 10: [ 'object', 'prop' ], 20: 10 }"
  // where our offset is "20" which points to property value "10"
  props = objects[props] as string[];

  // This is our iterator function, it allows us to
  // walk the objects contained on the node
  return (function walk (props: string[], value: Properties) {

    const object = value?.[props[0]]?.properties;

    // We check if we have walked to the last property
    // to which we can then provide properties, if we haven't
    // we continuall walk the values
    return props.length > 1
      ? object && walk(props.slice(1), object)
      : object ? Object.entries(object).map(ProvideProps) : null;

  }(props.slice(1), variation.objects[props[0]].properties));

}

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
    data: {
      token: Tokens.LiquidProperty,
      snippet
    }
  };

}
