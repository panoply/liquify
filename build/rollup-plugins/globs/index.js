import { join, basename } from 'path'
import chokidar from 'chokidar'
import minimatch from 'minimatch'
import { readFile, outputFile, copy, remove, exists } from 'fs-extra'
import { mark, stop } from 'marky'
import pretty from 'pretty-ms'
import chalk from 'chalk'

const { log } = console

/**
 * Transform, file contents
 *
 * @param {string} dest
 * @param {(function|object|false)} transform
 * @returns {(item: string) => Promise<string>}
 */
const transformer = (dest, transform) => async file => {

  if (!transform || !file) return false

  if (![ 'function', 'object' ].includes(typeof transform)) {
    throw new Error(`${file} transform must be of type object or function`)
  }

  try { await exists(file) } catch (error) { throw new Error(error) }

  const content = await readFile(file)

  if (typeof transform === 'function') return transform({ file, content, dest })

  if (typeof transform === 'object') {

    const item = Object.keys(transform).find(glob => minimatch(file, glob))

    if (!item) return false

    if (typeof transform[item] === 'string') return transform[item]
    if (typeof transform[item] === 'function') {
      return transform[item]({ content, dest, file })
    }

    log(chalk.dim(`The transform used by ${item} must of type function or string`))

  }
}

/**
 * Changed Event
 *
 * @param {string} files
 * @param {string} dest
 * @param {function|object|false} transform
 * @returns {(item: string) => Promise<string>}
 */
const changes = (files, dest, transform) => async item => {

  mark(item)

  const file = await transform(item)

  if (typeof file === 'boolean' || typeof file === 'string') {

    await copy(item, join(dest, file === false ? basename(item) : file))

    log(chalk`copied {cyan ${item}} in {italic ${pretty(stop(item).duration)}}`)

  } else if (typeof file === 'object') {

    if (file.content && typeof file.content !== 'string') {
      throw new Error(`The ${item} content property did not return a string!`)
    }

    if (!file.dest) file.dest = dest

    if (file.file) {
      if (!files.has(item)) files.set(item, file.file)
      file.file = files.get(item)
      log(chalk`renamed {cyan ${basename(item)}} to {cyan ${file.file}}`)
    } else {
      file.file = basename(item)
    }

    if (file.content) {

      await outputFile(join(file.dest, file.file), file.content, 'utf8')

      log(chalk`transformed {cyan ${item}} in {italic ${pretty(stop(item).duration)}}`)

    }
  }

}

/**
 * Remove Event
 *
 * @param {MapConstructor} files
 * @param {string} dest
 * @returns {(item: string) => Promise<string>}
 */
const removal = (files, dest) => async item => {

  mark(item)

  const path = join(dest, basename(item))

  await remove(path)
  files.delete(item)
  log(chalk`{red deleted ${path}} in {cyan ${pretty(stop(item).duration)}}`)

}

/**
 * Chokidor is ready
 *
 * @param {MapConstructor} files
 * @param {import('chokidar').FSWatcher} watch
 * @returns {(resolve: function) => function}
 */
const ready = (files, watch) => resolve => watch.on('ready', (paths = []) => {

  const watched = watch.getWatched()

  log(`Watching ${Object.keys(watched).length} paths`)

  return resolve()

})

/**
 * Globs pattern builder
 *
 * @param {array} globs
 */
const patterns = (globs) => ([

  ...globs
  .filter(Boolean)
  .reduce((acc, val) => acc.concat(val), []),
  '!**/node_modules/**'

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
 * @param {import('.').GlobsOptions} options
 */
export default (options = false) => {

  const {
    globs = false
    , clean = true
    , dest = './package'
    , cwd = process.cwd()
    , transform = false
  } = options

  if (!globs) throw new Error('Missing { globs: [] } in rollup-plugin-globs')

  let runs = 0
    , initialize

  return {
    name: '@liquify/rollup-plugin-globs',
    async buildStart () {

      if (runs++) return
      if (clean) await remove(dest)

      const files = new Map()
      const unlink = removal(files, dest)
      const change = changes(files, dest, transformer(dest, transform))
      const watch = chokidar.watch(patterns(globs), { cwd })

      initialize = new Promise(ready(files, watch))

      watch.on('add', change)
      watch.on('change', change)
      watch.on('unlink', unlink)
      watch.on('unlinkDir', unlink)
      watch.on('error', error => { throw error })

    },

    async generateBundle () {

      await initialize

    }
  }
}
