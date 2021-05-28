import { TextDocument } from 'vscode-languageserver-textdocument'
import { TokenKind } from 'enums/kinds'
import { ParseError } from 'enums/errors'
import scanner from 'parser/scanner'
import context from 'parser/context'
import Errors from 'parser/errors'
import yamljs from 'yamljs'

/**
 * AST Node
 *
 * Creates token nodes on the AST

 */
export default (function ASTNodes () {

  /**
   * Errors
   *
   * Tracks each node and their placements
   *
   * @static
   * @type {Array}
   */
  const embedded = []

  /**
   * AST Node Hierarch
   *
   * Tracks nodes which require start and end
   * tags so we can correctly populate the AST.
   *
   * @typedef {Array<string|number>} Hierarch
   * @type {Hierarch}
   */
  const hierarch = []

  /**
   * Errors
   *
   * Tracks each node and their placements
   *
   * @static
   * @type {object[]}
   */
  const errors = []

  /**
   * Node index
   *
   * Tracks each node and their placements
   *
   * @type {number}
   */
  let node = 0

  /**
   * AST Node
   *
   * Creates token nodes on the AST
   *
   * @type {Parser.ASTNode}
   */
  class INode {

    /* -------------------------------------------- */
    /* STATIC                                       */
    /* -------------------------------------------- */

    /**
     * Size
     *
     * AST Node size
     *
     * @static
     * @memberof Node
     * @type {number}
     */
    static size = 0

    /**
     * Version Number
     *
     * @static
     * @memberof Node
     * @type {number}
     */
    static version = 1

    /**
     * URI Identifier
     *
     *
     * @static
     * @memberof Node
     * @type {string}
     */
    static uri = ''

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
     * @type {Parser.TagTypes}
     */
    type = undefined

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
     * Get Children
     *
     * Returns the tokens children decedent nodes
     *
     * @type {object[]}
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
     * The Token errors
     *
     * @readonly
     * @type {object[]}
     * @memberof Node
     */
    get errors () { return errors } // NEED TO FIX !!!

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

      return TextDocument.create(
        INode.uri.replace('.liquid', `.${this.language}`),
        this.language,
        INode.version,
        this.content
      )

    }

    getContext () {

      return context.get(this.context)

    }

    /**
     * The Token errors
     *
     * @param {number} index
     */
    offset (index) {

      this.offsets.push(index)

    }

  }

  let pair

  return {

    INode,

    get embedded () {

      return {

        /**
         * Returns Embedded node locations
         *
         * @readonly
         */
        get get () { return embedded }

      }

    },

    get node () { return node },
    set node (index) { node = index },

    get error () {

      return {

        get get () { return errors },

        remove: (index) => {

          errors.splice(pair, 1)

        },

        hierarch: (node) => {

          const diagnostic = Errors(ParseError.MissingEndTag, {
            range: node.range,
            node: node.node,
            offset: node.offset,
            token: node.token[0]
          })

          errors.push(diagnostic)

        },

        /**
         * Set Errors
         *
         * @param {number} error
         * @memberof Node
         */
        add: (error, token) => {

          if (error) {

            const diagnostic = Errors(error, {
              range: scanner.range,
              node,
              offset: scanner.offset,
              token: token || scanner.token
            })

            errors.push(diagnostic)

          }

        }

      }

    },

    /**
     * Hierarchical tracking for tag pairs or
     * syntactic types. We assert this as a
     * getter, no need to expose it.
     *
     * @readonly
     */
    get hierarch () {

      return {

        /**
         * Returns the hierarchal state array
         *
         * @readonly
         * @returns {Hierarch}
         */
        get get () { return hierarch },

        /**
         * Returns the hierarchal pair by choosing
         * the closest token (bottom-up) which exists
         * in the tree
         *
         * @readonly
         * @returns {number}
         */
        get pair () {

          const state = hierarch.lastIndexOf(scanner.token)
          const index = hierarch[state + 1]
          hierarch.splice(state, 2)

          return typeof index === 'number' ? index : -1

        }

      }

    }

  }
}())
