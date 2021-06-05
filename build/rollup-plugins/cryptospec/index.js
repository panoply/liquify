import { createFilter } from '@rollup/pluginutils'
import cryptographer from '@liquify/cryptographer'
import { extname } from 'path'
import { has } from 'rambda'

/**
 * Cryptospec
 *
 * An Internal rollup plugin for producing enigmatic
 * Liquid specification for Liquify.
 *
 *  @return {import('rollup').Plugin}
 */
export default function (options = {
  include: [],
  exclude: [],
  password: null,
  defaults: {}
}) {

  const parse = {}
  const filter = createFilter(options.include, options.exclude)
  const crypto = cryptographer(options.password)

  /**
   * Virtual Generated Export
   *
   * @param {*} json
   * @returns
   */
  const template = (
    {
      standardName,
      standardNameEncoded,
      standardPath,
      extendableVariations
    }
  ) => {

    /** __
     *
     * Decryption
     *
     * The returning value uses the decrypt function,
     * passing the Liquid Standard (decoded) variation
     * which we have decrypted and the variation string
     * that we decrypt before merging with Standard.
     *
     * `base`
     *  > Standard decoded variation
     *
     * `variation`
     * > The passed in specification name
     *
     * @type {string[][]}
     */
    const variations = extendableVariations.map((
      [
        engine,
        encodedPath
      ]
    ) => /* js */`

      if (variation === '${engine}') return decrypt(base,  require('./${encodedPath}'));

    `).join('\n\n')

    /**
     * Returns the Virtual `index.js` module
     * which each specification will use.
     */
    return /* js */`

    import cryptographer from '@liquify/cryptographer';

    export default function ({ variation, license }) {

      const crypto = cryptographer(license);

      /** __
       *
       * Decrypt and Extend
       *
       * Decodes the specification and extends
       * upon the Liquid Standard variation specification.
       *
       * @param {object} standardVariation
       * Liquid Standard Variation (decoded)
       *
       * @param {string} selectedVariation
       * The Selected Variation Path passed in via extendable
       *
       * @returns {object}
       * Returns the decoded variation extending the standard
       */
      function decrypt(standardVariation, selectedVariation) {

        const variant = crypto.decode(selectedVariation);
        const { engine, updated, tags, filters, objects } = {
          ...variant,
          tags: Object.assign(standardVariation.tags, variant.tags),
          filters:  Object.assign(standardVariation.filters, variant.filters),
        };

        return {
          engine,
          updated,
          get objects() {
            return objects
          },
          get tags() {
            return tags
          },
          get filters () {
            return filters
          },
          get entries() {
            return {
              get objects () {
                return Object.entries(objects)
              },
              get tags () {
                return Object.entries(tags)
              },
              get filters () {
                return Object.entries(filters)
              }
            }
          }
        }

      }

      /** __
       *
       * Liquid Standard Specification
       *
       * Returns the standard variation specification
       * encoded module export. All non-standard variations
       * extend upon Liquid standard. We import this module
       * as it is required by all other modules.
       *
       * @type {string}
       */
      const ${standardNameEncoded} = require('./${standardPath}');

      /** __
       *
       * Decode Liquid Standard
       *
       * Decodes the Standard variation, returning the
       * JSON specification reference.
       *
       * @type {object|undefined}
       */
      const base = crypto.decode(${standardNameEncoded})

      /** __
       *
       * Decoding Failed
       *
       * If an object type is not returned upon decryption
       * it is because the License Key (IV) was incorrect.
       * This might be due to another error, we log invalid
       * license either way.
       */
      if (typeof base !== 'object') return new Error("Invalid License key (IV)");

      /** __
       *
       * Check Variation
       *
       * If the variation parameter supplied was "standard"
       * return the promise as standard was already decoded.
       */
      if (variation === '${standardName}') {
        return {
          engine: base.engine,
          updated: base.updated,
          get tags() {
            return base.tags
          },
          get filters() {
            return base.filters
          },
          get entries() {
            return {
              get tags () {
                return Object.entries(base.tags)
              },
              get filters () {
                return Object.entries(base.filters)
              }
            }
          }
        }
      };


      /** __
       *
       * Append Other Variations from above "variations" map
       * function join.
       *
       */
      ${variations}
    }

    `
  }

  /**
   * Defaults Merger
   *
   * Merges Defaults into each specification and encodes
   * each file, returning the enigmatic encryption
   *
   * @param {object} json
   * @returns {string}
   */
  const merge = json => {

    for (const key of Object.keys(json)) {
      if (options.defaults[key]) {
        for (const prop of Object.keys(json[key])) {

          // sets arguments length on an $i field
          if (key === 'filters' && has('arguments', json[key][prop])) {
            json[key][prop].$i = { argsize: json[key][prop].arguments.length - 1 }
          }

          // Merges passed default properties
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
        config.input[crypto.encode(prop)] = config.input[prop]
        delete config.input[prop]
      }

      /**
       * Change Parse JSON names to encrypted equivalents
       */
      parse.input = parse.input.map(([ name, path ]) => [
        name,
        `${crypto.encode(name)}.js`
      ])

      return config

    },

    resolveId (source) {

      return source === 'index.js' ? source : null
    },

    load (id) {

      if (id !== 'index.js') return null

      /**
       * Get Standard variation
       *
       * Pluck the Standard specification from
       * input entry files.
       */
      const [
        standardName,
        standardPath
      ] = parse.input.find((
        [
          engineName
        ]
      ) => engineName === 'standard')

      /**
       * Encoded Standard Name
       *
       * This is prefixed with an underscore value to ensure
       * we are passing a compatible constant.
       */
      const standardNameEncoded = `_${crypto.encode(standardName)}`

      /**
       * Generate the virtual entry file
       */
      return template({
        standardName,
        standardNameEncoded,
        standardPath,
        extendableVariations: parse.input.filter((
          [
            engine
          ]
        ) => engine !== 'standard')
      })

    },

    transform (code, id) {

      if (!filter(id)) return null

      return {
        code: extname(id) !== '.json'
          ? code
          : `module.exports = '${merge(JSON.parse(code))}'`,
        map: {
          mappings: ''
        }
      }

    }

  })
}
