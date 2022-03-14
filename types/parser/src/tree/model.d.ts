import { TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver-types';
import { IAST } from './ast';
export declare const model: Map<string, IAST>;
/**
 * Current Text Document
 *
 * Static accessor of the current open document
 * AST which provides a shortcut to the AST instance.
 * We provide this static to prevent circular references.
 */
export declare let document: IAST;
/**
 * Creat Text Document
 *
 * Creates an AST instance and stores it to within the cache model.
 * This logic is lifted mostly from vscode-languageserver-node.
 */
export declare function create({ uri, languageId, version, text }: TextDocumentItem): IAST;
/**
 * Get Text Document
 */
export declare function get(uri: string): IAST;
/**
 * Remove Text Document
 */
export declare function remove(uri: string): void;
/**
 * Update Text Document
 */
export declare function update({ uri, version }: VersionedTextDocumentIdentifier, changes: any): IAST;
