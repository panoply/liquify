/* eslint one-var: ["error", { let: "never" } ] */

import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import { TokenContext } from '../enums/context'
import stream from './stream'
import specs from './specs'
import * as Characters from '../lexical/characters'
import * as TokenTag from '../lexical/tags'

const example = [
  'indentifier',
  'operator'
]

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
   * Index Offsets - Location state
   *
   * @type {number}
   */
  let index

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  /**
   * Runs document scan
   *
   * @param {number} offset
   * @returns {number}
   */
  function scan (offset = 0) {

    if (offset > 0) stream.jump(offset)
    if (stream.EOS) return TokenType.EOS

    return state === ScanState.TokenUnknown ? charseq() : liquid()

  }

  /**
   * Character Sequencing
   *
   * Advances source to delimeter start characters
   *
   */
  function charseq () {

    switch (stream.advanceSequence(/[{-]/)) {

      // YAML FRONTMATTER                                              ---
      // -----------------------------------------------------------------
      case Characters.DSH:

        if (stream.advanceIfChars([
          Characters.DSH,
          Characters.DSH,
          Characters.NWL
        ])) {
          state = ScanState.AfterOpeningFrontmatter
          return TokenType.YAMLFrontmatterStart
        }

        break
      // LIQUID OPEN TAG DELIMETERS                                {% | {{
      // -----------------------------------------------------------------
      case Characters.LCB:

        if (stream.skipWhitespace()) return TokenType.Whitespace
        if (stream.nextCodeChar(Characters.LCB)) specs.type = TokenTag.object

        index = stream.position()

        if (stream.advanceIfRegExp(/^{[{%]/)) {
          state = ScanState.TagOpen
          return TokenType.LiquidTagOpen
        }

        return charseq()

      // HTML OPEN TAG DELIMETERS                            < | </ | <!--
      // -----------------------------------------------------------------
      case Characters.LAN:

        stream.advance(1)
        index = stream.position()

        if (stream.skipWhitespace()) return TokenType.ParseError

        if (stream.advanceIfChar(Characters.FWS)) {
          // state = ScanState.AfterOpeningHTMLEndTag
          // return TokenType.HTMLEndTagOpen
        }

        if (stream.advanceIfChars([ Characters.BNG, Characters.DSH, Characters.DSH ])) {
        //  state = ScanState.AfterOpeningHTMLComment
          // return TokenType.HTMLStartCommentTag
        }

        if (stream.advanceIfRegExp(/^[^\s"'>]+/)) {
          if (stream.getText(index) === 'script') {
            return TokenType.HTMLStartTagOpen
          }
        }

        return charseq()

    }

    state = ScanState.TokenUnknown

  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  function frontmatter () {

    if (stream.advanceUntilChars('---', true)) {
      index = stream.position(-3)
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

    if (state === ScanState.AfterOpeningFrontmatter) {
      if (stream.position(-2) !== 0) return
      return frontmatter()
    }

    switch (state) {

      // LIQUID OPENING TAG DELIMTERS
      // -----------------------------------------------------------------
      case ScanState.TagOpen:

        if (stream.advanceIfChar(Characters.DSH)) {
          index = stream.position(-1)
          return TokenType.WhitespaceDash
        }

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (stream.advanceIfRegExp(/^[^\s|%}-]*/)) {
          specs.name = stream.getText(index)
          if (!specs.spec) state = ScanState.TagClose
          state = ScanState.TagType
          return TokenType.LiquidTagName
        }

        index = stream.position()
        state = ScanState.TagClose

        return liquid()

      // LIQUID CLOSING TAG DELIMETER
      // -----------------------------------------------------------------
      case ScanState.TagClose:

        if (stream.advanceIfChar(Characters.DSH)) {
          console.log(stream.getChar(), specs.name)
          return TokenType.WhitespaceDash
        }

        if (stream.advanceIfRegExp(/^[%}]\}/)) {
          state = ScanState.TokenUnknown
          return TokenType.LiquidTagClose
        }

        // re-run
        if (stream.advanceUnless(/[%}]\}/, /\{[{%]/)) {
          return liquid()
        }

        state = ScanState.TokenUnknown
        return TokenType.ParseError

      // LIQUID TAG TYPE
      // -----------------------------------------------------------------
      case ScanState.TagType:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        // Control Type
        if (specs.type === TokenTag.control) {
          state = ScanState.ControlCondition
          return liquid()
        } else if (specs.type === TokenTag.iteration) {
          state = ScanState.IterationIteree
          return liquid()
        }

        state = ScanState.TagClose
        return liquid()

      // LIQUID CONTROL TAGS
      // -----------------------------------------------------------------
      case ScanState.ControlCondition:
      case ScanState.ControlOperator:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (!stream.advanceIfRegExp(/^[^\s{%}-]+/)) {
          state = ScanState.TagClose
          return liquid()
        }

        stream.skipQuotedString(index)

        if (state === ScanState.ControlCondition) {
          state = ScanState.ControlOperator
          return TokenType.ControlCondition
        }

        state = ScanState.ControlCondition
        return TokenType.ControlOperator

      // LIQUID ITERATION TAGS
      // -----------------------------------------------------------------
      case ScanState.IterationIteree:
      case ScanState.IterationOperator:
      case ScanState.IterationArray:
      case ScanState.IterationParameters:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (!stream.advanceIfRegExp(/^[^\s{%}-]+/)) {
          state = ScanState.TagClose
          return liquid()
        }

        if (state === ScanState.IterationIteree) {
          state = ScanState.IterationOperator
          return TokenType.IterationIteree
        }

        if (state === ScanState.IterationOperator) {
          state = ScanState.IterationArray
          return TokenType.IterationOperator
        }

        if (state === ScanState.IterationArray) {
          state = ScanState.IterationParameters
          return TokenType.IterationArray
        }

        return TokenType.IterationParameters

      // HTML COMMENT OPEN                                           <!--^
      // -----------------------------------------------------------------
     // case ScanState.AfterOpeningHTMLComment:

       // break

      // HTML START TAG OPEN                                         <tag^
      // -----------------------------------------------------------------
      // case ScanState.HTMLOpenStartTag:

        // break

      // HTML END TAG OPEN                                          </tag^
      // -----------------------------------------------------------------
      // case ScanState.HTMLOpenEndTag:

        // break

    }

    return charseq()

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
    , get index () { return index }

    /**
     * Get Position
     */
    , get position () { return stream.position() }

    /**
     * Get String
     */
    , get token () { return stream.token }

    /**
     * Get Token - Returns the current token string in stream,
     * optionall return a boolean by passing Character code in param.
     *
     * @param {number} [at] Return a specific character
     * @returns {(string|boolean)}
     */
    , getToken: at => at ? stream.getText(index)[at] : stream.getText(index)

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
    , getLine: () => stream.location.line

    /**
     * Get State - Returning a substring
     *
     * @returns {ScanState}
     */
    , getState: () => state

    /**
     * Get Range
     *
     * @returns {object}
     */
    , getRange: () => (stream.location)

  })

})()
