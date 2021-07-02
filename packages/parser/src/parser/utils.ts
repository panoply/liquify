import { Range } from 'vscode-languageserver-textdocument';
import { INode } from 'tree/nodes';

export function GetFormedRange (range: Range): Range {

  const { start, end } = range;

  return (
    start.line > end.line || (
      start.line === end.line && start.character > end.character
    )
  ) ? {
      start: end,
      end: start
    } : range;

}

export function createObject () {

  return Object.create(null);
}

export function EmbeddedDocumentText (str: string, text: string) {
  const start = str.indexOf(text);
  return str.substring(0, start) + ' '.repeat(text.length) + str.substring(start + text.length);
}

export function findFirst<T> (array: T[], p: (x: T) => boolean): number {

  let low = 0;
  let high = array?.length || 0;

  if (high === 0) return 0; // no children

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (p(array[mid])) high = mid; else low = mid + 1;
  }

  return low;

}

export function getParent () {

}

export function searchTree (
  tree: Record<string, any>[],
  value: unknown,
  key = 'value',
  withChildren = false
) {

  let result = null;

  for (let index = 0; index < tree.length; index += 1) {

    const stack = [ tree[index] ];

    while (stack.length) {

      const node = stack.shift()!;

      if (node[key] === value) {
        result = node;
        break;
      }

      if (node?.children) {
        stack.push(...node.children);
      }
    }

    if (result) break;
  }

  if (withChildren !== true) {
    delete result?.children;
  }

  return result;

}

export function binaryIndex<T> (array: T[], fn: (item: T) => boolean): number {

  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = ((low + high) / 2) | 0;
    const idx = fn(array[mid]);
    if (idx) low = mid + 1; else if (idx) high = mid - 1; else return mid;
  }

  return -(low + 1);

}

export function binarySearch<T> (
  array: T[],
  comparator: (op1: T) => number
): number {

  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = ((low + high) / 2) | 0;
    const comp = comparator(array[mid]);
    if (comp < 0) {
      low = mid + 1;
    } else if (comp > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -(low + 1);
}
