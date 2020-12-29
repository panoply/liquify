import { DSH, LCB, LAN, BNG, FWS, RCB } from '../lexical/characters'
import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import { TokenTags } from '../enums/parse'
import { ParseError } from '../enums/errors'
import stream from './stream'
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
   * Index Offset
   *
   * @type {number}
   */
  let index

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
   * Advances source to delimeter start characters.
   * Sequence will capture HTML or Liquid characters.
   *
   * @returns {number}
   */
  const CharSeq = () => {

    stream.untilSequence(/[{<]{1}/)

    // LIQUID OPEN TAG DELIMETERS {{ | {%
    //
    // ---------------------------------------------
    if (stream.isCodeChar(LCB)) {

      if (stream.nextCodeChar(LCB)) {
        specs.type = TokenTags.object
      }

      index = stream.position()

      if (stream.ifRegExp(/^{[{%]{1}/)) {
        state = ScanState.TagOpen
        return TokenType.LiquidTagOpen
      }

    }

    // HTML OPEN TAG DELIMETERS < | </ | <!--
    //
    // ---------------------------------------------
    if (stream.ifChar(LAN)) {

      if (stream.skipWhitespace()) {
        return TokenType.ParseError
      }

      if (stream.ifChar(FWS)) {
        state = ScanState.AfterHTMLEndTagName
        return TokenType.HTMLEndTagOpen
      }

      if (stream.ifChars([ BNG, DSH, DSH ])) {
        state = ScanState.AfterOpeningHTMLComment
        return TokenType.HTMLStartCommentTag
      }

      if (stream.ifRegExp(/^[^\s"'>]+/)) {
        if (stream.token() === 'script') {
          return TokenType.HTMLStartTagOpen
        }
      }

      return CharSeq()

    }

    if (state !== ScanState.CharSeq) {
      state = ScanState.CharSeq
    }

    stream.advance(1)

  }

  /**
   * After Opening Frontmatter
   *
   * @returns {void|number}
   */
  const ScanFrontmatter = () => {

    if (stream.untilChars('---', true)) {
      index = stream.position(-3)
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

    index = stream.position()

    if (stream.skipWhitespace()) {
      return TokenType.Whitespace
    }

    if (stream.isRegExp(/^-?[%}]{1}\}/)) {
      state = ScanState.TagClose
    }

    console.log('start of liquid', index, stream.token())

    switch (state) {

      // LIQUID TAG OPEN
      //
      // -------------------------------------------
      case ScanState.TagOpen: {

        // Whitespace Strip Dash, eg: `{{-` or `{%-`
        if (stream.isCodeChar(DSH)) {
          index = stream.position()
          stream.advance(1)
          return TokenType.LiquidWhitespaceDash
        }

        // Detect endtag, stream will move position from ^endtag to ^tag
        if (stream.ifRegExp(/^\bend/)) {
          state = ScanState.WithinEndTag
        }

        // Captures the tag name or object name
        if (stream.ifRegExp(/^\b[a-zA-Z_]{1,}(?:(?=\.{1}))?/)) {

          specs.cursor(stream.token())

          // Within end tag
          if (state === ScanState.WithinEndTag) {
            return TokenType.LiquidEndTag
          }

          // Object tag references the predefined tag type in `charseq`
          if (specs.type === TokenTags.object) {
            state = ScanState.ObjectName
            return TokenType.LiquidObjectTag
          }

          // Within normal tag
          state = ScanState.TagType
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

        // Recursive
        if (stream.consumeUnless(/-?[%}]\}/, /\{[{%]-?/)) {
          console.log('Parse Error', stream.token())
          state = ScanState.TagClose
          return TokenType.LiquidTagClose
        }

        error = ParseError.MissingCloseDelimeter
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

        // Object Type
        if (specs.type === TokenTags.object) {
          state = ScanState.ObjectProperties
        }

        // Control Type
        if (specs.type === TokenTags.control) {
          state = ScanState.ControlCondition
        }

        // Iteration Type
        if (specs.type === TokenTags.iteration) {
          state = ScanState.IterationIteree
        }

        return ScanLiquid()

      }

      // LIQUID OBJECT NAME
      //
      // ---------------------------------------------
      case ScanState.ObjectName: {

        state = ScanState.ObjectProperties
        return TokenType.Object

      }

      // LIQUID OBJECT PROPERTIES
      //
      // ---------------------------------------------
      case ScanState.ObjectProperties: {

        if (stream.ifRegExp(/^[^\s]*\b/)) return TokenType.ObjectProperties

        console.log(stream.token())

        return ScanLiquid()

      }

      // LIQUID CONTROL CONDITION
      //
      // ---------------------------------------------
      case ScanState.ControlCondition: {

        // Control condition is a string - This should ALWAYS run first
        if (stream.isRegExp(/^['"]/)) {
          if (stream.skipQuotedString()) {
            state = ScanState.ControlOperator
          } else {
            // Missing a quote " or '
            state = ScanState.ParseError
            error = ParseError.MissingQuotation
            return TokenType.ParseError
          }
        }

        // Control condition is not a string
        if (stream.ifRegExp(/^[=!<>]{1,}|^[^\s]+\b/)) {
          if (state !== ScanState.ControlOperator) {
            state = ScanState.ControlOperator
          }
        }

        // Condition value is an object
        if (/\./.test(stream.token())) {
          return TokenType.Object
        }

        return TokenType.ControlCondition

      }

      // LIQUID CONTROL OPERATOR
      //
      // ---------------------------------------------
      case ScanState.ControlOperator: {

        if (stream.ifRegExp(/^[=!<>]{1,}|^[^\s]+\b/)) {
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

        if (stream.ifChar(DSH)) {
          index = stream.position(-1)
          return TokenType.LiquidWhitespaceDash
        }

        if (stream.ifRegExp(/^-?[%}]{1}\}/)) {

          state = ScanState.CharSeq

          if (specs.type === TokenTags.object) {
            if (stream.prevCodeChar(RCB)) {
              return TokenType.LiquidObjectTagClose
            }
          }

          return state === ScanState.WithinEndTag
            ? TokenType.LiquidEndTagClose
            : TokenType.LiquidTagClose

        }

        state = ScanState.ParseError
        error = ParseError.MissingCloseDelimeter

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
  const scanner = (offset = 0, options = {}) => {

    if (offset > 0) {
      stream.jump(offset)
    }

    if (stream.EOS) {
      return TokenType.EOS
    }

    // frontmatter must start at position 0
    if (offset === 0 && options.frontmatter) {
      if (stream.skipWhitespace()) {
        return TokenType.ParseError
      }

      if (stream.ifChars([ DSH, DSH, DSH ])) {
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
    scanner

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
     * Get Spec
     */
    , get spec () { return specs.cursor() }

    /**
     * Get Line
     */
    , get line () { return stream.location.line }

    /**
     * Get Error
     */
    , get error () { return error }

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
     * Get Range
     *
     * @returns {object}
     */
    , getRange: () => stream.location

  })

})()
