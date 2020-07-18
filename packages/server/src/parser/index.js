import * as nls from 'vscode-nls'
import { TokenType, ScannerState } from '../htmlLanguageTypes'
const localize = nls.loadMessageBundle()
class MultiLineStream {

  constructor (source, position) {
    this.source = source
    this.len = source.length
    this.position = position
  }

  eos () {
    return this.len <= this.position
  }

  getSource () {
    return this.source
  }

  pos () {
    return this.position
  }

  goBackTo (pos) {
    this.position = pos
  }

  goBack (n) {
    this.position -= n
  }

  advance (n) {
    this.position += n
  }

  goToEnd () {
    this.position = this.source.length
  }

  nextChar () {
    return this.source.charCodeAt(this.position++) || 0
  }

  peekChar (n = 0) {
    return this.source.charCodeAt(this.position + n) || 0
  }

  advanceIfChar (ch) {
    if (ch === this.source.charCodeAt(this.position)) {
      this.position++
      return true
    }
    return false
  }

  advanceIfChars (ch) {
    let i
    if (this.position + ch.length > this.source.length) {
      return false
    }
    for (i = 0; i < ch.length; i++) {
      if (this.source.charCodeAt(this.position + i) !== ch[i]) {
        return false
      }
    }
    this.advance(i)
    return true
  }

  advanceIfRegExp (regex) {
    const str = this.source.substr(this.position)
    const match = str.match(regex)
    if (match) {
      this.position = this.position + match.index + match[0].length
      return match[0]
    }
    return ''
  }

  advanceUntilRegExp (regex) {
    const str = this.source.substr(this.position)
    const match = str.match(regex)
    if (match) {
      this.position = this.position + match.index
      return match[0]
    } else {
      this.goToEnd()
    }
    return ''
  }

  advanceUntilChar (ch) {
    while (this.position < this.source.length) {
      if (this.source.charCodeAt(this.position) === ch) {
        return true
      }
      this.advance(1)
    }
    return false
  }

  advanceUntilChars (ch) {
    while (this.position + ch.length <= this.source.length) {
      let i = 0
      for (; i < ch.length && this.source.charCodeAt(this.position + i) === ch[i]; i++) {
      }
      if (i === ch.length) {
        return true
      }
      this.advance(1)
    }
    this.goToEnd()
    return false
  }

  skipWhitespace () {
    const n = this.advanceWhileChar(ch => {
      return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR
    })
    return n > 0
  }

