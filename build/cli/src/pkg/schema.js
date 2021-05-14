import { readdir, readFile, writeFile } from 'fs-extra'
import { basename, join } from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { errorHandler } from '../utils/console'
import * as log from '../utils/logs'

/**
 * Executes a build of specifications
 *
 * @param {string} input
 * @param {string} output
 * @param {object} state
 */
const build = async (input, output) => {

  const specs = await readdir(input)
  const error = errorHandler(input)

  console.log(specs)

  // for (const id of specs) await writeFile(id).catch(error)

}

/**
 * Launches chokidor watcher (for devleopment)
 *
 * @param {string} output
 * @param {object} state
 */
const watch = (output) => async input => {

  const filename = basename(input)

  log.tree[1].while(chalk`{cyan changed} '{yellow ${filename}}'`)

  const read = await readFile(input)
  const name = join(output, filename)
  const strip = stripJsonComments(read.toString())

  await writeFile(name, jsonMinify(strip))

}
/**
 * Default exports - Digested by the CLI
 *
 * @param {object} config
 * @param {object} state prop values are the encoded names
 */
export default async (config) => {

  log.perf.start()
  log.tree[0].start('Liquid Specifications')

  const { input, output } = config.argv

  const errors = errorHandler(input)

  await build(input, output).catch(errors)

  log.tree[1].end(chalk`{dim Generated in }{whiteBright ${log.perf.stop().preciseWords}}`)

  if (config.argv.watch) {

    // console.log(config)
    log.tree[1].while(chalk`{blueBright watching} {dim ${input}/**}`)

    const watcher = chokidar.watch(`${input}/**`, {
      persistent: true,
      interval: 100
    })

    const change = watch(output)

    // @ts-ignore
    global.watch = true

    watcher.on('change', change).on('error', errors)

  }

}
