import { ICompletions } from 'liquid/types/data';
// import { IProperties } from 'liquid/types/objects';
import { descriptive } from 'utils/generators';
import { Tokens } from 'shared/types';
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
  objects: Array<{ [offset: number]: string | number }> | string,
  offset?: number
) {

  const { properties } = variation.objects[objects[offset - 1]];
  const props = Object.entries(properties).map(CompleteProps);

  return props;

  return;
  if (Array.isArray(objects) && objects.length === 1) {
    const { properties } = variation.objects?.[objects[offset][0]];
    if (properties) return Object.entries(properties).map(CompleteProps);
  }

  return;

  // if (typeof property !== 'number') return [];

  return (function walk (prop, property) {

    const object = property?.[prop[0]]?.properties;

    return prop.length > 1 ? object && walk(prop.slice(1), object) : object
      ? Object.entries(object).map(CompleteProps)
      : false;

  }(objects.slice(1), variation.objects[objects[0]].properties));

}

/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
export function CompleteProps ([ label, { description, snippet = label } ]) {

  return {
    label,
    kind: CompletionItemKind.Property,
    insertText: snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: descriptive(description),
    data: {
      token: Tokens.LiquidProperty,
      snippet
    }
  };

}
