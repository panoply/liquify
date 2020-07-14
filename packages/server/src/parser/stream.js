import {
  WSP, TAB, NWL, LFD, CAR, FWS, BWS, DQO, SQO, RAN, LAN
} from './lexical/characters'

/**
 * Contents Stream - Supplies methods to the parsing scanner
 *
 * @export
 * @param {Document.Scope} text
 * @returns
 */
export function Stream ({ textDocument }) {

  /**
   * Position Offset
   *
   * @type {number}
   */
  let index = 0

  /**
   * Source Text
   *
   * @type {string}
   */
  const txt = textDocument.getText()

  /**
   * Text Length (cache)
   *
   * @type {number}
   */
  const len = txt.length

  /**
   * Returned function methods
   *
   * @type {object}
   */
  const methods = {
    regex
    , prev
    , next
    , eos
    , goto
    , gotoChar
    , gotoEnd
    , getPosition
    , getSource
    , getText
    , getCodeChar
    , prevCodeChar
    , nextCodeChar
    , isCodeChar
    , nextRegex
    , eachCodeChar
    , whileChar
    , skipString
    , whitespace
    , forward
  }

  /**
   * Previous position
   *
   * @param {number} [n=1]
   */
  function prev (n = 1) {

    index -= n

    return index

  }

  /**
   * Next Position
   *
   * @param {number} [n=1]
   */
  function next (n = 1) {

    index += n

    return index

  }

  /**
   * Regex Expression Match
   *
   * @param {RegExp} exp
   * @returns {(string|false)}
   */
  function regex (exp, run = 0) {

    if (run > 0) goto(run)

    const tag = txt.substring(index).match(exp)

    // console.log('REGEX', tag)

    if (!tag) return ''

    index += tag.index + tag[0].length

    return tag[0]

  }

  /**
   * Regex Expression Match
   *
   * @param {RegExp} exp
   * @returns {(number|false)}
   */
  function nextRegex (exp) {

    const find = txt.substring(index).search(exp)

    if (!find) return getPosition()

    index += find

    return index

  }

  /**
   * End of Stream
   *
   * @returns {boolean}
   */
  function eos (pos) {

    return index <= (pos || len)

  }

  /**
   * Goto Position
   *
   * @param {number} n
   */
  function goto (n) {

    index = n

    return index

  }

  /**
   * Goto End Position
   *
   */
  function gotoEnd () {

    index = len

  }

  /**
   * Previous Code Character
   *
   * @param {number} char
   * @returns
   */
  function prevCodeChar (char) {

    return txt.charCodeAt(index - 1) === char

  }

  /**
   * Each Code Character - Converts and match string sequence
   *
   * @param {string} str
   * @returns {boolean}
   */
  function eachCodeChar (str) {

    return str.split('').every((c, i) => c.charCodeAt(0) === getCodeChar(index + i))

  }

  /**
   * Next Code Character
   *
   * @param {number} char
   * @returns
   */
  function nextCodeChar (char) {

    return txt.charCodeAt(index + 1) === char

  }

  /**
   * Next Code Character
   *
   * @param {number} char
   * @returns
   */
  function isCodeChar (char) {

    return txt.charCodeAt(index) === char

  }

  /**
   * While Character
   *
   * @param {function} condition
   * @returns {number}
   */
  function whileChar (condition) {

    const pos = index

    while (index < len && condition(txt.charCodeAt(index))) index++

    return index - pos

  }

  /**
   * Get Code Character
   *
   * @param {number} [n]
   * @returns {number}
   */
  function getCodeChar (n = getPosition()) {

    return txt.charCodeAt(n)

  }

  /**
   * Get Current Position - If a number is passed, return value
   * will be added to current index, but index will not be adjusted.
   *
   * @param {number} [n]
   * @returns {number}
   */
  function getPosition (n) {

    return n ? (index + n) : index

  }

  /**
   * Get Source
   *
   * @returns {string}
   */
  function getSource () {

    return txt

  }

  /**
   * Get String
   *
   * @param {number} start
   * @param {number} end
   * @returns {string}
   */
  function getText (start, end) {

    return txt.substring(start, end)

  }

  /**
   * Skip String - Consumes a string value between 2 quotes.
   * By default, the stream index is advanced, to end of string.
   * Passing `false` will preserve position index but still return
   * the advancement.
   *
   * @param {number} n
   * @param {boolean} [advance=false]
   * @returns {(number|false)}
   */
  function skipString (n, advance = true) {

    const offset = txt.indexOf(txt.charAt(n), n + 1)

    if (!offset) return false

    // consume escaped strings, eg: \" or \'
    if (getCodeChar(offset - 1) === BWS) return skipString(offset)

    return advance ? goto(offset) : offset

  }

  /**
   * Skip Whitespace
   *
   * @returns {(string|boolean)}
   */
  function getString (n) {

    const capture = skipString(n, false)

    if (!capture) return false

    return getText(n + 1, capture)

  }

  /**
   * Skip Whitespace
   *
   * @returns {boolean}
   */
  function whitespace () {

    return whileChar(c => (
      c === WSP ||
      c === TAB ||
      c === NWL ||
      c === LFD ||
      c === CAR
    )) > 0

  }

  function gotoChar (char) {

    while (index < len) {
      if (txt.charCodeAt(index) === char) return true
      index++
      goto(1)
    }

    return false

  }

  /**
   * Fast Forward - Consumes a position LTR
   *
   * @param {string} str
   * @returns
   */
  function forward (str) {

    const pos = txt.indexOf(str, index + 1) + str.length

    if (pos < 0) return false

    // advance index position
    index = pos

    return index

  }

  return {
    regex
    , prev
    , next
    , eos
    , goto
    , gotoChar
    , gotoEnd
    , getPosition
    , getSource
    , getText
    , getCodeChar
    , prevCodeChar
    , nextCodeChar
    , isCodeChar
    , nextRegex
    , eachCodeChar
    , getString
    , whileChar
    , skipString
    , whitespace
    , forward
  }

}
