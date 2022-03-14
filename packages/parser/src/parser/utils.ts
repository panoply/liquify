import { Range, TextDocument } from 'vscode-languageserver-textdocument';

/* -------------------------------------------- */
/* EXPOSED NATIVES                              */
/* -------------------------------------------- */

export const assign = Object.assign;

/* -------------------------------------------- */
/* PARSER RELATER                               */
/* -------------------------------------------- */

/**
 * Edits Offset
 *
 * The inner contents of embedded regions do not match the offset locations
 * of the document they are contained within because embedded documents are
 * virtual. This function will align those offsets within changes.
 */
export const alignChanges = (lineOffset: number) => (
  change: {
    range: Range,
    text: string
  }
) => {

  change.range.start.line -= lineOffset;
  change.range.end.line -= lineOffset;

  if (change.range.start.line < 0) change.range.start.line = 0;
  if (change.range.end.line < 0) change.range.end.line = 0;

  return change;

};

/**
 * Edits Offset
 *
 * The inner contents of embedded regions do not match the offset locations
 * of the document they are contained within because embedded documents are
 * virtual. This function will align those offsets within changes.
 */
export const alignRange = (range: Range, lineOffset: number): Range => {

  const newRange = Object.assign({}, range);

  newRange.start.line -= lineOffset;
  newRange.end.line -= lineOffset;

  return newRange;

};

export const customChanges = (text: string, { lineCount }: TextDocument) => {

  return [
    {
      text,
      range: {
        start: { character: 0, line: 0 },
        end: { character: 0, line: lineCount }
      }
    }
  ];

};

/* -------------------------------------------- */
/* TYPEOF CHECKS                                */
/* -------------------------------------------- */

/**
 * Validate if value is a number
 */
export const isNumber = (value: any): boolean => typeof value === 'number';

/**
 * Validate if value is a string
 */
export const isString = (value: any): boolean => typeof value === 'string';

/**
 * Validate if value is a object
 */
export const isObject = (value: any): boolean => value !== null && typeof value === 'object';

/**
 * Validate if value is a Regular Expression
 */
export const isRegExp = (value: any): boolean => value instanceof RegExp;

/**
 * Validate if value is a Boolean
 */
export const isBoolean = (value: any): boolean => value === true || value === false;

/**
 * Validate if value is a Boolean
 */
export const isArray = (value: any): boolean => Array.isArray(value);

/**
 * Validate if value is undefine
 */
export const isUndefined = (value: any): boolean => value === undefined;

/**
 * Validate if value is undefine
 */
export const isNull = (value: any): boolean => value === null;

/* -------------------------------------------- */
/* AST RELATED                                  */
/* -------------------------------------------- */

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
  let high = array.length;

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
