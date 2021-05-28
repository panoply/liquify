import test from 'ava'
import { LiquidParser } from '../package/index'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import time from 'pretty-hrtime'
import { config } from 'dotenv'

config()

const document = readFileSync(resolve('test/fixtures/blank.txt'), 'utf8').toString()

const server = {
  ast: [],
  errors: [],
  textDocument: { getText: () => document }
}

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

parser.engine('shopify')

test('FullDocument Parse', t => {

  const start = process.hrtime()
  const node = parser.parse(server)
  const end = process.hrtime(start)

  console.log(
    ...node.ast,
    parser.context,
    parser.errors,
    parser.getEmbeds(server)
  )

  t.log(time(end, { verbose: true }))
  t.pass()

})