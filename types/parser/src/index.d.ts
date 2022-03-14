import { IEngine } from '@liquify/liquid-language-specs';
import { IAST } from './tree/ast';
import { IConfig } from './config';
import { Node } from './tree/nodes';
import { Embed as IIEmbed } from './tree/embed';
import { DidChangeTextDocumentParams, TextDocumentItem } from 'vscode-languageserver-types';
export { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
export { IAST } from './tree/ast';
export { Node as INode } from './tree/nodes';
export { NodeLanguage } from './lexical/language';
export { NodeKind } from './lexical/kind';
export { TokenType as Tokens } from './lexical/tokens';
export * from '@liquify/liquid-language-specs';
export * as Regexp from './lexical/expressions';
export * as Characters from './lexical/characters';
export declare type IEmbed = Node & IIEmbed;
export declare class LiquidParser {
    constructor(options: IConfig);
    /**
       * Change Specification Engine
       */
    engine(engine: IEngine): void;
    parse(text: string): any;
    /**
     * Executes a full document scan. Call this method to create
     * a document reference and perform a full text scan.
     */
    scan(textDocument: TextDocumentItem): IAST;
    reparse(uri?: string): void;
    get(uri: string): IAST;
    delete(uri: string): any;
    update({ textDocument, contentChanges }: DidChangeTextDocumentParams): IAST;
}
