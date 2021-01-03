import stream from './parser/stream'
import specs from './parser/specs'
import increment from './parser/increment'
import { parse } from './parser/parse'
import options from './parser/options'

export class LiquidParser {

  constructor (configuration) {

    this.config = { ...options, ...configuration }

  }

  spec (ref) {

    specs.ref(ref[this.config.engine])

  }

  parse (document) {

    stream.source = document.textDocument.getText()

    return parse.bind(this.config)(document)

  }

  increment (param, contentChanges) {

    return increment(param, contentChanges)

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
