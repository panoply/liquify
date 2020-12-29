function(context) {

  /* eslint one-var: ["error", { let: "never" } ] */

import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import { TokenContext } from '../enums/context'
import stream from './stream'
import specs from './specs'
import { DSH, NWL, LCB, DOT, LAN, BNG, FWS, PER } from '../lexical/characters'
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
   * Index Offsets - Location state
   *
   * @type {number}
   */
  let index

  /**
   * Brace Delimeters
   *
   * @type {number}
   */
  let brace

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state = ScanState.TokenUnknown

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
   * @returns {number} Returns Token Type Enum
   */
  function charseq () {

    const delimeter = stream.untilSequence(/[{<]{1}/)

    // LIQUID OPEN TAG DELIMETERS                                {% | {{
    // -----------------------------------------------------------------

    if (delimeter === LCB) {

      if (stream.nextCodeChar(LCB)) specs.type = TokenTag.object

      index = stream.position()

      if (stream.ifRegExp(/^{[{%]{1}-?/)) {
        state = ScanState.TagOpen
        return liquid()
      }

      stream.advance(1)

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

      // LIQUID TAG NAME
      // -----------------------------------------------------------------
      case ScanState.TagOpen:

        // if (stream.prevCodeChar(DSH)) brace = ScanState.TagOpenDash

        // Reset position offset
        // index = stream.position()

        // Skip whitespace
        if (stream.skipWhitespace()) {
         // index = stream.position()
          return TokenType.Whitespace
        }

        // Detect if endtag, stream will move position past end
        // the next RegExp will extract the name
        if (stream.ifRegExp(/^\bend/)) {
        //  index = stream.position()
          state = ScanState.WithinEndTag
        }

        // Extract tag name
        if (stream.ifRegExp(/^\b[a-zA-Z_]{1,}/)) {

          // Setter spec tag name
          specs.name = stream.token()

          // index = stream.position()

          if (state !== ScanState.WithinEndTag) {

            // in object tag
            if (specs.type === TokenTag.object) {
              state = ScanState.ObjectName
              return liquid()
            }

            // in normal tag
            state = ScanState.TagType
            return TokenType.LiquidTagName

          }

          // unknown tag, goto end.
          if (!specs.spec) {
            state = ScanState.TagClose
            return liquid()
          }

        }

        state = ScanState.TagClose

        return liquid()

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
        }

        // Iteration Type
        if (specs.type === TokenTag.iteration) {
          state = ScanState.IterationIteree
          return liquid()
        }

        // Tag Close
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
      // case ScanState.TokenUnknown:
      case ScanState.WithinEndTag:
      case ScanState.TagClose:
      case ScanState.TagCloseDash:

        index = stream.position()

        if (stream.ifChar(DSH)) {
          state = ScanState.TagCloseDash
          index = stream.position(-1)
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

        // First value
        if (state === ScanState.IterationIteree) {
          state = ScanState.IterationOperator
          return TokenType.IterationIteree
        }

        // Second value
        if (state === ScanState.IterationOperator) {
          state = ScanState.IterationArray
          return TokenType.IterationOperator
        }

        // Third value
        if (state === ScanState.IterationArray) {
          state = ScanState.IterationParameter
          return TokenType.IterationArray
        }

        // Fourth value
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
     * Get whitespace dash strip state
     */
    , get dashed () { return brace || undefined }

    /**
     * Get Token - Returns the current token string in stream,
     * optionally return a boolean by passing Character code in param.
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



}
