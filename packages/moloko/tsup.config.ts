import { defineConfig } from 'tsup';
import { copyFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const cwd = process.cwd();

export default defineConfig([
  {
    entry: {

      /* MOLOKO ------------------------------------- */

      moloko: './src/bundle.ts',

      /* THEMES ------------------------------------- */

      'moloko/themes/potion': './node_modules/.ace/build/src/theme-potion.js',
      'moloko/themes/github': './node_modules/.ace/build/src/theme-github.js',

      /* LANGUAGES ---------------------------------- */

      'moloko/language/liquid': './node_modules/.ace/build/src/mode-liquid.js',
      'moloko/language/liquidcss': './node_modules/.ace/build/src/mode-liquidcss.js',
      'moloko/language/javascript': './node_modules/.ace/build/src/mode-javascript.js',
      'moloko/language/typescript': './node_modules/.ace/build/src/mode-typescript.js',
      'moloko/language/jsx': './node_modules/.ace/build/src/mode-jsx.js',
      'moloko/language/tsx': './node_modules/.ace/build/src/mode-tsx.js',
      'moloko/language/json': './node_modules/.ace/build/src/mode-json.js',
      'moloko/language/markdown': './node_modules/.ace/build/src/mode-markdown.js',
      'moloko/language/html': './node_modules/.ace/build/src/mode-html.js',
      'moloko/language/css': './node_modules/.ace/build/src/mode-css.js',
      'moloko/language/scss': './node_modules/.ace/build/src/mode-scss.js',
      'moloko/language/sass': './node_modules/.ace/build/src/mode-sass.js',
      'moloko/language/text': './node_modules/.ace/build/src/mode-text.js',
      'moloko/language/yaml': './node_modules/.ace/build/src/mode-yaml.js',
      'moloko/language/xml': './node_modules/.ace/build/src/mode-xml.js',
      'json-linter': './src/worker.ts'

    },
    outDir: './package',
    platform: 'browser',
    noExternal: process.env.production ? [
      'lz-string',
      'vscode-json-languageservice'
    ] : [
      'lz-string',
      'vscode-json-languageservice',
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
    splitting: false,
    shims: false,
    target: 'es6',
    bundle: true,
    format: [ 'esm' ],
    async onSuccess () {

      for (const worker of [
        './node_modules/.ace/build/src/worker-base.js',
        './node_modules/.ace/build/src/worker-css.js',
        './node_modules/.ace/build/src/worker-html.js',
        './node_modules/.ace/build/src/worker-javascript.js',
        './node_modules/.ace/build/src/worker-json.js',
        './node_modules/.ace/build/src/worker-xml.js',
        './node_modules/.ace/build/src/worker-yaml.js'
      ]) {

        await copyFile(join(cwd, worker), join(cwd, './package/', basename(worker)));

      }

    },
    outExtension () {
      return {
        js: '.js'
      };
    }
  },
  {
    entry: {
      cli: './src/cli.ts'
    },
    outDir: './package',
    platform: 'node',
    external: [ 'minimist' ],
    treeshake: 'smallest',
    splitting: false,
    shims: false,
    target: 'es6',
    bundle: true,
    format: 'cjs',
    outExtension () {
      return {
        js: '.js'
      };
    }
  }
]);
