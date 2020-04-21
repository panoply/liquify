import { DiagnosticSeverity } from 'vscode-languageserver'
import { Characters, TokenTag, TokenType } from '../../parser/lexical'
import { Server } from '../../export'


export function context (token, name) {

  const left = token.indexOf(name)
  const right = token.match(/\s*-?%?}?}/).index
  const inner = token.substring(left, right)

  return {
    delimeters: [ left, right ],
    content: inner.split(/[\s\t\n]/).filter(i => i.length > 0)
  }

}

/**
 *
 *
 * @export
 * @param {*} token
 * @param {*} name
 */
export function whitespace (token, name) {

  const index = token.charCodeAt(0) === Characters.LCB ? 2 : token.length - 3
  const leftDelimeter = string.indexOf(tag)
  const rightDelimeter = string.match(/\s*-?%}/).index
  const delimeter = string.substring(0, name))

  whitespace(string.substring(rDelimeter, string.length))

  return token.charCodeAt(index) === Characters.DSH && {
    source: Server.engine,
    severity: DiagnosticSeverity.Error,
    message: 'Tag does not accept whitespace dash'
  }

}
