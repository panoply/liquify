import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { path, plugins } from '../../bundle/rollup/node_modules/@liquify/rollup-utils'

export default [
  {
    input: path('src/index.js'),
    output: {
      file: path('package/liquid-language-server.js'),
      format: 'cjs',
      sourcemap: !process.env.prod
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
    plugins: plugins(process.env)([
      json({ preferConst: true }),
      babel({ babelHelpers: 'runtime', configFile: path('.babelrc') }),
      copy({
        targets: [
          {
            src: path('LICENSE'),
            dest: path('LICENSE.txt')
          },
          {
            src: path([ 'package.json', 'readme.md', 'ThirdPartyNotices.txt' ]),
            dest: path('package')
          }
        ]
      })
    ],
    [
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ])
  },
  {
    input: path('node_modules/prettydiff/js/prettydiff.js'),
    output: {
      file: path('package/node_modules/prettydiff/index.js'),
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
  }
]
