import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: 'package/index.cjs.js',
      sourcemap: process.env.prod ? false : 'inline'
    },
    {
      format: 'es',
      file: 'package/index.es.js',
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  plugins: [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
