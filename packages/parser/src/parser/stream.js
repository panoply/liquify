/* eslint one-var: ["error", { let: "never" } ] */

import { WSP, TAB, NWL, LFD, CAR, BWS, DQO, SQO } from '../lexical/characters'

/**
 * Stream
 *
 * Supplies methods to the parsing scanner. This is a modified variation
 * and was lifted from the `vscode-html-languageservice` module.
 *
 * @export
 * @see https://git.io/JJnqz
 */

export default (function Stream (string) {

  /**
   * Index Offset
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
   * Source Text Length - (cached for optimisation)
   *
   * @type {number}
   */
  let length = -1

  return {

    create: string => Stream(string || ''),

    /* -------------------------------------------- */
    /*               GETTERS / SETTERS              */
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
     * Range
     *
     * Returns `start` and `end` range information
     *
     * @memberof Stream
     * @returns {object}
     */
    get range () {

      const line = this.source.substring(0, index).split(/[\n\r\f]/).length - 1
      const character = this.source.substring(index).search(/[\n\r\f]/)

      return {
        start: {
          line,
          character: this.source.substring(character).length - 1
        },
        end: {
          line: 0,
          character: 0
        }
      }

    },

    /**
     * Range
     *
     * Returns `start` and `end` range information
     *
     * @memberof Stream
     * @returns {object}
     */
    get location () {

      const line = this.source.substring(0, index).split(/[\n\r\f]/).length - 1
      const character = this.source.substring(index).search(/[\n\r\f]/)
      return {
        line,
        character: this.source.substring(character).length - 1
      }

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

    Cursor (n = 0) {

      cursor = n + index

      return cursor

    },

    /**
     * Range
     *
     * Returns `start` and `end` range information
     *
     * @param {number} start
     * @param {number} end
     * @memberof Stream
     * @returns {object}
     */
    Range (start, end = 0) {

      return {
        start: {
          line: 0,
          character: start
        },
        end: {
          line: 0,
          character: end
        }
      }

    },

    /**
     * Get Token
     *
     * @memberof Stream
     * @param {number} from
     * @returns {string}
     */
    Token (from = undefined) {

      return from ? (token = this.source.substring(from)) : token

    },

    /**
     * Matches a RegExp
     *
     * WILL NOT MODIFY POSITION
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     * @see https://git.io/JJnqC
     */
    TokenContains (regex) {

      const match = token.match(regex)

      if (!match) return false

      index += match.index + match[0].length - token.length
      token = token.substring(0, match.index)

      return true

    },

    /* -------------------------------------------- */
    /*                   FUNCTIONS                  */
    /* -------------------------------------------- */

    /**
     * Goto Offset Position
     *
     * WILL MODIFY POSITION
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
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} [n=1]
     * @returns {number}
     */
    Prev (n = 1) {

      return (index -= n)

    },

    /**
     * Next Position
     *
     * WILL MODIFY POSITION
     *
     * @param {number} offset
     * @returns {number}
     */
    Advance (offset) {

      return (index += offset)

    },

    /**
     * Goto End Position
     *
     * WILL MODIFY POSITION
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
     * WILL NOT MODIFY OFFSET POSITION
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
     * WILL NOT MODIFY OFFSET POSITION
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
     * @memberof Stream
     * @param {number} code
     * @returns {boolean}
     */
    IsCodeChar (code) {

      return code === this.GetCodeChar()

    },

    /**
     * Get Current Position
     *
     * If a number is passed, return value
     * will be added to current index, but will not be adjusted.
     *
     * WILL NOT MODIFY OFFSET POSITION
     *
     * @memberof Stream
     * @param {number} [offset]
     * @returns {number}
     */
    Offset (offset = undefined) {

      return offset ? (index + offset) : index

    },

    /**
     * Get Code Character
     *
     * @memberof Stream
     * @param {number} [advance]
     * @returns {number}
     */
    GetCodeChar (advance = 0) {

      return this.source.charCodeAt(advance > index ? index + advance : advance)

    },

    /**
     * Get Character
     *
     * @memberof Stream
     * @param {number} [advance]
     * @returns {string}
     */
    GetChar (advance = 0) {

      return this.source.charAt(advance > index ? index + advance : advance)

    },

    /**
     * Get String
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
     * Consumes a string value between 2 quotes
     *
     * WILL MODIFIES POSITION
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

      index = offset + 1
      token = this.source.substring(n + 1, offset)

      return true

    },

    /**
     * Skip skipWhitespace
     *
     * WILL MODIFY POSITION
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
      )) > 0

    },

    /**
     * Advances Stream until a Regular Expression match is found
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @param {RegExp} unless
     * @returns {boolean}
     * @see https://git.io/JJnqn
     */
    ConsumeUnless (regex, unless) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) return false

      if (!unless.test(this.source.substring(index, this.Offset(match)))) {
        // console.log(this.source.substring(index), match)

        this.Advance(match)
        return true
      }

      // this.advance(1)
      return false

    },

    /**
     * Advances Stream until a Regular Expression match is found
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {(NaN|number)}
     * @see https://git.io/JJnqn
     */
    UntilSequence (regex) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) {
        this.GotoEnd()
        return NaN
      }

      return this.source.charCodeAt(index += match)

    },

    /**
     * Advances Stream until a Regular Expression match is found
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {(boolean)}
     * @see https://git.io/JJnqn
     */
    IfSequence (regex) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) return false

      this.Advance(match)

      return true

    },

    /**
     * While Character
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {function} condition
     * @returns {number}
     */
    WhileChar (condition) {

      const pos = index

      while (index < length && condition(this.source.charCodeAt(index))) index++

      return index - pos

    },

    /**
     * Advances Stream when Regular Expression finds a match
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {RegExp} regex
     * @returns {boolean}
     * @see https://git.io/JJnqC
     */
    IfRegExp (regex) {

      const match = this.source.substring(index).match(regex)

      if (!match) return false

      index += match.index + match[0].length
      token = match[0]

      return true

    },

    /**
     * Matches a RegExp
     *
     * WILL NOT MODIFY POSITION
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
     * WILL MODIFY POSITION
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

      index = index + (
        consume
          ? match.index + match[0].length + 1
          : match.index
      )

      return match[0]

    },

    /**
     * Advances Stream until a single matching Character Code is found
     *
     * WILL MODIFY POSITION BY 1
     *
     * @memberof Stream
     *
     * @param {number} code
     * The character code number
     *
     * @param {boolean} [tokenize=true]
     * Defaults to `true` wherin matched character is
     * applied to `token`
     *
     * @link https://git.io/JJnq3
     * @returns {boolean}
     */
    IfCodeChar (code, tokenize = true) {

      if (code === this.source.charCodeAt(index)) {
        if (tokenize) token = this.source.charAt(index)
        this.Advance(1)
        return true
      }

      return false

    },

    /**
     * Each Code Character - Converts and match string sequence
     *
     * @memberof Stream
     * @param {number[]} codes
     * @returns {boolean}
     * @see https://git.io/JJnqt
     */
    IfChars (codes) {

      if (codes.every((c, i) => c === this.GetCodeChar(index + i))) {

        index += codes.length

        return true

      }

      return false

    },

    /**
     * Advances Stream until a single matching Character Code is found
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     * @see https://git.io/JJnqt
     */
    UntilChar (char) {

      while (index < this.source.length) {
        if (this.source.charCodeAt(index) === char) return true
        this.Advance(1)
      }

      return false

    },

    /**
     * Each Code Character - Converts and match string sequence
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
