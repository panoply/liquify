import { plugins, jsonmin, banner } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
// import obfuscator from '@liquify/rollup-plugin-obfuscator'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'
import { config } from 'dotenv'

config()

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'package/server.js',
      format: 'cjs',
      sourcemap: !process.env.prod,
      banner: banner(pkg, 'CC BY-NC-ND 4.0')
    },
    external: [
      'lodash',
      '@liquify/liquid-language-specs',
      'prettydiff',
      'vscode-languageserver',
      'vscode-css-languageservice',
      'vscode-html-languageservice',
      'vscode-json-languageservice',
      'vscode-languageserver',
      'vscode-languageserver-textdocument',
      'vscode-uri',
      'fs',
      'path'
    ],
    plugins: plugins(
      [
        replace({
          preventAssignment: true,
          values: {
            'process.env.MASTER_KEY': `"${process.env.MASTER_KEY}"`
          }
        }),
        alias(
          {
            entries: {
              enums: resolve(__dirname, 'src/enums'),
              provide: resolve(__dirname, 'src/provide'),
              service: resolve(__dirname, 'src/service'),
              modes: resolve(__dirname, 'src/service/modes'),
              utils: resolve(__dirname, 'src/utils')
            }
          }
        ),
        json(
          {
            preferConst: true,
            compact: !!process.env.prod
          }
        ),
        noderesolve({
          preferBuiltins: true,
          jail: resolve(__dirname, 'src'),
          extensions: [
            '.ts',
            '.js'
          ]
        }),
        babel({
          babelHelpers: 'runtime',
          configFile: './.babelrc',
          extensions: [
            '.ts',
            '.js'
          ]
        }),
        commonjs({
          requireReturnsDefault: 'namespace'
        }),
        globs(
          {
            globs: [
              'package.json',
              'readme.md',
              'changelog.md',
              'ThirdPartyNotices.txt',
              'LICENSE',
              'shopify-sections.json'
            ],
            dest: 'package',
            transform: {
              LICENSE: '[name].txt',
              '*.json': ({ content }) => ({
                content: jsonmin(content.toString())
              })
            }
          }
        )
      ],
      [
        noderesolve({
          preferBuiltins: true,
          extensions: [
            '.ts',
            '.js'
          ]
        }),
        terser(
          {
            ecma: 2016,
            compress: { passes: 2 }
          }
        ),
        filesize(
          {
            showGzippedSize: false,
            showMinifiedSize: true
          }
        )
      ]
    )
  }
  /* {
    input: 'node_modules/prettydiff/js/prettydiff.js',
    output: {
      file: 'package/node_modules/prettydiff/index.js',
      format: 'cjs',
      sourcemap: !process.env.prod
    },
    plugins: [
      terser({
        ecma: 2016
        , compress: { passes: 2 }
      })
    ]
  } */
]
