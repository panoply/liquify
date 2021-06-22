export default {
  post_url: {
    type: 'output',
    description: 'Link to a post on your site, the post_url tag will generate the correct permalink URL for the post you specify',
    singular: true,
    ref: 'https://jekyllrb.com/docs/liquid/tags/#linking-to-posts'
  },
  include: {
    type: 'import',
    description: 'The include tag allows you to include the content from another file stored in the _includes folder',
    singular: true,
    seperator: 'space',
    ref: 'https://jekyllrb.com/docs/includes'
  },
  include_relative: {
    type: 'import',
    description: 'Iinclude file fragments relative to the current file by using the include_relative tag',
    seperator: 'space',
    singular: true,
    ref: 'https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file'
  },
  link: {
    type: 'output',
    filters: true,
    parameters: false
  },
  highlight: {
    type: 'raw',
    description: 'Render a code block with syntax highlighting.',
    snippet: 'highlight ${1}',
    filters: false,
    ref: 'https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting'
  }
};
