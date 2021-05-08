
import { TokenType } from '../enums/types'
import { ScanState, ScanCache } from '../enums/state'
import * as Regex from '../lexical/regex'
import * as c from '../lexical/characters'
import { ForEach } from './utils'
// import { TokenContext } from '../enums/context'
import { TokenTags } from '../enums/parse'
import { ParseError } from '../enums/errors'
import Specs from './specs'
import s from './stream'

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
   * Error Number
   *
   * @type {number}
   */
  let param

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
  function CharSeq () {

    s.UntilSequence(Regex.DelimiterCharacters)

    // LIQUID OPEN TAG DELIMITERS ^{{ | ^{%
    //
    // ---------------------------------------------
    if (s.IfNextCodeChar(c.LCB)) {

      if (s.IfRegExp(Regex.OpenDelimiters)) {

        // Set object type, eg: {{
        if (s.IfPrevCodeChar(c.LCB)) Specs.type = TokenTags.object

        start = s.Offset(-2)
        state = ScanState.TagOpen

        return TokenType.LiquidTagOpen
      }

    }

    // HTML OPEN TAG DELIMITERS < | </ | <!--
    //
    // ---------------------------------------------
    if (s.IfNextCodeChar(c.LAN)) {

      if (s.SkipWhitespace()) {
        return TokenType.ParseError
      }

      if (s.IfCodeChar(c.FWS)) {
        state = ScanState.AfterHTMLEndTagName
        return TokenType.HTMLEndTagOpen
      }

      if (s.IfChars([ c.BNG, c.DSH, c.DSH ])) {
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

    if (state !== ScanState.CharSeq) state = ScanState.CharSeq

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
   * Liquid c.language syntax tokenizer scanner.
   * TokenType enums are returned
   *
   * @returns {number}
   */
  function ScanLiquid () {

    // Skip whitespace
    if (s.SkipWhitespace()) {
      return ScanLiquid()
    }

    // BEGIN SCAN
    //
    switch (state) {

      // LIQUID TAG OPEN
      //
      // {{^ or {%^
      // -------------------------------------------
      case ScanState.TagOpen: {

        // Advance over whitespace control dash, eg: {{-  or {%-
        if (s.IfCodeChar(c.DSH)) return TokenType.LiquidTrimDashLeft

        // Object tag references the predefined tag type in CharSeq()
        if (Specs.type === TokenTags.object) {

          // Object name
          if (s.IfRegExp(Regex.LiquidObjectName)) {
            state = ScanState.ObjectName
            return TokenType.LiquidObjectTag
          } else {
            state = ScanState.ParseError
            error = ParseError.InvalidObjectName
          }

          return ScanLiquid()

        }

        // Detect endtag, stream will move position from ^endtag to ^tag
        if (s.IfRegExp(Regex.LiquidEndTagSkip)) {
          state = ScanState.WithinEndTag
        }

        // Captures the tag name
        if (s.IfRegExp(Regex.LiquidTagName)) {

          // Set Specification
          Specs.cursor(s.token)

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

        if (error === ParseError.InvalidObjectName) {
          state = ScanState.TagClose
          return TokenType.ParseError
        }

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

      // OBJECT NAME
      //
      // ---------------------------------------------
      case ScanState.ObjectName: {

        // Set Specification
        Specs.cursor(s.token)

        state = Specs?.type === TokenTags.object
          ? ScanState.ObjectProperty
          : ScanState.ObjectUnknown

        return TokenType.Object

      }

      // LIQUID OBJECT PROPERTIES
      //
      // ---------------------------------------------
      case ScanState.ObjectProperty: {

        // Object property value, eg: "object.prop"
        if (s.IfCodeChar(c.DOT)) {
          state = ScanState.ObjectDotNotation
          return ScanLiquid()
        }

        // Object property via [ bracket, eg: "object["
        if (s.IfCodeChar(c.LOB)) {
          state = ScanState.ObjectBracketNotation
          return TokenType.ObjectBracketNotationOpen
        }

        if (s.IfCodeChar(c.ROB)) {
          return TokenType.ObjectBracketNotationClose
        }

        // Tag has filter, single object value was expressed, eg {{ name | }}
        if (s.IfCodeChar(c.PIP)) {
          state = ScanState.AfterFilterPipe
          return TokenType.Separator
        }

        // Tag is closed, eg: }}
        if (s.IsRegExp(Regex.LiquidObjectTagClose)) {
          state = ScanState.TagClose
          return ScanLiquid()
        }

        state = ScanState.ParseError
        error = ParseError.InvalidCharacter
        return ScanLiquid()

      }

      // LIQUID OBJECT DOT NOTATION
      //
      // ---------------------------------------------
      case ScanState.ObjectDotNotation: {

        // Gets Property, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {
          state = ScanState.ObjectProperty
          return TokenType.ObjectProperty
        }

        // Get here, there was an error
        state = ScanState.ParseError

        // If next character is filter or closing delimiter
        // Property is missing, else its an invalid character
        error = s.IsRegExp(/^[|%}-]]/)
          ? ParseError.MissingProperty
          : ParseError.InvalidCharacter

        return ScanLiquid()

      }

      // LIQUID OBJECT BRACKET NOTATION
      //
      // object[prop] OR object['prop']
      //
      // ---------------------------------------------
      case ScanState.ObjectBracketNotation: {

        // Bracket notation object property
        if (cache === ScanCache.BracketNotationStart) {

          // Empty bracket notation, eg: {{ object[] }}
          if (s.IfCodeChar(c.ROB, false)) {
            error = ParseError.MissingProperty
            state = ScanState.ParseError
            return ScanLiquid()
          }

          // Property is a string, eg: {{ object["prop"] }}
          if (s.IsRegExp(Regex.StringQuotations)) {
            state = ScanState.ObjectPropertyString
            cache = ScanCache.BracketNotationString
            return ScanLiquid()
          }
        }

        // Property is a variable or object, eg: {{ object[prop] }}
        if (s.IfRegExp(Regex.LiquidObjectName)) {
          // Bracket notation contained a variable only, eg: {{ object[var]}}
          state = ScanState.ObjectProperty
          return TokenType.Object
        }

        console.log('here')

        // We have an error
        state = ScanState.ParseError
        return ScanLiquid()

      }

      // LIQUID FILTER OBJECT PROPERTY STRING
      // {{ object["prop"] }}
      // ---------------------------------------------
      case ScanState.ObjectPropertyString: {

        // Right Open Bracket, eg: "]"
        if (s.IfCodeChar(c.ROB)) {
          state = ScanState.ObjectProperty
          console.log(cache === ScanCache.BracketNotationObject)
          return TokenType.ObjectBracketNotationClose
        }

        // String literal property, eg: "object['prop']"
        if (s.SkipQuotedString()) {

          // Reject extraneous spacing, eg: "' prop '"
          if (s.TokenContains(Regex.WhitespaceCharacters)) {
            state = ScanState.ParseError
            error = ParseError.RejectWhitespace
            return ScanLiquid()
          }

          // skips whitespace, eg: {{ object["prop"   ]  }}
          s.SkipWhitespace()
          return TokenType.ObjectPropertyString

        }

        // Missing quotation character, eg: {{ object["prop ]}}
        error = ParseError.MissingQuotation
        state = ScanState.ParseError

        return ScanLiquid()

      }

      // LIQUID FILTER c.PIPE SEPARATOR
      //
      // ---------------------------------------------
      case ScanState.AfterFilterPipe: {

        if (s.IfRegExp(/^[^:][a-zA-Z0-9$_]+\b/)) {
          state = ScanState.AfterFilterName
          return TokenType.Filter
        }

        error = ParseError.MissingFilter
        state = ScanState.ParseError
        return ScanLiquid()

      }

      // LIQUID FILTER c.PIPE SEPARATOR
      //
      // ---------------------------------------------
      case ScanState.AfterFilterName: {

        if (s.IfCodeChar(c.COL)) {
          return TokenType.Separator
        }

        if (s.IsRegExp(Regex.StringQuotations)) {
          if (s.SkipQuotedString()) {
            state = ScanState.AfterFilterValue
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

      }

      case ScanState.AfterFilterValue: {

        if (s.IfCodeChar(c.COM)) {
          state = ScanState.AfterFilterName
          return TokenType.Separator
        }

        state = ScanState.ObjectProperty
        return ScanLiquid()

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

        // console.log(s.token)

        // Trim right whitespace dash
        if (s.IfCodeChar(c.DSH)) return TokenType.LiquidTrimDashRight

        // Tag is closed, eg: }} or %}
        if (s.IfRegExp(Regex.CloseDelimiters)) {

          if (Specs.type === TokenTags.object) {

            // If we are dealing with a missing tag name
            if (error === ParseError.MissingTagName) {
              error = ParseError.MissingObjectName
              return TokenType.ParseError
            }

            // Make sure we a dealing with an object tag
            if (s.IfPrevCodeChar(c.RCB)) {
              state = ScanState.CharSeq
              return TokenType.LiquidObjectTagClose
            }

          }

          return state === ScanState.WithinEndTag
            ? TokenType.LiquidEndTagClose
            : TokenType.LiquidTagClose

        }

        state = ScanState.ParseError
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
  function scan (offset = 0, options = {}) {

    if (offset > 0) s.jump(offset)

    if (s.EOS) return TokenType.EOS

    // frontmatter must start at position 0
    if (offset === 0 && options.frontmatter) {
      if (s.SkipWhitespace()) {
        return TokenType.ParseError
      }

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
