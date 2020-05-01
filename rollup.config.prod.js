import { terser } from 'rollup-plugin-terser'
import Json from '@rollup/plugin-json'
import { join } from 'path'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import { bundle, json } from './scripts/bundle'
import specs from './scripts/rollup/plugin-specs'
import schema from './scripts/rollup/plugin-schema'
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
      input: `${vs}/extension/index.js`,
      output: {
        file: `${vs}/package/index.js`,
        format: 'cjs',
        sourcemap: true,
        external: [
          'vscode',
          'vscode-languageclient'
        ]
      },
      plugins: [
        babel({ runtimeHelpers: true }),
        process.env.prod ? terser() : null,
        copy({
          targets: [
            {
              src: [
                'packages/schema/stores/*.json',
                '!packages/schema/stores/shopify-sections.json'
              ],
              dest: `${vs}/package/schema/`,
              transform: json,
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
        file: 'packages/clients/vscode/package/server/index.js',
        format: 'cjs',
        sourcemap: true
      },
      plugins: [
        Json({ preferConst: true }),
        babel({ runtimeHelpers: true }),
        process.env.prod ? terser() : null,
        !process.env.prod ? generatePackageJson({
          inputFolder: 'packages/server',
          outputFolder: 'packages/clients/vscode/package/server/'
        }) : null
      ]
    },
    {
      input: 'node_modules/prettydiff/js/prettydiff.js',
      output: {
        file: 'package/prettydiff.js',
        format: 'cjs',
        sourcemap: true
      },
      plugins: [
        process.env.prod ? terser() : null,
        generatePackageJson({
          inputFolder: 'packages/server',
          outputFolder: 'packages/clients/vscode/package/server/node_modules'
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
      dir: 'packages/clients/vscode/package/server/specs',
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
      }),
      process.env.prod ? terser() : null
    ]

  }
})
