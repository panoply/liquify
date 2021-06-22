import { Range } from 'vscode-languageserver-textdocument';

export function GetFormedRange (range: Range): Range {

  const { start, end } = range;

  return (
    start.line > end.line || (
      start.line === end.line && start.character > end.character
    )
  ) ? { start: end, end: start } : range;

}

export function EmbeddedDocumentText (str: string, text: string) {
  const start = str.indexOf(text);
  return str.substring(0, start) + ' '.repeat(text.length) + str.substring(start + text.length);
}

export function findFirst<T> (array: T[], p: (x: T) => boolean): number {

  let low = 0; let high = array.length;

  if (high === 0) return 0; // no children

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (p(array[mid])) high = mid;
    else low = mid + 1;
  }

  return low;
}

export function binarySearch<T> (array: T[], key: T, comparator: (op1: T, op2: T) => number): number {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = ((low + high) / 2) | 0;
    const comp = comparator(array[mid], key);
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
