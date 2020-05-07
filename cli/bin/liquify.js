#!/usr/bin/env node

const { run } = require('../package/liquify-cli.cjs.js')
const argv = require('minimist')(process.argv.slice(2))
const main = argv._[0]; delete argv._
const prop = Object.keys(argv)

for (const p of prop) {

}

console.log(prop)
