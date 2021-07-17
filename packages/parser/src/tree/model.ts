import { IAST } from 'tree/ast';
import { TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver-types';
// import { INode } from 'tree/nodes';
// import { TextDocument } from 'vscode-languageserver-textdocument';

export const model: Map<string, IAST> = new Map();

/**
 * Current Text Document
 *
 * Static accessor of the current open document
 * AST which provides a shortcut to the AST instance.
 * We provide this static to prevent circular references.
 */
export let document: IAST;

/**
 * Creat Text Document
 *
 * Creates an AST instance and stores it to within the cache model.
 * This logic is lifted mostly from vscode-languageserver-node.
 */
export function create ({
  uri,
  languageId,
  version,
  text
}: TextDocumentItem) {

  if (model.has(uri)) return model.get(uri);

  document = new IAST(uri, languageId, version, text);
  model.set(uri, document).get(uri);

  return document;

}

/**
 * Get Text Document
 */
export function get (uri: string): IAST {

  if (document?.uri !== uri) {
    if (model.has(uri)) document = model.get(uri);
    else {
      throw new Error('Unable to locate document at the provided URI');
    }
  }

  return document;

}

/**
 * Remove Text Document
 */
export function remove (uri: string): void {

  if (model.has(uri)) model.delete(uri);
  else {
    throw new Error('No document in cache using that URI');
  }
}

/**
 * Update Text Document
 */
export function update ({
  uri,
  version
}: VersionedTextDocumentIdentifier, changes: any): IAST {

  if (document.uri !== uri) {
    if (model.has(uri)) document = model.get(uri);
    else {
      throw new Error('No document exists with the uri');
    }
  }

  document.increment(changes, version);

  return document;

}
