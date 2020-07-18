import * as TokenType from '../lexical/lexme'
import * as ScanState from '../lexical/scan'
import * as Character from '../lexical/characters'
import { Stream } from '../streamer'
import { ARS, DSH, BNG, LCB, RCB, PER, RAN, LAN, FWS, SQO, DQO, BWS, EQS } from '../lexical/characters'

export function Scanner (
  input
  , initialOffset = 0
  , initialState = ScanState.WithinContent
  , emitPseudoCloseTags = false
) {

  let state = initialState
    , tokenOffset = 0
    , tokenType = TokenType.Unknown
    , tokenError
    , hasSpaceAfterTag
    , lastTag
    , lastAttributeName
    , lastTypeValue

  const stream = Stream({
    textDocument: {
      getText: () => input
    }
  }, initialOffset)

  state = stream.advanceIfRegExp(/[<]/).charCodeAt(0)

  /* -------------------------------------------- */
  /*                   FUNCTIONS                  */
  /* -------------------------------------------- */

  function HTMLElementName () {

    return stream.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase()

  }

  function nextAttributeName () {

    return stream.advanceIfRegExp(/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase()

  }

  function tokenize (offset, type, errorMessage) {

    tokenType = type
    tokenOffset = offset
    tokenError = errorMessage

    return type

  }

  function scan () {

    const token = internalScan()

    return token

  }

  function internalScan () {

    const offset = stream.position()

    if (stream.eos()) return tokenize(offset, TokenType.EOS)

    let errorMessage

    switch (state) {

      case Character.LAN:

        if (!stream.eos() && stream.peekChar() === BNG) { // !
          if (stream.advanceIfChars([ BNG, DSH, DSH ])) { // <!--
            state = ScanState.WithinHTMLComment
            return tokenize(offset, TokenType.HTMLStartCommentTag)
          }
        }

        if (stream.advanceIfChar(FWS)) { // /
          state = ScanState.AfterOpeningHTMLEndTag
          return tokenize(offset, TokenType.HTMLEndTagOpen)
        }

        state = ScanState.AfterOpeningHTMLStartTag
        return tokenize(offset, TokenType.HTMLStartTagOpen)

        // return tokenize(offset, TokenType.Content)

      case ScanState.WithinHTMLComment:

        if (stream.advanceIfChars([ DSH, DSH, RAN ])) { // -->
          state = ScanState.WithinContent
          return tokenize(offset, TokenType.HTMLEndCommentTag)
        }

        stream.advanceUntilChars([ DSH, DSH, RAN ]) // -->
        return tokenize(offset, TokenType.HTMLComment)

      case ScanState.AfterOpeningHTMLEndTag:

        if (HTMLElementName().length > 0) {
          state = ScanState.WithinHTMLEndTag
          return tokenize(offset, TokenType.HTMLEndTag)
        }

        if (stream.skipWhitespace()) { // white space is not valid here
          return tokenize(offset, TokenType.Whitespace, 'error.unexpectedWhitespace')
        }

        state = ScanState.WithinHTMLEndTag
        stream.advanceUntilChar(RAN)

        if (offset < stream.position()) {
          return tokenize(offset, TokenType.Unknown, 'error.endTagNameExpected')
        }

        return internalScan()

      case ScanState.WithinHTMLEndTag:

        if (stream.skipWhitespace()) { // white space is valid here
          return tokenize(offset, TokenType.Whitespace)
        }

        if (stream.advanceIfChar(RAN)) { // >
          state = ScanState.WithinContent
          return tokenize(offset, TokenType.HTMLEndTagClose)
        }

        if (emitPseudoCloseTags && stream.peekChar() === LAN) { // <
          state = ScanState.WithinContent
          return tokenize(offset, TokenType.HTMLEndTagClose, 'error.closingBracketMissing')
        }

        errorMessage = 'error.closingBracketExpected'

        break

      case ScanState.AfterOpeningHTMLStartTag:

        lastTag = HTMLElementName()
        lastAttributeName = 0
        lastTypeValue = 0

        if (lastTag.length > 0) {
          hasSpaceAfterTag = false
          state = ScanState.WithinHTMLTag
          return tokenize(offset, TokenType.HTMLStartTag)
        }

        if (stream.skipWhitespace()) { // white space is not valid here
          return tokenize(offset, TokenType.Whitespace, 'error.unexpectedWhitespace')
        }

        state = ScanState.WithinHTMLTag
        stream.advanceUntilChar(RAN)

        if (offset < stream.position()) {
          return tokenize(offset, TokenType.Unknown, 'error.startTagNameExpected')
        }

        return internalScan()

      case ScanState.WithinHTMLTag:

        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true // remember that we have seen a whitespace
          return tokenize(offset, TokenType.Whitespace)
        }

        if (hasSpaceAfterTag) {

          lastAttributeName = nextAttributeName()

          if (lastAttributeName.length > 0) {
            state = ScanState.AfterHTMLAttributeName
            hasSpaceAfterTag = false
            return tokenize(offset, TokenType.HTMLAttributeName)
          }
        }

        if (stream.advanceIfChars([ FWS, RAN ])) { // />
          state = ScanState.WithinContent
          return tokenize(offset, TokenType.HTMLStartTagSelfClose)
        }

        if (stream.advanceIfChar(RAN)) { // >
          return tokenize(offset, TokenType.HTMLStartTagClose)
        }

        if (emitPseudoCloseTags && stream.peekChar() === LAN) { // <
          state = ScanState.WithinContent
          return tokenize(offset, TokenType.HTMLStartTagClose, 'error.closingBracketMissing')
        }

        stream.next(1)
        return tokenize(offset, TokenType.Unknown, 'error.unexpectedCharacterInTag')

      case ScanState.AfterHTMLAttributeName:

        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true
          return tokenize(offset, TokenType.Whitespace)
        }

        if (stream.advanceIfChar(EQS)) {
          state = ScanState.BeforeHTMLAttributeValue
          return tokenize(offset, TokenType.HTMLOperatorValue)
        }

        state = ScanState.WithinHTMLTag
        return internalScan() // no advance yet - jump to WithinTag

      case ScanState.BeforeHTMLAttributeValue:

        if (stream.skipWhitespace()) return tokenize(offset, TokenType.Whitespace)

        // eslint-disable-next-line
        let attributeValue = stream.advanceIfRegExp(/^[^\s"'`=<>]+/)

        if (attributeValue.length > 0) {

          // <foo bar=http://foo/>
          if (stream.peekChar() === RAN && stream.peekChar(-1) === FWS) {
            stream.prev(1)
            attributeValue = attributeValue.substr(0, attributeValue.length - 1)
          }

          if (lastAttributeName === 'type') lastTypeValue = attributeValue

          state = ScanState.WithinHTMLTag
          hasSpaceAfterTag = false

          return tokenize(offset, TokenType.HTMLAttributeValue)

        }

        // eslint-disable-next-line
        const ch = stream.peekChar()

        if (ch === SQO || ch === DQO) {

          stream.next(1) // consume quote

          if (stream.advanceUntilChar(ch)) stream.next(1) // consume quote

          if (lastAttributeName === 'type') {
            lastTypeValue = stream.getText(offset + 1, stream.position() - 1)
          }

          state = ScanState.WithinHTMLTag
          hasSpaceAfterTag = false

          return tokenize(offset, TokenType.HTMLAttributeValue)

        }

        state = ScanState.WithinHTMLTag
        hasSpaceAfterTag = false

        return internalScan() // no advance yet - jump to WithinTag

    }

    stream.next(1)
    console.log(offset)

    state = stream.advanceIfRegExp(/[<]/).charCodeAt(0)

    return tokenize(offset, TokenType.Unknown, errorMessage)

  }

  return {
    scan,
    getTokenType: () => tokenType,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => stream.position() - tokenOffset,
    getTokenEnd: () => stream.position(),
    getTokenText: () => stream.source().substring(tokenOffset, stream.position()),
    getScanState: () => state,
    getTokenError: () => tokenError
  }
}

function findFirst (array, p) {
  let low = 0, high = array.length
  if (high === 0) {
    return 0 // no children
  }
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (p(array[mid])) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return low
}
export function binarySearch (array, key, comparator) {
  let low = 0, high = array.length - 1
  while (low <= high) {
    const mid = ((low + high) / 2) | 0
    const comp = comparator(array[mid], key)
    if (comp < 0) {
      low = mid + 1
    } else if (comp > 0) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -(low + 1)
}

class Node {

  constructor (start, end, children, parent) {
    this.tag = undefined
    this.start = start
    this.end = end
    this.children = children
    this.parent = parent
    this.closed = false
    this.attributes = undefined

  }

  get attributeNames () {
    return this.attributes ? Object.keys(this.attributes) : []
  }

  isSameTag (tagInLowerCase) {
    return this.tag && tagInLowerCase && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase
  }

  get firstChild () {
    return this.children[0]
  }

  get lastChild () {
    return this.children.length ? this.children[this.children.length - 1] : 0
  }

  findNodeBefore (offset) {
    const idx = findFirst(this.children, c => offset <= c.start) - 1
    if (idx >= 0) {
      const child = this.children[idx]
      if (offset > child.start) {
        if (offset < child.end) {
          return child.findNodeBefore(offset)
        }
        const lastChild = child.lastChild
        if (lastChild && lastChild.end === child.end) {
          return child.findNodeBefore(offset)
        }
        return child
      }
    }
    return this
  }

  findNodeAt (offset) {
    const idx = findFirst(this.children, c => offset <= c.start) - 1
    if (idx >= 0) {
      const child = this.children[idx]
      if (offset > child.start && offset <= child.end) {
        return child.findNodeAt(offset)
      }
    }
    return this
  }

}

const VOID_ELEMENTS = [ 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr' ]

function isVoidElement (e) {
  return !!e && binarySearch(
    VOID_ELEMENTS
    , e.toLowerCase()
    , (s1, s2) => s1.localeCompare(s2)
  ) >= 0
}
export function Parse (text) {

  const scanner = Scanner(text, undefined, undefined, true)
  const htmlDocument = new Node(0, text.length, [], 0)
  let node
  const ast = []

  node = {}

  let curr = htmlDocument,
    endTagStart = -1,
    endTagName = null,
    pendingAttribute = null,
    token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.HTMLStartTagOpen:

        const child = new Node(scanner.getTokenOffset(), text.length, [], curr)

        console.log('HTMLStartTagOpen')
        node.kind = 2 // html
        node.offset = [ scanner.getTokenOffset() ]

        curr.children.push(child)
        curr = child

        break

      case TokenType.HTMLStartTag:
        node.name = scanner.getTokenText()
        curr.tag = scanner.getTokenText()
        console.log('HTMLStartTag')

        break

      case TokenType.HTMLStartTagClose:
        console.log('HTMLStartTagClose')

        if (curr.parent) {

          curr.end = scanner.getTokenEnd() // might be later set to end tag position

          if (scanner.getTokenLength()) {

            curr.startTagEnd = scanner.getTokenEnd()
            node.startTagEnd = scanner.getTokenEnd() // might be later set to end tag position

            if (curr.tag && isVoidElement(curr.tag)) {
              curr.closed = true
              curr = curr.parent
            }

          } else {
            // pseudo close token from an incomplete start tag
            curr = curr.parent
          }

          ast.push(node)

          node = {}
        }
        break

      case TokenType.HTMLEndTagOpen:
        endTagStart = scanner.getTokenOffset()
        endTagName = null
        break
      case TokenType.HTMLEndTag:
        endTagName = scanner.getTokenText().toLowerCase()
        break
      case TokenType.HTMLEndTagClose:

        console.log('HTMLEndTagClose')

        if (endTagName) {

          const nodez = curr
          // see if we can find a matching tag
          // while (!node.isSameTag(endTagName) && node.parent) {
          // node = node.parent
          // }

          ast[ast.length - 1].offset.push(endTagStart)

          if (nodez.parent) {
            while (curr !== nodez) {
              curr.end = endTagStart
              curr.closed = false
              curr = curr.parent
            }
            curr.closed = true
            curr.endTagStart = endTagStart
            curr.end = scanner.getTokenEnd()
            curr = curr.parent
          }
          // ast.push(node)
        }
        break
      case TokenType.HTMLAttributeName: {
        pendingAttribute = scanner.getTokenText()
        let attributes = curr.attributes
        if (!attributes) {
          curr.attributes = attributes = {}
          node.attributes = attributes = {}

        }
        attributes[pendingAttribute] = null // Support valueless attributes such as 'checked'
        break
      }
      case TokenType.HTMLAttributeValue: {
        const value = scanner.getTokenText()
        const attributes = node.attributes
        if (attributes && pendingAttribute) {
          attributes[pendingAttribute] = value
          pendingAttribute = null
        }
        break
      }
    }

    token = scanner.scan()
  }

  while (curr.parent) {
    curr.end = text.length
    curr.closed = false
    curr = curr.parent
  }

  // htmlDocument.findNodeAt.bind(htmlDocument)

  return ast

}
