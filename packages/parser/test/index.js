import test from 'ava'
import { LiquidParser } from '../package/index.es'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import time from 'pretty-hrtime'
import * as Specs from '@liquify/liquid-language-specs'
import chalk from 'chalk'
import { config } from 'dotenv'

config()

const ctx = new chalk.Instance({
  level: 2
})
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
  engine: 'shopify',
  frontmatter: false,
  whitespace: true,
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

  const s = await Specs.getSpecs(process.env.MASTER_KEY)

  parser.spec(s)

})

function AST (data) {

  return parser.parse(fixture(data))

}

const doc = readFileSync(resolve('test/fixtures/objects.txt'), 'utf8').toString()

test('FullDocument Parse', t => {

  // t.regex('fo%o', /^[^\s.[][a-zA-Z0-9$_-]+\b/)

  const start = process.hrtime()
  const node = AST({ fixture: doc })
  const end = process.hrtime(start)

  console.log(node.ast, node.parseErrors)
  // t.log(node[0].context.filter(i => i.type !== 'Whitespace').map(i => i.value).join(' '))
  t.log(time(end, { verbose: true }))
  t.pass()

})

/*
function grammar (string, capture) {

  const stringify = capture.stringify ? JSON.stringify(string) : string

  return (
    capture.stringify
      ? stringify.substring(1, stringify.length - 1)
      : stringify
  ).replace(capture.regex, i => ctx[capture.colour](i))

}

liquid_delimeters.forEach(({ title, capture, tests, nodes }) => {

  const string = tests.join('\n')

  test(title, t => {

    const node = AST({ fixture: string })

    if (node) {
      for (let x = 0; x < tests.length; x++) {

        const token = tests[x]
        const newline = x === tests.length - 1 ? '\n' : ''
        const ln = x >= 10 ? `${x}` : ` ${x}`

        // t.deepEqual(token, node)
        console.log(string, node)
        // console.log(token, nodes[x], nodes[x].every((i, k) => i === token[k]))
       // if (node[x]?.token.every((i, k) => i === token[k])) {
          // t.log(ctx.dim(ln), ctx.green('✔'), grammar(token.join(' '), capture), newline)
         // t.log(node[x])
       // } else {
       //   t.deepEqual(token, node[x])
       //   t.log(ctx.red.dim(ln), ctx.red('✖'), ctx.red(node[x]))
        //  throw t.log(ctx.magentaBright('ASTNode'), node[x])
        //}

      }
    }

    t.pass()

  })

}) */
