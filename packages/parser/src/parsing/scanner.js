/* eslint one-var: ["error", { let: "never" } ] */

import stream from './stream'
import * as Characters from '../lexical/characters'
import { TokenType } from '../enums/types.ts'
import { ScanState } from '../enums/state.ts'
import { TagType } from '../enums/tags.ts'

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

  /* -------------------------------------------- */
  /*                    SCOPES                    */
  /* -------------------------------------------- */

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state = ScanState.TokenUnknown

  /**
   * Position Index
   *
   * @type {number}
   */
  let index

  /**
   * Whitespace Counter
   *
   * @type {number}
   */
  let space

  /**
   * Token Type
   *
   * @type {number}
   */
  let token

  /**
   * Token Type
   *
   * @type {Specification.Tag}
   */
  let spec

  /**
   * Token Type
   *
   * @type {Parser.TokenTypes}
   */
  let type

  /**
   * Parse Error
   *
   * @type {number}
   */
  let error

  let specs
  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  const getToken = () => stream.getText(index, stream.position())

  /**
   * Runs document scan
   *
   * @param {number} [initialOffset=0]
   * @param {object} speck
   * @returns {number}
   */
  function scan (initialOffset = 0, speck) {

    specs = speck

    if (initialOffset > 0) stream.offset(initialOffset)
    if (stream.eos()) return TokenType.EOS

    state = state || ScanState.TokenUnknown
    index = stream.position()

    return tokenize()

  }

  function tokenize () {

    switch (state) {

      case ScanState.AfterOpeningFrontmatter:

        if (stream.advanceUntilChars('---', true)) {
          index = stream.position(-3)
          state = ScanState.TokenUnknown
          return TokenType.YAMLFrontmatterClose
        }

        break
      case ScanState.AfterOpeningHTMLComment:

        //  return TokenType .HTMLComment
        break
      case ScanState.AfterOpeningHTMLStartTag:

        // return TokenType.HTMLStartTagOpen
        break
      case ScanState.AfterOpeningHTMLEndTag:

        // return TokenType .HTMLEndTag
        break

      case ScanState.AfterOpeningTag:

        // check if character is whitespace dash, eg: {%-
        if (stream.advanceIfChar(Characters.DSH)) {

          // capture and strip whitespace, eg: \s\n\t\r\f
          space = stream.whitespace()

          // return the token type, next scan will execute below
          return TokenType.LiquidWhitespaceDash

        }

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        // retrive the token tag name, eg: {{- tag or {%- tag
        if (stream.advanceIfRegExp(/^[^\s'"|!=<>%}.-]*/)) {

          // reset the scanners state, we are now here: {{ tag^ or {% tag^
          state = ScanState.AfterTagName

          // Retrive the token specification
          spec = specs && specs[token !== TagType.object
            ? 'tags'
            : 'objects'
          ][getToken()]

          // When no specification is found, break
          if (!spec) break

          // Assert the token type based on specification
          type = TagType[`${spec.type}`]

          // return the token type, next scan will run in the 'AfterTagName' case
          return TokenType.LiquidTagName

        }

        // if tag gets here, tag is incomplete and has no name indentifier
        // TODO
        return TokenType.LiquidTag

      case ScanState.AfterTagName:

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        if (type === TagType.object && stream.advanceIfChars(
          [
            Characters.RCB,
            Characters.RCB
          ]
        )) return TokenType.LiquidTagClose

        if (stream.advanceIfChars([ Characters.PER, Characters.RCB ])) {
          return TokenType.LiquidObjectClose
        }

        /**
         * Send token to appropriate case
         */
        switch (type) {
          case TagType.control:
            state = ScanState.ControlToken
            return tokenize()
          case TagType.include:
            if (stream.advanceIfRegExp(/^[^\s%}]*/)) {
              state = ScanState.AfterIncludePath
            }
            break
          case TagType.iteration:
            if (stream.advanceIfRegExp(/^[^\s]*/)) {
              state = ScanState.AfterForLoopIteree
            }
            break
          case TagType.variable:
            if (stream.advanceIfRegExp(/^[^\s=%}]*/)) {
              state = ScanState.AfterVariableName
            }
            break
        }

        if (stream.advanceUntilChars([ Characters.PER, Characters.RCB ])) {
        //  stream.gotoEnd()
          return TokenType.LiquidTag
        }

        // stream.gotoEnd()

        break
      case ScanState.ControlToken:

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        if (stream.advanceIfRegExp(/^[^\s!=<>%}-]*/)) {
          // capture and strip whitespace, eg: \s\n\t\r\f

          console.log('Spaces:', space)
          console.log(
            'Control Condition',
            getToken()

          )
          state = ScanState.AfterConditionValue
          return
        }

        // WHITESPACE DASH: {{-
        if (stream.advanceUntilChars([ Characters.RCB, Characters.RCB ])) {
          // stream.advance()
          // stream.whitespace()
          // return TokenType.LiquidObject
          console.log('closed')
          //  stream.gotoEnd()
          return
        }
        // WHITESPACE DASH: {{-

        break

      case ScanState.AfterConditionValue:

        if (stream.advanceIfChars(
          [
            Characters.PER,
            Characters.RCB
          ]
        )) {
          console.log('Control Closed')
          return TokenType.LiquidTagClose
        }

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        if (stream.advanceIfRegExp(/(==|!=|>=|<=|<|>|\b(?:or|and)\b)/)) {
          console.log('Control Operator', getToken())
          state = ScanState.ControlToken
          return
        }

        // state = ScanState.TokenUnknown

        break

      case ScanState.TokenUnknown:

        switch (stream.advanceUntilRegExp(/{[{%]|<|-{3}/).charCodeAt(0)) {

          // FRONTMATTER: ---
          case Characters.DSH:

            if (stream.advanceIfChars([
              Characters.DSH,
              Characters.DSH,
              Characters.DSH
            ])) {
              state = ScanState.AfterOpeningFrontmatter
              return TokenType.YAMLFrontmatterStart
            }

            break

          // LIQUID DELIMETER: {% OR {{
          case Characters.LCB:

            // skip if next character is whitespace, eg: {\s\n\t\r\f
            if (stream.whitespace() > 0) break; else index = stream.position()

            // break if next character is not { or % else advance 1
            if (!stream.advanceUntilRegExp(/[{%]/, true)) break

            // if this character is curly '{' define object curly
            if (stream.isCodeChar(Characters.LCB)) token = TagType.object

            // we are at an opening liquid tag, eg: {{ or {%
            state = ScanState.AfterOpeningTag

            // return the token type
            return TokenType.LiquidTagOpen

          // HTML TAG: < OR </ OR <!--
          case (Characters.LAN):

            if (stream.advanceUntilChar(Characters.FWS)) {
              state = ScanState.AfterOpeningHTMLEndTag
              return TokenType.HTMLEndTagOpen
            }

            if (stream.advanceUntilChars([
              Characters.BNG,
              Characters.DSH,
              Characters.DSH
            ])) {
              state = ScanState.AfterOpeningHTMLComment
              return TokenType.HTMLStartCommentTag
            }

            state = ScanState.AfterOpeningHTMLStartTag
            return TokenType.HTMLStartTagOpen

        }

        break

    }

    index = stream.advance(1)
    space = undefined
    token = undefined
    type = undefined
    state = ScanState.TokenUnknown

    return TokenType.Unknown

  }

  /* -------------------------------------------- */
  /*                    METHODS                   */
  /* -------------------------------------------- */

  return (
    {
      scan
      , getToken
      , getType: () => type
      , getError: () => error
      , getState: () => state
      , getSpace: () => space
      , getIndex: () => stream.position()
      , getRange: () => ({ start: index, end: stream.position() })
    }
  )

})()
