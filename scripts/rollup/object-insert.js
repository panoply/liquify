// @ts-nocheck
import { createFilter } from '@rollup/pluginutils'
import { readFileSync } from 'fs'
import { resolve } from 'path'

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
  const requires = Object.keys(options.require)
  const runCapture = (code, id) => {

    for (const req in options.require) {

      const regexp = new RegExp(`require\\('?"?${req}'?"?\\)`, 'gm')
      if (!regexp.test(code)) return null
      code = code.replace(regexp, options.require[req])

    }

    if (!code) return null
    return code

  }

  return ({
    name: 'Object Insert',
    transform (code, id) {
      if (!filter(id)) return null
      return runCapture(code, id)
    }
  })
}
