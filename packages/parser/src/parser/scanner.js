
import { TokenType } from '../enums/types'
import { ScanState, ScanCache } from '../enums/state'
import { TokenTags } from '../enums/tags'
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
   * Pairs
   *
   * Holds a number value and used to count start
   * and end characters, eg: []
   *
   * @type {number[]}
   */
  const pairs = []

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

        // Align the cursor position so we tokenize the dash
        s.Cursor()

        // Advance index by 1 and tokenize dash
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

            // console.log(spec.data)

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

          // Track start and end brackets
          pairs.push(s.offset)

          state = ScanState.ObjectBracketNotation
          return TokenType.ObjectBracketNotationOpen
        }

        // We have bracket notation end character, eg: ]
        if (s.IfCodeChar(c.ROB)) {

          if (pairs.length === 0) {
            error = ParseError.InvalidCharacter
            return TokenType.ParseError
          }

          //  Have pair, remove previous LOB position
          pairs.pop()

          cache = ScanCache.Reset
          state = ScanState.Object
          return TokenType.ObjectBracketNotationClose
        }

        if (pairs.length > 0) {

          // Rewind token to unclosed LOB and capture error
          s.Rewind(pairs.shift(), /[[\]]/)

          // Clear the pairs array
          while (pairs.length > 0) pairs.pop()

          error = ParseError.MissingBracketNotation
          return TokenType.ParseError
        }

        // Check to see if we scanning filter arguments
        if (spec.filter.within) {

          // Reconnect to filter specification
          spec.filter.cursor()

          // Next characters should be separators, eg: {{ tag | foo: bar.baz^, }}
          state = ScanState.FilterSeparator
          return ScanLiquid()
        }

        // If Tag is an object, we will look for filters, eg: {{ tag | }}
        if (s.IsCodeChar(c.PIP)) {
          state = ScanState.Filter
          return ScanLiquid()
        }

        state = ScanState.TagClose
        return ScanLiquid()

      case ScanState.ObjectDotNotation:

        // Gets property value on object, eg: "prop" in "object.prop"
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          // Pass back to object to look for any additional properties
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        // Ensure we have a missing property, eg: {{ object.^ }}
        if (s.IsRegExp(/^[\s\t\r\n%}-]+/)) {

          // Align token cursor, eg: {{ object^. }}
          s.Prev()

          error = ParseError.MissingProperty
          state = ScanState.ParseError
          return ScanLiquid()

        }

        // Check to see if an extra dot character, eg: {{ object.. }}
        if (s.IsCodeChar(c.DOT)) {
          error = ParseError.InvalidCharacter
          state = ScanState.ParseError
        }

        // If we get here, property is invalid
        error = ParseError.InvalidProperty
        state = ScanState.GotoTagEnd
        return TokenType.ParseError

      case ScanState.ObjectBracketNotationEnd:

        // We will attempt to close the right side bracket notation
        if (s.IfCodeChar(c.ROB)) {

          // We assert that we have just closed a bracket
          cache = ScanCache.BracketNotationClose
          state = ScanState.Object
          return TokenType.ObjectBracketNotationClose
        }

        // If we get here, there is a missing bracket, eg: object["prop"
        error = ParseError.MissingBracketNotation
        state = ScanState.Object
        return TokenType.ParseError

      case ScanState.ObjectBracketNotation:

        // Check to see we no empty bracket notations, eg: []
        if (s.IsCodeChar(c.ROB) && s.IsToken(c.LOB)) {

          // We advance 1 step and also tokenize for error diagnostic
          s.Advance(1, true)

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

          // Next character should be closing bracket notation, eg ]
          state = ScanState.ObjectBracketNotationEnd
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

        // Property is a number value, eg: object.prop[0]
        if (s.IfRegExp(/^\d+/)) {

          // Next character should be closing bracket notation, eg ]
          state = ScanState.ObjectBracketNotationEnd
          return TokenType.ObjectPropertyNumber
        }

        // Capture inner variable or object reference, eg: object[variable]
        if (s.IfRegExp(Regex.LiquidObjectProperty)) {

          // Assert we are in a bracket property
          cache = ScanCache.BracketNotation

          // Pass it back to object scan, check for any properties
          state = ScanState.Object
          return TokenType.ObjectProperty
        }

        // If we get here, property is invalid
        error = ParseError.InvalidProperty
        state = ScanState.ParseError
        return ScanLiquid()

      case ScanState.Filter:

        // Tag has a pipe separator, we will look for a filter
        if (s.IfCodeChar(c.PIP)) {
          state = ScanState.FilterIdentifier
          return TokenType.Filter
        }

        // Attempt to close tag, we are here: {{ tag | filter^ }}
        state = ScanState.TagClose
        return ScanLiquid()

      case ScanState.FilterIdentifier:

        // Filter identifier, lets capture, eg: {{ tag | ^filter }}
        if (s.IfRegExp(/^[a-zA-Z_]*/)) {

          // Find specification for this filter
          spec.cursor(s.token)

          // We are dealing with an unknown filter, consume token
          if (!spec.exists) {
            error = ParseError.InvalidFilter
            state = ScanState.GotoTagEnd
            return TokenType.ParseError
          }

          // Next scan we will look for color operator, eg: {{ tag | filter^:}}
          state = ScanState.FilterOperator
          return TokenType.FilterIdentifier
        }

        // If we get here, its an empty filter expression, eg: {{ tag | }}
        error = ParseError.MissingFilterArgument

        // We wont consume tag, instead we keep scanning
        state = ScanState.Filter
        return TokenType.ParseError

      case ScanState.FilterOperator:

        // Check the next token is a colon
        if (s.IsCodeChar(c.COL) && !spec.filter.arguments) {

          // If spec exists and arguments do not exist, throw an error
          error = ParseError.RejectFilterArguments
          state = ScanState.Filter
          return ScanLiquid()
        }

        // Filter contains no arguments
        if (!spec.filter.arguments) {
          state = ScanState.Filter
          return ScanLiquid()
        }

        // Lets consume the colon operator, eg: {{ tag | filter:^ }}
        if (s.IfCodeChar(c.COL)) {
          state = ScanState.FilterArgumentType
          return TokenType.FilterOperator
        }

        error = ParseError.MissingFilterArgument
        state = ScanState.GotoTagEnd
        return TokenType.ParseError

      case ScanState.FilterArgumentType:

        if (spec.filter.type('argument')) {
          state = ScanState.FilterArgument
          return ScanLiquid()
        }

        if (spec.filter.type('parameter')) {
          state = ScanState.FilterParameter
          return ScanLiquid()

        }

        if (spec.filter.type('spread')) {
          state = ScanState.FilterSpread
          return ScanLiquid()

        }

        state = ScanState.TagClose
        return ScanLiquid()

      case ScanState.FilterArgument:

        // Capture an argument expressed as a string
        if (s.SkipQuotedString()) {

          // Make sure filter argument accepts a string
          if (spec.filter.accept('string')) {

            // If another filter argument is required pass to separator
            state = ScanState.FilterSeparator
            return TokenType.FilterArgument

          }

          // If we get here, the filter argument does not accept string type
          error = ParseError.RejectString
          state = ScanState.FilterSeparator
          return TokenType.ParseError

        }

        // We have a missing quotation character, eg: "argument
        if (s.IsPrevRegExp(Regex.StringQuotations)) {

          // Advance 1 step to align cursor and tokenize
          s.Advance(1)

          error = ParseError.MissingQuotation
          state = ScanState.ParseError

          // We will consume entire token for this error
          return ScanLiquid()
        }

        // Filter argument accepts number type, eg: {{ tag | filter: 10 }}
        if (spec.filter.accept('number')) {
          if (s.IfRegExp(/^\d*/)) {

            // We pass back to separator scan, look for more arguments
            state = ScanState.FilterSeparator
            return TokenType.FilterArgumentNumber
          }
        }

        // Check if filter argument accepts a reference
        if (spec.filter.accept('reference')) {
          if (s.IfRegExp(Regex.LiquidObjectName)) {

            // Match captured token with a cursor value
            spec.cursor(s.token)

            // Next call we will look for a property notation
            state = ScanState.Object
            return TokenType.Object
          }
        }

        // This is the last accepted filter argument
        if (!spec.filter.next) {
          state = ScanState.TagClose
          return TokenType.FilterArgument
        }

        // Missing a quote " or '
        state = ScanState.ParseError
        error = ParseError.MissingFilterArgument
        return ScanLiquid()

      case ScanState.FilterSeparator:

        // If last argument was processed pass back to filter
        if (spec.filter.last) {

          // Reset filter specification
          spec.filter.reset()

          state = ScanState.Filter
          return ScanLiquid()
        }

        spec.filter.next()

        // console.log(spec.get.arguments)
        // console.log('here', s.token, spec.filter.next())
        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterArgument
          return TokenType.Separator
        }

        if (!spec.filter.required) {

          state = ScanState.Filter

          // Reset filter specification
          spec.filter.reset()

          return ScanLiquid()
        }

        // console.log('here', s.token)

        state = ScanState.ParseError
        error = ParseError.MissingFilterArgument
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

      case ScanState.GotoTagEnd: {

        // Recursive
        if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]/, false)) {
          state = ScanState.TagClose
          return ScanLiquid()
        }

        // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

        state = ScanState.CharSeq
        return CharSeq()

      }

      // PARSE ERROR
      //
      // -------------------------------------------
      case ScanState.ParseError: {

        // Recursive
        if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]/)) {

          // console.log(s.token, 'closed')

          state = ScanState.TagClose
          return cache === ScanCache.GotoEnd
            ? ScanLiquid()
            : TokenType.ParseError

        }

        // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

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

          // We have asserted a trim character is valid
          // Next scan we will validate the delimiter sequence
          return TokenType.LiquidTrimDashRight

        }

        // Ensure we can close the tag and no invalid characters exist
        if (!s.IsRegExp(/^[%}]\}/)) {

          // We will consume the invalid character or string
          if (s.ConsumeUntil(/[\n\s\t\r%}]\}/, /\{[{%]/)) {

            // console.log(s.token)

            error = s.token.length === 1
              ? ParseError.InvalidCharacter
              : ParseError.InvalidCharacters

            // Process the error
            return TokenType.ParseError

          }

          if (s.IfRegExp(/^[%}]/)) {
            console.log('we are here', s.token)
            // If we get here we are missing a closing delimiter
            state = ScanState.CharSeq
            error = ParseError.MissingCloseDelimiter
            return TokenType.LiquidTagClose
          }

          // If we get here we are missing a closing delimiter
          state = ScanState.CharSeq
          error = ParseError.MissingCloseDelimiter
          return TokenType.ParseError

        }

        // We reset state and begin scanning for character sequences
        state = ScanState.CharSeq

        // Tag is closed, eg: }} or %}
        if (s.IfRegExp(Regex.LiquidTagClose)) {
          return TokenType.LiquidTagClose
        }

        // Fall through, move to character sequencing
        return CharSeq()

    }

    // Falls through, we will execute recursion
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
          spec.preset(TokenTags.object)
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

      return spec.get

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
    , get range () { return s.range }

    /**
     * Check Error
     *
     * @param {number} code
     */
    , isError: code => error === code

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
