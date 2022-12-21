import { isArray, create, assign } from './native';
import { cc, NIL, WSP } from '@utils/chars';
import { grammar } from '@options/grammar';
import { LT } from '@utils/enums';

/**
 * Creates a null prototypical object
 */
export function set (initial: string[]): Set<string> {

  return new Set(initial);

}

/**
 * Creates a null prototypical object
 */
export function object<T> (initial?: T): T {

  const o = create(null);

  if (initial) return assign(o, initial);

  return o;
}

/**
 * Repeats a character x amount of times.
 * Used for generating repeating characters
 * and is merely a wraper around `''.repeat()`
 */
export function repeatChar (count: number, character: string = WSP) {

  if (count === 0) return character;

  let char = NIL;
  let i = 1;

  do { char += character; } while (i++ < count);

  return char;
}

export function notchar (string: string, code: number) {

  if (!string) return false;

  return string.charCodeAt(0) !== code;

}

export const doWhile = <T extends any[]>(array: T, callback: (index: number) => void | false) => {

  let i: number = 0;
  const length = array.length;

  do {
    if (callback(i) === false) break;
    i = i + 1;
  } while (i < length);

};

/**
 * Character Code is equal
 */
const is = (string: string, code: number) => string ? string.charCodeAt(0) === code : false;

/**
 * Last Character Code is equal
 */
is.last = (string: string | string[], code: number) => is(string[string.length - 1], code);

/**
 * Character Code is not equal
 */
const not = (string: string, code: number) => is(string, code) === false;

/**
 * Last Character Code is equal
 */
not.last = (string: string | string[], code: number) => is.last(string, code) === false;

export { is, not };

/**
 * Whitespace
 *
 * Check if character is whitespace
 */
export function ws (string: string) {

  return /\s/.test(string);

}

/**
 * Whitespace
 *
 * Check if character is whitespace
 */
export function nl (string: string) {

  return /\s/.test(string);

}

/**
 * Converts byte size to killobyte, megabyte,
 * gigabyte or terrabyte
 */
export function size (bytes: number): string {

  const kb = 1024;
  const mb = 1048576;
  const gb = 1073741824;

  if (bytes < kb) return bytes + ' B';
  else if (bytes < mb) return (bytes / kb).toFixed(1) + ' KB';
  else if (bytes < gb) return (bytes / mb).toFixed(1) + ' MB';
  else return (bytes / gb).toFixed(1) + ' GB';

};

/**
 * Sanitize Line comment
 */
export function sanitizeComment (input: string) {

  return `\\${input}`;

}

export function getLiquidTagName (input: string) {

  const begin = input.indexOf('{');
  const token = is(input[begin + 2], cc.DSH)
    ? input.slice(begin + 3).trimStart()
    : input.slice(begin + 2).trimStart();

  return token.slice(0, token.search(/\s/));

}

/**
 * Tag Name
 *
 * Returns the tag name of the provided token. Looks for HTML and
 * Liquid tag names, included Liquid output objects. This will also
 * convert tag names to lowercase.
 *
 * Optionally provide a slice offset index to slice the tag name. Helpful
 * in situations when we need to exclude `end` from `endtag`
 */
export function getTagName (tag: string, slice: number = NaN) {

  if (typeof tag !== 'string') return NIL;

  if (not(tag, cc.LAN) && not(tag, cc.LCB)) return tag;

  if (is(tag, cc.LAN)) {

    const name = tag.slice(1, tag.search(/[\s>]/));

    // Handles XML tag name (ie: <?xml?>)
    return is(name, cc.QWS) && is.last(name, cc.QWS)
      ? 'xml'
      : isNaN(slice) ? name.toLowerCase() : name.slice(slice).toLowerCase();

  }

  // Returns the Liquid tag or output token name
  const name = is(tag[2], cc.DSH) ? tag.slice(3).trimStart() : tag.slice(2).trimStart();
  const tname = name.slice(0, name.search(/[\s=|!<>,.[]|-?[%}]}/)).toLowerCase();

  return isNaN(slice) ? tname : tname.slice(slice);

};

/**
 * Is Liquid Output
 *
 * Check if input contains a Liquid output type token.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters.
 */
export function isLiquidOutput (input: string) {

  const begin = input.indexOf('{');

  return is(input[begin + 1], cc.LCB);

}

/**
 * Is Liquid Control
 *
 * Check if input contains a Liquid control type tag.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters.
 */
export function isLiquidControl (input: string) {

  const begin = input.indexOf('{');

  if (is(input[begin + 1], cc.PER)) {

    let token: string;

    token = input.slice(begin + (is(input[begin + 2], cc.DSH) ? 3 : 2)).trimStart();
    token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));

    return token.startsWith('end')
      ? false
      : grammar.liquid.control.has(token);

  }

  return false;
}

/**
 * Is Liquid Else
 *
 * Check if input contains a Liquid control flow else type token.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters.
 */
