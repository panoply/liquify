import { resolve, join } from 'path'

/**
 * Path - Resolves paths to their current working directory and
 * make paths relative from the root directory when in dev mode and
 * watching the entire repository
 *
 * @export
 * @param {string} name
 * @param {import('../types/index').PathOptions} input
 * @returns
 */
export default name => input => {

  const cwd = process.cwd()
  const pkg = require(`${cwd}/package.json`)

  if (pkg && pkg.name && pkg.name !== 'liquify') return input

  const { path } = Object.values(pkg.packages).find(i => i.name === name)

  if (!path) return input

  if (typeof input === 'string') {
    return resolve(path, input)
  } else if (typeof input === 'object') {
    for (const [ n, v ] of Object.entries(input)) input[n] = join(path, v)
    return input
  }

  // @ts-ignore
  return input.map(i => resolve(path, i))

}
