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
  let token = ''

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
     * @memberof Stream
     * @returns {boolean}
     */
    get EOS () {

      return length <= index

    },

    get token () {

      return token

    },

    get location () {

      return {
        line: this.source.substring(0, index).split(/[\n\r\f]/).length - 1,
        character: this.source.substring(index).length
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
    jump (n) {

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
    prev (n = 1) {

      return (index -= n)

    },

    /**
     * Next Position
     *
     * WILL MODIFY POSITION
     *
     * @param {number} n
     * @returns {number}
     */
    advance (n) {

      return (index += n)

    },

    /**
     * Goto Position
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} n
     * @returns {number}
     */
    goto (n) {

      if (n > length) return this.gotoEnd()

      return (index = n)

    },

    /**
     * Goto End Position
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @returns {number}
     */
    gotoEnd () {

      // reset stream position
      index = length

      return length

    },

    /**
     * Previous Code Character
     *
     * WILL NOT MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     */
    prevCodeChar (char) {

      return this.source.charCodeAt(index - 1) === char

    },

    /**
     * Next Code Character
     *
     * WILL NOT MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     */
    nextCodeChar (char) {

      return this.source.charCodeAt(index + 1) === char

    },

    /**
     * Current Code Character Truthy
     *
     * @memberof Stream
     * @param {number|number[]} char
     * @param {number} from
     * @returns {boolean}
     */
    isCodeChar (char, from = index) {

      return typeof char === 'number'
        ? char === this.getCodeChar(from)
        : char.includes(this.getCodeChar(from))
    },

    /**
     * Get Current Position - If a number is passed, return value
     * will be added to current index, but will not be adjusted.
     *
     * WILL NOT MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {number}
     */
    position (n = undefined) {

      return n ? (index + n) : index

    },

    /**
     * Get Code Character
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {number}
     */
    getCodeChar (n = undefined) {

      return this.source.charCodeAt(n || index)

    },

    /**
     * Get Character
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {string}
     */
    getChar (n = undefined) {

      return this.source.charAt(n || index)

    },

    /**
     * Get String
     *
     * @memberof Stream
     * @param {number} start
     * @param {number} [end]
     * @returns {string}
     */
    getText (start, end = undefined) {

      const name = this.source.substring(start, end || this.position())

      if (name.slice(0, 3) === 'end') return name.substring(3)

      return name

    },

    /**
     * Skip String - Consumes a string value between 2 quotes
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} n
     * @param {number[]} [consume]
     * @returns {boolean}
     */
    skipQuotedString (n = index, consume = undefined) {

      if (!this.isCodeChar([ DQO, SQO ], n)) return false

      const offset = this.source.indexOf(this.source.charAt(n), n + 1)

      if (!offset) return false

      // consume escaped strings, eg: \" or \'
      if (this.getCodeChar(offset - 1) === BWS) return this.skipQuotedString(offset)

      // custom consumed character codes
      if (consume && consume.includes(this.getCodeChar(offset))) {
        return this.skipQuotedString(offset)
      }

      this.jump(offset + 1)

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
    skipWhitespace () {

      return this.advanceWhileChar(c => (
        c === WSP ||
        c === TAB ||
        c === NWL ||
        c === LFD ||
        c === CAR
      )) > 0

    },

    isValidToken (regex) {

      return regex.test(token)

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
    advanceUnless (regex, unless) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) return false

      if (!unless.test(this.source.substring(index, this.position(match)))) {
        this.advance(match)
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
    advanceSequence (regex) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) {
        this.gotoEnd()
        return NaN
      }

      return this.source.charCodeAt(this.advance(match))

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
    advanceIfSequence (regex) {

      const match = this.source.substring(index).search(regex)

      if (match < 0) return false

      this.advance(match)

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
    advanceWhileChar (condition) {

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
    advanceIfRegExp (regex) {

      const match = this.source.substring(index).match(regex)

      if (!match) return false

      index += match.index + match[0].length
      token = match[0]

      return true

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
    advanceUntilRegExp (regex, consume = false) {

      const match = this.source.substring(index).match(regex)

      if (!match) {
        this.gotoEnd()
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
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     * @see https://git.io/JJnq3
     */
    advanceIfChar (char, next = false) {

      // console.log(index, char, text.charAt(index + 1))
      if (char === this.source.charCodeAt(next ? index + 1 : index)) {
        this.advance(next ? 2 : 1)
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
    advanceIfChars (codes) {

      if (codes.every((c, i) => c === this.getCodeChar(index + i))) {

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
    advanceUntilChar (char) {

      while (index < this.source.length) {
        if (this.source.charCodeAt(index) === char) return true
        this.advance(1)
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
    advanceUntilChars (string, consume = false) {

      if (typeof string !== 'string') {
        string = string.reduce((s, c) => (s += String.fromCharCode(c)), '')
      }

      const offset = this.source.indexOf(string, index)

      if (offset >= 0) {
        this.jump(consume ? offset + string.length : offset)
        return true
      }

      this.gotoEnd()
      return false

    }

  }

}(''))
