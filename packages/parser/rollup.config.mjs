import { plugins, jsonmin } from '@liquify/rollup-plugin-utils';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import globs from '@liquify/rollup-plugin-globs';
import { config } from 'dotenv';
import beep from '@rollup/plugin-beep';

config();

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    dir: 'package',
    sourcemap: process.env.prod ? false : 'inline',
    preferConst: true,
    esModule: false,
    chunkFileNames: '[name].js'
  },
  external: [
    '@liquify/liquid-language-specs'
  ],

  plugins: plugins(
    [
      beep(),
      typescript(),
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
      globs(
        {
          globs: [
            'package.json',
            'readme.md',
            'changelog.md',
            'ThirdPartyNotices.txt',
            'LICENSE'
          ],
          dest: 'package',
          transform: {
            LICENSE: '[name].txt',
            '*.json': ({ content }) => ({ content: jsonmin(content.toString()) })
          }
        }
      )
    ],
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
