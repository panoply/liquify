/**
 * Regular expressions used to parse the document.
 * We will connect these together at server intialization,
 * expression that contain `GROUP_1` or `GROUP_2` will have
 * an array of string matches applied to them.
 *
 * @see https://regex101.com/r/xRMug9/6
 */
export function Expressions (options) {

  let html_token
    , html_token_with_attrs
    , html_comments
    , tag_objects

  /**
   * `<tag></tag>`
   *
   * HTML tag captures
   */
  html_token = /<\/?\b(GROUP_1)\b[^<>]*?>/.source

  /**
   * `<tag attr="mime/type"></tag>`
   *
   * HTML tag captures
   */
  html_token_with_attrs = /<\/?\b(GROUP_1)\b[^<>]*?(GROUP_2)?>/.source

  /**
   * `<!-- text -->` or `/* text ` or `// text `
   *
   * HTML, JavaScript and CSS/SCSS comment tags
   */
  html_comments = /(?<=<!--|\/\*|\s*)\b(GROUP_1)\b(?=\s*|\*\/|-->)/.source

  /**
   * `` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  tag_objects = /\b(?:GROUP_1)\.?(?:[^\s\n]*\b)?/g

  /**
   * `{{ tag | filter: 'foo' }}` or `{{ tag | prop: foo: 'prop'}}`
   *
   * Liquid filter attributes paramaters
   */
  const tag_filters = /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs

  /**
   * `{% for tag in tags limit: 10 %}` into `limit: 10`
   *
   * Liquid tag parameter values
   */
  const tag_params = /(?<=,|\s+)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=\s+|,|["']|-?%})/g

  /**
   * `{% tag 'ref' %}` or `{% tag file.html %}` to `ref` and `file.html`
   *
   * Liquid include/render type tags.
   */
  const tag_path = /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

  /**
   * `{% tag %}{% endtag %}` or `{% tag %}`
   *
   * Liquid tag blocks or singular tags.
   */
  const liquid_token = /{%-?\s*\b(?:end)?(\w+)\b(?:[^'"][^{%}]*)*?[^{%]*%}/.source

  /**
   * `{{ tag }}`
   *
   *  Liquid singular output tags, generally objects
   */
  const liquid_object = /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/.source

  /**
   * `---`
   *
   * Frontmatter blocks
   */
  const frontmatter = /(?<=-{3}\n).*?(?=\n-{3})/s

  /* -------------------------------------------- */
  /*               EXPRESSION MODEL¸              */
  /* -------------------------------------------- */

  return (
    ({ html, tags }) => {

      const match = /\bGROUP_[0-9]/g
      const regex = [ liquid_token, liquid_object ]

      if (html?.tokens) {
        html_token = html_token.replace(match, html.tokens.join('|'))
        regex.push(html_token)
      }

      if (html?.comments) {
        html_comments = html_comments.replace(match, html.comments.join('|'))
        regex.push(html_comments)
      }

      if (html?.tokens_with_attribute) {
        let i = 0
        const cb = () => html.tokens_with_attribute[i++].join('|')
        html_token_with_attrs = html_token_with_attrs.replace(match, cb)
        regex.push(html_token_with_attrs)
      }

      if (tags?.objects) {
        const captures = tag_objects.source.replace(match, tags.objects.join('|'))
        tag_objects = new RegExp(captures, tag_objects.flags)
      }

      return {
        frontmatter
        , tag_filters
        , tag_params
        , tag_path
        , tag_objects
        , tokens: new RegExp(regex.join('|'), 'gs')
      }
    }
  )(options)

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
export const TokenTag = ({
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

})

/**
 * The token type used to define the token type
 * types of Liquid tag.
 *
 * @readonly
 */
export const TokenType = ({
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
   * `5` Include Type, eg: `{% include '' %}` | `{% render '' %}`
   */
  include: 5,
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
})

/**
 * The token characters that are found within
 * HTML or Liquid tags.
 */
export const Characters = ({

  /**
   * `*` – Whitespace - Used to space characters
   */
  ARS: '*'.charCodeAt(0),

  /**
   * `<` – Left Angle Bracket - Used in HTML delimeters and Liquid operators
   */
  LAN: '<'.charCodeAt(0),

  /**
   * `>` – Right Angle Bracket - Used in HTML delimeters and Liquid operators
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
   * `/` – Backward Slash Character - Used in HTML closing tags
   */
  BWS: '\\'.charCodeAt(0),

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
   * `\f` – Form Return Character - Used to check newlines
   */
  LFD: '\f'.charCodeAt(0),

  /**
   * `\s` – Whitespace - Used to space characters
   */
  WSP: ' '.charCodeAt(0),

  /**
   * `\t` – Tabs - Used for tab spaces
   */
  TAB: '\t'.charCodeAt(0)

})
