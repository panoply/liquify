import babel from '@rollup/plugin-babel'
import noderesolve from '@rollup/plugin-node-resolve'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/app/index.js',
  output: {
    file: 'public/assets/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: [
    buble({
      transforms: { forOf: false }
    }),
    process.env.prod && terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
