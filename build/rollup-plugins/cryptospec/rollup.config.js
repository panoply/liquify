import { terser } from 'rollup-plugin-terser'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named'
    }
  ],
  external: [ ...Object.keys(pkg.dependencies), 'path', 'crypto' ],
  plugins: [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })

  ]
}
