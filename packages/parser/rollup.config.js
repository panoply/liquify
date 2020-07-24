import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  exclude: [
    ''
  ],
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true
    },
    {
      format: 'module',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true
    }
  ],
  plugins: plugins([
    noderesolve({ extensions: [ '.ts', '.js' ] }),
    babel({
      babelHelpers: 'runtime',
      configFile: './.babelrc',
      extensions: [ '.ts', '.js' ]
    }),
    commonjs(),
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
    noderesolve({ extensions: [ '.ts', '.js' ] }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    }),
    filesize({
      showGzippedSize: false,
      showMinifiedSize: true
    })
  ])
}
