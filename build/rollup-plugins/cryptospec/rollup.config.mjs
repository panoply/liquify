import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import beep from '@rollup/plugin-beep'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import { banner, config, env } from '@liquify/rollup-plugin-utils'
import strip from 'rollup-plugin-strip-code'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('PROPRIETARY'),
      exports: 'default',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('PROPRIETARY')
    }
  ],
  external: [
    '@rollup/pluginutils',
    'path',
    'rambda',
    'crypto'
  ],
  plugins: env.unless(process.env.prod)(
    [
      resolve(),
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
      strip(
        {
          pattern: /\/\*{2}\s+_{2}[\s\S]*?\*\//g
        }
      ),
      beep()
    ]
  )(
    [
      terser(
        {
          ecma: 2016
          , warnings: 'verbose'
          , compress: { passes: 2 }
        }
      )
    ]
  )

}
