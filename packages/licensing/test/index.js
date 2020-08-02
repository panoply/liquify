// @ts-nocheck

import test from 'ava'
import license from '../package/index.cjs'
import time from 'pretty-hrtime'

test.before(t => {

  t.context.start_time = process.hrtime()

})

test.after(t => {

  t.log(time(process.hrtime(t.context.start_time), { verbose: true }))

})

test.serial('Cryptographer', async t => {

  const get = await license()
  t.log(get.license)
  t.pass()

})
