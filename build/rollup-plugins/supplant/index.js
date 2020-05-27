import { createFilter } from '@rollup/pluginutils'

/**
 * Run Caputure - Execute the plugin capture options
 *
 * @param {string} code
 * @param {import('../types/index').ReplaceOptions} options
 */
const runCapture = (code, { tags, callback, delimeters: [ left, right ] }) => {

  const regexp = `(?<=${left})\\b${tags.join('|')}\\b(?=${right})`
  const regex = new RegExp(regexp, 'g')

  if (!regex.test(code)) return null

  code = code.replace(regex, callback)

  return code || null

}

/**
 * Replace - Runs a regular expression and replaces
 * all matched tag occurances
 *
 * @param {import('../types/index').ReplaceOptions} options
 */
export default function (options) {

  const filter = createFilter(options.include, options.exclude)

  return ({
    name: 'Replace',
    transform (code, id) {
      if (!filter(id)) return null
      return runCapture(code, options)
    }
  })
}
