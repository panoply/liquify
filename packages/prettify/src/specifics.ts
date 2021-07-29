import { IMarkupOptions, IStyleOptions, IJSONOptions } from "./options";
import * as rules from './rules'
import { prettydiff } from "./prettydiff/index";


export function markup(input: string, options?: IMarkupOptions): Promise<string> {

  if (options) Object.assign(rules.style, options)
  if (prettydiff.options.language !== 'html') prettydiff.options = rules.markup


  return new Promise((resolve, reject) => {

    prettydiff.options.source = input
    const beautified = prettydiff()

    Object.assign(rules.markup, prettydiff.options)

    return prettydiff.sparser.parseError
      ? resolve(beautified)
      : reject({ input, error: prettydiff.sparser.parseError })

  }) as Promise<string>


}

export function style(input: string, options?: IStyleOptions): Promise<string> {

  if (options) Object.assign(rules.style, options)
  if (prettydiff.options.language !== 'css')  prettydiff.options = rules.style


  return new Promise((resolve, reject) => {

    prettydiff.options.source = input

    const beautified = prettydiff()

    Object.assign(rules.style, prettydiff.options)

    return prettydiff.sparser.parseError
      ? resolve(beautified)
      : reject({ input, error: prettydiff.sparser.parseError })

  }) as Promise<string>


}



export function json(input: string, options?: IJSONOptions): Promise<string> {

  if (options) Object.assign(rules.json, options)
  if (prettydiff.options.language !== 'json') prettydiff.options = rules.json

  return new Promise((resolve, reject) => {

    prettydiff.options.source = input

    const beautified = prettydiff()

    Object.assign(rules.json, prettydiff.options)

    return prettydiff.sparser.parseError
      ? resolve(beautified)
      : reject({ input, error: prettydiff.sparser.parseError })

  }) as Promise<string>


}
