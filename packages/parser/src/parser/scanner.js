
import { TokenType } from '../enums/types'
import { Scanners } from '../enums/scanners'
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
   * Tag Type
   *
   * The type of tag that we scanning
   *
   * @type {number}
   */
  let token

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

        s.Advance(1, true)

        state = ScanState.TagOpen
        return TokenType.LiquidTrimDashLeft

      case ScanState.TagOpen:

        // Validate starting character of tag is valid
        if (!s.IsRegExp(Regex.LiquidFirstCharacter)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
          return ScanLiquid()
        }

        // Tag is an object, as per predefined type in CharSeq()
        if (spec.type === TokenTags.object) {

          // If value is string, eg: {{ 'name' }}
          if (s.IsRegExp(Regex.StringQuotations)) {

            // Next call we will look for a filter value, eg: {{ 'value' | }}
            state = ScanState.Filter

            // Capture the string token value, eg: 'value' or "value"
            if (s.SkipQuotedString()) return TokenType.String

            // If we get here, string is missing a quotation
            error = ParseError.MissingQuotation
            state = ScanState.ParseError
            return ScanLiquid()

          }

          // Variable or Object was detected, eg: {{ name }} or {{ object.prop }}
          if (s.IfRegExp(Regex.LiquidObjectName)) {

            // Match captured token with a cursor value
            spec.cursor(s.token)

            console.log(spec.data)

            // Next call we will look for a property notation
            state = ScanState.Object
            return TokenType.Object

          }

          // If we get here, invalid object name
          error = ParseError.InvalidObjectName
          state = ScanState.ParseError

          return ScanLiquid()

        }

        break

      case ScanState.Object:

        // Object property dot, eg: object.
        if (s.IfCodeChar(c.DOT)) {
          state = ScanState.ObjectDotNotation
          return TokenType.ObjectDotNotation
        }

        // Object property bracket notation, eg: object[
        if (s.IfCodeChar(c.LOB)) {

          // We will cache this bracket notation
          cache = ScanCache.BracketNotation

          state = ScanState.ObjectBracketNotation
          return TokenType.ObjectBracketNotationOpen
        }

        // We will attempt to close the right side bracket notation
        if (cache === ScanCache.BracketNotation) {

          if (s.IfCodeChar(c.ROB)) {
            state = ScanState.Object
            cache = ScanCache.Reset
            return TokenType.ObjectBracketNotationClose
          }

          // If we get here, there is a missing bracket, eg: object["prop"
          error = ParseError.MissingBracketNotation
          state = ScanState.ParseError
          return ScanLiquid()

        }

        // If Tag is an object, we will look for filters, eg: {{ tag | }}
        if (s.IfNextCodeChar(c.PIP)) {
          state = ScanState.Filter
          return TokenType.Filter
        }

        // Lets attempt to close the the object tag
        state = ScanState.TagClose
        return ScanLiquid()

      case ScanState.ObjectDotNotation:

        // Gets property value on object, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          // Pass back to object to look for any additional properties
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        // Lets validate a property value exists proceeding the dot notation
        if (s.IsRegExp(/^[\s\t\r\n%}-]+/)) {

          // Lets move back one step to align token for error diagnostic
          s.Prev()

          error = ParseError.MissingProperty
          state = ScanState.ParseError
          return ScanLiquid()

        }

        // Lets check to see if an extra dot character, eg: {{ object.. }}
        if (s.IsCodeChar(c.DOT)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
        }

        return ScanLiquid()

      case ScanState.ObjectBracketNotation:

        // Check to see we no empty bracket notations, eg: []
        if (s.IsCodeChar(c.ROB) && s.IsToken(c.LOB)) {

          // We advance 1 step and also tokenize for error diagnostic
          s.Advance(1, true)

          // Reset the cache reference, we have consumed the right bracket
          cache = ScanCache.Reset

          error = ParseError.MissingProperty
          state = ScanState.Object

          // We will continue parsing the token after error
          return TokenType.ParseError
        }

        // Capture string object property, eg: object["prop"]
        if (s.SkipQuotedString()) {

          // Detect an empty property string value, eg: "" or "   "
          if (s.token.length === 2 || s.IsToken(Regex.EmptyString)) {

            // Advance 1 step to align cursor and tokenize
            s.Advance(1)

            error = ParseError.MissingProperty
            state = ScanState.Object

            // We will continue parsing the token after error
            return TokenType.ParseError
          }

          // We have captured the property string, pass back to object scan
          state = ScanState.Object
          return TokenType.ObjectProperty

        }

        // We have a missing quotation character, eg: "prop
        if (s.IsPrevRegExp(Regex.StringQuotations)) {

          // Advance 1 step to align cursor and tokenize
          s.Advance(1)

          error = ParseError.MissingQuotation
          state = ScanState.ParseError

          // We will consume entire token for this error
          return ScanLiquid()
        }

        // Capture inner variable or object reference, eg: object[variable]
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          // Pass it back to object scan, check for any properties
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        break

      case ScanState.Filter:

        if (s.IfRegExp(/^[^:]*\b/)) {
          state = ScanState.FilterIdentifier
          return TokenType.Filter
        }

        state = ScanState.TagClose
        return ScanLiquid()

      case ScanState.FilterIdentifier:

        if (s.IfCodeChar(c.COL)) {
          return TokenType.Separator
        }

        if (s.IsRegExp(Regex.StringQuotations)) {
          if (s.SkipQuotedString()) {
            state = ScanState.FilterArgument
            return TokenType.FilterParameter
          } else {
            // Missing a quote " or '
            state = ScanState.ParseError
            error = ParseError.MissingQuotation
            return ScanLiquid()
          }
        }

        error = ParseError.MissingFilter
        state = ScanState.ParseError
        return ScanLiquid()

      case ScanState.FilterOperator:
        break

      case ScanState.FilterArgument:

        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterIdentifierUnknown
          return TokenType.Separator
        }

        state = ScanState.ObjectProperty
        return ScanLiquid()

      case ScanState.FilterSeparator:

        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterArgument
          return TokenType.Separator
        }

        state = ScanState.ObjectProperty
        return ScanLiquid()

      case ScanState.FilterParameter:
        break
        // FILTER ARGUMENT PARAMETER OPERATOR
        // ---------------------------------------------
      case ScanState.FilterParameterOperator:
        break
        // FILTER ARGUMENT PARAMETER OPERATOR
        // ---------------------------------------------
      case ScanState.FilterParameterArgument:
        break

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
      case ScanState.TagClose:

        // Validate right side trim dash character
        if (s.IfCodeChar(c.DSH)) {

          // Check to see if whitespace proceeds the character
          if (s.SkipWhitespace()) {
            error = ParseError.RejectWhitespace
            return TokenType.ParseError
          }

          return TokenType.LiquidTrimDashRight
        }

        // Tag is closed, eg: }} or %}
        if (s.IfRegExp(Regex.LiquidTagClose)) {
          return TokenType.LiquidTagClose
        }

        state = ScanState.CharSeq
        return CharSeq()

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

    s.UntilSequence(Regex.DelimiterCharacters)

    // Liquid left-side delimiter detected, eg: {
    if (s.IfNextCodeChar(c.LCB)) {

      // Validate we have a Liquid tag, eg: {{ or {%
      if (s.IfRegExp(Regex.OpenDelimiters)) {

        // Assert Start position and state
        start = s.cursor

        // Delimiter infers a trim dash, eg: {{-  or {%-
        state = s.IsCodeChar(c.DSH)
          ? ScanState.TagOpenTrim
          : ScanState.TagOpen

        // Liquid object type delimiter, eg: {{
        // Preset the specification type
        if (s.IfPrevCodeChar(c.LCB)) {
          spec.type = TokenTags.object
          return TokenType.LiquidObjectTag
        }

        // Liquid tag type delimiter, eg: {%
        return TokenType.LiquidTag

      }
    }

    if (s.IfNextCodeChar(c.LAN)) {

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
  function scan (offset = 0) {

    // Fast Forward to specified offset
    if (offset > 0) s.Jump(offset)

    // End of Stream
    if (s.EOS) return TokenType.EOS

    // Dispatch the scanner
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
