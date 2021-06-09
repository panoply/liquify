import { WSP, TAB, NWL, LFD, CAR, BWS } from 'lexical/characters';
import { Document } from 'tree/document';
import { Position } from 'vscode-languageserver-textdocument';

/**
 * Stream
 *
 * Supplies methods to the parsing scanner.
 * The stream compiles tokens which you can grab via getters.
 */
export const Stream = ((source: string) => {
  /**
   * Cursor Offset - used to consume strings
   */
  let cursor: number = 0;

  /**
   * Index Offset
   */
  let index: number = 0;

  /**
   * Token Text
   */
  let token: string;

  /**
   * Whitespace Counter
   */
  let spaces: number;

  /**
   * Source Text Length - (cached for optimization)
   */
  let length: number = -1;

  return {
    global: () => ({
      /**
       * Validates previous character code matches a
       * at specific offset location.
       */
      isCodeChar (code: number, offset: number): boolean {
        return source.charCodeAt(offset) === code;
      },

      /**
       * Validates previous character code matches a
       * at specific offset location.
       */
      isPrevCodeChar (code: number, offset: number): boolean {
        return this.isCodeChar(code, offset - 2);
      },

      /**
       * Validates next code matches a condition
       * at specific offset location.
       */
      isNextCodeChar (code: number, offset: number): boolean {
        return this.isCodeChar(code, offset + 1);
      },

      /**
       * Executes an expression test at specific
       * offset location.
       */
      isRegExp (regex: RegExp, [ start, end ]: [number, number]): boolean {
        return regex.test(source.substring(start, end));
      }
    }),

    /* -------------------------------------------- */
    /* INITIALIZER                                  */
    /* -------------------------------------------- */

    /**
     * Creates a stream
     *
     * All state lettings are reset.
     */
    create (): void {
      index = 0;
      cursor = 0;
      spaces = undefined;
      token = undefined;
      source = Document.textDocument.getText();
      length = source.length;
    },

    /* -------------------------------------------- */
    /* GETTERS / SETTERS                            */
    /* -------------------------------------------- */

    /**
     * End of Stream
     *
     * Checks to see if stream has reached end of string
     */
    get EOS (): boolean {
      return length <= index;
    },

    /**
     * Source Size
     *
     * Returns the the number of characters
     */
    get size (): number {
      return length;
    },

    /**
     * Offset
     *
     * Returns the current offset character position
     */
    get cursor (): number {
      return cursor;
    },

    /**
     * Get Token
     */
    get token (): string {
      return token;
    },

    /**
     * Source Getter
     */
    get source (): string {
      return source;
    },

    /* -------------------------------------------- */
    /* TOKENIZERS                                   */
    /* -------------------------------------------- */

    /**
     * Get Token
     */
    Token (from?: number): string {
      return from ? (token = source.substring(from, index)) : token;
    },

    /**
     * Tokenize
     *
     * Updates the token value by substring offsets
     */
    Tokenize (from?: number, to?: number): string {
      token = source.substring(from || cursor, to || index);

      return token;
    },

    /**
     * If Token Character
     *
     * Tests first character within token. Optionally will consume
     * the character if returns `true`
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `cursor` Incremented by a value of 1
     * > - `token` Newly matched token
     */
    IfTokenChar (code: number): boolean {
      const exists = token.charCodeAt(0) === code;

      if (exists) {
        token = token.substring(1);
        cursor = cursor + 1;
        return true;
      }

      return token.charCodeAt(0) === code;
    },

    /**
     * Token Clip
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `token` Matches token from start to search position
     *
     * ---
     *
     * @param {RegExp} [regex] Pass in an expression
     */
    Rewind (start: number, regex: RegExp): boolean {
      const string = source.substring(start, index);
      const end = string.search(regex);

      if (end < 0) return false;

      token = string.substring(0, end);

      return true;
    },

    /**
     * Captures and modifies the token
     */
    TokenCapture (regex: RegExp): boolean {
      const match = source.substring(index).match(regex);

      if (match === null) return false;

      token = match[0];

      return true;
    },

    /**
     * Test the current Token in stream
     *
     * **DOES NOT MODIFY**
     */
    IsToken (test: RegExp | number): boolean {
      return typeof test === 'number'
        ? token.charCodeAt(0) === test
        : test.test(token);
    },

    /**
     * Matches a RegExp within the Token
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @see https://git.io/JJnqC
     */
    TokenContains (regex: RegExp): boolean {
      const match = token.match(regex);

      if (!match) return false;

      // index += match.index + match[0].length - token.length
      // token = token.substring(0, match.index)

      return true;
    },

    /* -------------------------------------------- */
    /* POSITIONS                                    */
    /* -------------------------------------------- */

    /**
     * Get spacing count
     */
    Spaces (): number {
      return spaces;
    },

    /**
     * Offset
     *
     * Returns the current offset character position
     */
    Offset (): number {
      return index;
    },

    /**
     * Returns a cursor offset
     *
     * This provides an addition marker point in the stream.
     * It is used to track positions for tokens.
     *
     * **MODIFIER**
     *
     * > - `cursor` Adjusts cursor offset
     *
     *
     * ---
     *
     * @param {number} [offset]
     * Passing a value of `NaN` will reset cursor to `0` when
     * no value is passed, cursor will align with `index`
     */
    Cursor (offset: number = index): number {
      cursor = isNaN(offset) ? 0 : offset >= 0 ? offset : index;

      return cursor;
    },

    /**
     * Offset From Position
     *
     * Accepts a TextDocument position and returns
     * an offset via LineColumn.
     *
     * **DOES NOT MODIFY**
     */
    OffsetFromPosition (position: Position): number {
      return Document.textDocument.offsetAt(position);
    },

    /**
     * Position
     *
     * Returns `line` and `character` range information.
     * Line and Column offset Positions are using a `0`
     * zero-based offset.
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @param {number} [offset] defaults to index
     */
    Position (offset: number = index): Position {
      return Document.textDocument.positionAt(offset);
    },

    /**
     * Range
     *
     * Returns `start` and `end` range information
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @param {number} [start] defaults to cursor
     * @param {number} [end] defaults to current index
     */
    Range (start: number = cursor, end: number = index): Parser.Range {
      return {
        start: Document.textDocument.positionAt(start),
        end: Document.textDocument.positionAt(end)
      };
    },

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
     * > - `index` Moves to new offset
     * > - `cursor` Aligns with Index
     * ---
     */
    Jump (n: number): number {
      if (n > length) return this.GotoEnd();

      index = n < 0 ? 0 : n;
      cursor = index;

      return index;
    },

    /**
     * Previous position
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `index` Decrements value by `1`
     * > - `cursor`Decrements value by `1`
     */
    Prev (n: number = 1) {
      cursor = cursor - n;
      index = index - n;

      return index;
    },

    /**
     * Next Position
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `index` Moves to new offset
     * > - `token` Character is tokenized (optional)
     *
     * ---
     *
     * @param {boolean} [tokenize=false]
     * Whether to tokenize the advancements. Defaults to `false`
     */
    Advance (offset: number, tokenize: boolean = false): number {
      index = index + offset;

      if (tokenize) token = source.substring(cursor, index);
      return index;
    },

    /**
     * Goto End Position
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `cursor` Moves to end of stream
     * > - `index` Moves to end of stream
     */
    GotoEnd (): number {
      // reset stream position
      index = length;
      cursor = index;

      return length;
    },

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
    IsPrevCodeChar (char: number, step: number = 1): boolean {
      return source.charCodeAt(index - step) === char;
    },

    /**
     * Is Next Code Character
     *
     * Checks if the next character code is equal, but
     * does not modify position.
     *
     * **DOES NOT MODIFY**
     */
    IsNextCodeChar (code: number): boolean {
      return source.charCodeAt(index + 1) === code;
    },

    /**
     * If Next Regex Expression
     *
     * Executes an expression match from current index
     * but does not modify position
     *
     * **DOES NOT MODIFY**
     */
    IsNextRegExp (regex: RegExp): boolean {
      return regex.test(source.substring(index));
    },

    /**
     * Current Code Character Truthy
     *
     * Checks the current character code at index matches
     * code passed in but does not modify position.
     *
     * **DOES NOT MODIFY**
     */
    IsCodeChar (code: number): boolean {
      return code === this.GetCodeChar();
    },

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
    GetCodeChar (at?: number): number {
      return source.charCodeAt(at || index);
    },

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
    GetChar (at?: number): string {
      return source.charAt(at || index);
    },

    /**
     * Get Text
     *
     * Returns text string at offset locations. You can optionally
     * provide an `end` offset index, when non is provided, current
     * index position is used. So treat the `start` param as a backtrack
     * position.
     *
     * **DOES NOT MODIFY**
     *
     */
    GetText (start: number, end?: number): string {
      return source.substring(start, end || index);
    },

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
     * > - `index` Moves to end of match (after quote)
     * > - `token` Match is Tokenized (without quotes)
     *
     * ---
     *
     * @param {number[]|true} [consume]
     * Custom characters to be consumed within the string.
     * Passing `true` will consume quotations, default to `undefined` so
     * quotations are not consumed and included in token.
     */
    SkipQuotedString (consume?: number[] | true): boolean {
      const n = index;

      if (!/^["']/.test(source.substring(n))) return false;

      const offset = source.indexOf(source.charAt(n), n + 1);

      if (offset < 0) {
        index = this.Advance(1);
        return false;
      }

      // consume escaped strings, eg: \" or \'
      if (this.GetCodeChar(offset - 1) === BWS) { return this.SkipQuotedString(offset); }

      // custom consumed character codes
      if (typeof consume !== 'undefined' && typeof consume !== 'boolean') {
        if (consume.indexOf(this.GetCodeChar(offset)) !== -1) {
          return this.SkipQuotedString(offset);
        }
      }

      cursor = index;
      index = offset + 1;
      token =
        consume === true
          ? source.substring(n + 1, offset)
          : source.substring(n, index);

      return true;
    },

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
     * > - `index` Moves to position before matched index
     * > - `token` Optionally tokenize the match
     */
    ConsumeUntil (regex: RegExp, tokenize?: boolean): boolean {
      const match = source.substring(index).search(regex);

      if (match === null || match < 0) return false;

      cursor = index;
      index = index + match;

      if (tokenize) token = source.substring(cursor, index);

      return true;
    },

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
     * > - `index` Moves to new match index
     * > - `token` Match is tokenized from current to new index
     *
     * ---
     *
     * @param {boolean} [tokenize]
     * By default, this is `true` and the consumption is tokenized
     */
    ConsumeUnless (
      regex: RegExp,
      unless: RegExp,
      tokenize: boolean = true
    ): boolean {
      const match = source.substring(index).match(regex);

      if (match.index < 0) return false;

      if (!unless.test(source.substring(index, index + match.index))) {
        index = index + match.index;

        if (tokenize) {
          cursor = cursor + token.length;
          token = source.substring(cursor, index);
        }

        return true;
      }

      return false;
    },

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
     * > - `index` Moves to match index (cursor is aligned)
     *
     * ---
     *
     * @returns {NaN|number}
     * If match is `-1` the stream will move to end and return `NaN`
     */
    UntilSequence (regex: RegExp): number {
      const match = source.substring(index).search(regex);

      if (match < 0) {
        this.GotoEnd();
        return NaN;
      }

      cursor = index += match;
      index = cursor;

      return source.charCodeAt(index);
    },

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
     * > - `index` Moves to match index (cursor is aligned)
     * > - `token` Character is tokenized (optional)
     *
     * ---

     * @param {boolean} [tokenize=true]
     * By default, this is `true` and the consumption is tokenized
     */
    IfSequence (regex: RegExp, tokenize: boolean = true): boolean {
      const substring = source.substring(index);
      const match = substring.search(regex);

      if (match < 0) return false;
      if (tokenize) token = substring.substring(0, match);

      cursor = index + match;
      index = cursor;

      return true;
    },

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
    WhileChar (condition: Function): boolean {
      const pos = index;

      while (index < length && condition(source.charCodeAt(index))) index++;

      if (pos < index) {
        spaces = index - pos;
        return true;
      }

      return false;
    },

    /**
     * Skips all whitespace and newlines
     *
     * This shortcuts to `WhileChar` function, it checks for all
     * whitespace character codes, this includes newlines.
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end via `whileChar`
     * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
     */
    SkipWhitespace (): boolean {
      return this.WhileChar(
        (charCode: number) =>
          charCode === WSP ||
          charCode === TAB ||
          charCode === NWL ||
          charCode === LFD ||
          charCode === CAR
      );
    },

    /**
     * Skip skipWhitespace
     *
     * This shortcuts to `WhileChar` function, it checks for all
     * whitespace character codes only.
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end
     * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
     *
     */
    Whitespace (): boolean {
      return this.WhileChar(
        (charCode: number) => charCode === WSP || charCode === TAB
      );
    },

    /**
     * Skip Newlines
     *
     * This shortcuts to `WhileChar` function, it checks for all
     * newline character codes only.
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end
     * > - `spaces` Spaces is adjusted (see @todo in `WhileChar`)
     *
     */
    Newlines (): boolean {
      return this.WhileChar(
        (charCode: number) =>
          charCode === NWL || charCode === LFD || charCode === CAR
      );
    },

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
    IsPrevRegExp (regex: RegExp, reverse: number = 1): boolean {
      return regex.test(source.substring(index - reverse, index));
    },

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
     * > - `index` Moves to match end
     * > - `token`  Character is tokenized
     */
    IfRegExp (regex: RegExp): boolean {
      const match = source.substring(index).match(regex);

      if (!match) return false;

      cursor = index + match.index;
      index = cursor + match[0].length;
      token = match[0];

      return true;
    },

    /**
     * Matches a RegExp
     *
     * Executes an expression match from the current index
     *
     * **DOES NOT MODIFY**
     *
     */
    IsRegExp (regex: RegExp): boolean {
      return regex.test(source.substring(index));
    },

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
     * > - `index`  Increments by `1`
     * > - `token`  Character is tokenized (optional)
     *
     * ---
     * @param {boolean} [tokenize=true]
     * By default this is `true` and the character is tokenized
     */
    IfCodeChar (code: number, tokenize: boolean = true): boolean {
      if (code === source.charCodeAt(index)) {
        if (tokenize) token = source.charAt(index);
        this.Cursor();
        this.Advance(1);
        return true;
      }

      return false;
    },

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
     * > - `index` Moves to offset before match
     */
    UntilCharCode (code: number): boolean {
      while (index < source.length) {
        if (source.charCodeAt(index) === code) return true;
        this.Advance(1);
      }

      return false;
    }
  };
})(null);
