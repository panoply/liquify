import { banner, plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import cryptospec from '@liquify/rollup-plugin-cryptospec'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'

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
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'auto',
      banner: banner(pkg, 'PROPRIETARY')
    }
  ],
  external: [ 'crypto' ],
  plugins: plugins([
    cryptospec({
      master: 'sissel siv',
      keychain: {
        standard: [
          'standard'
        ],
        jekyll: [
          'jekyll'
        ],
        shopify: [
          'clockwork-orange'
        ]
      },
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
    globs({
      globs: [
        'package.json',
        'readme.md',
        'changelog.md',
        'LICENSE',
        'index.d.ts'
      ],
      dest: 'package',
      transform: {
        LICENSE: '[name].txt',
        '*.json': ({ content }) => ({
          content: jsonmin(content.toString())
        })
      }
    })
  ],
  [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    }),
    obfuscator({
      target: 'node',
      compact: true,
      exclude: [ '!/index.js' ],
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'mangled',
      log: true,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true,
      shuffleStringArray: true,
      splitStrings: false,
      sourceMap: true,
      stringArray: true,
      stringArrayEncoding: false,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    })

  ])
}
