#!/usr/bin/env node

require('../package/cli.js').default(require('minimist')(process.argv.slice(1), {
  alias: {
    output: 'o',
    standalone: 'h'
  },
  boolean: [
    'standalone'
  ],
  default: {
    cwd: process.cwd(),
    standalone: true,
    samples: true,
    output: 'theme'
  }
}));
