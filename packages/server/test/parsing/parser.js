import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Characters, TokenTag } from '../../src/parser/lexical'

const text = readFileSync(resolve('test/parsing/fixtures/text.txt'), 'utf8').toString()

const stack = []

let inToken = -1
  , inString = -1
  , inHTML = -1
  , token
  , name
  , node
  , nodeHTML
  , doNext

function scanner (source, initial) {

  let position = initial

  const len = source.length

  return {
    position: () => position,
    goto: (n) => (position = position + n),
    prev: n => (position -= n),
    next: () => (position += 1),
    prevChar: () => (source.charCodeAt(Math.abs(position - 1))),
    nextChar: () => (source.charCodeAt(Math.abs(position + 1))),
    peekChar: n => (source.charCodeAt(n)),
    eos: () => (position <= len)

  }

}

const scan = scanner(text, 0)
const AST = []

function hasWhitespace (n) {

  if (scan.peekChar(n) === Characters.DSH) {
    AST[node].whitespace.push(n)
    scan.goto(n)
  }
}

function getTokenName (n) {

  // console.log(text.charAt(n))

  // if (scan.peekChar(n) === Characters.DSH) n = n + 1

  const match = text.slice(n).match(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s}%])/)

  if (match) {
    AST[node].name = match[0]

  } else {

    console.error('PARSER ERROR')
  }

  // scan.goto(n + from + to)

}

function withinToken (n) {

  if (inString >= 0) return

  if (inToken < 0) {
    if (scan.nextChar() === Characters.PER || scan.prevChar() === Characters.LCB) {

      inToken = n
      node = AST.push({}) - 1

      if (scan.peekChar(n + 2) === Characters.DSH) {
        // scan.goto(n + 3)
        // AST[node].whitespace = true
      } else {
        // scan.goto(n + 2)
      }

      getTokenName(n)

      // console.log(text.slice(n), inString)
      // hasWhitespace(n + 2)

    }
  } else if (inToken >= 0) {
    if (scan.nextChar() === Characters.RCB || scan.prevChar() === Characters.RCB) {
      // hasWhitespace(n - 2)
      // console.log(text.slice(n))
      AST[node].token = text.substring(inToken - 1, n + 2)
      inToken = -1
    } else if (scan.prevChar() === Characters.PER) {
      AST[node].token = text.substring(inToken, n + 1)
      inToken = -1
    }
  }

}

function withinString (n) {

  // const lst = text.indexOf(text.charAt(n), n + 1)
  // const str = text.slice(n, lst)

  // if (str.endsWith('\\', lst)) {
  // console.log('string', str)
  // }

  if (inHTML > 0 && inToken < 0) return

  if (inString >= 0) {
    AST[node].string = text.substring(inString, n)
    inString = -1
  //  console.log(inString)
  } else {

    // skip empty strings , e: '' or ""
    console.log(text.charCodeAt(n) !== text.charCodeAt(n + 1))
    if (text.charCodeAt(n) !== text.charCodeAt(n + 1)) {
      inString = scan.next()
    } else {

    }

  }

  // const findString = token.search(/["']/)

  // if (findString) {

  // const fromString = text.slice(inString)

  // inString = text.indexOf(token.charAt(findString), n)
  // console.log(text.slice(inString))

  // console.log(n, inString, n + getString, getString, inToken)
  // n =

  // n = n + getString
  // }

}

function withinHTMLTag (n) {

  const tag = text.slice(n).match(/(?<=<\/?)\b(?:script|style)[^\s]*?/)

  if (tag) {
    if (text.charCodeAt(n) === Characters.RAN) {
      AST[nodeHTML].token = [ text.substring(inHTML, text.indexOf('>', n)) ]
    } else if (text.charCodeAt(n + 1) === Characters.BWS && tag[0] === AST[nodeHTML]?.name) {
      const s = text.indexOf('>', n + tag[0].length + 1)
      AST[nodeHTML].token.push(text.substring(n, s))
      inHTML = -1
      scan.goto(n + s)
    } else {
      nodeHTML = AST.push({ name: tag[0] }) - 1
      inHTML = n
    }

    // scan.goto(tag[0].length)
  } else {
    // scan.goto(n)
  }

}

function isCommentToken () {

}

function skipWhitespace (n) {

  // const nextChar = text.slice(n).search(/\S/)

  // console.log(n + nextChar)
  //  if (nextChar) {
  // scan.goto(n + nextChar)
  // }

}

test('parser', t => {

  let n = 0

  while (scan.eos()) {

    switch (scan.peekChar(n)) {
      case (Characters.LAN):
      case (Characters.RAN): withinHTMLTag(n)
        break
      case (Characters.LCB):
      case (Characters.RCB): withinToken(n)
        break
      case (Characters.SQO):
      case (Characters.DQO): withinString(n)
        break
      case (Characters.BWS): scan.next()
        break
    }

    n = scan.next()

    // console.log(n)
  }

  console.log(AST)

})
