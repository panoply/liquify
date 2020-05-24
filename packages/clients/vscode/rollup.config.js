import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { name } from './package.json'
import { jsonmin, plugins, globs } from '@liquify/rollup'

const { $ } = require('@liquify/path-resolve')(name)

export default {
  input: $`extension/index.js`,
  output: {
    file: $`package/index.js`,
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
      globs: $([
        'package.json',
        'LICENSE',
        'language-configuration.json',
        'readme.md',
        'changelog.md',
        '.vscodeignore',
        'ThirdPartyNotices.txt'
      ]),
      dest: $`package`,
      transform: {
        '**/*.json': jsonmin
      }
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: $`node_modules/**`
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
