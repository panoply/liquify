'use strict'

const { basename } = require('path')
const { writeFileSync } = require('fs')
const chalk = require('chalk')
const { log } = console

/**
 * Read all workspace packages, extract package names and
 * write them to the CLI config `.packages` file.
 *
 * @param {object} lockfile
 * @param {object} context
 * @returns {object}
 */
const afterAllResolved = (lockfile, context) => {

  const pkgs = Object.keys(lockfile.importers)
  const packages = Object.create(null)
  log(chalk`{bold.cyanBright Exporting workspaces to CLI }`)

  for (const path of pkgs) {

    if (path === 'cli') continue

    const pkg = require(`./${path}/package.json`)
    const name = path === '.' ? 'root' : basename(path)
    const space = ' '.repeat(40 - path.length)

    packages[name] = { [pkg.name]: path }
    log(chalk`${path}${space} | {dim CLI Referenced}: {cyan ${pkg.name}}`)

  }

  const pkg = Object.assign(require('./cli/package.json'), { packages })

  writeFileSync('./cli/package.json', JSON.stringify(pkg, null, 2))

  context.log(chalk`{cyan ${Object.keys(packages).length}} packages linked CLI`)

  return lockfile

}

module.exports = { hooks: { afterAllResolved } }
