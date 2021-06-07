import { TextDocument } from 'vscode-languageserver-textdocument'
import { NodeKind } from 'lexical/kind'
import { NodeType } from 'lexical/types'
import { NodeLanguage } from 'lexical/language'
import Scanner from 'parser/scanner'
import yamljs from 'yamljs'
import Context from 'parser/context'

/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 * @type {Parser.INode}
 */
export default document => class INode {

  name = null
  root = null
  parent = null
  index = document.nodes.length
  type = NodeType.unknown
  singular = true
  range = { start: Scanner.range.start }
  offsets = [ Scanner.start ]
  kind = NodeKind.Liquid
  language = NodeLanguage.liquid
  token = []
  context = []
  error = document.errors.length
  children = []
  objects = {}
  attributes = {}
  filters = {}

  get start () {

    return this.offsets[0]
  }

  get end () {

    return this.offsets[this.offsets.length - 1]
  }

  get content () {

    if (this.kind === NodeKind.Frontmatter) {
      return yamljs.parse(Scanner.GetText(this.offsets[1], this.offsets[2]))
    }

    return document.getText(
      document.toRange(
        this.offsets[1],
        this.offsets[2]
      )
    )

  }

  getContext () {

    return Context.get(this.context)
  }

  document () {

    if (this.language === 'liquid') return null
    if (this.content.length === 0) return null

    return TextDocument.create(
      document.textDocument.uri.replace('.liquid', `.${this.language}`),
      this.language,
      document.textDocument.version,
      this.content
    )

  }

}
