import test from 'ava'
import { LiquidParser } from '../package/index'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import time from 'pretty-hrtime'
import { config } from 'dotenv'

config()

const server = (textDocument) => ({
  ast: [],
  parseErrors: [],
  textDocument: { getText: () => textDocument },
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
  engine: 'shopify',
  license: process.env.MASTER_KEY,
  frontmatter: false,
  whitespace: true,
  newlines: true,
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

const document = readFileSync(resolve('tests/fixtures/objects.txt'), 'utf8').toString()

test('FullDocument Parse', t => {

  const start = process.hrtime()
  const node = parser.parse(server(document))
  const end = process.hrtime(start)

  console.log(
    ...node.ast,
    ...parser.context,
    parser.errors
  )

  t.log(time(end, { verbose: true }))
  t.pass()

})
