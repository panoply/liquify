import type { Filters as IFilters } from '../..';

export const Filters: IFilters = {
  url: {
    description: 'Works with the pathPrefix configuration option to properly normalize absolute paths in your content with the `pathPrefix` added. Useful if you host your site on GitHub Pages, which normally live in a subdirectory, e.g. `https://11ty.github.io/eleventy-base-blog/`.\n\n**Note**\n\nIf you don’t need `pathPrefix` (or don’t ever plan on moving your site’s top-level directory structure), you probably don’t need to use the `url` filter.\n\n[11ty Liquid](https://www.11ty.dev/docs/filters/url/)',
    returns: 'string',
    snippet: 'url',
    reference: {
      name: 'Eleventy Liquid',
      url: 'https://www.11ty.dev/docs/filters/url/'
    }
  },
  slug: {
    description: '⚠️ **DEPRECATED** ⚠️\n\nStarting in Eleventy v1.0.0 it is recommended to use [the slugify Universal Filter](https://www.11ty.dev/docs/filters/slugify/) instead of `slug`. For backwards compatibility, `slug` is still included and supported but `slugify` has better default behavior for URLs with special characters. **If you want to swap `slug` to `slugify` wholesale in old projects, [please read this warning about breaking URLs](https://www.11ty.dev/docs/filters/slugify/#upgrade-from-slug-to-slugify). Be careful!\n\nUses the [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify) npm package to convert a string into a URL slug. Typically used with permalinks.',
    returns: 'string',
    snippet: 'slug',
    deprecated: true
  },
  slugify: {
    description: 'Uses the [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify) npm package to convert a string into a URL slug. Typically used with permalinks.',
    returns: 'string',
    snippet: 'slugify',
    reference: {
      name: 'Eleventy Liquid',
      url: 'https://www.11ty.dev/docs/filters/slugify/'
    }
  },
  log: {
    description: 'An easy way to `console.log` anything from inside of a template file. This is functionally the same as running `console.log("My Title")` inside of your template.',
    snippet: 'log'
  }
};
