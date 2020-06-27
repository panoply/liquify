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
export default {

  TokenCaptures: [
    [
      'HTMLToken'
      ,
      {
        parser: true,
        groups: [
          'script',
          'style'
        ]
        ,
        capture: (

          /<\/?\b(GROUP_1)\b[^<>]*?>/

        )
      }
    ]
    ,
    [
      'HTMLTokenWithAttribute'
      ,
      {
        groups: [
          ['script', '\bapplication/json\b\\="ld\\+json"'],
          ['style', '\bapplication/json\b\\="ld\\+json"'],
        ]
        ,
        capture: (

          /<\/?\b(GROUP_1)\b[^<>]*?(GROUP_2)?>/

        )
      }
    ]
    ,
    [
      'HTMLComments'
      ,
      {
        groups: [
          'liquid-format-ignore-start',
          'liquid-format-ignore-end',
          'liquid-format-disable'
        ],
        capture: [

          /(?<=<!--|\/\*|\s*)\b(GROUP_1)\b(?=\s*|\*\/|-->)/,

        ]
      }
    ]
    ,
    [
      'LiquidToken'
      ,
      {
        capture: (

          /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/

        )
      }
    ]
    ,
    [
      'LiquidTokenObject'
      ,
      {
        capture: (

          /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/

        )
      }
    ]
  ]
  ,
  TokenContext: [
    [
      'LiquidTagFilters'
      ,
      {
        flag: 'gs',
        capture: (

          /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/

        )
      }
    ]
    ,
    [
      'LiquidTagParameters'
      ,
      {
        flag: 'g',
        capture: (

          /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/

        )
      }
    ]
    ,
    [
      'LiquidTagPath'
      ,
      {
        capture: (

          /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

        )
      }
    ]
  ]
  ,
  TokenValidations: [
    {
      severity: 2,
      rule: 'no-empty-pattern',
      message: 'Unexpected empty control condition',
      pattern: {
        flag: 's',
        group: TokenType.control,
        match: (

          /(?<=\b(?:GROUP_1)\b)\\s*(?=-?%})/

        )
      }
    },
    {
      severity: 1,
      rule: 'validate-control-condition',
      message: 'Invalid condition value was provided',
      pattern: {
        flag: 's',
        group: TokenType.control,
        match: (

          /[a-zA-Z0-9[\]-_."']+(?=[!=<>]+|\b(?:and|or)\b|.*?%})/

        )
      }
    },
    {
      severity: 1,
      rule: 'validate-operator',
      message: 'Invalid operator pattern sequence provided',
      pattern: {
        flag: 's',
        match: (

          /[!=<>]+|\bor\b|\band\b/

        )
      }
    },
    {
      severity: 1,
      rule: 'validate-operator-pattern',
      message: 'Condition has extrenous operator values in its expression.',
      pattern: {
        match: (

          /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

        )
      }
    },
    {
      severity: 1,
      rule: 'validate-condition-comparison',
      message: 'Condition has extrenous operator values in its expression.',
      pattern: {
        match: (

          /(?<=[=<>]|\b(?:and|or)\b)\s*[a-zA-Z0-9[\]-_."']+/

        )
      }
    },
    {
      severity: 1,
      rule: 'no-invalid-characters',
      message: 'Invalid characters detected in condition expression',
      pattern: {
        match: (

          /\s*(?=-?%})/

        )
      }
    }
    ,
    [
      'LiquidTagCondition'
      ,
      {
        execute: 1,
        severity: 2,
        rule: 'invalid-condition',
        message: 'Invalid condition was expressed',
        flag: 's',
        pattern: [
          [
            'LiquidTagConditionValidate'
            ,
            {
              capture: (

                /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

              )
            }
          ]
          ,
          [
            'LiquidTagConditionOperators'
            ,
            {
              capture: (

                /[!=<>]+|\bor\b|\band\b/

              )
            }
          ]
          ,
          [
            'LiquidTagConditionTruth'
            ,
            {
              flag: 's',
              capture: (

                /.*?(?=-?%})/

              )
            }
          ]
        ]
      }
    ]
  ]
}


const test = {
    parser: /<\/?\b(script|style)\b[^<>]*?>|<\/?\b(style)\b[^<>]*?(application\/json\="ld\+json")?>|(?<=<!--|\/\*|\s*)\b(liquid-format-ignore-start|liquid-format-ignore-end|liquid-format-disable)\b(?=\s*|\*\/|-->)|{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}|{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/,
    HTMLToken: /<\/?\b(script|style)\b[^<>]*?>/,
    HTMLTokenWithAttribute: /<\/?\b(style)\b[^<>]*?(application\/json\="ld\+json")?>/,
    NonLiquidComments: /(?<=<!--|\/\*|\s*)\b(liquid-format-ignore-start|liquid-format-ignore-end|liquid-format-disable)\b(?=\s*|\*\/|-->)/,
    LiquidTokenBlock: /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/,
    LiquidTokenObject: /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/,
    LiquidTagFilters: /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs,
    LiquidTagParameters: /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/g,
    LiquidTagPaths: /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/,
    LiquidTagCondition: /.*?(?=[!=<>]+|\b(?:and|or)\b|-?%})/s,
    LiquidTagConditionValidate: /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/,
    LiquidTagConditionOperators: /[!=<>]+|\bor\b|\band\b/,
    LiquidTagConditionTruthy: /.*?(?=-?%})/s
}
