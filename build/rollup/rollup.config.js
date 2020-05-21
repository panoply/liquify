import { terser } from 'rollup-plugin-terser'
import { path } from '@liquify/rollup'
import { name } from './package.json'

const $ = path(name)

/**
 * @typedef {import('rollup').RollupOptions} export
 * @type {export}
 */
export default [
  {
    input: $('index.js'),
    output: [
      {
        format: 'cjs',
        file: $('package/index.cjs.js'),
        sourcemap: !process.env.prod
      },
      {
        format: 'module',
        file: $('package/index.es.js'),
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
