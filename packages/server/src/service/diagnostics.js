import _ from 'lodash'
import { DiagnosticSeverity } from 'vscode-languageserver'
import { TokenType } from '../parser/lexical'
import * as validate from './validations/index'

export default (ASTNode, spec) => {

  if (!spec || !ASTNode) return

  const { token: [ token ] } = ASTNode

  if (spec.whitespace) {
    if (token.startsWith('-') || token.endsWith('-')) {

      ASTNode.diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: 'Tag does not accept whitespace dashes!',
        range: [ ASTNode.offset[0], ASTNode.offset[1] ]
      })

      // ASTNode.errors.push(textDocument.diagnostics.length - 1)

      // return textDocument.diagnostics

      return
    }
  }

  if (!_.isEmpty(ASTNode?.filters)) {
    // validate.filter(ASTNode, document, spec)
  }

  if (ASTNode?.type === TokenType.object || !_.isEmpty(ASTNode?.objects)) {
    // validate.object(ASTNode, textDocument)
  }

  if (ASTNode?.type === TokenType.control) {
    validate.control(ASTNode)
  }

  if (ASTNode?.type === TokenType.iteration) {
    // iterationValidation(ASTNode, document)
  }

  if (ASTNode?.type === TokenType.variable) {
    // variableValidation(ASTNode, document)
  }

  return ASTNode
}
