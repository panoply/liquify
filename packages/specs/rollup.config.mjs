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
    input: {
      file: 'src/manager.ts',
      shopify: 'src/liquid/data/shopify/export.ts'
    },
    output: {
      format: 'cjs',
      dir: 'dist',
      sourcemap: env.is('dev', 'inline'),
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    },
    plugins: env.if('dev')(
      [
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
