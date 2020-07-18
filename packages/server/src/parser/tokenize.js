export default (function () {

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  let HTMLNode,

    /**
   * HTML Token Context Node
   *
   * @type {object}
   */
    ParsedYAMLFrontmatter

  /**
   * HTML Token Context Node
   *
   * @type {object}
   */
  const WithinHTMLString = -1

  /**
   * Liquid Token Context Node

   */
  let LiquidNode

  /**
   * Open HTML Tag - The LEFT side delimeter `<tag `
   *
   * @param {number} offset
   */
  function HTMLTokenOpen (offset) {

    stream.next()

    const name = stream.regex(/^[^\s"'></=]*/)
    const spec = associates.filter(i => i.name === name && i.kind === 'html')

    if (!spec.some(i => i.name === name)) return null

    if (stream.isCodeChar(RAN)) { // ends with RAN `>`

      if (HTMLNode) {
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return HTMLTokenClose(stream.next())
      }

      HTMLNode = Node.create(name, [ offset, stream.getPosition(1) ])
    }

    if (stream.isCodeChar(RAN)) { // Tag has attributes but does not have spaces (`<tag  >`)

      if (HTMLNode && HTMLNode.name === name) { // we are in a close tag, eg: `</tag>`
        HTMLNode.offset.push(offset - 1) // Align LAN `<` as position here is `/`
        return HTMLTokenClose(stream.next())
      } else if (!HTMLNode) {
        HTMLNode = Node(name, TokenKind.html, [ offset, stream.next() ])
      }

    }

    if (!HTMLNode) { // Tag contains a value,(attribute) re-run function
      HTMLNode = Node(name, TokenKind.html, offset)
      return HTMLTokenOpen(stream.prev())
    }

  }

  function HTMLTokenClose (offset) {

    HTMLNode.token.push(stream.getText(HTMLNode.offset[HTMLNode.offset.length - 1], offset))
    HTMLNode.offset.push(offset)

    if (HTMLNode.token.length < 2) {
      const [ token ] = HTMLNode.token
      const type = token.search(/\b(?:type)\b(?![^"'=])/)
      if (type > 0) {
        HTMLNode.attrs = {
          type: null
        }
      }
    }

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
  function LiquidTokenOpen (offset) {

    stream.next()

    if (stream.getCodeChar(3)) {
      LiquidNode.create
      // state.whitespaceDash = true
    }

    const name = stream.regex(/[a-zA-Z0-9_]+(?![^.+'"|=<>\-\s\n}%])/)

    if (!name) return console.log('Parse Error, Tag name is incorrect')

    let EndTag

    if (name.slice(0, 3) === 'end') EndTag = name.substring(3)

    const prop = EndTag || name
    const spec = stream.prevCodeChar(LCB) ? specs.objects[prop] : specs.tags[prop]

    // LiquidNode = new Node(TokenKind.liquid)
    LiquidNode = Node(name, TokenKind.liquid, offset)

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
  function LiquidTokenClose (n) {

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

  }

  /**
   * HTML Comments - Advances stream to end position
   *
   * @param {number} n
   */
  function YAMLFrontmatter (n) {

    // handle errors with YAMLFrontmatter is not initial contents
    if (n > 0 && text.slice(0, n).trim().length > 0) {
      return console.log('Parse Error, content before YAMLFrontmatter')
    }

    const end = stream.forward('---')

    if (!end) return console.log('Parse Error, YAMLFrontmatter is unclosed')

    Frontmatter = { offset: [ n, end ], content: stream.getText(n, end) }
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

    if (end === false) return console.log('Parse Error, YAMLFrontmatter is unclosed')

    document.ast.push({
      name: 'html-comment'
      , offset: [ n, end ]
      , content: stream.getText(n, end)
    })

  }

  return {
    HTMLTokenOpen,
    HTMLTokenClose,
    LiquidTokenOpen,
    LiquidTokenClose,
    YAMLFrontmatter
  }

}())
