import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import noderesolve from '@rollup/plugin-node-resolve'
import { env } from '@liquify/rollup-plugin-utils'
import beep from '@rollup/plugin-beep'
import filesize from 'rollup-plugin-filesize'
import del from 'rollup-plugin-delete'
import typescript from 'typescript'

export default {
  input: {
    index: 'src/index.ts',
    '@vendor/prettydiff': './src/vendors/prettydiff.js',
    '@vendor/jsbeautify': './src/vendors/jsbeautify.js'

  },
  output: [
    {
      format: 'cjs',
      dir: 'package',
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named',
      esModule: false,
      preferConst: true
    }
  ],
  plugins: env.if('dev')(
    [
      ts(
        {
          check: false,
          useTsconfigDeclarationDir: true,
          typescript
        }
      ),
      noderesolve({
        extensions: [ '.js', '.ts' ]
      }),
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
      ),
      filesize(
        {
          showGzippedSize: false,
          showMinifiedSize: true
        }
      )
    ]
  )
}
