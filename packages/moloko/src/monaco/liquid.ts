import { languages } from 'monaco-editor';

const EMPTY_ELEMENTS: string[] = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

/**
 * Liquid Language Configuration
 *
 * Language configuration for Liquid
 */
export const configuration: languages.LanguageConfiguration = {

  colorizedBracketPairs: [],
  wordPattern: /(-?\d*\.\d\w*)|([^`~!@$^&*()=+[{\]}\\|;:'",.<>/\s]+)/g,
  brackets: [
    [ '<!--', '-->' ],
    [ '<', '>' ],
    [ '{{', '}}' ],
    [ '{%', '%}' ],
    [ '{', '}' ],
    [ '(', ')' ]
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '%', close: '%' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: '<', close: '>' },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  onEnterRules: [
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
        'i'
      ),
      afterText: /^<\/(\w[\w\d]*)\s*>$/i,
      action: {
        indentAction: languages.IndentAction.IndentOutdent
      }
    },
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
        'i'
      ),
      action: { indentAction: languages.IndentAction.Indent }
    }
  ]
};

/**
 * Liquid Monarch Language
 *
 * Grammar support for the Liquid Template Language.
 */
export const liquid: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '',
  ignoreCase: true,
  keywords: [
    // (opening) tags
    'if',
    'else',
    'elsif',
    'render',
    'assign',
    'capture',
    'case',
    'comment',
    'cycle',
    'decrement',
    'for',
    'include',
    'increment',
    'layout',
    'liquid',
    'section',
    'block',
    'raw',
    'render',
    'tablerow',
    'unless',
    'schema',
    'style',
    'stylesheet',
    // closing tags
    'endif',
    'endcapture',
    'endcase',
    'endblock',
    'endcomment',
    'endfor',
    'endraw',
    'endtablerow',
    'endunless',
    'endschema',
    'endstyle',
    'endstylesheet'

  ],

  tokenizer: {
    root: [
      [ /\s+/, '' ],
      [ /{%-?\s*#/, 'comment.line.liquid', '@liquid_comment_line' ],
      [ /{%-?\s*comment\s*-?%}/, 'comment.liquid', '@liquid_comment_block' ],
      [
        /({%-?)(\s*)(schema)(\s*)(-?%})/,
        [
          'delimiter.tag.liquid',
          '',
          'tag.liquid',
          '',
          { token: 'delimiter.tag.liquid', next: '@liquid_script', nextEmbedded: 'javascript' }
        ]
      ],
      [
        /({%-?)(\s*)(style(?:sheet)?)(\s*)(-?%})/,
        [
          'delimiter.tag.liquid',
          '',
          'tag.liquid',
          '',
          { token: 'delimiter.tag.liquid', next: '@liquid_style', nextEmbedded: 'css' }
        ]
      ],
      [ /({%-?)([ \n\t\f]*)([\w_-]+)/, [ 'delimiter.tag.liquid', '', { token: 'tag.liquid', next: '@liquid_tag' } ] ],
      [ /{{-?/, 'delimiter.output.liquid', '@liquid_outputs' ],
      [ /{%-?/, 'delimiter.liquid' ],
      [ /<!DOCTYPE/, 'metatag.html', '@doctype' ],
      [ /<!--/, 'comment.html', '@comment' ],
      [ /(<)((?:[\w-]+:)?[\w-]+)(\s*)(\/>)/, [ 'delimiter.html', 'tag.html', '', 'delimiter.html' ] ],
      [ /(<)(script)/, [ 'delimiter.html', { token: 'tag.html', next: '@script' } ] ],
      [ /(<)(style)/, [ 'delimiter.html', { token: 'tag.html', next: '@style' } ] ],
      [ /(<)((?:[\w-]+:)?[\w-]+)/, [ 'delimiter.html', { token: 'tag.html', next: '@html_tag' } ] ],
      [ /(<\/)((?:[\w-]+:)?[\w-]+)/, [ 'delimiter.html', { token: 'tag.html', next: '@html_tag' } ] ],
      [ /</, 'delimiter.html' ],
      [ /[^<]+/, '' ] // text
    ],

    /**
     * Liquid Comment Blocks
     */
    liquid_comment_block: [
      [ /{%-?\s*endcomment\s*-?%}/, 'comment.end.liquid', '@pop' ],
      [ /./, 'comment.content.liquid' ]
    ],

    /**
     * Liquid Comment Line
     */
    liquid_comment_line: [
      [ /%}/, 'comment.content.liquid', '@pop' ]
    ],

    liquid_script: [
      [ /%}/, 'delimiter.liquid', '@pop' ],
      [
        /{%-?\s*(?:end(?:schema|javascript)?)\s*-?%}/
        ,
        {
          token: '@rematch',
          next: '@pop',
          nextEmbedded: '@pop'
        }
      ]
    ],

    liquid_style: [
      [ /%}/, 'delimiter.liquid', '@pop' ],
      [
        /{%-?\s*(?:endstyle(?:sheet)?)\s*-?%}/
        ,
        {
          token: '@rematch',
          next: '@pop',
          nextEmbedded: '@pop'
        }
      ]
    ],

    liquid_fallback: [
      [
        /({%-?)\s*(endverbatim)\s*(-?%})/
        ,
        [
          'delimiter.tag.liquid',
          'tag.liquid',
          {
            token: 'delimiter.liquid',
            next: '@popall'
          }
        ]
      ],
      [ /./, 'string.liquid' ]
    ],

    liquid_tag: [
      [ /-?%}/, 'delimiter.tag.liquid', '@pop' ],
      { include: 'expression' }
    ],

    /**
    * Variable Tag Handling
    */
    liquid_outputs: [
      [ /-/, 'delimiter.whitespace.liquid' ],
      [ /-?}}/, 'delimiter.liquid', '@pop' ],
      { include: 'expression' }
    ],

    stringState: [

      // closing double quoted string
      [ /"/, 'string.liquid', '@pop' ],

      // string part
      [ /[^"\\]*(?:(?:\\.|#(?!\{))[^"\\]*)*/, 'string.liquid' ]

    ],

    /**
     * Expression Handling
     */
    expression: [

      // whitespace
      [ /\s+/, '' ],

      // operators - logic
      [ /(\b(?:and|or|in|with|contains)\b)(\s+)/, [ 'operator.liquid', '' ] ],

      // operators - logic
      [ /(\b(?:true|false|nil)\b)/, 'boolean.liquid' ],

      // object props
      [ /([a-zA-Z_][a-zA-Z0-9_-]+)(\s*)(?=\.)/, [ 'keyword.object.liquid', '' ] ],

      // filter parameters
      [ /(\|)(\s*)(\w+)(:)/, [ 'operator.liquid', '', 'keyword.filter.liquid', 'operator.liquid' ] ],

      // filter parameters
      [ /(\w+)(:)/, [ 'keyword.parameter.liquid', 'operator.liquid' ] ],

      // operators - math
      [ /\+|-|\/{1,2}|\*{1,2}/, 'operator.liquid' ],

      // operators - comparison
      [ /==|!=|<|>|>=|<=|=/, 'operator.liquid' ],

      // operators - misc
      [ /\||:|\.{1,2}/, 'operator.liquid' ],

      // numbers
      [ /\d+(\.\d+)?/, 'number.liquid' ],

      // punctuation
      [ /\(|\)|\[|\]/, 'delimiter.liquid' ],

      [
        /[^\W\d][\w]*/,
        {
          cases: {
            '@keywords': 'tag.liquid',
            '@default': 'tag.output.liquid'
          }
        }
      ],
      // strings
      [ /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/, 'string.liquid' ],

      [ /"/, 'string.liquid', '@stringState' ]

    ],

    liquid_string: [
      [ /\s*{{-?/, 'delimiter.tag.liquid', '@liquid_outputs' ],
      [ /\s*{%-?/, 'delimiter.output.liquid', '@liquid_tag' ],
      [ /"/, 'attribute.value.html', '@pop' ],
      [ /./, 'attribute.value.html' ]
    ],

    /**
     * HTML
     */
    doctype: [
      [ /[^>]+/, 'metatag.content.html' ],
      [ />/, 'metatag.html', '@pop' ]
    ],

    comment: [
      [ /-->/, 'comment.html', '@pop' ],
      [ /[^-]+/, 'comment.content.html' ],
      [ /./, 'comment.content.html' ]
    ],

    html_tag: [
      [ /\/?>/, 'delimiter.html', '@pop' ],
      [ /"/, 'attribute.value.html', '@liquid_string' ],
      [ /'([^']*)'/, 'attribute.value.html' ],
      [ /[\w-]+/, 'attribute.name.html' ],
      [ /=/, 'delimiter.equals.html' ],
      [ /[ \t\r\n]+/, '' ] // whitespace
    ],

    // After <script
    script: [
      [ /type/, 'attribute.name.html', '@html_script_after_type' ],
      [ /"([^"]*)"/, 'attribute.value.html' ],
      [ /'([^']*)'/, 'attribute.value.html' ],
      [ /[\w-]+/, 'attribute.name.html' ],
      [ /=/, 'delimiter.html' ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_script_embedded',
          nextEmbedded: 'text/javascript'
        }
      ],
      [ /[ \t\r\n]+/, '' ], // whitespace
      [
        /(<\/)(script\s*)(>)/,
        [ 'delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' } ]
      ]
    ],

    // After <script ... type
    html_script_after_type: [
      [ /=/, 'delimiter.html', '@html_script_after_type_equals' ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_script_embedded',
          nextEmbedded: 'text/javascript'
        }
      ], // cover invalid e.g. <script type>
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/script\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    // After <script ... type =
    html_script_after_type_equals: [
      [
        /"([^"]*)"/,
        {
          token: 'attribute.value.html',
          switchTo: '@html_script_with_custom_type.$1'
        }
      ],
      [
        /'([^']*)'/,
        {
          token: 'attribute.value.html',
          switchTo: '@html_script_with_custom_type.$1'
        }
      ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_script_embedded',
          nextEmbedded: 'text/javascript'
        }
      ], // cover invalid e.g. <script type=>
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/script\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    // After <script ... type = $S2
    html_script_with_custom_type: [
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_script_embedded.$S2',
          nextEmbedded: '$S2'
        }
      ],
      [ /"([^"]*)"/, 'attribute.value.html' ],
      [ /'([^']*)'/, 'attribute.value.html' ],
      [ /[\w-]+/, 'attribute.name.html' ],
      [ /=/, 'delimiter.html' ],
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/script\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    // Embedded <script
    html_script_embedded: [
      [ /<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' } ],
      [ /[^<]+/, '' ]
    ],

    // After <style
    style: [
      [ /type/, 'attribute.name.html', '@html_style_after_type' ],
      [ /"([^"]*)"/, 'attribute.value.html' ],
      [ /'([^']*)'/, 'attribute.value.html' ],
      [ /[\w-]+/, 'attribute.name.html' ],
      [ /=/, 'delimiter.html' ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_style_embedded',
          nextEmbedded: 'text/css'
        }
      ],
      [ /[ \t\r\n]+/, '' ], // whitespace
      [
        /(<\/)(style\s*)(>)/,
        [ 'delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' } ]
      ]
    ],

    // After <style ... type
    html_style_after_type: [
      [ /=/, 'delimiter.html', '@html_style_after_equals' ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_style_embedded',
          nextEmbedded: 'text/css'
        }
      ], // cover invalid e.g. <style type>
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/style\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    // After <style ... type =
    html_style_after_equals: [
      [
        /"([^"]*)"/,
        {
          token: 'attribute.value.html',
          switchTo: '@html_style_with_custom_type.$1'
        }
      ],
      [
        /'([^']*)'/,
        {
          token: 'attribute.value.html',
          switchTo: '@html_style_with_custom_type.$1'
        }
      ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_style_embedded',
          nextEmbedded: 'text/css'
        }
      ], // cover invalid e.g. <style type=>
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/style\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    // After <style ... type = $S2
    html_style_with_custom_type: [
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@html_style_embedded.$S2',
          nextEmbedded: '$S2'
        }
      ],
      [ /"([^"]*)"/, 'attribute.value.html' ],
      [ /'([^']*)'/, 'attribute.value.html' ],
      [ /[\w-]+/, 'attribute.name.html' ],
      [ /=/, 'delimiter.html' ],
      [ /[ \t\r\n]+/, '' ], // whitespace
      [ /<\/style\s*>/, { token: '@rematch', next: '@pop' } ]
    ],

    html_style_embedded: [
      [ /<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' } ],
      [ /[^<]+/, '' ]
    ]
  }
};
