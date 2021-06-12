import { Position, IAST, INode } from '@liquify/liquid-parser';

/**
 * Returns the word in range
 *
 * @todo Rethink how to capture words as `indexOf` and `lastIndexOf` are
 * captures whitespace only. `\n\r\t` all need to be considered but
 * would like to do this without parsing and reference using regex.
 *
 * @export
 * @param {Parser.AST} document
 * @param {LSP.Position} position
 * @param {Parser.ASTNode} node
 * @returns {string}
 */
export function getWordAtPosition (document: IAST, position: Position, node: INode): string {

  if (document.withinEndToken(position, node)) return node.name;

  const lineRange = document.toLineRange(position);
  const getText = document.getText(lineRange);
  const character = document.offsetAt(position) - document.offsetAt(lineRange.start);
  const first = getText.lastIndexOf(' ', character);
  const last = getText.indexOf(' ', character);
  const word = getText.substring(
    first !== -1 ? first : 0,
    last !== -1 ? last : getText.length - 1
  ).match(/[^\W]+/);

  if (word === null) return null;

  return word[0];

}
