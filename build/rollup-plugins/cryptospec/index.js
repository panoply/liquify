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
  ) => /* js */`

    import cryptographer from '@liquify/cryptographer'

    export async function specs (licenseKey, variation) {

      const crypto = cryptographer(licenseKey);

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
       * The Selected Variation (encoded)
       *
       * @returns {object}
       * Returns the decoded variation extending the standard
       */
      function decrypt(standardVariation, selectedVariation) {

        const variant = crypto.decode(selectedVariation);

        return {
          ...variant,
          tags: Object.assign(variant.tags, standardVariation.tags),
          filters:  Object.assign(variant.filters, standardVariation.filters),
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
      const ${standardNameEncoded} = await import('./${standardPath}');

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
      if(typeof base !== 'object') {
        return new Error("Invalid License key (IV) was supplied!")
      }

      /** __
       *
       * Check Variation
       *
       * If the variation parameter supplied was "standard"
       * return the promise as standard was already decoded.
       */
      if (crypto.encode(variation) === '${crypto.encode(standardName)}') return base


      return (

        /** __
         *
         * IIFE Caller
         *
         * @param {string} spec
         * The variation name as an encoded string
         */
        spec => ({

        /** __
         *
         * Return Variation
         *
         * Getter which returns the "variation" specification.
         * The getters name is the encoded variation equivalent
         * and the getter returns and asynchronous IIFE which
         * fetches the module, decrypts its contents, merges with
         * Liquid Standard and returns the decoded variation.
         *
         * @readonly
         * @type {object}
         */
        ${extendableVariations.map(([ engine, encodedPath ]) => /* js */`

          /** __
           *
           * Getter Name
           *
           * The getter name is the encoded name, same as the
           * name used for each file.
           */
          get '${crypto.encode(engine)}'() {

            /** __
             *
             * Returning Asynchronous IIFE
             *
             * Rollup will handle the "import" when compiling,
             * which will be converted accordingly.
             */
            return (async () => {

              const variant = await import('./${encodedPath}');

              /** __
               *
               * Decryption
               *
               * The returning value uses the decrypt function,
               * passing the Liquid Standard (decoded) variation
               * which we decrypted above and the variation string
               * that we decrypt before merging with Standard.
               */
              return decrypt(base, variant)

            })()

          }

        `).join(',\n')}
        }[spec]

      ))(crypto.encode(variation))

    }
    `

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
