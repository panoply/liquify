import { writeFile, readdir, readFile } from 'fs-extra'
import { resolve, basename } from 'path'
import { getCrypt } from '../utils/crypto'
import boxen from 'boxen'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
import execa from 'execa'
import chokidar from 'chokidar'
import { log, errorHandler } from '../utils/common'
import YAML from 'json-to-pretty-yaml'

const stripJson = async path => {

  const jsonc = await readFile(path)
  const strip = stripJsonComments(jsonc.toString())
  const parse = JSON.parse(strip)

  if (parse.$schema) delete parse.$schema

  return parse

}

const createGrammar = async type => {

  // const dir = prompt.bundle === 'include' ? prompt.bundle : 'injects'
  // const path = `./packages/grammar/${dir}/${prompt.filename}.json`

  /* await writeFile(path, JSON.stringify(dir === 'include' ? {
    $schema: 'https://cdn.liquify.dev/schema/include-tmlanguage.json',
    patterns: []
  } : {
    $schema: 'https://cdn.liquify.dev/schema/tmlanguage.json',
    injectionSelector: '',
    scopeName: '',
    patterns: []
  }, null, 2)) */

  // return prompt

}

const bundleInjections = dir => async ({ input, output }) => {

  const file = await stripJson(input)
  const json = jsonMinify(JSON.stringify(file))
  const yaml = YAML.stringify(file)

  await writeFile(`${dir}/${output}.json`, json)
  log(chalk`{cyan JSON Injection} {green ${output}.json}`)

  await writeFile(`${dir}/${output}.yaml`, yaml)
  log(chalk`{yellow YAML Injection} {green ${output}.yaml}`)

}

const buildVariations = async (specs, base, output) => (item) => {

  if (!specs[item.variant]) {
    return
  }

  const { repository } = base
  const { object } = specs[item.variant]

  const file = {
    ...base,
    injectionSelector: '',
    scopeName: '',
    patterns: [],
    repository: {
      ...repository,
      objects: {
        patterns: [
          ...repository.objects.patterns,
          {
            name: 'support.class.liquid',
            match: `\\b${object}\\b`
          }
        ]
      }
    }
  }

}

const readFiles = () => {

  //
}

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

  const { output } = config
  const cwd = process.cwd()
  const main = await stripJson(config.main)
  const base = await stripJson(resolve(cwd, main.input))
  const specs = await getCrypt('grammar')
  const injections = bundleInjections(output)
  const variations = buildVariations(specs, base, output)

  main.injections.forEach(await injections)
  main.variations.forEach(await variations)

  // console.log(specs)

}
