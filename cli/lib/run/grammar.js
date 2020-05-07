import { writeFile, readdir, readFile } from 'fs-extra'
import { resolve, basename } from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { log, errorHandler } from '../utils/common'

const config = {
  grammar: './packages/grammar/liquid.jsonc',
  specs: './packages/specs/variations'
}

const writeSyntax = async pattern => {

  const jsonc = await readFile(config.grammar)
  const strip = JSON.parse(stripJsonComments(jsonc.toString()))

  console.log(strip)

  return pattern

}
/*
const generate = async type => {

  const dir = prompt.bundle === 'include' ? prompt.bundle : 'injects'
  const path = `./packages/grammar/${dir}/${prompt.filename}.json`

  await writeFile(path, JSON.stringify(dir === 'include' ? {
    $schema: 'https://cdn.liquify.dev/schema/include-tmlanguage.json',
    patterns: []
  } : {
    $schema: 'https://cdn.liquify.dev/schema/tmlanguage.json',
    injectionSelector: '',
    scopeName: '',
    patterns: []
  }, null, 2))

  return prompt

} */

/**
 * Default exports - Digested by the CLI
 *
 * @param {object} config
 * @param {object} state prop values are the encoded names
 */
export default async (config, state = {
  specs: {},
  cache: {},
  grammar: {},
  parsing: {},
  encrypt: {}
}) => {

  const cwd = process.cwd()
  const main = resolve(cwd, config.main)
  const input = resolve(cwd, config.input)
  const output = resolve(cwd, config.output)

  console.log(main)
  const jsonc = await readFile(main)
  const strip = JSON.parse(stripJsonComments(jsonc.toString()))

  console.log(strip)

  //  console.log(cwd)

}
