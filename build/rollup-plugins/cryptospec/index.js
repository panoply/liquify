import { createFilter } from '@rollup/pluginutils'
import cryptographer from '@liquify/cryptographer'
import { extname } from 'path'

/**
 * Replace - Runs a regular expression and replaces
 * all matched tag occurrences
 *
 */
export default function (options = {}) {

  const parse = {}
  const filter = createFilter(options.include, options.exclude)
  const crypto = cryptographer(options.master)

  const merge = json => {

    for (const key of Object.keys(json)) {
      if (options.defaults[key]) {
        for (const prop of Object.keys(json[key])) {
          json[key][prop] = { ...options.defaults[key], ...json[key][prop] }
        }
      }
    }

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

        console.log(prop)
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

      const modules = (sync) => parse.input.map(
        ([ k, v ]) => sync
          ? `const ${k} = import('./${v}')`
          : `const ${k} = await import('./${v}')`
      )
      const decoded = parse.input.map(([ k ]) => (k === 'standard'
        ? `get ${k}(){ return decrypt(${k}, crypto.decode(${k})) }`
        : `get ${k}(){ return decrypt(${k}, crypto.decode(${base})) }`
      ))

      const virtual = sync => /* js */`

        const crypto = cryptographer(iv);

        const decrypt = (id, json) => {
          if(typeof json !== 'object') return new Error("Invalid IV password was supplied!")
          if(id === 'standard') return json;
          const variant = crypto.decode(id)
          return (
            {
              ...variant,
              tags: { ...variant.tags, ...json.tags },
              filters: { ...variant.filters, ...json.filters }
            }
          )
        }

        ${modules(sync).join(';\n')}

        return ({ ${decoded.join(',\n')} })

      `

      return /* js */`

      import cryptographer from '@liquify/cryptographer'

      export async function getSpecs (iv) {

        ${virtual(false)}

      }


      export function getSpecsSync (iv) {

        ${virtual(true)}

      }

      `

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
