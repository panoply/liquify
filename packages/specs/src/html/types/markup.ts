import { MarkupContent } from 'vscode-languageserver-types';

export interface IReference {
  name: string;
  url: string;
}

export interface IValueData {
  name: string;
  description?: string | MarkupContent;
  references?: IReference[];
}

export interface IAttributeData {
  name: string;
  description?: string | MarkupContent;
  valueSet?: string;
  values?: IValueData[];
  references?: IReference[];
}

export interface ITagData {
  name: string;
  description?: string | MarkupContent;
  attributes: IAttributeData[];
  references?: IReference[];
}

export interface IValueSet {
  name: string;
  values: IValueData[];
}

export interface IHTMLSpecs {
  version: 1 | 1.1;
  tags?: ITagData[];
  globalAttributes?: IAttributeData[];
  valueSets?: IValueSet[];
}
