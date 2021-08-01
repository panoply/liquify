import { MarkupEnforced, IMarkupOptions } from './types/markup';
import { StyleEnforced, IStyleOptions } from './types/style';
import { JSONEnforced, IJSONOptions } from './types/json';
import { ScriptEnforced, IScriptOptions } from './types/script';
import { PrettyDiffOptions } from './types/prettydiff';
import { prettydiff } from './prettydiff';

/**
 * Creates a language specific instance
 */
function createInstance (options: PrettyDiffOptions) {

  return Object.assign({}, prettydiff.options, options);
}

/**
 * Markup PrettyDiff Instance
 */
export const markup: PrettyDiffOptions = createInstance(
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
    endNewline: true,
    preserveAttributes: false,
    preserveComment: false,
    preserveLine: 3,
    preserveText: true,
    quoteConvert: 'double',
    selfCloseSpace: false,
    tagMerge: false,
    tagSort: false,
    wrap: 0
  } as MarkupEnforced & IMarkupOptions
);

/**
 * Style PrettyDiff Instance
 */
export const style: PrettyDiffOptions = createInstance(
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
    endNewline: true,
    noLeadZero: false,
    objectSort: false,
    preserveLine: 3,
    quoteConvert: 'none',
    wrap: 0
  } as StyleEnforced & IStyleOptions
);

/**
 * JSON PrettyDiff Instance
 */
export const json: PrettyDiffOptions = createInstance(
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
    endNewline: true,
    noSemicolon: true,
    objectIndent: 'default',
    objectSort: false,
    preserveLine: 2,
    quoteConvert: 'double',
    wrap: 0
  } as JSONEnforced & IJSONOptions
);

/**
 * JSON PrettyDiff Instance
 */
export const script: PrettyDiffOptions = createInstance(
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
    language: 'javascript',
    language_default: 'javascript',
    language_name: 'JavaScript/Liquid',
    lexer: 'script',
    mode: 'beautify',
    braceNewline: false,
    caseSpace: false,
    commentIndent: false,
    commentNewline: false,
    elseNewline: true,
    endNewline: true,
    functionNameSpace: true,
    functionSpace: false,
    methodChain: 0,
    neverFlatten: false,
    noCaseIndent: false,
    noSemicolon: false,
    objectIndent: 'default',
    objectSort: false,
    preserveComment: true,
    preserveLine: 3,
    preserveText: true,
    quoteConvert: 'none',
    semicolon: false,
    ternaryLine: false,
    variableList: 'none',
    vertical: false,
    wrap: 0
  } as ScriptEnforced & IScriptOptions
);
