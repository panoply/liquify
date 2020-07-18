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

  // STREAM
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

    // ADVANCE TO POSITION
    if (offset > 0) stream.goto(offset)

    // ADVANCE TO CHARACTER
    const char = stream.advanceUntilRegExp(/[<>{%}"'-]/)

    // END OF SOURCE
    if (stream.eos()) return TokenType.EOS

    // INDEX POSITION
    index = stream.position()

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

  let associates = []
  if (document?.__test) {

    associates = document.__test.associates
  }

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  let HTMLNode

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  let ParsedFrontmatter

  /**
   * Liquid Token Context Node
   *
   * @type {object}
   */
  let LiquidNode

  /**
   * Current Liquid Tag within stream
   *
   * @type {object}
   */
  let LiquidTag

  /**
   * Liquid Children - Ensures correct token hierarchy
   *
   * @type {object}
   */
  let LiquidChildren = []
  /**
   * Open HTML Tag - The LEFT side delimeter `<tag `
   *
   * @param {number} offset
   */
  function OpenHTMLToken (offset) {

    stream.next()

    const name = stream.regex(/^[^\s"'></=]*/)
    const spec = associates.filter(i => i.name === name && i.kind === 'html')

    if (!spec.some(i => i.name === name)) return null

    if (stream.isCodeChar(RAN)) { // ends with RAN `>`

      if (HTMLNode) {
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return CloseHTMLToken(stream.next())
      }

      HTMLNode.create(name, [ offset, stream.position(1) ])

    } else if (stream.isCodeChar(RAN)) {
      // Tag has attributes but does not have spaces (`<tag  >`)

      if (HTMLNode && HTMLNode.name === name) { // we are in a close tag, eg: `</tag>`
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return CloseHTMLToken(stream.next())
      } else if (!HTMLNode) {
        HTMLNode.create(name, [ offset, stream.next() ])
      }

    }

    if (!HTMLNode) { // Tag contains a value,(attribute) re-run function
      HTMLNode.create(name, offset)
      return OpenHTMLToken(stream.prev())
    }

  }

  function CloseHTMLToken (offset) {

    // console.log(HTMLNode)
    HTMLNode.token.push(stream.getText(HTMLNode.offset[HTMLNode.offset.length - 1], offset))
    HTMLNode.offset.push(offset)

    if (HTMLNode.token.length < 2) {
      const [ token ] = HTMLNode.token
      const type = token.search(/\b(?:type)\b(?![^"'=])/)
      if (type > 0) {
        HTMLNode.attrs = {
          type: null
        }
      }
    }

    if (HTMLNode.offset.length === 4) {
      document.ast.push(HTMLNode)
      HTMLNode = undefined
    }

  }

  /**
   * Open Liquid Tag - The LEFT side delimeter `{% tag ` or `{{ tag`
   *
   * @param {number} n
   * @returns
   */
  function OpenLiquidToken (offset) {

    stream.next()

    console.log(LiquidNode)

    if (stream.getCodeChar(3)) {
      // LiquidNode.errors = {
      // whitespaceDash: true
      // }
      // state.whitespaceDash = true
    }

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s\n}%])/)

    if (!name) return console.log('Parse Error, Tag name is incorrect')

    let EndTag

    if (name.slice(0, 3) === 'end') EndTag = name.substring(3)

    const prop = EndTag || name
    const spec = stream.prevCodeChar(LCB) ? specs.objects[prop] : specs.tags[prop]

    // LiquidNode = new Node(TokenKind.liquid)
    LiquidNode.create(name, offset)

    if (typeof spec !== 'object') return

    if (spec?.language) LiquidNode.languageId = spec.language

    LiquidNode.type = TokenTypes[spec.type]
    LiquidNode.tag = (spec?.singular
      ? spec?.within
        ? TokenTag.child
        : TokenTag.singular
      : EndTag
        ? TokenTag.close
        : TokenTag.start
    )

  }

  /**
   * Close Liquid Tag - The RIGHT side delimeter `tag %}` or `tag }}`
   *
   * @param {number} n
   * @returns
   */
  function CloseLiquidToken (n) {

    // increment once
    n = stream.position(1)

    if (LiquidTag?.tag && LiquidNode.tag === TokenTag.close) {

      LiquidTag.tag = TokenTag.pair
      LiquidTag.offset.push(LiquidNode.offset[0], n)
      LiquidTag.token.push(stream.getText(LiquidNode.offset[0], n))

      LiquidChildren.splice(LiquidChildren.length - 1, 1)
      LiquidTag = LiquidChildren[LiquidChildren.length - 1]

    } else {

      LiquidNode.offset.push(n)
      LiquidNode.token.push(stream.getText(LiquidNode.offset[0], n))

      if (LiquidNode.tag === TokenTag.child) {
        if (LiquidTag?.children) LiquidTag.children.push(LiquidNode)
        else LiquidTag.children = [ LiquidNode ]
      } else {
        document.ast.push(LiquidNode)
      }
    }

    if (LiquidNode.tag === TokenTag.start) {
      LiquidChildren = [ ...LiquidChildren, document.ast[document.ast.length - 1] ]
      LiquidTag = LiquidChildren[LiquidChildren.length - 1]
    }

    LiquidNode = undefined

  }

  /**
   * HTML Comments - Advances stream to end position
   *
   * @param {number} n
   */
  function Frontmatter (n) {

    // handle errors with frontmatter is not initial contents
    if (n > 0 && text.slice(0, n).trim().length > 0) {
      return console.log('Parse Error, content before frontmatter')
    }

    const end = stream.forward('---')

    if (!end) return console.log('Parse Error, frontmatter is unclosed')

    frontmatter = { offset: [ n, end ], content: stream.getText(n, end) }
    stream.goto(end)

  }

  /**
   * HTML Comments - Advances stream to end position
   *
   * @param {number} n
   * @param {string} str
   */
  function CommentToken (n, str) {

    const end = stream.forward(str)

    if (end === false) return console.log('Parse Error, frontmatter is unclosed')

    document.ast.push({
      name: 'html-comment'
      , offset: [ n, end ]
      , content: stream.getText(n, end)
    })

  }

  return {
    scan,
    getIndex: () => index,
    getState: () => state,
    getToken: (start, end) => stream.getText(start, end || stream.position(1))
  }
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
