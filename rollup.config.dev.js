import Json from '@rollup/plugin-json'
import { resolve } from 'path'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { minifyJSON } from './scripts/bundle'
import { packages } from './package.json'

export default [
  {
    input: `${packages.vscode.path}/extension/index.js`,
    output: {
      file: `${packages.vscode.path}/package/index.js`,
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
            dest: `${packages.vscode.path}/schema`,
            transform: minifyJSON,
            verbose: true
          },
          {
            src: [
              `${packages.vscode.path}/syntaxes/**/*.json`
            ],
            dest: `${packages.vscode.path}/package/syntaxes`,
            transform: minifyJSON,
            verbose: true
          },
          {
            src: [
              `${packages.vscode.path}/package.json`,
              `${packages.vscode.path}/language-configuration.json`,
              `${packages.vscode.path}/readme.md`,
              `${packages.vscode.path}/changelog.md`,
              `${packages.vscode.path}/.vscodeignore`
            ],
            dest: `${packages.vscode.path}/package`,
            verbose: true
          }
        ]
      })
    ]
  },
  {
    input: `${packages.server.path}/index.js`,
    external: [
      'vscode-languageserver'
    ],
    output: {
      file: `${packages.server.path}/package/index.js`,
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      Json({ preferConst: true }),
      babel({
        babelHelpers: 'runtime',
        configFile: resolve(__dirname, './babel.config.json')
      }),
      copy({
        targets: [
          {
            src: [
              `${packages.server.path}/package.json`,
              `${packages.server.path}/readme.md`,
              `${packages.server.path}/changelog.md`,
              `${packages.server.path}/ThirdPartyNotices.txt`,
              `${packages.server.path}/LICENSE`
            ],
            dest: `${packages.server.path}/package`,
            verbose: true
          }
        ]
      })
    ]
  },
  {
    input: './node_modules/prettydiff/js/prettydiff.js',
    output: {
      file: `${packages.server.path}/package/node_modules/prettydiff/index.js`,
      format: 'cjs',
      sourcemap: true
    }
  }
]
