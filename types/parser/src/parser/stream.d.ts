export declare let source: string;
/**
 * Cursor Offset - used to consume strings
 */
export declare let cursor: number;
/**
 * Index Offset
 */
export declare let offset: number;
/**
 * Token Text
 */
export declare let token: string;
/**
 * Whitespace Counter
 */
export declare let spaces: number;
/**
 * Source Length (Cached for optimisation)
 */
export declare let size: number;
/**
 * Creates a stream
 *
 * Update the text document model, this is executed each time the document
 * content changes and is called via the `onDidChangeTextDocument` event.
 */
export declare function Create(text: string): string;
/**
 * Computes Line Offsets
 *
 * Lifted from vscode-languageserver-node it computes
 * line offsets walking over the text contents and
 * asserts the newline offset locations.
 */
export declare function ComputeLineOffsets(text: string, isLineStart: boolean, textOffset?: number): number[];
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
export declare function Tokenize(from?: number, to?: number): string;
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
export declare function TokenCodeChar(code: number, consume?: boolean): boolean;
/**
 * Token Contains
 *
 * Matches a RegExp within the current in-stream Token.
 *
 * **DOES NOT MODIFY**
 */
export declare function TokenContains(regex: RegExp, trim?: boolean): boolean;
/**
 * Token Contains
 *
 * Matches a RegExp within the current in-stream Token.
 *
 * **DOES NOT MODIFY**
 */
export declare function TokenNextWhitespace(regex: RegExp): boolean;
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
export declare function TokenRewind(start: number, regex: RegExp): boolean;
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
export declare function TokenCapture(regex: RegExp): boolean;
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
export declare function Cursor(location?: number): number;
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
export declare function Jump(n: number): number;
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
export declare function Prev(n?: number): number;
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
export declare function Advance(location: number, tokenize?: boolean): number;
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
export declare function GotoEnd(): number;
/**
 * Unless Previous Code Character
 *
 * Reverse of `IsPrevCodeChar` matching a code character
 * backwards but returning false if true and true if false.
 * Optionally pass a `step` number to move further back from
 * current index.
 *
 * **DOES NOT MODIFY**
 *
 * ---
 *
 * @param {number} [step=1]
 * How many steps backwards, defaults to `1`
 */
export declare function UnlessPrevCodeChar(char: number, step?: number): boolean;
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
export declare function IsPrevCodeChar(char: number, step?: number): boolean;
/**
 * Is Next Code Character
 *
 * Checks if the next character code is equal, but
 * does not modify position.
 *
 * **DOES NOT MODIFY**
 */
export declare function IsNextCodeChar(code: number): boolean;
/**
 * Current Code Character Truthy
 *
 * Checks the current character code at index matches
 * code passed in but does not modify position.
 *
 * **DOES NOT MODIFY**
 */
export declare function IsCodeChar(code: number): boolean;
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
export declare function GetCodeChar(at?: number): number;
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
export declare function GetChar(at?: number): string;
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
export declare function SkipQuotedString(consume?: number | number[] | true): boolean;
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
export declare function ConsumeUntil(regex: RegExp, tokenize?: boolean): boolean;
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
export declare function ConsumeUnless(regex: RegExp, unless: RegExp, tokenize?: boolean): boolean;
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
export declare function UntilSequence(regex: RegExp): number;
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
export declare function IfSequence(regex: RegExp, tokenize?: boolean): boolean;
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
 * this defaults to the current `offset` location offset.
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
 * ---
 */
export declare function ReverseWhitespace(from?: number): boolean;
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
export declare function SkipWhitespace(): boolean;
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
export declare function Whitespace(): boolean;
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
export declare function Newlines(): boolean;
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
export declare function IsPrevRegExp(regex: RegExp, reverse?: number): boolean;
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
export declare function IfRegExp(regex: RegExp): boolean;
/**
 * Matches a RegExp
 *
 * Executes an expression match from the current index
 *
 * **DOES NOT MODIFY**
 *
 */
export declare function IsRegExp(regex: RegExp): boolean;
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
export declare function IfCodeChar(code: number, tokenize?: boolean): boolean;
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
export declare function UntilCharCode(code: number): boolean;
