
module.exports = function (eleventyConfig) {




  return {
    dataTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      collections: "views",
      layouts: "",
      data: "data"
    }
  }
};
