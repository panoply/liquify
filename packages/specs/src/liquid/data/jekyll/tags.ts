import { Tags } from '../..';

/**
 * Liquid Jekyll Spec: Filters
 */
export const TAGS: Tags = {
  post_url: {
    type: 'output',
    description: 'Link to a post on your site, the post_url tag will generate the correct permalink URL for the post you specify',
    singular: true,
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/tags/#linking-to-posts'
    }
  },
  include: {
    type: 'import',
    description: 'The include tag allows you to include the content from another file stored in the _includes folder',
    singular: true,
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/includes'
    }
  },
  include_relative: {
    type: 'import',
    description: 'Include file fragments relative to the current file by using the include_relative tag',
    singular: true,
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file'
    }
  },
  link: {
    type: 'output',
    filters: true
  },
  highlight: {
    type: 'raw',
    description: 'Render a code block with syntax highlighting.',
    snippet: 'highlight ${1}',
    filters: false,
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting'
    }
  }
};
