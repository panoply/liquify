import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import { plugins, globs, jsonmin } from '@liquify/rollup'
import { name } from './package.json'

const { $ } = require('@liquify/path-resolve')(name)

export default {
  input: $`src/index.js`,
  output: {
    file: $`package/index.js`,
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
      globs: $([
        'package.json',
        'readme.md',
        'changelog.md',
        'ThirdPartyNotices.txt',
        'LICENSE'
      ]),
      dest: $`package`,
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
      // configFile: $`babel.config.json`
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
    input: $('node_modules/prettydiff/js/prettydiff.js'),
    output: {
      file: $('package/node_modules/prettydiff/index.js'),
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
