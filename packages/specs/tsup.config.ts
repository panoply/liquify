import { defineConfig } from 'tsup';
import { enums } from 'enums';

export default defineConfig({

  entry: {

    /* HTML BASED EXPORTS ------------------------- */

    'html/attributes': './src/html/data/html5/attributes.ts',
    'html/tags': './src/html/data/html5/tags.ts',
    'html/values': './src/html/data/html5/values.ts',
    'html/voids': './src/html/data/html5/voids.ts',

    /* LIQUID BASED EXPORTS ----------------------- */

    'liquid/standard': './src/liquid/data/standard/export.ts',
    'liquid/shopify': './src/liquid/data/shopify/export.ts',
    'liquid/jekyll': './src/liquid/data/jekyll/export.ts',

    /* ENTRY -------------------------------------- */

    index: './src/index.ts'

  },
  dts: {
    entry: {
      specs: './src/index.ts'
    },
    resolve: true
  },
  clean: process.env.predev === 'true' ? true : [
    '!./package/html/attributes.js',
    '!./package/html/tags.js',
    '!./package/html/values.js',
    '!./package/html/voids.js',
    '!./package/liquid/jekyll.js',
    '!./package/liquid/shopify.js',
    '!./package/liquid/standard.js',
    '!./package/index.js',
    '!./package/specs.d.ts'
  ],
  outDir: 'package',
  legacyOutput: false,
  splitting: true,
  bundle: true,
  format: 'cjs',
  treeshake: 'smallest',
  plugins: [
    enums(
      {
        any: 1,
        object: 2,
        integer: 3,
        number: 4,
        boolean: 5,
        string: 6,
        array: 7,
        constant: 8,
        parameter: 9,
        keyword: 10,
        attribute: 11,
        control: 12,
        comment: 13,
        embedded: 14,
        generator: 15,
        import: 16,
        iteration: 17,
        link: 18,
        output: 19,
        variable: 20,
        raw: 21,
        unknown: 22,

        /* SEPARATORS --------------------------------- */

        equals: 61,
        comma: 44,
        newline: 10
      }
    )
  ]

});
