import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import globs from '@liquify/rollup-plugin-globs'
import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'package/server.js',
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
    commonjs(),
    globs({
      globs: [
        'package.json',
        'readme.md',
        'changelog.md',
        'ThirdPartyNotices.txt',
        'LICENSE',
        'shopify-sections.json'
      ],
      dest: 'package',
      transform: p({
        LICENSE: '[name].txt',
        '*.json': ({ content }) => ({
          content: jsonmin(content.toString())
        })
      })
    }),
    json({
      preferConst: true,
      compact: !!process.env.prod
    }),
    babel({
      babelHelpers: 'runtime'
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
