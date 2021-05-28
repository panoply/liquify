import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import options from 'parser/options'
import context from 'parser/context'
import ast from 'parser/node'
import * as Codes from 'lexical/characters'

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export class LiquidParser {

  constructor (configuration) {

    this.documents = new Map()
    this.parser = { ...options, ...configuration }

  }

  engine (engine) {

    specs.ref(engine, this.parser.license)

  }

  get code () { return Codes }

  /**
   * Returns the context list
   *
   * @readonly
   * @memberof LiquidParser
   */
  get context () { return context.list }

  /**
   * Returns the errors list
   *
   * @readonly
   * @memberof LiquidParser
   */
  get errors () { return ast.error.get }

  /**
   * Returns the Specification variation
   *
   * @readonly
   * @memberof LiquidParser
   */
  get spec () { return specs.variation }

  /**
   * Executes a full document parse
   *
   * @param {Parser.Scope} document
   * @return {Parser.ASTNode[]}
   * @memberof LiquidParser
   */
  parse (document) {

    ast.version = document.textDocument.version
    ast.uri = document.textDocument.uri

    while (ast.error.get.length > 0) ast.error.get.pop()
    while (ast.embedded.get.length > 0) ast.embedded.get.pop()
    while (document.ast.length > 0) document.ast.pop()

    const source = document.textDocument.getText()

    stream.create(source)

    return parse.bind(this.parser)(document)

  }

  increment () {

  }

  getChildren () {

  }

  getLinked () {

  }

  getEmbeds (document) {

    return ast.embedded.get.map(node => document.ast[node])

  }

  getErrors () {

  }

}
