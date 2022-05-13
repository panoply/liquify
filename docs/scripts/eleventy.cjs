const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgContents);
  eleventyConfig.setBrowserSyncConfig({
    notify: true,
  });

  return {
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
    templateFormats: [
      "liquid",
      "json",
      "md",
      "css",
      "html",
      "yml"
    ],
    dir: {
      input: "src",
      output: "public",
      includes: "views",
      //  collections: "views",
      layouts: "",
      data: "data",
    },
  };
};
