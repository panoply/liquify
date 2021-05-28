import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import globs from '@liquify/rollup-plugin-globs'

export default {
  input: 'extension/index.js',
  output: {
    file: 'package/extension.js',
    format: 'cjs',
    sourcemap: process.env.prod ? false : 'inline'
  },
  external: [
    'vscode',
    'vscode-languageclient',
    'path',
    'fs'
  ],
  plugins: plugins([
    globs({
      globs: [
        'package.json',
        'liquid-css.json',
        'LICENSE',
        'language-configuration.json',
        'readme.md',
        'changelog.md',
        '.vscodeignore',
        'ThirdPartyNotices.txt',
        'snippets/*.json',
        'syntaxes/**/*.json',
        'themes/*.json',
        'stores/*.json'
      ],
      dest: 'package',
      transform: {
        LICENSE: '[name].txt',
        '*.json': ({ content }) => ({
          content: jsonmin(content.toString())
        }),
        'syntaxes/*.json': ({ content }) => ({
          content: jsonmin(content.toString()),
          dest: 'package/syntaxes'
        }),
        'stores/*.json': ({ content }) => ({
          content: jsonmin(content.toString()),
          dest: 'package/stores'
        }),
        'snippets/*.json': ({ content }) => ({
          content: jsonmin(content.toString()),
          dest: 'package/snippets'
        }),
        'themes/*.json': ({ content }) => ({
          content: jsonmin(content.toString()),
          dest: 'package/themes'
        }),
        'syntaxes/injections/*.json': ({ content }) => ({
          content: jsonmin(content.toString()),
          dest: 'package/syntaxes/injections'
        })
      }
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    })
  ],
  [
    terser({
      ecma: 2016
      , compress: { passes: 2 }
    })
  ])
}
