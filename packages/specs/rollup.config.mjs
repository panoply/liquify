import { defineConfig as Rollup } from 'rollup';
import { env, config, banner } from '@liquify/rollup-plugin-utils';
import alias from '@rollup/plugin-alias';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import obfuscator from '@liquify/rollup-plugin-obfuscator';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import del from 'rollup-plugin-delete';

export default Rollup(
  {
    input: {
      index: 'src/index.ts',
      '@variations/standard': 'src/liquid/data/standard/export.ts',
      '@variations/shopify': 'src/liquid/data/shopify/export.ts',
      '@variations/jekyll': 'src/liquid/data/jekyll/export.ts'
    },
    output: {
      format: 'cjs',
      dir: 'package',
      sourcemap: env.is('dev', 'inline'),
      banner: banner('PROPRIETARY'),
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    },
    plugins: env.if('dev')(
      [
        alias({
          entries: {
            html: config.path('src/html'),
            liquid: config.path('src/liquid')
          }
        }),
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
            requireReturnsDefault: 'namespace'
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
