import { Stream } from './stream'
import * as TokenTypes from './lexical/types'
import * as TokenTag from './lexical/tokens'
import _ from 'lodash'
import { ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO, BWS } from './lexical/characters'
/* eslint one-var: ["error", { let: "never" } ] */

const RGX = /\b(?:script|style)/
export function Parser (document, specs) {

  const stream = Stream(document)
  const { associates } = document.__test

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  let HTMLNode

  /**
   * HTML Token Context Node
   *
   * @type {number}
   */
  const HTMLTagClose = []

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
   * Scanner - Scans, tokenize and parses document content
   *
   * @param {number} [offset=0]
   * @returns
   */
  function scan (offset = 0) {

    if (offset > 0) stream.goto(offset)

    while (stream.eos()) {

      const N = stream.getPosition()

      switch (stream.getCodeChar()) {
        case (DSH):
          if (specs.frontmatter && stream.eachCodeChar('---')) {
            Frontmatter(N)
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
          if (!HTMLNode && !stream.nextCodeChar(FWS)) {
            OpenHTMLToken(N)
          } else if (stream.eachCodeChar('!--')) {
            CommentToken(N, '-->')
          }
          break
        case (RAN):
          if (HTMLNode) {
            CloseHTMLToken(N + 1)
          }
          break
        case (FWS):
          if (HTMLNode && stream.prevCodeChar(LAN)) {
            OpenHTMLToken(N)
          } else if (stream.nextCodeChar(ARS)) {
            CommentToken(N, '*/')
          } else if (stream.nextCodeChar(FWS)) {
            CommentToken(N, '\n')
          }
          break
        case (BWS):
          if (LiquidNode) {
            stream.next(1)
          }
          break
        case (SQO):
        case (DQO):
          if (LiquidNode) {
            stream.skipString(N)
          } else if (HTMLNode) {

            const end = stream.fastForward('>')
            console.log(stream.getString(N, end))
          }
          break
      }

      stream.next(1)

    }

    return document

  }

  /**
   * Open HTML Tag - The LEFT side delimeter `<tag `
   *
   * @param {number} n
   */
  function OpenHTMLToken (n) {

    const name = stream.regex(/^[^\s"'></=]*/)

    if (!name) return null

    if (HTMLNode) {

      if (HTMLNode.name === name) HTMLNode.offset.push(n - 1)
      else HTMLNode.attrs = { [name]: '' }

      console.log(HTMLNode)

    } else {

      const spec = associates.filter(i => i.name === name && i.kind === 'html')

      if (!spec.some(i => i.name === name)) return null

      HTMLNode = { name, token: [], offset: [ n ] }

      if (spec?.language) HTMLNode.languageId = spec.language

      stream.next(1)

      return OpenHTMLToken(n + 2)

    }
    // stream.goto(n + 1)

  }

  function CloseHTMLToken (n) {

    HTMLNode.token.push(stream.getString(HTMLNode.offset[HTMLNode.offset.length - 1], n))
    HTMLNode.offset.push(n)

    if (HTMLNode.offset.length === 2) {

      // HTMLNode.token[0]
      console.log(HTMLNode.token[0])

    } else if (HTMLNode.offset.length > 3) {
      if (HTMLNode.offset.length === 4) document.ast.push(HTMLNode)
      HTMLNode = undefined
    }

    // console.log(HTMLNode)

  }

  /**
   * Open Liquid Tag - The LEFT side delimeter `{% tag ` or `{{ tag`
   *
   * @param {number} n
   * @returns
   */
  function OpenLiquidToken (n) {

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s\n}%])/)

    if (!name) return console.log('Parse Error, Tag name is incorrect')

    const end = name.slice(0, 3) === 'end' ? name.substring(3) : name
    const spec = stream.prevCodeChar(LCB) ? specs.objects[end] : specs.tags[end]

    LiquidNode = { name, token: [], offset: [ n ] }

    if (typeof spec === 'object') {

      if (spec?.language) LiquidNode.languageId = spec.language

      LiquidNode.type = TokenTypes[spec.type]
      LiquidNode.tag = (spec?.singular
        ? spec?.within
          ? TokenTag.child
          : TokenTag.singular
        : end
          ? TokenTag.close
          : TokenTag.start
      )
    }

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
      LiquidTag.token.push(stream.getString(LiquidNode.offset[0], n))

      LiquidChildren.splice(LiquidChildren.length - 1, 1)
      LiquidTag = LiquidChildren[LiquidChildren.length - 1]

    } else {

      // console.log(LiquidNode)

      LiquidNode.offset.push(n)
      LiquidNode.token.push(stream.getString(LiquidNode.offset[0], n))

      //  console.log(LiquidNode)

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

    // console.log(document.ast)
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

    const end = stream.fastForward('---')

    if (!end) return console.log('Parse Error, frontmatter is unclosed')

    frontmatter = { offset: [ n, end ], content: stream.getString(n, end) }
    stream.goto(end)

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

    document.ast.push({
      name: 'html-comment'
      , offset: [ n, end ]
      , content: stream.getString(n, end)
    })

  }

  return {
    scan
  }
}
