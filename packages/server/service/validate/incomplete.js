
import { DiagnosticSeverity } from 'vscode-languageserver'
import { TokenTag, TokenType } from '../../parser/lexical'

/**
 * Tag Pairs
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
    onCall: true,
    rules: {
      pair: true
    },
    types: [
      TokenType.associate,
      TokenType.control,
      TokenType.embedded,
      TokenType.iteration,
      TokenType.comment
    ],
    tags: [
      TokenTag.start,
      TokenTag.close,
      TokenTag.singular,
      TokenTag.child
    ]
  },

  /**
   * @type {ValidationRuleParams}
   */
  validate: (
    document
    , { name, offset, tag }
    , rules
    , diagnostics
  ) => {

    if (!rules.pair) return undefined

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `"${name}" tag is missing ${tag === TokenTag.start ? 'start' : 'end'} tag`,
      range: {
        start: document.positionAt(offset[0]),
        end: document.positionAt(offset[1])
      }
    })

    return diagnostics

  }
})
