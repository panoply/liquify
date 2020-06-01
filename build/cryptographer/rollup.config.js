import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

/**
 * Monorepo path resolver
 */
const { p } = require('@liquify/path-resolve')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: p`index.js`,
  output: [
    {
      format: 'cjs',
      file: p`package/index.cjs.js`,
      sourcemap: process.env.prod ? false : 'inline'
    },
    {
      format: 'es',
      file: p`package/index.es.js`,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  plugins: [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
