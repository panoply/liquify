// @ts-check

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
export default [
  [
    'PARSER'
    ,
    [
      [
        'html_Token'
        ,
        {
          groups: ['script', 'style'],
          match: (

            /<\/?\b(GROUP_1)\b[^<>]*?>/

          )
        }
      ]
      ,
      [
        'html_token_with_attribute'
        ,
        {
          groups: [
            ['script', '\bapplication/json\b\\="ld\\+json"'],
            ['style', '\bapplication/json\b\\="ld\\+json"'],
          ],
          match: (

            /<\/?\b(GROUP_1)\b[^<>]*?(GROUP_2)?>/

          )
        }
      ]
      ,
      [
        'html_comments'
        ,
        {
          groups: [
            'liquid-format-ignore-start',
            'liquid-format-ignore-end',
            'liquid-format-disable'
          ],
          match: (

            /(?<=<!--|\/\*|\s*)\b(GROUP_1)\b(?=\s*|\*\/|-->)/

          )
        }
      ]
      ,
      [
        'liquid_token'
        ,
        {
          match: (

            /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/

          )
        }
      ]
      ,
      [
        'liquid_token_object'
        ,
        {
          match: (

            /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/

          )
        }
      ]
    ]
  ]
  ,
  [
    'CONTEXT'
    ,
    [
      [
        'liquid_tag_filters'
        ,
        {
          match: (

            /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs

          )

        }
      ]
      ,
      [
        'liquid_tag_parameters'
        ,
        {
          match: (

            /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/g

          )
        }
      ]
      ,
      [
        'liquid_tag_path'
        ,
        {
          match: (

            /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

          )
        }
      ]
    ]
  ]
  ,
  [
    'GLOBAL'
    ,
    [
      [
        'no_incomplete_string'
        ,
        {
          severity: 1,
          message: 'Unexpected empty control condition',
          pattern: {
            match: (

              /["'].*[^\\]['"]/

            ),
          }
        }
      ]
      ,
      [
        'validate_value_property'
        ,
        {
          severity: 1,
          message: 'Incorrect value supplied',
          pattern: {
            match: (

              /[a-zA-Z0-9[\]-_.]+/

            ),
          }
        }
      ]
    ]
  ],
  [
    'CONTROL'
    ,
    [
      'no_empty_pattern'
      ,
      {
        severity: 2,
        message: 'Unexpected empty control condition',
        resolve: true,
        pattern: {
          group: TokenType.control,
          match: (

            /(?<=\b(?:GROUP_1)\b)\s*(?=-?%})/

          ),
        }
      }
    ]
    ,
    [
      'condition'
      ,
      {
        severity: 1,
        message: 'Invalid condition value was provided',
        pattern: {
          capture: (

            /.*?(?=[!=<>]+|\b(?:and|or)\b|\s*-?%})/s

          ),
          match: (

            /[a-zA-Z0-9[\]-_."']/

          ),
        }
      }
    ]
    ,
    [
      'operator'
      ,
      {
        severity: 1,
        rule: 'validate_operator',
        message: 'Invalid operator pattern sequence provided',
        pattern: {
          capture: (

            /[!=<>]+|\bor\b|\band\b/

          ),
          match: (

            /(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

          ),
        }
      }
    ]
    ,
    [
      'invalid_characters'
      ,
      {
        severity: 1,
        rule: 'no-invalid-characters',
        message: 'Invalid characters detected in condition expression',
        pattern: {
          match: (

            /(?!\s*)(?=-?%})/

          )
        }
      }
    ]
  ]
]
