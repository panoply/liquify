import { CompletionItemKind, MarkupContent } from 'vscode-languageserver-types';
import { Tokens } from '../../shared/types';
import { TagScopes } from './common';

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
