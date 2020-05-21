import json from '@rollup/plugin-json'
import { path } from '@liquify/rollup'
import { name } from './package.json'

const $ = path(name)

export default [
  {
    input: $({
      standard: './variations/standard.json',
      shopify: './variations/shopify.json',
      jekyll: './variations/jekyll.json'
    }),
    output: {
      format: 'cjs',
      dir: $('./package'),
      entryFileNames: '[name].js',
      sourcemap: !process.env.prod
    },
    plugins: [
      json({
        preferConst: true,
        compact: !!process.env.prod
      })
    ]
  }
]
