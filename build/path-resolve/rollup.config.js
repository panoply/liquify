const { terser } = require('rollup-plugin-terser')
const { name } = require('./package.json')
const { $ } = require('./index')(name)

/**
 * @typedef {import('rollup`.RollupOptions} export
 * @type {export}
 */
export default [
  {
    input: $`index.js`,
    output: [
      {
        format: 'cjs',
        file: $`package/index.cjs.js`,
        sourcemap: process.env.prod ? false : 'inline'
      },
      {
        format: 'module',
        file: $`package/index.es.js`,
        sourcemap: process.env.prod ? false : 'inline'
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
