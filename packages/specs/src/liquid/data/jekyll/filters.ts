import type { Filters } from '../..';

export const FILTERS: Filters = {
  relative_url: {
    description: 'Prepend the baseurl value to the input. Useful if your site is hosted at a subpath rather than the root of the domain.',
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/filters/'
    }
  },
  absolute_url: {
    description: 'Prepend the url and baseurl value to the input.',
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/filters/'
    }
  },
  date_to_xmlschema: {
    description: 'Convert a Date into XML Schema (ISO 8601) format.',
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/filters/'
    }
  },
  date_to_rfc822: {
    description: 'Convert a Date into the RFC-822 format used for RSS feeds.',
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/filters/'
    }
  },
  date_to_string: {
    description: 'Convert a date to short format.',
    reference: {
      name: 'Jekyll Liquid',
      url: 'https://jekyllrb.com/docs/liquid/filters/'
    }
  }
};
