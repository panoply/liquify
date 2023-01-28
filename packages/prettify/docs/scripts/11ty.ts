import Eleventy from '@11ty/eleventy';

export function eleventy () {

  (async function () {
    const elev = new Eleventy('.', '_site', {
      // --quiet
      quietMode: true,

      // --config
      configPath: '.eleventy.js',

      config: function (eleventyConfig) {
        // Do some custom Configuration API stuff
        // Works great with eleventyConfig.addGlobalData
      }
    });

    // Use `write` or `toJSON` or `toNDJSON`
  })();

}
