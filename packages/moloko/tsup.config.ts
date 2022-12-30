import { defineConfig } from 'tsup';

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

      /* WORKERS ---------------------------------- */

      'worker-base': './node_modules/.ace/build/src-min/worker-base.js',
      'worker-css': './node_modules/.ace/build/src-min/worker-css.js',
      'worker-html': './node_modules/.ace/build/src-min/worker-html.js',
      'worker-javascript': './node_modules/.ace/build/src-min/worker-javascript.js',
      'worker-json': './node_modules/.ace/build/src-min/worker-json.js',
      'worker-xml': './node_modules/.ace/build/src-min/worker-xml.js',
      'worker-yaml': './node_modules/.ace/build/src-min/worker-yaml.js',

      /* SAMPLES ------------------------------------ */

      'moloko/samples/html/attribute-sorting': './src/samples/html/attribute-sorting.ts',
      'moloko/samples/html/comment-ignores': './src/samples/html/comment-ignores.ts',
      'moloko/samples/html/html5-doctype': './src/samples/html/html5-doctype.ts',
      'moloko/samples/html/json-ld-sample': './src/samples/html/json-ld-sample.ts',

      'moloko/samples/styles/liquid-in-css': './src/samples/styles/liquid-in-css.ts',
      'moloko/samples/styles/liquid-in-scss': './src/samples/styles/liquid-in-scss.ts',
      'moloko/samples/styles/mixins-sample': './src/samples/styles/mixins-sample.ts',
      'moloko/samples/styles/properties-and-classes': './src/samples/styles/properties-and-classes.ts',
      'moloko/samples/styles/sass-functions': './src/samples/styles/sass-functions.ts',
      'moloko/samples/styles/sass-variables': './src/samples/styles/sass-variables.ts',

      'moloko/samples/liquid/attribute-values': './src/samples/liquid/attribute-values.ts',
      'moloko/samples/liquid/eleventy-sample': './src/samples/liquid/eleventy-sample.ts',
      'moloko/samples/liquid/embedded-languages': './src/samples/liquid/embedded-languages.ts',
      'moloko/samples/liquid/frontmatter': './src/samples/liquid/frontmatter.ts',
      'moloko/samples/liquid/jekyll-sample': './src/samples/liquid/jekyll-sample.ts',
      'moloko/samples/liquid/script-with-liquid': './src/samples/liquid/script-with-liquid.ts',
      'moloko/samples/liquid/shopify-sample': './src/samples/liquid/shopify-sample.ts',
      'moloko/samples/liquid/shopify-section': './src/samples/liquid/shopify-section.ts',
      'moloko/samples/liquid/style-with-liquid': './src/samples/liquid/style-with-liquid.ts',

      'moloko/samples/javascript/arrays-and-objects': './src/samples/javascript/arrays-and-objects.ts',
      'moloko/samples/javascript/block-comments': './src/samples/javascript/block-comments.ts',
      'moloko/samples/javascript/condition-samples': './src/samples/javascript/condition-samples.ts',
      'moloko/samples/javascript/functions-and-promises': './src/samples/javascript/functions-and-promises.ts',
      'moloko/samples/javascript/js-with-liquid': './src/samples/javascript/js-with-liquid.ts',
      'moloko/samples/javascript/jsx-sample': './src/samples/javascript/jsx-sample.ts',
      'moloko/samples/javascript/object-sorting': './src/samples/javascript/object-sorting.ts',
      'moloko/samples/javascript/variables-and-methods': './src/samples/javascript/variables-and-methods.ts',

      'moloko/samples/typescript/declaration-sample': './src/samples/typescript/declaration-sample.ts',
      'moloko/samples/typescript/decorators': './src/samples/typescript/decorators.ts',
      'moloko/samples/typescript/interface-sample': './src/samples/typescript/interface-sample.ts',
      'moloko/samples/typescript/iterators-and-generators': './src/samples/typescript/iterators-and-generators.ts',
      'moloko/samples/typescript/tsx-sample': './src/samples/typescript/tsx-sample.ts'

    },
    outDir: './package',
    platform: 'browser',
    noExternal: [
      'lz-string',
      'mithril',
      '@liquify/prettify'
    ],
    skipNodeModulesBundle: false,
    treeshake: 'smallest',
    splitting: false,
    shims: false,
    target: 'es6',
    bundle: true,
    format: 'esm',
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
