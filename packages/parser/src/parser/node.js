import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenKind } from 'enums/kinds'
import { TokenTags } from 'enums/tags'
import iDocument from 'parser/documents'
import scanner from 'parser/scanner'
import Errors from 'parser/errors'
import yamljs from 'yamljs'

/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 */
export default (function ASTNodes () {

  /**
   * Node index
   *
   * @type {Parser.IAST}
   */
  let document

  /**
   * Node index
   *
   * @type {number}
   */
  let node = 0

  /**
   * AST Node Hierarch
   *
   * @typedef {Array<string|number>} Hierarch
   * @type {Hierarch}
   */
  const hierarch = []

  /**
   * Maintains document instance for each page update
   */
  iDocument.event.on('update', iAST => {

    document = iAST

  })

  /**
   *
   * @param {Parser.ParseError} error
   * @param {string} [token]
   */
  function Error (error, token = undefined) {

    const diagnostic = Errors(error, {
      node,
      range: scanner.range,
      offset: scanner.offset,
      token: token || scanner.token
    })

    document.errors.push(diagnostic)

  }

  /**
   * AST Node
   *
   * Creates token nodes on the AST
   *
   * @type {Parser.ASTNode}
   */
  class Node {

    /* -------------------------------------------- */
    /* CONSTRUCTORS                                 */
    /* -------------------------------------------- */

    /**
     * Tag Name
     *
     * @type {string}
     */
    name = null

    /**
     * Tag Type
     *
     * The tag type reference
     *
     * @type {Parser.TokenTags}
     */
    type = TokenTags.unknown

    /**
     * Node Number
     *
     * The number position identifier that
     * this node exist within the AST.
     *
     * @type {number}
     */
    index = node

    /**
     * Range
     *
     * Start and End range line/column positions
     *
     * @type {Parser.Range}
     */
    range = { start: scanner.range.start }

    /**
     * Offsets List
     *
     * Returns position offsets of tokens
     *
     * @type {number[]}
     */
    offsets = [ scanner.start ]

    /**
     * Tag Kind
     *
     * @type{number}
     */
    kind = TokenKind.Liquid

    /**
     * Language ID
     *
     * @type {string}
     */
    language = 'liquid'

    /**
     * String Literal tokens
     *
     * @type{string[]}
     */
    token = []

    /**
     * String Literal tokens
     *
     * @type{number[]}
     */
    context = []

    /**
     * String Literal tokens
     *
     * @type{number}
     */
    errors = document.errors.length

    /**
     * Get Children
     *
     * Returns the tokens children decedent nodes
     *
     * @type {number[]}
     */
    children = []

    /**
     * Objects
     *
     * Returns the objects located on the token
     *
     * @type {object}
     */
    objects = {}

    /**
     * Attributes
     *
     * Returns Attributes on HTML tags
     *
     * @type {object}
     */
    attributes = {}

    /**
     * Filters
     *
     * Returns the Filters (if any) located on the token
     *
     * @type{object}
     */
    filters = {}

    /**
     * Whether the token is singular or not
     *
     * @readonly
     * @memberof Node
     */
    singular = true

    /**
     * The Starting offset
     *
     * @readonly
     * @memberof Node
     */
    get start () { return this.offsets[0] }

    /**
     * The Ending offset
     *
     * @readonly
     * @memberof Node
     */
    get end () { return this.offsets[this.offsets.length - 1] }

    /**
     * Get Contents
     *
     * @readonly
     * @memberof Node
     * @returns {string}
     */
    get content () {

      if (this.kind === TokenKind.Yaml) {
        return yamljs.parse(scanner.GetText(this.offsets[1], this.offsets[2]))
      }

      return scanner.getText(this.offsets[1], this.offsets[2])

    }

    /**
     * Text Document
     *
     * @readonly
     * @memberof Node
     * @returns {TextDocument}
     */
    get document () {

      if (this.language === 'liquid') return document.textDocument

      return TextDocument.create(
        document.textDocument.uri.replace('.liquid', `.${this.language}`),
        this.language,
        document.textDocument.version,
        this.content
      )

    }

  }

  return {
    get node () { return node },
    set node (index) { node = index },

    Node,
    Error,
    Pairs: {

      /**
       * Returns the hierarchal state array
       *
       * @readonly
       * @returns {Hierarch}
       */
      get list () { return hierarch },

      /**
       * Returns the hierarchal pair by choosing
       * the closest token (bottom-up) which exists
       * in the tree
       *
       * @readonly
       * @returns {number}
       */
      get match () {

        const state = hierarch.lastIndexOf(scanner.token)
        const index = hierarch[state + 1]

        hierarch.splice(state, 2)

        return typeof index === 'number' ? index : -1

      }

    }

  }

}())
