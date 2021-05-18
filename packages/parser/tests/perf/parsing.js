import { LiquidParser } from '../../package/index'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
import time from 'pretty-hrtime'

require('dotenv').config()

const { log } = console

/* -------------------------------------------- */
/* SETUP                                        */
/* -------------------------------------------- */

const FILE = 'tests/fixtures/tests.txt'
const TEXT = ({ fixture }) => ({
  ast: [],
  parseErrors: [],
  textDocument: {
    getText: () => fixture
  }
})

/* -------------------------------------------- */
/* PARSER                                       */
/* -------------------------------------------- */

const parser = new LiquidParser({
  engine: 'shopify',
  license: process.env.MASTER_KEY,
  context: false,
  frontmatter: false,
  whitespace: false,
  newlines: false,
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

/* -------------------------------------------- */
/* EXECUTE                                      */
/* -------------------------------------------- */

const start = process.hrtime()

/* START -------------------------------------- */

const document = parser.parse(
  TEXT({ fixture: readFileSync(resolve(FILE), 'utf8') })
)

/* END ---------------------------------------- */

const end = process.hrtime(start)

/* -------------------------------------------- */
/* LOGGING                                      */
/* -------------------------------------------- */

console.log(document.ast)

log(
  chalk`{magentaBright NO CONTEXT PARSING}: {dim ${FILE}} \n\n`,

  chalk`{bold AST}\n\n`,

  chalk`{green ${document.ast.length}} nodes parsed`,

  chalk.dim('\n\n----------------------------------------\n\n'),

  chalk`{bold Errors}\n\n`,

  chalk`{green ${parser.errors.length}} errors captured`,

  chalk.dim('\n\n----------------------------------------\n\n'),

  chalk`{bold Timings:}\n\n`,

  chalk`{cyanBright  ${time(end, { verbose: true })}}\n\n`
)
