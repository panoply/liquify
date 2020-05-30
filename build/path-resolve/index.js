const { join, basename } = require('path')

/**
 * Parse array type parameters
 *
 * @param {string[]} input
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
 * @param {object} options
 */
const parseObject = (input, path) => {

  const object = Object.keys(input)

  if (object.length === 0) throw new Error(`empty object at ${input}`)

  if (!path) return input

  const model = {}
  const regex = /(\.|\*|\/)/

  for (const prop of object) {
    if (regex.test(prop)) {
      model[join(path, prop)] = typeof input[prop] === 'string'
        ? join(path, input[prop])
        : input[prop]
    } else {
      model[prop] = join(path, input[prop])
    }
  }

  console.log(model)

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

  if (dir !== 'project') return ''

  const { packages } = require(join(cwd, 'package.json'))

  for (const { name, path } of Object.values(packages)) {
    if (name === pkg.name) return path
  }
}

/**
 * Resolves paths to their current working directory
 *
 * @export
 * @param {object} pkg
 * @returns {(string|object|array)}
 */
module.exports = pkg => {

  const path = getResolvedPath(pkg)

  return ({
    p: (input) => {

      if (Array.isArray(input)) {
        return parseArray(input, path)
      } else if (typeof input === 'string' && path) {
        return join(path, input)
      } else if (typeof input === 'object' && path) {
        return parseObject(input, path)
      }

    }
  })

}
