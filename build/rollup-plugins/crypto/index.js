import { createFilter } from '@rollup/pluginutils'
import cryptographer from '@liquify/cryptographer'
import { extname } from 'path'
/**
 * Replace - Runs a regular expression and replaces
 * all matched tag occurances
 *
 */
export default function (options = {}) {

  const parse = {}
  const filter = createFilter(options.include, options.exclude)
  const crypto = cryptographer(options.password)

  let runner = 0

  return ({
    name: '@liquify/rollup-plugin-crypto',

    options (config) {

      if (runner++) return

      parse.input = Object.entries(config.input)
      config.input.index = 'index.js'

      for (const prop in config.input) {
        if (prop === 'index') continue
        config.input[crypto.encode(prop)] = config.input[prop]
        delete config.input[prop]
      }

      console.log(config.input)

      return config

    },

    resolveId (source) {
      return source === 'index.js' ? source : null
    },

    load (id) {

      if (id !== 'index.js') return null

      const { main } = options
      const [ item ] = parse.input.find(([ k ]) => k === main)
      const modules = parse.input.map(([ k, v ]) => `const ${k} = await import('./${v}')`)
      const decoded = parse.input.map(([ k ]) => (k === options.main
        ? `${k}: () => crypto.decode(${k})`
        : `${k}: () => ({ ...crypto.decode(${item}), ...crypto.decode(${k}) })`
      ))

      return `
      import cryptographer from '@liquify/cryptographer'
      export default async iv => {
        const crypto = cryptographer(iv);
        ${modules.join(';\n')}
        return { ${decoded.join(',\n')} }
      }`

    },
    transform (code, id) {

      if (!filter(id)) return null

      return {
        code: extname(id) !== '.json'
          ? code
          : `module.exports = '${crypto.encode(JSON.parse(code))}'`,
        map: { mappings: '' }
      }

    }

  })
}
