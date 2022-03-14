import { rollup, plugin, env } from '@liquify/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    preserveEntrySignatures: 'allow-extension',
    output: [
      {
        format: 'cjs',
        file: 'package/index.js',
        sourcemap: process.env.prod ? false : 'inline',
        esModule: false,
        freeze: false,
        preferConst: true,
        chunkFileNames: '[name].js'
      },
      {
        format: 'esm',
        file: 'package/index.mjs',
        sourcemap: process.env.prod ? false : 'inline',
        esModule: true,
        freeze: false,
        preferConst: true,
        chunkFileNames: '[name].js'
      }
    ],
    plugins: env.if('dev')(
      [
        plugin.del(
          {
            verbose: true,
            runOnce: !process.env.prod,
            targets: 'package/*'
          }
        ),
        plugin.copy(
          {
            targets: [
              {
                src: 'src/types/**',
                dest: 'package/types'
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