  advanceWhileChar (condition) {
    const posNow = this.position
    while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
      this.position++
    }
    return this.position - posNow
  }

}
const _BNG = '!'.charCodeAt(0)
const _MIN = '-'.charCodeAt(0)
const _LAN = '<'.charCodeAt(0)
const _RAN = '>'.charCodeAt(0)
const _FSL = '/'.charCodeAt(0)
const _EQS = '='.charCodeAt(0)
const _DQO = '"'.charCodeAt(0)
const _SQO = '\''.charCodeAt(0)
const _NWL = '\n'.charCodeAt(0)
const _CAR = '\r'.charCodeAt(0)
const _LFD = '\f'.charCodeAt(0)
const _WSP = ' '.charCodeAt(0)
const _TAB = '\t'.charCodeAt(0)
const htmlScriptContents = {
  'text/x-handlebars-template': true
}
export function createScanner (input, initialOffset = 0, initialState = ScannerState.WithinContent, emitPseudoCloseTags = false) {
  const stream = new MultiLineStream(input, initialOffset)
  let state = initialState,
    tokenOffset = 0,
    tokenType = TokenType.Unknown,
    tokenError,
    hasSpaceAfterTag,
    lastTag,
    lastAttributeName,
    lastTypeValue
  function nextElementName () {
    return stream.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase()
  }
  function nextAttributeName () {
    return stream.advanceIfRegExp(/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase()
  }
  function finishToken (offset, type, errorMessage) {
    tokenType = type
    tokenOffset = offset
    tokenError = errorMessage
    return type
  }
  function scan () {
    const offset = stream.pos()
    const oldState = state
    const token = internalScan()
    if (token !== TokenType.EOS && offset === stream.pos() && !(emitPseudoCloseTags && (token === TokenType.StartTagClose || token === TokenType.EndTagClose))) {
      console.log('Scanner.scan has not advanced at offset ' + offset + ', state before: ' + oldState + ' after: ' + state)
      stream.advance(1)
      return finishToken(offset, TokenType.Unknown)
    }
    return token
  }
  function internalScan () {
    const offset = stream.pos()
    if (stream.eos()) {
      return finishToken(offset, TokenType.EOS)
    }
    let errorMessage
    switch (state) {
      case ScannerState.WithinComment:
        if (stream.advanceIfChars([ _MIN, _MIN, _RAN ])) { // -->
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.EndCommentTag)
        }
        stream.advanceUntilChars([ _MIN, _MIN, _RAN ]) // -->
        return finishToken(offset, TokenType.Comment)
      case ScannerState.WithinDoctype:
        if (stream.advanceIfChar(_RAN)) {
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.EndDoctypeTag)
        }
        stream.advanceUntilChar(_RAN) // >
        return finishToken(offset, TokenType.Doctype)
      case ScannerState.WithinContent:
        if (stream.advanceIfChar(_LAN)) { // <
          if (!stream.eos() && stream.peekChar() === _BNG) { // !
            if (stream.advanceIfChars([ _BNG, _MIN, _MIN ])) { // <!--
              state = ScannerState.WithinComment
              return finishToken(offset, TokenType.StartCommentTag)
            }
            if (stream.advanceIfRegExp(/^!doctype/i)) {
              state = ScannerState.WithinDoctype
              return finishToken(offset, TokenType.StartDoctypeTag)
            }
          }
          if (stream.advanceIfChar(_FSL)) { // /
            state = ScannerState.AfterOpeningEndTag
            return finishToken(offset, TokenType.EndTagOpen)
          }
          state = ScannerState.AfterOpeningStartTag
          return finishToken(offset, TokenType.StartTagOpen)
        }
        stream.advanceUntilChar(_LAN)
        return finishToken(offset, TokenType.Content)
      case ScannerState.AfterOpeningEndTag:
        const tagName = nextElementName()
        if (tagName.length > 0) {
          state = ScannerState.WithinEndTag
          return finishToken(offset, TokenType.EndTag)
        }
        if (stream.skipWhitespace()) { // white space is not valid here
          return finishToken(offset, TokenType.Whitespace, localize('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'))
        }
        state = ScannerState.WithinEndTag
        stream.advanceUntilChar(_RAN)
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Unknown, localize('error.endTagNameExpected', 'End tag name expected.'))
        }
        return internalScan()
      case ScannerState.WithinEndTag:
        if (stream.skipWhitespace()) { // white space is valid here
          return finishToken(offset, TokenType.Whitespace)
        }
        if (stream.advanceIfChar(_RAN)) { // >
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.EndTagClose)
        }
        if (emitPseudoCloseTags && stream.peekChar() === _LAN) { // <
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.EndTagClose, localize('error.closingBracketMissing', 'Closing bracket missing.'))
        }
        errorMessage = localize('error.closingBracketExpected', 'Closing bracket expected.')
        break
      case ScannerState.AfterOpeningStartTag:
        lastTag = nextElementName()
        lastTypeValue = void 0
        lastAttributeName = void 0
        if (lastTag.length > 0) {
          hasSpaceAfterTag = false
          state = ScannerState.WithinTag
          return finishToken(offset, TokenType.StartTag)
        }
        if (stream.skipWhitespace()) { // white space is not valid here
          return finishToken(offset, TokenType.Whitespace, localize('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'))
        }
        state = ScannerState.WithinTag
        stream.advanceUntilChar(_RAN)
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Unknown, localize('error.startTagNameExpected', 'Start tag name expected.'))
        }
        return internalScan()
      case ScannerState.WithinTag:
        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true // remember that we have seen a whitespace
          return finishToken(offset, TokenType.Whitespace)
        }
        if (hasSpaceAfterTag) {
          lastAttributeName = nextAttributeName()
          if (lastAttributeName.length > 0) {
            state = ScannerState.AfterAttributeName
            hasSpaceAfterTag = false
            return finishToken(offset, TokenType.AttributeName)
          }
        }
        if (stream.advanceIfChars([ _FSL, _RAN ])) { // />
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.StartTagSelfClose)
        }
        if (stream.advanceIfChar(_RAN)) { // >
          if (lastTag === 'script') {
            if (lastTypeValue && htmlScriptContents[lastTypeValue]) {
              // stay in html
              state = ScannerState.WithinContent
            } else {
              state = ScannerState.WithinScriptContent
            }
          } else if (lastTag === 'style') {
            state = ScannerState.WithinStyleContent
          } else {
            state = ScannerState.WithinContent
          }
          return finishToken(offset, TokenType.StartTagClose)
        }
        if (emitPseudoCloseTags && stream.peekChar() === _LAN) { // <
          state = ScannerState.WithinContent
          return finishToken(offset, TokenType.StartTagClose, localize('error.closingBracketMissing', 'Closing bracket missing.'))
        }
        stream.advance(1)
        return finishToken(offset, TokenType.Unknown, localize('error.unexpectedCharacterInTag', 'Unexpected character in tag.'))
      case ScannerState.AfterAttributeName:
        if (stream.skipWhitespace()) {
          hasSpaceAfterTag = true
          return finishToken(offset, TokenType.Whitespace)
        }
        if (stream.advanceIfChar(_EQS)) {
          state = ScannerState.BeforeAttributeValue
          return finishToken(offset, TokenType.DelimiterAssign)
        }
        state = ScannerState.WithinTag
        return internalScan() // no advance yet - jump to WithinTag
      case ScannerState.BeforeAttributeValue:
        if (stream.skipWhitespace()) {
          return finishToken(offset, TokenType.Whitespace)
        }
        let attributeValue = stream.advanceIfRegExp(/^[^\s"'`=<>]+/)
        if (attributeValue.length > 0) {
          if (stream.peekChar() === _RAN && stream.peekChar(-1) === _FSL) { // <foo bar=http://foo/>
            stream.goBack(1)
            attributeValue = attributeValue.substr(0, attributeValue.length - 1)
          }
          if (lastAttributeName === 'type') {
            lastTypeValue = attributeValue
          }
          state = ScannerState.WithinTag
          hasSpaceAfterTag = false
          return finishToken(offset, TokenType.AttributeValue)
        }
        const ch = stream.peekChar()
        if (ch === _SQO || ch === _DQO) {
          stream.advance(1) // consume quote
          if (stream.advanceUntilChar(ch)) {
            stream.advance(1) // consume quote
          }
          if (lastAttributeName === 'type') {
            lastTypeValue = stream.getSource().substring(offset + 1, stream.pos() - 1)
          }
          state = ScannerState.WithinTag
          hasSpaceAfterTag = false
          return finishToken(offset, TokenType.AttributeValue)
        }
        state = ScannerState.WithinTag
        hasSpaceAfterTag = false
        return internalScan() // no advance yet - jump to WithinTag
      case ScannerState.WithinScriptContent:
        // see http://stackoverflow.com/questions/14574471/how-do-browsers-parse-a-script-tag-exactly
        let sciptState = 1
        while (!stream.eos()) {
          const match = stream.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i)
          if (match.length === 0) {
            stream.goToEnd()
            return finishToken(offset, TokenType.Script)
          } else if (match === '<!--') {
            if (sciptState === 1) {
              sciptState = 2
            }
          } else if (match === '-->') {
            sciptState = 1
          } else if (match[1] !== '/') { // <script
            if (sciptState === 2) {
              sciptState = 3
            }
          } else { // </script
            if (sciptState === 3) {
              sciptState = 2
            } else {
              stream.goBack(match.length) // to the beginning of the closing tag
              break
            }
          }
        }
        state = ScannerState.WithinContent
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Script)
        }
        return internalScan() // no advance yet - jump to content
      case ScannerState.WithinStyleContent:
        stream.advanceUntilRegExp(/<\/style/i)
        state = ScannerState.WithinContent
        if (offset < stream.pos()) {
          return finishToken(offset, TokenType.Styles)
        }
        return internalScan() // no advance yet - jump to content
    }
    stream.advance(1)
    state = ScannerState.WithinContent
    return finishToken(offset, TokenType.Unknown, errorMessage)
  }
  return {
    scan,
    getTokenType: () => tokenType,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => stream.pos() - tokenOffset,
    getTokenEnd: () => stream.pos(),
    getTokenText: () => stream.getSource().substring(tokenOffset, stream.pos()),
    getScannerState: () => state,
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

export function parse (text) {
  const scanner = createScanner(text, undefined, undefined, true)
  const htmlDocument = new Node(0, text.length, [], void 0)
  let curr = htmlDocument,
    endTagStart = -1,
    endTagName = null,
    pendingAttribute = null,
    token = scanner.scan()
  while (token !== TokenType.EOS) {
    switch (token) {
      case TokenType.StartTagOpen:
        const child = new Node(scanner.getTokenOffset(), text.length, [], curr)
        curr.children.push(child)
        curr = child
        break
      case TokenType.StartTag:
        curr.tag = scanner.getTokenText()
        break
      case TokenType.StartTagClose:
        if (curr.parent) {
          curr.end = scanner.getTokenEnd() // might be later set to end tag position
          if (scanner.getTokenLength()) {
            curr.startTagEnd = scanner.getTokenEnd()
            if (curr.tag && isVoidElement(curr.tag)) {
              curr.closed = true
              curr = curr.parent
            }
          } else {
            // pseudo close token from an incomplete start tag
            curr = curr.parent
          }
        }
        break
      case TokenType.StartTagSelfClose:
        if (curr.parent) {
          curr.closed = true
          curr.end = scanner.getTokenEnd()
          curr.startTagEnd = scanner.getTokenEnd()
          curr = curr.parent
        }
        break
      case TokenType.EndTagOpen:
        endTagStart = scanner.getTokenOffset()
        endTagName = null
        break
      case TokenType.EndTag:
        endTagName = scanner.getTokenText().toLowerCase()
        break
      case TokenType.EndTagClose:
        if (endTagName) {
          let node = curr
          // see if we can find a matching tag
          while (!node.isSameTag(endTagName) && node.parent) {
            node = node.parent
          }
          if (node.parent) {
            while (curr !== node) {
              curr.end = endTagStart
              curr.closed = false
              curr = curr.parent
            }
            curr.closed = true
            curr.endTagStart = endTagStart
            curr.end = scanner.getTokenEnd()
            curr = curr.parent
          }
        }
        break
      case TokenType.AttributeName: {
        pendingAttribute = scanner.getTokenText()
        let attributes = curr.attributes
        if (!attributes) {
          curr.attributes = attributes = {}
        }
        attributes[pendingAttribute] = null // Support valueless attributes such as 'checked'
        break
      }
      case TokenType.AttributeValue: {
        const value = scanner.getTokenText()
        const attributes = curr.attributes
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
  return {
    roots: htmlDocument.children,
    findNodeBefore: htmlDocument.findNodeBefore.bind(htmlDocument),
    findNodeAt: htmlDocument.findNodeAt.bind(htmlDocument)
  }
}
