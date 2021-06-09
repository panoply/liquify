import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'rules/typescript.js',
    output: {
      format: 'cjs',
      file: 'packages/typescript/index.js',
      sourcemap: false,
      exports: 'default',
      plugins: [ terser() ]
    },
    plugins: [ commonjs() ]
  },
  {
    input: 'rules/javascript.js',
    output: {
      format: 'cjs',
      file: 'packages/javascript/index.js',
      sourcemap: false,
      exports: 'default',
      plugins: [ terser() ]
    },
    plugins: [ commonjs() ]
  }
]
