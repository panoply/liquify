import { writeFile, readFile, readdir } from 'fs-extra'
import { resolve, basename } from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { getCrypt } from '../utils/crypto'
import YAML from 'json-to-pretty-yaml'
import * as log from '../utils/logs'

/**
  * Read, strip and parse syntax json and jsonc files
  * Remove the `$schema` reference property and return object
  *
  * @param {string} path
  * @returns {Promise<object>}
  */
async function stripJson (path) {

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
async function getPatterns (input, includes = {}) {

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
async function generateFile ({ watch, prod, output }, generate, json) {

  const str = JSON.stringify(json, null, 2)
  const file = resolve(output, generate.output)

  log.perf.start('i')

  log.tree[1].while(chalk`{magentaBright ${generate.name || generate.file}}`)

  if (generate.formats.includes('json')) {
    await writeFile(`${file}.json`, prod ? jsonMinify(str) : str)
    log.tree[2].while(chalk`{greenBright change} {dim ${basename(file)}.json}`)
  }

  if (generate.formats.includes('yaml')) {
    await writeFile(`${file}.yaml`, YAML.stringify(json))
    log.tree[2].while(chalk`{greenBright change} {dim ${basename(file)}.yaml}`)
  }

  log.tree[2].end(
    chalk`{cyan ${log.perf.stop('i').preciseWords}}`
  )

}

/**
 * Generate Injection grammar bundles
 *
 * @param {object} context
 * @param {import('types').GrammarGenerator} generate
 * @returns
 */
async function applyIncludes ({ liquid, include }, generate) {

  const prepend = liquid.patterns.filter(({ include }) => include[0] === '#')
  const append = liquid.patterns.filter(({ include }) => include[0] !== '#')
  const file = { ...liquid }

  for (const scope of generate.grammar.include) {
    if (file.repository[scope]) continue
    file.patterns = [ ...prepend, { include: `#${scope}` }, ...append ]
    file.repository = { ...liquid.repository, [scope]: include[scope] }
  }

  return file
}

/**
 * Applies specification supports to each grammar according to
 * the spec variation name.
 *
 * @param {object} specs
 * @param {object} generate
 * @returns
 */
async function applySpecExtends (specs, { repository }) {

  if (!specs || !specs.object) return {}

  const condition = (pattern, scope) => (pattern ? scope : {})

  await ({
    objects: condition(specs.object, {
      patterns: [
        ...repository.objects.patterns,
        {
          name: 'support.class.liquid',
          match: `\\b(${specs.object.join('|')})\\b`
        }
      ]
    })
  })
}

/**
 * Generat the package context object
 *
 * @param {object} context
 * @returns
 */
async function generateContext (context) {

  const config = await stripJson(context.argv.config)

  return {
    ...context,
    config,
    specs: await getCrypt('grammar'),
    files: {
      liquid: await stripJson(resolve(context.argv.input, 'liquid.jsonc')),
      inject: await getPatterns(resolve(context.argv.input, 'inject')),
      include: await getPatterns(resolve(context.argv.input, 'include'))
    }
  }
}

/**
 * Generate Injection grammar bundles
 *
 * @param {import('types').GrammarContext} context
 * @param {import('types').GrammarGenerator} generate
 * @returns
 */
async function generateInjection ({ argv, files }, generate) {

  if (generate.type === 'injection') {
    if (!generate.grammar.injectionSelector) return console.log('Missing injectionSelector')

    await generateFile(argv, generate, {
      ...files.inject[generate.file],
      scopeName: generate.grammar.scopeName,
      injectionSelector: generate.grammar.injectionSelector.join(', ')
    })
  }
}

/**
 * Build Grammars. This function will build variation grammars
 * and export the injection grammars.
 *
 * @param {import('types').GrammarContext} context
 */
async function build (context) {

  for (const generate of context.config.generate) {

    if (generate.type === 'injection') {
      await generateInjection(context, generate)
      continue
    }

    const variant = await applyIncludes(context.files, generate)

    await generateFile(context.argv, generate, {
      ...variant,
      name: generate.grammar.name,
      scopeName: generate.grammar.scopeName,
      repository: {
        ...variant.repository,
        ...await applySpecExtends(context.specs[generate.name], variant)
      }
    })

  }

}

async function watch (path) {

  const { context } = this
  const base = basename(path)
  const name = base.substring(0, base.lastIndexOf('.json'))

  let generate

  // This is the base grammar
  if (name === 'liquid') {

    context.files[name] = { ...await stripJson(path) }

    generate = context.config.generate.filter(({ type }) => (
      type === 'variation'
    ))

  } else if (context.files.inject[name]) {

    context.files.inject[name] = { ...await stripJson(path) }

    generate = context.config.generate.filter(({ type, file }) => (
      type === 'injection' && file === name
    ))

  } else if (context.files.include[name]) {

    context.files.include[name] = { ...await stripJson(path) }

    generate = context.config.generate.filter(({ grammar }) => (
      grammar.include && grammar.include.includes(name)
    ))

  }

  return build({ ...context, config: { generate } })

}

/**
 * Default exports - Digested by the CLI
 *
 * @param {import('types').Options} state
 * @param {object} state prop values are the encoded names
 */
export default async (options) => {

  log.perf.start()
  log.tree[0].start('Liquid Language Grammars')

  const context = await generateContext(options)

  await build(context)

  if (context.argv.watch) {

    // console.log(config)
    log.tree[0].while(chalk`{blue watching}`)

    const watcher = chokidar.watch(`${context.argv.input}/**`, {
      persistent: true,
      interval: 100
    })
    // const change = watch(output, state)

    // @ts-ignore
    global.watch = true
    watcher.on('change', watch.bind({ context })).on('error', log.error)

  }

  // log.tree[1].end(chalk`{dim Generated in }{whiteBright ${log.perf.stop().preciseWords}}`)

}
