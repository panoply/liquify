import _ from 'lodash'
import { DiagnosticSeverity } from 'vscode-languageserver'
import { TokenType } from '../parser/lexical'
import * as validate from './validations/index'

export default document => (ASTNode, spec) => {

  if (!spec || !ASTNode) return

  const { diagnostics, textDocument } = document
  const { token: [ token ] } = ASTNode

  if (spec.whitespace) {
    if (token.startsWith('-') || token.endsWith('-')) {

      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: 'Tag does not accept whitespace dashes!',
        range: {
          start: textDocument.positionAt(ASTNode.offset[0]),
          end: textDocument.positionAt(ASTNode.offset[1])
        }
      })

      return diagnostics

    }
  }

  if (ASTNode?.type === TokenType.object || !_.isEmpty(ASTNode?.objects)) {
    validate.object(ASTNode, document, spec)
  }

  if (ASTNode?.type === TokenType.control) {
    validate.control(ASTNode, document, spec)
  }

  if (ASTNode?.type === TokenType.iteration) {
    // iterationValidation(ASTNode, document)
  }

  if (ASTNode?.type === TokenType.variable) {
    // variableValidation(ASTNode, document)
  }

  return diagnostics
}
