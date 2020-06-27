import _ from 'lodash'
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
 * Regular expressions used to parse the document,
 * we will connects these together at server intialisation
 *
 * @see https://regex101.com/r/xRMug9/6
 */
export const Patterns = ({ html, includes }) => ({

  parse: [

    /**
     * `<tag></tag>`
     *
     * HTML tag captures
     */
    `<\\/?\\b(${html.join('|')})\\b[^<>]*>`,

    /**
     * `{% tag %}{% endtag %}` or `{% tag %}`
     *
     * Liquid tag blocks or singular tags.
     */
    /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/.source,

    /**
     * `{{ tag }}`
     *
     *  Liquid singular output tags, generally objects
     */
    /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/.source

  ]
  ,
  /**
   * `<!-- text -->` or `/* text ` or `// text `
   *
   * HTML, JavaScript and CSS/SCSS comment tags
   */

  comments: [

    /(?:<!--|\/\*).*?(?:\*\/|-->)/

  ]
  ,
  /**
   * `---`
   *
   * Frontmatter blocks
   */
  frontmatter: [

    /(?<=-{3}\n).*?(?=\n-{3})/s

  ]
  ,
  /**
   * `{% tag %}{% endtag %}` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  filters: [

    /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs

  ]
  ,
  /**
   * `{% tag %}{% endtag %}` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  parameters: [

    /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/g

  ]
  ,

  /**
   * `{% tag 'ref' %}` or `{% tag file.html %}` to `ref` and `file.html`
   *
   */
  paths: [

    /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

  ]
  ,
  /**
   * `{% include file.ext %}`
   *
   * Liquid include tags
   */
  includes: [

    new RegExp(`(?<=\\b(${includes})\\b\\s+)["']?([\\w.]+)["']?`)

  ]

})

/**
 * The token kind used to distinguish the
 * language type of the the token.
 *
 * @readonly
 */
export const Contexts = {

  control: {
    /**
     * Captures condition, eg: `{% if condition  == compare %}` > `condition`
     */
    condition: (
      {
        /**
         * Captures condition, eg: `{% if condition  == compare %}` is `condition`
         */
        capture: (

          /.*?(?=[!=<>]+|\b(?:and|or)\b|-?%})/s

        )
        ,
        /**
         * Captures a valid condition block, eg: `(conditon)` is invalid
         */
        validate: (

          /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

        )
      }
    )
    ,
    /**
     * Captures control operators, eg: `{% if condition == true %}` > `==`
     */
    operators: (
      {
        /**
         * Captures control operators, eg: `{% if condition == true %}` > `==`
         */
        capture: (

          /[!=<>]+|\bor\b|\band\b/

        )
        ,
        /**
         * Captures a valid operator sequence, eg: `!===` > `!=`
         */
        validate: (

          /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

        )
      }
    )
    ,
    /**
     * Captures the end and/or truthy portion of a control eg: `{% if tag %}` > `tag %}`
     */
    truthy: (
      {
        capture: (

          /.*?(?=-?%})/s

        )
      }
    )
  }
}

/**
 * `<` – Left Angle Bracket - Used in HTML delimeters and Liquid operators
 */
export const LAN = '<'.charCodeAt(0)

/**
 * `<` – Right Angle Bracket - Used in HTML delimeters and Liquid operators
 */
export const RAN = '>'.charCodeAt(0)

/**
 * `{` – Left Curly Brace - Used in Liquid delimeters
 */
export const LCB = '{'.charCodeAt(0)

/**
 * `}` – Right Curly Brace - Used in Liquid delimeters
 */
export const RCB = '}'.charCodeAt(0)

/**
 * `!` – Bang chacter - Used in HTML comments and Liquid operators
 */
export const BNG = '!'.charCodeAt(0)

/**
 * `-` – Dash character - Used in Liquid delimeters (whitespace)
 */
export const DSH = '-'.charCodeAt(0)

/**
 * `%` – Percent character - Used in Liquid delimeters
 */
export const PER = '%'.charCodeAt(0)

/**
 * `|` – Pipe character - Used in Liquid filters
 */
export const PIP = '|'.charCodeAt(0)

/**
 * `.` – Dot chacter - Used in Liquid object properties
 */
export const DOT = '.'.charCodeAt(0)

/**
 * `:` – Colon character - Used in Liquid filter and iteration parameters
 */
export const COL = ':'.charCodeAt(0)

/**
 * `,` – Comma character - Used in Liquid filter parameters
 */
export const COM = ','.charCodeAt(0)

/**
 * `=` – Equals character - Used in Liquid operators and assignments
 */
export const EQS = '='.charCodeAt(0)

/**
 * `/` – Forward Slash Character - Used in HTML closing tags
 */
export const FWS = '/'.charCodeAt(0)

/**
 * `"` – Double Quoted Character - Used in Liquid to define string values
 */
export const DQO = '"'.charCodeAt(0)

/**
 * `'` – Single Quoted Character - Used in Liquid to define string values
 */
export const SQO = '\''.charCodeAt(0)

/**
 * `\n` – Newline Character - Used to check newlines
 */
export const NWL = '\n'.charCodeAt(0)

/**
 * `\r` – Carriage Return Character - Used to check newlines
 */
export const CAR = '\r'.charCodeAt(0)

/**
 * `\s` – Whitespace - Used to space characters
 */
export const WSP = ' '.charCodeAt(0)

/**
 * `\t` – Tabs - Used for tab spaces
 */
export const TAB = '\t'.charCodeAt(0)
