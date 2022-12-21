import { defineConfig } from 'tsup';

export default defineConfig({

  entry: {

    /* MOLOKO ------------------------------------- */

    bundle: './src/app/bundle.ts'

    /* SAMPLES ------------------------------------ */

    // 'playground': './src/samples/liquid.ts',
    // 'moloko/samples/shopify': './src/samples/shopify.ts',
    // 'moloko/samples/eleventy': './src/samples/eleventy.ts'

  },
  outDir: './public',
  platform: 'browser',
  // skipNodeModulesBundle: false,
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
});
