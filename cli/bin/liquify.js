#!/usr/bin/env node

const { run } = require('../package/LiquifyCLI.cjs.js')
const argv = require('minimist')(process.argv.slice(2))
const command = argv._[0]

delete argv._

run(command, { build: false, watch: false, ...argv })
