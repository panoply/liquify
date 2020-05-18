import { writeFile, readFile, readdir } from 'fs-extra'
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

/**
  * Read, strip and parse syntax json and jsonc files
  * Remove the `$schema` reference property and return object
  *
  * @param {string} path
  * @returns {Promise<object>}
  */
const stripJson = async (path) => {

  const jsonc = await readFile(path)

  if (!jsonc.length) return null

  const strip = stripJsonComments(jsonc.toString())
  const parse = JSON.parse(strip)

  if (parse.$schema) delete parse.$schema

  return parse

}

/**
 * Collect are grammar pattern partial files from their respective
 * directories and assign their parsed values to an object
 *
 * @param {string} input
 * @param {object} includes
 */
const getPatterns = async (input, includes = {}) => {

  const files = await readdir(input)

  for (const file of files) {
    const name = file.replace('.json', '')
    const json = await stripJson(resolve(input, file))
    if (json) includes[name] = json
  }

  return includes

}

/**
 * Prepare bundles for write. Stringify the generates JSON
 * and apply export formats.
 *
 * @param {import('types').Argv} argv
 * @param {import('types').GrammarGenerator} generate
 * @param {object} json
 */
const generateFile = async ({ prod, output }, generate, json) => {

  const str = JSON.stringify(json, null, 2)
  const file = resolve(output, generate.output)

  if (generate.formats.includes('json')) {
    await writeFile(`${file}.json`, prod ? jsonMinify(str) : str).then(() => (
      log.tree.deep.middle(chalk`{cyanBright JSON} into '{magenta ${basename(file)}}'`)
    ))
  }

  if (generate.formats.includes('yaml')) {
    await writeFile(`${file}.yaml`, YAML.stringify(json)).then(() => (
      log.tree.deep.middle(chalk`{yellow YAML} into '{magenta ${basename(file)}}'`)
    ))
  }

}

/**
 * Build Grammars. This function will build variation grammars
 * and export the injection grammars.
 *
 * @param {import('types').GrammarContext} context
 * @param {import('types').GrammarGenerator} generate
 */
const buildGrammar = async ({ argv, specs, imports }, generate) => {

  const { name, grammar, type } = generate

  if (type === 'injection') {
    if (!grammar.injectionSelector) return console.log('Missing injectionSelector')
    return generateFile(argv, generate, {
      ...imports.inject[generate.file],
      scopeName: generate.grammar.scopeName,
      injectionSelector: generate.grammar.injectionSelector.join(', ')
    })
  }

  if (!specs[name]) {
    return console.log('No specification for this variation')
  }

  const file = { ...imports.standard }
  const prepend = file.patterns.filter(({ include }) => include[0] === '#')
  const append = file.patterns.filter(({ include }) => include[0] !== '#')

  for (const scope of grammar.include) {
    if (file.repository[scope]) continue
    file.patterns = [ ...prepend, { include: `#${scope}` }, ...append ]
    file.repository = { ...imports.standard.repository, [scope]: imports.include[scope] }
  }

  return generateFile(argv, generate, {
    ...file,
    name: grammar.name,
    scopeName: grammar.scopeName,
    repository: {
      ...file.repository,
      objects: {
        patterns: [
          ...file.repository.objects.patterns,
          {
            name: 'support.class.liquid',
            match: `\\b(${specs[name].object && specs[name].object.join('|')})\\b`
          }
        ]
      }
    }
  })

}

const stream = erre(
  async context => ({
    ...context,
    specs: await getCrypt('grammar'),
    config: await stripJson(context.argv.config),
    imports: {
      include: await getPatterns(resolve(context.argv.input, 'include')),
      inject: await getPatterns(resolve(context.argv.input, 'inject'))
    }
  }),
  async context => ({
    ...context,
    imports: {
      ...context.imports,
      standard: await stripJson(resolve(context.argv.input, 'liquid.jsonc'))
    }
  }),
  async context => ({
    ...context,
    ...context.config.generate.map(async config => await buildGrammar(context, config))
  })
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
  stream.on.value(console.log)

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
