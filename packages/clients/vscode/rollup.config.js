import { resolve } from 'path'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { minifyJSON } from './scripts/bundle'
import { packages } from './package.json'

export default {
  input: 'extension/index.js',
  output: {
    file: 'package/index.js',
    format: 'cjs',
    sourcemap: true,
    external: [
      'vscode',
      'vscode-languageclient',
      'liquid-language-server'
    ]
  },
  plugins: [
    babel({
      babelHelpers: 'runtime',
      configFile: resolve(__dirname, './babel.config.json')
    }),
    copy({
      targets: [
        {
          src: `${packages.schema}/stores/liquidrc.json`,
          dest: 'schema',
          transform: minifyJSON,
          verbose: true
        },
        {
          src: [
            'syntaxes/**/*.json'
          ],
          dest: 'package/syntaxes',
          transform: minifyJSON,
          verbose: true
        },
        {
          src: [
            'package.json',
            'language-configuration.json',
            'readme.md',
            'changelog.md',
            '.vscodeignore'
          ],
          dest: 'package',
          verbose: true
        }
      ]
    })
  ]
}
