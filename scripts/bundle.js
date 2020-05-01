import fs from 'fs'
import path from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'

/**
 * @param {string} content
 */
export const json = content => {

  const parsed = JSON.parse(stripJsonComments(content.toString()))
  const string = JSON.stringify(parsed)
  const minify = jsonMinify(string)

  return minify

}

/**
 * @param {object} config
 */
export const bundle = config => {

  // fail when no specification\s
  if (path.extname(config.specs.input).length > 0) return null

  const externals = file => `./spec/${file.substring(0, file.length - 2)}`
  const specifications = config => name => ({
    input: `${config.input}/${name}`,
    output: config.output,
    plugins: config.plugins
  })

  const build = specifications(config.specs)
  const files = fs.readdirSync(path.resolve(config.specs.input))
  const specs = files.map(build)

  config.server[0].external.push(...files.map(externals))

  return [
    ...config.clients,
    ...config.server,
    ...specs
  ]

}
