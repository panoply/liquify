import { writeFile, readFile } from 'fs-extra'
import { resolve, basename } from 'path'
// import boxen from 'boxen'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
// import execa from 'execa'
// import chokidar from 'chokidar'
// import { log } from '../utils/export'
import { getCrypt } from '../utils/crypto'
import * as log from '../utils/logs'

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

const bundleInjections = ({ pkg }) => async ({ input, output }) => {

  const file = await stripJson(resolve(pkg, input))
  const json = jsonMinify(JSON.stringify(file))
  const yaml = YAML.stringify(file)
  const path = resolve(pkg, output)
  const base = basename(path)

  await writeFile(`${path}.json`, json)
  log.tree.deep.middle(chalk`{cyanBright JSON} into '{magenta ${base}.json}'`)

  await writeFile(`${path}.yaml`, yaml)
  log.tree.deep.middle(chalk`{yellowBright YAML} into '{magenta ${base}.yaml}'`)

}

const buildVariations = async (specs, base, output) => (item) => {

  console.log(item)

  if (!specs.grammar[item.variant]) {
    return
  }

  const { repository } = base
  const { object } = specs.grammar[item.variant]

  const file = {
    ...base,
    injectionSelector: '',
    name: item.grammar.name,
    scopeName: item.grammar.scopeName,
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

  console.log(file)

}

const readFiles = () => {

  //
}

/**
 * Default exports - Digested by the CLI
 *
 * @param {import('types').Options} state
 * @param {object} state prop values are the encoded names
 */
export default async (state) => {

  const { path: { pkg, filter }, argv: { output } } = state
  // console.log(state)
  const main = await stripJson(state.argv.config)
  const base = await stripJson(resolve(pkg, main.input))
  const specs = await getCrypt('grammar')

  log.tree.top('Liquid Language Grammars')

  const injections = bundleInjections(state.path)

  // console.log(resolve(pkg, output))
  const variations = buildVariations(specs, base, output)
  log.tree.middle(chalk.blue('Injections'))

  // for (const inject of main.injections) await injections(inject)

  // log.tree.deep.success(`${main.injections.length} grammars generated`)

  main.variations.forEach(await variations)

  // console.log(main)

}
