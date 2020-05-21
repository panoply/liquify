import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import { path, plugins, minifyJSON } from '@liquify/rollup'
import { name } from './package.json'

const $ = path(name)

export default [
  {
    input: $('extension/index.js'),
    output: {
      file: $('package/index.js'),
      format: 'cjs',
      sourcemap: true,
      external: [
        'vscode',
        'vscode-languageclient',
        'liquid-language-server'
      ]
    },
    plugins: plugins([
      babel({
        babelHelpers: 'runtime',
        configFile: $('./.babelrc')
      }),
      copy({
        targets: [
          {
            src: $([
              'package.json',
              'language-configuration.json',
              'readme.md',
              'changelog.md',
              '.vscodeignore'
            ]),
            dest: 'package'
          },
          {
            src: $('syntaxes/**/*.json'),
            dest: 'package/syntaxes',
            transform: minifyJSON
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
  }
]
