import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import { read, banner } from '@liquify/rollup-plugin-utils'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('MIT'),
      exports: 'default',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      banner: banner('MIT'),
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  external: [ ...Object.keys(read.pkg.dependencies), 'path' ],
  plugins: [
    json({
      preferConst: true
    }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
