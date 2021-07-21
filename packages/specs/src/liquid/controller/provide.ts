import { IEngine } from 'liquid/types/common';
// import { IProperties } from 'liquid/types/objects';
import { Tokens } from 'shared/types';
import { documentation, descriptive } from 'utils/generators';
import { engine, variation } from './queries';
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat,
  TextEdit

} from 'vscode-languageserver-types';

/* -------------------------------------------- */
/* EXPORTED SCOPES                              */
/* -------------------------------------------- */

/**
 * Completion Items
 */
export let completions = LiquidCompletions();

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

export function LiquidTagComplete () {

  return completions.tags;

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

export async function LiquidObjectComplete (
  property: number,
  objects: Array<{ [offset: number]: string | number }>,
  offset: number
) {

  if (Array.isArray(objects) && objects.length === 1) {
    const { properties } = variation.objects?.[objects[offset][0]];
    if (properties) return Object.entries(properties).map(CompleteProps);
  }

  if (typeof property !== 'number') return [];

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
    data: { snippet }
  };

}

/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export function LiquidCompletions () {

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = Object.entries(variation.tags).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false,
        singular = false,
        snippet = '$1',
        parents = []
      }
    ]) => ({
      label,
      deprecated,
      kind: CompletionItemKind.Keyword,
      documentation: documentation(description, reference),
      data: {
        token: Tokens.LiquidTag,
        snippet,
        singular,
        parents
      }
    })
  );

  /* -------------------------------------------- */
  /* FILTER COMPLETIONS                           */
  /* -------------------------------------------- */

  const filters = Object.entries(variation.filters).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false
      }
    ]) => ({
      label,
      deprecated,
      documentation: documentation(description, reference),
      data: {
        token: Tokens.LiquidFilter
      }
    })
  );

  if (Object.is(engine, IEngine.standard)) return { tags, filters, objects: [] };

  /* -------------------------------------------- */
  /* OBJECT COMPLETIONS                           */
  /* -------------------------------------------- */

  const objects = Object.entries(variation.objects).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false

      }
    ]) => ({
      label,
      deprecated,
      documentation: documentation(description, reference),
      data: {
        token: Tokens.LiquidObject
      }
    })
  );

  return { tags, filters, objects };

}
