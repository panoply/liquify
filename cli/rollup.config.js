import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import Crypto from 'cryptorjs'
import chalk from 'chalk'
import tagReplace from './../scripts/rollup/tag-replace'
import pkg from './package.json'

const crypto = new Crypto('sissel siv')
const { log } = console

export default {
  input: './lib/index.js',
  plugins: [
    tagReplace({
      callback (match) {
        const encode = crypto.encode(match)
        log(chalk`{green  Encrypted} ${match} {dim to} {cyan ${encode}}`)
        return `${encode}`
      },
      delimeters: [ 'getCrypt\\(\'?"?', '\'?"?\\)' ],
      tags: [ 'grammar' ]
    }),
    resolve(),
    commonjs({ include: '../node_modules/.pnpm/registry.npmjs.org/**' }),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ],
  external: Object.keys(pkg.dependencies).concat('path', 'util'),
  output: [
    {
      // banner: banner(pkg),
      format: 'cjs',
      file: pkg.main
    },
    {
      // banner: banner(pkg),
      format: 'es',
      file: pkg.module
    }
  ]
}
