import test from 'ava'

const { getSpecs, getSpecsSync } = require('../package/index')

test('Get specifications asynchronously', async t => {

  const specs = await getSpecs('sissel siv')

  t.log('Async Specifications', specs)

  t.pass()

})

test('Get specifications synchronously', t => {

  const specs = getSpecsSync('sissel siv')

  t.log('Sync Specifications', specs)

  t.pass()

})
