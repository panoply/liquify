import chalk from 'chalk';

export const POTION_THEME = {
  /**
   * keyword in a regular Algol-style language
   */
  keyword: chalk.hex('#cb3f6e'),
  /**
   * built-in or library object (constant, class, function)
   */
  built_in: chalk.hex('#81D4FA'),

  /**
   * user-defined type in a language with first-class syntactically significant types, like
   * Haskell
   */
  // type: chalk.cyan.dim,

  /**
   * special identifier for a built-in value ("true", "false", "null")
   */
  literal: chalk.hex('#F48FB1'),

  /**
   * number, including units and modifiers, if any.
   */
  number: chalk.hex('#F48FB1'),

  /**
   * literal regular expression
   */
  // regexp: chalk.red,

  /**
   * literal string, character
   */
  string: chalk.hex('#FFF78C'),

  /**
   * parsed section inside a literal string
   */
  // subst: chalk.white,

  /**
   * symbolic constant, interned string, goto label
   */
  // symbol: chalk.white,

  /**
   * class or class-level declaration (interfaces, traits, modules, etc)
   */
  // class: chalk.white,

  /**
   * function or method declaration
   */
  function: chalk.hex('#81D4FA'),

  /**
   * name of a class or a function at the place of declaration
   */
  title: chalk.whiteBright,

  /**
   * block of function arguments (parameters) at the place of declaration
   */
  params: chalk.hex('#FFAB40'),

  /**
   * comment
   */
  comment: chalk.hex('#888888'),

  /**
   * documentation markup within comments
   */
  // doctag: chalk.green,

  /**
   * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
   */
  meta: chalk.whiteBright,

  /**
   * keyword or built-in within meta construct
   */
  'meta-keyword': chalk.whiteBright,

  /**
   * string within meta construct
   */
  'meta-string': chalk.whiteBright,

  /**
   * heading of a section in a config file, heading in text markup
   */
  section: chalk.whiteBright,

  /**
   * XML/HTML tag
   */
  tag: chalk.hex('#BECAFF'),

  /**
   * name of an XML tag, the first word in an s-expression
   */
  name: chalk.hex('#FF93BC'),

  /**
   * s-expression name from the language standard library
   */
  'builtin-name': chalk.whiteBright,

  /**
   * name of an attribute with no language defined semantics (keys in JSON, setting names in
   * .ini), also sub-attribute within another highlighted object, like XML tag
   */
  attr: chalk.hex('#91EBC2'),

  /**
   * name of an attribute followed by a structured value part, like CSS properties
   */
  attribute: chalk.whiteBright,

  /**
   * variable in a config or a template file, environment var expansion in a script
   */
  variable: chalk.whiteBright,

  /**
   * list item bullet in text markup
   */
  bullet: chalk.whiteBright,

  /**
   * code block in text markup
   */
  code: chalk.whiteBright,

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
  formula: chalk.whiteBright,

  /**
   * hyperlink in text markup
   */
  link: chalk.underline,

  /**
   * quotation in text markup
   */
  quote: chalk.whiteBright,

  /**
   * tag selector in CSS
   */
  'selector-tag': chalk.whiteBright,

  /**
   * #id selector in CSS
   */
  'selector-id': chalk.whiteBright,

  /**
   * .class selector in CSS
   */
  'selector-class': chalk.whiteBright,

  /**
   * [attr] selector in CSS
   */
  'selector-attr': chalk.whiteBright,

  /**
   * :pseudo selector in CSS
   */
  'selector-pseudo': chalk.whiteBright,

  /**
   * tag of a template language
   */
  'template-tag': chalk.blueBright,

  /**
   * variable in a template language
   */
  'template-variable': chalk.green

  /**
   * added or changed line in a diff
   */
  // addition: chalk.chalk.green,

  /**
   * deleted line in a diff
   */
  // deletion: chalk.chalk.red,

  /**
   * things not matched by any token
   */
  // default: chalk.plain
};
