import test from 'ava'
import { LiquidParser } from '../package/index.es'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import time from 'pretty-hrtime'
import * as Specs from '@liquify/liquid-language-specs'

const fixture = ({ fixture }) => ({
  ast: [],
  parseErrors: [],
  textDocument: {
    getText: () => fixture
  },
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

const parser = new LiquidParser({
  engine: 'standard',
  frontmatter: false,
  whitespace: false,
  range: true,
  offsets: true,
  process_unknown: true,
  parse_html: false,
  skip_strings: false,
  html_comments: false,
  multiline_comments: true,
  inline_comments: true,
  track_variables: true,
  error_tolerance: 1,
  exclude: []
})

test.before('TOKEN STRING PARSING', async t => {

  const s = await Specs.getSpecs('sissel siv')

  parser.spec(s)

})

function AST (data) {

  return parser.parse(fixture(data))

}

const doc = readFileSync(resolve('test/fixtures/text.txt'), 'utf8').toString()

test('FullDocument Parse', t => {

  const start = process.hrtime()
  const node = AST({ fixture: doc })
  const end = process.hrtime(start)

  t.log(node.ast[0]?.context(), node.ast, node.parseErrors)
  // t.log(node[0].context.filter(i => i.type !== 'Whitespace').map(i => i.value).join(' '))
  t.log(time(end, { verbose: true }))
  t.pass()

})
