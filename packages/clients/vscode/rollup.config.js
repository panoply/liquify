import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @typedef {import('rollup').RollupOptions}
 */
export default {
  input: 'extension/index.js',
  output: {
    file: 'package/liquify-vscode.js',
    format: 'cjs',
    sourcemap: true,
    external: [
      'vscode',
      'vscode-languageclient'
    ],
    plugins: [
    ]
  },
  plugins: process.env.prod ? [
    babel({ runtimeHelpers: true }),
    terser()
  ] : [
    babel({ runtimeHelpers: true })
  ]
}
