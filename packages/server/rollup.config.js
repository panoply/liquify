/* import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  input: './index.js',
  external: process.env.prod ? [
    'prettydiff',
    'vscode-languageserver'
  ] : [
    'vscode-languageserver'
  ],
  output: {
    file: 'extension/server.cjs.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    json({ preferConst: true }),
    babel({ runtimeHelpers: true }),
    process.env.prod ? terser() : null
  ]
}
*/
