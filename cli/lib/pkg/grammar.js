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
import erre from 'erre'
import * as log from '../utils/logs'

import YAML from 'json-to-pretty-yaml'
import { config } from 'process'

/**
 * Read and strip JSON file of comments
 *
 */
const stripJson = async (path) => {

  const jsonc = await readFile(path)

  if (!jsonc.length) return null

  const strip = stripJsonComments(jsonc.toString())
  const parse = JSON.parse(strip)

  if (parse.$schema) delete parse.$schema

  return parse

}

const inclusions = async (path, grammar, data = { patterns: [], includes: {} }) => {

  for (const include in grammar.include) {

    const file = await stripJson(resolve(path.input, `includes/${include}.json`))
    const name = include.substring(0, include.length - 5)

    if (!file) continue

    data.patterns.push({ include: `#${name}` })
    data.includes[name] = { patterns: file.patterns }

  }

  return data

}

const variations = async ({ path, argv, specs, base }, { name, grammar, output }) => {

  const spec = specs[name]

  if (!spec) return console.log('No specification for this variation')

  const HTMLGrammar = base.patterns.pop()

  if (!HTMLGrammar) return console.log('Missing HTML TextMate include')

  const { patterns, includes } = await inclusions(path, grammar)
  const dest = resolve(argv.output, output)

  const tmLanguage = JSON.stringify({
    ...base,
    name: grammar.n,
    scopeName: grammar.scopeName,
    patterns: [
      ...base.patterns,
      ...patterns,
      HTMLGrammar
    ],
    repository: {
      ...base.repository,
      objects: {
        patterns: [
          ...base.repository.objects.patterns,
          {
            name: 'support.class.liquid',
            match: `\\b(${spec.object && spec.object.join('|')})\\b`
          }
        ]
      },
      ...includes
    }
  }, null, 2)

  console.log(argv.prod)
  return [
    [ `${dest}.json`, argv.prod ? jsonMinify(tmLanguage) : tmLanguage ],
    [ `${dest}.yaml`, YAML.stringify(tmLanguage) ]
  ]

}

const injections = async ({ path: { pkg }, argv }, { output, input }) => {

  const parse = await stripJson(resolve(pkg, input))
  const string = JSON.stringify(parse, null, 2)
  const dest = resolve(argv.output, output)

  return [
    [ `${dest}.json`, argv.prod ? jsonMinify(string) : string ],
    [ `${dest}.yaml`, YAML.stringify(string) ]
  ]
}

const stream = erre(
  async context => ({
    ...context,
    specs: await getCrypt('grammar'),
    config: await stripJson(context.argv.config)
  }),
  async context => ({
    ...context,
    base: await stripJson(resolve(context.path.pkg, context.config.input)),
    injections: context.config.package.map((config) => (
      config.type === 'injection'
        ? injections(context, config)
        : variations(context, config)
    ))
  }),
  async context => Promise.all([
    ...context.injections,
    ...context.config.variations.map(config => variations(context, config))
  ]),
  async context => context.filter(Boolean).forEach(async ([ [ file, string ] ]) => (
    await writeFile(file, string).then(() => (
      log.tree.deep.middle(chalk`{cyanBright JSON} into '{magenta ${basename(file)}}'`)
    ))
  ))
)

/**
 * Default exports - Digested by the CLI
 *
 * @param {import('types').Options} state
 * @param {object} state prop values are the encoded names
 */
export default async (context) => {

  // const config = await stripJson(context.argv.config)
  // const liquid = await stripJson(resolve(context.path.pkg, config.input))
  // const specs = await getCrypt('grammar')

  stream.push(context)
  stream.on.error(console.log)
  // stream.on.value(console.log)

  // stream.on.value(async i => (await Promise.all(i.config.injections)
  // ).forEach(i => console.log(i)))
  log.tree.top('Liquid Language Grammars')

  // for (const inject of config.injections) await injections({ config, inject })

  //  const injections = bundleInjections(state.path)

  // console.log(resolve(pkg, output))
  // const variations = buildVariations(pkg, specs, base, output)
  // log.tree.middle(chalk.blue('Injections'))

  // for (const inject of main.injections) await injections(inject)

  // log.tree.deep.success(`${main.injections.length} grammars generated`)

  // main.variations.forEach(await variations)

  // console.log(main)

}
