import commonjs from '@rollup/plugin-commonjs'
import beep from '@rollup/plugin-beep'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'
import { config, env } from '@liquify/rollup-plugin-utils'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: env.if(process.env.prod)(false)('inline'),
      exports: 'auto',
      esModule: false,
      preferConst: true
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: env.if(process.env.prod)(false)('inline'),
      esModule: false,
      preferConst: true
    }
  ],
  external: [ 'crypto' ],
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
    commonjs(),
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
