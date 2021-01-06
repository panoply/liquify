import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true
    },
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto'
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
