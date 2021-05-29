import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import options from 'parser/options'
import context from 'parser/context'
import ast from 'parser/node'
import inRange from 'lodash/inRange'
import * as Codes from 'lexical/characters'

/* EXPOSED EXPORTS ---------------------------- */

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export class LiquidParser {

  /**
   * Creates an instance of LiquidParser.
   *
   * @param {Config.Options} configuration
   * @memberof LiquidParser
   */
  constructor (configuration) {

    this.config = { ...options, ...configuration }
    this.engine(this.config.engine)

    if (this.config.associate_tags.length > 0) {
      specs.associates.setup(this.config.associate_tags)
    }
  }

  /**
   * Specification Engine
   *
   * @param {Specs.Engine} engine
   * @memberof LiquidParser
   */
  engine (engine) {

    specs.ref(engine, this.config.license)

  }

  /**
   * Returns Code Characters
   *
   * @memberof LiquidParser
   */
  get code () {

    return Codes
  }

  /**
   * Returns Specification
   *
   * @memberof LiquidParser
   * @return {Specs.Variation}
   */
  get spec () {

    return specs.variation
  }

  /**
   * Returns the errors list
   *
   * @readonly
   * @memberof LiquidParser
   */
  get errors () { return ast.error.get }

  /**
   * Executes a full document parse
   *
   * @param {Parser.Scope} document
   * @return {Parser.ASTNode[]}
   * @memberof LiquidParser
   */
  parse (document) {

    stream.create(document.textDocument.getText())

    ast.uri = document.textDocument.uri
    ast.version = document.textDocument.version

    while (ast.error.get.length > 0) ast.error.get.pop()
    while (ast.embedded.length > 0) ast.embedded.pop()
    while (document.ast.length > 0) document.ast.pop()

    return parse.bind(this.config)(document)

  }

  increment (text, changes) {

  }

  /**
   * Returns the context list
   *
   * @param {number[]} [offsets]
   * @memberof LiquidParser
   */
  getContext (offsets = undefined) {

    return offsets ? context.get(offsets) : context.list

  }

  /**
   * Get Embedded documents
   *
   * @param {Parser.ASTNode[]} AST
   * @param {Parser.TextDocument.Position|number} position
   * @memberof LiquidParser
   */
  getNode (AST, position) {

    const offset = typeof position === 'object'
      ? stream.OffsetFromPosition(position)
      : position

    const index = AST.findIndex(({
      offsets: [
        TL = -1
        , TR = -1
        , BL = -1
        , BR = -1
      ]
    }) => (
      inRange(offset, TL, TR) ||
      inRange(offset, BL, BR) ||
      inRange(offset, TR, BL)
    ))

    return AST[index]

  }

  getClosestNode () {

  }

  getVariables () {

  }

  getChildren () {

  }

  getLinked () {

  }

  /**
   * Get Embedded documents
   *
   * @param {Parser.ASTNode[]} AST
   * @param {Parser.TextDocument.Position} position
   * @memberof LiquidParser
   */
  getEmbeddedNode (AST, position) {

    const offset = stream.OffsetFromPosition(position)
    const embed = ast.embedded.findIndex(node => (
      inRange(offset, AST[node].offsets[1], AST[node].offsets[2])
    ))

    if (embed > 0) return AST[embed]

    return false

  }

  /**
   * Get Embedded documents
   *
   * @param {Parser.ASTNode[]} AST
   * @param {string[]} [languages]
   * @memberof LiquidParser
   */
  getEmbeds (AST, languages) {

    const embeds = ast.embedded.map(node => AST[node])

    if (languages) {
      return embeds.filter(node => languages.includes(node.language))
    }

    return embeds

  }

  getErrors () {

  }

  /**
   * Test Code Character at TextDocument position
   *
   * @memberof LiquidParser
   */
  withinScope (position, code) {

    const offset = stream.OffsetFromPosition(position)

    return stream.CodeCharAt(code, offset)

  }

  /**
   * Get Embedded documents
   *
   * @param {Parser.ASTNode[]} AST
   * @param {Parser.TextDocument.Position} position
   * @memberof LiquidParser
   */
  withinToken (AST, position) {

    const offset = stream.OffsetFromPosition(position)

    return AST.some(({
      singular,
      offsets: [
        TL = -1
        , TR = -1
        , BL = -1
        , BR = -1
      ]
    }) => {
      if (singular) return inRange(offset, TL, TR)
      else return inRange(offset, TL, TR) || inRange(offset, BL, BR)
    })

  }

  /**
   * Test Code Character at TextDocument position
   *
   * @memberof LiquidParser
   */
  withinNode (position, code) {

    const offset = stream.OffsetFromPosition(position)

    return stream.CodeCharAt(code, offset)

  }

  /**
   * Test Code Character at TextDocument position
   *
   * @memberof LiquidParser
   */
  isCodeChar (position, code) {

    const offset = stream.OffsetFromPosition(position)

    return stream.CodeCharAt(code, offset)

  }

  /**
   * Test Code Character at TextDocument position
   *
   * @memberof LiquidParser
   */
  isRegExp (position, code) {

  }

}
