import _ from 'lodash'
import { DiagnosticSeverity } from 'vscode-languageserver'

/* -------------------------------------------- */
/*                   CONSTANTS                  */
/* -------------------------------------------- */

/**
 * Captures condition, eg: `{% if condition  == compare %}` is `condition`
 */
const regexCondition = /.*?(?=[!=<>]+|\b(?:and|or)\b|-?%})/s

/**
 * Captures a valid condition block, eg: `(conditon)` is invalid
 */
const regexValidCondition = /_?\w+[0-9[\]]*/

/**
 * Captures control operators, eg: `{% if condition == true %}` > `==`
 */
const regexOperators = /[!=<>]+|\bor\b|\band\b/

/**
 * Captures a valid operator sequence, eg: `!===` > `!=`
 */
const regexValidOperators = /(?<=\w|\s+)(?:[<>]|<=|>=|==|!=|\bor\b|\band\b)/

/**
 * Captures the end and/or truthy portion of a control eg: `{% if tag %}` > `tag %}`
 */
const regexConditionTruth = /.*?(?=-?%})/s

/* -------------------------------------------- */
/*                  VALIDATION                  */
/* -------------------------------------------- */

/**
 * Control Validation
 *
 * @param {import('types/ast').AST} AST[]
 * @param {import('src/provide/documents').Document} Document
 */
export default (
  { name, diagnostics, token: [ tag ], offset: [ start, end ] }
) => {

  const isEmpty = new RegExp(`(?<=${name})\\s*(?=-?%})`).exec(tag)
  const charOffset = tag.indexOf(name) + name.length

  let string = tag.slice(charOffset)
    , compare
    , position

  if (isEmpty) {
    return diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      message: 'Empty condition expression detected',
      range: [ start + charOffset, start + charOffset + isEmpty[0].length ]
    })
  }

  /**
   * Recursive walk the token string. The function will be re-called
   * until it reaches the ending delimeter.
   *
   * @param {string} token
   * @returns {Function}
   */
  return (function walk (token) {

    const condition = regexCondition.exec(token)
    const name = regexValidCondition.exec(condition[0])

    if (!name) {
      return diagnostics.push({
        severity: DiagnosticSeverity.Error,
        source: 'liquify',
        message: `Invalid condition was expressed at: ${condition[0]}`,
        range: [ start, end ]
      })
    }

    if (compare === name[0]) {

      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        source: 'liquify',
        message: `Condition is indentical to comparison: ${compare} is equal to ${name[0]}`,
        range: [ start, end ]
      })
    }

    compare = name[0]
    string = token.slice(condition[0].indexOf(compare) + compare.length)

    const operators = regexOperators.exec(string)

    if (operators) {

      const chars = regexValidOperators.exec(string)
      if (chars) {

        string = string.slice(string.indexOf(chars[0]) + chars[0].length)

        if (operators[0].length !== chars[0].length) {

          position = start + tag.indexOf(string)
          string = string.slice(operators[0].length - chars[0].length)

          diagnostics.push({
            severity: DiagnosticSeverity.Error,
            message: `Extrenous operator values: "${operators[0].trim()}"`,
            source: 'liquify',
            tags: [ 1 ],
            range: [ position, position + operators[0].length - chars[0].length ]
          })
        }

        return walk(string)
      }

      string = string.slice(string.indexOf(operators[0]) + operators[0].length)
      position = start + tag.indexOf(string)

      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Invalid operator sequence at: ${condition[0].trim()}`,
        source: 'liquify',
        range: [ position - operators[0].length, position ]
      })

      return walk(string)

    }

    const truth = regexConditionTruth.exec(string)

    if (truth[0].trim().length > 0) {

      string = string.slice(string.indexOf(truth[0]))
      position = start + tag.indexOf(string)

      return diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Invalid characters in condition at: ${truth[0]}`,
        range: [ position, position + truth[0].length ]
      })
    }

  })(string)

}
