import { IAST, INode } from '@liquify/liquid-parser';
import { LinkedEditingRanges } from 'vscode-languageserver';

export function getEditRanges (document: IAST, node: INode): LinkedEditingRanges {

  /* START -------------------------------------- */

  const startWord = node.startToken.indexOf(node.tag);
  const startPosition = document.positionAt(node.offsets[0] + startWord);

  /* END ---------------------------------------- */

  const endWord = node.endToken.indexOf(node.tag);
  const endPosition = document.positionAt(node.offsets[2] + endWord);

  return {
    ranges: [
      {
        start: startPosition,
        end: {
          line: startPosition.line,
          character: startPosition.character + node.tag.length
        }
      },
      {
        start: endPosition,
        end: {
          line: endPosition.line,
          character: endPosition.character + node.tag.length
        }
      }
    ]
  };

}
