/* eslint one-var: ["error", { let: "never" } ] */

import { TokenType } from '../enums/types'
import { ScanState } from '../enums/state'
import stream from './stream'
import specs from './specs'
import * as Characters from '../lexical/characters'
import * as TokenTag from '../lexical/tags'
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
   * Position Index
   *
   * @type {number}
   */
  let index

  /**
   * Line Number
   *
   * @type {number}
   */
  let line = 1

  /**
   * Line Character Number
   *
   * @type {number}
   */
  let char = 0

  /**
   * Whitespace Counter
   *
   * @type {number}
   */
  let space

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  const getToken = (start = index) => stream.getText(start, stream.position())

  /**
   * Runs document scan
   *
   * @param {number} initialOffset
   * @returns {number}
   */
  function scan (initialOffset = 0) {

    if (initialOffset > 0) stream.offset(initialOffset)
    if (stream.eos()) return TokenType.EOS

    state = state || ScanState.TokenUnknown
    index = stream.position()

    return tokenize() || (() => {

      space = undefined
      index = stream.advance(1)
      state = ScanState.TokenUnknown

      return TokenType.Unknown

    })()

  }

  /**
   * Character Sequencing
   *
   * Advances source to delimeter start characters
   *
   */
  function delimeters () {

    return ({

      /**
       * After Frontmatter YAML
       *
       * `---`
       *
       * @returns {void|number}
       */
      [Characters.DSH]: () => {

        if (stream.advanceIfChars([ Characters.DSH, Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningFrontmatter
          return TokenType.YAMLFrontmatterStart
        }

      },

      /**
       * After Liquid Tag Open Delimeter
       *
       * `{%` OR `{{`
       *
       * @returns {void|number}
       */
      [Characters.LCB]: () => {

        if (stream.whitespace() > 0) return; else index = stream.position()
        if (!stream.advanceUntilRegExp(/[{%]/, true)) return delimeters()
        if (stream.isCodeChar(Characters.LCB)) specs.type = TokenTag.object

        state = ScanState.AfterOpeningTag
        return TokenType.LiquidTagOpen

      },

      /**
       * After HTML Open Delimeter
       *
       * `<` OR `</` OR `<!--`
       *
       * @returns {void|number}
       */
      [Characters.LAN]: () => {

        if (stream.advanceUntilChar(Characters.FWS)) {
          state = ScanState.AfterOpeningHTMLEndTag
          return TokenType.HTMLEndTagOpen
        }

        if (stream.advanceUntilChars([ Characters.BNG, Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningHTMLComment
          return TokenType.HTMLStartCommentTag
        }

        state = ScanState.AfterOpeningHTMLStartTag
        return TokenType.HTMLStartTagOpen

      },

      /**
       * After Newline or Carriage Return
       *
       * `\n` OR `\r`
       *
       * @returns {void|number}
       */
      [Characters.NWL || Characters.CAR]: () => {

        stream.advance(1)
        line += 1
        char = stream.position()

        // return delimeters()

      }

    }[stream.advanceUntilRegExp(/\r\n?|[\n'"{<]|-{3}/).charCodeAt(0)]())

  }

  /**
   * Tokenize
   *
   */
  function tokenize () {

    if (state === ScanState.TokenUnknown) return delimeters()

    return ({

      /**
       * After Opening Frontmatter
       *
       * @returns {void|number}
       */
      [ScanState.AfterOpeningFrontmatter]: () => {

        if (stream.advanceUntilChars('---', true)) {
          index = stream.position(-3)
          state = ScanState.TokenUnknown
          return TokenType.YAMLFrontmatterClose
        }

        return tokenize()

      },

      /**
       * After Opening Liquid Tag
       *
       * @returns {number}
       */
      [ScanState.AfterOpeningTag]: () => {

        if (stream.advanceIfChar(Characters.DSH)) {
          space = stream.whitespace()
          return TokenType.LiquidWhitespaceDash
        }

        space = stream.whitespace()
        index = stream.position()

        if (stream.advanceIfRegExp(/^[^\s'"|!=<>%}.-]*/)) {
          specs.name = getToken()
          state = ScanState.TagName
          if (!specs.type) specs.type = TokenTag[specs.spec.type]
          return TokenType.LiquidTagName
        }

      },

      /**
       * Liquid Tag Name
       *
       * @returns {number|void}
       */
      [ScanState.TagName]: () => {

        space = stream.whitespace()
        index = stream.position()
        state = ScanState.TagClose

        switch (specs.type) {

          case TokenTag.control:
            if (stream.advanceIfRegExp(/^-?%\}/)) return TokenType.ParseError
            if (stream.advanceIfRegExp(/^[^\s%}-]*/)) {
              state = ScanState.TagClose
              return TokenType.ControlCondition
            }
            break
        }

        if (stream.advanceIfRegExp(/^-(?=[%}]\})/)) {
          return TokenType.LiquidWhitespaceDash
        }

        return tokenize()

      },

      /**
       * Liquid Tag Close
       *
       * @returns {number|void}
       */
      [ScanState.TagClose]: () => {

        state = ScanState.TokenUnknown

        if (stream.advanceIfChars([ Characters.RCB, Characters.RCB ])) {
          index = stream.position()
          return TokenType.LiquidObjectClose
        }

        if (stream.advanceIfChars([ Characters.PER, Characters.RCB ])) {
          index = stream.position()
          return TokenType.LiquidTagClose
        }

      },

      /**
       * Liquid Control Tag
       *
       * @returns {number|void}
       */
      [ScanState.ControlToken]: () => {

        space = stream.whitespace()

        if (stream.advanceIfRegExp(/^[^\s!=<>%}-]*/)) {
          // capture and strip whitespace, eg: \s\n\t\r\f

          console.log('Spaces:', space)
          console.log(
            'Control Condition',
            getToken()

          )
          state = ScanState.AfterConditionValue

        }

      },

      /**
       * Liquid Control Condition/Comparison Values
       *
       * @returns {number|void}
       */
      [ScanState.AfterConditionValue]: () => {

        if (stream.advanceIfChars([ Characters.PER, Characters.RCB ])) {
          console.log('Control Closed')
          return TokenType.LiquidTagClose
        }

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        if (stream.advanceIfRegExp(/(==|!=|>=|<=|<|>|\b(?:or|and)\b)/)) {
          console.log('Control Operator', getToken())
          state = ScanState.ControlToken

        }

      }

    }[state]())

  }

  function html () {

    switch (state) {

      // HTML COMMENT OPEN                                           <!--^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLComment:

        break

      // HTML START TAG OPEN                                         <tag^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLStartTag:

        break

      // HTML END TAG OPEN                                          </tag^
      // -----------------------------------------------------------------
      case ScanState.AfterOpeningHTMLEndTag:

        break

    }

  }

  /* -------------------------------------------- */
  /*                    METHODS                   */
  /* -------------------------------------------- */

  return (
    {
      scan
      , getToken
      , getPosition: () => index
      , getType: () => specs.type
      , getState: () => state
      , getSpace: () => space
      , getOffset: ({ offset }) => ([
        ...offset,
        index
      ])
      , getLocation: () => ({
        start: index,
        end: stream.position()
      })
      , getRange: () => ({
        line,
        character: index - char
      })
    }
  )

})()
