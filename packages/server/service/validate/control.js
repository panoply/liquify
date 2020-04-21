import { DiagnosticSeverity } from 'vscode-languageserver'
import { Grammar, TokenTag, TokenType } from '../../parser/lexical'
import { regexp } from '../../../.scripts/old/lexical'
import { Server } from '../../export'
import * as tag from './tag'

export default {

  meta: {
    group: 'control',
    rules: {
      operator: true,
      condition: true
    },
    types: [
      TokenType.control
    ],
    tags: [
      TokenTag.start,
      TokenTag.child
    ]
  },
  /**
   *
   *
   * @param {*} ASTnode
   * @param {*} textDocument
   * @param {*} rules
   * @param {*} diagnostics
   */
  validate: (
    { token: { start, end }, children, offset }
    , textDocument
    , rules
    , diagnostics
  ) => {

    tag.whitespace()

    const leftDelimeter = token.indexOf(tag)
    const rightDelimeter = token.match(/\s*-?%}/).index
    const region = token.substring(tagName, rDelimeter)

    for (let i = 0; i < start.length; i++) {

      const operator = start[i]

      if (i % 2) {
        if (operator.length > 3) {
          diagnostics.push({
            source: Server.engine,
            severity: DiagnosticSeverity.Error,
            message: `Externous operator value of ${operator.slice(3)} Exceeds 2 characters.`,
            range: {
              start: textDocument.positionAt(offset.start[0]),
              end: textDocument.positionAt(offset + 1)
            }
          })
        } else if (!valid.includes(operator)) {
          diagnostics.push(`Invalid operator combination, ${operator} is invalid`)
        }
      }
    }

    if (regex.test(last)) {
      problems.push(`Missing condition after "${last}" operator`)
    }

  }
}
