const { resolve, join } = require('path')

const parseArray = (path, input) => {

  if (input.length === 0) return new Error(`Empty Glob in ${input}`)
  if (input.length === 1) {
    const string = input[0].toString().trim()

    if (!string.length || string.charCodeAt(0) === 32) {
      return new Error(`Bad or incorrect glob at ${input}`)
    }

    return resolve(path, string)

  }

  return input.map(item => join(path, item.trim()))

}

const parseObject = (path, input) => {

  const object = Object.keys(input)

  if (object.length === 0) return new Error('Empty object at', input)

  const regex = /[/.*]/
  const model = {}

  for (const prop of object) {
    if (typeof input[prop] !== 'string') {
      return new Error(`Glob prop is not a string at ${input[prop]}`)
    } else if (regex.test(prop)) {
      model[join(path, prop)] = join(path, input[prop])
    } else {
      model[prop] = join(path, input[prop])
    }
  }

  return model

}

/**
 * Path - Resolves paths to their current working directory and
 * make paths relative from the root directory when in dev mode and
 * watching the entire repository
 *
 * @export
 * @param {string} name
 * @param {import('../types/index').PathOptions} input
 * @returns {string}
 */
module.exports = (name, parse = []) => {

  const cwd = process.cwd()
  const pkg = require(`${cwd}/package.json`)

  return ({
    $: (
      input
      , options = { root: 'liquify', parse: false }
    ) => {

      // if not in project root
      if (pkg && pkg.name && pkg.name !== options.root) return input

      const { path } = Object.values(pkg.packages).find(i => i.name === name)

      let pattern

      if (!path) pattern = input
      else if (Array.isArray(input)) pattern = parseArray(path, input)
      else if (typeof input === 'string') pattern = resolve(path, input)
      else if (typeof input === 'object') pattern = parseObject(path, input)

      if (options.parse) parse.push(pattern)

      return pattern

    }

  })
}
