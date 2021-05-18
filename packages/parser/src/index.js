import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import options from 'parser/options'
import { NodeAST } from 'parser/node'

export class LiquidParser {

  constructor (configuration) {

    this.config = { ...options, ...configuration }

    specs.ref(this.config.engine, this.config.license)

  }

  get context () { return NodeAST.context.entries() }

  get errors () { return Array.from(NodeAST.errors.values()).flat(1) }

  get spec () { return specs.variation }

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
