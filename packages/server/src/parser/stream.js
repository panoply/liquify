import { WSP, TAB, NWL, LFD, CAR, BWS } from './lexical/characters'

/**
 * Stream
 *
 * Supplies methods to the parsing scanner. This is a modified variation
 * and was lifted from the `vscode-html-languageservice` module.
 *
 * @export
 * @param {Document.Scope} document
 * @returns {object}
 * @see https://git.io/JJnqz
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
  const text = textDocument.getText()

  /**
   * Text Length (cache)
   *
   * @type {number}
   */
  const length = text.length

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  /**
   * End of Stream
   *
   * @returns {boolean}
   */
  const eos = () => (length <= index)

  /**
   * Previous position
   *
   * WILL MODIFY POSITION
   *
   * @param {number} [n=1]
   * @returns {number}
   */
  const prev = (n = 1) => (index -= n)

  /**
   * Next Position
   *
   * WILL MODIFY POSITION
   *
   * @param {number} [n=1]
   * @returns {number}
   */
  const next = (n = 1) => (index += n)

  /**
   * Goto Position
   *
   * WILL MODIFY POSITION
   *
   * @param {number} n
   * @returns {number}
   */
  const goto = n => (index = n)

  /**
   * Goto End Position
   *
   * WILL MODIFY POSITION
   *
   * @returns {number}
   */
  const end = () => (index = length)

  /**
   * Previous Code Character
   *
   * WILL NOT MODIFY POSITION
   *
   * @param {number} char
   * @returns {boolean}
   */
  const prevCodeChar = char => text.charCodeAt(index - 1) === char

  /**
   * Next Code Character
   *
   * WILL NOT MODIFY POSITION
   *
   * @param {number} char
   * @returns {boolean}
   */
  const nextCodeChar = char => text.charCodeAt(index + 1) === char

  /**
   * Current Code Character Truthy
   *
   * @param {number} char
   * @returns {boolean}
   */
  const isCodeChar = char => text.charCodeAt(index) === char

  /**
   * Get Current Position - If a number is passed, return value
   * will be added to current index, but index will not be adjusted.
   *
   * WILL NOT MODIFY POSITION
   *
   * @param {number} [n]
   * @returns {number}
   */
  const position = (n = undefined) => n ? (index + n) : index

  /**
   * Get Code Character
   *
   * @param {number} [n]
   * @returns {number}
   */
  const getCodeChar = (n = undefined) => text.charCodeAt(n || index)

  /**
   * Get Source
   *
   * @returns {string}
   */
  const source = () => text

  /**
   * Get String
   *
   * @param {number} start
   * @param {number} end
   * @returns {string}
   */
  const getText = (start, end) => text.substring(start, end)

  /**
   * While Character
   *
   * WILL MODIFY POSITION
   *
   * @param {function} condition
   * @returns {number}
   */
  const advanceWhileChar = (condition) => {

    const pos = index

    while (index < length && condition(text.charCodeAt(index))) index++
    return index - pos

  }

  /**
   * Skip String - Consumes a string value between 2 quotes
   *
   * WILL MODIFY POSITION
   *
   * @param {number} n
   * @param {number[]} [consume]
   * @returns {(number|false)}
   */
  const skipString = (n, consume = undefined) => {

    const offset = text.indexOf(text.charAt(n), n + 1)

    if (!offset) return false
    // consume escaped strings, eg: \" or \'
    if (getCodeChar(offset - 1) === BWS) return skipString(offset)
    // custom consumed character codes
    if (consume && consume.includes(getCodeChar(offset))) return skipString(offset)

    return goto(offset)

  }

  /**
   * Skip Whitespace
   *
   * WILL MODIFY POSITION
   *
   * @returns {boolean}
   * @see https://git.io/JJnq8
   */
  const whitespace = () => {

    return advanceWhileChar(c => (
      c === WSP ||
      c === TAB ||
      c === NWL ||
      c === LFD ||
      c === CAR
    )) > 0

  }

  /**
   * Advances Stream when Regular Expression finds a match
   *
   * WILL MODIFY POSITION
   *
   * @param {RegExp} regex
   * @returns {(string|false)}
   * @see https://git.io/JJnqC
   */
  const advanceIfRegExp = (regex) => {

    const match = text.substring(index + 1).match(regex)

    if (!match) return false

    index = index + match.index + match[0].length
    return match[0]

  }

  /**
   * Advances Stream until a Regular Expression match is found
   *
   * WILL MODIFY POSITION
   *
   * @param {RegExp} regex
   * @returns {(string|false)}
   * @see https://git.io/JJnqn
   */
  const advanceUntilRegExp = (regex) => {

    const match = text.substring(index).match(regex)

    if (!match) {
      end()
      return ''
    }

    index = index + match.index
    return match[0]

  }

  /**
   * Advances Stream until a single matching Character Code is found
   *
   * WILL MODIFY POSITION
   *
   * @param {number} char
   * @returns {boolean}
   * @see https://git.io/JJnqt
   */
  const advanceUntilChar = char => {

    while (index < length) {
      if (text.charCodeAt(index) !== char) index++
      next()
      return true
    }

    return false

  }

  /**
   * Advances Stream until a single matching Character Code is found
   *
   * WILL MODIFY POSITION
   *
   * @param {number} char
   * @returns {boolean}
   * @see https://git.io/JJnq3
   */
  const advanceIfChar = (char) => {

    // console.log(index, char, text.charAt(index + 1))

    if (char !== text.charCodeAt(index + 1)) return false

    index++
    return true

  }

  /**
   * Each Code Character - Converts and match string sequence
   *
   * @param {number[]} codes
   * @returns {boolean}
   * @see https://git.io/JJnqt
   */
  const advanceIfChars = (codes) => {

    if (codes.every((c, i) => c === getCodeChar(index + i))) {
      next(codes.length)
      return true
    }

    return false

  }

  /* -------------------------------------------- */
  /*                    CLOSURE                   */
  /* -------------------------------------------- */

  return (
    {
      goto
      , prev
      , next
      , eos
      , end
      , position
      , source
      , getText
      , getCodeChar
      , prevCodeChar
      , nextCodeChar
      , isCodeChar
      , skipString
      , whitespace
      , advanceWhileChar
      , advanceUntilRegExp
      , advanceUntilChar
      , advanceIfChar
      , advanceIfChars
      , advanceIfRegExp
    }
  )

}
