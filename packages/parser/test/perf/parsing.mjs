import Benchmark from 'benchmark'
import specs from '@liquify/liquid-language-specs'
import L from './../../package/index.cjs.js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const suite = new Benchmark.Suite()

let spec

const doc = readFileSync(resolve('test/fixtures/text.txt'), 'utf8').toString()

specs('sissel siv').then(({ shopify }) => {

  const liquid = new L.LiquidParser()
  // add tests
  const node = liquid.parse({
    ast: [],
    parseErrors: [],
    textDocument: { getText: () => doc }
  }, shopify)

  console.log(node.ast)

}).catch(e => console.log(e))
