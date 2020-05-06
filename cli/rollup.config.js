import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

console.log(pkg.main)

export default {
  input: 'index.js',
  plugins: [
    resolve(),
    commonjs({ include: '../../node_modules/.pnpm/registry.npmjs.org/**' })
  ],
  external: Object.keys(pkg.dependencies).concat('path', 'util'),
  output: [
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ]
}
