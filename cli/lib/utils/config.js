
import { resolve, basename, relative, join, normalize } from 'path'
import { readdir, readFile } from 'fs-extra'
import minimist from 'minimist'
import { flags } from '../../argv.config.json'

/**
 * Get Package Path - Parsed the projects paths
 * for pnpm `--filter` execution from any directory in the tree
 *
 * @param {object} state
 */
export const pkgPath = async ({ base, root, pkg, cwd }) => {

  const contains = await readdir(cwd)
  const normal = new RegExp(`.*/${basename(root)}/`)
  const regex = new RegExp(`.*/${base}/`)
  const filter = join(root, pkg).replace(regex, './')

  if (cwd === root || pkg.split('/').some(dir => contains.includes(dir))) {
  //  log('current directory contains packages', filter)
    return filter
  }

  //  log('requested package not in current path, fetched relative location')
  const path = normalize(`${relative(cwd, root)}/${filter.replace(normal, '/')}`)

  return `./${path}/`

}

/**
 * Get Packages
 *
 * @param {string} root
 */
export const getPkgs = async (path, file) => {
  const read = await readFile(resolve(path, file))
  return JSON.parse(read.toString())
}

/**
 * Set Packages Commands
 *
 * @param {object} pkgs
 */
export const pkgCommands = (choices, pkgs) => ([
  ...choices,
  ...Object.entries(pkgs).map(([ pkg, { name } ]) => (
    {
      name: pkg,
      message: name
    }
  ))
])

/**
 * Set Flag Commands
 *
 * @param {string} cwd
 * @param {array} args
 */
export const flagCommands = async (cwd, args, command = {}) => {

  // console.log(cwd, args)
  for (const [ flag, value ] of await Object.entries(args)) {

    const argvflag = flags.find(({ name }) => (name === flag))

    if (typeof argvflag !== 'object') {
      throw Error(`An unknown flag value of "${value}" was supplied, command failed`)
    }

    if (argvflag.type === 'info') {
      throw Error(`call to ${argvflag.name}`)
    }

    if (argvflag.type !== 'glob') {
      command[argvflag.name] = value
    } else {
      if (typeof value !== 'string') {
        throw Error(`The flag value "-${flag}" (${argvflag.name}) must be a glob pattern`)
      } else {
        command[argvflag.name] = resolve(cwd, value)
      }
    }

  }

  return command

}

/**
 * Set State Commands
 *
 * @param {object} argv
 */
export const argvDefaults = (argv) => {

  const command = { task: null, pkg: null }

  for (const { name, type } of argv.flags) {
    if (type === 'glob') command[name] = null
    else command[name] = false
  }

  return command

}

/**
 * Set State Commands
 *
 * @param {object} argv
 */
export const normalizeFlagName = argv => {

  for (const { name, short } of flags) {
    if (argv[short]) argv[name] = argv[short]; delete argv[short]
  }

  return argv

}

/**
 * Parse the packages `package.json` file and extract
 * all the `$ liquify` scripts.
 *
 * @param {import('types').Options} state the state object
 * @param {array}  scripts executed via package.json script
 * @param {object} argv executed via the command line
 */
export const parsePkgScripts = async (state, scripts, argv) => {

  const { argv: { task } } = state
  const regex = /\bliquify\b\s+/

  // When task command specifies the run script
  if (scripts[task] && regex.test(scripts[task])) {

    const argvFlag = normalizeFlagName(minimist(scripts[task].split(/\s/)))
    const mergeCLI = { ...argvFlag, ...argv }; delete mergeCLI._

    // Fail when prod and dev are used together
    return ((argvFlag.prod && argv.dev) || (argv.prod && argvFlag.dev))
      ? new Error('do not use prod and dev tags together')
      : mergeCLI
  }

  const { _: [ command ], dev, prod } = argv

  for (const [ argument, value ] of Object.entries(scripts)) {
    if (argument !== command || !regex.test(value)) continue

    const parse = normalizeFlagName(minimist(value.split(/\s/)))

    argv = { ...parse, ...argv }

    if ((!prod && !dev) || (argument !== 'prod' && argument !== 'dev')) {
      argv = { ...argv, dev: true }
    }
  }

  return argv

}
