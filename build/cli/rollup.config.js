import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.js',
    output: {
      // banner: banner(pkg),
      format: 'cjs',
      file: 'package/liquify-cli.cjs.js',
      sourcemap: !process.env.prod
    },
    external: Object.keys(pkg.dependencies).concat('path', 'util'),
    plugins: [
      json({
        namedExports: true,
        compact: process.env.prod
      }),

      nodeResolve()
    ]
  }
]
