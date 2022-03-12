import { defineConfig as Rollup } from 'rollup';
import { env, config, banner } from '@liquify/rollup-plugin-utils';
import alias from '@rollup/plugin-alias';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import obfuscator from '../../utils/rollup-obfuscator/package';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import del from 'rollup-plugin-delete';

export default Rollup(
  {
    input: {

      /* MAIN SHARED ENTRY -------------------------- */

      index: 'src/index.ts',

      '@html/attributes': 'src/html/data/html5/attributes.ts',
      '@html/tags': 'src/html/data/html5/tags.ts',
      '@html/values': 'src/html/data/html5/values.ts',

      '@liquid/standard': 'src/liquid/data/standard/export.ts',
      '@liquid/shopify': 'src/liquid/data/shopify/export.ts',
      '@liquid/jekyll': 'src/liquid/data/jekyll/export.ts'

    },
    preserveEntrySignatures: 'allow-extension',
    output: {
      format: 'cjs',
      dir: 'package',
      sourcemap: env.is('dev', 'inline'),
      banner: banner('PROPRIETARY'),
      preferConst: true,
      esModule: false
    },
    external: [
      'vscode-languageserver',
      'vscode-languageserver-types'
    ],
    plugins: env.if('dev')(
      [

        del(
          {
            verbose: true,
            runOnce: env.watch,
            targets: 'package/*'
          }
        ),
        ts(
          {
            check: false,
            useTsconfigDeclarationDir: true,
            typescript
          }
        ),
        noderesolve(
          {
            extensions: [
              '.ts',
              '.js'
            ]
          }
        ),
        commonjs(
          {
            extensions: [
              '.ts',
              '.js'
            ]
          }
        ),
        beep()
      ]
    )(
      [
        terser(
          {
            ecma: 2016,
            compress: {
              passes: 5
            }
          }
        ),
        obfuscator(
          {
            target: 'node',
            exclude: [
              '!/index.js',
              '!/index.es.js'
            ],
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
);
