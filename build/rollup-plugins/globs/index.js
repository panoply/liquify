import { join, basename } from 'path'
import chokidar from 'chokidar'
import minimatch from 'minimatch'
import { readFile, outputFile, copy, remove, existsSync } from 'fs-extra'
import { mark, stop } from 'marky'
import pretty from 'pretty-ms'
import chalk from 'chalk'
import { version } from './package.json'

const { log } = console

/**
 * Transform file contents, when returning `false` transform is
 * skipped and file is copied
 *
 * @param {string} dest
 * @param {(function|object|false)} transform
 * @returns {(base: string, item: string) => Promise<string>}
 */
const transformer = (dest, transform) => async (base, file) => {

  if (!transform || !file) return false

  if (![ 'function', 'object' ].includes(typeof transform)) {
    throw new Error(`${file} transform must be of type object or function`)
  }

  try { existsSync(file) } catch (error) { throw new Error(error) }

  const content = await readFile(file)

  if (typeof transform === 'function') return transform({ name: file, content, dest })

  if (typeof transform === 'object') {

    if (typeof transform[base] === 'string') {
      if (transform[base] !== base) return transform[base]
    }

    const item = Object.keys(transform).find(glob => minimatch(file, glob))

    // execute copy
    if (!item) return false

    if (typeof transform[item] === 'string') return transform[item]
    if (typeof transform[item] === 'function') {
      return transform[item]({ content, dest, name: file })
    }

    log(chalk.dim(`The transform used by ${item} must of type function or string`))

  }
}

/**
 * Rename file transform. Good for multiple return approaches.
 *
 * @param {string} base
 * @param {object} file
 * @param {Map} files
 * @param {string} item
 */
const rename = (base, file, item, files) => {

  if (file === false) return base

  const ext = item.substring(item.lastIndexOf('.'), item.length)
  const filename = (typeof file === 'object' && file.name)
    ? file.name
    : typeof file === 'string' ? basename(file) : base

  const name = filename
    .replace(/\[\bname\b\]/, base)
    .replace(/\[\bext\b\]/, ext || null)

  if (!files.has(item)) files.set(item, name)

  if (base !== name) {
    log(chalk`{dim renamed ${base} to ${name}}`)
  }
  return files.get(item)

}

/**
 * Repath file destination
 *
 * @param {string} base
 * @param {object} file
 * @param {string} dest
 */
const repath = (base, file, dest) => {

  if (typeof file === 'object') {
    if (file.dest) {
      return file.dest.replace(/\[\bname\b\]/, base)
    }
  }

  return dest

}

/**
 * Changed Event
 *
 * @param {Map} files
 * @param {string} dest
 * @param {function|object|false} transform
 * @returns {(item: string) => Promise<void>}
 */
const changes = (files, dest, transform) => async item => {

  mark(item)

  const base = basename(item)
  const file = await transform(base, item)

  if (typeof file === 'boolean' || typeof file === 'string') {

    await copy(item, join(repath(base, file, dest), rename(base, file, item, files)))

    log(chalk`{bold copied} {cyan ${item}} in {dim ${pretty(stop(item).duration)}}`)

  } else if (typeof file === 'object') {

    if (file.content && typeof file.content !== 'string') {
      throw new Error(`The ${item} content property did not return a string!`)
    }

    file.dest = repath(base, file, dest)
    file.name = rename(base, file, item, files)

    if (file.content) {

      await outputFile(join(file.dest, file.name), file.content, 'utf8')

      log(chalk`{bold modified} {cyan ${item}} in {dim ${pretty(stop(item).duration)}}`)

    } else {

      await copy(item, join(file.dest, file.name))

      log(chalk`{bold copied} {cyan ${item}} in {dim ${pretty(stop(item).duration)}}`)

    }
  }

}

/**
 * Remove Event
 *
 * @param {Map} files
 * @param {string} dest
 * @returns {(item: string) => Promise<void>}
 */
const removal = (files, dest) => async item => {

  mark(item)

  const path = join(dest, basename(item))

  await remove(path)

  files.delete(item)

  log(chalk`{bold.red deleted} {red ${path}} in {dim ${pretty(stop(item).duration)}}`)

}

/**
 * Chokidor is ready
 *
 * @param {object} watch
 * @returns {(resolve: function) => function}
 */
const ready = watch => resolve => watch.on('ready', () => {

  const watched = watch.getWatched()

  log(`Watching ${Object.keys(watched).length} paths`)

  return resolve()

})

/**
 * Globs pattern builder
 *
 * @param {array} globs
 */
const patterns = (globs, dest) => ([
  ...globs.filter(Boolean),
  '!**/node_modules/**',
  `!${dest}/**`
])

/**
 * Rollup Plugin Globs
 *
 * This code is essentially a hard fork of `rollup-plugin-globsync`
 * by tivac. I've merely modified the code to fit my coding style,
 * eliminated the manifests feature, provided type definitions and
 * brought support for file transformations that do what the fuck they
 * are intended to do, transform files.
 *
 */
export default (options = {}) => {

  const {
    globs = false
    , clean = true
    , dest = './package'
    , cwd = process.cwd()
    , transform = false
  } = options

  if (!globs) throw new Error('Missing { globs: [] } in rollup-plugin-globs')

  let runs = 0
    , build
    , watch
    , initialize

  return {
    name: '@liquify/rollup-plugin-globs',
    options (config) {

      build = typeof config.watch === 'undefined'

    },
    async buildStart () {

      if (runs++) return
      if (clean) await remove(dest)

      const files = new Map()

      const unlink = removal(files, dest)
      const change = changes(files, dest, transformer(dest, transform))

      watch = chokidar.watch(patterns(globs, dest), { cwd })

      watch.on('add', change)
      watch.on('change', change)
      watch.on('unlink', unlink)
      watch.on('unlinkDir', unlink)
      watch.on('error', error => { throw error })

      initialize = new Promise(ready(watch))

      log(chalk`{underline rollup-plugin-globs v${version}}`)

    },

    async generateBundle () {

      await initialize

    },
    buildEnd () {

      if (build) watch.close()

    }

  }
}
