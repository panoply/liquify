// @ts-check

/**
 * Lexicals
 *
 * Exports defined here are used by the parser/tokenizer and help give context to
 * Liquid tags located in each text document.
 *
 * @param {import('types/defs').DocumentModel} params
 * @param {import('vscode-languageserver').TextDocumentContentChangeEvent} changes[]
 * @param {object} options
 * @returns
 */

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * Regular expressions used to parse the document,
 * we will connects these together at server intialisation
 *
 * @see https://regex101.com/r/xRMug9/6
 */
export const Expressions = {

  /**
   * `<tag></tag>`
   *
   * HTML tag captures
   */
  html: /<\/?\b(script|style)\b[^<>]*>/.source,

  /**
   * `{% tag %}{% endtag %}` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  blocks: /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/.source,

  /**
   * `{% tag %}{% endtag %}` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  parameters: /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/g,

  /**
   * `{{ tag }}`
   *
   *  Liquid singular output tags, generally objects
   */
  output: /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/.source,

  /**
   * `<!-- text -->` or `/* text ` or `// text `
   *
   * HTML, JavaScript and CSS/SCSS comment tags
   */
  comments: /(?:<!--|\/\*).*?(?:\*\/|-->)/.source,

  /**
   * `---`
   *
   * Frontmatter blocks
   */
  frontmatter: /(?<=-{3}\n).*?(?=\n-{3})/s,

  /**
   * `{% tag 'ref' %}` or `{% tag file.html %}` to `ref` and `file.html`
   */
  reference: /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

}

/**
 * The token kind used to distinguish the
 * language type of the the token.
 *
 * @readonly
 */
export const ControlExpressions = {

  /**
   * Captures condition, eg: `{% if condition  == compare %}` > `condition`
   */
  condition: /.*?(?=[!=<>]+|\bor\b|\band\b)/s,

  /**
   * Captures control operators, eg: `{% if condition == true %}` > `==`
   */
  operators: /[!=<>]+|\bor\b|\band\b/,

  /**
   * Captures a valid operator sequence, eg: `!===` > `!=`
   */
  characters: /<=|>=|==|>|<|!=|\bor\b|\band\b/
}

/**
 * The token kind used to distinguish the
 * language type of the the token.
 *
 * @readonly
 */
export const TokenKind = {
  html: 1,
  liquid: 2
}

/**
 * The token tag name used to define the tag type
 * we are dealing with.
 *
 * @readonly
 */
export const TokenTag = {
  start: 1,
  close: 2,
  child: 3,
  singular: 4,
  pair: 5
}

/**
 * The token type used to define the token type
 * types of Liquid tag.
 *
 * @readonly
 */
export const TokenType = {
  associate: 1,
  control: 2,
  comment: 3,
  embedded: 4,
  include: 5,
  iteration: 6,
  object: 7,
  variable: 8
}

/**
 * The token characters that are found within
 * HTML or Liquid tags.
 */
export const Characters = {

  /**
   * `<` – Left Angle Bracket - Used in HTML delimeters and Liquid operators
   */
  LAN: '<'.charCodeAt(0),

  /**
   * `<` – Right Angle Bracket - Used in HTML delimeters and Liquid operators
   */
  RAN: '>'.charCodeAt(0),

  /**
   * `{` – Left Curly Brace - Used in Liquid delimeters
   */
  LCB: '{'.charCodeAt(0),

  /**
   * `}` – Right Curly Brace - Used in Liquid delimeters
   */
  RCB: '}'.charCodeAt(0),

  /**
   * `!` – Bang chacter - Used in HTML comments and Liquid operators
   */
  BNG: '!'.charCodeAt(0),

  /**
   * `-` – Dash character - Used in Liquid delimeters (whitespace)
   */
  DSH: '-'.charCodeAt(0),

  /**
   * `%` – Percent character - Used in Liquid delimeters
   */
  PER: '%'.charCodeAt(0),

  /**
   * `|` – Pipe character - Used in Liquid filters
   */
  PIP: '|'.charCodeAt(0),

  /**
   * `.` – Dot chacter - Used in Liquid object properties
   */
  DOT: '.'.charCodeAt(0),

  /**
   * `:` – Colon character - Used in Liquid filter and iteration parameters
   */
  COL: ':'.charCodeAt(0),

  /**
   * `,` – Comma character - Used in Liquid filter parameters
   */
  COM: ','.charCodeAt(0),

  /**
   * `=` – Equals character - Used in Liquid operators and assignments
   */
  EQS: '='.charCodeAt(0),

  /**
   * `/` – Forward Slash Character - Used in HTML closing tags
   */
  FWS: '/'.charCodeAt(0),

  /**
   * `"` – Double Quoted Character - Used in Liquid to define string values
   */
  DQO: '"'.charCodeAt(0),

  /**
   * `'` – Single Quoted Character - Used in Liquid to define string values
   */
  SQO: '\''.charCodeAt(0),

  /**
   * `\n` – Newline Character - Used to check newlines
   */
  NWL: '\n'.charCodeAt(0),

  /**
   * `\r` – Carriage Return Character - Used to check newlines
   */
  CAR: '\r'.charCodeAt(0),

  /**
   * `\s` – Whitespace - Used to space characters
   */
  WSP: ' '.charCodeAt(0),

  /**
   * `\t` – Tabs - Used for tab spaces
   */
  TAB: '\t'.charCodeAt(0)

}
