import { defineConfig as Rollup } from 'rollup';
import cjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import { config } from './src/index.mjs';

export default Rollup(
  {
    input: 'src/index.mjs',
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
        preferConst: true
      }
    ],
    external: [
      'dotenv',
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
              src: 'src/types/*.ts',
              dest: 'package'
            }
          ]
        }
      ),
      cjs(),
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ]
  }
);
