import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import options from 'parser/options'
import context from 'parser/context'
import ast from 'parser/node'
import inRange from 'lodash/inRange'

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export class LiquidParser {

  constructor (configuration) {

    this.parser = {
      ...options,
      ...configuration
    }

  }

  engine (engine) {

    specs.ref(engine, this.parser.license)

  }

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
   * @param {object} document
   * @return {Parser.ASTNode[]}
   * @memberof LiquidParser
   */
  parse (document) {

    while (ast.error.get.length > 0) ast.error.get.pop()
    while (document.ast.length > 0) document.ast.pop()

    const source = document.textDocument.getText()

    stream.create(source)

    return parse.bind(this.parser)(document)

  }

  getNode () {

  }

  getChildren () {

  }

  getLinked () {

  }

  getEmbeds () {

  }

  getErrors () {

  }

}
