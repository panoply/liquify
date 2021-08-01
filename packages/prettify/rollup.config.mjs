import { defineConfig as Rollup } from 'rollup';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import { env } from '@liquify/rollup-plugin-utils';
import beep from '@rollup/plugin-beep';
import filesize from 'rollup-plugin-filesize';
import del from 'rollup-plugin-delete';
import typescript from 'typescript';

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
        file: 'package/index.esm.js',
        sourcemap: process.env.prod ? false : 'inline',
        esModule: true,
        freeze: false,
        preferConst: true,
        chunkFileNames: '[name].js'
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
);
