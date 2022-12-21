import { TextEdit } from 'vscode-languageserver';
import { Position, CharCode, INode } from '@liquify/liquid-parser';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

export let textEdits: TextEdit[];

/* -------------------------------------------- */
/* EXPORT FUNCTIONS                             */
/* -------------------------------------------- */

export function TagEdits (position: Position, trigger: number): TextEdit[] {

  position.character -= trigger === CharCode.WSP ? 3 : 1;

  return [ TextEdit.insert(position, String.fromCharCode(CharCode.LCB)) ];

}

export function OutputEdits (position: Position, trigger: number): TextEdit[] {

  position.character -= trigger === CharCode.WSP ? 3 : 1;

  return [ TextEdit.insert(position, String.fromCharCode(CharCode.LCB)) ];

}

function CompleteTags () {

}

function CompleteObjectNames () {

}

function CompleteFilters () {

}

function CompleteFilters () {

}

/**
 * Returns the last known character code of the `from` offset position.
 * Strips ending whitespace from the content of the token.
 */
export function ParseFilter (node: INode, from: number): string {

  const ctx = {};
  const pos = from - node.start;
  const match = node.tokenContent.slice(0, pos);
  const start = match.lastIndexOf('|') + 1;
  const colon = match.indexOf(':', start);

  return match.slice(start, colon).trim();

}

/**
 * Returns the last known character code of the `from` offset position.
 * Strips ending whitespace from the content of the token.
 */
export function GetFilterName (node: INode, from: number): string {

  const pos = from - node.start;
  const match = node.tokenContent.slice(0, pos).trimEnd();
  const pipe = match.slice(match.lastIndexOf('|') + 1).trimStart();

  return pipe.slice(0, pipe.indexOf(':'));

}

/**
 * Returns the last known character code of the `from` offset position.
 * Strips ending whitespace from the content of the token.
 */
export function LastCharCode (node: INode, from: number): number {

  const pos = from - node.start;
  const match = node.tokenContent.slice(0, pos).trimEnd();

  return match.charCodeAt(match.length - 1);

}
