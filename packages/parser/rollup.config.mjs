import { rollup, env, config, plugin } from '@liquify/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('prod', 'hidden'),
        preferConst: true,
        esModule: false,
        chunkFileNames: 'parser.js'
      },
      {
        format: 'esm',
        file: config.output.esm,
        sourcemap: env.is('prod', 'hidden'),
        preferConst: true,
        esModule: false,
        chunkFileNames: 'parser.mjs'
      }
    ],
    external: [
      '@liquify/liquid-language-specs',
      'vscode-languageserver-textdocument'
    ],
    plugins: env.if('dev')(
      [
        plugin.alias({
          entries: {
            tree: config.path('src/tree'),
            parser: config.path('src/parser'),
            lexical: config.path('src/lexical'),
            config: config.path('src/config.ts')
          }
        }),
        plugin.del(
          {
            verbose: true,
            runOnce: env.watch,
            targets: [
              'package/*',
              '!package/types/**'
            ]
          }
        ),
        plugin.copy(
          {
            verbose: true,
            copyOnce: env.watch,
            targets: [
              {
                src: 'node_modules/@liquify/liquid-language-specs/package/specs',
                dest: 'package/specs'
              }
            ]
          }
        ),
        plugin.esbuild(),
        plugin.resolve(
          {
            extensions: [
              '.ts',
              '.js'
            ]
          }
        ),
        plugin.commonjs(
          {
            requireReturnsDefault: 'namespace',
            extensions: [
              '.ts',
              '.js'
            ]
          }
        )
      ]
    )(
      [
        plugin.esminify(),
        plugin.filesize(
          {
            showGzippedSize: false,
            showMinifiedSize: true
          }
        )
      ]
    )
  }
);
