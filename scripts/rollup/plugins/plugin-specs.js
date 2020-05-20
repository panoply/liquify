// @ts-nocheck

import _ from 'lodash'
import path from 'path'
import strip from 'strip-json-comments'
import { createFilter, dataToEsm } from '@rollup/pluginutils'

const getList = (type, spec) => (
  Object
  .entries(spec)
  .map(([ id, value ]) => value.type === type ? id : false)
  .filter(Boolean)
)

export default function (options) {

  const filter = createFilter(options.include, options.exclude)
  const standard = require(path.resolve(options.main))

  return ({
    name: 'Liquid Specifications',
    transform (variation, id) {

      if (id.slice(-5) !== '.json' || !filter(id)) return null

      const spec = { spec: {}, parse: {}, validate: {} }
      const name = path.basename(id, '.json')
      const json = JSON.parse(strip(variation))

      // Assign the specification value
      _.assign(spec.spec, standard, name !== 'standard' ? json : null)

      // Assign the parser value
      _.assign(spec.parse, {
        objects: getList('object', spec.spec),
        filters: getList('filter', spec.spec)
      })

      return {
        map: { mappings: '' },
        code: dataToEsm(spec, {
          preferConst: true,
          compact: false,
          objectShorthand: true,
          namedExports: false
        })
      }
    }
  })
}
