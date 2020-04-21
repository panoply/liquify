// @ts-check

/**
 * Lexicals
 *
 * Exports defined here are used by the parser/tokenizer and help give context to
 * Liquid tags located in each text document.
 *
 * @param {import('defs').DocumentModel} params
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
  blocks: /{%[\s\S]*?\b(?:end)?(\w+)\b[\s\S][^%]*?%}/.source,

  /**
   * `{{ tag }}`
   *
   *  Liquid singular output tags, generally objects
   */
  output: /{{2}[\s\S]*?\b(\w+)\b[\s\S][^{}]*?}{2}/.source,

  /**
   * `<!-- text -->` or `/* text ` or `// text `
   *
   * HTML, JavaScript and CSS/SCSS comment tags
   */
  comments: /(?:<!--|\/\*)[\s\S]*(?:\*\/|-->)/.source,

  /**
   * `---`
   *
   * Frontmatter blocks
   */
  frontmatter: /(-{3})/.source

}

/**
 * The token kind used to distinguish the
 * language type of the the token.
 *
 * @readonly
 */
export const TokenKind = {

  /**
   * Describes a HTML token kind, eg: `<tag>` | `</tag>`
   */
  html: 1,

  /**
   * Describes a Liquid token kind, eg: `{{ tag }}` or `{% tag %}` | `{% endtag %}`
   */
  liquid: 2

}

/**
 * The token tag name used to define the tag type
 * we are dealing with.
 *
 * @readonly
 */
export const TokenTag = {

  /**
   * `1` - Start Tag
   */
  start: 1,

  /**
   * `2` - Close Tag
   */
  close: 2,

  /**
   * `3` - Child Tag
   */
  child: 3,

  /**
   * `4` - Singular Tags
   */
  singular: 4,

  /**
   * `3` - Pair
   */
  pair: 5

}

/**
 * The token type used to define the token type
 * types of Liquid tag.
 *
 * @readonly
 */
export const TokenType = {

  /**
   * `1` Associate Type, eg: `<tag> </tag>` | `{% tag %} {% endtag %}`
   */
  associate: 1,

  /**
   * `2` Control Type, eg: `{% if %}` | `{% unless %}`
   */
  control: 2,

  /**
   * `3` Comment Type, eg: `{% comment %} {% endcomment %}`
   */
  comment: 3,

  /**
   * `4` Embedded Type, eg: `{% schema %} {% endschema %}`
   */
  embedded: 4,

  /**
   * `5` Import Type, eg: `{% include '' %}` | `{% render '' %}`
   */
  import: 5,

  /**
   * `6` Iteration Type, eg: `{% for %} {% endfor %}` | `{% cycle %} {% endcycle %}`
   */
  iteration: 6,

  /**
   * `7` Object Type, eg: `{{ tag }}`
   */
  object: 7,

  /**
   * `8` Output Type, eg: `{% assign = '' %}` | `{% capture %}`
   */
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
