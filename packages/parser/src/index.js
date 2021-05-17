import stream from './parser/stream'
import specs from './parser/specs'
import { parse } from './parser/parse'
import options from './parser/options'
import Node from './parser/node'

export class LiquidParser {

  constructor (configuration) {

    this.config = { ...options, ...configuration }

    specs.ref(this.config.engine, this.config.license)

  }

  get errors () {

    return Node.errors

  }

  get spec () {

    return specs.variation

  }

  parse (document) {

    stream.source = document.textDocument.getText()

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
