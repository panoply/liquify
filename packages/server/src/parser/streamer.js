import { WSP, TAB, NWL, LFD, CAR, FWS, BWS, DQO, SQO, RAN, LAN } from './lexical/characters'

/**
 * Contents Stream - Supplies methods to the parsing scanner
 *
 * @export
 * @param {Document.Scope} text
 * @returns
 */
export function Stream ({ textDocument }, startOffset = 0) {

  /**
   * index Offset
   *
   * @type {number}
   */
  let index = startOffset

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

  function eos () {

    return length <= index

  }

  function source () {

    return text

  }

  function position () {

    return index

  }

  function goto (offset) {

    index = offset

    return index

  }

  function prev (n) {

    index -= n

    return index

  }

  function next (n) {

    index += n

    return index

  }

  function end () {

    index = text.length

  }

  function nextChar () {

    return text.charCodeAt(index++) || 0

  }

  function peekChar (n = 0) {

    return text.charCodeAt(index + n) || 0

  }

  function getText (position, offset = undefined) {

    return offset >= 0
      ? text.substring(position, offset)
      : text.substring(index, position)

  }

  function advanceIfChar (char) {

    if (char !== text.charCodeAt(index)) return false

    index++

    return true

  }

  function advanceIfChars (chars) {

    if (index + chars.length > text.length) return false

    let i = 0

    for (; i < chars.length; i++) if (text.charCodeAt(index + i) !== chars[i]) return false

    next(i)

    return true

  }

  function advanceIfRegExp (regex) {

    const match = text.substring(index).match(regex)

    if (!match) return ''

    index = index + match.index + match[0].length

    return match[0]

  }

  function advanceUntilRegExp (regex) {

    const match = text.substring(index).match(regex)

    if (match) end()

    else {
      index = index + match.index
      return match[0]
    }

    return ''

  }

  function advanceUntilChar (char) {

    while (index < text.length) {
      if (text.charCodeAt(index) === char) return true
      next(1)
    }

    return false

  }

  function advanceUntilChars (chars) {

    const cache = chars.length

    while (index + cache <= text.length) {

      let i = 0

      for (; i < cache && text.charCodeAt(index + i) === chars[i]; i++) {}
      if (i === cache) return true

      next(1)

    }

    end()

    return false

  }

  function advanceWhileChar (condition) {

    const current = index

    while (index < length && condition(text.charCodeAt(index))) index++

    return index - current

  }

  function skipWhitespace () {

    return advanceWhileChar(char => (
      char === WSP ||
      char === TAB ||
      char === NWL ||
      char === LFD ||
      char === CAR
    )) > 0

  }

  function skipString (n) {

    const offset = text.indexOf(text.charAt(n), n + 1)

    if (offset < 0) {

      end()

      return false

    }

    // consume escaped strings, eg: \" or \'
    if (text.charCodeAt(offset - 1) === BWS) return skipString(offset)

    goto(offset)

    return true

  }

  return {
    eos,
    source,
    position,
    goto,
    prev,
    next,
    end,
    nextChar,
    peekChar,
    getText,
    advanceIfChar,
    advanceIfChars,
    advanceIfRegExp,
    advanceUntilRegExp,
    advanceUntilChar,
    advanceUntilChars,
    advanceWhileChar,
    skipWhitespace,
    skipString
  }

}
