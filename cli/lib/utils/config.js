import findUp from 'find-up'
import { resolve, basename } from 'path'
import { readFile } from 'fs-extra'
import chalk from 'chalk'
import * as state from './state'

const { log } = console

/**
 * Command flags
 *
 * @param {object} argv
 */
export const getFlags = async (state, argv) => {

  for (const [ flag, value = null ] of await Object.entries(argv)) {
    for (const { name, short, type } of state.config.flags) {
      if (name !== flag || short !== flag) continue
      const globs = { [name]: type === 'glob' ? resolve(state.cwd, value) : value }
      state.flags = { ...state.flags, ...globs }
    }
  }

  return state

}

/**
 * Command call filter

 * @param {object} argv
 */
export const getCommand = async (state, argv) => {

  const { _: [ arg1, arg2 = null ] } = argv

  if (!arg1) {
    state.command.argv = 'default'
    return null
  }

  for (const { name, type } of await state.config.commands) {
    console.log(type)
    if (name === arg1 && !arg2) {
      state[type] = name; break
    } else if (name === arg1 && typeof arg2 === 'string') {
      for (const pkg in state.config.packages) {
        if (pkg === arg2) state[type] = name; break
      }
    }
  }

  await getFlags(state, argv)

}

/**
 * Get package.json files
 *
 * @param {object} state
 * @param {object} packages
 */
const getPackages = async (root, argv) => {

  state.path.root = root

  const read = await readFile(resolve(root, '.packages.json'))
  const pkgs = JSON.parse(read.toString())

  for (const [ command, { name } ] of await Object.entries(pkgs)) {
    if (state.path.basename === command) state.path.dirname = command
    state.config.commands.push({
      name: command,
      description: `Package bundle for ${name}`,
      type: 'package'
    })
  }

  if (!state.path.dirname) {
    log(chalk`{yellow Warning}: No {cyan package.json} in {magenta ${state.path.basename}} directory`)
  }

  await getCommand(state, argv)

}

export default async (argv) => {

  const root = await findUp('project', { type: 'directory' })
  const read = await readFile(resolve(root, '.packages.json'))
  const pkgs = JSON.parse(read.toString())

  for (const [ command, { name } ] of await Object.entries(pkgs)) {
    state.config.commands.push()
  }

  const commands = await getPackages(root, argv)

  return state

}
