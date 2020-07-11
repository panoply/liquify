import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Characters, TokenTag, TokenKind } from '../../src/parser/lexical'
import { Stream } from '../../src/parser/stream'
import * as TokenTypes from '../../src/parser/lexical/types'
import { TokenType } from '../../src/parser/lexical/lexme'
import specs from '@liquify/liquid-language-specs'
import _ from 'lodash'

const {
  ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO,
  WSP, NWL, TAB, CAR, BWS, BNG, LFD
} = Characters

/* eslint one-var: ["error", { let: "never" } ] */

const RGX = /\b(?:script|style)/

function Scanner (text, specs, { ast = [] } = {}) {

  const stream = Stream(text)

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  let HTMLNode

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

  function scan (offset = 0) {

    stream.goto(offset)

    while (stream.eos()) {

      const N = stream.getPosition()

      switch (stream.getCodeChar()) {
        case (DSH):
          if (specs.frontmatter && stream.eachCodeChar('---')) {

            // handle errors with frontmatter is not initial contents
            if (N > 0 && text.slice(0, N).trim().length > 0) {
              return console.log('Parse Error, content before frontmatter')
            }

            const end = stream.fastForward('---')

            text.substring(N, stream.fastForward('---'))
          }
          break
        case (LCB):
          if (!LiquidNode && (stream.nextCodeChar(PER) || stream.nextCodeChar(LCB))) {
            OpenLiquidToken(N)
          }
          break
        case (PER):
        case (RCB):
          if (LiquidNode && stream.nextCodeChar(RCB)) {
            CloseLiquidToken(N + 2)
          }
          break
        case (LAN):
          if (!HTMLNode) {
            OpenHTMLToken(N)
          } else if (HTMLNode && stream.nextCodeChar(FWS)) {
            CloseHTMLToken(N + 1)
          } else if (stream.eachCodeChar('!--')) {
            CommentToken(N, '-->')
          }
          break
        case (FWS):
          if (stream.nextCodeChar(ARS)) {
            CommentToken(N, '*/')
          } else if (stream.nextCodeChar(FWS)) {
            CommentToken(N, '\n')
          }
          break
      }

      stream.next(1)

    }
  }

  /**
   * Open HTML Tag - The LEFT side delimeter `<tag `
   *
   * @param {number} n
   */
  function OpenHTMLToken (n) {

    const next = stream.nextRegex(/[\s>](?![<"'])/)
    const name = stream.getString(n + 1, next)

    if (!/\b(?:script|style)/.test(name)) return null

    const spec = specs[name]

    HTMLNode = {
      name
      , token: []
      , offset: [ n ]
    }

    if (spec?.language) HTMLNode.languageId = spec.language

    if (stream.getCodeChar(next) !== RAN) {

      const close = stream.nextRegex(/>(?!["'])/)
      const slice = stream.getString(next, close)

      if (/[<>](?!["'])/.test(slice)) {
        return console.log('Parse Error, HTML Tag not closed correctly')
      }

      if (spec?.mimetype && new RegExp(spec.mimetype).test(slice)) {
        HTMLNode.offset.push(close)
        HTMLNode.token.push(stream.getString(n, close + 1))
      }

    } else {
      HTMLNode.offset.push(next)
      HTMLNode.token.push(stream.getString(n, next + 1))
    }

  }

  function CloseHTMLToken (n) {

    const close = stream.nextRegex(/[>](?!["'])/)
    const name = stream.getString(n - 1, close + 1)

    if (!/\b(?:script|style)/.test(name)) return null

    console.log(stream.getString(n, close + 1))

    if (!close) {
      return console.log('Parse Error, HTML Tag not closed correctly')
    }

    HTMLNode.offset.push(n - 1, close + 1)
    HTMLNode.token.push(stream.getString(n - 1, close + 1))

    ast.push(HTMLNode)

    console.log(ast)

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

    let isEndTag

    if (name.slice(0, 3) === 'end') isEndTag = name.substring(3)

    const prop = isEndTag || name
    const spec = stream.prevCodeChar(LCB) ? specs.objects[prop] : specs.tags[prop]

    LiquidNode = {
      name
      , token: []
      , offset: [ n ]
    }

    if (typeof spec !== 'object') return

    if (spec?.language) LiquidNode.languageId = spec.language

    LiquidNode.type = TokenTypes[spec.type]
    LiquidNode.tag = (spec?.singular
      ? spec?.within
        ? TokenTag.child
        : TokenTag.singular
      : isEndTag
        ? TokenTag.close
        : TokenTag.start
    )

    // console.log(LiquidNode)
    stream.skipString()

  }

  /**
   * Close Liquid Tag - The RIGHT side delimeter `tag %}` or `tag }}`
   *
   * @param {number} n
   * @returns
   */
  function CloseLiquidToken (n) {

    if (LiquidNode.tag === TokenTag.close) {

      LiquidTag.tag = TokenTag.pair
      LiquidTag.offset.push(LiquidNode.offset[0], n)
      LiquidTag.token.push(text.substring(LiquidNode.offset[0], n))

      LiquidChildren.splice(LiquidChildren.length - 1, 1)
      LiquidTag = LiquidChildren[LiquidChildren.length - 1]

    } else {

      LiquidNode.offset.push(n)
      LiquidNode.token.push(text.substring(LiquidNode.offset[0], n))

      if (LiquidNode.tag === TokenTag.child) {
        if (LiquidTag?.children) LiquidTag.children.push(LiquidNode)
        else LiquidTag.children = [ LiquidNode ]
      } else {
        ast.push(LiquidNode)
      }
    }

    if (LiquidNode.tag === TokenTag.start) {
      LiquidChildren = [ ...LiquidChildren, ast[ast.length - 1] ]
      LiquidTag = LiquidChildren[LiquidChildren.length - 1]
    }

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

  return {
    scan
  }

}

const text = readFileSync(resolve('test/parsing/fixtures/text.txt'), 'utf8').toString()

test.before('Language Server Initialize', async t => {

  t.context.spec = (await specs('sissel siv')).shopify()

  t.context.spec.script = {
    kind: 'html',
    language: 'javascript',
    mimetype: 'application/json'
  }

  t.context.spec.style = {
    kind: 'html',
    language: 'css',
    attr: 'data-attr="test"'
  }

  t.pass('Specification Applied')

})

test('parser', t => {

  const scan = Scanner(text, t.context.spec)

})
