import { IPrettify, IGlobalOptions } from "./options";
import * as rules from './rules'
import { prettydiff } from "./prettydiff/index";

export class Prettify implements IPrettify {


  constructor(options: IGlobalOptions) { this.rules(options) }

  rules(options: IGlobalOptions) {

    const { assign } = Object

    assign(rules.markup, options.markup)
    assign(rules.style, options.style)
    assign(rules.json, options.json)

  }


  markup(input: string) {

    if (prettydiff.options.language !== 'html') prettydiff.options = rules.markup

    return new Promise((resolve, reject) => {

      prettydiff.options.source = input
      const beautified = prettydiff()
      Object.assign(rules.markup, prettydiff.options)

      return prettydiff.sparser.parseError
        ? reject({ input, error: prettydiff.sparser.parseError })
        : resolve(beautified)

    }) as Promise<string>

  }

  style(input: string) {

    if (prettydiff.options.language !== 'css')  prettydiff.options = rules.style

    return new Promise((resolve, reject) => {

      prettydiff.options.source = input

      const beautified = prettydiff()
      Object.assign(rules.style, prettydiff.options)

      return prettydiff.sparser.parseError
        ? reject({ input, error: prettydiff.sparser.parseError })
        : resolve(beautified)

    }) as Promise<string>

  }

  json(input: string) {

    if (prettydiff.options.language !== 'json') prettydiff.options = rules.json

    return new Promise((resolve, reject) => {

      prettydiff.options.source = input

      const beautified = prettydiff()
      Object.assign(rules.json, prettydiff.options)

      return prettydiff.sparser.parseError
        ? reject({ input, error: prettydiff.sparser.parseError })
        : resolve(beautified)

    }) as Promise<string>


  }

}
