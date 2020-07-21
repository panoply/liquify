/* eslint one-var: ["error", { let: "never" } ] */

import { Stream } from './stream'
import * as TokenTag from './lexical/types'
import * as TokenType from './lexical/lexme'
import * as ScanState from './lexical/liquid'
import * as Characters from './lexical/characters'
import * as Severities from './lexical/severities'

function Errors (document) {

  return (error, start, end) => ({

    incomplete: {
      severity: Severities.Error,
      message: '',
      range: {
        start: document.positionAt(start),
        end: document.positionAt(end)
      }
    }

  }[error])

}

/**
 * Scanner
 *
 * Sequences Charss that are contained within Liquid, HTML and YAML syntaxes.
 * This module is loosely based on the `vscode-html-languageservice` Scanner, but
 * resolves in a vastly different manner.
 *
 * @export
 * @param {Document.Scope} document
 * @param {Specification.Variation} specs
 */

function Scanner (document, specs) {

  const stream = Stream(document)

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

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  const getToken = () => stream.getText(index, stream.position())

  const getSpec = () => (spec = specs[
    token !== TokenTag.object
      ? 'tags'
      : 'objects'
  ][getToken()])

  const Tokenize = () => {

    switch (state) {

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
            if (stream.isCodeChar(Characters.LCB)) token = TokenTag.object

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
          spec = getSpec()

          // When no specification is found, break
          if (!spec) break

          // Assert the token type based on specification
          type = TokenTag[spec.type]

          // return the token type, next scan will run in the 'AfterTagName' case
          return TokenType.LiquidTagName

        }

        // if tag gets here, tag is incomplete and has no name indentifier
        // TODO
        return TokenType.LiquidTag

      case ScanState.AfterTagName:

        // capture and strip whitespace, eg: \s\n\t\r\f
        space = stream.whitespace()

        if (type === TokenTag.object && stream.advanceIfChars(
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
          case TokenTag.control:
            state = ScanState.ControlToken
            return Tokenize()
          case TokenTag.include:
            if (stream.advanceIfRegExp(/^[^\s%}]*/)) {
              state = ScanState.AfterIncludePath
            }
            break
          case TokenTag.iteration:
            if (stream.advanceIfRegExp(/^[^\s]*/)) {
              state = ScanState.AfterForLoopIteree
            }
            break
          case TokenTag.variable:
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

    }

    index = stream.advance(1)
    space = undefined
    token = undefined
    type = undefined
    state = ScanState.TokenUnknown

    return TokenType.Unknown

  }

  /* -------------------------------------------- */
  /*                    CLOSURE                   */
  /* -------------------------------------------- */

  /**
   * Runs document scan
   *
   * @param {number} [initialOffset=0]
   * @returns {number}
   */
  const scan = (initialOffset = 0) => {

    if (initialOffset > 0) stream.goto(initialOffset)
    if (stream.eos()) return TokenType.EOS

    state = state || ScanState.TokenUnknown
    index = stream.position()

    return Tokenize()

  }

  return (
    {
      scan
      , getToken
      , getSpec
      , getType: () => type
      , getError: () => error
      , getState: () => state
      , getSpace: () => space
      , getIndex: () => stream.position()
      , getRange: () => ({ start: index, end: stream.position() })
    }
  )
}

class Node {

  constructor (kind) {

    this.kind = kind
    this.offset = []
    this.token = []
  }

  set errors (error) {

    Object.assign(this, { error })

  }

  create (name, offset) {

    return Object.assign(this, (typeof offset === 'number' ? {
      name,
      token: [],
      offset: [ offset ]
    } : {
      name,
      token: [ stream.getText(offset[0], offset[1]) ],
      offset: offset
    }))

  }

}

export function Parser (document, specs) {

  const scanner = Scanner(document, specs)
  // const curr = node

  let token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.YAMLFrontmatterStart:

        console.log(scanner.getRange(), 'YAML Frontmatter Start', scanner.getToken())

        break

      case TokenType.YAMLFrontmatterClose:

        console.log(scanner.getRange(), 'YAML Frontmatter Close', scanner.getToken())

        break
      case TokenType.LiquidTagOpen:
        console.log(scanner.getRange(), 'Liquid Tag Open', scanner.getToken())
        break

      case TokenType.LiquidWhitespaceDash:

        console.log(scanner.getRange(), 'Liquid Whitespace Dash', scanner.getToken())
        // document.ast.push(curr)
        // curr = {}

        break
      case TokenType.LiquidTagName:
        // console.log('Liquid Name', curr)

        console.log('Spaces:', scanner.getSpace())

        console.log(scanner.getRange(), 'Liquid Tag Name', scanner.getToken())

        //  console.log('Spec:', scanner.getSpec())

        // curr = {}

        break

      case TokenType.LiquidObject:
      case TokenType.LiquidTag:
        // document.ast.push(scanner.getRange())
        console.log(scanner.getRange(), 'Liquid Token', scanner.getToken())

        break

    /*  case TokenType.LiquidObjectOpen:
      case TokenType.LiquidTagOpen:

        if (scanner.getState(ScanState.WhitespaceDash)) {
          if (curr?.hasWhitespace) {
            curr.hasWhitespace.push(scanner.getIndex())
          } else curr.hasWhitespace = [ scanner.getIndex() ]
        } else {
          curr.start = scanner.getIndex()
        }

        break

      case TokenType.LiquidTag:
        // console.log('here')
        break

      case TokenType.LiquidTagClose:
      case TokenType.LiquidObjectClose:

        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}

        break

      case TokenType.HTMLStartTagOpen:
        curr.start = scanner.getIndex()
        //  curr.name = scanner.getToken(curr.start + 1)
        break

      case TokenType.HTMLStartTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.HTMLEndTagOpen:
        curr.start = scanner.getIndex()
        //    curr.name = scanner.getToken(curr.start + 2)
        break

      case TokenType.HTMLEndTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break */
    }

    token = scanner.scan()

  }

  return document

}
