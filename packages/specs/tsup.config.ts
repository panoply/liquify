import { defineConfig } from 'tsup';

export default defineConfig([
  {

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
      entry: './src/index.ts',
      resolve: true
    },
    clean: true,
    outDir: 'package',
    legacyOutput: false,
    splitting: true,
    bundle: true,
    format: 'cjs',
    name: 'specs',
    treeshake: 'smallest',
    plugins: [
      enums(
        {
          any: 1,
          object: 2,
          number: 3,
          float: 4,
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
  }
  // {
  //   entry: [ './scripts/shopify-specs.ts' ],
  //   outDir: 'bin',
  //   clean: true,
  //   bundle: true,
  //   format: 'cjs',
  //   name: 'specs',
  //   onSuccess: 'node ./bin/shopify-specs.js && eslint ./src/liquid/data/shopify/*.ts --fix'
  // }
]);

/**
 * TSUP Plugin: Enums
 *
 * Converts all string `type` references to enum values.
 * This ensures the parser can reason with specifications
 * in the most optimal manner.
 */
function enums (value = {}) {

  const names = Object.keys(value).join('|');
  const match = `(?<=(?:separator|type|items):\\s{0,})['"]\\b(${names})\\b['"](?=[\n,]?)`;
  const regexp = new RegExp(match, 'g');

  return {
    name: 'string-to-enum',
    renderChunk: (code:string) => {

      return {
        code: code.replace(regexp, (_, type) => value[type])
      };
    }
  };
}
