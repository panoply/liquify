
import { resolve } from 'path'
import { cmdError } from './utils/console'
import { getCommand, getFlags, getPackages } from './utils'
import config from './config'
import chalk from 'chalk'
import * as packages from './pkg-build/export'
import { log } from 'console'

export default async argv => {

  const state = Object.create(null)
  const pkgs = await getPackages(state, (await import('./export')).pkg)

  state.cwd = process.cwd()
  config.commands = [ ...config.commands, ...pkgs ]

  await getCommand(state, config, argv)
  return console.log(state)

  // await getWorkPkg(state)

  if (!state.command) return log(argv._.map(cmdError).join('\n'))

  const flags = getFlags(state, config)
  Object.entries(argv).forEach(await flags)

  await packages[state.active](state).catch(e => log(chalk`{red Error}: ${e.message}`))

}
