import test from 'ava'
import * as crypto from '../package/index.es'
import time from 'pretty-hrtime'

test('Add secrets to Keychain', async t => {

  crypto.keychain('sissel siv', {
    standard: [
      'standard'
    ],
    jekyll: [
      'jekyll'
    ],
    shopify: [
      'clockwork-orange'
    ]
  })

  t.pass()

})

test.before(t => {

  t.context.start_time = process.hrtime()

})

test.after(t => {

  t.log(time(process.hrtime(t.context.start_time), { verbose: true }))

})

test('Cryptographer', t => {

  const crypt = crypto.authenticate('standard')

  crypt.encode({ foo: 'bar', hello: 'world' })

  t.log(crypt.decode('standard'))

  t.pass()

})

test('Keychain is frozen, no password can be added', t => {

  const error = t.throws(() => crypto.keychain([ 'will_fail', 'not_allowed' ]))

  // t.log(error)

})
