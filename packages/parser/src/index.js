import stream from './parser/stream'
import specs from './parser/specs'
import increment from './parser/increment'
import { parse } from './parser/parse'
import options from './parser/options'

export class LiquidParser {

  constructor (parser, configuration) {

    this.parser = parser
    this.options = { ...options, ...configuration }

  }

  parse (document, specification) {

    stream.source = document.textDocument.getText()
    specs.spec = specification

    return parse.bind(this.options)(document)

  }

  increment (param, contentChanges) {

    return increment(param, contentChanges)

  }

  getNode () {

  }

  getSpec () {

    return specs.spec

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
