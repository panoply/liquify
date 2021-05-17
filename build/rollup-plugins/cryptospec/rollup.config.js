import { terser } from 'rollup-plugin-terser'
import { banner } from '@liquify/rollup-plugin-utils'
import strip from 'rollup-plugin-strip-code'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: 'package/index.cjs.js',
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner(pkg, 'CC BY-NC-ND 4.0'),
      exports: 'named'
    },
    {
      format: 'es',
      file: 'package/index.es.js',
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner(pkg, 'CC BY-NC-ND 4.0')
    }
  ],
  external: [ '@liquify/cryptographer', 'path', 'crypto' ],
  plugins: [
    strip({
      pattern: /\/\*{2}\s+_{2}[\s\S]*?\*\//g
    }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
