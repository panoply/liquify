import { DiagnosticSeverity } from 'vscode-languageserver'
import { Grammar, TokenTag, TokenType } from '../../parser/lexical'
import { regexp } from '../../parser/utils'

/**
 * Filter validation function export
 */
export default {
  meta: {
    group: 'filter',
    rules: {
      existence: true,
      parameter: true
    },
    types: [
      TokenType.import,
      TokenType.object,
      TokenType.variable
    ],
    tags: [
      TokenTag.start,
      TokenTag.singular
    ]
  },
  validate: (
    source,
    token,
    [ start ],
    objects,
    { tag, name, filters }
  ) => {

    const { filter } = Grammar.validation

    const problems = regexp(filter, token)(capture => {

      const [ match ] = capture
      const [ message, severity ] = filters === false ? [
        `The "${name}" tag does not accept filter attributes`,
        DiagnosticSeverity.Error
      ] : [
        `Incomplete filter definition on the "${name}" tag`,
        DiagnosticSeverity.Warning
      ]

      return [
        message,
        severity,
        start + capture.index,
        start + capture.index + match.length
      ]

    })

    if (!problems) return false

    return document => problems.map(([
      message,
      severity,
      position,
      length
    ]) => (
      {
        source,
        severity,
        message,
        range: {
          start: document.positionAt(position),
          end: document.positionAt(length)
        }
      }
    ))

  }
}
