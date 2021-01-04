// @ts-nocheck

import test from 'ava'
import * as crypto from '../package/index.cjs'
import time from 'pretty-hrtime'

const seed = require('./data/example.json')

test.before(t => {

  crypto.keychain('sissel siv', {
    standard: [ 'standard' ],
    jekyll: [ 'jekyll' ],
    shopify: [ 'shopify' ],
    eleventy: [ 'eleventy' ]
  })

  t.context.start_time = process.hrtime()
  t.context.crypto = crypto.secret('foobar')

})

test.after(t => {

  t.log(time(process.hrtime(t.context.start_time), { verbose: true }))

})

test.serial('Cryptographer', t => {

  const encode = t.context.crypto.encode(seed)
  const decode = t.context.crypto.decode(encode)

  t.log(decode.engine, t.context.crypto, crypto.identity())
  t.pass()

})

test('Keychain is frozen, no password can be added', t => {

  const error = t.throws(() => crypto.keychain([ 'will_fail', 'not_allowed' ]))

  t.log(error)

})
