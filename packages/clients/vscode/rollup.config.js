import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'

/**
 * Monorepo path resolver
 */
const { p } = require('@liquify/path-resolve')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: p`extension/index.js`,
  output: {
    file: p`package/extension.js`,
    format: 'cjs',
    sourcemap: process.env.prod ? false : 'inline'
  },
  external: [
    'vscode',
    'vscode-languageclient',
    'liquid-language-server'
  ],
  plugins: plugins([
    globs({
      globs: [
        'package.json',
        'LICENSE',
        'language-configuration.json',
        'readme.md',
        'changelog.md',
        '.vscodeignore',
        'ThirdPartyNotices.txt',
        'syntaxes/**/*.json'
      ],
      transform: {
        LICENSE: 'LICENSE.txt',
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
      exclude: p`node_modules/**`
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
