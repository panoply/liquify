import { plugins, jsonmin, banner } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import noderesolve from '@rollup/plugin-node-resolve'
import globs from '@liquify/rollup-plugin-globs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: {
    file: 'package/server.js',
    format: 'cjs',
    sourcemap: !process.env.prod,
    banner: banner({
      ...pkg,
      main: 'package/server.js'
    })

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
  plugins: plugins([
    json({
      preferConst: true,
      compact: !!process.env.prod
    }),
    babel({
      babelHelpers: 'runtime',
      configFile: './.babelrc'
    }),
    commonjs(),
    globs({
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
    noderesolve(),
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    }),
    obfuscator({
      target: 'node',
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
      unicodeEscapeSequence: false
    }),
    filesize({
      showGzippedSize: false,
      showMinifiedSize: true
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
