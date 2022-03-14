import { MarkupContent } from 'vscode-languageserver-types';
import { IReference } from './markup';

export const enum DataSource {

  HTMLWorkspaceSettings = 1,
  LiquifyContributes,
  LiquidrcConfig,
  LiquidSpecsFile

}

/* -------------------------------------------- */
/* LIFTED TYPINGS                               */
/* -------------------------------------------- */

/**
 * Lifted from vscode-html-languageservice
 */
export interface IValueData {
  name: string;
  description?: string | MarkupContent;
  references?: IReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export interface IAttributeData {
  name: string;
  description?: string | MarkupContent;
  valueSet?: string;
  values?: IValueData[];
  references?: IReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export interface ITagData {
  name: string;
  description?: string | MarkupContent;
  attributes: IAttributeData[];
  references?: IReference[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export interface IValueSet {
  name: string;
  values: IValueData[];
}

/**
 * Lifted from vscode-html-languageservice
 */
export interface HTMLDataVSCode {
  version: 1 | 1.1;
  tags?: ITagData[];
  globalAttributes?: IAttributeData[];
  valueSets?: IValueSet[];
}
