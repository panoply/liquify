import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
// import virtual from '@rollup/plugin-virtual'
import generatePackageJson from 'rollup-plugin-generate-package-json'

export default [
  {
    input: 'index.js',
    external: process.env.prod ? [
      'prettydiff',
      'vscode-languageserver'
    ] : [
      'vscode-languageserver'
    ],
    output: {
      file: 'package/serverliquid-language-server.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      json({ preferConst: true }),
      babel({ runtimeHelpers: true }),
      process.env.prod ? terser() : null,
      process.env.prod ? generatePackageJson({
        inputFolder: 'packages/server',
        outputFolder: 'packages/server/package/server'
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
      process.env.prod ? terser() : null
    ]
  }
]
