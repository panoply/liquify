import { defineConfig } from 'tsup';

const PROD = process.env.NODE_ENV === 'PROD';

export default defineConfig([
  {
    entry: {
      index: './src/index.ts',
      lexical: './src/lexical/index.ts',
      regex: './src/lexical/regex.ts'
    },
    external: [
      'vscode-languageserver-textdocument'
    ],
    name: 'Parser',
    clean: true,
    outDir: 'package',
    legacyOutput: false,
    splitting: false,
    treeshake: 'smallest',
    bundle: true,
    format: 'cjs',
    keepNames: true,
    minify: PROD ? 'terser' : false,
    dts: PROD ? {
      resolve: true
    } : {}
  }
]);
