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
    'liquid-language-server',
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
        'syntaxes/**/*.json'
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
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ])
}
