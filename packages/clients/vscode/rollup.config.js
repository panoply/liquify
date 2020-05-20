import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { } from '@liquify/liquid-language-grammars/'

/**
 * @typedef {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.js',
  external: [
    'fs',
    'path',
    'vscode',
    'vscode-languageclient',
    'liquid-language-server'
  ],
  output: {
    file: 'package/liquify-vscode.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs({ include: './../../../node_modules/.pnpm/registry.npmjs.org/**' }),
    babel({
      babelHelpers: 'runtime',
      configFile: resolve(__dirname, './../../../babel.config.json')
    }),
    terser()
  ]
}
