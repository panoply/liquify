import { defineConfig as Rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import { config, env } from '@liquify/rollup-utils';

export default Rollup(
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'inline'),
        exports: 'auto',
        esModule: false,
        preferConst: true
      },
      {
        format: 'es',
        file: config.output.esm,
        sourcemap: env.is('dev', 'inline'),
        esModule: false,
        preferConst: true
      }
    ],
    external: [ 'crypto' ],
    plugins: [
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
      commonjs(),
      terser(
        {
          ecma: 2016
          , warnings: 'verbose'
          , compress: { passes: 2 }
        }
      )

    ]
  }
);
