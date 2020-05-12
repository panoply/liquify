
import { resolve, basename, relative, normalize, join } from 'path'
import findUp from 'find-up'
import chalk from 'chalk'

const { log } = console

/**
 * Get package.json files
 *
 * @param {object} state
 * @param {object} packages
 */
export const getPackages = async (state, config, packages) => {

  state.packages = packages

  const cwd = process.cwd()
  const base = basename(cwd)

  state.root = await findUp('project', { type: 'directory' })

  for (const [ command, { name } ] of await Object.entries(packages)) {
    config.commands.push({ command, description: `Package bundle for ${name}` })
    if (base === command) state.active = command
  }

  if (typeof state.active === 'undefined') {
    log(chalk`{yellow Warning}: No {cyan package.json} in {magenta ${base}} directory`)
  }

  return state
}

/**
 * Command call filter
 *
 * @param {object} state
 * @param {object} config
 * @param {object} argv
 */
export const getCommand = async (state, config, { _: [ arg1, arg2 = null ] }) => {

  const { commands } = config
  const { packages } = state

  console.log(packages)
  // commands.push(...packages)

  for (const { command, short } of commands) {
    console.log('here', command)

    if ((command === arg1 || short === arg1) && !arg2) {
      state.command = command; break
    } else if ((command === arg1 || short === arg1) && (arg2 && arg2.length > 0)) {
      for (const pkg in packages) if (pkg === arg2) state.command = command; break
    }
  }

  // console.log(state)

  for (const [ pkg, { path } ] of await Object.entries(packages)) {
    if (pkg === state.command) state.path.basename = resolve(state.root, path); break
  }

  if (!state.path) state.path.basename = basename(state.cwd)

  return state

}

/**
 * Command flags
 *
 * @param {object} config
 * @param {object} state
 */
export const getFlags = async (state, config, argv) => {

  state.flags = null

  for (const [ flag, value = null ] of await Object.entries(argv)) {
    for (const { name, short, type } of config.flags) {
      if (name !== flag || short !== flag) continue
      const globs = { [name]: type === 'glob' ? resolve(state.cwd, value) : value }
      await Object.assign(state.flags, globs)
    }
  }

  return state
  //  console.log(state)

}
