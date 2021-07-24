import * as Specification from '../data/export';
import { IHTMLValue, IHTMLTagAttributes, IHTMLSpecs } from '../types/markup';
import { IHTMLProvideAttrs, IHTMLCompletions } from '../types/completions';
import { HTMLDataVSCode } from '../types/custom';
import { schema } from './schema';
import { Tokens } from './../../shared/types';
import { documentation, descriptive } from '../../utils/generators';
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat
} from 'vscode-languageserver-types';

/* -------------------------------------------- */
/* EXPORT SCOPES                                */
/* -------------------------------------------- */

/**
 * Attribute Specification
 */
export let html5: IHTMLSpecs = Specification;

/**
 * Attribute Specification
 */
export let completions: IHTMLCompletions = HTMLCompletions();

/**
 * Attribute Specification
 */
export let attribute: IHTMLTagAttributes[];

/**
 * Value Set Specification
 */
export let value: string;

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Accepts custom data as per the vscode spec
 * for HTML.
 */
export function HTMLCustomData (data: HTMLDataVSCode) {

  // Re-write to align with Liquify spec schema
  html5 = Object.assign({}, schema(data, Specification));
  completions = HTMLCompletions();

}

export function HTMLTagComplete () {

  attribute = undefined;
  value = undefined;

  return completions.tags;

}

export function HTMLAttrsComplete (tag: string): IHTMLProvideAttrs {

  if (attribute || attribute?.length) return attribute;

  return HTMLTagAttrs(html5.tags[tag].attributes).concat(completions.attributes);

}

export function HTMLValueComplete (token: string = value) {

  if (!value || !html5.values?.[token]) return false;

  return html5.values[token].map(
    value => ({
      ...value,
      data: { token: Tokens.HTMLValue }
    })
  );

}

export function HTMLTagResolve (item: CompletionItem) {

  attribute = item.data.attributes;

  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = item.data.void
    ? `${item.label} $1> $0`
    : `${item.label} $1> $0 </${item.label}>`;

  return item;

}

function getValueChoices (value: string) {

  if (!value) return '$1';

  const values = html5.values[value];

  let snippet: string = '$' + '{1|';
  let index: number = values.length;

  while (index--) snippet += values[index].label + (index === 0 ? '' : ',');

  return `${snippet}|}`;

}

export function HTMLAttrsResolve (item: CompletionItem) {

  value = item.label;

  if (/^data-/.test(item.label)) return item;

  const choice = getValueChoices(item.data.value);

  console.log(value, choice);

  item.insertText = `${item.label}="${choice}" $0`;
  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;

  return item;
}

export function HTMLValueResolve (item: CompletionItem) {

  Object.assign(item, { kind: CompletionItemKind.Value });

  return item;

}

export function HTMLCompletions () {

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = Object.entries(html5.tags).map(
    ([
      label,
      spec
    ]) => ({
      label,
      documentation: documentation(spec.description, spec.reference),
      data: {
        token: Tokens.HTMLTag,
        void: spec.void,
        attributes: HTMLTagAttrs(spec?.attributes)
      }
    })
  );

  /* -------------------------------------------- */
  /* GLOBAL ATTRIBUTE COMPLETIONS                 */
  /* -------------------------------------------- */

  const attributes = Object.entries(html5.attributes).map(
    ([
      label,
      {
        description,
        reference,
        value = false
      }
    ]) => ({
      label,
      documentation: documentation(description, reference),
      data: {
        token: Tokens.HTMLAttribute,
        value
      }
    })
  );

  return { tags, attributes };

}

export function HTMLTagAttrs (attrs: IHTMLTagAttributes[]) {

  if (!attrs) return completions.attributes;

  return attrs.map(
    (
      {
        name,
        description,
        value = false as undefined
      }: IHTMLTagAttributes
    ) => ({
      label: name,
      documentation: descriptive(description),
      data: {
        token: Tokens.HTMLAttribute,
        value
      }
    })
  );
}

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */
