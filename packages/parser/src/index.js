import stream from './parser/stream'
import specs from './parser/specs'
import { parse } from './parser/parse'
import options from './parser/options'
import Node from './parser/node'

export class LiquidParser {

  constructor (configuration) {

    this.config = { ...options, ...configuration }

  }

  get errors () {

    return Node.errors

  }

  spec (ref) {

    specs.ref(ref[this.config.engine])

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
