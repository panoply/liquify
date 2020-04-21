import { DiagnosticSeverity, Range } from 'vscode-languageserver'
import { Characters, TokenTag, TokenType } from '../../parser/lexical'
import { Server } from '../../export'

/**
 * Tag Whitespace
 *
 * @export
 * @typedef {import('../../provide/node_modules/defs').ValidationMeta} ValidationMeta
 * @typedef {import('../../provide/node_modules/defs').ValidationRuleParams} ValidationRuleParams
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
      TokenType.associate,
      TokenType.comment,
      TokenType.control,
      TokenType.embedded,
      TokenType.import,
      TokenType.iteration,
      TokenType.object,
      TokenType.variable
    ],
    tags: [
      TokenTag.start,
      TokenTag.singular,
      TokenTag.child,
      TokenTag.close
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
