/* eslint one-var: ["error", { let: "never" } ] */

import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import stream from './stream'
import specs from './specs'
import * as Characters from '../lexical/characters'
import * as TokenTag from '../lexical/tags'

/**
 * Scanner
 *
 * Sequences Chars that are contained within Liquid, HTML and YAML syntaxes.
 * This module is loosely based on the `vscode-html-languageservice` Scanner, but
 * resolves in a vastly different manner.
 *
 * @export
 */
export default (function () {

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state = ScanState.TokenUnknown

  /**
   * Start Offsets - Location state
   *
   * @type {number}
   */
  let start

  /**
   * Line Number
   *
   * @type {number}
   */
  let line = 1

  /**
   * Line Character Number
   *
   * @type {number}
   */
  let char = 0

  /**
   * Whitespace Counter
   *
   * @type {number}
   */
  let space

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  /**
   * Runs document scan
   *
   * @param {number} initialOffset
   * @returns {number}
   */
  function scan (initialOffset = 0) {

    if (initialOffset > 0) stream.offset(initialOffset)
    if (stream.eos) return TokenType.EOS

    state = state || ScanState.TokenUnknown
    start = stream.position()

    return liquid() || (() => {

      space = undefined
      start = stream.advance(1)
      state = ScanState.TokenUnknown

      return TokenType.Unknown

    })()

  }

  /**
   * Character Sequencing
   *
   * Advances source to delimeter start characters
   *
   */
  function delimeters () {

    switch (stream.advanceUntilRegExp(/[\r\n'"{<-]/).charCodeAt(0)) {

      /**
       * After Frontmatter YAML
       *
       * `---`
       *
       * @returns {void|number}
       */
      case Characters.DSH:

        if (stream.advanceIfChars([ Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningFrontmatter
          return TokenType.YAMLFrontmatterStart
        }

        break

      /**
       * After Liquid Tag Open Delimeter
       *
       * `{%` OR `{{`
       *
       * @returns {void|number}
       */
      case Characters.LCB:

        if (stream.whitespace() > 0) return; else start = stream.position()
        if (stream.nextCodeChar(Characters.LCB)) specs.type = TokenTag.object
        if (!stream.advanceIfRegExp(/{[{%]/)) return delimeters()

        state = ScanState.TagOpen
        // start = stream.position()
        return TokenType.LiquidTagOpen

      /**
       * After HTML Open Delimeter
       *
       * `<` OR `</` OR `<!--`
       *
       * @returns {void|number}
       */
      case Characters.LAN:

        if (stream.advanceUntilChar(Characters.FWS)) {
          state = ScanState.AfterOpeningHTMLEndTag
          return TokenType.HTMLEndTagOpen
        }

        if (stream.advanceUntilChars([ Characters.BNG, Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningHTMLComment
          return TokenType.HTMLStartCommentTag
        }

        state = ScanState.AfterOpeningHTMLStartTag
        return TokenType.HTMLStartTagOpen

      /**
       * After Newline or Carriage Return
       *
       * `\n` OR `\r`
       *
       * @returns {void|number}
       */
      case Characters.NWL:
      case Characters.CAR:

        stream.advance(1)
        line += 1
        char = stream.position()

        break

    }

  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  function frontmatter () {

    if (stream.advanceUntilChars('---', true)) {
      start = stream.position(-3)
      state = ScanState.TokenUnknown
      return TokenType.YAMLFrontmatterClose
    }

    state = ScanState.TokenUnknown

    return liquid()

  }

  /**
   * liquid
   *
   */
  function liquid () {

    if (state === ScanState.TokenUnknown) return delimeters()

    if (state === ScanState.AfterOpeningFrontmatter) {
      if (stream.position(-2) !== 0) console.log('Frontmatter should start at position 0')
      return frontmatter()
    }

    if (state !== ScanState.TagClose && stream.isRegExpMatch(/^-?[%}]\}/)) {
      state = ScanState.TagClose
    }

    // if (!stream.advanceUntilChars('%}')) {
    console.log('fails')
    // }

    switch (state) {

      case ScanState.Whitespace:

        space = stream.whitespace()

        break
      /**
       * After Opening Liquid Tag
       *
       * @returns {number}
       */
      case ScanState.TagOpen:

        if (stream.advanceIfChar(Characters.DSH)) {
          console.log(stream.getChar(start))
          return TokenType.LiquidWhitespaceDash
        }

        space = stream.whitespace()
        start = stream.position()

        if (stream.advanceIfRegExp(/^[^\s'"|!=<>%}.-]*/)) {

          specs.name = stream.getText(start)
          state = ScanState.TagName

          // set the spec type if tag was not an object
          if (!specs.type) specs.type = TokenTag[specs.spec.type]
          return TokenType.LiquidTagName
        }

        break

      /**
       * Liquid Tag Name
       *
       * @returns {number|void}
       */
      case ScanState.TagName:

        space = stream.whitespace()
        start = stream.position()

        switch (specs.type) {

          case TokenTag.control:
            state = ScanState.ControlToken
            return liquid()

        }

        break
      /**
       * Liquid Tag Close
       *
       * @returns {number|void}
       */
      case ScanState.TagClose:

        if (stream.advanceIfRegExp(/^-(?=[%}]\})/)) {
          return TokenType.LiquidWhitespaceDash
        }

        if (stream.advanceIfChars([ Characters.RCB, Characters.RCB ])) {
          start = stream.position()
          state = ScanState.TokenUnknown
          return TokenType.LiquidObjectClose
        }

        if (stream.advanceIfChars([ Characters.PER, Characters.RCB ])) {
          start = stream.position()
          state = ScanState.TokenUnknown
          return TokenType.LiquidTagClose
        }

        break

      /**
       * Liquid Control Tag
       *
       * @returns {number|void}
       */
      case ScanState.AfterConditionValue:
      case ScanState.ControlToken:

        space = stream.whitespace()
        start = stream.position()

        if (stream.advanceIfRegExp(/^[^\s%}-]*/)) {

          if (state === ScanState.ControlToken) {
            state = ScanState.AfterConditionValue
            return TokenType.ControlCondition

          }

          state = ScanState.ControlToken
          return TokenType.ControlOperator

        }

        break

    }
  }

  function html () {

    switch (state) {

      // HTML COMMENT OPEN                                           <!--^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLComment:

        break

      // HTML START TAG OPEN                                         <tag^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLStartTag:

        break

      // HTML END TAG OPEN                                          </tag^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLEndTag:

        break

    }

  }

  /* -------------------------------------------- */
  /*                    METHODS                   */
  /* -------------------------------------------- */

  return ({

    /**
     * Scan Contents
     */
    scan

    /**
     * Get start
     */
    , get start () { return start }

    /**
     * Get Position
     */
    , get end () { return stream.position() }

    , get string () { return stream.token }

    /**
     * Get Token - Returns the current token string in stream,
     * optionall return a boolean by passing Character code in param.
     *
     * @param {number} at Return a specific character
     * @returns {(string|boolean)}
     */
    , getToken: at => at ? stream.getText(start)[at] : stream.getText(start)

    /**
     * Get Text - Returning a substring
     *
     * @param {number} from starting offset of token
     * @param {number} [end] ending offset of token
     */
    , getText: (from, end = stream.position()) => stream.getText(from, end)

    /**
     * Get Text - Returning a substring
     *
     * @param {number} start starting offset of token
     * @param {number} [end] ending offset of token
     */
    , getLine: () => line

    /**
     * Get State - Returning a substring
     *
     * @returns {ScanState}
     */
    , getState: () => state

    /**
     * Get Space
     *
     * @returns {number}
     */
    , getSpace: () => space

    /**
     * Get Range
     *
     * @returns {object}
     */
    , getRange: () => ({ line, character: start - char })

  })

})()
