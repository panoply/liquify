import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import { resolve } from 'path'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'

export default {
  input: 'src/index.js',
  output: {
    format: 'module',
    dir: 'package',
    sourcemap: process.env.prod ? false : 'inline',
    preferConst: true,
    chunkFileNames: '[name].js'
  },
  external: process.env.prod ? [] : [
    '@liquify/liquid-language-specs'
  ],
  plugins: plugins([
    alias({
      entries: {
        parser: resolve(__dirname, 'src/parser'),
        enums: resolve(__dirname, './src/enums'),
        scanner: resolve(__dirname, './src/scanner'),
        lexical: resolve(__dirname, './src/lexical')
      }
    }),
    noderesolve({
      extensions: [
        '.ts',
        '.js'
      ]
    }),
    babel({
      babelHelpers: 'runtime',
      configFile: './.babelrc',
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
}
