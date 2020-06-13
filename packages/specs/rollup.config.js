import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import cryptospec from '@liquify/rollup-plugin-cryptospec'

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
    cryptospec({
      password: 'sissel siv',
      defaults: {
        filters: {
          type: 'filter'
        },
        objects: {
          type: 'object',
          filters: true,
          singular: true,
          whitespace: true
        },
        tags: {
          filters: false,
          singular: false,
          whitespace: true
        }
      }
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}
