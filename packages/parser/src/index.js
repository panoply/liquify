import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import options from 'parser/options'
import context from 'parser/context'
import ast from 'parser/node'

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export class LiquidParser {

  constructor (configuration) {

    this.config = {
      ...options,
      ...configuration
    }

    specs.ref(this.config.engine, this.config.license)

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

    const source = document.textDocument.getText()

    stream.create(source)

    return parse.bind(this.config)(document)

  }

  increment (param, contentChanges) {

    // return increment(param, contentChanges)

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
