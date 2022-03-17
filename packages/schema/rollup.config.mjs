import { jsonmin, env, config, plugin, rollup } from '@liquify/rollup-config';

export default rollup(
  [
    {
      input: 'src/index.ts',
      output: [
        {
          format: 'cjs',
          file: config.output.cjs,
          sourcemap: process.env.prod ? false : 'inline',
          exports: 'named',
          esModule: false,
          preferConst: true
        },
        {
          format: 'es',
          file: config.output.esm,
          sourcemap: process.env.prod ? false : 'inline',
          esModule: false,
          preferConst: true
        }
      ],
      plugins: env.if('dev')(
        [
          plugin.watch(
            {
              assets: [
                'src/stores/**/*.json',
                'src/index.d.ts'
              ]
            }
          ),
          plugin.del(
            {
              verbose: true,
              runOnce: !process.env.prod,
              targets: 'package/*'
            }
          ),
          plugin.copy(
            {
              verbose: true,
              copyOnce: !!process.env.prod,
              targets: [
                {
                  src: 'src/index.d.ts',
                  dest: 'package'
                },
                {
                  src: [
                    'src/stores/liquidrc.json',
                    'src/stores/specs.json'
                  ],
                  dest: 'package/stores',
                  transform: contents => jsonmin(contents.toString())
                },
                {
                  src: 'src/stores/jekyll/_config.json',
                  dest: 'package/stores/jekyll',
                  transform: contents => jsonmin(contents.toString())
                },
                {
                  src: 'src/stores/shopify/*.json',
                  dest: 'package/stores/shopify',
                  transform: contents => jsonmin(contents.toString())
                }
              ]
            }
          ),
          plugin.esbuild()
        ]
      )(
        [
          plugin.esminify()
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
