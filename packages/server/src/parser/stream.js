import {
  WSP, TAB, NWL, LFD, CAR, FWS, BWS, DQO, SQO
} from './lexical/characters'

/**
 * Contents Stream - Supplies methods to the parsing scanner
 *
 * @export
 * @param {Document.Scope} text
 * @param {number} [initial=0]
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
    , getString
    , getCodeChar
    , prevCodeChar
    , nextCodeChar
    , nextRegex
    , eachCodeChar
    , whileChar
    , skipString
    , skipWhitespace
    , fastForward
  }

  /**
   * Previous position
   *
   * @param {number} [n=1]
   */
  function prev (n = 1) {

    index -= n

  }

  /**
   * Next Position
   *
   * @param {number} [n=1]
   */
  function next (n = 1) {

    index += n

  }

  /**
   * Regex Expression Match
   *
   * @param {RegExp} exp
   * @returns {(string|false)}
   */
  function regex (exp) {

    // next(1)

    const tag = txt.substring(index).match(exp)

    console.log('REGEX', tag)

    if (!tag) return ''

    index += tag.index + tag[0].length + 1

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
  function eos () {

    return index <= len

  }

  /**
   * Goto Position
   *
   * @param {number} n
   */
  function goto (n) {

    index = n

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
   * While Character
   *
   * @param {function} condition
   * @returns {number}
   */
  function whileChar (condition) {

    while (index < len && condition(txt.charCodeAt(index))) next()

    return index

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
   * Get Current Position
   *
   * @returns {number}
   */
  function getPosition () {

    return index

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
  function getString (start, end) {

    return txt.substring(start, end)

  }

  /**
   * Skip String
   *
   * @param {number} n
   */
  function skipString (n) {

    const next = txt.indexOf(txt.charAt(n), n + 1)

    if (!next) return false

    // consume escaped strings, eg: \" or \'
    if (getCodeChar(next - 1) === BWS) return skipString(next)

    goto(next)

  }

  /**
   * Skip Whitespace
   *
   * @returns {boolean}
   */
  function skipWhitespace () {

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
  function fastForward (str) {

    const pos = txt.indexOf(str, index + 1) + str.length

    if (pos < 0) return false

    // advance index position
    index = pos

    return index

  }

  return methods

}
