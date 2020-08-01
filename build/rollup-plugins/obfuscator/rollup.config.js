import { terser } from 'rollup-plugin-terser'
import { banner } from '@liquify/rollup-plugin-utils'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto',
      banner: banner(pkg, 'MIT')
    },
    {
      format: 'module',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto',
      banner: banner(pkg, 'MIT')
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
