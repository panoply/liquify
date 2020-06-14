import { Server } from '../../export'
import { DiagnosticSeverity, Range } from 'vscode-languageserver'
import { Characters, TokenTag, TokenType } from '../../parser/lexical'

/**
 * Object Validation
 *
 * @param {string} token
 * @param {import('types/specification').Object} spec
 */
function objectValidation (token, spec) {

  console.log('object', token)

}

/**
 * Control Validation
 *
 * @param {string} token
 * @param {import('types/specification').Tag} spec
 */
function controlValidation (token, spec) {

  console.log('control', token)

}

/**
 * Iteration Validation
 *
 * @param {string} token
 * @param {import('types/specification').Tag} spec
 */
function iterationValidation (token, spec) {

  console.log('iteration', token)

}

/**
 * Import Validation
 *
 * @param {string} token
 * @param {import('types/specification').Tag} spec
 */
function importValidation (token, spec) {

  console.log('import', token)

}

/**
 * Variable Validation
 *
 * @param {string} token
 * @param {import('types/specification').Tag} spec
 */
function variableValidation (token, spec) {

  console.log('import', token)

}

/**
 * String
 *
 * @param {object} ASTNode
 * @param {object} document
 * @param {object} spec
 */
export default function (ASTNode, document, spec) {

  const { diagnostics, textDocument } = document
  const { name, offset } = ASTNode

  /**
   * Invalid Character Detections
   *
   * @param {*} chars
   * @returns
   */
  function invalidChars (chars) {

    if (!chars.trim().length) return chars.trim()

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `Invalid character sequence detected at: "${chars}"`,
      range: {
        start: textDocument.positionAt(offset[0]),
        end: textDocument.positionAt(offset[1])
      }
    })

    return false

  }

  /**
   * Whitespace Dash
   *
   * When a tag contains a whitespace `-` dash character and
   * the specification whitespace property is `false` the tag
   * will be validated.
   *
   * @param {string} token
   * @returns
   */
  function whitespace (token) {

    if (!token.startsWith('-') && !token.endsWith('-')) {
      return tagName(token.slice(0, token.length - 1))
    }

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: 'Tag does not accept whitespace dashes!',
      range: {
        start: textDocument.positionAt(ASTNode.offset[0]),
        end: textDocument.positionAt(ASTNode.offset[1])
      }
    })

    return false

  }

  /**
   * Tag name
   *
   * @param {*} string
   * @returns
   */
  function tagName (token) {

    if (spec.type === 'object') {
      return objectValidation(token, spec)
    }

    return {
      associate: 1,
      control: controlValidation,
      comment: 3,
      embedded: 4
      // import: importValidation,
      // iteration: iterationValidation,
      // object: objectValidation,
      // variable: variableValidation
    }[spec.type || ''](token, spec)

    const trim = token.slice(token.indexOf(name) + name.length).trimStart()

    return
    if (ws === false) return false

    return dispatch(token.substring(ws.length + name.length))

  }

  /**
   * Tag name
   *
   * @param {*} string
   * @returns
   */
  function dispatch (token) {

    // const space = invalidChars(token.slice(0, token.indexOf(name)))

    // if (space === false) return false

    return control(token)

  }

  function control (token) {

    let string

    // const condition = /\s*\b[\w\-[\].]*\b(?=\s)/.exec(token)

    /* if (!condition) {

      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: 'Invalid condition was supplied',
        range: {
          start: textDocument.positionAt(offset[0]),
          end: textDocument.positionAt(offset[1])
        }
      })

      return false
    } */

    // string = token.slice(token.indexOf(condition) + condition.length)

    // console.log(string)

    const operators = /[!=<>]{2}|[<>]{1}|\bor\b|\band\b/.exec(string)

    /* if (!operators) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Invalid operator pattern at: ${operators[0]}`,
        range: {
          start: textDocument.positionAt(offset[0]),
          end: textDocument.positionAt(offset[1])
        }
      })
    } */

    // string = token.slice(token.indexOf(operators[0]) + operators[0].length)

    /* if (!/[a-zA-Z0-9_\s\r\t\n]/.test(string[0])) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Extrenous operator value at: ${string[0]}`,
        range: {
          start: textDocument.positionAt(offset[0]),
          end: textDocument.positionAt(offset[1])
        }
      })
      return false
    }
*/
    // console.log(token)

    return false

  }

  if (tag === TokenTag.close) {

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `Missing Start/End Token at: ${ASTNode.token[0]}`,
      range: {
        start: textDocument.positionAt(ASTNode.offset[0]),
        end: textDocument.positionAt(ASTNode.offset[1])
      }
    })

  } else {
    // whitespace(ASTNode.token[0].slice(2, ASTNode.token[0].length - 2))
  }

  // console.log(tag, ASTNode)

  return diagnostics

}
