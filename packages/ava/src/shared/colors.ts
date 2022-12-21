import { highlight, HighlightOptions, plain } from 'cli-highlight';
import chalk from 'chalk';

/**
 * The default theme. It is possible to override just individual keys.
 */
export const DEFAULT_THEME = {
  /**
   * keyword in a regular Algol-style language
   */
  keyword: chalk.cyanBright,
  /**
   * built-in or library object (constant, class, function)
   */
  built_in: chalk.cyanBright,

  /**
   * user-defined type in a language with first-class syntactically significant types, like
   * Haskell
   */
  type: chalk.cyan.dim,

  /**
   * special identifier for a built-in value ("true", "false", "null")
   */
  literal: chalk.hex('#ef3b7d'),

  /**
   * number, including units and modifiers, if any.
   */
  number: chalk.green,

  /**
   * literal regular expression
   */
  regexp: chalk.red,

  /**
   * literal string, character
   */
  string: chalk.yellowBright,

  /**
   * parsed section inside a literal string
   */
  subst: chalk.white,

  /**
   * symbolic constant, interned string, goto label
   */
  symbol: chalk.white,

  /**
   * class or class-level declaration (interfaces, traits, modules, etc)
   */
  class: chalk.white,

  /**
   * function or method declaration
   */
  function: chalk.cyanBright,

  /**
   * name of a class or a function at the place of declaration
   */
  title: chalk.white,

  /**
   * block of function arguments (parameters) at the place of declaration
   */
  params: chalk.white,

  /**
   * comment
   */
  comment: chalk.gray,

  /**
   * documentation markup within comments
   */
  doctag: chalk.green,

  /**
   * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
   */
  meta: chalk.white,

  /**
   * keyword or built-in within meta construct
   */
  'meta-keyword': chalk.white,

  /**
   * string within meta construct
   */
  'meta-string': chalk.white,

  /**
   * heading of a section in a config file, heading in text markup
   */
  section: chalk.white,

  /**
   * XML/HTML tag
   */
  tag: chalk.hex('#BECAFF'),

  /**
   * name of an XML tag, the first word in an s-expression
   */
  name: (code) => {

    if (/(end)?comment/.test(code)) {
      return chalk.gray(code);
    }

    return chalk.hex('#FF93BC')(code);
  },

  /**
   * s-expression name from the language standard library
   */
  'builtin-name': chalk.white,

  /**
   * name of an attribute with no language defined semantics (keys in JSON, setting names in
   * .ini), also sub-attribute within another highlighted object, like XML tag
   */
  attr: chalk.hex('#91EBC2'),

  /**
   * name of an attribute followed by a structured value part, like CSS properties
   */
  attribute: chalk.white,

  /**
   * variable in a config or a template file, environment var expansion in a script
   */
  variable: chalk.white,

  /**
   * list item bullet in text markup
   */
  bullet: chalk.white,

  /**
   * code block in text markup
   */
  code: chalk.white,

  /**
   * emphasis in text markup
   */
  emphasis: chalk.italic,

  /**
   * strong emphasis in text markup
   */
  strong: chalk.bold,

  /**
   * mathematical formula in text markup
   */
  formula: chalk.white,

  /**
   * hyperlink in text markup
   */
  link: chalk.underline,

  /**
   * quotation in text markup
   */
  quote: chalk.white,

  /**
   * tag selector in CSS
   */
  'selector-tag': chalk.white,

  /**
   * #id selector in CSS
   */
  'selector-id': chalk.white,

  /**
   * .class selector in CSS
   */
  'selector-class': chalk.white,

  /**
   * [attr] selector in CSS
   */
  'selector-attr': chalk.white,

  /**
   * :pseudo selector in CSS
   */
  'selector-pseudo': chalk.white,

  /**
   * tag of a template language
   */
  'template-tag': chalk.white,

  /**
   * variable in a template language
   */
  'template-variable': chalk.white,

  /**
   * added or changed line in a diff
   */
  addition: chalk.green,

  /**
   * deleted line in a diff
   */
  deletion: chalk.red,

  /**
   * things not matched by any token
   */
  default: plain
};

function esc (token: string) {

  // eslint-disable-next-line no-control-regex
  return token.replace(/(\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~]/g, '');

}

function delimiters (token: string) {

  return chalk.gray(esc(token));

}

function strings (token: string) {

  if (/{[{%]-?|-?[%}]}/.test(token)) return token;

  return chalk.yellowBright(esc(token));

}

function tags (token: string) {

  return esc(token)
    .replace(/-?\s*[a-zA-Z._]+/g, keyword)
    .replace(/[|,.:]/g, v => chalk.hex('#e75378')(esc(v)))
    .replace(/(?:=|[!=]=|[<>]=?|(?:and|or|contains|with|in|null)\b)/g, operators)
    .replace(/["'][\s\S]*?["']/g, strings);

}

function properties (token: string) {

  if (/\./.test(token)) return token.replace(/[a-zA-Z_.]*\.?/g, v => chalk.white(v));

  if (/break|continue|else/.test(token)) return chalk.hex('#ef3b7d')(token);

  return chalk.white(token);

}

function objects (token: string) {

  return esc(token)
    .replace(/[a-zA-Z_]+\b[:]?/g, filters)
    .replace(/[|,.:]/g, v => chalk.hex('#e75378')(esc(v)))
    .replace(/["'][\s\S]*?["']/g, strings);

}

function operators (token: string) {

  if (/null|false|nil|true/.test(token)) return chalk.hex('#FF91E3')(token);

  return chalk.hex('#cb3f6e')(esc(token));

}

function filters (token: string) {

  if (/:$/.test(token)) return chalk.hex('#7ef0ff')(token);
  if (/\./.test(token)) return properties(token);

  return chalk.white(token);
}

function keyword (token: string) {

  if (/comment|endcomment/.test(token)) return chalk.gray(esc(token));

  return chalk.hex('#ef3b7d')(token);

}

export function colors (content: string, options: HighlightOptions = {}) {

  Object.assign<HighlightOptions, HighlightOptions>(options, {
    theme: DEFAULT_THEME,
    language: 'html'
  });

  const syntax = highlight(content, options);

  if (options.language !== 'html') return syntax;

  return syntax
    .replace(/(?<={%-?)[\s\S]*?(?=-?%})/g, tags)
    .replace(/(?<={{)[\s\S]*?(?=}})/g, objects)
    .replace(/{{-|{%-|{{|{%|}}|%}|-}}|-%}/g, delimiters);

}
