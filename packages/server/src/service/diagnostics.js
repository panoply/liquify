import _ from 'lodash'
import { DiagnosticSeverity } from 'vscode-languageserver'
import { TokenType } from '../parser/lexical'
import { Document } from './../export'
import * as validate from './validations/index'

export default (textDocument, ASTNode, spec) => {

  if (!spec || !ASTNode) return

  const { token: [ token ] } = ASTNode

  if (spec.whitespace) {
    if (token.startsWith('-') || token.endsWith('-')) {

      textDocument.diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: 'Tag does not accept whitespace dashes!',
        range: Document.range(ASTNode.offset[0], ASTNode.offset[1])
      })

      return textDocument.diagnostics

    }
  }

  if (!_.isEmpty(ASTNode?.filters)) {
    // validate.filter(ASTNode, document, spec)
  }

  if (ASTNode?.type === TokenType.object || !_.isEmpty(ASTNode?.objects)) {
    validate.object(ASTNode, textDocument)
  }

  if (ASTNode?.type === TokenType.control) {
    validate.control(ASTNode, textDocument)
  }

  if (ASTNode?.type === TokenType.iteration) {
    // iterationValidation(ASTNode, document)
  }

  if (ASTNode?.type === TokenType.variable) {
    // variableValidation(ASTNode, document)
  }

  return textDocument.diagnostics
}
