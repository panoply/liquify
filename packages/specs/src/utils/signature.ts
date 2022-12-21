/* eslint-disable array-bracket-newline */

import { Tokens, Type } from './enums';
import type { Arguments, Filter, Parameter } from '../liquid';
import type { SignatureInformation, CompletionItem, MarkupContent } from 'vscode-languageserver-types';

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
export function filterSignatures (label: string, documentation: MarkupContent, args: Arguments) {

  const signature: SignatureInformation = Object.create(null);

  signature.label = label;
  signature.documentation = documentation;
  signature.parameters = [ { label } ];

  let state: string = '';

  args.forEach(({ type, required, value }, index) => {

    if (index === 0) {

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

      Object.entries(value).forEach(([ p, v ]: [string, Parameter], i, arr) => {

        state = ':';

        signature.parameters.push(
          { label: p, documentation: descriptive(v.description) },
          { label: state },
          { label: TypeNames[v.type] }
        );

        signature.label += p;
        signature.label += state + ' ';
        signature.label += TypeNames[v.type];

        if (i !== arr.length - 1) {
          state = ',';
          signature.parameters.push({ label: state });
          signature.label += state + ' ';
        }
      });

    }

    if (Object.is(args.length, 1)) signatures.filters[label].push({ ...signature });

  });

}

/**
 * Generates Filter completions
 */
export function filterCompletions ([ label, filter ]: [ string, Filter]): CompletionItem {

  const data: CompletionItem = Object.create(null);
  const description = descriptive(filter.description);

  data.data = Object.create(null);
  data.detail = label;

  if (filter?.arguments) {
    if (!Array.isArray(signatures.filters?.[label])) signatures.filters[label] = [];
    filterSignatures(label, description, filter.arguments);
    if (signatures.filters[label][0]) data.detail = signatures.filters[label][0].label;
  }

  if (filter?.deprecated) {
    data.tags = [ 1 ];
  }

  data.label = label;
  data.documentation = description;
  data.data.token = Tokens.LiquidFilter;
  data.data.snippet = filter.snippet ?? label;

  return data;

}

/**
 * Looks for match within values
 */
export function documentation (description: string, reference: {name: string, url: string }) {

  const data: { kind: 'plaintext' | 'markdown', value: string } = Object.create(null);

  if ((!description && !reference?.name) || !reference?.name) {
    data.kind = 'plaintext';
    data.value = '';
  } else {
    data.kind = 'markdown';
    data.value = `${description + '\n\n'} [${reference.name}](${reference.url})`;
  }

  return data;

};

/**
 * Generates descriptions for completions and other LSP
 * related capablities.
 */
export function descriptive (value: string): {kind: 'plaintext' | 'markdown', value: string} {

  if (!value) return { kind: 'plaintext', value: '' };

  return { kind: 'markdown', value };

};
