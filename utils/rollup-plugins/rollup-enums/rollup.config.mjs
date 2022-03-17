import { defineConfig as Rollup } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { banner, config, env } from '@liquify/rollup-utils';

export default Rollup(
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'inline'),
        banner: banner('MIT'),
        exports: 'default',
        esModule: false,
        preferConst: true
      },
      {
        format: 'es',
        file: config.output.esm,
        sourcemap: env.is('dev', 'inline'),
        banner: banner('MIT')
      }
    ],
    external: [
      '@rollup/pluginutils'
    ],
    plugins: env.if('dev')(
      [
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
        )
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
