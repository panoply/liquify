import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import { basename, join } from 'path'
import { readFileSync } from 'fs'
import stripIndent from 'strip-indent'
import chalk from 'chalk'

/**
 * Reads files contained at roots like package.json
 */
export const read = (
  () => ({

    get pkg () {

      const cwd = process.cwd()
      const pkg = readFileSync(join(cwd, 'package.json')).toString()

      return JSON.parse(jsonStrip(pkg))

    }
  })
)()

/**
 * Minify JSON and strip JSONC files
 *
 * @param {string} content
 */
export const jsonmin = content => {

  if (content.length === 0) {
    return console.log(
      chalk`{italic  JSON file is empty, skipping}`
    )
  }

  try {

    const parsed = JSON.parse(jsonStrip(content))
    const minified = jsonMinify(JSON.stringify(parsed))

    return minified

  } catch (e) {

    throw new Error(e)
  }

}

/**
 * Plugins - Concat development and production plugins
 * based on process env variable.
 *
 * @param {array} devPlugins
 * @param {array} prodPlugins
 */
export const plugins = (devPlugins, prodPlugins) => {

  if (process.env.prod) return [ ...devPlugins, ...prodPlugins ]

  return devPlugins

}

/**
 * License banner applied to javascript files
 *
 * @param {object} package
 * @returns {string}
 */
export const banner = (license = 'PROPRIETARY') => {

  const { name, main, version, author } = read.pkg
  const owner = author
  const date = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .substr(0, 19)

  switch (license) {
    case 'PROPRIETARY': return stripIndent(
      `
      /**
      *
      * !! THIS IS PROPRIETARY SOFTWARE !!
      *
      * @license
      *
      * ${basename(main)}
      *
      * Copyright © of ${owner} - All Rights Reserved.
      *
      * Unauthorized copying or modification of this file, via any medium is strictly
      * prohibited. Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files
      * included in bundle.
      *
      * License:  ${license}
      * Package:  ${name}
      * Version:  ${version}
      * Updated:  ${date}
      *
      */`
    )
    case 'MIT':
    case 'CC BY-NC-ND 4.0': return stripIndent(
      `
      /**
      *
      * @license
      *
      * ${basename(main)}
      *
      * Copyright © ${owner}
      *
      * License:  ${license}
      * Package:  ${name}
      * Version:  ${version}
      * Updated:  ${date}
      *
      * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
      *
      */`
    )
  }
}
