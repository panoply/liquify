
import findUp from 'find-up'
import { resolve, basename } from 'path'
import argv from '../argv.config.json'
import defaults from './prompt/defaults'
import * as config from './utils/config'
import * as packages from './pkg/export'

const { log } = console

/**
 * CLI Entry - Digests args from the command line and dispatches
 * to the appropriate task.
 *
 * @param {import('types').ArgvParamaters} args
 * @param {import('types').Options} state
 */
export default async function (args, state = { argv: {}, path: {} }) {

  let flags = Object.entries(args).slice(1)

  const { path } = state

  args = config.normalizeFlagName(args)
  path.cwd = process.cwd()
  path.base = basename(path.cwd)
  path.root = await findUp('project', { type: 'directory' })

  const pkgs = await config.getPkgs(path.root, '.packages.json').catch(console.error)
  const condition = ((path.cwd !== path.root) && (path.base === basename(path.cwd)))
  const { _: [ task, pkg = condition ? path.base : null ] } = args

  if (argv.tasks.choices.some(({ name }) => name === task)) state.argv.task = task

  argv.packages.choices = config.pkgCommands(argv.packages.choices, pkgs)

  if (argv.packages.choices.some(({ name }) => (name === pkg || name === task))) {

    const pkgcmd = pkg ? pkgs[pkg] : pkgs[task]
    const { name, repo, version } = pkgcmd

    path.pkg = resolve(path.root, pkgcmd.path)
    state.info = { name, repo, version }
    state.argv.pkg = pkg || task

    const { scripts } = await config.getPkgs(path.pkg, 'package.json').catch(console.error)
    const script = await config.parsePkgScripts(state, scripts, args)
    const check = Object.keys(script)

    flags = script
    delete script._
    state.argv = { ...state.argv, ...script }

    if (!check.length) return // log('no script runner setup that matches this command')

    if (check.length === 1) flags = script[check[0]]
    // else log('will pass to command list for selection')

  }

  state.argv = { ...config.argvDefaults(argv), ...state.argv }

  if (!path.pkg) return defaults(argv, state)

  try {
    const cmds = await config.flagCommands(path.pkg, flags)
    path.filter = await config.pkgPath(path)
    state.argv = { ...state.argv, ...cmds }

    await packages[state.argv.pkg](state)

  } catch (error) { throw log(error) }
}
