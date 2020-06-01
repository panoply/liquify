import jsonc from 'rollup-plugin-jsonc'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import { basename, join, extname } from 'path'
import { readdirSync } from 'fs'
import Cryptor from 'cryptorjs'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

/**
 * Replace - Runs a regular expression and replaces
 * all matched tag occurances
 *
 * @param {import('../types/index').ReplaceOptions} options
 */
function fn (options) {

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
 * @param {object} cache state state
 */
  const setGrammar = (cache, regex = {}) => {

    for (const prop in cache) {
      if (!cache[prop].length) continue
      regex[prop] = cache[prop]
    }

    return regex

  }

  /**
 * Set the parsing lexicals that are used by the liquid
 * language server parser
 *
 * @param {object} state state state
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
   * Parse object type parameters
   *
   * @param {object} entry
   *
   */
  const returnOrEncryptObject = (entry) => {

  }

  const cryptor = new Cryptor(options.password)

  const runCapture = (parse, id, code) => {

    if (id === 'index.js') return code

    const name = id.substring(id, id.indexOf('.'))
    const json = JSON.parse(code)

    parse[name].reference = { ...parse[options.main].reference, ...json }

    // Update model
    for (const [ i, { type, deprecated } ] of Object.entries(json)) {
      if (!parse[name].parser[type]) parse[name].parser[type] = []
      if (deprecated) {
        !parse[name].parser.deprecated.includes(i) && parse[name].parser.deprecated.push(i)
      } else {
        !parse[name].parser[type].includes(i) && parse[name].parser[type].push(i)
      }
    }

    // Merge the standard variation

    if (name !== options.main) {

      for (const prop of Object.keys(parse[options.main].parser)) {
        if (!parse[name].parser[prop]) parse[name].parser[prop] = []
        parse[name].parser[prop] = [
          ...parse[name].parser[prop],
          ...parse[options.main].parser[prop]
        ].sort()
      }

    }

    return JSON.stringify(parse[name], null, 4)
    //  for (const variant of variations) exported[variant] = cryptor.encode(parse[variant])

  }
  const parse = {}

  const runner = 0
  return ({
    name: '@liquify/rollup-plugin-cryptor',

    transform (code, id) {

      // if (!filter(id)) re turn null
      // const spec = parse.findIndex(({ file }) => file === basename(id))

      // const spec = runCapture(parse, basename(id), code)

      // console.log(spec)

      const fn = () => Object.entries(parse).map(
        ([ p, v ]) => `export const ${p} = require('./${v}')`
      )

      return {
        code: extname(id) === '.json'
          ? `export default (iv, ) => '${cryptor.encode(JSON.parse(code))}'`
          : code
      }

      /* return {
        code: id === 'index.js'
          ? code
          : `export const ${basename(id, '.json')} = '${cryptor.encode(JSON.parse(code))}'`
      } */
    }

  })
}

/**
 * Monorepo path resolver
 */
const { p } = require('@liquify/path-resolve')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: p`index.js`,
  output: [
    {
      format: 'cjs',
      dir: p`package`,
      sourcemap: !!process.env.prod
    }
  ],
  plugins: [
    fn({
      main: 'standard',
      password: 'sissel siv'
    }),
    resolve(),
    commonjs(),
    terser()

    /* fn({
      main: 'standard',
      password: 'sissel siv'
    }) */
  ]
}
