import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import globsync from 'rollup-plugin-globsync'
import { path, plugins } from '@liquify/rollup'
import { name } from './package.json'

const $ = path(name)

export default [
  {
    input: $('src/index.js'),
    output: {
      file: $('package/liquid-language-server.js'),
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
    plugins: plugins([
      json({
        preferConst: true,
        compact: !!process.env.prod
      }),
      babel({
        babelHelpers: 'runtime',
        configFile: $('./.babelrc')
      }),
      globsync({
        // @ts-ignore
        patterns: $([
          './package.json',
          './readme.md',
          './ThirdPartyNotices.txt',
          './LICENSE'
        ]),
        dest: $('package'),
        // @ts-ignore
        options: {
          transform (file) {
            console.log(file)
            return file
          }
        }
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
  }
]
