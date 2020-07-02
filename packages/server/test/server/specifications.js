import test from 'ava'
import specs from '@liquify/liquid-language-specs'

test.before('Language Variation Specifications', async t => {

  t.context.data = (await specs('sissel siv'))

})

test('Validate cryptographer IV', t => {

  t.context.data

})
