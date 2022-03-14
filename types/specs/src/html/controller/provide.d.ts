import { IHTMLTagAttributes, IHTMLSpecs } from '../types/markup';
import { IHTMLProvideAttrs, IHTMLCompletions } from '../types/completions';
import { HTMLDataVSCode } from '../types/custom';
import { Tokens } from '../../exports/types';
import { CompletionItem } from 'vscode-languageserver-types';
/**
 * Attribute Specification
 */
export declare let html5: IHTMLSpecs;
/**
 * Attribute Specification
 */
export declare let completions: IHTMLCompletions;
/**
 * Attribute Specification
 */
export declare let attribute: IHTMLTagAttributes[];
/**
 * Value Set Specification
 */
export declare let value: string;
/**
 * Accepts custom data as per the vscode spec
 * for HTML.
 */
export declare function HTMLCustomData(data: HTMLDataVSCode): void;
export declare function HTMLTagComplete(): import("../types/completions").IHTMLCompletionTags;
export declare function HTMLAttrsComplete(tag: string): IHTMLProvideAttrs;
export declare function HTMLValueComplete(token?: string): false | {
    data: {
        token: Tokens;
    };
    label: string;
    documentation?: {
        kind: "plaintext" | "markdown";
        value: string;
    };
}[];
export declare function HTMLTagResolve(item: CompletionItem): CompletionItem;
export declare function HTMLAttrsResolve(item: CompletionItem): CompletionItem;
export declare function HTMLValueResolve(item: CompletionItem): CompletionItem;
export declare function HTMLCompletions(): {
    tags: {
        label: string;
        documentation: {
            kind: "plaintext" | "markdown";
            value: string;
        };
        data: {
            void: boolean;
            attributes: import("../types/completions").IHTMLCompletionAttrs;
        };
    }[];
    attributes: {
        label: string;
        documentation: {
            kind: "plaintext" | "markdown";
            value: string;
        };
        data: {
            value: string | boolean;
        };
    }[];
};
export declare function HTMLTagAttrs(attrs: IHTMLTagAttributes[]): import("../types/completions").IHTMLCompletionAttrs;
