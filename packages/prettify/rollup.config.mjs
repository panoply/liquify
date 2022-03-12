import { defineConfig as Rollup } from 'rollup';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import { env } from '../../utils/rollup-utils/package';
import beep from '@rollup/plugin-beep';
import filesize from 'rollup-plugin-filesize';
import del from 'rollup-plugin-delete';

export default Rollup(
  {
    input: 'src/export.ts',
    preserveEntrySignatures: 'allow-extension',
    output: [
      {
        format: 'cjs',
        file: 'package/index.js',
        sourcemap: process.env.prod ? false : 'inline',
        esModule: false,
        freeze: false,
        preferConst: true,
        chunkFileNames: '[name].js'
      },
      {
        format: 'esm',
        file: 'package/index.mjs',
        sourcemap: process.env.prod ? false : 'inline',
        esModule: true,
        freeze: false,
        preferConst: true,
        chunkFileNames: '[name].js'
      }
    ],
    plugins: env.if('dev')(
      [
        esbuild(),
        noderesolve({
          extensions: [ '.js', '.ts' ]
        }),
        commonjs(),
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
        minify(),
        filesize(
          {
            showGzippedSize: false,
            showMinifiedSize: true
          }
        )
      ]
    )
  }
);
