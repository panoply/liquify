import { terser } from 'rollup-plugin-terser'
// import pkg from './package.json'

/**
 * Monorepo path resolver
 */
// const { p } = require('../../path-resolve/package/index.cjs')(pkg)

/**
 * Rollup Bundle
 */
export default [
  {
    input: 'index.js',
    output: [
      {
        format: 'cjs',
        file: 'package/index.cjs.js',
        sourcemap: !process.env.prod
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
]
