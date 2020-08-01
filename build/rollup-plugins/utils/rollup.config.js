import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { banner } from './package/index.es'
import pkg from './package.json'

export default [
  {
    input: 'index.js',
    output: [
      {
        format: 'cjs',
        file: 'package/index.cjs.js',
        sourcemap: process.env.prod ? false : 'inline',
        banner: banner(pkg, 'MIT')
      },
      {
        format: 'es',
        file: 'package/index.es.js',
        sourcemap: process.env.prod ? false : 'inline',
        banner: banner(pkg, 'MIT')
      }
    ],
    external: Object.keys(pkg.dependencies),
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
