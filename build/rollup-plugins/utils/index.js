import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'
// import { basename } from 'path'
// import { statSync } from 'fs-extra'

// export { default as banner } from './utils/banner'

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
