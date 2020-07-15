import test from 'ava'
import { Parser } from '../../src/parser/parse'
import specs from '@liquify/liquid-language-specs'
import chalk from 'chalk'
import liquid_tokens from './cases/liquid-tokens'
import html_tokens from './cases/html-tokens'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ctx = new chalk.Instance({
  level: 2
})

const fixture = ({ fixture }) => ({
  ast: [],
  parseErrors: [],
  textDocument: { getText: () => fixture },
  __test: {
    associates: [
      {
        name: 'script',
        kind: 'html',
        language: 'javascript'
      },
      {
        name: 'script',
        kind: 'html',
        language: 'json',
        mimetype: 'application/json'
      },
      {
        name: 'style',
        kind: 'html',
        language: 'css'
      },
      {
        name: 'style',
        kind: 'html',
        language: 'scss',
        mimetype: 'lang/scss'
      }
    ]
  }

})

test.before('TOKEN STRING PARSING', async t => {

  t.context.spec = (await specs('sissel siv')).shopify()

})

function AST (data, { spec }) {

  return Parser(fixture(data), spec).scan().ast

}

function grammar (string, capture) {

  const stringify = capture.stringify ? JSON.stringify(string) : string

  return (
    capture.stringify
      ? stringify.substring(1, stringify.length - 1)
      : stringify
  ).replace(capture.regex, i => ctx[capture.colour](i))

}
/*
html_tokens.forEach(({ title, capture, tests, nodes }) => {

  const string = tests.flat(1).join('\n')

  // console.log(string)
  test(title, t => {

    const node = AST({ fixture: string }, t.context)

    if (node) {
      for (let x = 0; x < tests.length; x++) {

        const token = tests[x]
        const newline = x === tests.length - 1 ? '\n' : ''
        const ln = x >= 10 ? `${x}` : ` ${x}`

        // console.log(token, nodes[x], nodes[x].every((i, k) => i === token[k]))
        if (node[x].token.every((i, k) => i === token[k])) {
          t.log(ctx.dim(ln), ctx.green('✔'), grammar(token.join(' '), capture), newline)
          // t.log(node[x])
        } else {
          t.deepEqual(token, node[x].token)
          t.log(ctx.red.dim(ln), ctx.red('✖'), ctx.red(node[x].token))
          throw t.log(ctx.magentaBright('ASTNode'), node[x])
        }

      }
    }

    t.pass()

  })

})

liquid_tokens.forEach(({ title, capture, tests }) => {

  const string = tests.join('\n')

  test(title, t => {

    const node = AST({ fixture: string }, t.context)

    for (let x = 0; x < tests.length; x++) {

      const token = tests[x]
      const newline = x === tests.length - 1 ? '\n' : ''
      const ln = x >= 10 ? `${x}` : ` ${x}`

      if (node[x]?.token[0] === token) {
        t.log(ctx.dim(ln), ctx.green('✔'), grammar(token, capture), newline)
      } else {
        t.assert(token, node[x].token[0])
        t.log(ctx.red.dim(ln), ctx.red('✖'), ctx.red(node[x].token))
        throw t.log(ctx.magentaBright('ASTNode'), node[x])
      }
    }

    t.pass()

  })

}) */
test('FullDocument Parse', t => {

  const node = AST({
    fixture: readFileSync(resolve('test/fixtures/text.txt'), 'utf8').toString()
  }, t.context)

  console.log(node)

  t.pass()

})
