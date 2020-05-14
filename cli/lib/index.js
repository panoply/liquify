
import findUp from 'find-up'
import { resolve, basename } from 'path'
import { readFile, pathExists } from 'fs-extra'
import config from '../argv.config.json'
// import { packages, command, flags } from './utils/config'
import defaults from './prompt/defaults'

const { log } = console

const getPkgs = async root => {
  const read = await readFile(resolve(root, '.packages.json'))
  return JSON.parse(read.toString())
}

const setPkgCommands = ([ pkg, { name } ]) => ({
  name: pkg,
  message: name
})

const setStateCommands = (command = { task: null, pkg: null }) => {
  for (const { name, type } of config.flags) {
    if (type === 'glob') command[name] = null
    else command[name] = false
  }
  return command
}

const setFlags = (state, flags, [ flag, value ]) => {

  const argvflag = flags.find(({ name, short }) => (name === flag || short === flag))

  if (typeof argvflag !== 'object') {
    return log(`An unknown flag value of "${value}" was supplied, command failed`)
  }

  if (argvflag.type === 'info') {
    return log(`call to ${argvflag.name}`)
  }

  if (argvflag.type !== 'glob') {
    state.command[argvflag.name] = value
  } else {
    if (typeof value !== 'string') {
      return log(`The flag value "-${flag}" (${argvflag.name}) must be a glob pattern`)
    } else {
      state.command[argvflag.name] = resolve(cwd, value)
    }
  }
}

const setState = (object) => ({
  ...object,
  command: setStateCommands(),
  execute: {}
})

/**
 * @param {import('types').ArgvParamaters} argv
 */
export default async (argv) => {

  const argvFlags = Object.entries(argv).slice(1)
  const cwd = process.cwd()
  const base = basename(cwd)
  const root = await findUp('project', { type: 'directory' })
  const pkgs = await getPkgs(root).catch(console.error)

  config.packages.choices = [
    ...config.packages.choices,
    ...Object.entries(pkgs).map(setPkgCommands)
  ]

  const state = setState({ cwd, base, root })
  const { tasks, packages, flags } = config
  const [ task, pkg = null ] = argv._

  if (argvFlags.length) {
    for (const [ flag, value ] of argvFlags) {

      const argvflag = flags.find(({ name, short }) => (name === flag || short === flag))

      if (typeof argvflag !== 'object') {
        return log(`An unknown flag value of "${value}" was supplied, command failed`)
      }

      if (argvflag.type === 'info') {
        return log(`call to ${argvflag.name}`)
      }

      if (argvflag.type !== 'glob') {
        state.command[argvflag.name] = value
      } else {
        if (typeof value !== 'string') {
          return log(`The flag value "-${flag}" (${argvflag.name}) must be a glob pattern`)
        } else {
          state.command[argvflag.name] = resolve(cwd, value)
        }
      }

    }
  }

  if (tasks.choices.some(({ name }) => name === task)) {
    state.command.task = task
  }

  if (packages.choices.some(({ name }) => (name === pkg || name === task))) {
    const path = pkg ? pkgs[pkg] : pkgs[task]
    state.info = { ...path, path: resolve(state.root, `${path.path}`) }
    state.info.dir = path.path
    state.command.pkg = pkg || task
  }

  if (typeof state.command.task === 'string' && !state.command.pkg) {
    log(`No package value for the task "${task}" was supplied`)
  } else if (typeof state.command.pkg === 'string' && !state.command.task) {
    log(`No task was defined with package "${pkg}" `)
  }

  // const pkg = require(resolve(state.cwd, pkgs[state]))

  await defaults(config, state)

}
