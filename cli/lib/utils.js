
import specs from '@liquify/specs'
import { resolve, basename, relative, normalize, join } from 'path'
import { crypto, log } from './export'
// import parsePath from 'parse-filepath'
import findUp from 'find-up'
import chalk from 'chalk'

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} file
 * @returns {(error: string) => void }
 */
export const errorHandler = file => error => (
  log(chalk`{redBright Error} in {red ${file}}\n${error}\n`)
)

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} command
 */
export const cmdError = command => (
  chalk`{red liquify}: command not found: '{red ${command}}'`
)

/**
 * @typedef {'specs' | 'grammar' | 'parsing'} types
 * @param param {types|types[]}
 * @return (types)
 */
export const getCrypt = async (param) => {

  if (typeof param === 'string') return crypto.decode(specs[param])

  for (const id in specs) {
    specs[crypto.decode(id)] = crypto.decode(specs[id])
    delete specs[id]
  }

  return specs
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
