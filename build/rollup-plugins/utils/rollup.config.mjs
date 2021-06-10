import cjs from '@rollup/plugin-commonjs'
import beep from '@rollup/plugin-beep'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'
import { read } from './src/index.mjs'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.mjs',
  output: [
    {
      format: 'cjs',
      file: read.pkg.exports.require,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: read.pkg.exports.import,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true
    }
  ],
  external: [
    'chalk',
    'jsonminify',
    'strip-indent',
    'strip-json-comments',
    'path',
    'fs'
  ],
  plugins: [
    del(
      {
        verbose: true,
        runOnce: !process.env.prod,
        targets: 'package/*'
      }
    ),
    copy(
      {
        verbose: true,
        copyOnce: !process.env.prod,
        targets: [
          {
            src: 'src/index.d.ts',
            dest: 'package'
          }
        ]
      }
    ),
    beep(),
    cjs(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