export function isLiquidElse (input: string) {

  const begin = input.indexOf('{');

  if (is(input[begin + 1], cc.PER)) {

    let token: string;

    token = input.slice(begin + (is(input[begin + 2], cc.DSH) ? 3 : 2)).trimStart();
    token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));

    return token.startsWith('end')
      ? false
      : grammar.liquid.else.has(token);

  }

  return false;
}

/**
 * Is Value Liquid
 *
 * Check if an attribute value string contains Liquid tag type
 * expression.
 */
export function isValueLiquid (input: string) {

  const eq = input.indexOf('=');

  if (eq > -1) {
    if (is(input[eq + 1], cc.DQO) || is(input[eq + 1], cc.SQO)) {
      return /{%-?\s*end\w+/.test(input.slice(eq, input.lastIndexOf(input[eq + 1])));
    }
  }

  return false;
}

/**
 * Is Liquid Line
 *
 * Check if input contains Liquid start and End type tokens.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters.
 */
export function isLiquidLine (input: string) {

  if (isLiquidStart(input)) return /{%-?\s*end\w+/.test(input);

  return false;
}

/**
 * Is Liquid Start
 *
 * Check if input contains a Liquid start type token.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters. The grammars
 * are consulted to determine the start type.
 *
 * Optional `strict` parameter to detect from index `0` to determine
 * a Liquid tag expression only.
 */
export function isLiquidStart (input: string, strict = false) {

  let token: string;

  if (strict) {

    if (
      is(input[0], cc.LCB) &&
      is(input[1], cc.PER) &&
      is(input[input.length - 2], cc.PER) &&
      is(input[input.length - 1], cc.RCB)
    ) {

      token = input.slice(is(input[2], cc.DSH) ? 3 : 2).trimStart();

      if (is(token, cc.DQO) || is(token, cc.SQO)) return false;

      token = token.slice(0, token.search(/[\s=|!<"'>,.[]|-?[%}]}/));

      return token.startsWith('end') ? false : grammar.liquid.tags.has(token);
    }

    return false;
  }

  let begin = input.indexOf('{');

  if (begin === -1) return false;

  do {

    if (is(input[begin + 1], cc.PER)) {

      token = input.slice(begin + (is(input[begin + 2], cc.DSH) ? 3 : 2)).trimStart();
      token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));

      return token.startsWith('end')
        ? false
        : grammar.liquid.tags.has(token);

    }

    begin = input.indexOf('{', begin + 1);

  } while (begin > -1);

  return false;
}

/**
 * Is Liquid End
 *
 * Check if input contains a Liquid end type token.
 * The entire input is checked, so the control tag itself
 * does not need to begin with Liquid delimiters.
 */
export function isLiquidEnd (input: string | string[]) {

  let token = input as string;

  if (Array.isArray(input)) token = input.join('');

  const begin = token.indexOf('{');

  if (is(token[begin + 1], cc.PER)) {
    if (is(token[begin + 2], cc.DSH)) return token.slice(begin + 3).trimStart().startsWith('end');
    return token.slice(begin + 2).trimStart().startsWith('end');
  }

  return false;

}

/**
 * Checks for existense of liquid tokens.
 *
 * - `1` Check open delimiters, eg: `{{`, `{%`
 * - `2` Check close delimiters, eg: `}}`, `%}`
 * - `3` Check open and end delimiters, eg: `{{`, `}}`, `{%` or `%}`
 * - `4` Check open containment, eg: `xx {{` or `xx {%`
 * - `5` Check close containment, eg: `x }} x` or `x %} x`
 * - `6` Check open tag delimiters from index 0, eg: `{%`
 * - `7` Check open output delimiters from index 0, eg: `{{`
 * - `8` Check close tag delimiter from end, eg: `%}`
 * - `9` Check close output delimiter from end, eg: `}}`
 */
export function isLiquid (input: string, type: LT): boolean {

  if (type === LT.Open) {

    return is(input[0], cc.LCB) && (is(input[1], cc.PER) || is(input[1], cc.LCB));

  } else if (type === LT.OpenTag) {

    return is(input[0], cc.LCB) && is(input[1], cc.PER);

  } else if (type === LT.OpenOutput) {

    return is(input[0], cc.LCB) && is(input[1], cc.LCB);

  } else if (type === LT.CloseTag) {

    return is(input[input.length - 2], cc.PER) && is(input[input.length - 1], cc.RCB);

  } else if (type === LT.CloseOutput) {

    return is(input[input.length - 2], cc.RCB) && is(input[input.length - 1], cc.RCB);

  } else if (type === LT.HasOpen) {

    return /{[{%]/.test(input);

  } else if (type === LT.HasOpenAndClose) {

    return (/{[{%]/.test(input) && /[%}]}/.test(input));

  } else if (type === LT.Close) {

    const size = input.length;

    return is(input[size - 1], cc.RCB) && (is(input[size - 2], cc.PER) || is(input[size - 2], cc.RCB));

  } else if (type === LT.OpenAndClose) {

    const size = input.length;

    return (
      is(input[0], cc.LCB) && (
        is(input[1], cc.PER) ||
        is(input[1], cc.LCB)
      )
    ) && (
      is(input[size - 1], cc.RCB) && (
        is(input[size - 2], cc.PER) ||
        is(input[size - 2], cc.RCB)
      )
    );

  }

}

/**
 * Safe Sort Ascension
 *
 * Used to sort objects, properties and selectors
 */
export function safeSortAscend (this: { recursive: boolean;}, item: [string, number][]) {

  let c = 0;
  const len = item.length;
  const storeb = item;

  /**
   * Safe Sort (Ascend Child)
   *
   * ---
   *
   * original: parse_safeSort_ascend_child
   */
  const safeSortAscendChild = () => {
    let a = 0;
    const lenc = storeb.length;
    if (a < lenc) {
      do {
        if (isArray(storeb[a]) === true) storeb[a] = safeSortAscend.apply(this, storeb[a]);
        a = a + 1;
      } while (a < lenc);
    }
  };

  /**
   * Safe Sort (Ascend Rescurse)
   *
   * ---
   *
   * original: parse_safeSort_ascend_recurse
   */
  const safeSortAscendRecurse = (value: any) => {

    let a = c;
    let b = 0;
    let d = 0;
    let e = 0;
    let ind = [];
    let key = storeb[c];
    let tstore = '';

    const tkey = typeof key;

    if (a < len) {

      do {

        tstore = typeof storeb[a];

        if (storeb[a] < key || tstore < tkey) {
          key = storeb[a];
          ind = [ a ];
        } else if (storeb[a] === key) {
          ind.push(a);
        }

        a = a + 1;

      } while (a < len);
    }

    d = ind.length;
    a = c;
    b = d + c;

    if (a < b) {
      do {
        storeb[ind[e]] = storeb[a];
        storeb[a] = key;
        e = e + 1;
        a = a + 1;
      } while (a < b);
    }

    c = c + d;

    if (c < len) {
      safeSortAscendRecurse('');
    } else {
      if (this.recursive === true) safeSortAscendChild();
      item = storeb;
    }

    return value;
  };

  safeSortAscendRecurse('');

  return item;

};

/**
 * Safe Sort Descension
 *
 * Used to sort objects, properties and selectors
 */
export function safeSortDescend (this: { recursive: boolean;}, item: [string, number][]) {

  let c = 0;
  const len = item.length;
  const storeb = item;

  /**
   * Safe Sort (Descend Child)
   *
   * ---
   *
   * original: parse_safeSort_descend_child
   */
  const safeSortDescendChild = () => {

    let a = 0;
    const lenc = storeb.length;

    if (a < lenc) {
      do {
        if (isArray(storeb[a])) storeb[a] = safeSortDescend.apply(this, storeb[a]);
        a = a + 1;
      } while (a < lenc);
    }
  };

  /**
   * Safe Sort (Descend Recurse)
   *
   * ---
   *
   * original: parse_safeSort_descend_recurse
   */
  const safeSortDescendRecurse = (value: string) => {

    let a = c;
    let b = 0;
    let d = 0;
    let e = 0;
    let key = storeb[c];
    let ind = [];
    let tstore = '';

    const tkey = typeof key;

    if (a < len) {

      do {
        tstore = typeof storeb[a];

        if (storeb[a] > key || (tstore > tkey)) {
          key = storeb[a];
          ind = [ a ];
        } else if (storeb[a] === key) {
          ind.push(a);
        }

        a = a + 1;

      } while (a < len);
    }

    d = ind.length;
    a = c;
    b = d + c;

    if (a < b) {

      do {
        storeb[ind[e]] = storeb[a];
        storeb[a] = key;
        e = e + 1;
        a = a + 1;
      } while (a < b);
    }

    c = c + d;

    if (c < len) {
      safeSortDescendRecurse('');
    } else {
      if (this.recursive === true) safeSortDescendChild();
      item = storeb;
    }

    return value;
  };

  safeSortDescendRecurse('');

  return item as [string, number][];

};

export function safeSortNormal (this: {
  array: [string, number][],
  recursive: boolean;
}, item: [string, number][]) {

  let storeb = item;
  const done = [ item[0] ];

  /**
   * Safe Sort (Normal Child)
   *
   * ---
   *
   * original: safeSort_normal_child
   */
  const safeSortNormalChild = () => {

    let a = 0;
    const len = storeb.length;

    if (a < len) {
      do {
        if (isArray(storeb[a])) storeb[a] = safeSortNormal.apply(this, storeb[a]);
        a = a + 1;
      } while (a < len);
    }

  };

  /**
   * Safe Sort (Normal Recurse)
   *
   * ---
   *
   * original: parse_safeSort_normal_recurse
   */
  const safeSortNormalRecurse = (x: [string, number]) => {

    let a = 0;

    const storea = [];
    const len = storeb.length;

    if (a < len) {
      do {
        if (storeb[a] !== x) storea.push(storeb[a]);
        a = a + 1;
      } while (a < len);
    }

    storeb = storea;

    if (storea.length > 0) {
      done.push(storea[0]);
      safeSortNormalRecurse(storea[0]);
    } else {
      if (this.recursive === true) safeSortNormalChild();
      item = storeb;
    }
  };

  safeSortNormalRecurse(this.array[0]);

  return item;
}
