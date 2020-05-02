import { DiagnosticSeverity } from 'vscode-languageserver'
import { Characters, Validation } from '../../export'

/**
 * Tag Whitespace
 *
 * @export
 * @param {string} source
 * @param {string} token
 * @param {array}  offset
 * @param {object} record
 */
export default ({
  source,
  token,
  offset: [ line, start ],
  record: { whitespace = true }
}) => {

  if (!Validation.diagnosticRules.tag_newline) return false

  return document => problems.map(position => (
    {
      source,
      severity: DiagnosticSeverity.Error,
      message: 'Tag should not span multiple lines.',
      range: {
        start: document.positionAt(position),
        end: document.positionAt(position + 1)
      }
    }
  ))

}
