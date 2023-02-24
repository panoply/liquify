import type { Filters as IFilters } from '../..';

export const Filters: IFilters = {
  url: {
    description: 'Works with the pathPrefix configuration option to properly normalize absolute paths in your content with the `pathPrefix` added. Useful if you host your site on GitHub Pages, which normally live in a subdirectory, e.g. `https://11ty.github.io/eleventy-base-blog/`.\n\n**Note**\n\nIf you don’t need `pathPrefix` (or don’t ever plan on moving your site’s top-level directory structure), you probably don’t need to use the `url` filter.\n\n[11ty Liquid](https://www.11ty.dev/docs/filters/url/)'
  }
};
