import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { join } from 'path'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'
import { plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'package/server.js',
    format: 'cjs',
    sourcemap: true
  },
  watch: process.env.prod && undefined,
  external: [
    'lodash',
    !process.env.prod && '@liquify/liquid-language-specs',
    'prettydiff',
    'vscode-languageserver',
    'vscode-css-languageservice',
    'vscode-html-languageservice',
    'vscode-json-languageservice',
    'vscode-languageserver',
    'vscode-languageserver-textdocument',
    'vscode-uri',
    'fs',
    'perf_hooks',
    'path'
  ],
  plugins: plugins([
    json({
      preferConst: true,
      compact: !!process.env.prod
    }),
    babel({
      babelHelpers: 'runtime',
      configFile: './.babelrc'
    }),
    process.env.prod ? noderesolve() : null,
    commonjs(),
    !process.env.prod && globs({
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
    })
  ],
  [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    }),
    obfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'hexadecimal',
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
      unicodeEscapeSequence: false,
      target: 'node'
    })
  ])
}
/* {
    input: p('node_modules/prettydiff/js/prettydiff.js'),
    output: {
      file: p('package/node_modules/prettydiff/index.js'),
      format: 'cjs',
      sourcemap: !process.env.prod
    },
    plugins: [
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ]
  } */
