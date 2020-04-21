import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'packages/clients/vscode/package/index.js',
    output: {
      file: 'export/liquify-vscode/index.js',
      format: 'cjs',
      sourcemap: true,
      external: [
        'vscode',
        'vscode-languageclient'
      ]
    },
    plugins: process.env.prod ? [
      babel({ runtimeHelpers: true }),
      terser()
    ] : [
      babel({ runtimeHelpers: true })
    ]
  },
  {
    input: 'packages/server/index.js',
    external: process.env.prod ? [
      'prettydiff',
      'vscode-languageserver'
    ] : [
      'vscode-languageserver'
    ],
    output: {
      file: 'export/liquid-language-server/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      json({ preferConst: true }),
      babel({ runtimeHelpers: true }),
      process.env.prod ? terser() : null
    ]
  }
]
