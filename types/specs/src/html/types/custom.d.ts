import { MarkupContent } from 'vscode-languageserver-types';
import { IReference } from './markup';
export declare const enum DataSource {
    HTMLWorkspaceSettings = 1,
    LiquifyContributes = 2,
    LiquidrcConfig = 3,
    LiquidSpecsFile = 4
}
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
