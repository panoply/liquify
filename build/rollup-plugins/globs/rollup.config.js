import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import pkg from './package.json'

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
  external: [ ...Object.keys(pkg.dependencies), 'path' ],
  plugins: [
    json({
      preferConst: true
    }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
