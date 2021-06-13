import { env, config } from '@liquify/rollup-plugin-utils';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { path as stores } from '@liquify/schema-stores';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    }
  ],
  external: [
    // '@liquify/liquid-language-specs',
    // '@liquify/liquid-parser',
    'lodash',
    'vscode-languageserver',
    'vscode-css-languageservice',
    'vscode-html-languageservice',
    'vscode-json-languageservice',
    'vscode-languageserver',
    'vscode-languageserver-textdocument',
    'vscode-uri',
    'prettydiff',
    'fs',
    'path'
  ],
  plugins: env.unless(process.env.prod)(
    [
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
          copyOnce: !!process.env.prod,
          targets: [
            {
              src: 'node_modules/@liquify/liquid-language-specs/package/@specs',
              dest: 'package'
            },
            {
              src: stores('shopify/sections'),
              dest: 'package/@stores/shopify'
            }
          ]
        }
      ),
      typescript(
        {
          check: false,
          useTsconfigDeclarationDir: true
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
      commonjs(),
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
};
