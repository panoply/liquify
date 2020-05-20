import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import Crypto from 'cryptorjs'
import chalk from 'chalk'
import { babel } from '@rollup/plugin-babel'
import tagReplace from './../scripts/rollup/tag-replace'
import { resolve } from 'path'
import pkg from './package.json'

const { log } = console

/**
 * Cryptography IV
 */
const crypto = new Crypto('sissel siv')

/**
 * External Dependencies
 */
const external = Object.keys(pkg.dependencies).concat('path', 'util')

/**
 * Linked NPM Node Modules
 */
const links = [ '@liquify/liquid-language-grammars' ]

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: '../.packages.json',
    plugins: [
    // objectInsert({
    // require: {
    // @ts-ignore
    // '../../package.json': JSON.stringify(pkg.packages)
    // }
    // }),
      json({
        namedExports: true
      })
    ],
    output: [
      {
      // banner: banner(pkg),
        format: 'cjs',
        file: 'package/pkgs.js',
        sourcemap: false
      }

    ]
  },
  {
    input: './argv.config.json',
    plugins: [ json({ namedExports: true }) ],
    output: [
      {
      // banner: banner(pkg),
        file: 'package/argv.js',
        format: 'cjs',
        sourcemap: false
      }

    ]
  },
  {
    input: './lib/index.js',
    plugins: [
    // objectInsert({
    // require: {
    // @ts-ignore
    // '../../package.json': JSON.stringify(pkg.packages)
    // }
    // }),
      json({
        namedExports: true
      }),
      tagReplace({
        callback (match) {
          const encode = crypto.encode(match)
          log(chalk`{green  Encrypted} ${match} {dim to} {cyan ${encode}}`)
          return `${encode}`
        },
        delimeters: [ '\\b(?:Crypto|getCrypt)\\(\'?"?', '\'?"?\\)' ],
        tags: [ 'sissel siv' ]
      }),
      babel({
        babelHelpers: 'runtime',
        configFile: resolve(__dirname, './../babel.config.json')
      }),
      nodeResolve(),
      commonjs({ include: '../node_modules/.pnpm/registry.npmjs.org/**' }),
      process.env.prod && terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ],
    external: process.env.prod ? external.filter(i => !links.includes(i)) : external,
    output: [
      {
      // banner: banner(pkg),
        format: 'cjs',
        file: pkg.main,
        plugins: [],
        sourcemap: true
      }

    ]
  }
]
