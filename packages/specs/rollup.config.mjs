import { banner, plugins, jsonmin } from '@liquify/rollup-plugin-utils'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import cryptospec from '@liquify/rollup-plugin-cryptospec'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import globs from '@liquify/rollup-plugin-globs'
import { config } from 'dotenv'

config()

/**
 * @type {import('rollup').RollupOptions}
 */
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
      exports: 'named',
      banner: banner('PROPRIETARY'),
      esModule: false,
      preferConst: true,
      chunkFileNames: '@cryptographer/[name].[format].js'
    },
    {
      format: 'es',
      dir: 'package',
      sourcemap: process.env.prod ? false : 'inline',
      banner: banner('PROPRIETARY'),
      esModule: false,
      preferConst: true,
      chunkFileNames: '@cryptographer/[name].[format].js'
    }
  ],
  external: [ 'crypto' ],
  plugins: plugins([
    cryptospec(
      {
        dir: '@specs',
        fileName: 'index',
        password: process.env.MASTER_KEY,
        defaults: {
          filters: {
            type: 'filter'
          },
          objects: {
            type: 'object',
            filters: true,
            singular: true,
            global: false,
            deprecated: false,
            trims: true
          },
          tags: {
            filters: false,
            singular: false,
            trims: true,
            deprecated: false,
            arguments: true
          }
        }

      }
    ),
    resolve(),
    commonjs(
      {
        esmExternals: true
      }
    ),
    globs(
      {
        globs: [
          'package.json',
          'readme.md',
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
      }
    )
  ],
  [
    terser(
      {
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 5 }
      }
    ),
    obfuscator(
      {
        target: 'node',
        exclude: [ '!/index.js', '!/index.es.js' ],
        ignoreRequireImports: true,
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: true,
        numbersToExpressions: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        shuffleStringArray: false,
        simplify: true,
        splitStrings: false,
        stringArray: false,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }
    )
  ])
}