import { env, banner, rollup, plugin, config } from '@liquify/rollup-config';

export default rollup(
  [
    {
      input: {

        /* MAIN SHARED ENTRY -------------------------- */

        index: 'src/index.ts',

        /* HTML BASED EXPORTS ------------------------- */

        'html/attributes': 'src/html/data/html5/attributes.ts',
        'html/tags': 'src/html/data/html5/tags.ts',
        'html/values': 'src/html/data/html5/values.ts',

        /* LIQUID BASED EXPORTS ----------------------- */

        'liquid/standard': 'src/liquid/data/standard/export.ts',
        'liquid/shopify': 'src/liquid/data/shopify/export.ts',
        'liquid/jekyll': 'src/liquid/data/jekyll/export.ts'

      },
      preserveEntrySignatures: 'allow-extension',
      output: [
        {
          format: 'cjs',
          dir: 'package/cjs',
          sourcemap: env.is('dev', 'inline'),
          preferConst: true,
          esModule: false,
          chunkFileNames: '[name].js'
        },
        {
          format: 'esm',
          entryFileNames: '[name].mjs',
          dir: 'package/esm',
          sourcemap: env.is('dev', 'inline'),
          preferConst: true,
          esModule: true,
          chunkFileNames: '[name].mjs'
        }
      ],
      external: [
        'vscode-languageserver',
        'vscode-languageserver-types'
      ],
      plugins: env.if('dev')(
        [
          plugin.del(
            {
              verbose: true,
              runOnce: env.watch,
              targets: [
                'package/*'
              ]
            }
          ),
          plugin.enums(
            {
              include: [
                'src/liquid/data/shopify/*.ts',
                'src/liquid/data/standard/*.ts'
              ],
              enums: {
                any: 1,
                object: 2,
                integer: 3,
                number: 4,
                boolean: 5,
                string: 6,
                array: 7,
                data: 8,
                parameter: 9,
                keyword: 10,
                attribute: 11,
                control: 12,
                comment: 13,
                embedded: 14,
                generator: 15,
                import: 16,
                iteration: 17,
                link: 18,
                output: 19,
                variable: 20,
                raw: 21,
                unknown: 22
              }
            }
          ),
          plugin.esbuild()
        ]
      )(
        [
          plugin.terser(),
          plugin.filesize(
            {
              showGzippedSize: false,
              showMinifiedSize: true
            }
          )
        ]
      )
    },
    {
      input: 'src/index.ts',
      output: {
        format: 'esm',
        file: 'package/index.d.ts'
      },
      plugins: [
        plugin.dts()
      ]
    }
  ]
);
