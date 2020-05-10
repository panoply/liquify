'use strict'

const { basename, resolve } = require('path')
const { writeFileSync, readFileSync } = require('fs')
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
  const packages = {}

  log(chalk`{bold.cyanBright Exporting workspaces to CLI }`)

  for (const path of pkgs) {

    const pkg = require(`./${path}/package.json`)
    const name = path === '.' ? 'liquify' : basename(path)
    const space = ' '.repeat(40 - path.length)

    packages[name] = {
      path,
      name: pkg.name,
      remote: pkg.repository.url.replace('https://', '')
    }

    log(chalk`${path}${space} | {dim CLI Referenced}: {cyan ${pkg.name}}`)

  }

  writeFileSync(resolve(__dirname, './.packages.json'), JSON.stringify(packages, null, 2))
  context.log(chalk`{cyan ${Object.keys(packages).length}} packages linked CLI`)

  return lockfile

}

module.exports = { hooks: { afterAllResolved } }
