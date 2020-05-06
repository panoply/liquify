#!/usr/bin/env node

const main = require('./../package/index')
const argv = require('minimist')(process.argv.slice(2))
const run = argv._[0]

delete argv._

main(run, { build: false, watch: false, ...argv })
