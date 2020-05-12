
import { resolve } from 'path'
import { readFile } from 'fs-extra'
import findUp from 'find-up'
import { getCommand, getFlags, getPackages } from './utils/config'
import config from '../argv.config.json'
import defaults from './prompt/defaults'

export default async argv => {

  const root = await findUp('project', { type: 'directory' })
  const state = { path: { cwd: process.cwd(), root: root } }
  const pkg = await readFile(resolve(state.path.root, '.packages.json'))

  await getPackages(state, config, JSON.parse(pkg.toString()))
  await getCommand(state, config, argv)
  await getFlags(state, config, argv)

  // if (!state.command) log(argv._.map(cmdError).join('\n'))

  // if (!state.flags) return log(argv._.map(cmdError).join('\n'))

  // console.log(state)

  // await packages[state.active](state).catch(e => log(chalk`{red Error}: ${e.message}`))

  if (!state.flags) await defaults(state, config)

}
