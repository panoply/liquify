import { env, plugin, rollup,  } from '@liquify/rollup-config';

export default rollup(
  [
    {
      input: 'src/app/bundle.ts',
      output: [
        {
          format: 'es',
          file: 'public/bundle.min.js',
          sourcemap: process.env.prod ? false : 'inline',
          esModule: false,
          preferConst: true
        }
      ],
      plugins: env.if('dev')(
        [
          plugin.resolve(),
          plugin.commonjs(),
          plugin.esbuild()
        ]
      )(
        [
          plugin.esminify()
        ]
      )
    }
  ]
);
