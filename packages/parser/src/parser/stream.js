import lineColumn from 'line-column'
import { WSP, TAB, NWL, LFD, CAR, BWS } from 'lexical/characters'

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

export default (function Stream (source) {

  /**
   * Lines Counter
   *
   * @type {Parser.LineColumn}
   */
  let range

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
   * Token Text
   *
   * @type {string}
   */
  let token

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

    create: string => {

      index = 0
      cursor = 0
      spaces = undefined
      token = undefined
      source = string
      range = lineColumn(source, { origin: 0 })
      length = source.length

    },

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
    get EOS () { return length <= index },

    /**
     * Offset
     *
     * Returns the current offset character position
     *
     * @memberof Stream
     * @returns {number}
     */
    get cursor () { return cursor },

    /**
     * Offset
     *
     * Returns the current offset character position
     *
     * @memberof Stream
     * @returns {number}
     */
    get offset () { return index },

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
    get token () { return token },

    /**
     * Character Code
     *
     * @memberof Stream
     * @returns {number}
     */
    get code () { return source.charCodeAt(index) },

    /**
     * Get spacing count
     *
     * @memberof Stream
     * @returns {number}
     */
    get spaces () { return spaces },

    /**
     * Source Getter
     *
     * @memberof Stream
     * @returns {string}
     */
    get source () { return source },

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

      return from ? (token = source.substring(from, index)) : token

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

      token = source.substring(from || cursor, to || index)

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
     * @memberof Stream
     * @param {number} [n=1]
     * @returns {boolean}
     */
    Rewind (start, regex) {

      const string = source.substring(start, index)
      const end = string.search(regex)

      if (end < 0) return false

      token = string.substring(0, end)

      return true

    },

    /**
     * Captures and modifies the token
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     */
    TokenCapture (regex) {

      const match = source.substring(index).match(regex)

      if (match === null) return false

      token = match[0]

      return true

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

      cursor = isNaN(offset) ? 0 : offset > 0
        ? (offset + index) : offset < 0 ? (index - Math.abs(offset))
          : offset > index ? offset : index

      return cursor

    },

    /**
     * Offset From Position
     *
     * Accepts a TextDocument position and returns
     * an offset via LineColumn.
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @param {Parser.Location} position defaults to index
     * @memberof Stream
     * @returns {number}
     */
    OffsetFromPosition (position) {

      return range.toIndex({
        column: position.character,
        line: position.line
      })

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

      const { line, col } = range.fromIndex(offset)

      return {
        line: line,
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

    /* -------------------------------------------- */
    /* SOURCE QUERIES                               */
    /* -------------------------------------------- */

    /**
     * Validates character code matches a condition
     * at specific offset position
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @param {number} offset
     * @returns {boolean}
     */
    CodeCharAt (code, offset) {

      return source.charCodeAt(offset) === code

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
     *
     * @memberof Stream
     * @param {number} n
     * @returns {number}
     */
    Jump (n) {

      if (n > length) return this.GotoEnd()

      index = n < 0 ? 0 : n
      cursor = index

      return index

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

      if (tokenize) token = source.substring(cursor, index)

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
     * Matches a code character backwards.
     * Optionally pass a `step` number to move further
     * back from current index. Default to `1`
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} char
     * @param {number} [step=1]
     * @returns {boolean}
     */
    IfPrevCodeChar (char, step = 1) {

      return source.charCodeAt(index - step) === char

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

      return source.charCodeAt(index + 1) === code

    },

    /**
     * If Next Regex Expression
     *
     * **DOES NOT MODIFY**
     *
     * ---
     *
     * @memberof Stream
     * @param {number} code
     * @returns {boolean}
     */
    IfNextRegExp (regex) {

      return regex.test(source.substring(index))

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

      return source.charCodeAt(advance > index ? index + advance : index)

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

      return source.charAt(advance > index ? advance : (index + advance))

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

      // token = source.substring(start, end || index)

      return source.substring(start, end || index)

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
     * Passing `true` will consume quotations
     *
     * @param {number} n
     * The position offset, default is current stream position
     *
     * @memberof Stream
     * @returns {boolean}
     */
    SkipQuotedString (consume = undefined, n = index) {

      if (!/^["']/.test(source.substring(n))) return false

      const offset = source.indexOf(source.charAt(n), n + 1)

      if (offset < 0) {
        index = this.Advance(1)
        return false
      }

      // consume escaped strings, eg: \" or \'
      if (this.GetCodeChar(offset - 1) === BWS) return this.SkipQuotedString([ offset ])

      // custom consumed character codes
      if (typeof consume !== 'undefined' && typeof consume !== 'boolean') {
        if (consume.includes(this.GetCodeChar(offset))) {
          return this.SkipQuotedString(offset)
        }
      }

      cursor = index
      index = offset + 1
      token = consume === true
        ? source.substring(n + 1, offset)
        : source.substring(n, index)

      return true

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
     * > - `token` Match is tokenized from current to new index
     *
     * ---
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @param {RegExp} [unless]
     * @param {boolean} tokenize
     * @returns {boolean}
     * @see https://git.io/JJnqn
     */
    ConsumeUntil (regex, unless = undefined) {

      const match = source.substring(index).search(regex)

      if (match === null) return false

      if (match < 0) return false

      if (!unless.test(source.substring(index, index + match))) {
        index = index + match

        cursor = cursor + token.length
        token = source.substring(cursor, index)

        return true
      }

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

      const match = source.substring(index).match(regex)

      if (match.index < 0) return false

      if (!unless.test(source.substring(index, index + match.index))) {
        index = index + match.index

        if (tokenize) {
          cursor = cursor + token.length
          token = source.substring(cursor, index)
        }

        return true
      }

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

      const match = source.substring(index).search(regex)

      if (match < 0) {
        this.GotoEnd()
        return NaN
      }

      cursor = index += match
      index = cursor

      return source.charCodeAt(index)

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

      const substring = source.substring(index)
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

      while (index < length && condition(source.charCodeAt(index))) index++

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

      return regex.test(source.substring(index - reverse, index))

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

      const match = source.substring(index).match(regex)

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

      return regex.test(source.substring(index))

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

      const match = source.substring(index).match(regex)

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

      if (code === source.charCodeAt(index)) {
        if (tokenize) token = source.charAt(index)
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
        token = source.substring(cursor, index)

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
    UntilChar (code) {

      while (index < source.length) {
        if (source.charCodeAt(index) === code) return true
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

      const offset = source.indexOf(string, index)

      if (offset >= 0) {
        this.Jump(consume ? offset + string.length : offset)
        return true
      }

      this.GotoEnd()
      return false

    }

  }

}(''))
