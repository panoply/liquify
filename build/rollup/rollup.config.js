import { terser } from 'rollup-plugin-terser'

/**
 * @typedef {import('rollup').RollupOptions} export
 * @type {export}
 */
export default [
  {
    input: './index.js',
    output: [
      {
        format: 'commonjs',
        file: 'package/index.cjs.js',
        sourcemap: !process.env.prod
      },
      {
        format: 'module',
        file: 'package/index.es.js',
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
