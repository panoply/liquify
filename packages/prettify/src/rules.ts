import { MarkupEnforced, IMarkupOptions } from "./types/markup";
import { StyleEnforced, IStyleOptions } from "./types/style";
import { JSONEnforced, IJSONOptions } from "./types/json";
import { Defaults } from "./types/prettydiff";
import { prettydiff } from './prettydiff'

/**
 * Creates a language specific instance
 */
function createInstance(options: Defaults) {

  return Object.assign({}, prettydiff.options, options)
}

/**
 * Markup PrettyDiff Instance
 */
export const markup: Defaults = createInstance(
  {
    indentSize: 2,
    attemptCorrection: false,
    attributeSort: false,
    attributeSortList: [],
    commentIndent: false,
    commentNewline: false,
    forceAttribute: false,
    forceIndent: false,
    indentChar: ' ',
    indentLevel: 0,
    language: 'html',
    languageDefault: 'html',
    languageName: 'HTML/Liquid',
    lexer: 'markup',
    mode: 'beautify',
    newlineEnd: true,
    preserveAttributes: false,
    preserveComment: false,
    preserveLines: 3,
    preserveText: true,
    quoteConvert: 'double',
    selfCloseSpace: false,
    tagMerge: false,
    tagSort: false,
    wrap: 0
  } as MarkupEnforced & IMarkupOptions
)

/**
 * Style PrettyDiff Instance
 */
export const style: Defaults = createInstance(
  {
    braceAllman: false,
    classPadding: false,
    compressedCSS: false,
    indentChar: ' ',
    indentLevel: 0,
    indentSize: 2,
    language: 'css',
    language_default: 'css',
    language_name: 'CSS/Liquid',
    lexer: 'style',
    mode: 'beautify',
    newlineEnd: true,
    noLeadZero: false,
    objectSort: false,
    preserveLines: 3,
    quoteConvert: 'none',
    wrap: 0
  } as StyleEnforced & IStyleOptions
)

/**
 * JSON PrettyDiff Instance
 */
export const json: Defaults = createInstance(
  {
    arrayFormat: 'default',
    attemptCorrection: false,
    braceAllman: false,
    bracePadding: false,
    braceStyle: 'none',
    endComma: 'never',
    indentChar: ' ',
    indentLevel: 0,
    indentSize: 2,
    language: 'json',
    language_default: 'json',
    language_name: 'JSON',
    lexer: 'script',
    mode: 'beautify',
    newlineEnd: true,
    noSemicolon: true,
    objectIndent: 'default',
    objectSort: false,
    preserveLines: 2,
    quoteConvert: 'double',
    wrap: 0
  } as JSONEnforced & IJSONOptions
)
