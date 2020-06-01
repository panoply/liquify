import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import crypto from '@liquify/rollup-plugin-crypto'

/**
 * Monorepo path resolver
 */
const { p } = require('@liquify/path-resolve')(pkg)

/**
 * Rollup Bundle
 */
export default {
  input: p({
    standard: 'variations/standard.json',
    shopify: 'variations/shopify.json',
    jekyll: 'variations/jekyll.json'
  }),
  output: [
    {
      format: 'cjs',
      dir: p`package`,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  plugins: [
    crypto({
      main: 'standard',
      password: 'sissel siv'
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}
