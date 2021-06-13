import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { jsonmin, env, config } from '@liquify/rollup-plugin-utils'
import beep from '@rollup/plugin-beep'
import watch from 'rollup-plugin-watch-assets'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: config.output.esm,
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
            'src/stores/**/*.json',
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
              src: [ 'src/stores/liquidrc.json', 'src/stores/specs.json' ],
              dest: 'package/@stores',
              transform: contents => jsonmin(contents.toString())
            },
            {
              src: 'src/stores/jekyll/_config.json',
              dest: 'package/@stores/jekyll',
              transform: contents => jsonmin(contents.toString())
            },
            {
              src: 'src/stores/shopify/*.json',
              dest: 'package/@stores/shopify',
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
