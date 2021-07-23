import  PrettyDiff  from './vendors/prettydiff'
import { IHTMLRules, JSONRules } from './types/prettydiff'
import * as Markup from './rules/markup'

export type Rules = IHTMLRules | JSONRules

export interface Beautify {
  source: string;
  errors: string | null;
}


export function prettydiff(source: string, rules: Rules): Beautify {

  PrettyDiff.options = Object.assign(Markup.prettydiff, rules)
  PrettyDiff.options.source = source

  const format: Beautify = { source: PrettyDiff(), errors: null }

  if (PrettyDiff.sparser.parseerror.length > 0) {
    format.errors = PrettyDiff.sparser.parseerror
    return format
  }

  return format

}
