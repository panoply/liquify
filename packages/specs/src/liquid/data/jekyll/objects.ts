export default {
  site: {
    description: 'Site wide information + configuration settings from _config.yml. See below for details.',
    properties: [
      {
        description: 'A list of all Pages.',
        name: 'pages'
      },
      {
        description: 'A reverse chronological list of all Posts.',
        name: 'posts'
      },
      {
        description: 'If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the jekyll command with the --lsi (latent semantic indexing) option. ',
        name: 'related_posts'
      },
      {
        description: 'The current time (when you run the jekyll command).',
        name: 'time'
      }
    ],
    reference: 'https://jekyllrb.com/docs/variables/#site-variables',
    type: 'object'
  }
};
