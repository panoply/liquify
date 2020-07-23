import stream from './parsing/stream'
import increment from './parsing/increment'
import { parse } from './parsing/parse'
import options from './parsing/options'

export class LiquidParser {

  constructor (parser, configuration) {

    this.parser = parser
    this.options = { ...options, ...configuration }

  }

  parse (document, spec) {

    stream.source = document.textDocument.getText()

    return parse(document, spec)

  }

  increment (param, contentChanges) {

    return increment(param, contentChanges)

  }

  getNode () {

  }

  getSpec () {

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
