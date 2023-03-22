import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {

      moloko: './src/moloko.ts'

    },
    clean: false,
    platform: 'browser',
    noExternal: process.env.production ? [
      'lz-string'
    ] : [
      'bss',
      'lz-string',
      'mithril',
      'esthetic'
    ],
    external: process.env.production ? [
      'mithril',
      'esthetic'
    ] : [],

    minify: process.env.production ? 'terser' : false,
    skipNodeModulesBundle: false,
    treeshake: 'smallest',
    splitting: !!process.env.production,
    shims: false,
    target: 'es6',
    bundle: true,
    format: [ 'esm' ],
    outExtension () {
      return {
        js: '.js'
      };
    }
  },
  {
    entry: {
      'workers/json': './node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
      'workers/css': './node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
      'workers/html': './node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
      'workers/typescript': './node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
      'workers/editor': './node_modules/monaco-editor/esm/vs/editor/editor.worker.js'
    },
    clean: false,
    platform: 'browser',
    minify: process.env.production ? 'terser' : false,
    treeshake: 'smallest',
    splitting: false,
    shims: false,
    target: 'es6',
    bundle: true,
    format: [ 'iife' ],
    outExtension () {
      return {
        js: '.js'
      };
    }
  }
]);
