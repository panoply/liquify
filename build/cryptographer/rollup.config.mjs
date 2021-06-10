import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { banner, read } from '@liquify/rollup-plugin-utils'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto',
      esModule: false,
      preferConst: true,
      banner: banner('CC BY-NC-ND 4.0')
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      sourcemap: process.env.prod ? false : 'inline',
      esModule: false,
      preferConst: true,
      banner: banner('CC BY-NC-ND 4.0')
    }
  ],
  external: [ 'crypto' ],
  plugins: [
    commonjs(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })

  ]
}
