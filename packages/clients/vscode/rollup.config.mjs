import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { env, jsonmin, config, banner } from '@liquify/rollup-plugin-utils';
import replace from '@rollup/plugin-replace';
import beep from '@rollup/plugin-beep';
import watch from 'rollup-plugin-watch-assets';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { path } from '@liquify/schema-stores';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named',
      esModule: false,
      preferConst: true,
      banner: banner('PROPRIETARY')
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: process.env.prod ? false : 'inline',
      esModule: false,
      preferConst: true,
      banner: banner('PROPRIETARY')
    }
  ],
  external: [
    'vscode',
    'vscode-languageclient',
    'vscode-languageclient/node',
    'path',
    'fs'
  ],
  plugins: env.unless(process.env.prod)(
    [
      replace(
        {
          preventAssignment: true,
          values: {
            'process.env.SERVER_PATH': '"./../"'
          }
        }
      ),
      del(
        {
          verbose: true,
          runOnce: !process.env.prod,
          targets: 'package/*'
        }
      ),
      watch(
        {
          assets: [
            'src/syntax/**/*.json'
          ]
        }
      ),
      copy(
        {
          verbose: true,
          copyOnce: !!process.env.prod,
          targets: [
            {
              cwd: process.cwd(),
              src: path(
                [
                  'liquidrc',
                  'specs',
                  'shopify/settings_data',
                  'shopify/settings_schema'
                ]
              ),
              dest: 'package/@stores'
            },
            {
              src: 'syntax/**/*.json',
              dest: 'package/syntax',
              transform: contents => jsonmin(contents.toString())
            }

          ]
        }
      ),
      typescript(
        {
          useTsconfigDeclarationDir: true
        }
      ),
      beep()
    ]
  )(
    [
      terser(
        {
          ecma: 2016
          , warnings: 'verbose'
          , compress: { passes: 2 }
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
};
