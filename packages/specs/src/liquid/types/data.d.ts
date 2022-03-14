import { CompletionItemKind, MarkupContent } from 'vscode-languageserver-types';
import { TagScopes, IArgument } from './common';

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

export interface TypeNames {
  1: 'string',
  2: 'object',
  3: 'integer',
  4: 'number',
  5: 'boolean',
  6: 'string',
  7: 'array',
  8: 'data'
}
