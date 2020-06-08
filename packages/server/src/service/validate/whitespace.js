import { DiagnosticSeverity, Range } from 'vscode-languageserver'
import { Characters, TokenTag, TokenType } from '../../parser/lexical'
import { Server } from '../../export'

/**
 * Tag Whitespace
 *
 * @export
 * @typedef {import('../../package/provide/node_modules/defs').ValidationMeta} ValidationMeta
 * @typedef {import('../../package/provide/node_modules/defs').ValidationRuleParams} ValidationRuleParams
 */
export default ({

  /**
   * @type {ValidationMeta}
   */
  meta: {
    group: 'tag',
    onCall: false,
    rules: {
      whitespace: true
    },
    types: [
      'associate',
      'comment',
      'control',
      'embedded',
      'import',
      'iteration',
      'object',
      'variable'
    ],
    tags: [
      'start',
      'singular',
      'child',
      'close'
    ]
  },

  /**
   * @type {ValidationRuleParams}
   */
  validate: (
    document
    , { name, token: [ token ], offset }
    , rules
    , diagnostics
  ) => {

    // If whitespace rule is false, skip validation
    if (!rules.whitespace || Server.specification[name].whitespace) return undefined

    const severity = DiagnosticSeverity.Error
    const message = 'Tag does not accept whitespace dash'

    if (token.charCodeAt(2) === Characters.DSH) {
      const leftRange = document.positionAt(offset[0] + 2)
      diagnostics.push({
        severity,
        message,
        range: Range.create(leftRange, leftRange)
      })
    }

    if (token.charCodeAt(token.length - 3) === Characters.DSH) {
      const rightRange = document.positionAt(offset[1] - 3)
      diagnostics.push({
        severity,
        message,
        range: Range.create(rightRange, rightRange)
      })
    }

    return diagnostics

  }
})
