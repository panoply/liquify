import { WSP, TAB, NWL, LFD, CAR, BWS } from 'lexical/characters';

/* -------------------------------------------- */
/* STATES                                       */
/* -------------------------------------------- */

export let source: string = '';

/**
 * Cursor Offset - used to consume strings
 */
export let cursor: number = 0;

/**
 * Index Offset
 */
export let offset: number = 0;

/**
 * Token Text
 */
export let token: string = '';

/**
 * Whitespace Counter
 */
export let spaces: number = 0;

/**
 * Source Length (Cached for optimisation)
 */
export let size: number = 0;

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Creates a stream
 *
 * Update the text document model, this is executed each time the document
 * content changes and is called via the `onDidChangeTextDocument` event.
 */
export function Create (text: string): string {

  source = text;
  cursor = 0;
  offset = 0;
  token = '';
  spaces = 0;
  size = text.length;

  return source;

}

/**
 * Computes Line Offsets
 *
 * Lifted from vscode-languageserver-node it computes
 * line offsets walking over the text contents and
 * asserts the newline offset locations.
 */
export function ComputeLineOffsets (
  text: string,
  isLineStart: boolean,
  textOffset = 0
): number[] {

  const result: number[] = isLineStart ? [ textOffset ] : [];

  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);

    if (ch === CAR || ch === NWL) {
      if (ch === CAR && i + 1 < text.length && text.charCodeAt(i + 1) === NWL) i++;
      result.push(textOffset + i + 1);
    }
  }

  return result;
}

/* -------------------------------------------- */
/* TOKEN SPECIFIC                               */
/* -------------------------------------------- */

/**
 * Tokenize
 *
 * Captures a token within the source between `from` and `to`
 * offset locations. If no params provided the current cursor
 * and index positions will be used and apply and re-tokenize.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `token` Matches token from start to matched search index
 *
 */
export function Tokenize (from?: number, to?: number): string {

  token = source.substring(from || cursor, to || offset);
  return token;

}

/**
 * Token Code Character
 *
 * Tests first character within token. Optionally will consume
 * the character if returns `true` - pass `false` as a second
 * param to prevent consumption.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Incremented by a value of 1
 * > - `token` Newly matched token
 */
export function TokenCodeChar (code: number, consume: boolean = true): boolean {

  if (token.charCodeAt(0) === code) {

    if (consume) {
      token = token.substring(1);
      cursor = cursor + 1;
    }

    return true;
  }

  return false;

}

/**
 * Token Contains
 *
 * Matches a RegExp within the current in-stream Token.
 *
 * **DOES NOT MODIFY**
 */
export function TokenContains (regex: RegExp): boolean {

  return regex.test(token);

}

/**
 * Token Contains
 *
 * Matches a RegExp within the current in-stream Token.
 *
 * **DOES NOT MODIFY**
 */
export function TokenNextWhitespace (regex: RegExp): boolean {

  return regex.test(token);

}

/**
 * Token Capture (Rewind)
 *
 * Captures a token in reverse. The `source` is sliced, the starting
 * `from` location begins at the provided offset and the ending
 * location is the current `offset` offset position. The token is updated
 * (if found) but cursor and index will remain intact and un-modified.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `token` Matches token from start to matched search index
 *
 */
export function TokenRewind (start: number, regex: RegExp): boolean {

  const string = source.substring(start, offset);
  const end = string.search(regex);

  if (end < 0) return false;

  token = string.substring(0, end);

  return true;

}

/**
 * Token Capture
 *
 * Captures a token starting from the current offset location.
 * The token is modified but cursor and index will remain intact
 * and untouched.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `token` The matched the expression that was provided
 *
 */
export function TokenCapture (regex: RegExp): boolean {

  const match = source.substring(offset).match(regex);

  if (match === null) return false;

  token = match[0];
  return true;
}

/* -------------------------------------------- */
/* POSITIONS                                    */
/* -------------------------------------------- */

/**
 * Returns a cursor offset
 *
 * This provides an addition marker point in the stream.
 * It is used to track positions for tokens. Negative numbers
 * will reverse the cursor offset
 *
 * `undefined`
 *
 * Passing no parameter location value will align the cursor
 * with the currect offset location.
 *
 * `NaN`
 *
 * Passing a value of `NaN` will consume the current captured
 * token length.
 *
 * `0`
 * Resets the cursor to location `0` (offset is not touched)
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Adjusts cursor offset
 *
 * ---
 */
