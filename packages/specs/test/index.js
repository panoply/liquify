import test from 'ava'
import { config } from 'dotenv'
import specs from '../package/index'
config()

test('Liquid Standard', t => {

  const spec = specs({
    variation: 'standard',
    license: process.env.MASTER_KEY
  })

  // t.log(spec)

  t.like(spec, {
    engine: 'standard'
  }, 'Standard was decrypted successfully')

  t.pass()

})

test.skip('Liquid Jekyll', async t => {

  const spec = specs({
    variation: 'jekyll',
    license: process.env.MASTER_KEY
  })

  // t.log(spec)

  t.like(spec, {
    engine: 'jekyll',
    filters: {
      abs: {
        type: 'filter'
      }
    },
    objects: {
      site: {
        type: 'object'
      }
    },
    tags: {
      for: {
        type: 'iteration'
      }
    }
  }, 'Jekyll has merged with standard')

  t.pass()

})

test('Liquid Shopify', async t => {

  const spec = specs({
    variation: 'shopify',
    license: process.env.MASTER_KEY
  })

  t.log(spec)

  t.like(spec, {
    engine: 'shopify',
    filters: {
      abs: {
        type: 'filter'
      }
    },
    objects: {
      article: {
        type: 'object'
      }
    },
    tags: {
      for: {
        type: 'iteration'
      }
    }
  }, 'Shopify has merged with standard')

  t.pass()

})
