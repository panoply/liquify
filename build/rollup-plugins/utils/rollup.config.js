import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { banner } from './index'
import pkg from './package.json'

export default [
  {
    input: 'index.js',
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        sourcemap: process.env.prod ? false : 'inline',
        banner: banner(pkg, 'MIT'),
        exports: 'named'
      },
      {
        format: 'es',
        file: pkg.module,
        sourcemap: process.env.prod ? false : 'inline',
        banner: banner(pkg, 'MIT')
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
]
