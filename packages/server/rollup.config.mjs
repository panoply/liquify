import { env, config, plugin, rollup } from '@liquify/rollup-config';
import { path as stores } from '@liquify/schema-stores';

export default rollup(
  [
    {
      input: 'src/index.ts',
      output: {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'hidden'),
        preferConst: true,
        esModule: false,
        chunkFileNames: '[name].js'
      },
      external: [
        '@liquify/liquid-parser',
        '@liquify/prettify',
        '@liquify/liquid-language-specs',
        'lodash',
        'fs',
        'marky',
        'path',
        'vscode-languageserver',
        'vscode-css-languageservice',
        'vscode-json-languageservice',
        'vscode-languageserver',
        'vscode-languageserver/node',
        'vscode-languageserver-textdocument',
        'vscode-languageserver-types',
        'vscode-uri'
      ],
      plugins: env.if('dev')(
        [
          plugin.del(
            {
              verbose: true,
              runOnce: env.watch,
              targets: 'package/*'
            }
          ),
          plugin.copy(
            {
              verbose: true,
              copyOnce: env.watch,
              targets: [
                {
                  src: stores('shopify/sections'),
                  dest: 'package/stores/shopify'
                }
              ]
            }
          ),
          plugin.alias(
            {
              customResolver: plugin.resolve(
                {
                  extensions: [ '.ts' ]
                }
              ),
              entries: config.alias([
                'export',
                'types',
                'service',
                'provide',
                'modes',
                'utils'
              ])
            }
          ),
          plugin.esbuild(
            {

              optimizeDeps: {
                include: [

                ]
              }
            }
          ),
          plugin.resolve(
            {
              preferBuiltins: true
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
  ]
);
