
import { TokenType } from '../enums/types'
import { ScanState, ScanCache } from '../enums/state'
import { TokenTags } from '../enums/parse'
import { ParseError } from '../enums/errors'
import * as Regex from '../lexical/regex'
import * as c from '../lexical/characters'
import s from './stream'
import spec from './specs'

/**
 * Scanner
 *
 * Sequences Characters that are contained within Liquid,
 * HTML and YAML syntaxes. This module is loosely based on
 * the `vscode-html-languageservice` Scanner but resolves in
 * a vastly different manner.
 *
 * @export
 * @returns {Parser.IScanner}
 * @this {Parser.Options}
 */
export default (function () {

  /**
   * Start Position
   *
   * The starting position index of each tag,
   * this is reset every time we encounter an
   * open delimiter match
   *
   * @type {number}
   */
  let start

  /**
   * Cache
   *
   * Can hold any value, is used as a cache
   * and its value may represent anything within
   * the stream.
   *
   * @type {any}
   */
  let cache

  /**
   * Token
   *
   * Temporary token string reference
   *
   * @type {string}
   */
  let token

  /**
   * Error Number
   *
   * Parsing errors, holds value of the parse errors
   * encountered while scanning tags.
   *
   * @type {number}
   */
  let error

  /**
   * Scanner State
   *
   * The state at which the scan is processing. This
   * changes each time we come across characters important
   * in the sequence.
   *
   * @type {number}
   */
  let state = ScanState.CharSeq

  /**
   * HTML Tag Scanner
   *
   * Scanner function for HTML Tags. Handles HTML
   * parsing pertaining to the HTML language.
   *
   * @returns {function|number}
   */
  function ScanHTML () {

    switch (state) {

      case ScanState.HTMLTagOpen:

        break

      case ScanState.HTMLTagName:

        break

      case ScanState.HTMLAttributeName:

        break

      case ScanState.HTMLAttributeOperator:

        break

      case ScanState.HTMLAttributeValue:

        break

      case ScanState.HTMLTagClose:

        break

      case ScanState.HTMLTagCloseName:

        break

      case ScanState.HTMLCommentOpen:

        break

      case ScanState.HTMLCommentClose:

        break
    }

    return ScanHTML()
  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  function ScanFrontmatter () {

    if (s.UntilChars('---', true)) {
      state = ScanState.CharSeq
      return TokenType.FrontmatterEnd
    }

    if (state !== ScanState.CharSeq) {
      state = ScanState.CharSeq
    }

    return CharSeq()

  }

  /**
   * Scan Liquid
   *
   * Liquid c.language syntax tokenizer scanner.
   * TokenType enums are returned
   *
   * @returns {number}
   */
  function ScanLiquid () {

    // Capture whitespace
    if (s.Whitespace()) return TokenType.Whitespace

    // Capture newlines
    if (s.Newlines()) return TokenType.Newline

    switch (state) {

      case ScanState.TagOpenTrim:

        if (s.IfCodeChar(c.DSH)) {
          state = ScanState.TagOpen
          return TokenType.LiquidTrimDashLeft
        }

        break

      // LIQUID TAG OPEN                  {{^ or {%^
      // -------------------------------------------
      case ScanState.TagOpen: {

        if (s.IfCodeChar(c.DSH)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
          return ScanLiquid()
        }

        // Object tag references the predefined tag type in CharSeq()
        if (spec.type === TokenTags.object) {

          // Object name
          if (s.IfRegExp(Regex.LiquidObjectName)) {

            spec.cursor(s.token)

            state = ScanState.Object
            return TokenType.Object

          }

          error = ParseError.InvalidObjectName
          state = ScanState.ParseError

          return ScanLiquid()

        }

        break

      }

      case ScanState.Object:

        if (s.IfCodeChar(c.DOT)) {
          state = ScanState.ObjectDotNotation
          return TokenType.ObjectDotNotation
        }

        if (s.IfCodeChar(c.LOB)) {
          cache = ScanCache.BracketNotation
          state = ScanState.ObjectBracketNotationStart
          return TokenType.ObjectBracketNotationOpen
        }

        if (cache === ScanCache.BracketNotation) {

          if (s.IfCodeChar(c.ROB)) {
            state = ScanState.Object
            cache = ScanCache.Reset
            return TokenType.ObjectBracketNotationClose
          }

          // Missing Bracket closer, eg: object["prop"
          error = ParseError.MissingBracketNotation
          state = ScanState.ParseError
          return ScanLiquid()

        }

        if (s.IfNextCodeChar(c.PIP)) {
          state = ScanState.Filter
          return TokenType.Filter
        }

        if (s.IfRegExp(/^[^|}-][$_a-zA-Z0-9"'.-]*\b/)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
          return ScanLiquid()
        }

        state = ScanState.TagClose
        return ScanLiquid()

      // LIQUID OBJECT DOT NOTATION
      // ---------------------------------------------
      case ScanState.ObjectDotNotation:

        // Gets Property, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        if (s.IsRegExp(/^[\s\t\r\n%}-]+/)) {
          s.Prev()
          error = ParseError.MissingProperty
          state = ScanState.ParseError
          return ScanLiquid()
        }

        if (s.IsCodeChar(c.DOT)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
        }

        return ScanLiquid()

      // LIQUID OBJECT BRACKET NOTATION START
      // ---------------------------------------------
      case ScanState.ObjectBracketNotationStart:

        // Capture empty bracket notations, eg: []
        if (s.IsCodeChar(c.ROB) && s.IsToken(c.LOB)) {
          s.Advance(1, true)
          error = ParseError.MissingProperty
          state = ScanState.Object
          return TokenType.ParseError
        }

        // Capture string property, eg: object["prop"]
        if (s.SkipQuotedString()) {

          // Empty property string value, eg: "" or "   "
          if (s.token.length === 2 || s.IsToken(Regex.EmptyString)) {
            s.Advance(1)
            error = ParseError.MissingProperty
            state = ScanState.Object
            return TokenType.ParseError
          }

          if (s.IfRegExp(/^]/)) {
            state = ScanState.Object
            cache = ScanCache.Reset
            return TokenType.ObjectProperty
          }

          error = ParseError.MissingBracketNotation
          state = ScanState.Object
          return TokenType.ParseError

        }

        // Missing quotation character, eg: "prop
        if (s.IsPrevRegExp(Regex.StringQuotations)) {
          s.Advance(1)
          error = ParseError.MissingQuotation
          state = ScanState.ParseError
          return ScanLiquid()
        }

        // Capture inner variable or object reference, eg: object[variable]
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        if (s.IsRegExp(/^[\s\t\r\n%}-]+/)) {
          s.Prev()
          error = ParseError.MissingProperty
          state = ScanState.ParseError
          return ScanLiquid()
        }

        if (s.IsCodeChar(c.DOT)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
        }

        break

      // LIQUID OBJECT BRACKET NOTATION END
      // ---------------------------------------------
      case ScanState.ObjectBracketNotationEnd:

        break

      // LIQUID FILTER OBJECT PROPERTY STRING
      // ---------------------------------------------
      case ScanState.ObjectPropertyString:

        return ScanLiquid()

      // PARSE ERROR
      //
      // -------------------------------------------
      case ScanState.ParseError: {

        // Recursive
        if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]/)) {
          state = ScanState.TagClose
          return TokenType.ParseError
        }

        state = ScanState.CharSeq
        return CharSeq()

      }

      // LIQUID TAG CLOSE
      //
      // ---------------------------------------------
      case ScanState.TagClose: {

        // Validate right side trim dash character
        // Check to see if whitespace proceeds the character
        if (cache !== ScanCache.TrimRight && s.IsToken(c.DSH)) {

          cache = ScanCache.TrimRight

          if (s.IsPrevRegExp(Regex.WhitespaceCharacters)) {
            s.Tokenize()
            error = ParseError.RejectWhitespace
            return TokenType.ParseError
          }

          cache = ScanCache.TrimRight
          return TokenType.LiquidTrimDashRight
        }

        // Tag is closed, eg: }} or %}
        if (s.IfRegExp(Regex.LiquidTagClose)) {
          return TokenType.LiquidTagClose
        }

        console.log('get here')

        state = ScanState.CharSeq
        return CharSeq()

      }

    }

    return ScanLiquid()

  }

  /**
   * Character Sequencing
   *
   * Advances source to delimiter start characters.
   * Sequence will capture HTML or Liquid characters.
   *
   * @returns {number}
   */
  function CharSeq () {

    console.log('heelo')
    s.UntilSequence(Regex.DelimiterCharacters)

    // LIQUID OPEN TAG DELIMITERS ^{{ | ^{%
    // ---------------------------------------------
    if (s.IfNextCodeChar(c.LCB)) {

      if (s.IfRegExp(Regex.OpenDelimiters)) {

        // Set starting position
        start = s.Offset(-2)
        state = s.IsCodeChar(c.DSH)
          ? ScanState.TagOpenTrim
          : ScanState.TagOpen

        if (s.IfPrevCodeChar(c.LCB)) {
          spec.type = TokenTags.object
          return TokenType.LiquidObjectTagOpen
        }

        return TokenType.LiquidTagOpen

      }

    }

    // HTML OPEN TAG DELIMITERS < | </ | <!--
    // ---------------------------------------------
    if (s.IfNextCodeChar(c.LAN)) {

      if (s.SkipWhitespace()) {
        return TokenType.ParseError
      }

      if (s.IfCodeChar(c.FWS)) {
        state = ScanState.HTMLTagClose
        return TokenType.HTMLEndTagOpen
      }

      if (s.IfChars([ c.BNG, c.DSH, c.DSH ])) {
        state = ScanState.HTMLCommentOpen
        return TokenType.HTMLStartCommentTag
      }

      if (s.IfRegExp(Regex.HTMLTagEnd)) {
        if (s.token === 'script') {
          return TokenType.HTMLStartTagOpen
        }
      }

      return CharSeq()

    }

    if (state !== ScanState.CharSeq) state = ScanState.CharSeq

    s.Advance(1)

  }

  /**
   * Runs document scan
   *
   * @param {number} [offset=0]
   * The position offset from which to start scanning
   *
   * @returns {number}
   */
  function scan (offset = 0, options = {}) {

    // Fast Forward to specified offset
    if (offset > 0) s.Jump(offset)

    // End of Stream
    if (s.EOS) return TokenType.EOS

    // Frontmatter must start at position 0
    if (offset === 0 && options.frontmatter) {

      if (s.SkipWhitespace()) return TokenType.ParseError

      if (s.IfChars([ c.DSH, c.DSH, c.DSH ])) {
        state = ScanState.FrontmatterOpen
        return TokenType.FrontmatterStart
      }
    }

    return state === ScanState.CharSeq ? CharSeq() : ScanLiquid()

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
    , get start () {

      return start

    }

    /**
     * Get Position
     */
    , get end () {

      return s.Position()

    }

    /**
     * Get Position
     */
    , get offset () {

      return s.Offset()

    }

    /**
     * Get Spaces
     */
    , get space () {

      return s.space

    }

    /**
     * Get Token
     */
    , get token () {

      return s.token

    }

    /**
     * Get Tag
     */
    , get tag () {

      return s.GetText(this.start, this.offset)

    }

    /**
     * Get Spec
     */
    , get spec () {

      return spec.cursor()

    }

    /**
     * Get Line
     */
    , get line () {

      return s.location.line

    }

    /**
     * Get Error
     */
    , get error () {

      return error

    }

    /**
     * Get Range
     *
     * @param {number} from
     * Starting Position which must be before current stream position
     *
     * @param {number} [end]
     * Ending position offset in current stream
     */
    , get range () {

      return s.range

    }

    /**
     * Get Text
     *
     * Returns a substring, by default the ending index is set
     * to the current position index, this is important because
     * this function requires you pass a starting position `from`.
     * The `from` parameter should not exceed the current position.
     *
     * @param {number} from
     * Starting Position which must be before current stream position
     *
     * @param {number} [end]
     * Ending position offset in current stream
     *
     */
    , getText (from, end = 0) {

      return end > from ? s.GetText(from, end || this.offset) : ''

    }

  })

})()
