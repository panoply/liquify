import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { jsonmin, env, read } from '@liquify/rollup-plugin-utils'
import beep from '@rollup/plugin-beep'
import watch from 'rollup-plugin-watch-assets'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.js',
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
      esModule: false,
      preferConst: true
    }
  ],
  plugins: env.unless(process.env.prod)(
    [
      commonjs(
        {
          transformMixedEsModules: true
        }
      ),
      beep(),
      del(
        {
          verbose: true,
          runOnce: !process.env.prod,
          targets: 'package/*'
        }
      ),
      watch(
        {
          assets: [
            'stores/**/*.json',
            'src/index.d.ts'
          ]
        }
      ),
      copy(
        {
          verbose: true,
          copyOnce: !!process.env.prod,
          targets: [
            {
              src: 'src/index.d.ts',
              dest: 'package'
            },
            {
              src: 'stores/**/*.json',
              dest: 'package/@stores',
              transform: contents => jsonmin(contents.toString())
            }
          ]
        }
      )
    ]
  )(
    [
      terser(
        {
          ecma: 6
          , warnings: 'verbose'
          , compress: { passes: 2 }
        }
      )
    ]
  )
}
