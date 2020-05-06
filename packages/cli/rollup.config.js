import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

console.log(pkg.main)

export default [
  {
    input: 'src/export.js',
    plugins: [
      resolve(),
      commonjs({ include: '../../node_modules/.pnpm/registry.npmjs.org/**' })
    ],
    external: Object.keys(pkg.dependencies).concat('path', 'util'),
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        exports: 'named'
      },
      {
        format: 'es',
        file: pkg.module
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs()
    ],
    external: Object.keys(pkg.dependencies).concat('path', 'util'),
    output: [
      {
        format: 'cjs',
        file: 'package/index.js'
      }
    ]
  }
]
