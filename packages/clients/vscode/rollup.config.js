import babel from '@rollup/plugin-babel'
import globsync from 'rollup-plugin-globsync'
import { terser } from 'rollup-plugin-terser'
import { path, plugins } from '@liquify/rollup'
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
      globsync({
        patterns: ([
          'package.json',
          'language-configuration.json',
          'readme.md',
          'changelog.md',
          '.vscodeignore'
        ]),
        dest: $('package'),
        // @ts-ignore
        options: {
          loglevel: 'silly',
          transform (file) {
            console.log(file)
            return file
          }
        }
      }),
      babel({
        babelHelpers: 'runtime',
        configFile: $('./.babelrc')
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
