import { createFilter } from '@rollup/pluginutils'
import JavaScriptObfuscator from 'javascript-obfuscator'

/**
 * Replace - Runs a regular expression and replaces
 * all matched tag occurances
 *
 */
export default function (options = {}) {

  return ({
    name: '@liquify/rollup-plugin-obfuscator',
    renderChunk (code) {

      const obfuscate = JavaScriptObfuscator.obfuscate(code, options)
      const result = { code: obfuscate.getObfuscatedCode() }

      if (options.sourceMap && options.sourceMapMode !== 'inline') {
        result.map = obfuscate.getSourceMap()
      }

      return result
    }
  })
}
