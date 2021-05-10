/* eslint one-var: ["error", { let: "never" } ] */

import { WSP, TAB, NWL, LFD, CAR, BWS } from '../lexical/characters'
import lineColumn from 'line-column'

/**
 * Stream
 *
 * Supplies methods to the parsing scanner. This is a heavily modified
 * variation and was lifted from the `vscode-html-languageservice` module.
 * The stream compiles tokens which you can grab via getters.
 *
 * @export
 * @see https://git.io/JJnqz
 */

export default (function Stream (string) {

  /**
   * Cursor Offset - used to consume strings
   *
   * @type {number}
   */
  let cursor = 0

  /**
   * Index Offset
   *
   * @type {number}
   */
  let index = 0

  /**
   * Source Text
   *
   * @type {string}
   */
  let source = string

  /**
   * Token Text
   *
   * @type {string}
   */
  let token

  /**
   * Token Clip
   *
   * @type {string}
   */
  let clip

  /**
   * Whitespace Counter
   *
   * @type {number}
   */
  let spaces

  /**
   * Source Text Length - (cached for optimization)
   *
   * @type {number}
   */
  let length = -1

  return {

    /* -------------------------------------------- */
    /* INITIALIZER                                  */
    /* -------------------------------------------- */

    create: string => Stream(string || ''),

    /* -------------------------------------------- */
    /* GETTERS / SETTERS                            */
    /* -------------------------------------------- */

    /**
     * End of Stream
     *
     * Checks to see if stream has reached end of string
     *
     * @memberof Stream
     * @returns {boolean}
     */
    get EOS () {

      return length <= index

    },

    /**
     * Offset
     *
     * Returns the current offset character position
     *
     * @memberof Stream
     * @returns {number}
     */
    get cursor () {

      return cursor

    },

    /**
     * Offset
     *
     * Returns the current offset character position
     *
     * @memberof Stream
     * @returns {number}
     */
    get offset () {

      return index

    },

    /**
     * Range
     *
     * Returns `start` and `end` range information
     *
     * @memberof Stream
     * @returns {Parser.Range}
     */
    get range () {

      return {
        start: this.Position(cursor),
        end: this.Position(index)
      }

    },

    /**
     * Get Token
     *
     * @memberof Stream
     * @returns {string}
     */
    get token () {

      return token

    },

    /**
     * Character Code
     *
     * @memberof Stream
     * @returns {number}
     */
    get code () {

      return this.source.charCodeAt(index)

    },

    /**
     * Get Token
     *
     * @memberof Stream
     * @returns {number}
     */
    get space () {

      return spaces

    },

    /**
     * Source Getter
     *
     * @memberof Stream
     * @returns {string}
     */
    get source () {

      return source

    },

    /**
     * Source Setter
     *
     * @memberof Stream
     */
    set source (text) {

      source = text
      length = text.length

    },

    /* -------------------------------------------- */
    /* TOKENIZERS                                   */
    /* -------------------------------------------- */

    /**
     * Get Token
     *
     * @memberof Stream
     * @param {number} from
     * @returns {string}
     */
    Token (from = undefined) {

      return from ? (token = this.source.substring(from, index)) : token

    },

    /**
     * Tokenize
     *
     * Updates the token value by substring offsets
     *
     * @memberof Stream
     * @param {number} [from] defaults to `cursor` offset
     * @param {number} [to] defaults to `index` offset
     * @returns {string}
     */
    Tokenize (from, to) {

      token = this.source.substring(from || cursor, to || index)

      return token

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
     *
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @returns {boolean}
     */
    IfTokenChar (code) {

      const exists = token.charCodeAt(0) === code

      if (exists) {
        token = token.substring(1)
        cursor = cursor + 1
        return true
      }

      return token.charCodeAt(0) === code

    },

    /**
     * Test the current Token in stream
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp|number} test
     * @returns {boolean}
     */
    TokenClip (test) {

      return typeof test === 'number'
        ? token.charCodeAt(0) === test
        : test.test(token)

    },

    /**
     * Test the current Token in stream
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp|number} test
     * @returns {boolean}
     */
    IsToken (test) {

      return typeof test === 'number'
        ? token.charCodeAt(0) === test
        : test.test(token)

    },

    /**
     * Matches a RegExp within the Token
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     * @see https://git.io/JJnqC
     */
    TokenContains (regex) {

      const match = token.match(regex)

      if (!match) return false

      // index += match.index + match[0].length - token.length
      // token = token.substring(0, match.index)

      return true

    },

    /* -------------------------------------------- */
    /* POSITIONS                                    */
    /* -------------------------------------------- */

    /**
     * Returns a cursor offset
     *
     * This provides an addition marker point in the stream.
     * It is used to track positions for tokens.
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @param {number} [offset]
     * Passing a value of `NaN` will reset cursor to `0` when
     * no value is passed, cursor will align with `index`
     *
     * @memberof Stream
     * @returns {number}
     */
    Cursor (offset = 0) {

      cursor = isNaN(offset)
        ? 0
        : offset > 0
          ? (offset + index)
          : offset < 0
            ? (index - Math.abs(offset))
            : offset > index
              ? offset
              : index

      return cursor

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
     * @memberof Stream
     * @returns {Parser.Location}
     */
    Position (offset = index) {

      const { line, col } = lineColumn(this.source).fromIndex(offset)

      return {
        line,
        character: col
      }

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
     * @memberof Stream
     * @returns {Parser.Range}
     */
    Range (start = cursor, end = index) {

      return {
        start: this.Position(start),
        end: this.Position(end)
      }

    },

    /**
     * Get Current Position
     *
     * If a number is passed, return value
     * will be added to current index, but will not be adjusted.
     *
     * **DOES NOT MODIFY**
     *
     * @memberof Stream
     * @param {number} [offset]
     * @returns {number}
     */
    Offset (offset = undefined) {

      return offset ? (index + offset) : index

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
     *
     * ---
     *
     * @memberof Stream
     * @param {number} n
     * @returns {number}
     */
    Jump (n) {

      if (n > length) return this.GotoEnd()

      return (index = n < 0 ? 0 : n)

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
     *
     * ---
     *
     * @memberof Stream
     * @param {number} [n=1]
     * @returns {number}
     */
    Prev (n = 1) {

      cursor = cursor - n
      index = index - n

      return index

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
     * @param {number} offset
     * @param {boolean} [tokenize=false]
     * @returns {number}
     */
    Advance (offset, tokenize = false) {

      index = index + offset

      if (tokenize) token = this.source.substring(cursor, index)

      return index

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
     *
     * ---
     *
     * @memberof Stream
     * @returns {number}
     */
    GotoEnd () {

      // reset stream position
      index = length
      cursor = index

      return length

    },

    /**
     * Previous Code Character
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     */
    IfPrevCodeChar (char) {

      return this.source.charCodeAt(index - 1) === char

    },

    /**
     * Next Code Character
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @returns {boolean}
     */
    IfNextCodeChar (code) {

      return this.source.charCodeAt(index + 1) === code

    },

    /**
     * Current Code Character Truthy
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @returns {boolean}
     */
    IsCodeChar (code) {

      return code === this.GetCodeChar()

    },

    /**
     * Get Code Character
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} [advance]
     * @returns {number}
     */
    GetCodeChar (advance = 0) {

      return this.source.charCodeAt(advance > index ? index + advance : index)

    },

    /**
     * Get Character
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} [advance]
     * @returns {string}
     */
    GetChar (advance = 0) {

      return this.source.charAt(advance > index ? advance : (index + advance))

    },

    /**
     * Get String
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} start
     * @param {number} [end]
     * @returns {string}
     */
    GetText (start, end = undefined) {

      // token = this.source.substring(start, end || index)

      return this.source.substring(start, end || index)

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
     * @param {number} n
     * The position offset, default is current stream position
     *
     * @param {number[]} [consume]
     * Custom characters to be consumed within the string
     *
     * @memberof Stream
     * @returns {boolean}
     */
    SkipQuotedString (n = index, consume = undefined) {

      if (!/^["']/.test(this.source.substring(n))) return false

      const offset = this.source.indexOf(this.source.charAt(n), n + 1)

      if (offset < 0) {
        index = this.Advance(1)
        return false
      }

      // consume escaped strings, eg: \" or \'
      if (this.GetCodeChar(offset - 1) === BWS) return this.SkipQuotedString(offset)

      // custom consumed character codes
      if (consume) {
        if (consume.includes(this.GetCodeChar(offset))) {
          return this.SkipQuotedString(offset)
        }
      }

      cursor = index
      index = offset + 1
      token = this.source.substring(n, offset + 1)

      return true

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
     * @memberof Stream
     * @param {RegExp} regex
     * @param {RegExp} unless
     * @param {boolean} tokenize
     * @returns {boolean}
     * @see https://git.io/JJnqn
     */
    ConsumeUnless (regex, unless, tokenize = true) {

      const match = this.source.substring(index).match(regex)

      if (match.index < 0) return false

      if (!unless.test(this.source.substring(index, this.Offset(match.index)))) {
        index = index + match.index
        cursor = cursor + token.length
        token = this.source.substring(cursor, index)
        return true
      }

      // this.advance(1)

      return false

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
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {NaN|number}
     * @see https://git.io/JJnqn
     */
    UntilSequence (regex) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) {
        this.GotoEnd()
        return NaN
      }

      cursor = index += match
      index = cursor

      return this.source.charCodeAt(index)

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
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @param {boolean} [tokenize=true]
     * @returns {(boolean)}
     * @see https://git.io/JJnqn
     */
    IfSequence (regex, tokenize = true) {

      const substring = this.source.substring(index)
      const match = substring.search(regex)

      if (match < 0) return false
      if (tokenize) token = substring.substring(0, match)

      cursor = index + match
      index = cursor

      return true

    },

    /**
     * While Character
     *
     * **MODIFIER**
     *
     * ---
     *
     * @memberof Stream
     * @param {function} condition
     * @returns {boolean}
     */
    WhileChar (condition) {

      const pos = index

      while (index < length && condition(this.source.charCodeAt(index))) index++

      if (pos < index) {
        spaces = index - pos
        return true
      }

      return false

    },

    /**
     * Skips all whitespace and newlines
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end
     *
     * ---
     *
     * @memberof Stream
     * @returns {boolean}
     * @see https://git.io/JJnq8
     */
    SkipWhitespace () {

      return this.WhileChar(charCode => (
        charCode === WSP ||
        charCode === TAB ||
        charCode === NWL ||
        charCode === LFD ||
        charCode === CAR
      ))

    },

    /**
     * Skip skipWhitespace
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end
     *
     * ---
     *
     * @memberof Stream
     * @returns {boolean}
     * @see https://git.io/JJnq8
     */
    Whitespace () {

      return this.WhileChar(charCode => (
        charCode === WSP ||
        charCode === TAB
      ))

    },

    /**
     * Skip Newlines
     *
     * **MODIFIER**
     *
     * > - `index` Moves to match end
     *
     * ---
     *
     * @memberof Stream
     * @returns {boolean}
     * @see https://git.io/JJnq8
     */
    Newlines () {

      return this.WhileChar(charCode => (
        charCode === NWL ||
        charCode === LFD ||
        charCode === CAR
      ))

    },

    /**
     * If previous characters were whitespace
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @param {number} [reverse=1]
     * The amount of steps to reverse from current index
     * @returns {boolean}
     * @see https://git.io/JJnq8
     */
    IsPrevRegExp (regex, reverse = 1) {

      return regex.test(this.source.substring(index - reverse, index))

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
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     * @see https://git.io/JJnqC
     */
    IfRegExp (regex) {

      const match = this.source.substring(index).match(regex)

      if (!match) return false

      cursor = index + match.index
      index = cursor + match[0].length
      token = match[0]

      return true

    },

    /**
     * Matches a RegExp
     *
     * WILL NOT MODIFY POSITION
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     * @see https://git.io/JJnqC
     */
    IsRegExp (regex) {

      return regex.test(this.source.substring(index))

    },

    /**
     * Advances Stream until a Regular Expression match is found
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `cursor` Moves to match start
     * > - `index` Moves to match end
     * > - `token` Match is tokenized
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @param {boolean} consume
     * @returns {string}
     * @see https://git.io/JJnqn
     */
    UntilRegExp (regex, consume = false) {

      const match = this.source.substring(index).match(regex)

      if (!match) {
        this.GotoEnd()
        return ''
      }

      cursor = index + match.index
      index = consume ? cursor + match[0].length : cursor
      token = match[0]

      return match[0]

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
     *
     * @memberof Stream
     * @param {number} code The character code number
     * @param {boolean} [tokenize=true]
     * @link https://git.io/JJnq3
     * @returns {boolean}
     */
    IfCodeChar (code, tokenize = true) {

      if (code === this.source.charCodeAt(index)) {
        if (tokenize) token = this.source.charAt(index)
        this.Cursor()
        this.Advance(1)
        return true
      }

      return false

    },

    /**
     * Each Code Character
     *
     * Converts and matches string sequence of character codes
     * starting from current index offset, increments index
     * by parameter list length.
     *
     * ---
     *
     * **MODIFIER**
     *
     * > - `cursor` Moves index before match
     * > - `index` Increments by value of array length
     * > - `token` Characters are tokenized
     *
     * ---
     *
     * @memberof Stream
     * @param {number[]} codes of character codes
     * @returns {boolean}
     * @see https://git.io/JJnqt
     */
    IfChars (codes) {

      if (codes.every((code, i) => code === this.GetCodeChar(index + i))) {

        cursor = index
        index += codes.length
        token = this.source.substring(cursor, index)

        return true

      }

      return false

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
     * > - `token` Tokenize until character (optional)
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @param {boolean} [tokenize=false]
     * @returns {boolean}
     * @see https://git.io/JJnqt
     */
    UntilChar (code, tokenize = false) {

      if (tokenize) cursor = index

      console.log(cursor)
      while (index < this.source.length) {

        if (this.source.charCodeAt(index) === code) {
          console.log(index)
          if (tokenize) token = this.source.substring(cursor, index)
          return true
        }

        this.Advance(1)

      }

      return false

    },

    /**
     * Each Code Character
     *
     * Converts and matches string sequence
     *
     * @memberof Stream
     * @param {string|number[]} string
     * @returns {boolean}
     */
    UntilChars (string, consume = false) {

      if (typeof string !== 'string') {
        string = string.reduce((s, c) => (s += String.fromCharCode(c)), '')
      }

      const offset = this.source.indexOf(string, index)

      if (offset >= 0) {
        this.Jump(consume ? offset + string.length : offset)
        return true
      }

      this.GotoEnd()
      return false

    }

  }

}(''))
