import * as specification from '../data';
import { HTMLTagAttributes, HTMLProvideAttrs, HTMLDataVSCode } from '../';
import { schema } from './schema';
import { Tokens } from '../../utils/enums';
import { documentation, descriptive } from '../../utils/signature';
import { CompletionItemKind, CompletionItem, InsertTextFormat } from 'vscode-languageserver-types';
import { html5 } from './states';

export function HTMLCompletions () {

  const data = Object.create(null);

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  data.tags = Object.entries(specification.tags).map(([ label, spec ]) => ({
    label,
    documentation: documentation(spec.description, spec.reference),
    data: {
      void: spec.void,
      attributes: HTMLTagAttrs(spec?.attributes)
    }
  }));

  /* -------------------------------------------- */
  /* GLOBAL ATTRIBUTE COMPLETIONS                 */
  /* -------------------------------------------- */

  data.attributes = Object.entries(specification.attributes).map(([ label, {
    description,
    reference, value = false
  } ]) => ({
    label,
    documentation: documentation(description, reference),
    data: { value }
  }));

  return data;

}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Accepts custom data as per the vscode spec
 * for HTML.
 */
export function HTMLCustomData (data: HTMLDataVSCode) {

  // Re-write to align with Liquify spec schema
  html5.data.variation = Object.assign(html5.data.variation, schema(data, specification));
  html5.data.completions = HTMLCompletions();

}

export function HTMLTagComplete () {

  html5.attribute = undefined;
  html5.value = undefined;

  return html5.data.completions.tags;

}

export function HTMLAttrsComplete (tag: string): HTMLProvideAttrs {

  if (html5.attribute || html5.attribute?.length) return html5.attribute;

  return HTMLTagAttrs(html5.data.variation.tags[tag].attributes).concat(html5.data.completions.attributes);

}

export function HTMLValueComplete (token: string = html5.value) {

  if (!html5.value || !html5.data.variation.values?.[token]) return false;

  return html5.data.variation.values[token].map(value => ({
    ...value,
    data: {
      token: Tokens.HTMLValue
    }
  }));

}

export function HTMLTagResolve (item: CompletionItem) {

  html5.attribute = item.data.attributes;

  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = item.data.void
    ? `${item.label} $1 $0`
    : `${item.label} $1> $0 </${item.label}`;

  return item;

}

function getValueChoices (value: string) {

  if (!value) return '$1';

  const values = html5.data.variation.values[value];

  let snippet: string = '$' + '{1|';
  let index: number = values.length;

  while (index--) snippet += values[index].label + (index === 0 ? '' : ',');

  return `${snippet}|}`;

}

export function HTMLAttrsResolve (item: CompletionItem) {

  html5.value = item.label;

  if (/^data-/.test(item.label)) return item;

  const choice = getValueChoices(item.data.value);

  // console.log($.value, choice);

  item.insertText = `${item.label}="${choice}" $0`;
  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;

  return item;
}

export function HTMLValueResolve (item: CompletionItem) {

  return Object.assign(item, { kind: CompletionItemKind.Value });

}

export function HTMLTagAttrs (attrs: HTMLTagAttributes[]) {

  if (!attrs) return html5.data.completions.attributes;

  return attrs.map(({ name, description, value = false as undefined }: HTMLTagAttributes) => ({
    label: name,
    documentation: descriptive(description),
    data: {
      token: Tokens.HTMLAttribute,
      value
    }
  }));
}

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */
