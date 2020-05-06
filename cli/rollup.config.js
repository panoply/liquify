import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { banner } from '@liquify/cli'

import pkg from './package.json'

export default {
  input: 'index.js',
  plugins: [
    resolve(),
    commonjs({ include: '../node_modules/.pnpm/registry.npmjs.org/**' }),
    terser({
      ecma: 6
      , module: true
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ],
  external: Object.keys(pkg.dependencies).concat('path', 'util'),
  output: [
    {
      banner: banner(pkg),
      format: 'cjs',
      file: pkg.main
    },
    {
      banner: banner(pkg),
      format: 'es',
      file: pkg.module
    }
  ]
}
