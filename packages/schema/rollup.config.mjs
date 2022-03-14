import { jsonmin, env, config, plugin } from '@liquify/rollup-config';

export default {
  input: 'src/index.js',
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
      plugin.del(
        {
          verbose: true,
          runOnce: !process.env.prod,
          targets: 'package/*'
        }
      ),
      plugin.watch(
        {
          assets: [
            'src/stores/**/*.json',
            'src/index.d.ts'
          ]
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
};