export function Cursor (location?: number): number {

  cursor = isNaN(location)
    ? cursor + token.length
    : location === 0 ? 0 : location === undefined
      ? offset
      : cursor + location;

  if (cursor < 0) cursor = 0;

  return cursor;

}

/* -------------------------------------------- */
/* MODIFIERS                                    */
/* -------------------------------------------- */

/**
 * Goto Offset Position
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to new offset
 * > - `cursor` Aligns with Index
 * ---
 */
export function Jump (n: number): number {

  if (n > size) return GotoEnd();

  offset = n;
  cursor = offset;

  return offset;
}

/**
 * Previous position
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `offset` Decrements value by `1`
 * > - `cursor`Decrements value by `1`
 */
export function Prev (n: number = 1) {
  cursor = cursor - n;
  offset = offset - n;

  return offset;
}

/**
 * Next Position
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to new offset
 * > - `token` Character is tokenized (optional)
 *
 * ---
 *
 * @param {boolean} [tokenize=false]
 * Whether to tokenize the advancements. Defaults to `false`
 */
export function Advance (location: number, tokenize: boolean = false): number {
  offset = offset + location;

  if (tokenize) token = source.substring(cursor, offset);
  return offset;
}

/**
 * Goto End Position
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to end of stream
 * > - `offset` Moves to end of stream
 */
export function GotoEnd (): number {
  // reset stream position
  offset = size;
  cursor = offset;

  return size;
}

/**
 * Previous Code Character
 *
 * Matches a code character backwards.
 * Optionally pass a `step` number to move further
 * back from current index.
 *
 * **DOES NOT MODIFY**
 *
 * ---
 *
 * @param {number} [step=1]
 * How many steps backwards, defaults to `1`
 */
export function IsPrevCodeChar (char: number, step: number = 1): boolean {

  return source.charCodeAt(offset - step) === char;
}

/**
 * Is Next Code Character
 *
 * Checks if the next character code is equal, but
 * does not modify position.
 *
 * **DOES NOT MODIFY**
 */
export function IsNextCodeChar (code: number): boolean {

  return source.charCodeAt(offset + 1) === code;
}

/**
 * Current Code Character Truthy
 *
 * Checks the current character code at index matches
 * code passed in but does not modify position.
 *
 * **DOES NOT MODIFY**
 */
export function IsCodeChar (code: number): boolean {

  return code === GetCodeChar();
}

/**
 * Get Code Character
 *
 * Returns character code at the current index.
 *
 * **DOES NOT MODIFY**
 *
 * ---
 *
 * @param {number} [at]
 * Optionally pass an advancement, by default returns the
 * character code at current index.
 */
export function GetCodeChar (at?: number): number {

  return source.charCodeAt(at || offset);
}

/**
 * Get Character
 *
 * Returns the character at the current index, this is
 * simply a alias to `charAt`
 *
 * **DOES NOT MODIFY**
 *
 * ---
 *
 * @param {number} [advance]
 * Optionally pass an advancement, by default returns the
 * character code at current index.
 */
export function GetChar (at?: number): string {

  return source.charAt(at || offset);
}

/**
 * Skip String
 *
 * Consumes a string value between 2 quotes. Moves the index to
 * ending point of match (after last match quotation character).
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to start of match (before quote)
 * > - `offset` Moves to end of match (after quote)
 * > - `token` Match is Tokenized (without quotes)
 *
 * ---
 *
 * @param {number|true} [consume]
 * Custom characters to be consumed within the string.
 * Passing `true` will consume quotations, default to `undefined` so
 * quotations are not consumed and included in token.
 */
