import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import { path, plugins, minifyJSON } from '@liquify/rollup'

export default [
  {
    input: path('extension/index.js'),
    output: {
      file: path('package/index.js'),
      format: 'cjs',
      sourcemap: true,
      external: [
        'vscode',
        'vscode-languageclient',
        'liquid-language-server'
      ]
    },
    plugins: plugins(process.env)([
      babel({
        babelHelpers: 'runtime',
        configFile: path('.babelrc')
      }),
      copy({
        targets: [
          {
            src: path([
              'package.json',
              'language-configuration.json',
              'readme.md',
              'changelog.md',
              '.vscodeignore'
            ]),
            dest: 'package'
          },
          {
            src: path('syntaxes/**/*.json'),
            dest: 'package/syntaxes',
            transform: minifyJSON
          }
        ]
      })
    ], [
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ])
  }
]
