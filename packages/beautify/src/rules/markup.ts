import { IHTMLRules } from '../types/prettydiff'
import  PrettyDiff  from '../vendors/prettydiff'


export const prettydiff: IHTMLRules = {

  ...PrettyDiff.options,

  /* -------------------------------------------- */
  /* ENFORCED                                     */
  /* -------------------------------------------- */

  mode: 'beautify',
  end_quietly: 'quiet',
  node_error: true,
  language_name: 'HTML/Liquid',
  language: 'html',
  language_default: 'html',
  lexer: 'markup',
  jsscope: 'none',

  /* -------------------------------------------- */
  /* OPTIONS                                      */
  /* -------------------------------------------- */

  new_line: true,
  space_close: false,
  indent_size: 2,
  indent_level: 0,
  preserve: 2,
  preserve_comment: true,
  comment_line: true,
  comments: true,
  preserve_text: true,
  correct: false,
  attribute_sort: false,
  attribute_sort_list: '',
  force_attribute: false,
  force_indent: false,
  quote_convert: 'none',
  tag_merge: false,
  tag_sort: false,
  unformatted: false,
  indent_char: ' ',
  wrap: 0

}
