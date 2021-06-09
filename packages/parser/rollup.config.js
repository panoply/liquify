import { plugins, jsonmin } from '@liquify/rollup-plugin-utils';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { basename, resolve } from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import globs from '@liquify/rollup-plugin-globs';
import { config } from 'dotenv';

config();

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    dir: 'package',
    sourcemap: process.env.prod ? false : 'inline',
    preferConst: true,
    chunkFileNames: '[name].js',
    manualChunks (id) {

      if (id.includes('specs/package')) {

        if (basename(id) === 'index.js') return '@specs/index';

        if (id.includes('d992dc09dd916b8a.js')) {
          return '@specs/variation/' + 'd992dc09dd916b8a';
        }

        if (id.includes('d98ed217d09660.js')) {
          return '@specs/variation/' + 'd98ed217d09660';
        }

        if (id.includes('c083d61ed59c.js')) {
          return '@specs/variation/' + 'c083d61ed59c';
        }

      }

    }
  },
  external: process.env.prod ? [] : [
    '@liquify/liquid-language-specs'
  ],

  plugins: plugins([
    alias(
      {
        entries: {
          lexical: resolve(__dirname, 'src/lexical'),
          parser: resolve(__dirname, 'src/parser'),
          tree: resolve(__dirname, 'src/tree'),
          config: resolve(__dirname, 'src/config')
        }
      }
    ),
    typescript(),
    noderesolve({
      extensions: [
        '.ts',
        '.js'
      ]
    }),
    commonjs({
      requireReturnsDefault: 'namespace'
    }),
    globs({
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
    })
  ],
  [
    terser({
      compress: {
        passes: 2
      }
    }),
    filesize({
      showGzippedSize: false,
      showMinifiedSize: true
    })
  ])
};
