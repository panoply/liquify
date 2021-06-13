import { env, config } from '@liquify/rollup-plugin-utils';
import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import noderesolve from '@rollup/plugin-node-resolve';
import beep from '@rollup/plugin-beep';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: config.output.cjs,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    },
    {
      format: 'es',
      file: config.output.esm,
      sourcemap: process.env.prod ? false : 'inline',
      preferConst: true,
      esModule: false,
      chunkFileNames: '[name].js'
    }
  ],
  external: [
    '@liquify/liquid-language-specs'
  ],

  plugins: env.unless(process.env.prod)(
    [
      alias({
        entries: {
          tree: config.path('src/tree'),
          parser: config.path('src/parser'),
          lexical: config.path('src/lexical'),
          config: config.path('src/config.ts')
        }
      }),
      del(
        {
          verbose: true,
          runOnce: !process.env.prod,
          targets: 'package/*'
        }
      ),
      typescript(
        {
          useTsconfigDeclarationDir: true
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
      filesize(
        {
          showGzippedSize: false,
          showMinifiedSize: true
        }
      )
    ]
  )
};
