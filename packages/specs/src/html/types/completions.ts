import { HTMLToken } from './enums';
import { IHTMLTagAttributes } from './markup';
import { MarkupContent } from 'vscode-languageserver-types';

export interface IHTMLCompletionData {
  token: HTMLToken,
  value: string | boolean
}

export interface IHTMLCompletionTagData {
  token: HTMLToken,
  void: boolean,
  attributes?: [] | Array<{
    label: string,
    documentation: MarkupContent,
    data: IHTMLCompletionData
  }>
}

export type IHTMLCompletionTags = Array<{
  label: string,
  documentation: MarkupContent,
  data: IHTMLCompletionTagData
}>

export type IHTMLCompletionAttrs = Array<{
  label: string,
  documentation: MarkupContent,
  data: IHTMLCompletionData
}>

export type IHTMLProvideAttrs = IHTMLCompletionAttrs | IHTMLTagAttributes[]

export interface IHTMLCompletions {
  tags: IHTMLCompletionTags,
  attributes: IHTMLCompletionAttrs
}
