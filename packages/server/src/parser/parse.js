import { Stream } from './stream'
import * as TokenTypes from './lexical/types'
import * as TokenTag from './lexical/tokens'
import * as TokenKind from './lexical/kinds'
import { ARS, DSH, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO, BWS, EQS } from './lexical/characters'
/* eslint one-var: ["error", { let: "never" } ] */

export function Parser (document, specs) {

  const stream = Stream(document)

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
   * HTML Token Context Node
   *
   * @type {object}
   */
  let WithinHTMLString = -1

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
          if (!ParsedFrontmatter && specs.frontmatter && stream.eachCodeChar('---')) {
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
          if (!HTMLNode || WithinHTMLString >= 0) {
            OpenHTMLToken(offset)
          } else if (stream.eachCodeChar('!--')) {
            CommentToken(offset, '-->')
          }
          break
        case (RAN):
          if (WithinHTMLString < 0 && HTMLNode) {
          //  offset = stream.next()
            CloseHTMLToken(offset)
          }
          break
        case (FWS):
          if (WithinHTMLString < 0 && HTMLNode && stream.prevCodeChar(LAN)) {
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

    // if (offset > WithinHTMLString) WithinHTMLString = -1

    // if (!spec.some(i => i.name === name)) return null

    if (WithinHTMLString < 0 && stream.whitespace()) {
      if (stream.isCodeChar(RAN)) { // Tag has no attributes but does have spaces `<tag  >`

        if (HTMLNode && HTMLNode.name === name) { // We are in a close tag, eg: `</tag>`
          HTMLNode.offset.push(offset) // Align LAN `<` as position here is `/`
          return CloseHTMLToken(stream.next())
        } else if (!HTMLNode) {

          // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼
          HTMLNode = ASTNode(name, TokenKind.html, [ offset, stream.next() ])
          // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼

        }
      } else if (!HTMLNode) { // Tag contains attribute, re-run function

        HTMLNode = ASTNode(name, TokenKind.html, offset)
        return OpenHTMLToken(stream.prev())

      }
    } else if (stream.isCodeChar(RAN)) { // Tag has no whitespace and ends with RAN `>`

      if (HTMLNode) {
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return CloseHTMLToken(stream.next()) // Next offset, post RAN `>`
      }

      // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼
      HTMLNode = ASTNode(name, TokenKind.html, [ offset, stream.getPosition(1) ])
      // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼

    } else if (HTMLNode?.name !== name) {

      if (stream.whitespace()) return OpenHTMLToken(stream.getPosition(1))

      if (WithinHTMLString === offset) {
        if (stream.isCodeChar(RAN)) {
          WithinHTMLString = -1
          return CloseHTMLToken(stream.getPosition())
        }

        return OpenHTMLToken(stream.getPosition())

        // WithinHTMLString = -1
      } else if (offset > WithinHTMLString) WithinHTMLString = -1

      if (stream.isCodeChar(EQS)) {

        HTMLNode?.attrs ? HTMLNode.attrs.push([ name ]) : (HTMLNode.attrs = [ [ name ] ])

        const string = stream.getString(stream.next(), [ LAN, RAN, BWS, FWS ])
        const search = string.text.search(/{[{%]/)

        HTMLNode.attrs[HTMLNode.attrs.length - 1].push(string.text)

        // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼
        if (search >= 0) WithinHTMLString = stream.getPosition(1)
        // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼

        else {
          stream.goto(string.ends)

          return (stream.nextCodeChar(RAN)
            ? CloseHTMLToken(stream.next(2)) // Align After RAN `>` - position here is `">`
            : OpenHTMLToken(stream.getPosition(1))
          )
        }

      } else {

        // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼
        // HTMLNode.attrs[HTMLNode.attrs.length - 1].push(name)
        // RETURNS VOID: FUNCTION FALLS THROUGH `scan()` ▼

        if (stream.advanceIfChar(RAN)) CloseHTMLToken(stream.next())
      }
    } // else return OpenHTMLToken(stream.getPosition())

  }

  function CloseHTMLToken (offset) {

    console.log('OFFSET SENT ', offset)
    HTMLNode.token.push(stream.getText(HTMLNode.offset[HTMLNode.offset.length - 1], offset))
    HTMLNode.offset.push(offset)

    // console.log(HTMLNode)

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
    n = stream.getPosition(1)

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

    if (WithinHTMLString >= 0 && HTMLNode) {
      const value = HTMLNode.attrs[HTMLNode.attrs.length - 1][1].length + WithinHTMLString
      if (value === n) {
        WithinHTMLString = value
        console.log('close liquid', value, n, WithinHTMLString)
        return OpenHTMLToken(n)
      }
    }

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
