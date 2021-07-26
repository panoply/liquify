import { CompletionItemKind, MarkupContent } from 'vscode-languageserver-types';
import { TagScopes, IArgument } from './common';
import { Type } from './types';

export interface ICompletion {
  label: string,
  deprecated?: boolean,
  kind?: CompletionItemKind,
  documentation?:string | MarkupContent,
  data?: {
    snippet?: string,
    singular?: boolean,
    parents?: TagScopes,
    arguments?: Array<IArgument.Argument | IArgument.Parameter>
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
} as const;
