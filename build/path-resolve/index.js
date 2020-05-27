const { join, basename } = require('path')

/* -------------------------------------------- */
/*                 PATH RESOLVE                 */
/* -------------------------------------------- */

/**
 * Parse array type parameters
 *
 * @param {string} input
 * @param {string|false} path
 * @returns {string|string[]|false}
 */
const parseArray = (input, path) => {

  if (input.length <= 1) {

    const string = input.toString().trim()

    if (!string.length) {
      throw new Error('invalid or incorrect file glob passed to resolver')
    } else {
      return path ? join(path, string) : string
    }

  }

  return input.map(item => path ? join(path, item.trim()) : item.trim())

}

/**
 * Parse object type parameters
 *
 * @param {string} input
 * @param {string|false} path
 */
const parseObject = (input, path) => {

  const object = Object.keys(input)

  if (object.length === 0) throw new Error(`empty object at ${input}`)

  if (!path) return input

  const model = {}
  const regex = /[/.*]/

  for (const prop of object) {
    if (typeof input[prop] !== 'string') {
      throw new Error(`glob prop is not a string at ${input[prop]}`)
    } else if (regex.test(prop)) {
      model[join(path, prop)] = join(path, input[prop])
    } else {
      model[prop] = join(path, input[prop])
    }
  }

  return model

}

/**
 * Gets the Resolved path
 *
 * @param {object} pkg
 * @returns {(string|boolean|void)}
 */
const getResolvedPath = (pkg) => {

  const cwd = process.cwd()
  const dir = basename(cwd)

  console.log(dir)
  if (dir !== 'project') return false

  const { packages } = require(join(cwd, 'package.json'))

  for (const { name, path } of Object.values(packages)) {
    if (name === pkg.name) return path
  }
}

/**
 * Resolves paths to their current working directory
 *
 * @export
 * @param {object} input
 * @param {object} options
 * @returns {(string|object|array)}
 */
module.exports = pkg => {

  console.log(pkg)

  const path = getResolvedPath(pkg)

  return ({
    p: input => Array.isArray(input) ? parseArray(input, path)
      : (typeof input === 'string' && path) ? join(path, input)
        : (typeof input === 'object' && path) ? parseObject(input, path) : input

  })

}
