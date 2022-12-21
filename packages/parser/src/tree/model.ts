import { TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver-types';
import { AST } from './ast';

export const model: Map<string, AST> = new Map();

/**
 * Creat Text Document
 *
 * Creates an AST instance and stores it to within the cache model.
 * This logic is lifted mostly from vscode-languageserver-node.
 */
export function create ({ uri, languageId, version, text }: TextDocumentItem) {

  if (model.has(uri)) return model.get(uri);

  AST.document = new AST(uri, languageId, version, text);

  model.set(uri, AST.document).get(uri);

  return AST.document;

}

/**
 * Get Text Document
 */
export function get (uri: string): AST {

  if (AST.document?.uri !== uri) {
    if (model.has(uri)) AST.document = model.get(uri);
    else {
      throw new Error('Unable to locate document at the provided URI');
    }
  }

  return AST.document;

}

/**
 * Remove Text Document
 */
export function remove (uri: string): void {

  if (model.has(uri)) {
    model.delete(uri);
  } else {
    throw new Error('No document in cache using that URI');
  }
}

/**
 * Update Text Document
 */
export function update ({ uri, version }: VersionedTextDocumentIdentifier, changes: any): AST {

  if (AST.document.uri !== uri) {
    if (model.has(uri)) AST.document = model.get(uri);
    else {
      throw new Error('No document exists with the uri');
    }
  }

  AST.document.increment(changes, version);

  return AST.document;

}
