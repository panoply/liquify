import { Server } from '../../export'
import { DiagnosticSeverity } from 'vscode-languageserver'

/* -------------------------------------------- */
/*                  VALIDATION                  */
/* -------------------------------------------- */

/**
 * Control Validation
 *
 * @param {import('types/ast').AST} AST[]
 */
export default (
  { name, token: [ token ], offset: [ start, end ] }
  , { filters }
  , { textDocument, diagnostics }
) => {

  if (filters === false) {
    return diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: 'Tag does not accept filters',
      range: {
        start: textDocument.positionAt(start + token.indexOf(name) + name.length),
        end: textDocument.positionAt(end)
      }
    })
  }

  const match = token.matchAll(/(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs)

  for (const m of match) {

    const [ capture, filter, value ] = m

    if (capture.trim().length === 0) {
      return diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: 'Empty filter',
        range: {
          start: textDocument.positionAt(start + m.index - 1),
          end: textDocument.positionAt(start + filter.length + m.index)
        }
      })
    }

    const spec = Server.specification.filters?.[filter]

    if (!spec) continue

    const offset = start + m.index + filter.length + 1

    if (value.trim().length === 0) {
      return diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: 'Empty filter expression',
        range: {
          start: textDocument.positionAt(offset),
          end: textDocument.positionAt(offset + value.length)
        }
      })
    }

    const parameters = value.split(',')

    if (spec.parameters.length !== parameters.length) {

      const message = spec.parameters.length > 1
        ? `${spec.parameters.length} parameters`
        : `${spec.parameters.length} parameter`

      return diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `The "${filter}" filter requires ${message}, recieved ${parameters.length}`,
        range: {
          start: textDocument.positionAt(offset + 1),
          end: textDocument.positionAt(offset + value.length)
        }
      })
    }

    let i = 0
    const length = parameters.length

    for (; i < length; i++) {
      if (parameters[i].trim().length > 0) continue
      if (spec.parameters[i].required) {
        return diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: `Parameter ${i + 1} must be a string value`,
          range: {
            start: textDocument.positionAt(offset + parameters[i].length),
            end: textDocument.positionAt(offset + value.length)
          }
        })
      }
    }

  }

}
