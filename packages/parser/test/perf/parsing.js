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

const FILE = 'test/fixtures/tests.txt'

const reads = readFileSync(resolve(FILE), 'utf8').toString()

const server = {
  languageId: 'liquid',
  version: 1,
  text: reads,
  uri: 'full_parse',
  getText: () => reads
}

/* -------------------------------------------- */
/* PARSER                                       */
/* -------------------------------------------- */

const parser = LiquidParser({
  engine: 'shopify',
  license: process.env.MASTER_KEY,
  context: true,
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

/* -------------------------------------------- */
/* EXECUTE                                      */
/* -------------------------------------------- */

const start = process.hrtime()

/* START -------------------------------------- */

const document = parser.start(server)

/* END ---------------------------------------- */

const end = process.hrtime(start)

/* -------------------------------------------- */
/* LOGGING                                      */
/* -------------------------------------------- */

// console.log(document.ast)

log(
  chalk`{magentaBright NO CONTEXT PARSING}: {dim ${FILE}} \n\n`,

  chalk`{bold AST}\n\n`,

  chalk`{green ${parser.ast().nodes.length}} nodes parsed`,

  chalk.dim('\n\n----------------------------------------\n\n'),

  chalk`{bold Errors}\n\n`,

  chalk`{green ${parser.ast().errors.length}} errors captured`,

  chalk.dim('\n\n----------------------------------------\n\n'),

  chalk`{bold Timings:}\n\n`,

  chalk`{cyanBright  ${time(end, { verbose: true })}}\n\n`
)
