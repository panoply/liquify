import { defineConfig as Rollup } from 'rollup';
import { env, config } from '@liquify/rollup-plugin-utils';
import alias from '@rollup/plugin-alias';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

export default Rollup(
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: env.is('dev', 'inline'),
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    },
    external: [
      '@liquify/liquid-language-specs'
    ],
    plugins: env.if('dev')(
      [
        alias({
          entries: {
            tree: config.path('src/tree'),
            parser: config.path('src/parser'),
            lexical: config.path('src/lexical'),
            config: config.path('src/config.ts')
          }
        }),
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
                src: 'node_modules/@liquify/liquid-language-specs/package/@specs',
                dest: 'package/@specs'
              }
            ]
          }
        ),
        ts(
          {
            check: false,
            useTsconfigDeclarationDir: true,
            typescript
          }
        ),
        noderesolve(
          {
            extensions: [
              '.ts',
              '.js'
            ]
          }
        ),
        commonjs(
          {
            requireReturnsDefault: 'namespace'
          }
        ),
        beep()
      ]
    )(
      [
        terser(
          {
            ecma: 2016,
            compress: {
              passes: 5
            }
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
