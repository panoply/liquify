import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named'
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  external: [ ...Object.keys(pkg.dependencies), 'path' ],
  plugins: [
    commonjs(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
