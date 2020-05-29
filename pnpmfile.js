'use strict'

const { writeFileSync } = require('fs')
const { basename } = require('path')
const chalk = require('chalk')
const { log } = console

/* -------------------------------------------- */
/*                GLOBAL OPTIONS                */
/* -------------------------------------------- */

// const ROOT_PKG = 'liquify'
const ROOT_DIR = 'project'

module.exports = {
  hooks: {

    afterAllResolved (lockfile) {

      const file = `${__dirname}/package.json`
      const pkg = require(file)
      const pkgs = Object.keys(lockfile.importers)

      pkg.packages = {}

      log(chalk`{bold.cyanBright Packages}`)

      for (const path of pkgs) {

        const { name, version, repository: { url } } = require(`./${path}/package.json`)

        const space = ' '.repeat(40 - path.length)
        const repo = url.replace('https://', '')
        const prop = path !== '.' ? `./${basename(path)}` : ROOT_DIR

        pkg.packages[prop] = { path: path, name, repo, version }

        log(chalk`${path}${space} | {dim Package}: {cyan ${name}}`)

      }

      writeFileSync(file, JSON.stringify(pkg, null, 2))

      return lockfile

    }
  }
}
