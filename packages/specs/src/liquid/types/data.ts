import { CompletionItemKind, MarkupContent } from 'vscode-languageserver-types';
import { Tokens } from '../../shared/types';
import { TagScopes } from './common';
import { BasicTypeRange, Type } from './types';

export interface ICompletion {
  label: string,
  deprecated: boolean,
  kind?: CompletionItemKind,
  documentation: MarkupContent,
  data: {
    token: Tokens,
    snippet?: string,
    singular?: boolean,
    parents?: TagScopes
  }
}

export interface ICompletions {
  tags: ICompletion[]
  filters: ICompletion[]
  objects?: ICompletion[]
}

export const TypeNames = {
  [Type.any]: 'string',
  [Type.object]: 'object',
  [Type.integer]: 'integer',
  [Type.number]: 'number',
  [Type.boolean]: 'boolean',
  [Type.string]: 'string',
  [Type.array]: 'array',
  [Type.data]: 'data'
};
