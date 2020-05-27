import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import { plugins, globs, jsonmin } from '@liquify/rollup'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

/**
 * Monorepo path resolver
 */
const { p } = require('@liquify/path-resolve')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: p`src/index.js`,
  output: {
    file: p`package/index.js`,
    format: 'cjs',
    sourcemap: process.env.prod ? false : 'inline'
  },
  external: [
    '@liquify/liquid-language-specs',
    'prettydiff',
    'vscode-languageserver',
    'vscode-css-languageservice',
    'vscode-html-languageservice',
    'vscode-json-languageservice',
    'vscode-languageserver',
    'vscode-languageserver-textdocument',
    'vscode-uri'
  ],
  plugins: plugins([
    globs({
      globs: p([
        'package.json',
        'readme.md',
        'changelog.md',
        'ThirdPartyNotices.txt',
        'LICENSE'
      ]),
      dest: p`package`,
      transform: {
        '**/*.json': jsonmin
      }
    }),
    json({
      preferConst: true,
      compact: !!process.env.prod
    }),
    babel({
      babelHelpers: 'runtime'
      // configFile: p`babel.config.json`
    })
  ],
  [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ])
}
/* {
    input: p('node_modules/prettydiff/js/prettydiff.js'),
    output: {
      file: p('package/node_modules/prettydiff/index.js'),
      format: 'cjs',
      sourcemap: !process.env.prod
    },
    plugins: [
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ]
  } */
