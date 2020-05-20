// @ts-nocheck

import { createFilter } from '@rollup/pluginutils'

/**
 * Tag Replace - Runs a regular expression and replaces all matched
 * tag occurances
 *
 * @export
 * @param {string[]} options.include
 * @param {string[]} options.exclude
 * @param {string[]} options.delimeters
 * @param {string[]} options.tags
 * @param {(match: ...string) => string} options.callback
 * @returns
 */
export default function (options) {

  const filter = createFilter(options.include, options.exclude)
  const { tags, callback, delimeters: [ left, right ] } = options

  const runCapture = (code, id) => {
    const regexp = new RegExp(`(?<=${left})\\b${tags.join('|')}\\b(?=${right})`, 'gm')
    if (!regexp.test(code)) return null
    code = code.replace(regexp, callback)
    if (!code) return null
    return code
  }

  return ({
    name: 'Tag Replace',
    transform (code, id) {
      if (!filter(id)) return null
      return runCapture(code, id)
    }
  })
}
