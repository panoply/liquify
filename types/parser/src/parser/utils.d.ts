import { Range, TextDocument } from 'vscode-languageserver-textdocument';
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
/**
 * Edits Offset
 *
 * The inner contents of embedded regions do not match the offset locations
 * of the document they are contained within because embedded documents are
 * virtual. This function will align those offsets within changes.
 */
export declare const alignChanges: (lineOffset: number) => (change: {
    range: Range;
    text: string;
}) => {
    range: Range;
    text: string;
};
/**
 * Edits Offset
 *
 * The inner contents of embedded regions do not match the offset locations
 * of the document they are contained within because embedded documents are
 * virtual. This function will align those offsets within changes.
 */
export declare const alignRange: (range: Range, lineOffset: number) => Range;
export declare const customChanges: (text: string, { lineCount }: TextDocument) => {
    text: string;
    range: {
        start: {
            character: number;
            line: number;
        };
        end: {
            character: number;
            line: number;
        };
    };
}[];
/**
 * Validate if value is a number
 */
export declare const isNumber: (value: any) => boolean;
/**
 * Validate if value is a string
 */
export declare const isString: (value: any) => boolean;
/**
 * Validate if value is a object
 */
export declare const isObject: (value: any) => boolean;
/**
 * Validate if value is a Regular Expression
 */
export declare const isRegExp: (value: any) => boolean;
/**
 * Validate if value is a Boolean
 */
export declare const isBoolean: (value: any) => boolean;
/**
 * Validate if value is a Boolean
 */
export declare const isArray: (value: any) => boolean;
/**
 * Validate if value is undefine
 */
export declare const isUndefined: (value: any) => boolean;
/**
 * Validate if value is undefine
 */
export declare const isNull: (value: any) => boolean;
export declare function GetFormedRange(range: Range): Range;
export declare function createObject(): any;
export declare function EmbeddedDocumentText(str: string, text: string): string;
export declare function findFirst<T>(array: T[], p: (x: T) => boolean): number;
export declare function getParent(): void;
export declare function searchTree(tree: Record<string, any>[], value: unknown, key?: string, withChildren?: boolean): any;
export declare function binaryIndex<T>(array: T[], fn: (item: T) => boolean): number;
export declare function binarySearch<T>(array: T[], comparator: (op1: T) => number): number;
