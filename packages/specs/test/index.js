import test from 'ava'
import { config } from 'dotenv'

config()

const { getSpecs, getSpecsSync } = require('../package/index')

test('Get specifications asynchronously', async t => {

  const specs = await getSpecs(process.env.MASTER_KEY)

  t.log('Async Specifications', specs)

  t.pass()

})

test('Get specifications synchronously', t => {

  const specs = getSpecsSync('sissel siv')

  t.log('Sync Specifications', specs)

  t.pass()

})
