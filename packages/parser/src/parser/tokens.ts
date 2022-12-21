
import { INode } from '../tree/typings';
import { q } from '@liquify/liquid-language-specs';

/**
 * Returns the last known character code of the `from` offset position.
 * Strips ending whitespace from the content of the token.
 */
export function ParseFilter (node: INode, cursor: number): string {

  const pos = cursor - node.start;
  const match = node.tokenContent.slice(0, pos);
  const start = match.lastIndexOf('|') + 1;
  const colon = match.indexOf(':', start);

  match.slice(start, colon).trim();

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
