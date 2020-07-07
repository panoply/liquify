import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Characters, TokenTag, TokenKind } from '../../src/parser/lexical'

function Stream (text, initial = 0) {

  const txt = text
  const len = text.length

  let pos = initial

  function prev (n) {

    pos -= n

  }

  function next (n = 1) {

    pos += n

  }

  function regex (exp) {

    const tag = text.slice(pos).match(exp)

    if (tag) {
      console.log(tag)
      pos += tag.index + tag[0].length
      return tag[0]
    }

    return false

  }

  function eos () {

    return pos <= len

  }

  function goto (n) {

    pos = pos + n

  }

  function gotoEnd () {

    pos = len

  }

  function prevChar (ch) {

    const char = txt.charCodeAt(Math.abs(pos - 1))

    return ch ? char === ch : char || 0

  }

  function eachChar (ch) {

    if (ch.split('').every(c => c.charCodeAt(0) === nextChar())) {

      pos += ch.length

      return true

    }

    return false

  }

  function nextChar (ch) {

    const char = txt.charCodeAt(Math.abs(pos + 1))

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

function Scanner (text) {

  const stream = Stream(text)

  let inLiquidToken = -1
  const inHTMLToken = -1
  const inString = -1
  const inComment = -1
  const inLiquidBlock = false
  const inHTMLBlock = false

  while (stream.eos()) {

    console.log(stream.getPosition())

    switch (stream.peekChar()) {
      case (DSH):
        if (stream.eachChar('--')) {
          // YAMLFrontmatter()
        }
        break
      case (LCB):
      case (PER):
        if (stream.nextChar(PER)) {
          StartLiquidTag(TokenTag.start)
        } else if (stream.nextChar(LCB)) {
          LiquidObject(TokenTag.start)
        } else if (stream.nextChar(RCB)) {
          LiquidObject(TokenTag.close)
        }
        break
      case (LAN):
        if (stream.regex(/\b(?:script|style)/)) {
          StartHTMLTag()
        } else if (stream.nextChar(FWS)) {
          EndHTMLTag()
        } else if (stream.eachChar('!--')) {
          HTMLComment()
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
        // stream.next(1)
        SkipString()
        break
      case (BWS):
      //  SkipString()
        break
      case (WSP):
      case (NWL):
      case (TAB):
      case (CAR):
        //   SkipString()
        break

    }

    stream.next(1)

  }

  function YAMLFrontmatter () {

  }

  function StartHTMLTag () {

  }

  function EndHTMLTag () {

  }

  function HTMLComment () {

  }

  function MultilineComment () {

  }

  function StartLiquidTag (type) {

    inLiquidToken = stream.getPosition()

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s}%])/)

    console.log('LiquidTag', name, stream.getString(inLiquidToken))
    // stream.gotoEnd()
  }

  function LiquidObject (type) {
    console.log('LiquidObject')
    // stream.gotoEnd()
  }

  function SkipString () {

  }

  function SinglelineComment () {

  }

}

const text = readFileSync(resolve('test/parsing/fixtures/text.txt'), 'utf8').toString()

test('parser', t => {

  const scan = Scanner(text)
  console.log(scan)

})
