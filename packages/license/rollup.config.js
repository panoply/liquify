import { terser } from 'rollup-plugin-terser'
import obfuscator from '@liquify/rollup-plugin-obfuscator'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: process.env.prod ? false : 'inline',
      exports: 'named'
    }
  ],
  external: [ 'os', 'qs', 'path', 'crypto' ],
  plugins: [
    terser({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    })
    /* obfuscator({
      target: 'node',
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'hexadecimal',
      log: true,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true,
      shuffleStringArray: true,
      splitStrings: false,
      sourceMap: true,
      stringArray: true,
      stringArrayEncoding: false,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    }) */
  ]
}