export function SkipQuotedString (consume?: number | number[] | true): boolean {

  const n = offset;

  if (!/^["']/.test(source.substring(n))) return false;

  const location = source.indexOf(source.charAt(n), n + 1);

  if (location < 0) {
    offset = Advance(1);
    return false;
  }

  // consume escaped strings, eg: \" or \'
  if (GetCodeChar(location - 1) === BWS) { return SkipQuotedString(location); }

  // custom consumed character codes
  if (typeof consume !== 'undefined' && typeof consume !== 'boolean') {
    if (Array.isArray(consume) && consume.indexOf(GetCodeChar(location)) !== -1) {
      return SkipQuotedString(location);
    }
  }

  cursor = offset;
  offset = location + 1;
  token =
    consume === true
      ? source.substring(n + 1, location)
      : source.substring(n, offset);

  return true;
}

/**
 * Consume Until
 *
 * Advances Stream until a Regular Expression match is found.
 * Ending the index before the passed regex matches. An optional
 * `unless` expression can be passed.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to current index
 * > - `offset` Moves to position before matched index
 * > - `token` Optionally tokenize the match, defaults to `undefined`
 */
export function ConsumeUntil (regex: RegExp, tokenize?: boolean): boolean {

  const match = source.substring(offset).search(regex);

  if (match === null || match < 0) return false;

  cursor = offset;
  offset = offset + match;

  if (tokenize) token = source.substring(cursor, offset);

  return true;
}

/**
 * Consume Unless
 *
 * Advances Stream until a Regular Expression match is found.
 * If the consumed portion of the match between its starting point
 * and the matched point matches the passed `unless` expression
 * that match will return false and consumption cancelled.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to the length of last token match
 * > - `offset` Moves to new match index
 * > - `token` Match is tokenized from current to new index
 *
 * ---
 *
 * @param {boolean} [tokenize]
 * By default, this is `true` and the consumption is tokenized
 */
export function ConsumeUnless (
  regex: RegExp,
  unless: RegExp,
  tokenize: boolean = true
): boolean {

  const string = source.substring(offset);
  const match = string.search(regex);

  if (match < 0) return false;
  if (match === 0) return true;

  const capture = string.substring(0, match);

  if (unless.test(capture)) return false;
  if (tokenize) token = capture;

  cursor = offset;
  offset = offset + match;

  return true;

}

/**
 * Until Sequence
 *
 * Advances Stream until a Regular Expression match is found
 * and returns the character code that has matched. index is moved
 * to the position before the match.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to match index (align with index)
 * > - `offset` Moves to match index (cursor is aligned)
 *
 * ---
 *
 * @returns {NaN|number}
 * If match is `-1` the stream will move to end and return `NaN`
 */
export function UntilSequence (regex: RegExp): number {

  const match = source.substring(offset).search(regex);

  if (match < 0) {
    GotoEnd();
    return NaN;
  }

  cursor = offset += match;
  offset = cursor;

  return source.charCodeAt(offset);
}

/**
 * If Sequence
 *
 * Advances Stream until a Regular Expression match is found.
 * The match is not consumed, index is moved to the position
 * before the match.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to match index (align with index)
 * > - `offset` Moves to match index (cursor is aligned)
 * > - `token` Character is tokenized (optional)
 *
 * ---

  * @param {boolean} [tokenize=true]
  * By default, this is `true` and the consumption is tokenized
  */
export function IfSequence (regex: RegExp, tokenize: boolean = true): boolean {

  const substring = source.substring(offset);
  const match = substring.search(regex);

  if (match < 0) return false;
  if (tokenize) token = substring.substring(0, match);

  cursor = offset + match;
  offset = cursor;

  return true;
}

/**
 * While Character
 *
 * Runs a while on the condition parameter. The condition passed
 * will return a boolean value and the index is incremented
 * until that condition is met.
 *
 * **MODIFIER**
 *
 * ---
 *
 * @todo
 * Currently we are collection whitespace information and this might
 * become troublesome in future. Needs to be be re-thought.
 */
function WhileChar (condition: Function): boolean {

  const pos = offset;

  while (offset < size && condition(source.charCodeAt(offset))) offset++;

  if (pos < offset) {
    spaces = offset - pos;
    return true;
  }

  return false;
}

/**
 * Reverse Whitespace
 *
 * Reverses the previous consumed whitespace. In some cases the
 * stream will move forward before we have processed our token which
 * throws the cursor and offset locations out of sync. This is likely
 * to occur when we encounter a parse error.
 *
 * This function will reverse the stream to a last known character
 * before whitespace was previously consumed. It uses the current
 * cursor location and walks backwards until a non-whitespace character
 * is found.
 *
 * The `from` optional parameter accepts a offset location and when
 * provided the stream will reverse starting at that locations index,
 * this defaults to the current `cursor` location offset.
 *
 * The `update` optional parameter accepts a `boolean` that defaults to
 * `true` and will update the `cursor` and `offset` index.
 *
 * ---
 *
 * **OPTIONAL MODIFIER**
 *
 * > - `cursor` Moves cursor to previous match
 * > - `offset` Moves offset to previous match
 *
 * ---
 */
export function ReverseWhitespace (
  from?: number,
  update: boolean = true
): number | boolean {

  const pos = from === undefined ? cursor : from;
  const str = source.substring(0, from);

  let rev: number = pos;

  while (rev--) {
    if (
      str.charCodeAt(rev) !== WSP ||
      str.charCodeAt(rev) !== TAB ||
      str.charCodeAt(rev) !== NWL ||
      str.charCodeAt(rev) !== LFD ||
      str.charCodeAt(rev) !== LFD
    ) break;
  }

  if (!update) return rev;

  cursor = rev;
  offset = pos;
  return true;

}

/**
 * Skips all whitespace and newlines
 *
 * This shortcuts to `WhileChar` function, it checks for all
 * whitespace character codes, this includes newlines.
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to match end via `whileChar`
 * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
 */
export function SkipWhitespace (): boolean {

  return WhileChar(
    (charCode: number) =>
      charCode === WSP ||
      charCode === TAB ||
      charCode === NWL ||
      charCode === LFD ||
      charCode === CAR
  );
}

/**
 * Skip skipWhitespace
 *
 * This shortcuts to `WhileChar` function, it checks for all
 * whitespace character codes only.
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to match end
 * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
 *
 */
export function Whitespace (): boolean {

  return WhileChar(
    (charCode: number) => charCode === WSP || charCode === TAB
  );
}

/**
 * Skip Newlines
 *
 * This shortcuts to `WhileChar` function, it checks for all
 * newline character codes only.
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to match end
 * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
 *
 */
export function Newlines (): boolean {

  return WhileChar(
    (charCode: number) =>
      charCode === NWL || charCode === LFD || charCode === CAR
  );
}

/**
 * If previous characters were whitespace
 *
 * **DOES NOT MODIFY**
 *
 * ---

  * @param {number} [reverse=1]
  * The amount of steps to reverse from current index, this defaults
  * to `1` for decrementing this index
  */
export function IsPrevRegExp (regex: RegExp, reverse: number = 1): boolean {

  return regex.test(source.substring(offset - reverse, offset));
}

/**
 * If RegExp Match
 *
 * Advances Stream when Regular Expression finds a match.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to match start
 * > - `offset` Moves to match end
 * > - `token`  Character is tokenized
 */
export function IfRegExp (regex: RegExp): boolean {

  const match = source.substring(offset).match(regex);

  if (!match) return false;

  cursor = offset + match.index;
  offset = cursor + match[0].length;
  token = match[0];

  return true;
}

/**
 * Matches a RegExp
 *
 * Executes an expression match from the current index
 *
 * **DOES NOT MODIFY**
 *
 */
export function IsRegExp (regex: RegExp): boolean {

  return regex.test(source.substring(offset));
}

/**
 * If Code Character
 *
 * Advances stream if passed Character Code is matching
 * the current index. If matched, index  increments by a value
 * of 1 and consume the character
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `cursor` Moves to index before match
 * > - `token`  Character is tokenized (optional)
 *
 * ---
 * @param {boolean} [tokenize=true]
 * By default this is `true` and the character is tokenized
 */
export function IfCodeChar (code: number, tokenize: boolean = true): boolean {

  if (code !== source.charCodeAt(offset)) return false;
  if (tokenize) token = source.charAt(offset);

  offset = offset + 1;

  return true;

}

/**
 * Until Character Code
 *
 * Advances Stream until a single matching Character Code is found.
 * The matching character code is not consumed, index is moved to
 * the position before the match.
 *
 * ---
 *
 * **MODIFIER**
 *
 * > - `offset` Moves to offset before match
 */
export function UntilCharCode (code: number): boolean {

  while (offset < size) {
    if (source.charCodeAt(offset) === code) return true;
    offset++;
  }

  return false;

}
