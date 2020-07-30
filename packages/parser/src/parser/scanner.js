/* eslint one-var: ["error", { let: "never" } ] */

import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import { TokenContext } from '../enums/context'
import stream from './stream'
import specs from './specs'
import { DSH, NWL, LCB, DOT, LAN, BNG, FWS } from '../lexical/characters'
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
   * @param {object} options
   * @returns {number}
   */
  function scan (offset = 0, options = {}) {

    if (offset > 0) stream.jump(offset)
    if (stream.EOS) return TokenType.EOS

    // frontmatter must start at position 0
    /* if (offset === 0 && options.frontmatter) {
      if (stream.skipWhitespace()) return TokenType.ParseError
      if (stream.ifChars([ DSH, DSH, DSH ])) {
        state = ScanState.FrontmatterOpen
        return TokenType.FrontmatterStart
      }
    } */

    return state === ScanState.TokenUnknown ? charseq() : liquid()

  }

  /**
   * Character Sequencing
   *
   * Advances source to delimeter start characters
   *
   */
  function charseq () {

    const delimeter = stream.untilSequence(/[{]/)

    // LIQUID OPEN TAG DELIMETERS                                {% | {{
    // -----------------------------------------------------------------

    if (delimeter === LCB) {

      if (stream.skipWhitespace()) return TokenType.Whitespace
      if (stream.nextCodeChar(LCB)) specs.type = TokenTag.object

      index = stream.position()

      if (stream.ifRegExp(/^\{[{%]/)) {
        state = stream.ifChar(DSH) ? ScanState.TagOpenDash : ScanState.TagOpen
        return TokenType.LiquidTagOpen
      }

    }

    // HTML OPEN TAG DELIMETERS                            < | </ | <!--
    // -----------------------------------------------------------------
    if (delimeter === LAN) {

      index = stream.position()
      stream.advance(1)

      if (stream.skipWhitespace()) return TokenType.ParseError

      if (stream.ifChar(FWS)) {
        // state = ScanState.AfterOpeningHTMLEndTag
        // return TokenType.HTMLEndTagOpen
      }

      if (stream.ifChars([ BNG, DSH, DSH ])) {
        //  state = ScanState.AfterOpeningHTMLComment
        // return TokenType.HTMLStartCommentTag
      }

      if (stream.ifRegExp(/^[^\s"'>]+/)) {
        if (stream.getText(index) === 'script') {
          return TokenType.HTMLStartTagOpen
        }
      }

      return charseq()

    }

    // stream.advance(1)
    state = ScanState.TokenUnknown

  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  function frontmatter () {

    if (stream.untilChars('---', true)) {
      index = stream.position(-3)
      state = ScanState.TokenUnknown
      return TokenType.FrontmatterEnd
    }

    state = ScanState.TokenUnknown

    return liquid()

  }

  /**
   * liquid
   *
   */
  function liquid () {

    switch (state) {

      // LIQUID OPENING TAG DELIMTERS
      // -----------------------------------------------------------------
      case ScanState.TagOpen:
      case ScanState.TagOpenDash:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (stream.ifRegExp(/^\bend/)) {
          index = stream.position()
          state = ScanState.WithinEndTag
        }

        if (stream.ifRegExp(/^[^\W]*/)) {

          specs.name = stream.token() // spec is defined

          if (state !== ScanState.WithinEndTag) {

            if (specs.type === TokenTag.object) {
              state = ScanState.ObjectName
              return liquid()
            }

            state = ScanState.TagType
            return TokenType.LiquidTagName
          }

          if (!specs.spec) state = ScanState.TagClose

        }

        index = stream.position()
        state = ScanState.TagClose

        return liquid()

      // LIQUID OBJECT PROPERTIES
      // -----------------------------------------------------------------
      case ScanState.ObjectName:
      case ScanState.ObjectProperties:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (stream.ifRegExp(/^\.?[^\s]*\b/)) {
          return TokenType.ObjectProperties
        }

        index = stream.position()

        if (stream.ifRegExp(/^-?[%}]\}/)) {
          state = ScanState.TokenUnknown
          return TokenType.LiquidTagClose
        }

        break

      // LIQUID CLOSING TAG DELIMETER
      // -----------------------------------------------------------------
      case ScanState.WithinEndTag:
      case ScanState.TagClose:
      case ScanState.TagCloseDash:

        if (stream.ifChar(DSH)) {
          state = ScanState.TagCloseDash
          return TokenType.LiquidTagClose
        }

        if (stream.ifRegExp(/^-?[%}]\}/)) {
          state = ScanState.TokenUnknown
          return TokenType.LiquidTagClose
        }

        // re-run
        if (stream.consumeUnless(/-?[%}]\}/, /\{[{%]/)) return liquid()

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

        if (!stream.ifRegExp(/^[^\s{%}-]+/)) {
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

      // LIQUID ITERATION TAG
      // -----------------------------------------------------------------
      case ScanState.IterationIteree:
      case ScanState.IterationOperator:
      case ScanState.IterationArray:
      case ScanState.IterationParameter:
      case ScanState.IterationParameterValue:

        if (stream.skipWhitespace()) {
          index = stream.position()
          return TokenType.Whitespace
        }

        if (!stream.ifRegExp(/^[^\s{%}-]+/)) {
          state = ScanState.TagClose
          return liquid()
        }

        // first
        if (state === ScanState.IterationIteree) {
          state = ScanState.IterationOperator
          return TokenType.IterationIteree
        }

        // second
        if (state === ScanState.IterationOperator) {
          state = ScanState.IterationArray
          return TokenType.IterationOperator
        }

        // third
        if (state === ScanState.IterationArray) {
          state = ScanState.IterationParameter
          return TokenType.IterationArray
        }

        // fourth
        if (state === ScanState.IterationParameter) {
          state = ScanState.IterationParameterValue
          return TokenType.IterationParameter
        }

        return TokenType.IterationParameterValue

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
     * Get Token
     */
    , get token () { return stream.token() }

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
    , getState: code => (state === code)

    /**
     * Get Space - Returns spaces
     *
     * @returns {ScanState}
     */
    , getSpace: () => stream.position(-index)

    /**
     * Get Range
     *
     * @returns {object}
     */
    , getRange: () => (stream.location)

  })

})()
