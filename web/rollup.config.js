import typescript from 'rollup-plugin-typescript2';
import buble from '@rollup/plugin-buble';
import beep from '@rollup/plugin-beep';
// import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app/index.js',
  output: {
    file: 'public/assets/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: [
    del(
      {
        verbose: true,
        runOnce: !process.env.prod,
        targets: 'package/*'
      }
    ),
    typescript(
      {
        check: false,
        useTsconfigDeclarationDir: true
      }
    ),
    beep(),
    buble(
      {
        transforms: { forOf: false }
      }
    ),
    process.env.prod && terser(
      {
        ecma: 2016,
        compress: { passes: 2 }
      }
    )
  ]
};
