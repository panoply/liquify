import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { jsonmin, plugins, globs } from '@liquify/rollup'
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
    file: p`package/index.js`,
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
      globs: p([
        'package.json',
        'LICENSE',
        'language-configuration.json',
        'readme.md',
        'changelog.md',
        '.vscodeignore',
        'ThirdPartyNotices.txt',
        'syntaxes/**/*.json'
      ]),
      dest: p`package`,
      transform: {
        '**/*.json': jsonmin
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
