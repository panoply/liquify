import { Sparser, Language, OptionDef, Parsed } from './sparser';

export interface MappedRules {
  arrayFormat: 'format_array',
  attemptCorrection: 'correct',
  attributeSort: 'attribute_sort',
  attributeSortList: 'attribute_sort_list',
  braceAllman: 'braces',
  braceNewline: 'brace_line',
  bracePadding: 'brace_padding',
  braceStyle: 'brace_style',
  caseSpace: 'case_space',
  classPadding: 'css_insert_lines',
  commentIndent: 'comments',
  commentNewline: 'comment_line',
  elseNewline: 'else_line',
  endComma: 'end_comma',
  endNewline: 'new_line',
  forceAttribute: 'force_attribute',
  forceIndent: 'force_indent',
  functionNameSpace: 'function_name',
  functionSpace: 'space',
  indentLevel: 'indent_level',
  indentSize: 'indent_size',
  methodChain: 'method_chain',
  neverFlatten: 'never_flatten',
  noCaseIndent: 'no_case_indent',
  noLeadZero: 'no_lead_zero',
  noSemicolon: 'no_semicolon',
  objectIndent: 'format_object',
  preserveAttributes: 'unformatted',
  preserveComment: 'preserve_comment',
  preserveLine: 'preserve',
  preserveLines : 'preserve',
  preserveText: 'preserve_text',
  propertySort: 'object_sort',
  quoteConvert: 'none',
  selectorList: 'selector_list',
  selfCloseSpace: 'space_close',
  ternaryLine: 'ternary_line',
  variableList: 'variable_list',
  vertical: 'vertical',
  wrap: 'wrap'
}

interface Scopes extends Array<[string, number]>{
    [index:number]: [string, number];
}

export interface Meta {
  error: string,
  lang: string[],
  time: string,
  insize: number,
  outsize: number
  difftotal: number,
  difflines: number
}

export interface PDLanguage {
    auto(sample:string, defaultLang:string): string[];
    nameproper(input:string): string;
    setlexer(input:string):string;
}

export interface PrettyDiffOptions {
  arrayFormat?: 'default' | 'indent' | 'inline',
  attemptCorrection?: boolean,
  attributeSort?: boolean,
  attributeSortList?: string[],
  braceAllman?: boolean,
  braceNewline?:boolean,
  bracePadding?: boolean,
  braceStyle?: 'none' | 'collapse' | 'collapse-preserve-inline' | 'expand',
  caseSpace?: boolean,
  classPadding?: boolean,
  commentIndent?: boolean,
  commentNewline?: boolean,
  compressCSS?: boolean,
  diff?: string,
  elseNewline?: boolean,
  endComma?: 'none' | 'always' | 'never',
  endNewline?: boolean,
  forceAttribute?: boolean,
  forceIndent?: boolean,
  functionNameSpace?: boolean,
  functionSpace?: boolean,
  indentLevel?: number,
  crlf?: boolean,
  indentChar?: ' ' | '\u0009',
  indentSize?: number,
  languageName?: string,
  language?: 'auto' | 'html' | 'css' | 'javascript' | 'typescript' | 'json' | 'text' | 'jsx',
  languageDefault?: string,
  lexer?: 'auto' | 'markup' | 'style' | 'script' | 'text',
  lexerOptions?: {
    markup?: object,
    script?: object,
    style?: object
  },
  mode?: 'beautify' | 'diff' | 'parse'
  methodChain?: number,
  neverFlatten?: boolean,
  noCaseIndent?: boolean,
  noLeadZero?: boolean,
  noSemicolon?: boolean,
  objectIndent?: 'default' | 'indent' | 'inline',
  preserveAttribute?: boolean,
  preserveComment?: boolean,
  preserveLine?: number,
  preserveText?: boolean,
  propertySort?: boolean,
  quoteConvert?: 'none' | 'double' | 'single',
  selectorList?: boolean,
  selfCloseSpace?: boolean,
  styleguide?:
  | 'none'
  | 'airbnb'
  | 'crockford'
  | 'google'
  | 'jquery'
  | 'jslint'
  | 'mediawiki'
  | 'mrdoob'
  | 'none'
  | 'semistandard'
  | 'standard'
  | 'yandex'
  source?: string,
  tagMerge?: false,
  tagSort?: false,
  ternaryLine?: boolean,
  variableList?: 'none' | 'each' |'list',
  vertical?: boolean,
  wrap?: number,
  parsed?: Parsed

}

export interface PrettyDiff {
  (meta?: Meta): string;
  api: {
    language?: Language,
    optionDef?: OptionDef
  }
  beautify: {
    style?(options: PrettyDiffOptions): string,
    markup?(options: PrettyDiffOptions): string,
    script?(options: PrettyDiffOptions): string,
  },
  sparser?: Sparser,
  start: number,
  end: number,
  scopes: Scopes,
  iterator: number,
  meta: {
    error: string,
    lang: string[],
    time: string,
    insize: number,
    outsize: number
    difftotal: number,
    difflines: number
  },
  options: PrettyDiffOptions
  parsed: PrettyDiffOptions
}
