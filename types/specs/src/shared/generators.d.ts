import { Arguments } from '../liquid/types/common';
import { IFilter } from '../liquid/types/filters';
import { SignatureInformation, CompletionItem, MarkupContent } from 'vscode-languageserver-types';
export declare const TypeNames: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
};
export declare const signatures: {
    tags: {
        [tag: string]: SignatureInformation[];
    };
    filters: {
        [filter: string]: SignatureInformation[];
    };
};
/**
 * Generates Filter Signatures
 */
export declare function filterSignatures(label: string, documentation: MarkupContent, args: Arguments[]): void;
/**
 * Generates Filter completions
 */
export declare function filterCompletions([label, filter]: [string, IFilter]): CompletionItem;
/**
 * Looks for match within values
 */
export declare function documentation(description: string, reference: {
    name: string;
    url: string;
}): {
    kind: 'plaintext' | 'markdown';
    value: string;
};
/**
 * Looks for match within values
 */
export declare function descriptive(value: string): {
    kind: 'plaintext' | 'markdown';
    value: string;
};
