
import * as Spec from 'html/data/export';
import { IHTMLTag, IHTMLValue, IHTMLTagAttributes } from 'html/types/markup';
import { IHTMLCompletions, IHTMLProvideAttrs } from 'html/types/completions';
import { documentation, descriptive } from 'utils/generators';
import { Tokens } from 'shared/types';
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
export let complete = HTMLCompletions();

/* -------------------------------------------- */
/* VALIDATORS                                   */
/* -------------------------------------------- */

export function isVoid (name: string) {

  return Spec.tags?.[name]?.void;

}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

export function HTMLTagComplete () {

  attribute = undefined;
  value = undefined;

  return complete.tags;

}

export function HTMLAttrsComplete (token: string): IHTMLProvideAttrs {

  if (attribute) return attribute;

  return HTMLAttributes(Spec.tags[token].attributes).concat(complete.attributes);

}

export function HTMLValueComplete (token: string = value) {

  if (!value || !Spec.values?.[token]) return false;

  return Spec.values[token].map(
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
    ? `${item.label}$1 > $0`
    : `${item.label}$1 > $0 </${item.label}>`;

  return item;

}

export function HTMLAttrsResolve (item: CompletionItem) {

  if (!item.data.value) {
    value = undefined;
    if (!/^data-/.test(item.label)) {
      item.insertText = `${item.label}="$1" $0`;
    }
  } else {
    value = item.data.value;
    item.insertText = `${item.label}="$1" $0`;
  }

  item.kind = CompletionItemKind.Property;
  item.insertTextFormat = InsertTextFormat.Snippet;

  return item;
}

export function HTMLValueResolve (item: CompletionItem) {

  Object.assign(item, { kind: CompletionItemKind.Value });

  return item;

}

export function HTMLAttributes (attrs: IHTMLTagAttributes[]) {

  if (!attrs) return complete.attributes;

  return attrs.map(
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
        token: Tokens.HTMLAttribute,
        value
      }
    })
  );

}

/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export function HTMLCompletions (): IHTMLCompletions {

  /* -------------------------------------------- */
  /* ATTRIBUTE COMPLETIONS                        */
  /* -------------------------------------------- */

  const attributes = Object.entries(Spec.attributes).map(
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

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = Object.entries(Spec.tags).map(
    ([
      label,
      spec
    ]) => ({
      label,
      documentation: documentation(spec.description, spec.reference),
      data: {
        token: Tokens.HTMLTag,
        void: spec.void,
        attributes: HTMLAttributes(spec?.attributes)
      }
    })
  );

  return {
    tags,
    attributes
  };

}
