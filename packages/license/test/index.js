// @ts-nocheck

import test from 'ava'
import license from '../package/index.cjs'
import time from 'pretty-hrtime'
import cryptographer from '@brixtol/cryptographer'

test.before(t => {

  t.context.start_time = process.hrtime()

})

test.after(t => {

  t.log(time(process.hrtime(t.context.start_time), { verbose: true }))

})

test.serial('Write File', async t => {

  const crypto = cryptographer('sisselsiv')
  const time = crypto.encode(new Date().toUTCString())

  const get = await license()
  t.log(get, time, crypto.decode(time))
  t.pass()

})
