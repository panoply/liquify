import { IHTMLSpecs } from '../types/markup';
import { HTMLDataVSCode } from '../types/custom';
/**
 * Merges custom data using vscode schema to Liquify compatiable HTML spec
 */
export declare function schema(custom: HTMLDataVSCode, specs: IHTMLSpecs): IHTMLSpecs;
