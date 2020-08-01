import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import { basename } from 'path'
import { statSync } from 'fs-extra'
import stripIndent from 'strip-indent'
/**
 * Minify JSON and strip JSONC files
 *
 * @param {string} content
 */
export const jsonmin = content => {

  const parsed = JSON.parse(jsonStrip(content))
  const minified = jsonMinify(JSON.stringify(parsed))

  return minified

}

/**
 * Plugins - Concats development and production plugins
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
export const banner = ({
  name
  , main
  , version
  , author
  , owner
  , created
}, license = 'PROPRIETARY') => {

  owner = owner || author

  const date = new Date(statSync(main).mtimeMs)
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
      * Created:  ${created}
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
      * Created:  ${created}
      *
      * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
      *
      */`
    )
  }
}
