#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const run = argv._[0]

delete argv._

require('../package/index')(run, { build: false, watch: false, ...argv })
