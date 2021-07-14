import { defineConfig as Rollup } from 'rollup';
import { env, config } from '@liquify/rollup-plugin-utils';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { path as stores } from '@liquify/schema-stores';

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
      '@liquify/liquid-parser',
      '@liquify/liquid-language-specs',
      'lodash',
      'strip-json-comments',
      'vscode-languageserver',
      'vscode-css-languageservice',
      'vscode-json-languageservice',
      'vscode-languageserver',
      'vscode-languageserver-textdocument',
      'vscode-uri',
      'prettydiff',
      'fs',
      'path'
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
                src: stores('shopify/sections'),
                dest: 'package/@stores/shopify'
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
            preferBuiltins: true,
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
