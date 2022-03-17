import { defineConfig as Rollup } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import strip from 'rollup-plugin-strip-code';
import { banner, config, env } from '@liquify/rollup-utils';

export default Rollup(
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'inline'),
        banner: banner('PROPRIETARY'),
        exports: 'default',
        esModule: false,
        preferConst: true
      },
      {
        format: 'es',
        file: config.output.esm,
        sourcemap: env.is('dev', 'inline'),
        banner: banner('PROPRIETARY')
      }
    ],
    external: [
      '@rollup/pluginutils',
      'path',
      'rambda',
      'crypto'
    ],
    plugins: env.if('dev')(
      [
        resolve(),
        del(
          {
            verbose: true,
            runOnce: env.watch,
            targets: 'package/*'
          }
        ),
        copy(
          {
            verbose: true,
            copyOnce: env.watch,
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
);
