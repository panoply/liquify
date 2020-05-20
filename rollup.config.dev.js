import Json from '@rollup/plugin-json'
import { resolve } from 'path'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import { json } from './scripts/bundle'
// import generatePackageJson from 'rollup-plugin-generate-package-json'
import pkgs from './.packages.json'
/**
 * @todo Multirepo support
 */
// import server from './packages/server/rollup.config'
// import atom from './packages/clients/atom/rollup.config'
// import sublime from './packages/clients/sublime/rollup.config'
// import vscode from './packages/clients/vscode/rollup.config'

export default [
  {
    input: `${pkgs.vscode.path}/extension/index.js`,
    output: {
      file: `${pkgs.vscode.path}/package/index.js`,
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
            src: `${pkgs.schema}/stores/liquidrc.json`,
            dest: `${pkgs.vscode.path}/schema`,
            transform: json,
            verbose: true
          },
          {
            src: [
              `${pkgs.vscode.path}/syntaxes/**/*.json`
            ],
            dest: `${pkgs.vscode.path}/package/syntaxes`,
            transform: json,
            verbose: true
          },
          {
            src: [
              `${pkgs.vscode.path}/package.json`,
              `${pkgs.vscode.path}/language-configuration.json`,
              `${pkgs.vscode.path}/readme.md`,
              `${pkgs.vscode.path}/changelog.md`,
              `${pkgs.vscode.path}/.vscodeignore`
            ],
            dest: `${pkgs.vscode.path}/package`,
            verbose: true
          }
        ]
      })
    ]
  },
  {
    input: `${pkgs.server.path}/index.js`,
    external: [
      'vscode-languageserver'
    ],
    output: {
      file: `${pkgs.server.path}/package/index.js`,
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
              `${pkgs.server.path}/package.json`,
              `${pkgs.server.path}/readme.md`,
              `${pkgs.server.path}/changelog.md`,
              `${pkgs.server.path}/ThirdPartyNotices.txt`,
              `${pkgs.server.path}/LICENSE`
            ],
            dest: `${pkgs.server.path}/package`,
            verbose: true
          }
        ]
      })
    ]
  },
  {
    input: './node_modules/prettydiff/js/prettydiff.js',
    output: {
      file: `${pkgs.server.path}/package/node_modules/prettydiff/index.js`,
      format: 'cjs',
      sourcemap: true
    }
  }
]
