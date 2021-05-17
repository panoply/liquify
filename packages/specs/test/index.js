import test from 'ava'
import { config } from 'dotenv'

config()

const { specs } = require('../package/index')

test('Liquid Standard', async t => {

  const spec = await specs(process.env.MASTER_KEY, 'standard')

  // t.log(spec)

  t.pass()

})

test.skip('Liquid Jekyll', async t => {

  const spec = await specs(process.env.MASTER_KEY, 'jekyll')

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

  const spec = await specs(process.env.MASTER_KEY, 'shopify')

  // t.log(spec)

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
