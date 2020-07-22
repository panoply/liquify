import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'

/**
 * Lexical imports will have `const` references
 * replaced with their number equivalents
 */
// import * as TokenTypes from './src/lexical/types'
// import * as Characters from './src/lexical/characters'
// import * as ScanStates from 'src/lexical/states'
// import * as TokenTags from './src/lexical/tags'
// import * as ParseErrors from './src/lexical/errors'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline'
    },
    {
      format: 'module',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  plugins: plugins([
    json({
      preferConst: true,
      compact: !!process.env.prod
    }),
    babel({
      babelHelpers: 'runtime',
      configFile: './.babelrc'
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
    noderesolve(),
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
