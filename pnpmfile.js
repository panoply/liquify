'use strict'
const { resolve } = require('path')
const { writeFileSync } = require('fs-extra')
const chalk = require('chalk')
const { log } = console

/**
 * Read all workspace packages. Extract package names and
 * write them to the CLI config `.packages` file.
 *
 * @param {object} pkg
 * @returns {object}
 */
const getName = (path, pkg) => {

  if (pkg.name === '@liquify/cli') return null

  log(chalk`- {cyan ${pkg.name}} {dim at} {italic.magenta ${path}}`)

  packages.push(`${pkg.name}`)

}

const afterAllResolved = (lockfile) => {

  const pkgs = Object.keys(lockfile.importers)
  const packages = {}

  log(chalk`{cyan Exporting workspaces to CLI }`)

  for (const path of pkgs) {
    const pkg = require(`./${path}/package.json`)
    if (pkg.name === '@liquify/cli') continue
    packages[pkg.name] = path
    log(chalk`- {cyan ${pkg.name}} {dim at} {italic.magenta ${path}}`)
  }

  writeFileSync('./cli/.packages', JSON.stringify(packages, null, 2))

  log(chalk`{green Suceess}`)

  return lockfile

}

module.exports = {
  hooks: { afterAllResolved }
}
