import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Characters, TokenTag, TokenKind } from '../../src/parser/lexical'
import { Stream } from '../../src/parser/stream'
import * as TokenTypes from '../../src/parser/lexical/types'
import specs from '@liquify/liquid-language-specs'
import _ from 'lodash'

const {
  ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO,
  WSP, NWL, TAB, CAR, BWS, BNG, LFD
} = Characters

/* eslint one-var: ["error", { let: "never" } ] */

const RGX = /\b(?:script|style)/

function Scanner (
  text
  , specs
  , {
    errors = {},
    frontmatter = {},
    variables = {},
    ast = [],
    strict = true
  } = {}
) {

  const stream = Stream(text)

  /**
   * Node index contained within the AST
   *
   * @type {object}
   */
  let HTMLNode = -1

  /**
   * Current position is contained within HTML token
   *
   * @type {object}
   */
  let HTMLToken = -1

  /**
   * Node index contained within the AST
   *
   * @type {object}
   */
  let HTMLAttribute = -1

  /**
   * Node index contained within the AST
   *
   * @type {object}
   */
  let LiquidNode = -1

  /**
   * Current position is contained within Liquid token
   *
   * @type {object}
   */
  let LiquidToken = -1

  /**
   * Current position is contained within Liquid token
   *
   * @type {object}
   */
  let LiquidTag = -1

  let inString

  /* SCAN ----------------------------------------- */

  while (stream.eos()) {

    const N = stream.getPosition()

    console.log('before', stream.getPosition())

    switch (stream.getCodeChar()) {
      case (DSH):
        if (stream.eachCodeChar('---')) {
          Frontmatter(N)
        }
        break
      case (LCB):
        if ((stream.nextCodeChar(PER) || stream.nextCodeChar(LCB)) && LiquidToken < 0) {
          OpenLiquidToken(N)
        }
        break
      case (PER):
      case (RCB):
        if (stream.nextCodeChar(RCB) && LiquidToken >= 0) {
          CloseLiquidToken(N + 2)
        }
        break
      case (LAN):
        if (HTMLToken < 0) {
          OpenHTMLToken(N)
        } else if (stream.nextCodeChar(LAN) && stream.eachCodeChar('!--')) {
          CommentToken(N, '-->')
        }
        break
      case (RAN):
        if (!HTMLNode && HTMLToken > 0) {
          CloseHTMLToken(N)
        }
        break
      case (FWS):
        if (stream.nextCodeChar(ARS)) {
          CommentToken(N, '*/')
        } else if (stream.nextCodeChar(FWS)) {
          CommentToken(N, '\n')
        }
        break
      case (SQO):
      case (DQO):
        if (LiquidToken >= 0) {
          stream.skipString(N)
        }
        break
      // default: stream.next(1)
        // break
    }

    stream.next(1)

  }

  /**
   * Open HTML Tag - The LEFT side delimeter `<tag `
   *
   * @param {number} n
   */
  function OpenHTMLToken (n) {

    HTMLToken = n

  }

  function CloseHTMLToken (n) {

    HTMLNode.offset.push(n)
    HTMLNode.token.push(text.substring(HTMLNode.offset[0], n))
    HTMLToken = -1
    HTMLNode = undefined

  }

  /**
   * Open Liquid Tag - The LEFT side delimeter `{% tag ` or `{{ tag`
   *
   * @param {number} n
   * @returns
   */
  function OpenLiquidToken (n) {

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s}%])/)

    if (!name) return console.log('Parse Error, Tag name is incorrect')

    LiquidToken = n
    LiquidNode = { name, token: [], offset: [ n ] }

    if (name.slice(0, 3) === 'end') {
      LiquidNode.tag = TokenTag.close
      return
    }

    const spec = stream.nextCodeChar(LCB)
      ? specs.objects[name]
      : specs.tags[name]

    if (typeof spec === 'object') {

      LiquidNode.type = TokenTypes[spec.type]

      if (spec?.singular) {

        if (spec?.within) {
          LiquidNode.tag = TokenTag.child
        } else {
          LiquidNode.tag = TokenTag.singular
        }

      } else {

        LiquidNode.tag = TokenTag.start

        if (
          LiquidNode.type === TokenTypes.control ||
          LiquidNode.type === TokenTypes.iteration
        ) {
          LiquidNode.children = []
          LiquidNode.objects = {}
        } else if (
          LiquidNode.type === TokenTypes.embedded ||
          LiquidNode.type === TokenTypes.associate
        ) {
          LiquidNode.languageId = spec.language
        }
      }
    }
  }

  /**
   * Close Liquid Tag - The RIGHT side delimeter `tag %}` or `tag }}`
   *
   * @param {number} n
   * @returns
   */
  function CloseLiquidToken (n) {

    console.log(text.slice(n))

    LiquidNode.offset.push(n)
    LiquidNode.token.push(text.substring(LiquidNode.offset[0], n))
    // LiquidNode.tag = TokenTag.pair

    if (LiquidNode.tag === TokenTag.child) {
      if (LiquidTag?.children) LiquidTag.children.push(LiquidNode)
    } else if (LiquidNode.tag === TokenTag.close) {
      LiquidTag.close = LiquidNode
      LiquidTag.tag = TokenTag.pair
    } else {
      ast.push(LiquidNode)
    }

    if (LiquidTag && LiquidNode.tag === TokenTag.start) {
      LiquidTag = ast[ast.length - 1]
    } else if (LiquidNode.tag === TokenTag.pair) {
      LiquidTag = false
    }

    LiquidToken = -1
    LiquidNode = undefined

    console.log(ast)

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

    const end = stream.fastForward('---')

    if (end) {

      frontmatter = { offset: [ n, end ], content: text.substring(n, end) }

      // Forward (moves to end of frontmatter)
      stream.goto(end)

    }

    return console.log('Parse Error, frontmatter is unclosed')

  }

  /**
   * HTML Comments - Advances stream to end position
   *
   * @param {number} n
   * @param {string} str
   */
  function CommentToken (n, str) {

    const end = stream.fastForward(str)

    if (end === false) return console.log('Parse Error, frontmatter is unclosed')

    ast.push({
      name: 'html-comment'
      , offset: [ n, end ]
      , content: text.substring(n, end)
    })

  }

  /**
   * Skip Whitespace
   *
   * @param {number} n
   */
  function SkipWhitespace (n) {

    const name = text.slice(HTMLToken + 1, n)

    if (RGX.test(name)) {

      ast.push({ name, token: [], offset: [ HTMLToken ] })

      HTMLAttribute = n
      HTMLNode = ast[ast.length - 1]

      console.log(HTMLNode)

    } else {
      HTMLAttribute = -1
    }
  }

}

const text = readFileSync(resolve('test/parsing/fixtures/text.txt'), 'utf8').toString()

test.before('Language Server Initialize', async t => {

  t.context.spec = (await specs('sissel siv')).shopify()
  t.pass('Specification Applied')

})

test('parser', t => {

  const scan = Scanner(text, t.context.spec)

})
