import { Objects } from '../..';

export const objects: Objects = {
  page: {
    summary: 'The `page` object has information about the current page.',
    description: 'The `page` object has information about the current page. For example, `page.url` is useful for finding the current page in a collection.\n\n[Read more about Collections](https://www.11ty.dev/docs/collections/) (look at Example: Navigation Links with an active class added for on the current page).\n\n[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable)\n\n',
    type: 'object',
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
  }
};
