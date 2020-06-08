import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import crypto from '../../build/rollup-plugins/cryptospec'

export default {
  input: {
    standard: 'variations/standard.json',
    shopify: 'variations/shopify.json',
    jekyll: 'variations/jekyll.json'
  },
  output: [
    {
      format: 'cjs',
      dir: 'package',
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  external: [ 'crypto' ],
  plugins: [
    crypto({
      password: 'sissel siv'
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}
