import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Characters, TokenTag, TokenKind } from '../../src/parser/lexical'

function Stream (text, initial = 0) {

  const txt = text
  const len = text.length

  let pos = initial

  function prev (n = 1) {

    pos -= n

  }

  function next (n = 1) {

    pos += n

  }

  function regex (exp) {

    const tag = text.slice(pos).match(exp)

    if (tag) {
      pos += tag.index + tag[0].length
      return tag[0]
    }

    return false

  }

  function eos () {

    return pos <= len

  }

  /**
   * Goto position, ie: 'advance' the index within the
   * document string. We subtract '1' from the position
   * to keep iteration loop correct
   *
   * @param {number} n
   */
  function goto (n) {

    pos = n

  }

  function gotoEnd () {

    pos = len

  }

  function prevChar (ch) {

    const char = txt.charCodeAt(Math.abs(pos - 1))

    return ch ? char === ch : char || 0

  }

  function eachChar (ch) {

    return ch.split('').every((c, i) => c.charCodeAt(0) === peekChar(pos + i))

  }

  function nextChar (ch) {

    const char = txt.charCodeAt(pos + 1)

    return ch ? char === ch : char || 0

  }

  function peekChar (n) {

    return txt.charCodeAt(n || pos)

  }

  function getPosition () {

    return pos

  }

  function getSource () {

    return txt

  }

  function getString (start, end = next()) {

    return txt.substring(start, end)

  }

  function skipString (start, end) {

    return txt.substring(start, end)

  }

  return {
    regex
    , prev
    , next
    , eos
    , goto
    , gotoEnd
    , getPosition
    , getSource
    , getString
    , skipString
    , prevChar
    , nextChar
    , peekChar
    , eachChar
  }

}

/* eslint one-var: ["error", { let: "never" } ] */

const {
  ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO,
  WSP, NWL, TAB, CAR, BWS
} = Characters

const Grammar = {
  YAMLFrontmatter: [
    '---', '---'
  ],
  HTMLComment: [
    '<!--', '-->'
  ]
}

const RGX = /\b(?:script|style)/

function Scanner (text) {

  const ast = []
  const stream = Stream(text)

  let ASTNode
  let inToken = -1

  while (stream.eos()) {

    const N = stream.getPosition()

    // if (inString >= 0) {
    // console.log(text.charAt(N))
    // }

    switch (stream.peekChar()) {
      case (DSH):
        if (stream.eachChar('---')) {
          Frontmatter(N)
        }
        break
      case (LCB):
        if ((stream.nextChar(PER) || stream.nextChar(LCB)) && inToken < 0) {
          LiquidTag(N, TokenTag.start)
        }
        break
      case (PER):
      case (RCB):
        if (stream.nextChar(RCB) && inToken >= 0) {
          LiquidTag(N, TokenTag.close)
        }
        break
      case (LAN):
        if (stream.regex(RGX)) {
          HTMLTag(N)
        } else if (stream.nextChar(FWS)) {
          EndHTMLTag()
        } else if (stream.eachChar('<!--')) {
          HTMLComment(N)
        }
        break
      case (FWS):
        if (stream.nextChar(ARS)) {
          MultilineComment()
        } else if (stream.nextChar(FWS)) {
          SinglelineComment()
        }
        break
      case (SQO):
      case (DQO):
        if (inToken >= 0) {
          SkipString(N)
        }
        break
        //  case (BWS):
        //  SkipString()
        // break
      // case (WSP):
      // case (NWL):
      // case (TAB):
      // case (CAR):
        //   SkipString()
        // break
     // default: stream.next(1)
       // break

    }

    stream.next(1)

  }

  function SkipString (pos) {

    const next = text.indexOf(text.charAt(pos), pos)

    if (stream.peekChar(next - 1) === BWS) return SkipString(next + 1)

    stream.goto(next)

    // console.log(text.slice(pos, stream.getPosition()))
  }

  function LiquidTag (pos, type) {

    if (type === TokenTag.start) {

      inToken = pos
      const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s}%])/)

      if (!name) return console.log('Parse Error')

      ASTNode = ast.push({
        name
        , token: []
        , offset: [ pos ]
      }) - 1

      // console.log(ast[ASTNode])

      // stream.goto(pos)

    } else if (type === TokenTag.close) {

      ast[ASTNode].offset.push(pos + 2)
      ast[ASTNode].token.push(text.substring(ast[ASTNode].offset[0], pos + 2))

      //  console.log('LiquidTag', ast[ASTNode])

      inToken = -1
      console.log(ast[ASTNode])

      // stream.next()

    }
    // stream.gotoEnd()
  }

  function Frontmatter (pos) {

    if (pos > 0 && text.slice(0, pos).trim().length > 0) return null

    const end = text.indexOf('---', pos + 3) + 3

    ASTNode = ast.push({
      name: 'frontmatter'
      , offset: [ pos, end ]
      , content: text.substring(pos, end)
    }) - 1

    console.log(ast[ASTNode])

    // Forward (moves to end of frontmatter)
    stream.goto(end)

  }

  function HTMLTag (pos) {

    const end = text.indexOf('>', pos) + 1

    console.log(text.slice(pos, end))
  }

  function EndHTMLTag () {

  }

  function HTMLComment (pos) {

    const end = text.indexOf('-->', pos) + 3

    ASTNode = ast.push({
      name: 'comment'
      , offset: [ pos, end ]
      , content: text.substring(pos, end)
    }) - 1

    console.log(ast[ASTNode])

    // Forward (moves to end of comment)
    stream.goto(end)

    // console.log(text.slice(stream.getPosition()))

  }

  function MultilineComment () {

  }

  function LiquidObject (type) {
    // console.log('LiquidObject')
    // stream.gotoEnd()
  }

  function SinglelineComment () {

  }

}

const text = readFileSync(resolve('test/parsing/fixtures/text.txt'), 'utf8').toString()

test('parser', t => {

  const scan = Scanner(text)
  console.log(scan)

})
