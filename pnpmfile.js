'use strict'

const { basename, resolve } = require('path')
const { writeFileSync } = require('fs')
const chalk = require('chalk')
const { log } = console
const babel = require('./babel.config.json')

const ROOT = 'project'
const FILE = '.packages.json'

module.exports = {
  hooks: {
    readPackage (pkg, context) {

      const { packages = {} } = require(`${resolve(__dirname)}/package.json`)

      log(babel)

      // const pkgs = Object.keys(lockfile.importers)

      // log(chalk`{bold.cyanBright Exporting workspaces to CLI }`)

      /* for (const path of pkgs) {

        const { name, version, repository: { url } } = require(`./${path}/package.json`)
        const space = ' '.repeat(40 - path.length)
        const repo = url.replace('https://', '')
        const prop = path !== '.' ? basename(path) : ROOT

        Object.assign(packages, {
          [prop]: {
            path,
            name,
            repo,
            version
          }
        })

        log(chalk`${path}${space} | {dim CLI Referenced}: {cyan ${name}}`)
*/

      // const writePath = resolve(__dirname, FILE)
      // const writeJson = JSON.stringify(packages, null, 2)

      // writeFileSync(writePath, writeJson)

      // context.log(chalk`{cyan ${Object.keys(packages).length}} packages linked CLI`)

      return pkg

    }
  }
}
