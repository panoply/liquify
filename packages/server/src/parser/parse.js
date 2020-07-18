/* eslint one-var: ["error", { let: "never" } ] */

import { Stream } from './stream'
import * as TokenTypes from './lexical/types'
import * as TokenTag from './lexical/tokens'
import * as TokenType from './lexical/lexme'
import * as ScanState from './lexical/states'
import * as Character from './lexical/characters'

/**
 * Scanner
 *
 * Sequences characters that are contained within Liquid, HTML and YAML syntaxes.
 * This module is loosely based on the `vscode-html-languageservice` Scanner, but
 * resolves in a vastly different manner.
 *
 * @export
 * @param {Document.Scope} document
 * @returns {object}
 */
function Scanner (document) {

  const stream = Stream(document)

  /**
   * Scanner State
   *
   * @type {number}
   */
  let state

  /**
   * Scanner Index
   *
   * @type {number}
   */
  let index

  /**
   * Scanner Token
   *
   * @type {number}
   */
  let token = TokenType.Unknown

  /**
   * Scan
   *
   * @param {number} [offset=0]
   * @returns {number}
   */
  function scan (offset = 0) {

    if (offset > 0) stream.goto(offset)
    if (stream.eos()) return TokenType.EOS

    const char = stream.advanceUntilRegExp(/[<>{%}"'-]/)

    index = stream.position()
    state = ScanState.WithinUnkown

    /**
     * Character Sequencing
     *
     * Switch function sifts through the source looking for matching
     * character codes, assigns number references when forming tokens
     *
     * @see https://en.wikipedia.org/wiki/Lexical_analysis#Scanner
     */
    switch (char.charCodeAt(0)) {

      // DASH                                                         -
      // --------------------------------------------------------------
      case (Character.DSH):

        // ---
        if (stream.advanceIfChars([
          Character.DSH,
          Character.DSH,
          Character.DSH
        ])) {

          if (state === ScanState.WithinYAMLFrontmatter) {
            index = stream.position(1)
            token = TokenType.YAMLFrontmatterClose
            return token
          }

          state = ScanState.WithinYAMLFrontmatter
          token = TokenType.YAMLFrontmatterStart
          return token
        }

        break

      // LEFT CURLY BRACE                                             {
      // --------------------------------------------------------------
      case (Character.LCB):

        // {%
        if (stream.advanceIfChar(Character.PER)) {
          state = ScanState.WithinLiquidStartTag
          token = TokenType.LiquidStartTagOpen
          return token

        }

        // {{
        if (stream.advanceIfChar(Character.LCB)) {
          state = ScanState.WithinLiquidObjectTag
          token = TokenType.LiquidObjectTagOpen
          return token
        }

        break

      // PERCENTAGE                                                   %
      // --------------------------------------------------------------
      case (Character.PER):

        // %}
        if (stream.advanceIfChar(Character.RCB)) {
          index = stream.position(1)
          state = ScanState.WithinUnkown
          token = TokenType.LiquidStartTagClose
          return token
        }

        break

      // RIGHT CURLY BRACE                                            }
      // --------------------------------------------------------------
      case (Character.RCB):

        // }}
        if (stream.advanceIfChar(Character.RCB)) {
          index = stream.position(1)
          state = ScanState.WithinUnkown
          token = TokenType.LiquidObjectTagClose
          return token
        }

        break

      // LEFT ANGLE                                                   <
      // --------------------------------------------------------------
      case (Character.LAN):

        // < or </
        token = stream.advanceIfChar(Character.FWS)
          ? TokenType.HTMLEndTagOpen
          : TokenType.HTMLStartTagOpen

        if (stream.advanceIfRegExp(/^[^\s"'></=]*/)) {
          state = TokenType.HTMLTagName
          return token
        }

        break

      // RIGHT ANGLE                                                  >
      // --------------------------------------------------------------
      case (Character.RAN):

        index = stream.position(1)
        state = ScanState.WithinUnkown

        // <>
        if (token === TokenType.HTMLStartTagOpen) {
          token = TokenType.HTMLStartTagClose
          return token
        }

        // </>
        if (token === TokenType.HTMLEndTagOpen) {
          token = TokenType.HTMLEndTagClose
          return token
        }

        break

      // SINGLE/DOUBLE QUOTE                                         "'
      // --------------------------------------------------------------
      case (Character.SQO):
      case (Character.DQO):

        // "" or ''
        stream.skipString(stream.position())

        break
    }

    // INCREMENT
    index = stream.next()

    // RETURN UNKNOWN
    return TokenType.Unknown

  }

  /* -------------------------------------------- */
  /*                    CLOSURE                   */
  /* -------------------------------------------- */

  return (
    {
      scan,
      getIndex: () => index,
      getState: () => state,
      getToken: (start, end) => stream.getText(start, end || stream.position(1))
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

  let curr = {}
  let token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.YAMLFrontmatterStart:
        curr.start = scanner.getIndex()
        break

      case TokenType.YAMLFrontmatterClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start + 3, curr.end - 3)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.LiquidObjectTagOpen:
        curr.start = scanner.getIndex()
        break
      case TokenType.LiquidStartTagOpen:
        curr.start = scanner.getIndex()
        // console.log(token, scanner.getIndex())
        break
      case TokenType.LiquidObjectTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.LiquidStartTagClose:
        // console.log(token, scanner.getIndex())

        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.HTMLStartTagOpen:
        curr.start = scanner.getIndex()
        curr.name = scanner.getToken(curr.start + 1)
        break

      case TokenType.HTMLStartTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.HTMLEndTagOpen:
        curr.start = scanner.getIndex()
        curr.name = scanner.getToken(curr.start + 2)
        break

      case TokenType.HTMLEndTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break
    }

    token = scanner.scan()

  }

  return document

}
