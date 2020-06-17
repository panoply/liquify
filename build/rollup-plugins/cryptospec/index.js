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
  const merge = json => {

    Object.keys(json).forEach(
      key => options.defaults[key] && Object.keys(json[key]).forEach(
        prop => (
          json[key][prop] = {
            ...options.defaults[key],
            ...json[key][prop]
          }
        )
      )
    )

    return crypto.encode(json)
  }

  let runner = 0

  return ({
    name: '@liquify/rollup-plugin-cryptospec',

    options (config) {

      if (runner++) return

      parse.input = Object.entries(config.input)
      config.input.index = 'index.js'

      for (const prop in config.input) {
        if (prop === 'index') continue
        config.input[crypto.encode(prop)] = config.input[prop]
        delete config.input[prop]
      }

      return config

    },

    resolveId (source) {
      return source === 'index.js' ? source : null
    },

    load (id) {

      if (id !== 'index.js') return null

      const [ base ] = parse.input.find(([ k ]) => k === 'standard')
      const modules = parse.input.map(([ k, v ]) => `const ${k} = await import('./${v}')`)
      const decoded = parse.input.map(([ k ]) => (k === 'standard'
        ? `${k}: () => decrypt(${k}, crypto.decode(${k}))`
        : `${k}: () => decrypt(${k}, crypto.decode(${base}))`
      ))

      return `
      import cryptographer from '@liquify/cryptographer'
      export default async iv => {
        const crypto = cryptographer(iv);
        function decrypt(id, json) {
          if(typeof json !== 'object') return new Error("Invalid IV password was supplied!")
          if(id === 'standard') return json;
          const variant = crypto.decode(id)
          return {
            ...variant,
            filters: {
              ...variant.filters,
              ...json.filters
            },
            tags: {
              ...variant.tags,
              ...json.tags
            }
          }
        }

        ${modules.join(';\n')}

        return { ${decoded.join(',\n')} }

      }`

    },
    transform (code, id) {

      if (!filter(id)) return null

      return {
        code: extname(id) !== '.json'
          ? code
          : `module.exports = '${merge(JSON.parse(code))}'`,
        map: { mappings: '' }
      }

    }

  })
}
