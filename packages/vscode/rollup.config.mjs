import { rollup, env, config, plugin, banner, jsonmin } from '@liquify/rollup-config';
import { path } from '@liquify/schema-stores';

export default rollup(
  {
    input: 'client/index.ts',
    output: [
      {
        format: 'cjs',
        file: config.output.cjs,
        sourcemap: env.is('dev', 'inline'),
        exports: 'named',
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
    plugins: env.if('dev')(
      [
        plugin.replace(
          {
            preventAssignment: true,
            values: {
              'process.env.SERVER_PATH': '"./../"'
            }
          }
        ),
        plugin.del(
          {
            verbose: true,
            runOnce: env.watch,
            targets: 'package/*'
          }
        ),
        plugin.watch(
          {
            assets: [
              'src/syntax/**/*.json'
            ]
          }
        ),
        plugin.copy(
          {
            verbose: true,
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
                dest: 'package/stores'
              },
              {
                src: 'syntax/**/*.json',
                dest: 'package/syntax',
                transform: contents => jsonmin(contents.toString())
              }

            ]
          }
        ),
        plugin.esbuild()
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
