import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { banner, path, plugins, tagReplace } from '@liquify/rollup-utils'
import pkg from './package.json'
import Crypto from 'cryptorjs'

/**
 * Cryptography IV
 */
const crypto = new Crypto('sissel siv')

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: path('lib/index.js'),
    output: {
      banner: banner(pkg),
      format: 'cjs',
      file: pkg.main,
      sourcemap: !process.env.prod
    },
    external: Object.keys(pkg.dependencies).concat('path', 'util'),
    plugins: plugins([
      json({
        namedExports: true,
        compact: process.env.prod
      }),
      tagReplace({
        delimeters: [ '\\b(?:Crypto|getCrypt)\\(\'?"?', '\'?"?\\)' ],
        tags: [ 'sissel siv' ],
        callback: match => crypto.encode(match)
      }),
      babel({
        babelHelpers: 'runtime',
        configFile: path('.babelrc')
      }),
      nodeResolve(),
      commonjs({
        include: '../node_modules/.pnpm/registry.npmjs.org/**'
      })
    ], [
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ])
  },
  {
    input: path('argv.config.json'),
    output: {
      file: 'package/argv.js',
      format: 'cjs',
      sourcemap: !process.env.prod
    },
    plugins: [
      json({
        namedExports: true,
        compact: process.env.prod
      })
    ]
  }
]
