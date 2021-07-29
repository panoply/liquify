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

export interface Defaults {
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
  elseNewline?: boolean,
  endComma?: 'none' | 'always' | 'never',
  endNewline?: boolean,
  forceAttribute?: boolean,
  forceIndent?: boolean,
  functionNameSpace?: boolean,
  functionSpace?: boolean,
  indentLevel?: number,
  indentChar?: ' ',
  indentSize?: number,
  languageName?: string,
  language?: 'auto' | 'html' | 'css' | 'javascript' | 'typescript' | 'json',
  languageDefault?: string,
  lexer?: 'auto' | 'markup' | 'style' | 'script'
  mode?: 'beautify' | 'diff',
  methodChain?: number,
  neverFlatten?: boolean,
  noCaseIndent?: boolean,
  noLeadZero?: boolean,
  noSemicolon?: boolean,
  objectIndent?: 'default' | 'indent' | 'inline',
  preserveAttributes?: boolean,
  preserveComment?: boolean,
  preserveLine?: number,
  preserveText?: boolean,
  propertySort?: boolean,
  quoteConvert?: 'none' | 'double' | 'single',
  selectorList?: boolean,
  selfCloseSpace?: boolean,
  source?: string,
  tagMerge?: false,
  tagSort?: false,
  ternaryLine?: boolean,
  variableList?: 'none' | 'each' |'list',
  vertical?: boolean,
  wrap?: number

}
