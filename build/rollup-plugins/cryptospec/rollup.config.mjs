import { terser } from 'rollup-plugin-terser'
import { banner, read } from '@liquify/rollup-plugin-utils'
import strip from 'rollup-plugin-strip-code'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('PROPRIETARY'),
      exports: 'default',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('PROPRIETARY')
    }
  ],
  external: [
    ...Object.keys(read.pkg.dependencies),
    'path',
    'crypto'
  ],
  plugins: [
    strip({
      pattern: /\/\*{2}\s+_{2}[\s\S]*?\*\//g
    }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
