import { Parser } from '@liquify/types';
import { CompletionItem, TextEdit } from 'vscode-languageserver-types';
/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 */
export declare function ProvideProps([label, { description, type, snippet }]: [any, {
    description: any;
    type: any;
    snippet?: any;
}]): {
    label: any;
    kind: 10;
    insertText: any;
    detail: any;
    insertTextFormat: 2;
    documentation: {
        kind: "plaintext" | "markdown";
        value: string;
    };
    data: {
        snippet: any;
    };
};
export declare function LiquidFilterResolve(item: CompletionItem): CompletionItem;
export declare function LiquidOutputResolve(item: CompletionItem, edits?: TextEdit[]): CompletionItem;
export declare function LiquidTagResolve(item: CompletionItem, edits?: TextEdit[]): CompletionItem;
export declare function LiquidPropertyComplete(node: Parser.INode, offset: number): Promise<any>;
