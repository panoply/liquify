import { Stream } from './streamer'
import * as TokenTypes from './lexical/types'
import * as TokenTag from './lexical/tokens'
import * as TokenKind from './lexical/kinds'
import { ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO, BWS, EQS } from './lexical/characters'

/* eslint one-var: ["error", { let: "never" } ] */

export function Scanner (document, specs) {

  const stream = Stream(document)

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

  /**
   * Scanner - Scans, tokenize and parses document content
   *
   * @param {number} [offset=0]
   * @returns
   */
  function scan (offset = 0, eos = undefined) {

    if (offset > 0) stream.goto(offset)

    //    console.log(stream.getCodeChar())
    while (stream.eos()) {
      switch (stream.getCodeChar()) {
        case (DSH):
          if (specs.frontmatter && stream.advanceIfChars('---')) {
            Frontmatter(offset)
          }
          break
        case (LCB):
          if (!LiquidNode && (stream.nextCodeChar(PER) || stream.nextCodeChar(LCB))) {
            OpenLiquidToken(offset)
          }
          break
        case (RCB):
          if (stream.nextCodeChar(RCB)) offset = stream.next()
          if (LiquidNode || (LiquidNode && stream.prevCodeChar(PER))) {
            CloseLiquidToken(offset)
          }
          break
        case (LAN):
          if (!HTMLNode) {
            OpenHTMLToken(offset)
          } else if (stream.eachCodeChar('!--')) {
            CommentToken(offset, '-->')
          }
          break
        case (RAN):
          if (HTMLNode) {
            offset = stream.next()
            CloseHTMLToken(offset)
          }
          break
        case (FWS):
          if (HTMLNode && stream.prevCodeChar(LAN)) {
            OpenHTMLToken(offset)
          } else if (stream.nextCodeChar(ARS)) {
            CommentToken(offset, '*/')
          } else if (stream.nextCodeChar(FWS)) {
            CommentToken(offset, '\n')
          }
          break
        case (BWS):
          if (LiquidNode) offset = stream.next(1)
          break
        case (SQO):
        case (DQO):
          if (LiquidNode && !HTMLNode) {
            stream.skipString(offset)
          }
          break
      }

      // update
      offset = stream.next(1)
    }

    return document

  }

  const ASTNode = (name, kind, offset) => (typeof offset === 'number' ? {
    name,
    kind,
    token: [],
    offset: [ offset ]
  } : {
    name,
    kind,
    token: [ stream.getText(offset[0], offset[1]) ],
    offset: offset
  })

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

    if (stream.whitespace()) {
      if (stream.isCodeChar(RAN)) { // Tag has attributes but does have spaces (`<tag  >`)
        if (HTMLNode && HTMLNode.name === name) { // we are in a close tag, eg: `</tag>`
          HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
          return CloseHTMLToken(stream.next())
        } else if (!HTMLNode) {
          HTMLNode = ASTNode(name, TokenKind.html, [ offset, stream.next() ])
        }
      } else if (!HTMLNode) { // Tag contains a value,(attribute) re-run function
        HTMLNode = ASTNode(name, TokenKind.html, offset)
        return OpenHTMLToken(stream.prev())
      }
    } else if (stream.isCodeChar(RAN)) { // Tag has no whitespace, ends with RAN `>`
      if (!HTMLNode) {
        HTMLNode = ASTNode(name, TokenKind.html, [ offset, stream.getPosition(1) ])
      } else {
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return CloseHTMLToken(stream.next())
      }
    } else if (HTMLNode) {
      if (name && HTMLNode.name !== name) {
        if (HTMLNode?.attrs) HTMLNode.attrs.push([ name ])
        else HTMLNode.attrs = [ [ name ] ]
        if (stream.isCodeChar(EQS)) {
          const string = stream.getString(stream.next(), [ LAN, RAN, BWS, FWS ])

          HTMLNode.attrs[HTMLNode.attrs.length - 1].push(string.text)
          stream.goto(string.ends)

          if (stream.nextCodeChar(RAN)) return CloseHTMLToken(stream.next(2))
          return OpenHTMLToken(stream.next(1))

        }
      }
    }

  }

  function CloseHTMLToken (offset) {

    HTMLNode.token.push(stream.getText(HTMLNode.offset[HTMLNode.offset.length - 1], offset))
    HTMLNode.offset.push(offset)

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
  function OpenLiquidToken (n) {

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s\n}%])/)

    if (!name) return console.log('Parse Error, Tag name is incorrect')

    let isEndTag

    if (name.slice(0, 3) === 'end') isEndTag = name.substring(3)

    const prop = isEndTag || name
    const spec = stream.prevCodeChar(LCB) ? specs.objects[prop] : specs.tags[prop]

    LiquidNode = ASTNode(name, TokenKind.liquid, n)

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

  }

  /**
   * Close Liquid Tag - The RIGHT side delimeter `tag %}` or `tag }}`
   *
   * @param {number} n
   * @returns
   */
  function CloseLiquidToken (n) {

    // increment once
    n = stream.next()

    if (LiquidNode.tag === TokenTag.close) {
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
    scan
  }
}
