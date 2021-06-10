import { terser } from 'rollup-plugin-terser'
import { jsonmin } from '@liquify/rollup-plugin-utils'
import globs from '@liquify/rollup-plugin-globs'

export default {
  input: 'index.js',
  output: {
    file: 'package/index.js',
    format: 'cjs',
    sourcemap: process.env.prod ? false : 'inline',
    exports: 'default',
    plugins: [
      terser(
        {
          ecma: 6
          , warnings: 'verbose'
          , compress: { passes: 2 }
        }
      )
    ]
  },
  plugins: process.env.stores ? [
    globs(
      {
        globs: [ 'stores/*.json' ],
        dest: 'package',
        transform: {
          'stores/*.json': ({ content }) => ({
            content: jsonmin(content.toString()),
            dest: 'package'
          })
        }
      }
    )
  ] : null
}
