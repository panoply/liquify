import { DSH, LCB, LAN, BNG, FWS, RCB, PIP, COL, DOT, LOB, ROB } from '../lexical/characters'
import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import * as Regex from '../lexical/regex'
import { ForEach } from './utils'
// import { TokenContext } from '../enums/context'
import { TokenTags } from '../enums/parse'
import { ParseError } from '../enums/errors'
import Specs from './specs'
import s from './stream'
import specs from './specs'

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
   * Error Number
   *
   * @type {number}
   */
  let error

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state = ScanState.CharSeq

  /**
   * Character Sequencing
   *
   * Advances source to delimiter start characters.
   * Sequence will capture HTML or Liquid characters.
   *
   * @returns {number}
   */
  const CharSeq = () => {

    s.UntilSequence(Regex.DelimiterCharacters)

    // LIQUID OPEN TAG DELIMITERS ^{{ | ^{%
    //
    // ---------------------------------------------
    if (s.IsCodeChar(LCB)) {

      // Set object type, eg: {{
      if (s.IfNextCodeChar(LCB)) {
        Specs.type = TokenTags.object
      }

      if (s.IfRegExp(Regex.DelimiterCapture)) {
        start = s.Offset(-2)
        state = ScanState.TagOpen
        return TokenType.LiquidTagOpen
      }

    }

    // HTML OPEN TAG DELIMITERS < | </ | <!--
    //
    // ---------------------------------------------
    if (s.IfNextCodeChar(LAN)) {

      if (s.SkipWhitespace()) {
        return TokenType.ParseError
      }

      if (s.IfCodeChar(FWS)) {
        state = ScanState.AfterHTMLEndTagName
        return TokenType.HTMLEndTagOpen
      }

      if (s.IfChars([ BNG, DSH, DSH ])) {
        state = ScanState.AfterOpeningHTMLComment
        return TokenType.HTMLStartCommentTag
      }

      if (s.IfRegExp(Regex.HTMLTagEnd)) {
        if (s.Token() === 'script') {
          return TokenType.HTMLStartTagOpen
        }
      }

      return CharSeq()

    }

    if (state !== ScanState.CharSeq) {
      state = ScanState.CharSeq
    }

    s.Advance(1)

  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  const ScanFrontmatter = () => {

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
   * Liquid language syntax tokenizer scanner.
   * TokenType enums are returned
   *
   * @returns {number}
   */
  const ScanLiquid = () => {

    // Skip whitespace
    if (s.SkipWhitespace()) {
      return TokenType.Whitespace
    }

    // Liquid tag closed, eg: }} or -%}
    if (state !== ScanState.ParseError) {
      if (state !== ScanState.AfterFilterValue && s.IsRegExp(Regex.LiquidTagClose)) {

        // Reset state
        state = ScanState.TagClose

        // Detect a missing tag name, eg: {{ }} or `{% %}`
        // Index position here would be before {{ or {% delimiters
        if (s.GetCodeChar() === RCB) {
          // error = ParseError.MissingTagName
        }
      }
    }

    // BEGIN SCAN
    //
    switch (state) {

      // LIQUID TAG OPEN
      //
      // {{^ or {%^
      //
      // -------------------------------------------
      case ScanState.TagOpen: {

        // Advance over whitespace control dash, eg: {{-  or {%-
        if (s.IfCodeChar(DSH)) {
          return ScanLiquid()
        }

        // Object tag references the predefined tag type in CharSeq()
        if (Specs.type === TokenTags.object) {

          // Object name
          if (s.IfRegExp(Regex.LiquidObjectName)) {

            // If spec exists for the object name, cursor should have type object
            state = Specs?.type === TokenTags.object
              ? ScanState.ObjectProperties
              : ScanState.ObjectUnknown

            return TokenType.LiquidObjectTag

          }

          state = ScanState.ParseError
          error = ParseError.InvalidObjectName

          return TokenType.ParseError

        }

        // Detect endtag, stream will move position from ^endtag to ^tag
        if (s.IfRegExp(Regex.LiquidEndTagSkip)) {
          state = ScanState.WithinEndTag
        }

        // Captures the tag name
        if (s.IfRegExp(Regex.LiquidTagName)) {

          // Set Specification
          Specs.cursor(s.Token())

          // Within end tag
          if (state === ScanState.WithinEndTag) {
            return TokenType.LiquidEndTag
          }

          // Within normal tag
          state = Specs.type
            ? ScanState.TagType
            : ScanState.TagUnknown

          return TokenType.LiquidTag

        }

        state = ScanState.ParseError
        error = ParseError.InvalidTagName

        return TokenType.ParseError

      }

      // PARSE ERROR
      //
      // -------------------------------------------
      case ScanState.ParseError: {

        if (error === ParseError.MissingObjectName) {
          state = ScanState.TagClose
          return TokenType.ParseError
        }

        if (error === ParseError.MissingTagName) {
          state = ScanState.TagClose
          return TokenType.ParseError
        }

        // Recursive
        if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]-?/)) {
          console.log('Parse Error', s.Token())

          state = ScanState.TagClose
          return TokenType.ParseError
        }

        error = ParseError.MissingCloseDelimiter
        state = ScanState.CharSeq

        return TokenType.LiquidEndTag

      }

      // TAG UNKNOWN
      //
      // ---------------------------------------------
      case ScanState.TagUnknown: {

        state = ScanState.CharSeq
        return TokenType.LiquidTagClose

      }

      // TAG TYPE
      //
      // ---------------------------------------------
      case ScanState.TagType: {

        // Control Type
        if (Specs.type === TokenTags.control) {
          state = ScanState.ControlCondition
        }

        // Iteration Type
        if (Specs.type === TokenTags.iteration) {
          state = ScanState.IterationIteree
        }

        return ScanLiquid()

      }

      // LIQUID OBJECT PROPERTIES
      //
      // ---------------------------------------------
      case ScanState.ObjectProperties: {

        if (s.IfCodeChar(PIP)) {
          state = ScanState.AfterFilterPipe
          return TokenType.Separator
        }

        // Object property value, eg: "object.prop"
        if (s.IfCodeChar(DOT)) {
          state = ScanState.ObjectDotNotation
        }

        // Object property via [ bracket, eg: "object["
        if (s.IfCodeChar(LOB)) {
          state = ScanState.ObjectBracketNotation
        }

        return ScanLiquid()

      }

      // LIQUID OBJECT DOT NOTATION
      //
      // "object.prop"
      //
      // ---------------------------------------------
      case ScanState.ObjectDotNotation: {

        // Skip whitespace
        error = s.SkipWhitespace()
          ? ParseError.MissingProperty // Whitespace after "." eg: "object."
          : ParseError.InvalidCharacter // Invalid Character, eg: "object.."

        // Gets Property, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          // Re-scan for properties on next iteration
          state = ScanState.ObjectProperties
          return TokenType.ObjectProperties

        }

        // Parse Error
        state = ScanState.ParseError
        return TokenType.ParseError

      }

      // LIQUID OBJECT BRACKET NOTATION
      //
      // object[prop] OR object['prop']
      //
      // ---------------------------------------------
      case ScanState.ObjectBracketNotation: {

        // String literal property, eg: "object['prop']"
        if (s.IsRegExp(Regex.StringQuotations)) {

          // String Literal, eg: ['prop]
          if (s.SkipQuotedString()) {

            // Reject extraneous spacing, eg: "' prop '"
            if (s.TokenContains(Regex.WhitespaceCharacters)) {
              state = ScanState.ParseError
              error = ParseError.RejectWhitespace
              return TokenType.ParseError
            }

            // Re-scan and consume bracket whitespacing, eg: "['prop'   ]"
            return ScanLiquid()

          } else {

            // Consume the first quotation character, eg: ' or "
            s.Advance(1)
            error = ParseError.MissingQuotation

          }
        }

        // Gets Property, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          s.Advance(1)

          // Re-scan for properties on next iteration
          if (s.IfCodeChar(DOT, false)) {
            state = ScanState.ObjectDotNotation
            return TokenType.ObjectProperties

          }

          return TokenType.ObjectProperties

        }

        // Right Open Bracket, eg: "]"
        if (s.IfCodeChar(ROB, false)) {
          state = ScanState.ObjectProperties
          return TokenType.ObjectProperties
        }

        // Missing quotation, eg: ['prop]
        state = ScanState.ObjectProperties
        return TokenType.ObjectProperties

      }

      // LIQUID FILTER PIPE SEPARATOR
      //
      // ---------------------------------------------
      case ScanState.AfterFilterPipe: {

        if (s.IfRegExp(/^[^\s:][a-zA-Z0-9$_]+\b/)) {
          Specs.cursor(s.Token())
          state = ScanState.AfterFilterName
          return TokenType.Filter
        }

        return TokenType.EOS

      }

      // LIQUID FILTER PIPE SEPARATOR
      //
      // ---------------------------------------------
      case ScanState.AfterFilterName: {

        console.log(s.Token())

        if (s.IfCodeChar(COL, false)) {
          if (Specs.params && s.IfSequence(/\||-?[%}]\}/)) {

            state = ScanState.AfterFilterValue
            return TokenType.Filter

            // state = ScanState.AfterFilterValue
            // Filter value is string
          }

          return ScanLiquid()

        }

        if (s.IsRegExp(Regex.StringQuotations)) {

          if (s.SkipQuotedString()) {
            state = ScanState.AfterFilterValue
          } else {
            // Missing a quote " or '
            state = ScanState.ParseError
            error = ParseError.MissingQuotation
            return ScanLiquid()
          }
        }

        return TokenType.EOS

      }

      case ScanState.AfterFilterValue: {

        ForEach(s.Token().split(','), (token, index) => {

          // Filter Parameter is a String, eg: 'string'
          if (Regex.StringQuotations.test(token.trimLeft()) === true) {

            // Token must start and end with matching quotation character, eg: ""
            console.log(
              'IN FILTER'
              , token
              , index
              , Specs.params[index]
              , s.Token().trim().split(',')
            )

          }

        })

        return TokenType.EOS

      }

      // LIQUID CONTROL CONDITION
      //
      // ---------------------------------------------
      case ScanState.ControlCondition: {

        // Control condition is a string - This should ALWAYS run first
        if (s.IsRegExp(/^['"]/)) {
          if (s.SkipQuotedString()) {
            state = ScanState.ControlOperator
          } else {
            // Missing a quote " or '
            state = ScanState.ParseError
            error = ParseError.MissingQuotation
            return ScanLiquid()
          }
        }

        // Control condition is not a string
        if (s.IfRegExp(/^[=!<>]{1,}|^[^\s]+\b/)) {
          if (state !== ScanState.ControlOperator) {
            state = ScanState.ControlOperator
          }
        }

        // Condition value is an object
        if (/\./.test(s.Token())) {
          return TokenType.Object
        }

        return TokenType.ControlCondition

      }

      // LIQUID CONTROL OPERATOR
      //
      // ---------------------------------------------
      case ScanState.ControlOperator: {

        if (s.IfRegExp(/^[=!<>]{1,}|^[^\s]+\b/)) {
          state = ScanState.ControlCondition
          return TokenType.ControlOperator
        }

        state = ScanState.TagClose
        return ScanLiquid()

      }

      // LIQUID ITERATION TAG
      //
      // ---------------------------------------------
      case ScanState.IterationIteree:
      case ScanState.IterationOperator:
      case ScanState.IterationArray:
      case ScanState.IterationParameter:
      case ScanState.IterationParameterValue: {

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

      }

      // LIQUID TAG CLOSE
      //
      // ---------------------------------------------
      case ScanState.WithinEndTag:
      case ScanState.TagClose: {

        if (s.IfNextCodeChar(DSH)) {
          // index = s.Offset(-1)
          return TokenType.LiquidWhitespaceDash
        }

        if (s.IfRegExp(/^-?[%}]\}/)) {

          state = ScanState.CharSeq

          if (Specs.type === TokenTags.object) {

            // If we are dealing with a missing tag name
            if (error === ParseError.MissingTagName) {
              error = ParseError.MissingObjectName
              return TokenType.ParseError
            }

            // Make sure we a dealing with an object tag
            if (s.IfPrevCodeChar(RCB)) {
              return TokenType.LiquidObjectTagClose
            }

          }

          return state === ScanState.WithinEndTag
            ? TokenType.LiquidEndTagClose
            : TokenType.LiquidTagClose

        }

        state = ScanState.ParseError
        error = ParseError.MissingCloseDelimiter
        return TokenType.ParseError

      }

      // HTML COMMENT OPEN
      //
      // <!--^
      //
      case ScanState.AfterOpeningHTMLComment: {

        break

      }

      // HTML START TAG OPEN
      //
      // <tag
      //
      case ScanState.HTMLOpenStartTag: {

        break
      }

      // HTML END TAG OPEN
      //
      // </tag ^
      //
      case ScanState.HTMLOpenEndTag: {

        break
      }

    }

    return ScanLiquid()

  }

  /**
   * Runs document scan
   *
   * @param {number} [offset=0]
   * The position offset from which to start scanning
   *
   * @returns {number}
   */
  const scan = (offset = 0, options = {}) => {

    if (offset > 0) {
      s.jump(offset)
    }

    if (s.EOS) {
      return TokenType.EOS
    }

    // frontmatter must start at position 0
    if (offset === 0 && options.frontmatter) {
      if (s.SkipWhitespace()) {
        return TokenType.ParseError
      }

      if (s.IfChars([ DSH, DSH, DSH ])) {
        state = ScanState.FrontmatterOpen
        return TokenType.FrontmatterStart
      }
    }

    return (state === ScanState.CharSeq
      ? CharSeq()
      : ScanLiquid()
    )

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
     * Get Dash
     */
    , get dash () {

      return s.GetCodeChar(start + 2) === DSH

    }

    /**
     * Get Position
     */
    , get offset () {

      return s.Offset()

    }

    /**
     * Get Token
     */
    , get token () {

      return s.Token()

    }

    /**
     * Get Tag
     */
    , get tag () {

      return s.GetText(this.start, this.offset)

    }

    /**
     * Get Position
     */
    , get position () {

      return s.location

    }

    /**
     * Get Range
     */
    , get range () {

      return {
        start: s.location
        , end: s.location
      }
    }

    /**
     * Get Spec
     */
    , get spec () {

      return Specs.cursor()

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
