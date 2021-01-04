import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { banner } from '@liquify/rollup-plugin-utils'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: 'package/index.cjs.js',
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner(pkg, 'PROPRIETARY'),
      exports: 'auto'
    },
    {
      format: 'es',
      file: 'package/index.es.js',
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner(pkg, 'PROPRIETARY')
    }
  ],
  plugins: [
    commonjs(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })

  ]
}
