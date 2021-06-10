import { terser } from 'rollup-plugin-terser'
import { banner, read } from '@liquify/rollup-plugin-utils'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto',
      banner: banner('MIT')
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('MIT')
    }
  ],
  external: [
    '@rollup/pluginutils',
    'javascript-obfuscator'
  ],
  plugins: [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
