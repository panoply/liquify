import { terser } from 'rollup-plugin-terser'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import pkg from './package.json'
import { banner } from '@liquify/rollup-plugin-utils'

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
  /*  terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
*/
  ]
}
