import { terser } from 'rollup-plugin-terser'
import beep from '@rollup/plugin-beep'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import { banner, config } from '@liquify/rollup-plugin-utils'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'default',
      esModule: false,
      preferConst: true,
      banner: banner('MIT')
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: process.env.prod ? false : 'inline',
      esModule: false,
      preferConst: true,
      banner: banner('MIT')
    }
  ],
  external: [
    '@rollup/pluginutils',
    'javascript-obfuscator'
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
    terser(
      {
        ecma: 2016
        , warnings: 'verbose'
        , compress: { passes: 2 }
      }
    )
  ]
}
