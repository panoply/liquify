#!/usr/bin/env node

require('../dist/cli.js').default(require('minimist')(
  process.argv.slice(1), (cwd) => ({
    alias: {
      output: 'o'
    },
    default: {
      cwd,
      output: require('path').join(cwd, 'dist')
    }
  })(process.cwd())
));
