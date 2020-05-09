import { writeFile, readdir, readFile } from 'fs-extra'
import { resolve, basename } from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
import Crypto from 'cryptorjs'
import chokidar from 'chokidar'

/**
 * CONSTANTS
 */
const SECRET = 'sissel siv'

/**
 * GLOBALS
 */
const { log } = console

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {string} output the export output
 * @param {object} json the JSON string to be encrypted
 */
const errorHandler = file => error => {

  const printError = chalk`{red ${file}}\n${error}\n`
  return log(chalk`{redBright Error} in ${printError}`)

}

/**
 * Write module JSON export as an AES string encryption and
 * use an MD5 hash for module name
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {string} output the export output
 * @param {object} json the JSON string to be encrypted
 */
const encryptFile = async (name, output, state, json) => {

  const crypto = new Crypto(SECRET)
  const encryptJSON = crypto.encode(json)
  const encryptID = crypto.encode(name)

  await writeFile(`${output}/${encryptID}.js`, `module.exports="${encryptJSON}";`)
  if (!global.watch) log(chalk`encrypted {magenta ${name}} to {green ${encryptID}}`)

  state.encrypt[encryptID] = `${encryptID}=require("./${encryptID}")`

  return state

}

/**
 * Records specification modifications on a per bundle basis
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setCache = (name, state, json) => {

  state.cache[name] = { deprecated: [] }

  for (const [ id, { type, deprecated } ] of Object.entries(json)) {
    if (!state.cache[name][type]) state.cache[name][type] = []
    if (deprecated) state.cache[name].deprecated.push(id)
    else state.cache[name][type].push(id)
  }

  return state

}

/**
 * Set the grammar lexicals which are used when generating textmate
 * grammars liquid variations
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setGrammar = (cache, regex = {}) => {

  for (const prop in cache) {
    if (!cache[prop].length) continue
    regex[prop] = `(${cache[prop].join('|')})`
  }

  return regex

}

/**
 * Set the parsing lexicals that are used by the liquid
 * language server parser
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setParsing = (state) => {

  const { parsing, cache, cache: { standard } } = state

  for (const variant in cache) {

    if (typeof parsing[variant] !== 'object') parsing[variant] = {}

    const { filter = [], object = [] } = cache[variant]

    state.parsing[variant].objects = [ ...object ].sort()
    state.parsing[variant].filters = variant !== 'standard' ? [
      ...filter,
      ...standard.filter
    ].sort() : standard.filter.sort()
  }

  return state

}

/**
 * Create module export files with the generated
 * state cofiguration
 *
 * @param {string} output
 * @param {object} state
 */
const createFiles = async (output, state) => {

  // Write encryptions
  await encryptFile('specs', output, state, state.specs)
  await encryptFile('grammar', output, state, state.grammar)

  const { parsing } = setParsing(state)
  const { encrypt } = await encryptFile('parsing', output, state, parsing)

  // Generate exports in file
  const modules = `const ${Object.values(encrypt).join(',')}`
  const specs = Object.keys(encrypt).join(',')
  const exported = `${modules};module.exports={${specs}};`

  // Write main entry
  await writeFile(`${output}/index.js`, exported)

}

/**
 * Write the specification export file and set grammars
 *
 * @param {string} input the input location
 * @param {object} state the state object
 */
const writeFiles = (input, state) => async filename => {

  const file = filename ? `${input}/${filename}` : input
  const name = basename(file).replace(/\.[^/.]+$/, '')
  const read = await readFile(file)
  const strip = stripJsonComments(read.toString())
  const json = JSON.parse(jsonMinify(strip))
  const { cache } = setCache(name, state, json)

  state.specs[name] = json
  state.grammar[name] = setGrammar(cache[name])

}

/**
 * Executes a build of specifications
 *
 * @param {string} input
 * @param {string} output
 * @param {object} state
 */
const build = async (input, output, state) => {

  const specs = await readdir(input)
  const write = writeFiles(input, state)
  const error = errorHandler(input)

  for (const id of specs) await write(id).catch(error)

  // Create export
  await createFiles(output, state).catch(error)

  return state

}

/**
 * Launches chokidor watcher (for devleopment)
 *
 * @param {string} output
 * @param {object} state
 */
const watch = (output, state) => async input => {

  const filename = basename(input)
  const error = errorHandler(filename)

  log(chalk`{cyan changed} '{yellow ${filename}}'`)

  const write = writeFiles(input, state)

  await write().catch(error)
  await createFiles(output, state).catch(error)

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

  const cwd = process.cwd()
  const input = resolve(cwd, config.input)
  const output = resolve(cwd, config.output)
  const errors = errorHandler(input)

  if (config.build) {
    log(chalk`{bold.cyan Liquify Schema Stores}\n`)
    await build(input, output, state).catch(errors)
  } else if (config.watch) {
    log(chalk`{bold.cyan Liquify Schema Stores}\n`)
    await build(input, output, state).catch(errors)
    const watcher = chokidar.watch(`${input}/**`, { persistent: true })
    const change = watch(output, state)
    global.watch = true
    watcher.on('change', change).on('error', errors)
  }

}