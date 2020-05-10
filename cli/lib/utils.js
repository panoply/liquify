
import specs from '@liquify/specs'
import { resolve, basename, relative, normalize, join } from 'path'
import { crypto, log } from './export'
import parsePath from 'parse-filepath'
import findUp from 'find-up'
import chalk from 'chalk'
import { log } from '../export'

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
 * @param {object} config
 * @param {object} argv
 * @returns {{acive: string, command: string, pkg?: null | string}}
 */
export const getCommand = async (state, config, { _: [ arg1, arg2 = null ] }) => {

  const { commands } = config
  const { packages } = state

  for (const { command, short } of commands) {
    const valid = (command === arg1 || short === arg1)
    if (valid && !arg2) {
      state.command = command; break
    } else if (valid && (arg2 && arg2.length > 0)) {
      for (const pkg in packages) if (pkg === arg2) state.command = command; break
    }
  }

  for (const pkg in packages) {
    if (pkg === state.command) {
      const [ path ] = Object.values(packages[pkg])
      state.path = resolve(state.cwd, path)
    }
  }

  return state.command
}

/**
 * Command flags
 *
 * @param {object} config
 * @param {object} state
 */
export const getFlags = (state, config) => async ([ flag, value ]) => {

  state.flags = null

  for (const { name, short } of config.flags) {
    if (name === flag || short === flag) {
      await Object.assign(state.flags, {
        [name]: [
          'config',
          'main',
          'input',
          'output',
          'peek'
        ].includes(name) ? resolve(state.cwd, value) : value
      })
    }
  }

  if (!state.flags) {

    // throw log(state)

  }

  return typeof state.flags === 'object' ? state.flags : false
}

/**
 * Get package.json files
 *
 * @param {object} state
 * @param {object} param
 */
export const getPackages = async (state, { packages }) => {

  state.packages = packages

  const pkgs = []
  const cwd = process.cwd()
  const root = basename(resolve(cwd, 'root'))
  const base = basename(cwd)

  state.root = await findUp('project', { type: 'directory' })

  for (const command in packages) {
    const [ description ] = Object.keys(packages[command])
    pkgs.push({ command, description })
    if (base === command || root === command) state.active = command
  }

  return pkgs

}

/**
 * Get package.json files
 *
 * @param {object} state
 * @param {object} param
 */
export const getWorkPkg = (state) => {

  const pkgs = []
  const cwd = process.cwd()
  const root = basename(resolve(cwd, 'root'))
  const base = basename(cwd)

  if (state.active !== 0) {
    console.log(state)
  }

  return pkgs

}
