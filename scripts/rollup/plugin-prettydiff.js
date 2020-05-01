// @ts-nocheck

import _ from 'lodash'
import path from 'path'
import strip from 'strip-json-comments'
import { createFilter, dataToEsm } from '@rollup/pluginutils'

export default function (options) {

  return ({
    name: 'Liquid Specifications',
    transform (code, id) {

      code = code.replace(/\(function\sfinalFile_init\(\)([\s\S]*)(?=\(function\sdiffview_init())/gm, '')
      return {
        map: { mappings: '' },
        code
      }
    }
  })
}
