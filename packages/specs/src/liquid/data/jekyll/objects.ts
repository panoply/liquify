import { Objects } from '../..';

/**
 * Liquid Jekyll Specification: Objects
 */
export const objects: Objects = {
  site: {
    type: 'object',
    description: 'Site wide information + configuration settings from _config.yml. See below for details.',
    properties: {
      pages: {
        description: 'A list of all Pages.',
        type: 'array'
      },
      posts: {
        description: 'A reverse chronological list of all Posts.',
        type: 'array'
      },
      related_posts: {
        type: 'array',
        description: 'If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the jekyll command with the --lsi (latent semantic indexing) option. '

      },
      time: {
        description: 'The current time (when you run the jekyll command).',
        type: 'string'
      }
    },
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/variables/#site-variables'
    }

  }
};
