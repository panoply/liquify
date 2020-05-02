import { terser } from 'rollup-plugin-terser'
import Json from '@rollup/plugin-json'
import { join } from 'path'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import { bundle, json } from './scripts/bundle'
import specs from './scripts/rollup/plugin-specs'
import generatePackageJson from 'rollup-plugin-generate-package-json'

/**
 * @todo Multirepo support
 */
// import server from './packages/server/rollup.config'
// import atom from './packages/clients/atom/rollup.config'
// import sublime from './packages/clients/sublime/rollup.config'
// import vscode from './packages/clients/vscode/rollup.config'

const vs = 'packages/clients/vscode'

export default bundle({

  /**
   * Client Bundle
   */
  clients: [
    {
      input: 'packages/clients/vscode/package/index.js',
      output: {
        file: 'export/vscode/index.js',
        format: 'cjs',
        sourcemap: true,
        external: [
          'vscode',
          'vscode-languageclient'
        ]
      },
      plugins: [
        babel({ runtimeHelpers: true }),
        copy({
          targets: [
            {
              src: 'packages/schema/liquidrc.json',
              dest: 'export/vscode/schema/',
              transform: json,
              verbose: true
            },
            {
              src: 'packages/clients/vscode/syntax/grammar/*.json',
              dest: 'export/vscode/syntax/grammar/',
              transform: json,
              verbose: true
            },
            {
              src: 'packages/clients/vscode/syntax/*.json',
              dest: 'export/vscode/syntax/',
              transform: json,
              verbose: true
            },
            {
              src: [
                'packages/clients/vscode/package.json',
                'packages/clients/vscode/language-configuration.json',
                'packages/clients/vscode/readme.md',
                'packages/clients/vscode/changelog.md',
                'packages/clients/vscode/.vscodeignore'

              ],
              dest: 'export/vscode/',
              verbose: true
            }
          ]
        })
      ]
    }
  ],

  /**
   * Language Server Bundle
   */
  server: [
    {
      input: 'packages/server/index.js',
      external: process.env.prod ? [
        'prettydiff',
        'vscode-languageserver'
      ] : [
        'vscode-languageserver'
      ],
      output: {
        file: 'export/vscode/server/index.js',
        format: 'cjs',
        sourcemap: true
      },
      plugins: [
        Json({ preferConst: true }),
        babel({ runtimeHelpers: true }),
        generatePackageJson({
          inputFolder: 'packages/server',
          outputFolder: 'export/vscode/server'
        })
      ]
    },
    {
      input: 'node_modules/prettydiff/js/prettydiff.js',
      output: {
        file: 'export/vscode/server/node_modules/prettydiff/index.js',
        format: 'cjs',
        sourcemap: true
      },
      plugins: [
        generatePackageJson({
          inputFolder: 'packages/server',
          outputFolder: 'export/vscode/server/node_modules/prettydiff'
        })
      ]
    }
  ],

  /**
   * Specification Varition Bundles
   */
  specs: {
    input: 'packages/specs/variations',
    output: {
      dir: 'export/vscode/server/specs',
      format: 'cjs',
      sourcemap: false
    },
    plugins: [
      specs({
        main: 'packages/specs/variations/standard.json',
        types: [
          'comment',
          'control',
          'embedded',
          'filter',
          'import',
          'iteration',
          'object',
          'output',
          'raw',
          'variable'
        ]
      })
    ]

  }
})
