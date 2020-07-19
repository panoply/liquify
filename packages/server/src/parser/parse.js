/* eslint one-var: ["error", { let: "never" } ] */

import { Stream } from './stream'
import * as TokenType from './lexical/lexme'
import * as ScanState from './lexical/liquid'
import * as Characters from './lexical/characters'

/**
 * Scanner
 *
 * Sequences Charss that are contained within Liquid, HTML and YAML syntaxes.
 * This module is loosely based on the `vscode-html-languageservice` Scanner, but
 * resolves in a vastly different manner.
 *
 * @export
 * @param {Document.Scope} document
 */

function Scanner (document) {

  const stream = Stream(document)

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state = ScanState.TokenUnknown

  /**
   * Scanner State
   *
   * @type {number}
   */
  let index

  /**
   * Scanner State
   *
   * @type {number}
   */
  let error

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  /**
   * Chars Sequencing
   *
   * Switch function sifts through the source looking for matching
   * Chars codes, assigns number references when forming tokens
   */
  const charseq = regexp => {

    switch (stream.advanceUntilRegExp(regexp).charCodeAt(0)) {
      case (Characters.DSH):
        // FRONTMATTER: ---
        if (stream.advanceIfChars([ Characters.DSH, Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningFrontmatter
          return TokenType.YAMLFrontmatterStart
        }
        break
      case (Characters.LCB):

        index = stream.position()

        // LIQUID DELIMETER: {%
        if (stream.advanceIfChar(Characters.PER)) {
          state = ScanState.AfterOpeningTag
          return TokenType.LiquidTagOpen
        }
        // LIQUID DELIMETER: {{
        if (stream.advanceIfChar(Characters.LCB)) {
          state = ScanState.AfterOpeningObject
          return TokenType.LiquidTagOpen
        }
        break
      case (Characters.LAN):p
        // HTML END TAG:  </
        if (stream.advanceUntilChar(Characters.FWS)) {
          state = ScanState.AfterOpeningHTMLEndTag
          return TokenType.HTMLEndTagOpen
        }
        // HTML COMMENT TAG: <!--
        if (stream.advanceUntilChars([ Characters.BNG, Characters.DSH, Characters.DSH ])) {
          state = ScanState.AfterOpeningHTMLComment
          return TokenType.HTMLStartCommentTag
        }

        // HTML TAG: <
        state = ScanState.AfterOpeningHTMLStartTag
        return TokenType.HTMLStartTagOpen

    }

    return ScanState.TokenUnknown

  }

  const tokenize = () => {

    switch (state) {

      case ScanState.TokenUnknown:

        // stream.advance(1)
        //  index = stream.position()
        return charseq(/{[{%]|<|-{3}/)

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

        if (stream.advanceIfChar(Characters.DSH)) {
          return TokenType.LiquidWhitespaceDash
        }

        // console.log(index, stream.position(), stream.getChar(), stream.advanceUntilRegExp(/^[^\s'"|!=<>%}.-]*/, true))
        stream.whitespace()

        if (stream.advanceIfRegExp(/^[^\s'"|!=<>%}.-]*/)) {

          // console.log(
          // index,
          // stream.position(),
          // stream.getChar(),
          // stream.getText(index, stream.position())
          // )

          // index = stream.position()
          // stream.gotoEnd()
          // stream.advance(1)
          state = ScanState.AfterTagName
          return TokenType.LiquidTagName
        }

        return TokenType.LiquidTag

      case ScanState.AfterTagName:

        if (stream.advanceUntilChars([ Characters.PER, Characters.RCB ])) {
          stream.advance(1)
          // stream.whitespace()
          return TokenType.LiquidTag
        }
        stream.gotoEnd()
        break
      case ScanState.AfterOpeningObject:

        if (stream.advanceUntilChars([ Characters.RCB, Characters.RCB ])) {
          // stream.advance()
          // stream.whitespace()
          // return TokenType.LiquidObject
        }
        break

    }

    index = stream.advance(1)

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

    return tokenize()

  }

  return (
    {
      scan
      , getState: () => state
      , getIndex: () => stream.position()
      , getToken: () => stream.getText(index, stream.position())
      , getRange: () => ({ start: index, end: stream.position() })
      , getError: () => error
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

  const scanner = Scanner(document)
  // const curr = node

  let token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.YAMLFrontmatterStart:

        console.log(scanner.getRange(), 'YAML Frontmatter Start', scanner.getToken())

        break

      case TokenType.YAMLFrontmatterClose:

        // document.ast.push(scanner.getRange())
        console.log(scanner.getRange(), 'YAML Frontmatter Close', scanner.getToken())

        break
      case TokenType.LiquidTagOpen:
        console.log(scanner.getRange(), 'Liquid Tag Open', scanner.getToken())
        break
      case TokenType.LiquidWhitespaceDash:
        console.log(scanner.getRange(), 'whitespace dash', scanner.getToken())
        // document.ast.push(curr)
        // curr = {}

        break
      case TokenType.LiquidTagName:
        // console.log('Liquid Name', curr)
        console.log(scanner.getRange(), ' Liquid Tag Name')

        // curr = {}

        break

      case TokenType.LiquidObject:
      case TokenType.LiquidTag:
        // document.ast.push(scanner.getRange())
        console.log(scanner.getRange(), ' Liquid Token')

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
