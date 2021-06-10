import cjs from '@rollup/plugin-commonjs'
import beep from '@rollup/plugin-beep'
import { terser } from 'rollup-plugin-terser'
import { read } from './index.mjs'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'index.mjs',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true
    }
  ],
  external: [
    ...Object.keys(read.pkg.dependencies),
    'path',
    'fs'
  ],
  plugins: [
    beep(),
    cjs(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
