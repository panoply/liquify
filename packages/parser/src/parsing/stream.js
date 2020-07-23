/* eslint one-var: ["error", { let: "never" } ] */

import { WSP, TAB, NWL, LFD, CAR, BWS, SQO, DQO } from '../lexical/characters'

/**
 * Stream
 *
 * Supplies methods to the parsing scanner. This is a modified variation
 * and was lifted from the `vscode-html-languageservice` module.
 *
 * @export
 * @see https://git.io/JJnqz
 */

export default (function () {

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
  let source = ''

  return new class Stream {

    /* -------------------------------------------- */
    /*                 GETTER/SETTER                */
    /* -------------------------------------------- */

    /**
     * Source Getter
     *
     * @memberof Stream
     * @returns {string}
     */
    get source () {

      return source
    }

    /**
     * Source Setter
     *
     * @memberof Stream
     */
    set source (text) {

      source = text

    }

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
    offset (n) {

      return (index = n < 0 ? 0 : n)

    }

    /**
     * End of Stream
     *
     * @memberof Stream
     * @returns {boolean}
     */
    eos () {

      return (this.source.length <= index)

    }

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

    }

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

    }

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

      return (index = n)

    }

    /**
     * Goto End Position
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @returns {number}
     */
    gotoEnd () {

      return (index = this.source.length)

    }

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

    }

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

    }

    /**
     * Current Code Character Truthy
     *
     * @memberof Stream
     * @param {number} char
     * @returns {boolean}
     */
    isCodeChar (char) {

      return this.source.charCodeAt(index) === char

    }

    /**
     * Get Current Position - If a number is passed, return value
     * will be added to current index, but index will not be adjusted.
     *
     * WILL NOT MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {number}
     */
    position (n = undefined) {

      return n ? (index + n) : index

    }

    /**
     * Get Code Character
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {number}
     */
    getCodeChar (n = undefined) {

      return this.source.charCodeAt(n || index)

    }

    /**
     * Get Character
     *
     * @memberof Stream
     * @param {number} [n]
     * @returns {string}
     */
    getChar (n = undefined) {

      return this.source.charAt(n || index)

    }

    /**
     * Get String
     *
     * @memberof Stream
     * @param {number} start
     * @param {number} [end]
     * @returns {string}
     */
    getText (start, end = undefined) {

      return this.source.substring(start, end || index)

    }

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

      while (
        index < this.source.length &&
        condition(this.source.charCodeAt(index))
      ) index++

      return index - pos

    }

    /**
     * Skip String - Consumes a string value between 2 quotes
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @param {number} n
     * @param {number[]} [consume]
     * @returns {(number|false)}
     */
    skipString (n, consume = undefined) {

      const offset = this.source.indexOf(this.source.charAt(n), n + 1)

      if (!offset) return false
      // consume escaped strings, eg: \" or \'
      if (this.getCodeChar(offset - 1) === BWS) return this.skipString(offset)
      // custom consumed character codes
      if (consume && consume.includes(this.getCodeChar(offset))) return this.skipString(offset)

      return this.offset(offset)

    }

    /**
     * Skip Whitespace
     *
     * WILL MODIFY POSITION
     *
     * @memberof Stream
     * @returns {number}
     * @see https://git.io/JJnq8
     */
    whitespace () {

      return this.advanceWhileChar(c => (
        c === WSP ||
        c === TAB ||
        c === NWL ||
        c === LFD ||
        c === CAR
      ))

    }

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
      // token = match[0]

      return true

    }

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

    }

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
        if (this.source.charCodeAt(index) !== char) index++
        return true
      }

      return false

    }

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

    }

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

    }

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

        this.offset(consume ? offset + string.length : offset)

        return true

      }

      this.gotoEnd()

      return false

    }

  }()

})()
