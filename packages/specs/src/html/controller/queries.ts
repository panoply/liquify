import * as Specification from '../data/export';
import { IHTMLTag, IHTMLValue, IHTMLTagAttributes } from '../types/markup';
import { HTMLToken } from '../types/enums';
import { documentation, descriptive } from 'utils/generators';
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat
} from 'vscode-languageserver-types';

/* -------------------------------------------- */
/* EXPORT SCOPES                                */
/* -------------------------------------------- */
/**
 * Tag Specification
 */
export let tag: IHTMLTag;

/**
 * Attribute Specification
 */
export let attribute: IHTMLTagAttributes[];

/**
 * Value Set Specification
 */
export let value: keyof IHTMLValue;

/**
 * Completion Items
 */
export let complete = getHTMLCompletions();

/* -------------------------------------------- */
/* VALIDATORS                                   */
/* -------------------------------------------- */

export function isVoid (name: string) {

  return Specification.tags?.[name].void;

}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

export function provideTags () {

  attribute = undefined;
  value = undefined;

  return complete.tags;

}

export function provideAttrs () {

  console.log(attribute);

  if (!attribute) return complete.attributes;

  return attribute;

}

export function provideValues (token: string = value) {

  if (!value || !Specification.values?.[token]) return false;

  return Specification.values[token].map(
    value => ({
      ...value,
      data: { token: HTMLToken.Value }
    })
  );

}

export function resolveTag (item: CompletionItem) {

  attribute = item.data.attributes;

  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;
  item.insertText = item.data.void
    ? `${item.label}$1 > $0`
    : `${item.label}$1 > $0 </${item.label}>`;

  return item;

}

export function resolveAttribute (item: CompletionItem) {

  if (!item.data.value) {
    value = undefined;
    if (!/^data-/.test(item.label)) {
      item.insertText = `${item.label}="$1" $0`;
    }
  } else {
    value = item.data.value;
    item.insertText = `${item.label}=$0`;
  }

  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;

  return item;
}

export function resolveValue (item: CompletionItem) {

  Object.assign(item, { kind: CompletionItemKind.Value });

  return item;

}

/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export function getHTMLCompletions (): {
  tags: {
    label: string,
    documentation: {
      kind: 'markdown' | 'plaintext',
      value: string
    },
    data: {
      token: HTMLToken,
      void: boolean,
      attributes:[] | {
        label: string,
        documentation: {
          kind: 'markdown' | 'plaintext',
          value: string
        },
        data: {
          token: HTMLToken,
          value: string | boolean
        }
      }[]
    }
  }[],
  attributes: {
    label: string,
    documentation: {
      kind: 'markdown' | 'plaintext',
      value: string
    },
    data: {
      token: HTMLToken,
      value: string | boolean
    }
  }[]
  } {

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = Object.entries(Specification.tags).map(
    ([
      label,
      spec
    ]) => ({
      label,
      documentation: documentation(spec.description, spec.reference),
      data: {
        token: HTMLToken.Tag,
        void: spec.void,
        attributes: spec?.attributes.map(
          (
            {
              name,
              description,
              value = false
            }: IHTMLTagAttributes
          ) => ({
            label: name,
            documentation: descriptive(description),
            data: {
              token: HTMLToken.Attribute,
              value
            }
          })
        ) || []
      }
    })
  );

  /* -------------------------------------------- */
  /* ATTRIBUTE COMPLETIONS                        */
  /* -------------------------------------------- */

  const attributes = Object.entries(Specification.attributes).map(
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
        token: HTMLToken.Attribute,
        value
      }
    })
  );

  return { tags, attributes };

}
