import {
  Position,
  IAST,
  INode,
  IObject,
  NodeKind,
  Regexp,
  html5,
  liquid

} from '@liquify/liquid-parser';
import { inRange } from 'lodash';

/**
 * Returns the word in range
 */
function getWord (string: string, offset: number): string | null {

  const before = string.slice(0, offset + 1).search(Regexp.WordBoundaryBefore);
  const after = string.slice(offset).search(Regexp.WordBoundaryAfter);

  if (before > 0) return string.slice(before, after + offset);

  return null;

}

export function doObjectHover (document: IAST, position: Position) {

  const offset = document.offsetAt(position);
  const node: INode = document.getNodeAt(offset);
  const character = offset - node.start;

  let word: string;

  if (node.type !== 0) {
    if (inRange(offset, node.offsets[0], node.offsets[1])) {
      word = getWord(node.startToken, character);
    } else if (inRange(offset, node.offsets[2], node.offsets[3])) {
      word = node.tag;
    }
  }

  if (!word) return null;

  let cursor: any;

  if (node.kind === NodeKind.HTML) {
    cursor = (
      html5.values?.[word] ||
      html5.attributes?.[word]
    );
  } else {

    cursor = (
      liquid.variation?.objects?.[word] ||
      liquid.variation.tags?.[word] ||
      liquid.variation.filters?.[word]
    );
  }

  if (!cursor) return null;

  return documentation(cursor.description, cursor.reference);

}

export function doPropertyHover (token: string, objects: string[]) {

  if (!liquid.variation?.objects) return null;

  const prop = objects.indexOf(token);
  const root = liquid.variation.objects[objects[0]];

  if (!root) return null;

  let spec: IObject = root?.properties;
  let walk: number = 1;

  while (prop < walk) spec = spec.properties?.[objects[walk++]];

  if (!prop) return null;

  return documentation(spec.description, root.reference);

}

/**
 * Looks for match within values
 */
export function documentation (
  description: string,
  reference: {
    name: string,
    url: string
  }
): {
  kind: 'plaintext' | 'markdown',
  contents: string
} {

  if (!description && !reference?.name) return { kind: 'plaintext', contents: '' };

  if (!reference?.name) return { kind: 'plaintext', contents: '' };

  const contents = description +
    '\n\n' +
    '---' +
    '\n\n' +
    '[' + reference.name + ']' +
    '(' + reference.url + ')' +
    '\n\n';

  return { kind: 'markdown', contents };

};
