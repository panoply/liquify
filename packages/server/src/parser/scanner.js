// @ts-nocheck
import _ from 'lodash'
import { Characters, TokenTag } from './lexical'
import tokenizer from './tokenize'
import * as parse from './utils'

const regexp = /<\/?\b(script|style)\b[^<>]*>|{%[\s\S]*?\b(?:end)?(\w+)\b[\s\S]?[^%]*?%}|{{2}[\s\S]*?\b(\w+)\b[\s\S]?[^{}]*?}{2}/g

/**
 * Parser
 *
 * Parsing is execute on each document change. When changes length is of value 1
 * and the change is detected within a token in range parsing will begin from the
 * offset starting position of that token, this allows for a more incremental parse
 * opposed the full document.
 *
 * @param {import('../../../release/vscode-liquify/server/node_modules/defs').DocumentModel} params
 * @param {import('vscode-languageserver').TextDocumentContentChangeEvent} changes[]
 * @param {object} options
 * @returns
 */
export default (
  document
  , content = document.getText()
  , ast = []
  , index = undefined
) => {

  const tokenize = tokenizer(document, ast)

  let match
    , increment
    , offset = 0

  while ((match = regexp.exec(content)) !== null) {

    if (match.index === regexp.lastIndex) regexp.lastIndex++

    const [ token, name ] = match.filter(Boolean)
    const spec = parse.getTokenSpec(token, name)

    if (spec) {

      const node = {
        name,
        token: [ token ],
        offset: index ? [
          match.index + index,
          match.index + token.length + index
        ] : [
          match.index + offset,
          match.index + offset + token.length
        ]
      }

      spec.type === 'object' || spec?.singular
        ? spec?.within
          ? tokenize.childToken(node, spec)
          : tokenize.singularToken(node, spec)
        : parse.isTokenTagEnd(token, name)
          ? tokenize.closeToken(node)
          : tokenize.startToken(node, spec)

      // if (node?.languageId && ast[ast.length]) tokenize.embeddedDocument(node)

    }

    //! index || offsets.push(...node.offset)
    content = content.slice(regexp.lastIndex)
    offset = offset === 0 ? regexp.lastIndex : offset + regexp.lastIndex
    regexp.lastIndex = 0

  }

  /**
   * Return the composed AST record
   */
  return ast

}
