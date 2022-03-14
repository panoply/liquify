/* eslint-disable array-bracket-newline */

import { Tokens } from '../exports/types';
import { Type } from './enums';
import { Arguments, IParameter } from '../liquid/types/common';
import { IFilter } from '../liquid/types/filters';

import {
  SignatureInformation,
  CompletionItem,
  MarkupContent
} from 'vscode-languageserver-types';

export const TypeNames = {
  1: 'string',
  2: 'object',
  3: 'integer',
  4: 'number',
  5: 'boolean',
  6: 'string',
  7: 'array',
  8: 'data'
};

export const signatures: {
  tags: { [tag: string]: SignatureInformation[] },
  filters: { [filter: string]: SignatureInformation[] }
} = {
  tags: {},
  filters: {}
};

/**
 * Generates Filter Signatures
 */
export function filterSignatures (
  label: string,
  documentation: MarkupContent,
  args: Arguments[]
) {

  const signature: SignatureInformation = {
    label,
    documentation,
    parameters: [ { label } ]
  };

  let state: string = '';

  args.forEach(({ type, required, value }, index) => {

    if (Object.is(index, 0)) {
      state = ':';
      signature.label += state + ' ';
      signature.parameters.push({ label: state });
    } else {

      if (required) {
        state = ',';
        signature.label += state + ' ';

      } else {
        state = ':';
        signatures.filters[label].push(signature);
        signature.parameters.splice(3);
        signature.label = label;
        signature.label += state + ' ';
      }

      signature.parameters.push({ label: state });
    }

    if (!Object.is(type, Type.parameter)) {

      state = TypeNames[type];

      signature.label += state;
      signature.parameters.push({ label: state });

    } else {

      Object.entries(value).forEach(
        (
          [
            p,
            v
          ]: [
              string,
              IParameter
            ],
          i,
          arr
        ) => {

          state = ':';

          signature.parameters.push(
            {
              label: p,
              documentation: descriptive(v.description)
            },
            {
              label: state
            },
            {
              label: TypeNames[v.type]
            }
          );

          signature.label += p;
          signature.label += state + ' ';
          signature.label += TypeNames[v.type];

          if (!Object.is(i, arr.length - 1)) {
            state = ',';
            signature.parameters.push({ label: state });
            signature.label += state + ' ';
          }

        }
      );

    }

    if (Object.is(args.length, 1)) {
      signatures.filters[label].push({ ...signature });
    }

  });

}

/**
 * Generates Filter completions
 */
export function filterCompletions ([ label, filter ]: [ string, IFilter]): CompletionItem {

  const description = descriptive(filter.description);

  let detail: string = label;

  if (filter?.arguments) {

    if (!Array.isArray(signatures.filters?.[label])) {
      signatures.filters[label] = [];
    }

    filterSignatures(label, description, filter.arguments);
    if (signatures.filters[label][0]) {
      detail = signatures.filters[label][0].label;
    }
  }

  return {
    label,
    detail,
    deprecated: filter?.deprecated ?? false,
    documentation: description,
    data: {
      token: Tokens.LiquidFilter,
      snippet: filter.snippet ?? label
    }
  };
}

/**
 * Looks for match within values
 */
export function documentation (
  description: string,
  reference: { name: string, url: string }
): {
  kind: 'plaintext' | 'markdown',
  value: string
} {

  if (!description && !reference?.name) return { kind: 'plaintext', value: '' };

  if (!reference?.name) return { kind: 'plaintext', value: '' };

  const value = description +
    '\n\n' +
    '[' + reference.name + ']' +
    '(' + reference.url + ')';

  return { kind: 'markdown', value };

};

/**
 * Looks for match within values
 */
export function descriptive (value: string): {
  kind: 'plaintext' | 'markdown',
  value: string
} {

  if (!value) return { kind: 'plaintext', value: '' };

  return { kind: 'markdown', value };

};
