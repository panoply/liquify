import { join, basename } from 'path'
import chokidar from 'chokidar'
import minimatch from 'minimatch'
import cp from 'cp-file'
import del from 'del'
import log from 'npmlog'
import { readFile, outputFile } from 'fs-extra'
import { mark, stop } from 'marky'
import pretty from 'pretty-ms'

// Wrapper around pretty-ms and stop
const slash = (str) => str.replace(/\\/g, '/')

const patterns = (globs) => ([
  // The worst dir for a watcher to walk, yikes
  '!**/node_modules/**',

  ...globs
  // Filter out falsey values
  // @ts-ignore
  .filter(Boolean)
  // flatten one level deep
  .reduce((acc, val) => acc.concat(val), [])
  // No \ allowed
  .map((glob) => slash(glob))

  // No inception, please
  // `!${slash(dest)}/**`
])

const setDestination = (file) => {
  if (files.has(file)) {
    return files.get(file)
  }

  const out = destination ? destination(file) : file

  files.set(file, out)

  return out
}

const modify = async (item) => {

  let modified

  const read = await readFile(item)

  if (typeof transform === 'function') {

    modified = transform(read.toString())

    if (typeof modified === 'string') return modified

    log.warn('transform', `The ${item} transform must return a string!`)

  } else if (typeof transform === 'object') {

    const file = Object.keys(transform).find((glob) => minimatch(item, glob))

    if (file) {
      modified = transform[file](read.toString())
      if (typeof modified === 'string') return modified
      log.warn('transform', `The ${item} transform must return a string!`)
    }

  } else {
    log.warn('transform', `${item} transform must be an object or function`)
  }

  return false
}

const copy = async (item) => {

  const timer = `copy-${item}`

  mark(timer)

  const file = transform ? await modify(item) : transform
  const path = join(dest, basename(item))

  await del(path)

  if (file === false) {

    console.log('DIR', join(dest, item))
    // console.log('TGT', tgt)
    console.log('ITEM', item)

    log.silly('copy', `Copying ${item}...`)
    await cp(item, path)
    log.verbose('copy', `Copied ${item} in ${pretty(stop(timer).duration)}`)
  } else {
    log.verbose('transform', `OUTPUT ${join(dest, basename(item))}...`)
    await outputFile(path, file, 'utf8')
    log.verbose('transform', `Transformed ${item} in ${pretty(stop(timer).duration)}`)
  }
}

const remove = async (item) => {
  const timer = `delete-${item}`

  mark(timer)

  log.silly('remove', `Removing ${item}...`)

  const tgt = join(dest, setDestination(item))

  log.verbose('remove', `Deleted ${tgt} in ${pretty(stop(timer).duration)}`)
}

/**
 * @param {import('../types').GlobsOptions} options
 */
export default (options = {
  globs,
  clean: true,
  dest: './package',
  pkg: process.cwd(),
  destination: false,
  transform: false
}) => {

  if (!globs) throw new Error('Missing { globs : [] } in rollup-plugin-globs')

  let runs = 0
    , files
    , watcher
    , initialize

  return {
    name: '@liquify/rollup-plugin-globs',

    async buildStart () {

      if (runs++) return
      if (clean) await del(slash(dest))

      files = new Map()

      watcher = chokidar.watch(patterns(globs), { cwd: pkg })

      watcher.on('add', copy)
      watcher.on('change', copy)
      watcher.on('unlink', remove)
      watcher.on('unlinkDir', remove)
      watcher.on('error', (e) => { throw e })

      initialize = new Promise(resolve => watcher.on('ready', () => {

        const paths = []
        const watch = watcher.getWatched()

        Object.keys(watch).forEach(k => watch[k].forEach(f => paths.push(`${k}/${f}`)))

        log.verbose('watch', `Watching ${paths.length} paths, ${files.size} files`)

        resolve()

      }))
    },

    async generateBundle () {

      await initialize

    }

  }
}
