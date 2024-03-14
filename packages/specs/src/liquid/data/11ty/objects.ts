import { Objects } from '../..';

export const objects: Objects = {
  page: {
    summary: 'The `page` object has information about the current page.',
    description: 'The `page` object has information about the current page. For example, `page.url` is useful for finding the current page in a collection.\n\n[Read more about Collections](https://www.11ty.dev/docs/collections/) (look at Example: Navigation Links with an active class added for on the current page).\n\n[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable)\n\n',
    type: 'object',
    global: true,
    properties: {
      url: {
        type: 'string',
        description: 'Can be used in `<a href>` to link to other templates.\n\n**Note**\n\nThis value will be `false` if `permalink` is set to `false`.\n\n**Example**\n\n```\n\n/current/page/myFile/\n\n```\n\n'
      },
      fileSlug: {
        type: 'string',
        description: 'The `fileSlug` variable is mapped from `inputPath`, and is useful for creating your own clean [permalinks](https://www.11ty.dev/docs/permalinks/).\n\n`fileSlug` returns information on the parent directory if the file is an `index` template.\n\n**Note**\n\nFor permalinks: inputPath filename minus template file extension.\n\n**Example**\n\n```\n\npage.url: /current/page/myFile/\npage.fileSlug: myFile\n\n```\n\n[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#fileslug)\n\n'
      },
      filePathStem: {
        type: 'string',
        description: 'The `filePathStem` variable is mapped from `inputPath`, and is useful if you’ve inherited a project that doesn’t use clean [permalinks](https://www.11ty.dev/docs/permalinks/).\n\n**Note**\n\nCareful with this one! Remember that [Cool URI’s don’t change](https://www.11ty.dev/docs/permalinks/#cool-uris-dont-change).\n\n[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#filepathstem)'

      },
      date: {
        type: 'string',
        description: 'The date associated with the page. Defaults to the content’s file created date but can be overridden. [Read more at Content Dates](https://www.11ty.dev/docs/dates/).\n\n[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#date)\n\n'
      },
      inputPath: {
        type: 'string',
        description: 'The path to the original source file for the template.\n\n**Note**\n\nThis will include your input directory path!.\n\n**Example**\n\n```\n\n./current/page/myFile.md\n\n```\n\n'
      },
      outputPath: {
        type: 'string',
        description: 'Depends on your output directory (the default is _site). You probably won’t use this: `url` is better.\n\n**Note**\n\nThis value will be `false` if `permalink` is set to `false`'
      },
      outputFileExtension: {
        type: 'string',
        description: 'Useful with `page.filePathStem` when using custom file extensions.'
      }
    }
  },
  eleventy: {
    description: 'Contains Eleventy-specific data from environment variables and the Serverless plugin (if used).',
    global: true,
    type: 'object',
    properties: {
      version: {
        type: 'string',
        description: 'Eleventy version'
      },
      generator: {
        type: 'string',
        description: 'For use with `<meta name="generator">`.\n\nIt’s helpful if you add `<meta name="generator">` to your existing Eleventy project as shown below. Learn more from David Darnes’ blog post: [You should add a generator tag to your Eleventy site](https://darn.es/you-should-add-a-generator-tag-to-your-eleventy-site/).\n\n**Example**\n\n```liquid\n\n<meta name="generator" content="{{ eleventy.generator }}">\n\n```\n\n'
      },
      env: {
        type: 'object',
        description: 'Eleventy also supplies its own Eleventy-specific environment variables, usually intended for more advanced use cases. You can use these in your configuration or in data files as needed.',
        properties: {
          root: {
            type: 'string',
            description: 'Absolute path to the directory in which you’ve run the Eleventy command.'
          },
          config: {
            type: 'string',
            description: 'Absolute path to the current config file'
          },
          source: {
            type: 'string',
            description: ' The method, either `cli` or `script`',
            literal: [
              'cli',
              'script'
            ]
          },
          runMode: {
            type: 'string',
            description: 'One of `serve`, `watch`, or `build`',
            literal: [
              'serve',
              'watch',
              'build'
            ]
          },
          serverless: {
            type: 'object',
            properties: {
              path: {
                type: 'object',
                description: ' An object containing the values from any Dynamic URL slugs from Serverless paths. e.g. A slug for `/path/:id/` and a URL for `/path/1/` would give `{ id: 1 }`'
              },
              query: {
                type: 'object',
                description: 'The `event.queryStringParameters` received from the serverless function. Note these are not available in Netlify On-demand Builders, e.g. `?id=1 would be { id: 1 }`'
              }
            }
          }
        },
        reference: {
          name: 'Eleventy Liquid',
          url: 'https://www.11ty.dev/docs/environment-vars/#eleventy-supplied'
        }
      }
    },
    reference: {
      name: 'Eleventy Liquid',
      url: 'https://www.11ty.dev/docs/data-eleventy-supplied/#eleventy-variable'
    }
  },
  pagination: {
    type: 'object',
    global: true,
    description: 'Pagination allows you to iterate over a data set and create multiple files from a single template. The input data can be in the form of an array or object defined in your frontmatter or in [global data](https://www.11ty.dev/docs/data-global/), or you can paginate a collection to make an easily digestible list of your posts.\n\n> **NOTE**\n>\n> To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the pagination key.',
    properties: {
      items: {
        type: 'array',
        description: 'Array of current page’s chunk of data'
      },
      pageNumber: {
        type: 'number',
        description: 'Current page number, `0` indexed'
      },
      hrefs: {
        type: 'array',
        description: 'Array of all page hrefs (in order)',
        items: 'string'
      },
      href: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Put inside `<a href="">Next Page</a>`'
          },
          prev: {
            type: 'string',
            description: 'Put inside `<a href="">Previous Page</a>`'
          },
          first: {
            type: 'string'
          },
          last: {
            type: 'string'
          }
        }
      },
      pages: {
        type: 'array',
        description: 'Array of all chunks of paginated data (in order)'
      },
      page: {
        type: 'object',
        properties: {
          next: {
            type: 'any',
            description: 'Put inside `<a href="">Next Page</a>`'
          },
          prev: {
            type: 'any',
            description: 'Put inside `<a href="">Previous Page</a>`'
          },
          first: {
            type: 'any'
          },
          last: {
            type: 'any'
          }
        }
      }
    },
    reference: {
      name: 'Eleventy Liquid',
      url: 'https://www.11ty.dev/docs/pagination/'
    }
  }
};
