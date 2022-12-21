const eleventy = require('@panoply/11ty');
const highlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const svgsprite = require('eleventy-plugin-svg-sprite');
const navigation = require('@11ty/eleventy-navigation');
const md = require('markdown-it');
const anchor = require('markdown-it-anchor');
const { sorting, prism } = require('./plugins.cjs');

module.exports = eleventy(function (config) {

  const markdown = md({ html: false }).use(anchor);

  config.addLiquidFilter('sorting', sorting);
  config.setBrowserSyncConfig();
  config.setLibrary('md', markdown);
  config.setDynamicPermalinks(false);
  config.addPassthroughCopy({
    'src/assets/image/*': '.',
    'node_modules/@liquify/moloko/package': '.'
  });
  config.addPlugin(navigation);
  config.addPlugin(highlight, { init: prism });
  config.addPlugin(svgsprite, {
    path: 'src/assets/svg',
    spriteConfig: {
      mode: {
        symbol: {
          inline: true,
          sprite: 'sprite.svg',
          example: false
        }
      },
      shape: {
        transform: [ 'svgo' ],
        id: {
          generator: 'svg-%s'
        }
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
      }
    }
  });

  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: false,
    pathPrefix: '',
    templateFormats: [
      'liquid',
      'json',
      'md',
      'css',
      'html',
      'yaml'
    ],
    dir: {
      input: 'src/site',
      output: 'public',
      includes: 'includes',
      layouts: '',
      data: 'data'
    }
  };

});
