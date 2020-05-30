import { terser } from 'rollup-plugin-terser'
import { plugins } from '@liquify/rollup-plugin-utils'
import json from '@rollup/plugin-json'
import strip from 'rollup-plugin-strip-code'
import pkg from './package.json'

/**
 * Monorepo path resolver
 */
// const { p } = require('./index')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline'
    },
    {
      format: 'module',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  plugins: plugins([
    json({
      preferConst: true
    })
  ], [
    strip({
      start_comment: 'strip',
      end_comment: 'endstrip'
    }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ])
}
