import { terser } from 'rollup-plugin-terser'

/**
 * Monorepo path resolver
 */
// const { p } = require('./index')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: 'package/index.cjs.js',
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
