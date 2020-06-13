import { DiagnosticSeverity } from 'vscode-languageserver'
import { Characters } from '../../parser/lexical'

/* -------------------------------------------- */
/*                   CONSTANTS                  */
/* -------------------------------------------- */

/**
 * Captures condition, eg: `{% if condition  == compare %}` > `condition`
 */
const regexCondition = /.*?(?=[!=<>]+|\bor\b|\band\b|-?%})/s

/**
 * Captures a valid condition block, eg: `!===` > `!=`
 */
const regexValidCondition = /[a-zA-Z_0-9]/

/**
 * Captures control operators, eg: `{% if condition == true %}` > `==`
 */
const regexOperators = /[!=<>]+|\bor\b|\band\b/

/**
 * Captures a valid operator sequence, eg: `!===` > `!=`
 */
const regexValidOperators = /<=|>=|==|>|<|!=|\bor\b|\band\b/

/* -------------------------------------------- */
/*                  VALIDATION                  */
/* -------------------------------------------- */

/**
 * Control Validation
 *
 * @param {import('types/ast').AST} AST[]
 * @param {import('types/document').Document} Document
 * @param {import('types/specification').Tag} spec
 */
export default (
  { name, token: [ tag ], offset: [ offset ] }
  , { textDocument, diagnostics }
  , spec
) => {

  let charOffset = tag.indexOf(name) + name.length
    , string = tag.slice(charOffset)

  const isEmpty = new RegExp(`(?<=${name})\\s*(?=-?%})`).exec(tag)

  if (isEmpty) {
    return diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      message: 'Empty condition expression detected',
      range: {
        start: textDocument.positionAt(offset + charOffset),
        end: textDocument.positionAt(offset + charOffset + isEmpty[0].length)
      }
    })
  }

  /**
   * Recursive walk
   *
   * @param {string} token
   * @returns {Function}
   */
  return (function walk (token) {

    const condition = regexCondition.exec(token)[0].trim()
    const condIndex = token.indexOf(condition)

    console.log('is token', token)

    string = token.slice(condIndex + condition.length)
    charOffset = charOffset + condIndex

    console.log('is condition', string)

    if (!regexValidCondition.test(condition[0])) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Invalid condition expression: ${condition}`,
        range: {
          start: textDocument.positionAt(offset + charOffset),
          end: textDocument.positionAt(offset + charOffset + condition.length)
        }
      })
    }

    const operators = regexOperators.exec(string)
    if (operators) {

      charOffset = charOffset + operators[0].length
      string = string.slice(string.indexOf(operators[0]) + operators[0].length)
      console.log('is operator', string)

      if (operators[0].length === 1 && operators[0].charCodeAt(0) === Characters.EQS) {
        console.log('is single', string, offset + charOffset)
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: `Extrenous operator detected ${operators[0]} `,
          range: {
            start: textDocument.positionAt(offset + charOffset),
            end: textDocument.positionAt(offset + charOffset + 1)
          }
        })
      }

      const isvalid = regexValidOperators.exec(operators[0])
      if (isvalid) {

        const extrenous = operators.slice(isvalid[0].length)
        if (operators[0].length > 2) {
          diagnostics.push({
            severity: DiagnosticSeverity.Error,
            message: `Extrenous operator detected ${extrenous} `,
            range: {
              start: textDocument.positionAt(offset + charOffset + isvalid[0].length),
              end: textDocument.positionAt(offset + charOffset + operators[0].length)
            }
          })
        }

        return walk(string)

      } else {

      }

      // return walk(string)

    }

  })(string)

}
