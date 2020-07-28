import test from 'ava'
import { LiquidParser } from '../package/index.es'
import specs from '@liquify/liquid-language-specs'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import time from 'pretty-hrtime'

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

  const parser = new LiquidParser()

  return parser.parse(fixture(data), spec).ast

}

const doc = readFileSync(resolve('test/fixtures/text.txt'), 'utf8').toString()

test('FullDocument Parse', t => {

  const start = process.hrtime()
  const node = AST({ fixture: doc }, t.context)
  const end = process.hrtime(start)

  t.log(node, node[0].context)
  // t.log(node[0].context.filter(i => i.type !== 'Whitespace').map(i => i.value).join(' '))
  t.log(time(end, { verbose: true }))
  t.pass()

})
